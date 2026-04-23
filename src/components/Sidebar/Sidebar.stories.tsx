import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarWrapper = ({ isOpen: initialOpen }: { isOpen: boolean }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Sidebar</button>
      <div style={{ padding: '1rem' }}>Main content</div>
      <Sidebar isOpen={isOpen} title="Navigation" onClose={() => setIsOpen(false)}>
        <div style={{ padding: '1rem' }}>
          <p>Sidebar content goes here</p>
        </div>
      </Sidebar>
    </>
  );
};

export const Closed: Story = {
  render: () => <SidebarWrapper isOpen={false} />,
};

export const Open: Story = {
  render: () => <SidebarWrapper isOpen={true} />,
};

export const WithFooter: Story = {
  render: () => (
    <Sidebar
      isOpen={true}
      title="Options"
      onClose={() => {}}
      footer={<button style={{ width: '100%', padding: '1rem' }}>Save</button>}
    >
      <div style={{ padding: '1rem' }}>
        <p>Sidebar with footer</p>
      </div>
    </Sidebar>
  ),
};
