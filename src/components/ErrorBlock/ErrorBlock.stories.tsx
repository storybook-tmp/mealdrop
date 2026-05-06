import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
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
    image: <img alt="error" src="https://via.placeholder.com/150" />,
    buttonText: 'Try again',
    onButtonClick: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /try again/i })).toBeVisible();
  },
};

export const NotFound: Story = {
  args: {
    title: "We can't find this page",
    body: "This page doesn't exist, keep looking.",
    image: <img alt="not found" src="https://via.placeholder.com/150" />,
    buttonText: 'Home',
    onButtonClick: () => {},
  },
};
