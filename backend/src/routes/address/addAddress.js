import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const addNewAddress = {
    path: '/api/add-address/',
    method: 'put',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { address, isCurrent, orgID } = req.body;

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
                // const result = await db.collection("roles").find({}).toArray();
                
              
                const result = await db.collection('addresses').insertOne({
                    ...address,
                    createdAt: new Date(),
                    orgID: ObjectId(orgID),
                    contactId: ObjectId(decoded.id)
                })


                if(! (isCurrent === "No")){
                    const result2 = await db.collection("organization").findOneAndUpdate(
                        {
                            "_id": ObjectId(orgID)
                        },
                        { $set: { activeAddress: ObjectId(result.insertedId) } },
                        { returnOriginal: true }
                    );
    
                }

                res.status(200).json({ message: "Address Created", addressId: result.insertedId  })
                 
            }
        )


    }
}
