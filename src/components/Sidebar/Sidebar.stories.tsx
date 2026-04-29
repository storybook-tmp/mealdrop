import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Sidebar } from './Sidebar';

const meta = {
  component: Sidebar,
  tags: ['ai-generated'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Your order',
    onClose: () => {},
    children: 'Sidebar content goes here',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Your order')).toBeVisible();
    await expect(canvas.getByLabelText('close sidebar')).toBeVisible();
  },
};

export const WithFooter: Story = {
  args: {
    isOpen: true,
    title: 'Cart',
    onClose: () => {},
    children: 'Items in your cart',
    footer: 'Total: $24.97',
  },
};
