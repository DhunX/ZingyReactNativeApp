export type User = {
  id: string;
  name: string;
  profilePicUrl: string;
  email: string;
  username: string;
  bio: string;
  location?: string;
  genere?: string[];
  followers?: {count: number; users: string[]};
  following?: {count: number; users: string[]};
  tracks?: string[];
  posts?: string[];
  interests?: string[];
  isCreator?: boolean;
};
