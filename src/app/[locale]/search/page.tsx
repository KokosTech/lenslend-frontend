import { ShortListingResponse } from '@/types/data/listing.type';
import { CardPlace, User } from '@/types/data/place.type';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { PaginatedResponse } from '@/types/paginated-response.type';
import { toInteger } from 'lodash';
import { Metadata } from 'next';
import PageOptions from '@/partials/common/pageOptions';
import { GlobalSearchResult } from '@/types/data/search.type';
import CategorySearch from '@/app/[locale]/search/category.search';
import GlobalSearch from '@/app/[locale]/search/global.search';
import SearchWrapper from '@/app/[locale]/search/search.wrapper';
import { getSearch } from '@/fetch/search.fetch';

const SearchPage = async ({
  searchParams: { search, category, page, limit },
  params: { locale },
}: {
  searchParams: {
    search: string;
    category?: string;
    page?: number;
    limit?: number;
  };
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);

  if (Number.isNaN(toInteger(page)) || Number.isNaN(toInteger(limit))) {
    return <div>Invalid page or limit</div>;
  }

  const data = await getSearch(search, category, page, limit);

  // === GLOBAL SEARCH ===

  if (category === undefined) {
    return (
      <SearchWrapper>
        <GlobalSearch data={data as GlobalSearchResult} />
      </SearchWrapper>
    );
  }

  // === CATEGORY SEARCH ===

  const { data: categoryData } = data as PaginatedResponse<
    ShortListingResponse | CardPlace | User
  >;

  const { totalCount } = data as PaginatedResponse<
    ShortListingResponse | CardPlace | User
  >;

  return (
    <SearchWrapper>
      <div className='flex flex-col gap-4'>
        <CategorySearch
          category={category}
          search={search}
          categoryData={
            categoryData as ShortListingResponse[] | CardPlace[] | User[]
          }
          page={page}
          limit={limit}
          totalCount={totalCount}
        />
      </div>
      <PageOptions
        page={page || 1}
        limit={limit || 12}
        totalItems={totalCount}
      />
    </SearchWrapper>
  );
};

export async function generateMetadata({
  locale,
  searchParams: { search, category },
}: {
  locale: string;
  searchParams: {
    search: string;
    category?: 'Places' | 'Equipment' | 'Freelancers';
  };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'search',
  });

  const title = `${t('metadata.search_for')} ${search ?? ''} ${t('metadata.in')} ${(category && t(`categories.${category}`)) || t('metadata.all_categories')}`;
  const description = t('description');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default SearchPage;
