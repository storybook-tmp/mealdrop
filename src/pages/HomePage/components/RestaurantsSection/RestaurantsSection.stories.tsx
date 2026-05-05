import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse } from 'msw';
import { expect, waitFor } from 'storybook/test';

import { BASE_URL } from '../../../../api';
import { restaurantsCompleteData } from '../../../../stub/restaurants';
import { RestaurantsSection } from './RestaurantsSection';

const meta = {
  component: RestaurantsSection,
  tags: ['ai-generated'],
  args: { title: 'Our favorite picks' },
} satisfies Meta<typeof RestaurantsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {
  play: async ({ canvas }) => {
    await waitFor(() =>
      expect(canvas.getByText('Burger Kingdom')).toBeVisible()
    );
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(BASE_URL, () => new Promise(() => {})),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(BASE_URL, () => new HttpResponse(null, { status: 500 })),
      ],
    },
  },
};
