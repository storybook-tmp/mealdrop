import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: 'This is a modal dialog content',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: 'This is a modal dialog content',
  },
};
