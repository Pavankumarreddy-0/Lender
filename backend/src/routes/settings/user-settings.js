import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const getUserSettings = {
    path: '/api/user-settings/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
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


                const result = await db.collection("users").aggregate([
                    {
                        $match:
                        {
                            _id: ObjectId(decoded.id)
                        }
                    },
                    {
                        $project:
                        {
                            keyboardShortcuts: 1,
                            theme: 1,
                            username: 1,
                            email: 1,
                            phoneNumber: 1
                            
                        }

                    }
                ]).toArray();

                res.status(200).json({ message: "User Settings Fetched", result })

            }
        )


    }
}
