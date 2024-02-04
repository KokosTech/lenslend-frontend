import {
  CreatePlaceErrors,
  CreatePlaceForm,
} from '@/types/forms/create-place-form';

export const CreatePlaceInitial: CreatePlaceForm = {
  icon: '',
  name: '',
  description: '',
  status: 'PUBLIC',
  category: {
    uuid: '',
    name: '',
  },
  images: [],
  tags: [],
  services: [],
  location: {
    lat: null,
    lng: null,
  },
};

export const CreatePlaceInitialErrors: CreatePlaceErrors = {
  icon: [],
  name: [],
  description: [],
  status: [],
  category: {
    uuid: [],
    name: [],
  },
  tags: [],
  services: [],
  location: {
    lat: [],
    lng: [],
  },
  images: [],
  global: [],
};
