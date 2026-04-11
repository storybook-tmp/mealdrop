import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../../app-state/store';
import { CheckoutPage } from './CheckoutPage';

const meta = {
  component: CheckoutPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof CheckoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible();
  },
};

export const WithCartItems: Story = {
  decorators: [
    (Story) => {
      const store = configureStore({
        reducer: rootReducer,
        preloadedState: {
          cart: {
            visible: false,
            items: [
              { id: 1, name: 'Cheeseburger', price: 8.5, quantity: 2 },
              { id: 2, name: 'Fries', price: 2.5, quantity: 1 },
            ],
          },
          order: { items: [] },
        },
      });
      return (
        <StoreProvider store={store}>
          <Story />
        </StoreProvider>
      );
    },
  ],
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible();
    await expect(canvas.getByText('Cheeseburger')).toBeVisible();
    await expect(canvas.getByText('Fries')).toBeVisible();
  },
};

export const FormFields: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible();
    await expect(canvas.getByText(/contact details/i)).toBeVisible();
  },
};
