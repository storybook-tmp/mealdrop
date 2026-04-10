import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { Body } from '../typography';
import { Button } from '../Button';

import { Modal } from './Modal';

const meta = {
  args: {
    isOpen: false,
    onClose: () => undefined,
  },
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  render: () => <ModalExample />,
  play: async ({ canvas, canvasElement, userEvent }) => {
    const doc = canvasElement.ownerDocument;

    await userEvent.click(canvas.getByRole('button', { name: /open modal/i }));
    await waitFor(() => {
      expect(doc.querySelector('[data-testid="modal"]')).toBeVisible();
      expect(doc.querySelector('[data-testid="modal-backdrop"]')).toBeVisible();
      expect(doc.querySelector('#modal')).toContainElement(doc.querySelector('[data-testid="modal"]'));
    });
  },
};

export const CloseWithButton: Story = {
  render: () => <ModalExample initiallyOpen />,
  play: async ({ canvasElement, userEvent }) => {
    const doc = canvasElement.ownerDocument;

    await userEvent.click(doc.querySelector('[data-testid="modal-close-btn"]')!);
    await waitFor(() => {
      expect(doc.querySelector('[data-testid="modal"]')).toBeNull();
    });
    await expect(canvasElement).toHaveTextContent('Open modal');
  },
};

export const CloseWithEscape: Story = {
  render: () => <ModalExample initiallyOpen />,
  play: async ({ canvasElement, userEvent }) => {
    const doc = canvasElement.ownerDocument;

    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(doc.querySelector('[data-testid="modal"]')).toBeNull();
    });
    await expect(canvasElement).toHaveTextContent('Open modal');
  },
};

function ModalExample({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ padding: '0 1.5rem 1.5rem' }}>
          <Body>A popular dish with extra toppings.</Body>
        </div>
      </Modal>
    </div>
  );
}
