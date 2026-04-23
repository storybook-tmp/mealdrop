import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Modal } from './Modal';

const meta = {
  title: 'AI Generated/Medium/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalContent = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ padding: '20px' }}>
          <h2>Modal Title</h2>
          <p>This is the modal content</p>
        </div>
      </Modal>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} style={{ padding: '10px 20px' }}>
          Reopen Modal
        </button>
      )}
    </>
  );
};

export const Open: Story = {
  render: () => <ModalContent />,
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: <div>Modal content</div>,
  },
};
