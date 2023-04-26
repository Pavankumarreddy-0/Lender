import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const fetchAddress = {
    path: '/api/address/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { orgID, pageNum, perPage } = req.body;

        let skipNum = (pageNum - 1) * perPage;

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
                            orgID: ObjectId(orgID)
                        }
                    },
                    {
                        $lookup:
                        {
                           from: "person",
                           localField: "contactId",
                           foreignField: "_id",
                           as: "orgwithperson" 
                        }
                    },
                    {
                        $unwind: "$orgwithperson"
                    },
                    {
                        $project: 
                        {
                            "Company number":1,
                            "country": 1,
                            "address":1,
                            "address":2,
                            "city":1,
                            "zipCode":1,
                            "type":1,
                            "is current":1,
                            firstName: "$orgwithperson.firstName",
                            lastName: "$orgwithperson.lastName",
                            activeAddress: "$orgwithperson.activeAddress"
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
