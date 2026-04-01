import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sidebar } from './Sidebar';
import { Body } from '../typography';

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.isOpen ?? false);
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Sidebar</button>
        <Sidebar
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Body>This is sidebar content with some information.</Body>
          <Body>You can add any React elements here.</Body>
        </Sidebar>
      </>
    );
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
    title: 'Sidebar Title',
    onClose: () => {},
  },
};

export const WithFooter: Story = {
  args: {
    isOpen: false,
    title: 'Sidebar with Footer',
    onClose: () => {},
    footer: <button>Action Button</button>,
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Open Sidebar',
    onClose: () => {},
  },
};
