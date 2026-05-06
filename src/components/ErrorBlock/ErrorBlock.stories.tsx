import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { ErrorBlock } from './ErrorBlock';

const meta = {
  component: ErrorBlock,
  tags: ['ai-generated'],
} satisfies Meta<typeof ErrorBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ServerError: Story = {
  args: {
    title: 'Something went wrong!',
    body: 'Our bad, something went wrong on our side.',
    buttonText: 'Try again',
    image: <img alt="error" src="/logo192.png" />,
    onButtonClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Something went wrong!')).toBeVisible();
    await expect(canvas.getByText(/our bad/i)).toBeVisible();
    await expect(canvas.getByRole('button', { name: /try again/i })).toBeVisible();
  },
};

export const NotFound: Story = {
  args: {
    title: "We can't find this page",
    body: "This page doesn't exist, keep looking.",
    buttonText: 'Home',
    image: <img alt="not found" src="/logo192.png" />,
    onButtonClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("We can't find this page")).toBeVisible();
    await expect(canvas.getByRole('button', { name: /home/i })).toBeVisible();
  },
};

export const EmptyCategory: Story = {
  args: {
    title: "This is not the food you're looking for.",
    body: 'It seems that there are no restaurants in this category yet. Try to come back later?',
    buttonText: 'See all restaurants',
    image: <img alt="no restaurants" src="/logo192.png" />,
    onButtonClick: fn(),
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /see all restaurants/i });
    await expect(button).toBeVisible();
    await userEvent.click(button);
  },
};
