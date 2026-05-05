import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Input } from './Input';

const meta = {
  component: Input,
  tags: ['ai-generated'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'email',
    id: 'email',
    placeholder: 'john@example.com',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('email')).toBeVisible();
  },
};

export const WithError: Story = {
  args: {
    label: 'email',
    id: 'email-error',
    error: 'Please enter a valid email',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Please enter a valid email')).toBeVisible();
  },
};

export const Filled: Story = {
  args: {
    label: 'first name',
    id: 'first-name',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('first name');
    await userEvent.type(input, 'John');
    await expect(input).toHaveValue('John');
  },
};
