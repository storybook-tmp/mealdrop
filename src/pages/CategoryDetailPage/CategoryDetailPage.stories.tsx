import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { Routes, Route } from 'react-router-dom';
import { http, HttpResponse } from 'msw';

import { CategoryDetailPage } from './CategoryDetailPage';
import { restaurantsCompleteData } from '../../stub/restaurants';

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants';

const meta = {
  component: CategoryDetailPage,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/categories/:id" element={<Story />} />
      </Routes>
    ),
  ],
  parameters: {
    initialEntries: ['/categories/burgers'],
    msw: {
      handlers: [
        http.get(BASE_URL, ({ request }) => {
          const url = new URL(request.url);
          const category = url.searchParams.get('category');
          if (category) {
            return HttpResponse.json(
              restaurantsCompleteData.filter((r) => r.categories?.includes(category))
            );
          }
          return HttpResponse.json(restaurantsCompleteData);
        }),
      ],
    },
  },
} satisfies Meta<typeof CategoryDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Burgers: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => expect(canvas.getByText('Burger Kingdom')).toBeVisible(), {
      timeout: 3000,
    });
  },
};

export const Empty: Story = {
  parameters: {
    initialEntries: ['/categories/unknown-category'],
    msw: {
      handlers: [http.get(BASE_URL, () => HttpResponse.json([]))],
    },
  },
};
