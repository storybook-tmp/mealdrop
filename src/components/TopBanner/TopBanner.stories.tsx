import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopBanner } from './TopBanner';

const meta = {
  component: TopBanner,
} satisfies Meta<typeof TopBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  render: () => <TopBanner title="Categories" />,
};

export const WithPhoto: Story = {
  render: () => (
    <TopBanner
      title="Pizza"
      photoUrl="https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550"
    />
  ),
};

export const TitleOnly: Story = {
  render: () => <TopBanner title="Order confirmed!" />,
};
