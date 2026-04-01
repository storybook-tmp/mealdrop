import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'AI Generated/Medium/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
    label: 'Username',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter email',
    label: 'Email',
    error: 'Invalid email address',
  },
};
