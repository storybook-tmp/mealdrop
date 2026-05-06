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
    title: 'Your Cart',
    onClose: () => {},
    children: 'Sidebar content goes here',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible();
    await expect(canvas.getByText('Your Cart')).toBeVisible();
  },
};

export const WithFooter: Story = {
  args: {
    isOpen: true,
    title: 'Order Summary',
    onClose: () => {},
    children: 'Items in your order',
    footer: 'Total: $25.98',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar-footer')).toBeVisible();
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Hidden Sidebar',
    onClose: () => {},
    children: 'This should not be visible',
  },
};
