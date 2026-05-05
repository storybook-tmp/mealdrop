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
    placeholder: 'Enter your email',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('email');
    await expect(input).toBeVisible();
  },
};

export const WithError: Story = {
  args: {
    label: 'email',
    id: 'email-error',
    error: 'Email is required',
    value: '',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Email is required')).toBeVisible();
  },
};

export const Filled: Story = {
  args: {
    label: 'first name',
    id: 'first-name',
    value: 'John',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('first name') as HTMLInputElement;
    await expect(input.value).toBe('John');
  },
};

export const Password: Story = {
  args: {
    label: 'password',
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('password') as HTMLInputElement;
    await expect(input.type).toBe('password');
  },
};
