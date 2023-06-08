import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const getOrganization = {
    path: '/api/organization/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { orgId } = req.body;
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
                        $match: 
                        {
                            _id: ObjectId(orgId)
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
                        
                    }
                ]).toArray();

                res.status(200).json({ message: "Organization Fetched",  result })

            }
        )


    }
}
