import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Breadcrumb } from './Breadcrumb';

const meta = {
  component: Breadcrumb,
  tags: ['ai-generated'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [{ label: 'Home', path: '/' }, { label: 'All restaurants', path: '/categories' }],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Home')).toBeVisible();
    await expect(canvas.getByText('All restaurants')).toBeVisible();
  },
};

export const WithCurrentPage: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'All restaurants', path: '/categories' },
      { label: 'Italian' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home', path: '/' }],
  },
};
