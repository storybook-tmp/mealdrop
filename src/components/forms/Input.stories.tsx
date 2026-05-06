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
  args: { label: 'Email', id: 'email', placeholder: 'you@example.com' },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toBeVisible();
  },
};

export const WithError: Story = {
  args: { label: 'Email', id: 'email-err', error: 'Email is required' },
};

export const Filled: Story = {
  args: { label: 'Name', id: 'name', defaultValue: 'Jane Doe' },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Name');
    await userEvent.clear(input);
    await userEvent.type(input, 'John');
    await expect(input).toHaveValue('John');
  },
};
