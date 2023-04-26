import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const generatePasswordRoute = {
    path: '/api/generate-password/',
    method: 'put',
    handler: async (req, res) => {
        const { password, confirmPassword, encryptedHash } = req.body;

        console.log(req.body);
        
        const db = getDbConnection(process.env.API_DB_NAME);

        //decrypt hash first
        jwt.verify(
            encryptedHash,
            process.env.JWT_SECRET,
            async (err, decoded) => {

                console.log(decoded)

                if (err) return res.status(401).json({ message: "Invalid Request" });

                if(Date.now() >= decoded.exp * 1000){
                    res.status(401).json({ message: "Password Generation Key has been expired" });
                    return;
                }
                
                if(password != confirmPassword){
                    res.status(401).json({ message: "Passwords do not match" });
                    return;
                }

                console.log("came here")

                const user = await db.collection('person').findOne({ _id: ObjectId(decoded.id) });

                //if user already exist
                if (!user) {
                    res.sendStatus(401).json({message: "Incorrect Request Hash"});
                    return;
                }

                //encrypt password
                const passwordHash = await bcrypt.hash(password, 10);

                //update password
                const result = await db.collection("person").findOneAndUpdate(
                    {
                        "_id": ObjectId(decoded.id)
                    },
                    { $set: { passwordHash } },
                    { returnOriginal: false }
                );

                res.status(200).json({ message: "Password Generated" })

        })

    }
}