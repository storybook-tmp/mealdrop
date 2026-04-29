import type { Meta, StoryObj } from '@storybook/react-vite';

import { TopBanner } from './TopBanner';

const meta = {
  component: TopBanner,
  tags: ['ai-generated'],
} satisfies Meta<typeof TopBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  args: { title: 'Order confirmed!' },
};

export const WithPhoto: Story = {
  args: {
    photoUrl:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
};

export const WithPhotoAndTitle: Story = {
  args: {
    title: 'Burger Palace',
    photoUrl:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
};
