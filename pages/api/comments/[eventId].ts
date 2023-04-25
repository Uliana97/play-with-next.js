import { validateEmail } from "@/helpers/emailValidation";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    name: string;
    comment: string;
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
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
      const commentData = {
        id: eventId,
        email,
        name,
        comment,
      };
      res.status(201).json({ message: "Comment added!", comment: commentData });
    }

    if (req.method === "GET") {
      const dummyList = [
        { id: "e1", name: "Mike", comment: "First comment" },
        { id: "e2", name: "Alisa", comment: "Second comment" },
      ];
      res.status(201).json({ comments: dummyList });
    }
  } catch (err) {
    res.status(403).json({ err: "Error!" });
  }
};

export default handler;
