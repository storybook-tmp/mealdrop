import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { CheckoutPage } from './CheckoutPage';

const meta = {
  component: CheckoutPage,
  tags: ['ai-generated'],
} satisfies Meta<typeof CheckoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Checkout')).toBeVisible();
    await expect(canvas.getByText(/contact details/i)).toBeVisible();
  },
};

export const FillContactForm: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Checkout')).toBeVisible();
    const emailInput = canvas.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
  },
};
