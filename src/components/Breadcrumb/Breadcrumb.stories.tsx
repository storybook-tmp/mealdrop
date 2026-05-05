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
    items: [
      { label: 'categories', path: '/categories' },
      { label: 'pizza' },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('categories')).toBeVisible();
    await expect(canvas.getByText('pizza')).toBeVisible();
    await expect(canvas.getByText('/')).toBeVisible();
  },
};

export const ThreeLevels: Story = {
  args: {
    items: [
      { label: 'home', path: '/' },
      { label: 'categories', path: '/categories' },
      { label: 'burgers' },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('home')).toBeVisible();
    await expect(canvas.getByText('categories')).toBeVisible();
    await expect(canvas.getByText('burgers')).toBeVisible();
  },
};
