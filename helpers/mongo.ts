import { Db, MongoClient, Document } from "mongodb";

export const mongoURL =
  "mongodb+srv://uli-admin:admin@cluster0.18yz9ed.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = async (client: MongoClient) => {
  const myClaster = await client.connect();
  const db = myClaster.db("events");
  return db;
};

export const insertOne = async (
  db: Db,
  collection: "emails" | "comments",
  doc: Document
) => {
  const result = await db.collection(collection).insertOne(doc);
  return result;
};
