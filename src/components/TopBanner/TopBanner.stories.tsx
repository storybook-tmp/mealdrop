import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TopBanner } from './TopBanner';

const meta = {
  component: TopBanner,
  tags: ['ai-generated'],
} satisfies Meta<typeof TopBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  args: { title: 'Categories' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Categories')).toBeVisible();
  },
};

export const WithPhoto: Story = {
  args: {
    title: 'Burger Palace',
    photoUrl:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
};

export const Empty: Story = {
  args: {},
};
