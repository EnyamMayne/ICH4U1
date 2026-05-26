export type SearchType = 'movie' | 'tv' | 'person';

export type Media = 'movie' | 'tv';

export type ImageCell = {
  id: number;
  imageUrl: string;
  primaryText?: string;
  secondaryText?: string;
  showId?: number;
  seasonId?: number;
  season?: number;
  media?: Media;
};

// Shared
export type Genre = {
  id: number;
  name: string;
};

// Movie list (now playing, popular, top rated, upcoming, trending, genre, search)
export type MovieListResponse = {
  results: Array<{
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  }>;
  total_pages: number;
};

// TV list (airing today, on the air, popular, top rated, trending, genre)
export type TvListResponse = {
  results: Array<{
    id: number;
    name: string;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
  }>;
  total_pages: number;
};

// Movie detail
export type MovieDetailResponse = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: Genre[];
};

// TV detail
export type TvDetailResponse = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  number_of_seasons: number;
  genres: Genre[];
  seasons: Array<{
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
    poster_path: string;
    air_date: string;
    overview: string;
  }>;
};

// Episode detail
export type EpisodeDetailResponse = {
  id: number;
  name: string;
  overview: string;
  still_path: string;
  air_date: string;
  episode_number: number;
  season_number: number;
  vote_average: number;
  runtime: number;
};

// Credits (movies and tv)
export type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    profile_path: string;
    character: string;
  }>;
};

// Reviews
export type ReviewsResponse = {
  results: Array<{
    id: string;
    author: string;
    content: string;
  }>;
};

// Trailers
export type VideosResponse = {
  results: Array<{
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
  }>;
};

// Person detail
export type PersonDetailResponse = {
  id: number;
  name: string;
  biography: string;
  profile_path: string;
  birthday: string;
  place_of_birth: string;
  known_for_department: string;
};

// Person credits (career)
export type PersonCreditsResponse = {
  cast: Array<{
    id: number;
    title: string;
    name: string;
    poster_path: string;
    character: string;
    media_type: string;
    release_date: string;
    first_air_date: string;
  }>;
};

// Person images
export type PersonImagesResponse = {
  profiles: Array<{
    file_path: string;
  }>;
};

// Search
export type SearchResponse = {
  results: Array<{
    id: number;
    title: string;
    name: string;
    poster_path: string;
    media_type: string;
    release_date: string;
    first_air_date: string;
    vote_average: number;
  }>;
  total_pages: number;
};
