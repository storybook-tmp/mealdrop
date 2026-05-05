import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse } from 'msw';
import { expect, waitFor } from 'storybook/test';

import { restaurantsCompleteData } from '../../../../stub/restaurants';
import { RestaurantsSectionComponent, RestaurantsSection } from './RestaurantsSection.container';

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants';

const sampleRestaurants = restaurantsCompleteData.slice(0, 3);

const meta = {
  component: RestaurantsSectionComponent,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantsSectionComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Our favorite picks',
    restaurants: sampleRestaurants,
    onRestaurantClick: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Our favorite picks')).toBeVisible();
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible();
  },
};

export const Loading: Story = {
  args: {
    title: 'Our favorite picks',
    restaurants: [],
    isLoading: true,
    onRestaurantClick: () => {},
  },
};

export const WithData: StoryObj<typeof RestaurantsSection> = {
  render: () => <RestaurantsSection title="From the API" />,
  parameters: {
    msw: {
      handlers: [
        http.get(BASE_URL, () => HttpResponse.json(sampleRestaurants)),
      ],
    },
  },
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(canvas.getByText('Burger Kingdom')).toBeVisible();
    });
  },
};
