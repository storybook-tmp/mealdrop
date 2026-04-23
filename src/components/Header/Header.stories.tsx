import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderComponent } from './Header';

const meta = {
  title: 'AI Generated/Complex/Header',
  component: HeaderComponent,
  tags: ['ai-generated'],
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithCart: Story = {
  args: {
    totalPrice: 24.99,
    cartItems: [
      { id: '1', name: 'Margherita Pizza', description: 'Classic tomato sauce and mozzarella', price: 12.5, quantity: 2 },
    ],
  },
};

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
};
