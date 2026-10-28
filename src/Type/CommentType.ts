export interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface commentType {
  _id: string;
  commentCreator: CommentCreator;
  content: string;
  image : string
  createdAt: string;      // ISO date string
  likes: string[];        // array of user IDs
  parentComment: string | null;  // null for top-level comments, comment _id for replies
  post: string;   
  postId: string;        // post _id
}