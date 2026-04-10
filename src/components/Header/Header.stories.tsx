import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { toCurrency } from '../../helpers';
import { restaurantsCompleteData } from '../../stub/restaurants';

import { Header } from './Header';

const [burger, cola] = [
  restaurantsCompleteData[0].menu.food[0],
  restaurantsCompleteData[0].menu.drinks[0],
];

const cartItems = [
  { ...burger, quantity: 1 },
  { ...cola, quantity: 2 },
];

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultNavigation: Story = {
  render: () => <Header />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toHaveAttribute(
      'href',
      '/'
    );
    await expect(canvas.getByRole('button', { name: /turn on dark mode/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /turn on dark mode/i }));
    await waitFor(() => {
      expect(document.body.classList.contains('dark-mode')).toBe(true);
    });
    await expect(canvas.getByRole('button', { name: /turn on light mode/i })).toBeVisible();
  },
};

export const CartDrawerOpen: Story = {
  parameters: {
    storeState: {
      cart: {
        items: cartItems,
        visible: true,
      },
    },
  },
  render: () => <Header />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId('sidebar')).toBeVisible();
    await expect(canvas.getByText('Your order')).toBeVisible();
    await expect(canvas.getByText('Cheeseburger')).toBeVisible();
    await expect(canvas.getAllByText(toCurrency(12))).toHaveLength(2);
    await userEvent.selectOptions(canvas.getByLabelText('1 times'), '3');
    await waitFor(() => {
      expect(canvas.getAllByText(toCurrency(29))).toHaveLength(2);
    });
    await expect(canvas.getAllByText(toCurrency(29))).toHaveLength(2);
  },
};

export const Sticky: Story = {
  args: {
    sticky: true,
  },
  parameters: {
    storeState: {
      cart: {
        items: cartItems,
        visible: false,
      },
    },
  },
  render: (args) => <Header {...args} />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId('header')).toBeVisible();
    await expect(canvas.getByText(toCurrency(12))).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /food cart/i }));
    await expect(canvas.getByTestId('sidebar')).toBeVisible();
    await expect(getComputedStyle(canvas.getByTestId('header')).position).toBe('sticky');
  },
};
