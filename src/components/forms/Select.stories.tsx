import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Select } from './Select';

const meta = {
  component: Select,
  tags: ['ai-generated'],
  args: {
    id: 'quantity',
    label: 'quantity',
    onChange: () => {},
    options: [0, 1, 2, 3, 4, 5],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    value: 2,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('quantity')).toHaveValue('2');
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};
