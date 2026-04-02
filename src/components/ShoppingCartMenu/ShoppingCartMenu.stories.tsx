import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ShoppingCartMenu } from './ShoppingCartMenu';

const meta = {
  title: 'AI Generated/Complex/ShoppingCartMenu',
  component: ShoppingCartMenu,
} satisfies Meta<typeof ShoppingCartMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const ShoppingCartMenuContent = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <ShoppingCartMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        totalPrice={45.99}
        cartItems={[
          {
            id: '1',
            quantity: 2,
            restaurantId: 'rest-1',
            name: 'Pizza Margherita',
            price: 12.99,
            description: 'Classic Italian pizza',
          },
          {
            id: '2',
            quantity: 1,
            restaurantId: 'rest-1',
            name: 'Caesar Salad',
            price: 8.99,
            description: 'Fresh salad with croutons',
          },
        ]}
        onItemChange={() => {}}
        onGoToCheckoutClick={() => {}}
      />
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} style={{ padding: '10px 20px' }}>
          Open Cart
        </button>
      )}
    </>
  );
};

export const Open: Story = {
  render: () => <ShoppingCartMenuContent />,
};

export const Empty: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    totalPrice: 0,
    cartItems: [],
    onItemChange: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    totalPrice: 0,
    cartItems: [],
    onItemChange: () => {},
  },
};
