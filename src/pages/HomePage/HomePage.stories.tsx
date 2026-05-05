import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { HomePage } from './HomePage';

const meta = {
  component: HomePage,
  tags: ['ai-generated'],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    // Verifies MSW data arrives and restaurant cards render
    await expect(await canvas.findByText('Burger Kingdom')).toBeVisible();
  },
};
