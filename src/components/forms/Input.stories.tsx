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
  args: { label: 'Email', id: 'email', placeholder: 'Enter your email' },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Email');
    await userEvent.type(input, 'user@example.com');
    await expect(input).toHaveValue('user@example.com');
  },
};

export const WithError: Story = {
  args: { label: 'Email', id: 'email', error: 'Email is required' },
};

export const WithoutLabel: Story = {
  args: { placeholder: 'Search...' },
};
