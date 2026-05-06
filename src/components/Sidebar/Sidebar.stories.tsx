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
    await expect(canvas.getByTestId('sidebar')).toBeVisible();
    await expect(canvas.getByText('Your order')).toBeVisible();
  },
};

export const WithFooter: Story = {
  args: {
    isOpen: true,
    title: 'Your order',
    onClose: () => {},
    children: 'Order items here',
    footer: 'Total: $25.00',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Your order',
    onClose: () => {},
    children: 'Hidden content',
  },
};
