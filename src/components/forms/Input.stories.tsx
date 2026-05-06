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
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toBeVisible();
  },
};

export const WithError: Story = {
  args: { label: 'Email', id: 'email-err', error: 'This field is required' },
};

export const TypeInteraction: Story = {
  args: { label: 'Name', id: 'name', placeholder: 'Enter your name' },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Name');
    await userEvent.type(input, 'Jane Doe');
    await expect(input).toHaveValue('Jane Doe');
  },
};
