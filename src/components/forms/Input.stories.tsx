import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Input } from './Input';

const meta = {
  component: Input,
  tags: ['ai-generated'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    id: 'customer-name',
    label: 'name',
    placeholder: 'Ada Lovelace',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('name');

    await userEvent.type(input, 'Ada Lovelace');
    await expect(input).toHaveValue('Ada Lovelace');
  },
};

export const WithError: Story = {
  args: {
    id: 'email',
    label: 'email',
    type: 'email',
    error: 'Enter a valid email address',
  },
};

export const DeliveryInstructions: Story = {
  args: {
    id: 'delivery-instructions',
    label: 'delivery instructions',
    placeholder: 'Ring the bell',
  },
};
