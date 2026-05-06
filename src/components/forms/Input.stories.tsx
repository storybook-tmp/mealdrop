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

export const WithValue: Story = {
  args: {
    label: 'Name',
    id: 'name',
    defaultValue: 'John Doe',
  },
};

export const TypeAhead: Story = {
  args: {
    label: 'Search',
    id: 'search',
    placeholder: 'Type to search...',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Search');
    await userEvent.type(input, 'pizza');
    await expect(input).toHaveValue('pizza');
  },
};
