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
    label: 'Email',
    id: 'email',
    placeholder: 'Enter your email',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toBeVisible();
  },
};

export const WithValue: Story = {
  args: {
    label: 'Full name',
    id: 'fullname',
    value: 'John Doe',
    onChange: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Full name')).toHaveValue('John Doe');
  },
};

export const WithError: Story = {
  args: {
    label: 'Phone number',
    id: 'phone',
    error: 'Phone number is required',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Phone number is required')).toBeVisible();
  },
};

export const Typed: Story = {
  args: {
    label: 'Address',
    id: 'address',
    placeholder: 'Enter your address',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Address');
    await userEvent.type(input, '123 Main Street');
    await expect(input).toHaveValue('123 Main Street');
  },
};
