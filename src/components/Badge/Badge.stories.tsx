import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Badge } from './Badge';

const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: 'burgers' },
  render: ({ text }) => <Badge text={text} />,
  play: async ({ canvas }) => {
    const badge = canvas.getByText('burgers');
    await expect(badge).toBeVisible();
  },
};

export const Pizza: Story = {
  args: { text: 'pizza' },
  render: ({ text }) => <Badge text={text} />,
  play: async ({ canvas }) => {
    const badge = canvas.getByText('pizza');
    await expect(badge).toBeVisible();
  },
};

export const Asian: Story = {
  args: { text: 'asian' },
  render: ({ text }) => <Badge text={text} />,
  play: async ({ canvas }) => {
    const badge = canvas.getByText('asian');
    await expect(badge).toBeVisible();
  },
};
