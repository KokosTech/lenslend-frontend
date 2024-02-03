import {
  CreateListingForm,
  CreateProductErrors,
} from '@/types/forms/create-listing.form';

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
  location: {
    lat: null,
    lng: null,
  },
};

const CreateListingInitialErrors: CreateProductErrors = {
  name: [],
  description: [],
  price: [],
  rental: [],
  negotiable: [],
  state: [],
  status: [],
  category: {
    uuid: [],
    name: [],
  },
  tags: [],
  location: {
    lat: [],
    lng: [],
  },
  images: [],
  global: [],
};

export { CreateListingInitial, CreateListingInitialErrors };
