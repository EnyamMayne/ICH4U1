import { ImageGrid, ImageOverlay } from '@/components';
import { cartAction, favoriteAction, getImageUrl, type ImageCell, type TvDetailResponse } from '@/core';
import { useTmdb, useUserContext } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { favorites, toggleFavorite, cart, toggleCart } = useUserContext();
  const { data } = useTmdb<TvDetailResponse>(`https://api.themoviedb.org/3/tv/${id}`, {});

  const gridData: ImageCell[] = (data?.seasons ?? []).map((season) => ({
    id: season.id,
    imageUrl: getImageUrl(season.poster_path),
    primaryText: season.name,
    secondaryText: season.air_date,
    showId: Number(id),
    season: season.season_number,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold">Seasons</h2>
      {gridData.length ? (
        <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${id}/season/${image.season}/episode/1`)}>
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
      ) : (
        <p className="text-center text-gray-400">No seasons available.</p>
      )}
    </section>
  );
};