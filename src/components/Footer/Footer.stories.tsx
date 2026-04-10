import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Footer } from './Footer';

const meta = {
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Footer />,
  play: async ({ canvas }) => {
    const home = canvas.getByRole('link', { name: /home/i });
    await expect(home).toBeVisible();
  },
};
