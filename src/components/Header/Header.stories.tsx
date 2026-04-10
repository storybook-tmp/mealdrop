import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Header, HeaderComponent } from './Header';

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Header />,
  play: async ({ canvas }) => {
    const logo = canvas.getByText('MealDrop');
    await expect(logo).toBeVisible();
  },
};

export const LogoOnly: Story = {
  render: () => <HeaderComponent logoOnly />,
  play: async ({ canvas }) => {
    const header = canvas.getByTestId('header');
    await expect(header).toBeVisible();
  },
};

export const Sticky: Story = {
  render: () => <Header sticky />,
  play: async ({ canvas }) => {
    const logo = canvas.getByText('MealDrop');
    await expect(logo).toBeVisible();
  },
};
