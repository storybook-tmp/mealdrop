import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';
import { HeaderComponent } from './Header';

const meta = {
  component: HeaderComponent,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HeaderComponent />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible();
  },
};

export const WithCartItems: Story = {
  render: () => (
    <HeaderComponent
      totalPrice={12.5}
      cartItems={[{ id: 1, name: 'Cheeseburger', price: 8.5, quantity: 1 }]}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible();
    await expect(canvas.getByText(/12\.50/)).toBeVisible();
  },
};

export const LogoOnly: Story = {
  render: () => <HeaderComponent logoOnly />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible();
    await expect(canvas.queryByRole('button', { name: /food cart/i })).not.toBeInTheDocument();
  },
};
