import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Badge } from './Badge';

const meta = {
  component: Badge,
  title: 'Components/Badge',
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Italian',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Italian');
    await expect(badge).toBeInTheDocument();
  },
};

export const Asian: Story = {
  args: {
    text: 'Asian',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Asian');
    await expect(badge).toBeInTheDocument();
  },
};

export const American: Story = {
  args: {
    text: 'American',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('American');
    await expect(badge).toBeInTheDocument();
  },
};
