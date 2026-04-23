import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBlock } from './ErrorBlock';

const meta = {
  title: 'AI Generated/Medium/ErrorBlock',
  component: ErrorBlock,
} satisfies Meta<typeof ErrorBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Something went wrong',
    image: <div style={{ width: '100px', height: '100px', backgroundColor: '#ccc' }}>Image</div>,
    body: 'Please try again later or contact support.',
    buttonText: 'Go back',
    onButtonClick: () => alert('Clicked retry button'),
  },
};

export const PageNotFound: Story = {
  args: {
    title: 'Page not found',
    image: <div style={{ width: '100px', height: '100px', backgroundColor: '#ccc' }}>404</div>,
    body: 'The page you are looking for does not exist.',
    buttonText: 'Back to home',
    onButtonClick: () => alert('Clicked back button'),
  },
};
