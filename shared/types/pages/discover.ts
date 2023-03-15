export interface DiscoverPageProps {
  genres: object[]; // 장르 리스트
}

export interface GameData {
  success: boolean;
  games: {
    id: number;
    cover?: {
      image_id?: string;
    };
    name: string;
    aggregated_rating: number;
  }[];
  count: number;
}
