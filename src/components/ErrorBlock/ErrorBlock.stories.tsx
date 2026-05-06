import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { ErrorBlock } from './ErrorBlock';

const meta = {
  component: ErrorBlock,
  tags: ['ai-generated'],
} satisfies Meta<typeof ErrorBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Something went wrong!',
    body: 'Our bad, something went wrong on our side.',
    buttonText: 'Try again',
    image: <span>😵</span>,
    onButtonClick: fn(),
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /try again/i }));
  },
};

export const NotFound: Story = {
  args: {
    title: "We can't find this page",
    body: "This page doesn't exist, keep looking.",
    buttonText: 'Home',
    image: <span>🔍</span>,
    onButtonClick: fn(),
  },
};
