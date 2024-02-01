import { CreateListingForm } from '@/types/forms/create-listing.form';

const CreateListingInitial: CreateListingForm = {
  name: '',
  description: '',
  type: 'PRODUCT',
  price: undefined,
  rental: false,
  negotiable: false,
  status: 'PUBLIC',
  state: 'NEW',
  category: {
    uuid: '',
    name: '',
  },
  images: [],
  tags: [],
  location: null,
};

export { CreateListingInitial };
