export interface Review {
  username: string;
  comment: string;
  rating: number;
}


export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  reviews: Review[];
  genre?: string;
}
  