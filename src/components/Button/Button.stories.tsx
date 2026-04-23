import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Button>View all restaurants</Button>,
};

export const Clear: Story = {
  render: () => <Button clear>Home</Button>,
};

export const Large: Story = {
  render: () => <Button large>Checkout</Button>,
};

export const WithIcon: Story = {
  render: () => <Button icon="cart">Order</Button>,
};

export const Disabled: Story = {
  render: () => <Button disabled>Checkout</Button>,
};

export const Round: Story = {
  render: () => <Button round clear icon="sun" aria-label="toggle theme" />,
};

export const IconOnly: Story = {
  render: () => <Button icon="cross" round clear aria-label="close" iconSize={16} />,
};
