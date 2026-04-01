import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Navigation',
    onClose: () => {},
    children: React.createElement(
      'div',
      {},
      React.createElement('p', {}, 'Home'),
      React.createElement('p', {}, 'About'),
      React.createElement('p', {}, 'Contact')
    ),
    footer: React.createElement('p', {}, 'Footer Content'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Navigation',
    onClose: () => {},
    children: React.createElement('p', {}, 'Sidebar content'),
    footer: React.createElement('p', {}, 'Footer'),
  },
};
