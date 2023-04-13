import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const createOrganization = {
    path: '/api/create-organization/',
    method: 'put',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { _id,contactPoint,organizationDetails } = req.body;

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
                const result = await db.collection('person').insertOne({
                    ...contactPoint,
                    type: (organizationDetails.organizationInterest == "Investing") ? "Corporate Investor" : "Fundraiser",
                    kycStatus: "Draft",
                    createdBy: ObjectId(_id)
                })

                const result2 = await db.collection('organization').insertOne({
                    ...organizationDetails,
                    kybStatus: "Draft",
                    createdBy: ObjectId(_id),
                    contactPoint: result.insertedId,
                    createdAt: new Date()
                })

                const result3 = await db.collection("person").findOneAndUpdate(
                    {
                        "_id": ObjectId(result.insertedId)
                    },
                    { $set: { organization: result2.insertedId, createdAt: new Date() } },
                    { returnOriginal: true }
                );

                res.status(200).json({ message: "Role Created", contactPoint: result3, organization: result2 })

            }
        )


    }
}
