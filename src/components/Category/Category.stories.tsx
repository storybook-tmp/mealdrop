import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Category } from './Category';

const meta = {
  component: Category,
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Pizza',
    photoUrl: 'https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg',
  },
  render: (args) => <Category {...args} />,
  play: async ({ canvas, canvasElement }) => {
    const container = canvasElement.querySelector('[data-testid="Pizza"]');
    await expect(container).toBeInTheDocument();
  },
};

export const Burgers: Story = {
  args: {
    title: 'Burgers',
    photoUrl: 'https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg',
  },
  render: (args) => <Category {...args} />,
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector('[data-testid="Burgers"]');
    await expect(container).toBeInTheDocument();
  },
};

export const Rounded: Story = {
  args: {
    title: 'Sushi',
    photoUrl: 'https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg',
    round: true,
  },
  render: (args) => <Category {...args} />,
  play: async ({ canvas }) => {
    const text = canvas.getByText('Sushi');
    await expect(text).toBeVisible();
  },
};
