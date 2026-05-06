import { DetailItem, LinkGroup, Modal } from '@/components';
import { getImageUrl, type PersonDetailResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const PersonView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<PersonDetailResponse>(`https://api.themoviedb.org/3/person/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5 h-full">
        <img className="w-40 rounded-xl object-cover self-start" src={getImageUrl(data.profile_path)} alt={data.name} />
        <div className="space-y-4 overflow-y-auto">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="leading-relaxed text-gray-300 line-clamp-6">{data.biography}</p>
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Birthday" value={data.birthday} />
            <DetailItem label="Born In" value={data.place_of_birth} />
            <DetailItem label="Known For" value={data.known_for_department} />
          </div>
          <LinkGroup
            options={[
              { label: 'Career', to: 'career' },
              { label: 'Images', to: 'images' },
            ]}
          />
          <Outlet />
        </div>
      </div>
    </Modal>
  );
};