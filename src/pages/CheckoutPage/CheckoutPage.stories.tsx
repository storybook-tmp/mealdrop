import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { cartItems } from '../../stub/cart-items';

import { CheckoutPage } from './CheckoutPage';

const meta = {
  component: CheckoutPage,
  parameters: {
    app: {
      preloadedState: {
        cart: {
          items: cartItems,
        },
      },
    },
  },
} satisfies Meta<typeof CheckoutPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /contact details/i })).toBeVisible();
    await expect(canvas.getByText(/step 1 of 2/i)).toBeVisible();
    await expect(canvas.getByText(/17[.,]75/)).toBeVisible();
  },
};

export const ValidationErrors: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /next/i }));

    await expect(canvas.getAllByText(/^Required$/)).toHaveLength(4);
    await expect(canvas.getByText(/step 1 of 2/i)).toBeVisible();
  },
};

export const CompleteOrder: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText(/first name/i), 'John');
    await userEvent.type(canvas.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(canvas.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(canvas.getByLabelText(/phone number/i), '0612345678');
    await userEvent.click(canvas.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(canvas.getByRole('heading', { name: /delivery details/i })).toBeVisible();
    });

    await userEvent.type(canvas.getByLabelText(/streetname and housenumber/i), 'Some street 13');
    await userEvent.type(canvas.getByLabelText(/postcode/i), '1234AB');
    await userEvent.type(canvas.getByLabelText(/city/i), 'Amsterdam');
    await userEvent.click(canvas.getByRole('button', { name: /complete order/i }));

    await waitFor(() => {
      expect(canvas.getByTestId('storybook-location')).toHaveTextContent('/success');
    });

    await expect(canvas.getByText(/0[.,]00/)).toBeVisible();
  },
};
