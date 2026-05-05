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
  args: { text: 'italian' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('italian')).toBeVisible();
  },
};

export const Japanese: Story = {
  args: { text: 'japanese' },
};

export const LongLabel: Story = {
  args: { text: 'fast food & burgers' },
};
