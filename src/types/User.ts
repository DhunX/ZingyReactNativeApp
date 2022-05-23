export type User = {
  id: string;
  name: string;
  profilePicUrl: string;
  email: string;
  username: string;
  bio: string;
  location?: string;
  genere?: string[];
  interests?: string[];
  isCreator?: boolean;
};
