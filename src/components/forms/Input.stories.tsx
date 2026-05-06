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
  args: { label: 'Email', id: 'email-err', error: 'Invalid email address' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Invalid email address')).toBeVisible();
  },
};

export const WithValue: Story = {
  args: { label: 'Name', id: 'name', value: 'John Doe' },
};

export const TypeInteraction: Story = {
  args: { label: 'First name', id: 'fname', placeholder: 'Enter your name' },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('First name');
    await userEvent.type(input, 'Jane');
    await expect(input).toHaveValue('Jane');
  },
};
