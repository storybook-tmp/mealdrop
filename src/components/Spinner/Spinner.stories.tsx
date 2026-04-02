import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { Spinner } from './Spinner';

const Container = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid #e0e0e0;
`;

const meta = {
  title: 'AI Generated/Medium/Spinner',
  component: Spinner,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContainer: Story = {
  render: () => (
    <div style={{ position: 'relative', width: '200px', height: '200px', border: '1px solid #ccc' }}>
      <Spinner />
    </div>
  ),
};
