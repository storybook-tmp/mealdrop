import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'AI Generated/Medium/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    error: 'Password must be at least 8 characters',
  },
};

export const Filled: Story = {
  args: {
    label: 'Full Name',
    value: 'John Doe',
    type: 'text',
  },
};

export const Required: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter your phone',
    type: 'tel',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit',
    disabled: true,
  },
};
