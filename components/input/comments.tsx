import { useState, useEffect } from "react";

import CommentList, { IComment } from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { useNotification } from "@/store/notification-provider";

function Comments(props: { eventId: string }) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<IComment[] | []>([]);
  const [newComment, setNewComment] = useState<IComment | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (showComments) {
      setLoading(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setComments(data.comments);
        });
    }
  }, [showComments, eventId]);

  useEffect(() => {
    if (newComment) {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  }, [newComment]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = async (
    id: string,
    email: string,
    name: string,
    comment: string
  ) => {
    showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });

    const rawResponse = await fetch(`/api/comments/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, comment }),
    });

    const content = await rawResponse.json();
    setNewComment(content);

    if (!rawResponse.ok) {
      showNotification({
        title: "Error!",
        message: content.message || "Something went wrong!",
        status: "error",
      });
      return;
    }

    showNotification({
      title: "Success!",
      message: "Comment successfully added! :)",
      status: "success",
    });
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <>
          <NewComment onAddComment={addCommentHandler} />
          {loading ? <p>Loading...</p> : <CommentList comments={comments} />}
        </>
      )}
    </section>
  );
}

export default Comments;
