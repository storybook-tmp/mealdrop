import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import styled from 'styled-components';

import { Spinner } from './Spinner';

const Container = styled.div`
  position: relative;
  height: 400px;
`;

const meta = {
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container>
      <Spinner />
    </Container>
  ),
  play: async ({ canvas }) => {
    const container = canvas.getByRole('generic');
    await expect(container).toBeInTheDocument();
  },
};
