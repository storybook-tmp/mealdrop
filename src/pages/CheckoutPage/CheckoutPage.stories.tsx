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
  },
};

export const FillContactForm: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('First name'), 'John');
    await userEvent.type(canvas.getByLabelText('Last name'), 'Doe');
    await userEvent.type(canvas.getByLabelText('Email'), 'john@example.com');
    await userEvent.type(canvas.getByLabelText('Phone number'), '0612345678');
    await userEvent.click(canvas.getByRole('button', { name: /next/i }));
    await expect(await canvas.findByLabelText('Streetname and housenumber')).toBeVisible();
  },
};
