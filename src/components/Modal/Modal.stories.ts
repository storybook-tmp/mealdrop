import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Body } from '../typography';
import { Modal } from './Modal';

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  args: {
    isOpen: true,
    onClose: fn(),
  },
  render: (args) =>
    React.createElement(
      Modal,
      args,
      React.createElement(Body, null, 'Pick your extras and confirm your order.')
    ),
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
