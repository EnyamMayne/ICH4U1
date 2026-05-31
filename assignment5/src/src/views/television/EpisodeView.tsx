import { DetailItem } from '@/components';
import { getBackdropUrl, type EpisodeDetailResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const EpisodeView = () => {
  const navigate = useNavigate();
  const { id, seasonNumber, episodeNumber } = useParams();
  const { data } = useTmdb<EpisodeDetailResponse>(
    `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`,
    {}
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5 p-5">
      <button className="text-sm text-gray-400 transition hover:text-white" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <img className="w-full rounded-2xl object-cover" src={getBackdropUrl(data.still_path)} alt={data.name} />
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="leading-relaxed text-gray-300">{data.overview}</p>
      <div className="grid grid-cols-2 gap-4">
        <DetailItem label="Air Date" value={data.air_date} />
        <DetailItem label="Rating" value={data.vote_average} />
        <DetailItem label="Season" value={data.season_number} />
        <DetailItem label="Episode" value={data.episode_number} />
      </div>
    </div>
  );
};
