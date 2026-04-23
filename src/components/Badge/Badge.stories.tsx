import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: 'burgers' },
};

export const ComfortFood: Story = {
  args: { text: 'comfort food' },
};

export const Pizza: Story = {
  args: { text: 'pizza' },
};
