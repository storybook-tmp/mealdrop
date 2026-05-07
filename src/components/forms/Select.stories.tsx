import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Select } from './Select';

const meta = {
  component: Select,
  tags: ['ai-generated'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Quantity: Story = {
  args: {
    id: 'quantity',
    label: 'quantity',
    options: [0, 1, 2, 3, 4],
    value: 2,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('quantity')).toHaveValue('2');
  },
};

export const TipPercentage: Story = {
  args: {
    id: 'tip',
    label: 'tip',
    options: [0, 5, 10, 15, 20],
    value: 15,
  },
};
