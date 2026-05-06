import { DetailItem, LinkGroup, Modal } from '@/components';
import { getBackdropUrl, getImageUrl, type TvDetailResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const TvView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<TvDetailResponse>(`https://api.themoviedb.org/3/tv/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <img className="h-50 w-full rounded-t-2xl object-cover" src={getBackdropUrl(data.backdrop_path)} alt={data.name} />
        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5">
          <img className="w-40 rounded-xl object-cover" src={getImageUrl(data.poster_path)} alt={data.name} />
          <div className="space-y-4 overflow-y-auto">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="leading-relaxed text-gray-300">{data.overview}</p>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="First Air Date" value={data.first_air_date} />
              <DetailItem label="Rating" value={data.vote_average} />
              <DetailItem label="Seasons" value={data.number_of_seasons} />
              <DetailItem label="Genres" value={data.genres.map((g) => g.name).join(', ')} />
            </div>
            <LinkGroup
              options={[
                { label: 'Credits', to: 'credits' },
                { label: 'Trailers', to: 'trailers' },
                { label: 'Reviews', to: 'reviews' },
                { label: 'Seasons', to: 'seasons' },
              ]}
            />
            <Outlet />
          </div>
        </div>
      </div>
    </Modal>
  );
};