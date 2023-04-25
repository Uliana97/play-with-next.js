import { validateEmail } from "@/helpers/emailValidation";
import { NextApiRequest, NextApiResponse } from "next";

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
      res.status(201).json({ message: "Signed up!" });
    }
  } catch (err) {
    res.status(403).json({ err: "Error!" });
  }
};

export default handler;
