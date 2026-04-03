import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header, HeaderComponent } from './Header';

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Header />,
};

export const Sticky: Story = {
  render: () => <Header sticky />,
};

export const LogoOnly: Story = {
  render: () => <HeaderComponent logoOnly />,
};
