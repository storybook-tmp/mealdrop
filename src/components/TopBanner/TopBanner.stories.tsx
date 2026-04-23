import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { TopBanner } from './TopBanner';

const meta = {
  component: TopBanner,
} satisfies Meta<typeof TopBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TopBanner title="Categories" />,
  play: async ({ canvas }) => {
    const title = canvas.getByText('Categories');
    await expect(title).toBeVisible();
  },
};

export const WithPhotoUrl: Story = {
  render: () => (
    <TopBanner
      title="Restaurant Detail"
      photoUrl="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1003&q=20"
    />
  ),
  play: async ({ canvas }) => {
    const title = canvas.getByText('Restaurant Detail');
    await expect(title).toBeVisible();
  },
};
