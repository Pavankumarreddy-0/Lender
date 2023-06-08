import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const fetchAddress = {
    path: '/api/address/',
    method: 'post',
    handler: async (req, res) => {
        try {
            //get auth header from client
            const { authorization } = req.headers;
            const { orgID, pageNum, perPage } = req.body;
            if (!orgID) return res.status(401).json({ message: "orgID must present in  request body " })
            if (!pageNum) return res.status(401).json({ message: "pageNum must present in  request body " })
            if (!perPage) return res.status(401).json({ message: "perPage must present in  request body " })

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


                    const result = await db.collection("addresses").aggregate([
                        {
                            $match: {
                                orgID: ObjectId(orgID)
                            }
                        },
                        {
                            $lookup:
                            {
                                from: "organization",
                                localField: "orgID",
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
                                "CompanyNumber": 1,
                                "Country": 1,
                                "Address1": 1,
                                "Address2": 2,
                                "City": 1,
                                "zipCode": 1,
                                "type": 1,
                                "currentAddress": 1,
                                "activeAddress": "$orgwithperson.activeAddress"
                                // activeAddress: "$orgwithperson.activeAddress"
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

                    res.status(200).json({ message: "Addresses Fetched", currentPage: pageNum, result })

                }
            )

        } catch (err) {
            res.status(500).send({ status: false, message: err.message });
        }
    }
}
