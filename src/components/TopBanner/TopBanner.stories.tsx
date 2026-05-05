import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopBanner } from './TopBanner';

const meta = {
  component: TopBanner,
  tags: ['ai-generated'],
} satisfies Meta<typeof TopBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  args: { title: 'All Restaurants' },
};

export const WithPhoto: Story = {
  args: {
    title: 'Burger Palace',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
  },
};

export const PlainBackground: Story = {
  args: {},
};
