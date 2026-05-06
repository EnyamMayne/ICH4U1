import { ImageGrid, Pagination } from '@/components';
import { getImageUrl, type ImageCell, type SearchResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const SearchView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [page, setPage] = useState(1);
  const { data } = useTmdb<SearchResponse>('https://api.themoviedb.org/3/search/multi', { query, page });

  const gridData: ImageCell[] = (data?.results ?? [])
    .filter((result) => result.media_type !== 'person')
    .map((result) => ({
      id: result.id,
      imageUrl: getImageUrl(result.poster_path),
      primaryText: result.title || result.name,
      media: result.media_type as 'movie' | 'tv',
    }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="text-3xl font-bold">Results for "{query}"</h1>
      {gridData.length ? (
        <>
          <ImageGrid images={gridData} onClick={(image) => navigate(`/${image.media}/${image.id}`)} />
          <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
        </>
      ) : (
        <p className="text-center text-gray-400">No results found.</p>
      )}
    </section>
  );
};