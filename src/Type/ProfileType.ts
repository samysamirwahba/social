export interface UserType {
  _id: string;
  id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
  gender: "male" | "female";
  dateOfBirth: string; // ISO date string
  createdAt: string;   // ISO date string
  bookmarks: string[]; // post IDs
  bookmarksCount: number;
  followers: string[]; // user IDs
  followersCount: number;
  following: string[]; // user IDs
  followingCount: number;
}
export interface AuthResponse {
  message: string;
  token: string;
  user: UserType;
}