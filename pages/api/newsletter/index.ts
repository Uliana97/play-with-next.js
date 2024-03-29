import { MongoClient, ServerApiVersion } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import { validateEmail } from "@/helpers/emailValidation";
import { connectDB, insertOne, mongoURL } from "@/helpers/mongo";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const enteredEmail = req.body.email;

      if (!enteredEmail || !validateEmail(enteredEmail)) {
        res.status(422).json({ message: "Email is not defined." });
        return;
      }

      let db;

      try {
        db = await connectDB(client);
      } catch {
        res.status(500).json({ message: "Connecting to the database failed" });
        return;
      }

      try {
        await insertOne(db, "emails", { email: enteredEmail });
        client.close();
      } catch {
        res.status(500).json({ message: "Inserting data failed" });
        return;
      }

      res.status(201).json({ message: "Signed up!" });
    }
  } catch (err) {
    res.status(403).json({ err });
  }
};

export default handler;
