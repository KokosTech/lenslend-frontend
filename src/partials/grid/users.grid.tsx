import UserCard from '@/components/common/cards/user.card';
import { User } from '@/types/data/place.type';
import getUsers from '@/fetch/user.fetch';
import { PaginatedResponse } from '@/types/paginated-response.type';

const UsersGrid = async () => {
  const usersData: PaginatedResponse<User> | null = await getUsers(1, 6);

  if (!usersData) {
    return <div>Failed to load users</div>;
  }

  const { data: users } = usersData;

  return (
    <div className='grid w-full grid-cols-2 grid-rows-[1fr_1fr_0] justify-items-stretch gap-x-4 gap-y-4 overflow-hidden sm:grid-cols-3 md:grid-cols-2 min-[880px]:grid-cols-3 lg:grid-cols-4 lg:grid-rows-[1fr_0_0] lg:gap-y-0 xl:grid-cols-5 2xl:grid-cols-6'>
      {users.map((user: User) => (
        <UserCard key={user.uuid} user={user} />
      ))}
    </div>
  );
};

export default UsersGrid;
