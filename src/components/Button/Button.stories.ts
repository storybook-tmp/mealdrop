import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from './Button';

const meta = {
  title: 'AI Generated/Medium/Button',
  component: Button,
  args: {
    children: 'Add to cart',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ClearWithIcon: Story = {
  args: {
    children: 'Back',
    clear: true,
    icon: 'arrow-left',
  },
};
