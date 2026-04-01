import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Modal } from './Modal';

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        const modalDiv = document.createElement('div');
        modalDiv.id = 'modal';
        document.body.appendChild(modalDiv);
        return () => {
          document.body.removeChild(modalDiv);
        };
      }, []);
      return React.createElement(Story);
    },
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: React.createElement(
      'div',
      {},
      React.createElement('h2', {}, 'Modal Title'),
      React.createElement('p', {}, 'This is the modal content. You can add any content here.')
    ),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: React.createElement(
      'div',
      {},
      React.createElement('h2', {}, 'Modal Title'),
      React.createElement('p', {}, 'This modal is closed and will not be visible.')
    ),
  },
};
