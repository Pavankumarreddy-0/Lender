import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const updatePassword = {
    path: '/api/update-password/',
    method: 'put',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { oldPass, newPass, confNewPass } = req.body;
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

                const user = await db.collection('users').findOne({ _id: ObjectId(decoded.id) });

                if (!user) {
                    res.sendStatus(401);
                    return;
                }

                const { _id: id, isEmailVerified, passwordHash, apiVersion, username } = user;

                //tp do validate and update password
                const isCorrect = await bcrypt.compare(oldPass, passwordHash);

                if(isCorrect){

                    const passwordHash = await bcrypt.hash(newPass, 10);

                    if(newPass != confNewPass){
                        res.status(401).json({ message: "Passwords do not match" })
                        return;
                    }

                    const result = await db.collection("users").findOneAndUpdate(
                        {
                            "_id": ObjectId(decoded.id)
                        },
                        { $set: { passwordHash } },
                        { returnOriginal: false }
                    );
                    
                    res.status(200).json({ message: "Password Updated" })

                }else{
                    res.status(401).json({ message: "Invalid Old Credentials" })
                }

                

            }
        )


    }
}
