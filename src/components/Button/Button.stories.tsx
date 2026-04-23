import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <Button>Click me</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /click me/i });
    await expect(button).toBeVisible();
  },
};

export const Clear: Story = {
  render: () => <Button clear>Clear Button</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /clear button/i });
    await expect(button).toBeVisible();
  },
};

export const Large: Story = {
  render: () => <Button large>Large Button</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /large button/i });
    await expect(button).toBeVisible();
  },
};

export const Disabled: Story = {
  render: () => <Button disabled>Disabled</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /disabled/i });
    await expect(button).toBeDisabled();
  },
};

export const Round: Story = {
  render: () => <Button round>R</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /r/i });
    await expect(button).toBeVisible();
  },
};

export const WithIcon: Story = {
  render: () => <Button icon="cart">Cart</Button>,
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /cart/i });
    await expect(button).toBeVisible();
  },
};
