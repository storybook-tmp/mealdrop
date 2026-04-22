import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';

const WithModalRoot = (Story: React.ComponentType) => {
  useEffect(() => {
    let el = document.querySelector('#modal');
    if (!el) {
      el = document.createElement('div');
      el.id = 'modal';
      document.body.appendChild(el);
    }
    return () => {
      const existing = document.querySelector('#modal');
      if (existing) {
        document.body.removeChild(existing);
      }
    };
  }, []);

  return <Story />;
};

const meta = {
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  tags: ['ai-generated'],
  decorators: [WithModalRoot],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: (
      <div style={{ padding: '2rem' }}>
        <h2>Modal Title</h2>
        <p>This is the modal content. It renders inside a portal.</p>
      </div>
    ),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: (
      <div style={{ padding: '2rem' }}>
        <p>This content is hidden when the modal is closed.</p>
      </div>
    ),
  },
};
