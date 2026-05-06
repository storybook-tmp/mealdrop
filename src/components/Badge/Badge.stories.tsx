import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Badge } from './Badge';

const meta = {
  component: Badge,
  tags: ['ai-generated'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Pizza',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza')).toBeVisible();
  },
};

export const LongText: Story = {
  args: {
    text: 'Comfort food',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Comfort food')).toBeVisible();
  },
};
