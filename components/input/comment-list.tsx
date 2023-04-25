import classes from "./comment-list.module.css";

interface ICommentsList {
  comments: { id: string; name: string; comment: string }[];
}

function CommentList({ comments }: ICommentsList) {
  console.log(comments);
  return (
    <ul className={classes.comments}>
      {comments &&
        comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default CommentList;
