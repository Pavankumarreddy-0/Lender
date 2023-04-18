import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const updateUserSettings = {
    path: '/api/update-user-settings/',
    method: 'put',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const {  userSettings } = req.body;

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
                const result = await db.collection("users").findOneAndUpdate(
                    {
                        "_id": ObjectId(decoded.id)
                    },
                    { $set: { ...userSettings } },
                    { returnOriginal: false }
                );

                res.status(200).json({ message: "Settings Updated" })

            }
        )


    }
}
