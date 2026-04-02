import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

function SidebarWithState(args: any) {
  const [isOpen, setIsOpen] = useState(args.isOpen);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Sidebar</button>
      <Sidebar {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ padding: '20px' }}>
          <p>Sidebar content goes here. You can add any React elements.</p>
          <p>Click the X button or press ESC to close.</p>
        </div>
      </Sidebar>
    </>
  );
}

export const Default: Story = {
  render: (args) => <SidebarWithState {...args} />,
  args: {
    isOpen: false,
    title: 'Menu',
    onClose: () => {},
  },
};

export const WithFooter: Story = {
  render: (args) => <SidebarWithState {...args} />,
  args: {
    isOpen: false,
    title: 'Settings',
    onClose: () => {},
    footer: <button>Save Settings</button>,
  },
};
