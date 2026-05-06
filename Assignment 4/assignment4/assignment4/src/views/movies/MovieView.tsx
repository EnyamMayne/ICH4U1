import { DetailItem, LinkGroup, Modal } from '@/components';
import { getBackdropUrl, getImageUrl, type MovieDetailResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<MovieDetailResponse>(`https://api.themoviedb.org/3/movie/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <img className="h-50 w-full rounded-t-2xl object-cover" src={getBackdropUrl(data.backdrop_path)} alt={data.title} />
        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5">
          <img className="w-40 rounded-xl object-cover" src={getImageUrl(data.poster_path)} alt={data.title} />
          <div className="space-y-4 overflow-y-auto">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="leading-relaxed text-gray-300">{data.overview}</p>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Release" value={data.release_date} />
              <DetailItem label="Rating" value={data.vote_average} />
              <DetailItem label="Runtime" value={`${data.runtime} min`} />
              <DetailItem label="Genres" value={data.genres.map((g) => g.name).join(', ')} />
            </div>
            <LinkGroup
              options={[
                { label: 'Credits', to: 'credits' },
                { label: 'Trailers', to: 'trailers' },
                { label: 'Reviews', to: 'reviews' },
              ]}
            />
            <Outlet />
          </div>
        </div>
      </div>
    </Modal>
  );
};
