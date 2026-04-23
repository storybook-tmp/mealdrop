import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'AI Generated/Medium/Breadcrumb',
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Categories', path: '/categories' },
      { label: 'Italian', path: '' },
    ],
  },
};

export const SingleLevel: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Current Page', path: '' },
    ],
  },
};
