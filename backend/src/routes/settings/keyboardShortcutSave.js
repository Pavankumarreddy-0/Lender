import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const keyboardShortcutSave = {
    path: '/api/save-keyboard-shortcut/',
    method: 'put',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { _id, keyboardShortcuts } = req.body;

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
                    { $set: { keyboardShortcuts } },
                    { returnOriginal: false }
                );

                res.status(200).json({ message: "Shortcuts Updated", keyboardShortcuts })

            }
        )


    }
}
