import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ShoppingCartMenu } from './ShoppingCartMenu';
import type { CartItem } from '../../app-state/cart';

const meta = {
  title: 'AI Generated/Complex/ShoppingCartMenu',
  component: ShoppingCartMenu,
} satisfies Meta<typeof ShoppingCartMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Pasta Carbonara',
    description: 'Classic Italian pasta',
    price: 12.99,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Caesar Salad',
    description: 'Fresh vegetables',
    price: 8.99,
    quantity: 2,
  },
];

function ShoppingCartMenuWithState(args: any) {
  const [isOpen, setIsOpen] = useState(args.isOpen);
  const [items, setItems] = useState<CartItem[]>(args.cartItems);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Cart ({items.length} items)</button>
      <ShoppingCartMenu
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        cartItems={items}
        totalPrice={totalPrice}
        onItemChange={(updatedItem) => {
          setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
        }}
        onGoToCheckoutClick={() => console.log('Checkout clicked')}
      />
    </>
  );
}

export const Default: Story = {
  render: (args) => <ShoppingCartMenuWithState {...args} />,
  args: {
    isOpen: false,
    cartItems: mockCartItems,
    totalPrice: 12.99 + 8.99 * 2,
    onClose: () => {},
    onItemChange: () => {},
  },
};

export const Empty: Story = {
  render: (args) => <ShoppingCartMenuWithState {...args} />,
  args: {
    isOpen: false,
    cartItems: [],
    totalPrice: 0,
    onClose: () => {},
    onItemChange: () => {},
  },
};
