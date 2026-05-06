import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { ErrorBlock } from './ErrorBlock';

const meta = {
  component: ErrorBlock,
  tags: ['ai-generated'],
  args: {
    onButtonClick: fn(),
  },
} satisfies Meta<typeof ErrorBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotFound: Story = {
  args: {
    title: "We can't find this page",
    body: "This page doesn't exist, keep looking.",
    image: <img src="https://via.placeholder.com/200" alt="not found" />,
    buttonText: 'Home',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /home/i })).toBeVisible();
  },
};

export const ServerError: Story = {
  args: {
    title: 'Something went wrong!',
    body: 'Our bad, something went wrong on our side.',
    image: <img src="https://via.placeholder.com/200" alt="error" />,
    buttonText: 'Try again',
  },
};
