import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { FoodSection } from './FoodSection';

const meta = {
  component: FoodSection,
  args: {
    title: 'To eat',
    items: [],
    cartItems: [],
  },
} satisfies Meta<typeof FoodSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const foodItems = [
  { id: 1, name: 'Cheeseburger', description: 'Nice grilled burger with cheese', price: 8.5 },
  { id: 2, name: 'Fries', description: 'Fried french fries', price: 2.5 },
  { id: 3, name: 'Onion Rings', description: 'Crispy onion rings', price: 3.0 },
];

export const Default: Story = {
  render: () => <FoodSection title="To eat" items={foodItems} cartItems={[]} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /to eat/i })).toBeVisible();
    await expect(canvas.getByText('Cheeseburger')).toBeVisible();
    await expect(canvas.getByText('Fries')).toBeVisible();
  },
};

export const WithCartItems: Story = {
  render: () => (
    <FoodSection
      title="To eat"
      items={foodItems}
      cartItems={[{ id: 1, name: 'Cheeseburger', price: 8.5, quantity: 2 }]}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Cheeseburger')).toBeVisible();
    await expect(canvas.getByLabelText(/food quantity/i)).toBeVisible();
    await expect(canvas.getByText('2')).toBeVisible();
  },
};

export const Drinks: Story = {
  render: () => (
    <FoodSection
      title="To drink"
      items={[
        { id: 4, name: 'Coca-Cola', price: 1.75 },
        { id: 5, name: 'Fanta', price: 1.5 },
        { id: 6, name: 'Sprite', price: 1.5 },
      ]}
      cartItems={[]}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /to drink/i })).toBeVisible();
    await expect(canvas.getByText('Coca-Cola')).toBeVisible();
    await expect(canvas.getByText('Fanta')).toBeVisible();
  },
};
