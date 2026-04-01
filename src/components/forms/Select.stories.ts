import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  title: 'AI Generated/Medium/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Category',
    options: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
    value: 'Appetizer',
  },
};

export const Cuisine: Story = {
  args: {
    label: 'Cuisine Type',
    options: ['Italian', 'Chinese', 'Indian', 'Mexican', 'Thai'],
    value: 'Italian',
  },
};

export const Quantity: Story = {
  args: {
    label: 'Quantity',
    options: [1, 2, 3, 4, 5, 10],
    value: 1,
  },
};
