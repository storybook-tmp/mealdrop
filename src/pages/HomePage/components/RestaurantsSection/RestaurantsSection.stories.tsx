import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { http, HttpResponse } from 'msw';

import { RestaurantsSection } from './RestaurantsSection';

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants';

const meta = {
  component: RestaurantsSection,
  tags: ['ai-generated'],
  args: { title: 'Our favorite picks' },
} satisfies Meta<typeof RestaurantsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText('Burger Kingdom')).toBeVisible(), {
      timeout: 3000,
    });
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(BASE_URL, async () => {
          await new Promise(() => {}); // never resolves
        }),
      ],
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByTestId('loading').length).toBeGreaterThan(0);
  },
};

export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [http.get(BASE_URL, () => HttpResponse.json([]))],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [http.get(BASE_URL, () => new HttpResponse(null, { status: 500 }))],
    },
  },
};
