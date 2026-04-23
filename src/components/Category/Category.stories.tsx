import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Category } from './Category';

const meta = {
  component: Category,
  title: 'Components/Category',
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Squared: Story = {
  args: {
    title: 'Italian',
    photoUrl: 'https://via.placeholder.com/300x250',
    round: false,
  },
  render: (args) => (
    <div style={{ width: '300px', height: '250px' }}>
      <Category {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const category = canvas.getByTestId('Italian');
    await expect(category).toBeInTheDocument();
    const image = canvas.getByAltText('restaurant category');
    await expect(image).toBeInTheDocument();
  },
};

export const Rounded: Story = {
  args: {
    title: 'Asian',
    photoUrl: 'https://via.placeholder.com/150x150',
    round: true,
  },
  render: (args) => (
    <div style={{ width: '150px' }}>
      <Category {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const category = canvas.getByTestId('Asian');
    await expect(category).toBeInTheDocument();
  },
};

export const Mexican: Story = {
  args: {
    title: 'Mexican',
    photoUrl: 'https://via.placeholder.com/300x250',
    round: false,
  },
  render: (args) => (
    <div style={{ width: '300px', height: '250px' }}>
      <Category {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const category = canvas.getByTestId('Mexican');
    await expect(category).toBeInTheDocument();
  },
};
