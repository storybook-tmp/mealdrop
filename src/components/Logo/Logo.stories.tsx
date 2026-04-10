import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Logo } from './Logo';

const meta = {
  component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Logo />,
  play: async ({ canvas }) => {
    const logo = canvas.getByText(/mealdrop/i);
    await expect(logo).toBeVisible();
  },
};
