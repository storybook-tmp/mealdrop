import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Modal } from './Modal';

const meta = {
  title: 'AI Generated/Medium/Modal',
  component: Modal,
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.isOpen ?? false);
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h2>Modal Content</h2>
          <p>This is the modal body content.</p>
        </Modal>
      </>
    );
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};
