
import { AdminCredentials } from './types';

export const ADMIN_CREDENTIALS: AdminCredentials = {
  username: 'ash#404',
  password: 'myaj!'
};

export const INITIAL_WEBSITES = [
  {
    id: '1',
    name: 'GitHub',
    url: 'https://github.com',
    createdAt: Date.now()
  },
  {
    id: '2',
    name: 'Dribbble',
    url: 'https://dribbble.com',
    createdAt: Date.now() - 1000
  },
  {
    id: '3',
    name: 'Product Hunt',
    url: 'https://producthunt.com',
    createdAt: Date.now() - 2000
  },
  {
    id: '4',
    name: 'Awwwards',
    url: 'https://awwwards.com',
    createdAt: Date.now() - 3000
  },
  {
    id: '5',
    name: 'Behance',
    url: 'https://behance.net',
    createdAt: Date.now() - 4000
  }
];
