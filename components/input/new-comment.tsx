import { FormEvent, useRef, useState } from "react";
import classes from "./new-comment.module.css";
import { useRouter } from "next/router";
import { validateEmail } from "@/helpers/emailValidation";

function NewComment(props: {
  onAddComment: (
    id: string,
    email: string,
    name: string,
    comment: string
  ) => void;
}) {
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  function sendCommentHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredName = nameInputRef.current?.value;
    const enteredComment = commentInputRef.current?.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !validateEmail(enteredEmail) ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment(eventId, enteredEmail, enteredName, enteredComment);
  }

  return (
    <form className={classes.form} onSubmit={(e) => sendCommentHandler(e)}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows={5} ref={commentInputRef}></textarea>
      </div>
      {isInvalid && (
        <p>Please enter a valid email address, name and comment!</p>
      )}
      <button>Submit</button>
    </form>
  );
}

export default NewComment;
