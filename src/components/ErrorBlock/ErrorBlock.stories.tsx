import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { ErrorBlock } from './ErrorBlock';

const MockImage = () => <div style={{ width: '100px', height: '100px', backgroundColor: '#ccc' }} />;

const meta = {
  component: ErrorBlock,
  title: 'Components/ErrorBlock',
} satisfies Meta<typeof ErrorBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Something went wrong',
    image: <MockImage />,
    body: 'Unable to load restaurants. Please try again.',
    buttonText: 'Retry',
    onButtonClick: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Something went wrong');
    await expect(heading).toBeInTheDocument();
    const button = canvas.getByRole('button', { name: /retry/i });
    await expect(button).toBeInTheDocument();
  },
};

export const NotFound: Story = {
  args: {
    title: 'Not Found',
    image: <MockImage />,
    body: 'The restaurant you are looking for does not exist.',
    buttonText: 'Go Back',
    onButtonClick: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Not Found');
    await expect(heading).toBeInTheDocument();
  },
};

export const WithClick: Story = {
  args: {
    title: 'Network Error',
    image: <MockImage />,
    body: 'Please check your internet connection.',
    buttonText: 'Try Again',
    onButtonClick: () => {},
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /try again/i });
    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
  },
};
