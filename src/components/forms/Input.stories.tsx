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
    placeholder: 'john@example.com',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Email');
    await expect(input).toBeVisible();
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    id: 'email-error',
    error: 'This field is required',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('This field is required')).toBeVisible();
  },
};

export const Filled: Story = {
  args: {
    label: 'Full name',
    id: 'full-name',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Full name');
    await userEvent.type(input, 'John Doe');
    await expect(input).toHaveValue('John Doe');
  },
};
