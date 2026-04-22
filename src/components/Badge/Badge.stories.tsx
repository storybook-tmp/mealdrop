import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'AI Generated/Simple/Badge',
  component: Badge,
  tags: ['ai-generated'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Italian',
  },
};

export const LongText: Story = {
  args: {
    text: 'Fast Food & Burgers',
  },
};
