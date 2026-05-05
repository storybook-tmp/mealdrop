import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'AI Generated/Medium/Spinner',
  component: Spinner,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '200px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InsideContainer: Story = {
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '300px', background: '#f5f6f7' }}>
        <Story />
      </div>
    ),
  ],
};
