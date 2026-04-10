import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { useState } from 'react';

import { Input } from './Input';

const meta = {
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Input label="Email" type="email" placeholder="Enter email" />,
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText(/email/i);
    await expect(input).toBeVisible();
  },
};

export const WithError: Story = {
  render: () => <Input label="Email" type="email" error="Email is required" />,
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText(/email/i);
    await expect(input).toBeVisible();

    const error = canvas.getByText(/email is required/i);
    await expect(error).toBeVisible();
  },
};

export const Password: Story = {
  render: () => <Input label="Password" type="password" placeholder="Enter password" />,
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText(/password/i) as HTMLInputElement;
    await expect(input).toBeVisible();
    await expect(input.type).toBe('password');
  },
};

export const Interactive: Story = {
  render: () => {
    const InputInteractive = () => {
      const [value, setValue] = useState('');
      return <Input label="Name" value={value} onChange={(e) => setValue(e.target.value)} />;
    };
    return <InputInteractive />;
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText(/name/i) as HTMLInputElement;
    await userEvent.type(input, 'John Doe');
    await expect(input).toHaveValue('John Doe');
  },
};
