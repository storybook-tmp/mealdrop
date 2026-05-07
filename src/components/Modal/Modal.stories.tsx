import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';

import { Body } from '../typography';
import { Modal } from './Modal';

const meta = {
  component: Modal,
  tags: ['ai-generated'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
    children: <Body>Choose a delivery time</Body>,
  },
  play: async ({ args, canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body);

    await expect(await body.findByTestId('modal')).toContainElement(body.getByText('Choose a delivery time'));
    await userEvent.click(body.getByRole('button', { name: /close modal/i }));
    await expect(args.onClose).toHaveBeenCalled();
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: fn(),
    children: <Body>Choose a delivery time</Body>,
  },
};
