import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Modal } from './Modal';

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = ({ isOpen: initialOpen }: { isOpen: boolean }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  useEffect(() => {
    // Ensure the modal element exists for the Portal
    if (!document.querySelector('#modal')) {
      const modalDiv = document.createElement('div');
      modalDiv.id = 'modal';
      document.body.appendChild(modalDiv);
    }
  }, []);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ padding: '2rem' }}>
          <h2>Modal Title</h2>
          <p>This is the modal content. You can click the X button or press Escape to close.</p>
        </div>
      </Modal>
    </>
  );
};

export const Closed: Story = {
  render: () => <ModalWrapper isOpen={false} />,
};

export const Open: Story = {
  render: () => <ModalWrapper isOpen={true} />,
};
