import type { Meta, StoryObj } from '@storybook/react';
import { TopBanner } from './TopBanner';

const meta = {
  title: 'AI Generated/Medium/TopBanner',
  component: TopBanner,
} satisfies Meta<typeof TopBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  args: {
    title: 'Pizza Palace',
  },
};

export const WithPhoto: Story = {
  args: {
    title: 'Burger King',
    photoUrl: 'https://via.placeholder.com/800x240',
  },
};

export const Empty: Story = {
  args: {},
};
