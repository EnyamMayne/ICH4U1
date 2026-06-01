import { MainLayout } from '@/layouts';
import {
  CareerView,
  CartView,
  CreditsView,
  EpisodeView,
  ErrorView,
  FavoritesView,
  GenreView,
  // site
  HomeView,
  ImagesView,
  // movies
  MoviesView,
  MovieView,
  // person
  PersonView,
  ReviewsView,
  SearchView,
  SeasonsView,
  SettingsView,
  // television
  TelevisionView,
  TrailersView,
  // other
  TrendingView,
  TvView,
} from '@/views';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="/movies" element={<MoviesView />} />
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
        <Route path="/television" element={<TelevisionView />} />
        <Route path="/tv/:id" element={<TvView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailersView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="seasons" element={<SeasonsView />} />
        </Route>
        <Route path="/tv/:id/season/:seasonNumber/episode/:episodeNumber" element={<EpisodeView />} />
        <Route path="/person/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>
        <Route path="/trending" element={<TrendingView />} />
        <Route path="/genre/:mediaType/:id" element={<GenreView />} />
        <Route path="/search" element={<SearchView />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/favorites" element={<FavoritesView />} />
        <Route path="/settings" element={<SettingsView />} />
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};