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
    title: 'Your cart',
    onClose: () => {},
    children: 'Sidebar content goes here',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible();
    await expect(canvas.getByText('Your cart')).toBeVisible();
  },
};

export const WithFooter: Story = {
  args: {
    isOpen: true,
    title: 'Your cart',
    onClose: () => {},
    children: 'Cart items here',
    footer: 'Total: $42.97',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Your cart',
    onClose: () => {},
    children: 'Hidden content',
  },
};
