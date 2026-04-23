import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import { Modal } from './Modal';
import styled from 'styled-components';

const MockContent = styled.div`
  padding: 2rem;
  background: white;
`;

const meta = {
  component: Modal,
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
  render: (args) => (
    <Modal {...args}>
      <MockContent>
        <h2>Modal Content</h2>
        <p>This is the modal content.</p>
      </MockContent>
    </Modal>
  ),
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    // Verify the modal root exists
    const modalRoot = doc.getElementById('modal');
    expect(modalRoot).toBeInTheDocument();
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
  render: (args) => (
    <Modal {...args}>
      <MockContent>
        <h2>Modal Content</h2>
      </MockContent>
    </Modal>
  ),
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    const backdrop = doc.querySelector('[data-testid="modal-backdrop"]');
    expect(backdrop).not.toBeInTheDocument();
  },
};

export const Basic: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
  render: (args) => (
    <Modal {...args}>
      <MockContent>
        <h2>Modal Dialog</h2>
        <p>This is a basic modal.</p>
      </MockContent>
    </Modal>
  ),
  play: async ({ canvasElement }) => {
    // Just verify the component renders without errors
    const doc = canvasElement.ownerDocument;
    // Check that the modal root exists in the document
    const modalRoot = doc.getElementById('modal');
    expect(modalRoot).toBeInTheDocument();
  },
};
