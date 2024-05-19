import PageOptions from '@/partials/common/pageOptions';

import UserCard from '@/components/common/cards/user.card';
import CategoryTitle from '@/components/common/cateogry-title';

import getUsers from '@/fetch/user.fetch';

import { User } from '@/types/data/place.type';
import { PaginatedResponse } from '@/types/paginated-response.type';
import PageLimitError from '@/components/error/page-limit.error';
import { DEFAULT_PAGE, DEFAULT_USER_LIMIT } from '@/constants/limits';

const UsersPage = async ({
  searchParams: { page = DEFAULT_PAGE, limit = DEFAULT_USER_LIMIT },
}: {
  searchParams: {
    page: number;
    limit: number;
  };
}) => {
  if (Number.isNaN(page) || Number.isNaN(limit) || limit < 1) {
    return <PageLimitError />;
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
