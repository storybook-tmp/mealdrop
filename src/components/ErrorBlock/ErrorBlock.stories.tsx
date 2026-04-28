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
    title: 'An error occurred',
    body: 'We could not load the restaurants. Please try again.',
    buttonText: 'Try again',
    image: <img src="https://via.placeholder.com/150" alt="error illustration" />,
    onButtonClick: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('An error occurred')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /try again/i })).toBeVisible();
  },
};

export const NotFound: Story = {
  args: {
    title: 'Restaurant not found',
    body: 'The restaurant you are looking for does not exist.',
    buttonText: 'Go home',
    image: <img src="https://via.placeholder.com/150" alt="not found" />,
    onButtonClick: () => {},
  },
};
