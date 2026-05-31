import { ImageGrid, Pagination } from '@/components';
import { getImageUrl, type ImageCell, type MovieListResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const GenreView = () => {
  const navigate = useNavigate();
  const { mediaType, id } = useParams();
  const [page, setPage] = useState(1);
  const { data } = useTmdb<MovieListResponse>(`https://api.themoviedb.org/3/discover/${mediaType}`, { with_genres: id, page });

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
      <h1 className="text-3xl font-bold">Genre</h1>
      <ImageGrid images={gridData} onClick={(image) => navigate(`/${mediaType}/${image.id}`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
