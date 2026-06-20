export interface Review {
  id?: number;
  user_id?: number;
  email?: string;
  username: string;
  comment: string;
  rating: number;
}


export interface Game {
  id: string;
  slug?: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  reviews: Review[];
  genre?: string;
}
  