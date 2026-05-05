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
    await expect(canvas.getByLabelText(/email/i)).toBeVisible();
  },
};

export const WithError: Story = {
  args: { label: 'Email', id: 'email-err', error: 'Email is required' },
};

export const WithValue: Story = {
  args: { label: 'Name', id: 'name', value: 'John Doe' },
};
