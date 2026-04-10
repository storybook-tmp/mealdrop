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
    const discoverSection = canvas.getByText(/discover us/i);
    await expect(discoverSection).toBeVisible();

    const socialSection = canvas.getByText(/our social media/i);
    await expect(socialSection).toBeVisible();

    const appsSection = canvas.getByText(/check our apps/i);
    await expect(appsSection).toBeVisible();
  },
};
