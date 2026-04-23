import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { HeaderComponent } from './Header';

const meta = {
  component: HeaderComponent,
  title: 'Components/Header',
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HeaderComponent />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByTestId('header');
    await expect(header).toBeInTheDocument();
  },
};

export const WithCartTotal: Story = {
  render: () => <HeaderComponent totalPrice={45.99} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cartButton = canvas.getByLabelText('food cart');
    await expect(cartButton).toBeInTheDocument();
  },
};

export const LogoOnly: Story = {
  render: () => <HeaderComponent logoOnly={true} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByTestId('header');
    await expect(header).toBeInTheDocument();
  },
};

export const Sticky: Story = {
  render: () => <HeaderComponent sticky={true} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByTestId('header');
    await expect(header).toBeInTheDocument();
  },
};
