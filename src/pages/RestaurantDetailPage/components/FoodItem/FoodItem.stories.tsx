import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { FoodItem } from './FoodItem';

const meta = {
  component: FoodItem,
  args: {
    name: 'Cheeseburger',
    price: 8.5,
    onClick: () => {},
  },
} satisfies Meta<typeof FoodItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FoodItem
      name="Cheeseburger"
      description="Nice grilled burger with cheese"
      price={8.5}
      onClick={() => {}}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Cheeseburger')).toBeVisible();
    await expect(canvas.getByText(/nice grilled burger/i)).toBeVisible();
    await expect(canvas.getByText(/8\.50/)).toBeVisible();
  },
};

export const WithQuantity: Story = {
  render: () => (
    <FoodItem
      name="Cheeseburger"
      description="Nice grilled burger with cheese"
      price={8.5}
      quantity={3}
      onClick={() => {}}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Cheeseburger')).toBeVisible();
    await expect(canvas.getByLabelText(/food quantity/i)).toBeVisible();
    await expect(canvas.getByText('3')).toBeVisible();
  },
};

export const NoDescript: Story = {
  render: () => (
    <FoodItem name="Coca-Cola" price={1.75} onClick={() => {}} />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Coca-Cola')).toBeVisible();
    await expect(canvas.getByText(/1\.75/)).toBeVisible();
  },
};
