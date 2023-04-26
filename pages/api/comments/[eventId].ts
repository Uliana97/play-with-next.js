import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

import { validateEmail } from "@/helpers/emailValidation";
import { mongoURL } from "@/helpers/mongo";

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
  const myClaster = await client.connect();
  try {
    if (req.method === "POST") {
      const eventId = req.query.eventId;
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

      const db = myClaster.db("events");
      const result = await db
        .collection("comments")
        .insertOne({ comment: commentData });

      commentData = { ...commentData, id: result.insertedId };
      client.close();

      res.status(201).json({ message: "Comment added!", comment: commentData });
    }

    if (req.method === "GET") {
      const db = myClaster.db("events");
      const comments = await db
        .collection("comments")
        .find()
        .sort({ _id: -1 })
        .toArray();

      res.status(201).json({ comments });
    }
  } catch (err) {
    res.status(403).json({ err: "Error!" });
  }
};

export default handler;
