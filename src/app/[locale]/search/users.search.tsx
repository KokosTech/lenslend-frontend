import { User } from '@/types/data/place.type';
import UserCard from '@/components/common/cards/user.card';

const UsersSearch = ({ users }: { users: User[] }) => (
  <div className='grid w-full grid-cols-2 justify-items-stretch gap-x-4 gap-y-4 sm:grid-cols-3 md:grid-cols-2 min-[880px]:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6'>
    {users.map((user) => (
      <UserCard user={user} key={user.uuid} />
    ))}
  </div>
);

export default UsersSearch;
