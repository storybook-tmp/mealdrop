import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'AI Generated/Medium/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Click Me',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    large: true,
  },
};

export const Clear: Story = {
  args: {
    children: 'Clear Button',
    clear: true,
  },
};
