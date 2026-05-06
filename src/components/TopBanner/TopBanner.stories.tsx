import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopBanner } from './TopBanner';

const meta = {
  component: TopBanner,
  tags: ['ai-generated'],
} satisfies Meta<typeof TopBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  args: {
    title: 'Our restaurants',
  },
};

export const WithPhoto: Story = {
  args: {
    title: 'Burger Palace',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Order confirmed!',
  },
};
