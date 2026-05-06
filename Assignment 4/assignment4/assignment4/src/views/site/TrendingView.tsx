import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { getImageUrl, type ImageCell, type MovieListResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MEDIA_TYPES = [
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'tv' },
];

const INTERVALS = [
  { label: 'Today', value: 'day' },
  { label: 'This Week', value: 'week' },
];

export const TrendingView = () => {
  const navigate = useNavigate();
  const [mediaType, setMediaType] = useState('movie');
  const [interval, setInterval] = useState('day');
  const [page, setPage] = useState(1);
  const { data } = useTmdb<MovieListResponse>(`https://api.themoviedb.org/3/trending/${mediaType}/${interval}`, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.title,
    media: mediaType as 'movie' | 'tv',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Trending</h1>
      <div className="flex gap-5">
        <ButtonGroup value={mediaType} options={MEDIA_TYPES} onClick={(val) => { setMediaType(val); setPage(1); }} />
        <ButtonGroup value={interval} options={INTERVALS} onClick={(val) => { setInterval(val); setPage(1); }} />
      </div>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/${mediaType}/${image.id}`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};