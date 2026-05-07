import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { categories } from '../../stub/categories';

import { Category } from './Category';

const meta = {
  component: Category,
  tags: ['ai-generated'],
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Squared: Story = {
  args: categories[0],
};

export const Rounded: Story = {
  args: { ...categories[1], round: true },
};

export const CssCheck: Story = {
  args: categories[0],
  play: async ({ canvas }) => {
    const title = canvas.getByText('Pizza');
    const caption = title.closest('figcaption');

    await expect(caption).not.toBeNull();
    await expect(getComputedStyle(caption!).backgroundColor).toBe('rgb(32, 32, 32)');
  },
};
