import PageOptions from '@/partials/common/pageOptions';
import getUsers from '@/fetch/user.fetch';
import { PaginatedResponse } from '@/types/paginated-response.type';
import { User } from '@/types/data/place.type';
import UserCard from '@/components/common/cards/user.card';
import CategoryTitle from '@/components/common/cateogry-title';

const UsersPage = async ({
  searchParams: { page = 1, limit = 12 },
}: {
  searchParams: {
    page: number;
    limit: number;
  };
}) => {
  if (Number.isNaN(page) || Number.isNaN(limit)) {
    return <div>Invalid page or limit</div>;
  }

  const usersData: PaginatedResponse<User> | null = await getUsers(page, limit);

  if (!usersData) {
    return <div>Failed to load users</div>;
  }

  const { data: users, totalCount: totalItems } = usersData;

  if (totalItems === 0) {
    return <div>No users found</div>;
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      <CategoryTitle title='Users' />
      <div className='grid w-full grid-cols-2 justify-items-stretch gap-4 sm:grid-cols-3 md:grid-cols-2 min-[880px]:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {users.map((user: User) => (
          <UserCard key={user.uuid} user={user} />
        ))}
      </div>
      <PageOptions page={page} limit={limit} totalItems={totalItems} />
    </div>
  );
};

export default UsersPage;
