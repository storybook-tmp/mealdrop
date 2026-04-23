import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Button>Order now</Button>,
};

export const Large: Story = {
  render: () => <Button large>Order now</Button>,
};

export const Clear: Story = {
  render: () => <Button clear>Home</Button>,
};

export const WithIcon: Story = {
  render: () => <Button icon="cart">Add to cart</Button>,
};

export const Disabled: Story = {
  render: () => <Button disabled>Disabled</Button>,
};
