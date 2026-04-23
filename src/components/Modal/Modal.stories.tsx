import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWithState = ({ isOpenInitial = false }: { isOpenInitial?: boolean }) => {
  const [isOpen, setIsOpen] = useState(isOpenInitial);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ padding: '20px' }}>
          <h2>Modal Content</h2>
          <p>This is a sample modal dialog with some content.</p>
          <p>Press Escape or click the close button to dismiss.</p>
        </div>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWithState isOpenInitial={true} />,
};

export const Closed: Story = {
  render: () => <ModalWithState isOpenInitial={false} />,
};
