import { ImageGrid } from '@/components';
import { getImageUrl, type CreditsResponse, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const CreditsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<CreditsResponse>(`https://api.themoviedb.org/3/movie/${id}/credits`, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.profile_path),
    primaryText: result.name,
    secondaryText: result.character,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold">Credits</h2>
      {data.cast.length ? (
        <ImageGrid images={gridData} onClick={(image) => navigate(`/person/${image.id}`)} />
      ) : (
        <p className="text-center text-gray-400">No credits available.</p>
      )}
    </section>
  );
};
