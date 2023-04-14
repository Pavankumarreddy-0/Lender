import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const fetchIndividualInvestors = {
    path: '/api/individual-investors/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { pageNum, perPage, matches,searchQuery, dateFilter } = req.body;

        let skipNum = (pageNum - 1) * perPage;
        let dateMatch = {};
        let searchMatch = {};
        
        if(Object.keys(dateFilter).length > 0){
            dateMatch = {
                createdAt: {
                    $gte:new Date(dateFilter.gte),
                    $lt:new Date(dateFilter.lt)
                }
            }
        }

        if(searchQuery.length > 0){
            searchMatch = {
                $or:[
                    {"firstName":{ $regex:`.*${ searchQuery }.*`,$options: 'ims' } },
                    {"lastName":{ $regex:`.*${ searchQuery }.*`,$options: 'ims' } },
                ]
            }
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
              
                const result = await db.collection("person").aggregate([
                    {
                        $match: {
                            
                            type: "Individual Investor",
                            ...searchMatch,
                            ...dateMatch,
                            ...matches
                        }
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
                            _id: 1,
                            title: 1,
                            firstName: 1,
                            lastName: 1,
                            email: 1,
                            phoneNumber: 1,
                            dob: 1,
                            countryOfResidence: 1,
                            nationality: 1,
                            birthPlace: 1,
                            insuranceNum: 1,
                            investorType: 1,
                            type: 1,
                            kycStatus: 1,
                            membershipStatus: 1,
                            privateLaunchInvestor: 1,
                            createdAt: 1,
                            createdBy: 1,
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

                res.status(200).json({ message: "Individual Investors Fetched", currentPage: pageNum, result })

            }
        )


    }
}
