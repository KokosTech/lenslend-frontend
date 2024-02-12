/* eslint-disable indent */

import { ShortListingResponse } from '@/types/data/listing.type';
import { CardPlace, User } from '@/types/data/place.type';
import PlacesSearch from '@/app/[locale]/search/places.search';
import ListingSearch from '@/app/[locale]/search/listing.search';
import UsersSearch from '@/app/[locale]/search/users.search';
import CategoryTitle from '@/components/common/cateogry-title';
import { useTranslations } from 'next-intl';

const CategorySearch = ({
  category,
  search,
  categoryData,
}: {
  category: string;
  search: string;
  categoryData: ShortListingResponse[] | CardPlace[] | User[];
  page?: number;
  limit?: number;
  totalCount: number;
}) => {
  const t = useTranslations('search');

  switch (category) {
    case 'Places':
      return (
        <CategoryWrapper
          title={`${t('relevant places')} ${t('to')} "${search}"`}
        >
          <PlacesSearch places={categoryData as CardPlace[]} />
        </CategoryWrapper>
      );
    case 'Equipment':
      return (
        <CategoryWrapper
          title={`${t('relevant listings')} ${t('to')} "${search}"`}
        >
          <ListingSearch listings={categoryData as ShortListingResponse[]} />
        </CategoryWrapper>
      );
    case 'Freelancers':
      return (
        <CategoryWrapper
          title={`${t('relevant_users')} ${t('to')} "${search}"`}
        >
          <UsersSearch users={categoryData as User[]} />
        </CategoryWrapper>
      );
    default:
      return <div>Category not found</div>;
  }
};

const CategoryWrapper = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) => (
  <>
    <CategoryTitle title={title} />
    {children}
  </>
);

export default CategorySearch;
