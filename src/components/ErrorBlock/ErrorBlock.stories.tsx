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

export const Default: Story = {
  args: {
    title: 'Something went wrong!',
    body: 'Our bad, something went wrong on our side.',
    buttonText: 'Try again',
    image: <span>🍔</span>,
  },
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: /try again/i }));
    await expect(args.onButtonClick).toHaveBeenCalledOnce();
  },
};

export const NotFound: Story = {
  args: {
    title: "We can't find this page",
    body: "This page doesn't exist, keep looking.",
    buttonText: 'Home',
    image: <span>🔍</span>,
  },
};
