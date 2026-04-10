import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { Header, HeaderComponent } from './Header';

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Header />,
  play: async ({ canvas }) => {
    await waitFor(() => {
      const logo = canvas.getByLabelText(/go to home page/i);
      expect(logo).toBeVisible();
    });

    const homeButton = canvas.getByText(/home/i);
    await expect(homeButton).toBeVisible();

    const cartButton = canvas.getByLabelText(/food cart/i);
    await expect(cartButton).toBeVisible();
  },
};

export const Sticky: Story = {
  render: () => <Header sticky />,
  play: async ({ canvas }) => {
    const header = canvas.getByTestId('header');
    await expect(header).toBeVisible();
  },
};

export const ComponentDefault: Story = {
  render: () => (
    <HeaderComponent
      logoOnly={false}
      sticky={false}
      cartItems={[]}
      totalPrice={0}
      isCartVisible={false}
    />
  ),
  play: async ({ canvas }) => {
    const logo = canvas.getByLabelText(/go to home page/i);
    await expect(logo).toBeVisible();
  },
};

export const ComponentLogoOnly: Story = {
  render: () => (
    <HeaderComponent logoOnly={true} sticky={false} cartItems={[]} totalPrice={0} isCartVisible={false} />
  ),
  play: async ({ canvas }) => {
    const logo = canvas.getByLabelText(/go to home page/i);
    await expect(logo).toBeVisible();

    const allRestaurants = canvas.queryByText(/all restaurants/i);
    await expect(allRestaurants).not.toBeInTheDocument();
  },
};
