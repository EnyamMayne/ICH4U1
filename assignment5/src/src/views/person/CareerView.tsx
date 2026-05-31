import { ImageGrid } from '@/components';
import { getImageUrl, type ImageCell, type PersonCreditsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const CareerView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<PersonCreditsResponse>(`https://api.themoviedb.org/3/person/${id}/combined_credits`, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.title || result.name,
    secondaryText: result.character,
    media: result.media_type as 'movie' | 'tv',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold">Career</h2>
      {gridData.length ? (
        <ImageGrid images={gridData} onClick={(image) => navigate(`/${image.media}/${image.id}`)} />
      ) : (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
    </section>
  );
};
