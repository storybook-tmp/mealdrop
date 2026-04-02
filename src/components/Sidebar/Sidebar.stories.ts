import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from '../Button';
import { Body } from '../typography';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
  args: {
    isOpen: true,
    title: 'Your order',
    onClose: fn(),
    footer: React.createElement(Button, { large: true, onClick: fn() }, 'Checkout'),
  },
  render: (args) =>
    React.createElement(
      Sidebar,
      args,
      React.createElement(
        'div',
        { style: { display: 'grid', gap: '1rem' } },
        React.createElement(Body, { fontWeight: 'medium' }, 'Crispy tofu bowl'),
        React.createElement(Body, null, 'Add chopsticks and extra sauce before continuing.')
      )
    ),
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {};

export const WithoutFooter: Story = {
  args: {
    footer: undefined,
    title: 'Menu details',
  },
};
