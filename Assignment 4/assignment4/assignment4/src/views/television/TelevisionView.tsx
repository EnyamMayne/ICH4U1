import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { getImageUrl, type ImageCell, type TvListResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { label: 'Airing Today', value: 'airing_today' },
  { label: 'On The Air', value: 'on_the_air' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
];

export const TelevisionView = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('airing_today');
  const [page, setPage] = useState(1);
  const { data } = useTmdb<TvListResponse>(`https://api.themoviedb.org/3/tv/${category}`, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.name,
    media: 'tv',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Television</h1>
      <ButtonGroup
        value={category}
        options={CATEGORIES}
        onClick={(val) => {
          setCategory(val);
          setPage(1);
        }}
      />
      <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/${image.id}`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};