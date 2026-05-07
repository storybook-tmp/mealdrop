import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Input } from './Input';

const meta = {
  component: Input,
  tags: ['ai-generated'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContactName: Story = {
  args: {
    id: 'contact-name',
    label: 'name',
    placeholder: 'Ada Lovelace',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('name');

    await userEvent.type(input, 'Ada');
    await expect(input).toHaveValue('Ada');
  },
};

export const Email: Story = {
  args: {
    id: 'email',
    label: 'email',
    type: 'email',
    placeholder: 'ada@example.com',
  },
};

export const WithError: Story = {
  args: {
    id: 'phone',
    label: 'phone',
    error: 'Phone number is required',
  },
};
