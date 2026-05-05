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

export const WithError: Story = {
  args: {
    label: 'Email',
    id: 'email-err',
    error: 'Email is required',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Email is required')).toBeVisible();
  },
};

export const Filled: Story = {
  args: {
    label: 'Full name',
    id: 'name',
    defaultValue: 'John Doe',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Full name');
    await expect(input).toBeVisible();
    await userEvent.clear(input);
    await userEvent.type(input, 'Jane Doe');
    await expect(input).toHaveValue('Jane Doe');
  },
};
