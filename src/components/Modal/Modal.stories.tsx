import type { Meta, StoryObj } from '@storybook/react-vite';

import { Modal } from './Modal';
import { Body } from '../typography';

const meta = {
  component: Modal,
  tags: ['ai-generated'],
  args: {
    isOpen: true,
    onClose: () => {},
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    children: <Body>Modal content goes here.</Body>,
  },
};

export const WithLongContent: Story = {
  args: {
    children: (
      <div>
        <Body>First paragraph of modal content.</Body>
        <Body>Second paragraph with more detail.</Body>
        <Body>Third paragraph closing the message.</Body>
      </div>
    ),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    children: <Body>This should not be visible.</Body>,
  },
};
