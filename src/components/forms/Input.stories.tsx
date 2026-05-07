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
    placeholder: 'Your name',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('name');

    await userEvent.type(input, 'Ada');
    await expect(input).toHaveValue('Ada');
  },
};

export const Email: Story = {
  args: {
    id: 'email-address',
    label: 'email',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    error: 'Required',
    id: 'required-name',
    label: 'name',
  },
};
