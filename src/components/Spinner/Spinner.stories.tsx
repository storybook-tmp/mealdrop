import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Spinner } from './Spinner';

const meta = {
  component: Spinner,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ height: '200px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/looking for some food/i)).toBeInTheDocument();
  },
};
