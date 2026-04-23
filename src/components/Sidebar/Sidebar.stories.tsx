import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';
import { Button } from '../Button';

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
  tags: ['ai-generated'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Your Order',
    onClose: () => {},
    children: (
      <div style={{ padding: '1rem' }}>
        <p>Item 1 - $12.00</p>
        <p>Item 2 - $8.50</p>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    isOpen: true,
    title: 'Shopping Cart',
    onClose: () => {},
    footer: <Button large>Checkout</Button>,
    children: (
      <div style={{ padding: '1rem' }}>
        <p>Margherita Pizza - $12.50</p>
        <p>Caesar Salad - $9.00</p>
      </div>
    ),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Hidden Sidebar',
    onClose: () => {},
    children: <div>Content not visible</div>,
  },
};
