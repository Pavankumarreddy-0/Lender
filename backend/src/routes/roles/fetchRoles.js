import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const fetchRoles = {
    path: '/api/roles/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;

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
                const result = await db.collection("roles").find({}).toArray();

                res.status(200).json({ message: "Roles Fetched", result })

            }
        )


    }
}
