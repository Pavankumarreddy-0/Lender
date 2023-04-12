import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const fetchOrganization = {
    path: '/api/organizations/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { pageNum, perPage, matches, dateFilter } = req.body;

        let skipNum = (pageNum - 1) * perPage;
        let dateMatch = {};
        
        if(Object.keys(dateFilter).length > 0){
            dateMatch = {
                createdAt: {
                    $gte:"",
                    $lt:""
                }
            }
            dateMatch["createdAt"]["$gte"] = new Date(dateFilter.gte)
            dateMatch["createdAt"]["$lt"] = new Date(dateFilter.lt)
        }
        
        // console.log(dateMatch, dateFilter.length, pageNum, perPage, matches, dateFilter)

        if (!authorization) {
            return res.status(401).json({ message: "No Authorization header sent." })
        }

        // bearer [Token] <=== need this
        const token = authorization.split(" ")[1];

        jwt.verify(
            token,
            process.env.JWT_SECRET,
            async (err, decoded) => {
                if (err) return res.status(401).json({ message: "Unable to verify user" });

                const db = getDbConnection(process.env.API_DB_NAME);
              

                const result = await db.collection("organization").aggregate([
                    {
                        $match: {
                            ...dateMatch,
                            ...matches
                        }
                    },
                    {
                        $lookup:
                        {
                           from: "person",
                           localField: "contactPoint",
                           foreignField: "_id",
                           as: "orgwithperson" 
                        }
                    },
                    {
                        $unwind: "$orgwithperson"
                    },
                    {
                        $lookup:
                        {
                            from: "users",
                            localField: "createdBy",
                            foreignField: "_id",
                            as: "createdCol"
                        }
                    },
                    {
                        $unwind: "$createdCol"
                    },
                    {
                        $project: 
                        {
                            name: 1,
                            companyNumber: 1,
                            organizationInterest:1,
                            email: 1,
                            phone: 1,
                            website:1,
                            createdBy: 1,
                            contactPoint: 1,
                            kybStatus: 1,
                            createdAt: 1,
                            firstName: "$orgwithperson.firstName",
                            lastName: "$orgwithperson.lastName",
                            creatorUsername: "$createdCol.username"
                        }
                        
                    },
                    {
                        $facet: {
                            paginatedResults: [{ $skip: skipNum }, { $limit: perPage }],
                            totalCount: [
                            {
                                $count: 'count'
                            }
                            ]
                        }
                    }
                ]).toArray();

                res.status(200).json({ message: "Organization Fetched", currentPage: pageNum, result })

            }
        )


    }
}
