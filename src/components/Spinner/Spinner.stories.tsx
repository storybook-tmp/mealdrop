import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Spinner } from './Spinner';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

const meta = {
  component: Spinner,
  title: 'Components/Spinner',
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container>
      <Spinner />
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const svg = canvasElement.querySelector('svg');
    await expect(svg).toBeInTheDocument();
  },
};

export const Loading: Story = {
  render: () => (
    <Container>
      <Spinner />
      <div style={{ textAlign: 'center', marginTop: '150px' }}>Loading data...</div>
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText('Loading data...');
    await expect(text).toBeInTheDocument();
  },
};
