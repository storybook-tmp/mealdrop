import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarContent = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <Sidebar
        isOpen={isOpen}
        title="Sidebar Title"
        onClose={() => setIsOpen(false)}
        footer={<p>Footer content</p>}
      >
        <div style={{ padding: '20px' }}>
          <p>Sidebar content goes here</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </Sidebar>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} style={{ padding: '10px 20px' }}>
          Open Sidebar
        </button>
      )}
    </>
  );
};

export const Open: Story = {
  render: () => <SidebarContent />,
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Sidebar',
    onClose: () => {},
    children: <div>Sidebar content</div>,
  },
};
