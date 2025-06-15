export interface UserMetadataInterface {
  uid: string;
  name: string;
  gender: string;
  email: string;
  joinedAt: Date;
  favorites: string[];
  watchHistory: any[];
  preferences: {
    preferredGenres: string[];
    language: string;
  };
  role: string;
}