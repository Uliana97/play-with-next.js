import classes from "./comment-list.module.css";

export interface IComment {
  comment: {
    eventId: string;
    name: string;
    email: string;
    comment: string;
  };
  _id: string;
}

interface ICommentList {
  comments: IComment[];
}

function CommentList({ comments }: ICommentList) {
  return (
    <ul className={classes.comments}>
      {comments.length ? (
        comments.map(({ comment, _id }) => (
          <li key={_id}>
            <p>{comment.comment}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        ))
      ) : (
        <p>No comments yet :(</p>
      )}
    </ul>
  );
}

export default CommentList;
