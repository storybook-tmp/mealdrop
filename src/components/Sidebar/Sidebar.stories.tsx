import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Button } from '../Button';

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarWithState = ({ isOpenInitial = false }: { isOpenInitial?: boolean }) => {
  const [isOpen, setIsOpen] = useState(isOpenInitial);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Sidebar</Button>
      <Sidebar
        isOpen={isOpen}
        title="Sidebar Title"
        onClose={() => setIsOpen(false)}
        footer={<div style={{ padding: '10px' }}>Footer Content</div>}
      >
        <div style={{ padding: '20px' }}>
          <p>Sidebar content goes here</p>
          <p>Click the close button or press Escape to dismiss.</p>
        </div>
      </Sidebar>
    </>
  );
};

export const Default: Story = {
  render: () => <SidebarWithState isOpenInitial={true} />,
};

export const Closed: Story = {
  render: () => <SidebarWithState isOpenInitial={false} />,
};

export const WithoutFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Sidebar</Button>
        <Sidebar
          isOpen={isOpen}
          title="Sidebar Without Footer"
          onClose={() => setIsOpen(false)}
        >
          <div style={{ padding: '20px' }}>
            <p>This sidebar has no footer</p>
          </div>
        </Sidebar>
      </>
    );
  },
};
