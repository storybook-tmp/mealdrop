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
    placeholder: 'you@example.com',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('email')).toBeVisible();
  },
};

export const WithError: Story = {
  args: {
    label: 'email',
    id: 'email-error',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address.',
  },
};

export const WithValue: Story = {
  args: {
    label: 'name',
    id: 'name',
    value: 'Jane Doe',
  },
};

export const TypePassword: Story = {
  args: {
    label: 'password',
    id: 'password',
    type: 'password',
  },
};
