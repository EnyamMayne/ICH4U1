import { MainLayout } from '@/layouts';
import {
  // site
  HomeView,
  ErrorView,
  // movies
  MoviesView,
  MovieView,
  CreditsView,
  TrailersView,
  ReviewsView,
  // television
  TelevisionView,
  TvView,
  SeasonsView,
  EpisodeView,
  // person
  PersonView,
  CareerView,
  ImagesView,
  // other
  TrendingView,
  GenreView,
  SearchView,
} from '@/views';
import { Route, Routes } from 'react-router-dom';
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>

        {/* Movies */}
        <Route path="/movies" element={<MoviesView />} />
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>

        {/* Television */}
        <Route path="/television" element={<TelevisionView />} />
        <Route path="/tv/:id" element={<TvView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="seasons" element={<SeasonsView />} />
        </Route>
        <Route path="/tv/:id/season/:seasonNumber/episode/:episodeNumber" element={<EpisodeView />} />

        {/* Person */}
        <Route path="/person/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>

        {/* Other */}
        <Route path="/trending" element={<TrendingView />} />
        <Route path="/genre/:mediaType/:id" element={<GenreView />} />
        <Route path="/search" element={<SearchView />} />

      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};