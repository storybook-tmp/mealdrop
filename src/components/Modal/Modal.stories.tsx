import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Modal } from './Modal';

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <>
        <div id="modal" />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: <div>Modal content goes here</div>,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: <div>Modal content goes here</div>,
  },
};
