import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup, ImageGrid, ImageOverlay, Pagination } from '@/components';
import { cartAction, favoriteAction, getImageUrl, type ImageCell, type MovieListResponse } from '@/core';
import { useTmdb, useUserContext } from '@/hooks';

const CATEGORIES = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

export const MoviesView = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('now_playing');
  const [page, setPage] = useState(1);
  const { favorites, toggleFavorite, cart, toggleCart } = useUserContext();
  const { data } = useTmdb<MovieListResponse>(`https://api.themoviedb.org/3/movie/${category}`, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.title,
    secondaryText: result.release_date,
    media: 'movie',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Movies</h1>
      <ButtonGroup
        value={category}
        options={CATEGORIES}
        onClick={(val) => {
          setCategory(val);
          setPage(1);
        }}
      />
      <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}`)}>
        {(image) => (
          <ImageOverlay
            image={image}
            actions={[
              favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite),
              cartAction((image: ImageCell) => cart.has(image.id), toggleCart),
            ]}
          />
        )}
      </ImageGrid>
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};