import type { Meta, StoryObj } from '@storybook/react-vite';

import { Logo } from './Logo';

const meta = {
  title: 'AI Generated/Simple/Logo',
  component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LargeAnimatedMark: Story = {
  args: {
    large: true,
    animated: true,
  },
};
