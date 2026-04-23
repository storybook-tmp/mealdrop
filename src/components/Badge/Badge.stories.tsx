import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Badge } from './Badge';

const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: 'Italian' },
  play: async ({ canvas }) => {
    const badge = canvas.getByText(/italian/i);
    await expect(badge).toBeVisible();
  },
};

export const Different: Story = {
  args: { text: 'Japanese' },
  play: async ({ canvas }) => {
    const badge = canvas.getByText(/japanese/i);
    await expect(badge).toBeVisible();
  },
};

export const MultipleWords: Story = {
  args: { text: 'fast food' },
  play: async ({ canvas }) => {
    const badge = canvas.getByText(/fast food/i);
    await expect(badge).toBeVisible();
  },
};
