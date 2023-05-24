import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

import { validateEmail } from "@/helpers/emailValidation";
import { connectDB, insertOne, mongoURL } from "@/helpers/mongo";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    name: string;
    comment: string;
  };
}

const client = new MongoClient(mongoURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const eventId = req.query.eventId;
  const myClaster = await client.connect();
  try {
    if (req.method === "POST") {
      const { email, name, comment } = req.body;

      if (
        !email ||
        !validateEmail(email) ||
        name.trim() === "" ||
        comment.trim() === ""
      ) {
        res.status(422).json({ message: "Invalid data" });
      }
      let commentData: {
        eventId: string | string[] | undefined;
        email: string;
        name: string;
        comment: string;
        id?: ObjectId;
      } = {
        eventId,
        email,
        name,
        comment,
      };

      let db;

      try {
        db = await connectDB(client);
      } catch {
        res.status(500).json({ message: "Connecting to the database failed" });
        return;
      }

      try {
        const res = await insertOne(db, "comments", { comment: commentData });
        commentData = { ...commentData, id: res.insertedId };

        client.close();
      } catch {
        res.status(500).json({ message: "Inserting data failed" });
        return;
      }

      res.status(201).json({ message: "Comment added!", comment: commentData });
    }

    if (req.method === "GET") {
      const db = myClaster.db("events");
      const comments = await db
        .collection("comments")
        .find({ "comment.eventId": eventId })
        .sort({ _id: -1 })
        .toArray();

      res.status(201).json({ comments });
    }
  } catch (err) {
    res.status(403).json({ err: "Error!" });
  }
};

export default handler;
