import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  component: Spinner,
  tags: ['ai-generated'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '200px' }}>
        <Story />
      </div>
    ),
  ],
};
