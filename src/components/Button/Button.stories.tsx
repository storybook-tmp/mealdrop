import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from 'react-router-dom';
import { expect } from 'storybook/test';

import { Button } from './Button';

const meta = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultCallToAction: Story = {
  render: () => (
    <Link to="/categories">
      <Button>View all restaurants</Button>
    </Link>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /view all restaurants/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /view all restaurants/i })).toHaveAttribute(
      'href',
      '/categories'
    );
  },
};

export const ClearNavigation: Story = {
  render: () => <Button clear>All restaurants</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /all restaurants/i });

    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  },
};

export const DisabledCheckout: Story = {
  render: () => (
    <Button large disabled>
      Checkout
    </Button>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /checkout/i })).toBeDisabled();
  },
};
