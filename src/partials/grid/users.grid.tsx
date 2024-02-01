import { API_URL } from '@/configs/api';
import { User } from '@/types/data/place.type';
import UserCard from '@/components/common/cards/user.card';

const getUsers = async () => {
  const response = await fetch(`${API_URL}/user/profile`, {
    next: {
      revalidate: 1,
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as User[];
  // console.log(data);

  return data;
};

const UsersGrid = async () => {
  const users: User[] = await getUsers();

  return (
    <div className='grid w-full grid-cols-2 grid-rows-[1fr_1fr_0] justify-items-stretch gap-x-4 gap-y-4 overflow-hidden p-2 sm:grid-cols-3 md:grid-cols-2 min-[880px]:grid-cols-3 lg:grid-cols-4 lg:grid-rows-[1fr_0_0] lg:gap-y-0 xl:grid-cols-5 2xl:grid-cols-6'>
      {users.map((user: User) => (
        <UserCard key={user.uuid} user={user} />
      ))}
    </div>
  );
};

export default UsersGrid;
