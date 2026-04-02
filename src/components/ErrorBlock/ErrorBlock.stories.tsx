import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBlock } from './ErrorBlock';

const mockImage = <div style={{ width: '100px', height: '100px', backgroundColor: '#ccc' }}>Image</div>;

const meta = {
  title: 'AI Generated/Medium/ErrorBlock',
  component: ErrorBlock,
} satisfies Meta<typeof ErrorBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Something went wrong',
    body: 'We encountered an error while loading your data. Please try again.',
    image: mockImage,
    buttonText: 'Retry',
    onButtonClick: () => console.log('Retry clicked'),
  },
};

export const NotFound: Story = {
  args: {
    title: 'Not Found',
    body: 'The page you are looking for does not exist.',
    image: mockImage,
    buttonText: 'Go Home',
    onButtonClick: () => console.log('Go Home clicked'),
  },
};
