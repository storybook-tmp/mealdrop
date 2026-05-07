import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

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
    options: [0, 1, 2, 3],
    value: 1,
    onChange: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.selectOptions(canvas.getByLabelText('quantity'), '3');
    await expect(args.onChange).toHaveBeenCalledWith(3);
  },
};

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'item quantity',
    options: [1, 2, 3, 4],
    value: 2,
  },
};
