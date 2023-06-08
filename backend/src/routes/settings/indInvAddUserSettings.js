import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const IndIvUpdateUserSettings = {
    path: '/api/update-investor-settings/',
    method: 'put',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { userSettings } = req.body;

        if (!authorization) {
            return res.status(401).json({ message: "No Authorization header sent." })
        }

        if( "email" in userSettings){
            delete userSettings.email;
        }

        if( "passwordHash" in userSettings){
            delete userSettings.passwordHash;
        }

        // bearer [Token] <=== need this
        const token = authorization.split(" ")[1];

        jwt.verify(
            token,
            process.env.JWT_SECRET,
            async (err, decoded) => {

                if (err) return res.status(401).json({ message: "Unable to verify user" });

                const db = getDbConnection(process.env.API_DB_NAME);
                const result = await db.collection("person").findOneAndUpdate(
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
