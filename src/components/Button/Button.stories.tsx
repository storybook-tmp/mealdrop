import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Button } from './Button';

const meta = {
  component: Button,
  title: 'Components/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <Button>Click me</Button>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });
    await expect(button).toBeInTheDocument();
  },
};

export const Large: Story = {
  render: () => <Button large>Large Button</Button>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /large button/i });
    await expect(button).toBeInTheDocument();
  },
};

export const Clear: Story = {
  render: () => <Button clear>Clear Button</Button>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /clear button/i });
    await expect(button).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  render: () => <Button disabled>Disabled</Button>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled/i });
    await expect(button).toBeInTheDocument();
    await expect(button).toBeDisabled();
  },
};

export const WithIcon: Story = {
  render: () => <Button icon="star">With Icon</Button>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /with icon/i });
    await expect(button).toBeInTheDocument();
  },
};

export const Round: Story = {
  render: () => <Button round icon="cross" iconSize={20} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
  },
};
