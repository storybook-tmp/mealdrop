import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Badge } from './Badge';

const meta = {
  component: Badge,
  args: {
    text: 'burgers',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Badge text="burgers" />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/burgers/i)).toBeVisible();
  },
};

export const Pizza: Story = {
  render: () => <Badge text="pizza" />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/pizza/i)).toBeVisible();
  },
};

export const MultipleCategories: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Badge text="burgers" />
      <Badge text="comfort food" />
      <Badge text="pizza" />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/burgers/i)).toBeVisible();
    await expect(canvas.getByText(/comfort food/i)).toBeVisible();
    await expect(canvas.getByText(/pizza/i)).toBeVisible();
  },
};
