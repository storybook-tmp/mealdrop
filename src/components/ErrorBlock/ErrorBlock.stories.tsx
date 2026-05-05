import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

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
    image: <img alt="error" src="" />,
    buttonText: 'Try again',
    onButtonClick: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Something went wrong!')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /try again/i })).toBeVisible();
  },
};

export const NotFound: Story = {
  args: {
    title: "We can't find this page",
    body: "This page doesn't exist, keep looking.",
    image: <img alt="not found" src="" />,
    buttonText: 'Home',
    onButtonClick: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("We can't find this page")).toBeVisible();
    await expect(canvas.getByRole('button', { name: /home/i })).toBeVisible();
  },
};

export const NoRestaurants: Story = {
  args: {
    title: "This is not the food you're looking for.",
    body: 'It seems that there are no restaurants in this category yet. Try to come back later?',
    image: <img alt="no restaurants found" src="" />,
    buttonText: 'See all restaurants',
    onButtonClick: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("This is not the food you're looking for.")).toBeVisible();
    await expect(canvas.getByRole('button', { name: /see all restaurants/i })).toBeVisible();
  },
};
