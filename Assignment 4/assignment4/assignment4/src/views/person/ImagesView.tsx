import { ImageGrid } from '@/components';
import { getImageUrl, type ImageCell, type PersonImagesResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<PersonImagesResponse>(`https://api.themoviedb.org/3/person/${id}/images`, {});

  const gridData: ImageCell[] = (data?.profiles ?? []).map((image, index) => ({
    id: index,
    imageUrl: getImageUrl(image.file_path),
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold">Images</h2>
      {gridData.length ? <ImageGrid images={gridData} /> : <p className="text-center text-gray-400">No images available.</p>}
    </section>
  );
};
