import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Spinner } from './Spinner';

const meta = {
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Spinner />,
  play: async ({ canvasElement }) => {
    // Check that the SVG spinner is rendered
    const svg = canvasElement.querySelector('svg');
    await expect(svg).toBeInTheDocument();
  },
};
