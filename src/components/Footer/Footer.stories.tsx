import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Footer } from './Footer';

const meta = {
  component: Footer,
  title: 'Components/Footer',
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Footer />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Check that footer content is rendered
    const footer = canvasElement.querySelector('div');
    await expect(footer).toBeInTheDocument();
  },
};

export const Visible: Story = {
  render: () => <Footer />,
  play: async ({ canvasElement }) => {
    // Verify footer is in the document
    const element = canvasElement.querySelector('div');
    await expect(element).toBeInTheDocument();
  },
};
