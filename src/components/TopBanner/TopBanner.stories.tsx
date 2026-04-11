import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { TopBanner } from './TopBanner';

const meta = {
  component: TopBanner,
  title: 'Components/TopBanner',
} satisfies Meta<typeof TopBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  render: () => <TopBanner title="Welcome to MealDrop" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Welcome to MealDrop');
    await expect(heading).toBeInTheDocument();
  },
};

export const WithPhoto: Story = {
  render: () => (
    <TopBanner
      title="Italian Restaurant"
      photoUrl="https://via.placeholder.com/500x240"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Italian Restaurant');
    await expect(heading).toBeInTheDocument();
  },
};

export const Empty: Story = {
  render: () => <TopBanner />,
  play: async ({ canvasElement }) => {
    // Just verify the component renders
    const element = canvasElement.querySelector('div');
    await expect(element).toBeInTheDocument();
  },
};
