import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: 'pizza' },
};

export const ComfortFood: Story = {
  args: { text: 'comfort food' },
};

export const Multiple: Story = {
  args: { text: 'burgers' },
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Badge text="burgers" />
      <Badge text="pizza" />
      <Badge text="asian" />
    </div>
  ),
};
