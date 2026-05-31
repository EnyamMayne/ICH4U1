import { type VideosResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useLocation, useParams } from 'react-router-dom';

export const TrailersView = () => {
  const { id } = useParams();
  const location = useLocation();
  const mediaType = location.pathname.startsWith('/tv') ? 'tv' : 'movie';
  const { data } = useTmdb<VideosResponse>(`https://api.themoviedb.org/3/${mediaType}/${id}/videos`, {});

  const trailers = (data?.results ?? []).filter((v) => v.site === 'YouTube');

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold">Trailers</h2>
      {trailers.length ? (
        <div className="grid grid-cols-2 gap-5">
          {trailers.map((video) => (
            <div key={video.id} className="space-y-2">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full rounded-xl"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-gray-400">{video.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No trailers available.</p>
      )}
    </section>
  );
};
