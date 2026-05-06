import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Input } from './Input';

const meta = {
  component: Input,
  tags: ['ai-generated'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  args: { label: 'Email', id: 'email', placeholder: 'you@example.com' },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toBeVisible();
  },
};

export const WithError: Story = {
  args: { label: 'Email', id: 'email-err', error: 'Email is required' },
};

export const WithoutLabel: Story = {
  args: { placeholder: 'Search...', 'aria-label': 'search' },
};
