import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalWithState(args: any) {
  const [isOpen, setIsOpen] = useState(args.isOpen);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ padding: '20px' }}>
          <h2>Modal Content</h2>
          <p>This is the modal content area. Click the X button or press ESC to close.</p>
        </div>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    isOpen: false,
    onClose: () => {},
  },
};

export const Open: Story = {
  render: (args) => <ModalWithState {...args} />,
  args: {
    isOpen: true,
    onClose: () => {},
  },
};
