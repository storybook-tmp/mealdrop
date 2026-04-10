import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { restaurantsCompleteData } from '../../stub/restaurants';

import { CheckoutPage } from './CheckoutPage';

const cartItems = [
  { ...restaurantsCompleteData[0].menu.food[0], quantity: 2 },
  { ...restaurantsCompleteData[0].menu.drinks[0], quantity: 1 },
];

const meta = {
  component: CheckoutPage,
} satisfies Meta<typeof CheckoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    router: {
      entries: ['/checkout'],
      path: '/checkout',
    },
    storeState: {
      cart: {
        items: cartItems,
      },
    },
  },
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible();
    await expect(canvas.getByText('Step 1 of 2')).toBeVisible();
    await expect(canvas.getByText('Cheeseburger')).toBeVisible();
    await expect(canvas.getByText('Coca-Cola')).toBeVisible();
  },
};

export const ValidationErrors: Story = {
  parameters: {
    router: {
      entries: ['/checkout'],
      path: '/checkout',
    },
    storeState: {
      cart: {
        items: cartItems,
      },
    },
  },
  render: () => <CheckoutPage />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /next/i }));
    await expect(canvas.getAllByText('Required')).toHaveLength(4);
  },
};

export const CompleteOrder: Story = {
  parameters: {
    router: {
      entries: ['/checkout'],
      path: '/checkout',
    },
    storeState: {
      cart: {
        items: cartItems,
      },
    },
  },
  render: () => <CheckoutPage />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const doc = canvasElement.ownerDocument;

    await userEvent.type(canvas.getByLabelText('First name'), 'John');
    await userEvent.type(canvas.getByLabelText('Last name'), 'Doe');
    await userEvent.type(canvas.getByLabelText('Email'), 'john@example.com');
    await userEvent.type(canvas.getByLabelText('Phone number'), '0612345678');
    await userEvent.click(canvas.getByRole('button', { name: /next/i }));
    await expect(canvas.getByText('Step 2 of 2')).toBeVisible();
    await userEvent.type(canvas.getByLabelText('Streetname and housenumber'), 'Main Street 12');
    await userEvent.type(canvas.getByLabelText('Postcode'), '1234AB');
    await userEvent.type(canvas.getByLabelText('City'), 'Amsterdam');
    await userEvent.click(canvas.getByRole('button', { name: /complete order/i }));
    await waitFor(() => {
      expect(doc.querySelector('[data-testid="storybook-current-path"]')).toHaveTextContent(
        '/success'
      );
    });
  },
};
