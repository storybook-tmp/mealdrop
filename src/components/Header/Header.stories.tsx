import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderComponent } from './Header';

const meta = {
  component: HeaderComponent,
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HeaderComponent />,
};

export const LogoOnly: Story = {
  render: () => <HeaderComponent logoOnly />,
};

export const WithCartItems: Story = {
  render: () => (
    <HeaderComponent
      totalPrice={14.75}
      cartItems={[
        { id: 1, name: 'Cheeseburger', price: 8.5, quantity: 1 },
        { id: 2, name: 'Fries', price: 2.5, quantity: 1 },
        { id: 4, name: 'Coca-Cola', price: 1.75, quantity: 2 },
      ]}
    />
  ),
};
