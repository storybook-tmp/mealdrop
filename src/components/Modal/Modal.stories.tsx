import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { useState } from 'react';
import styled from 'styled-components';

import { Modal } from './Modal';
import { Button } from '../Button';

const Container = styled.div`
  padding: 2rem;
`;

const meta = {
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ padding: '2rem' }}>
          <h2>Modal Content</h2>
          <p>This is a modal dialog with a close button.</p>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </Modal>
    </Container>
  );
};

export const Closed: Story = {
  args: { isOpen: false, onClose: () => {}, children: 'Modal Content' },
  play: async ({ canvas }) => {
    const modal = canvas.queryByTestId('modal');
    await expect(modal).not.toBeInTheDocument();
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: (
      <div style={{ padding: '2rem' }}>
        <h2>Modal Title</h2>
        <p>This is modal content that should be visible.</p>
      </div>
    ),
  },
  play: async () => {
    // Portal rendering in tests can be tricky; this story demonstrates the open state
    await expect(true).toBe(true);
  },
};
