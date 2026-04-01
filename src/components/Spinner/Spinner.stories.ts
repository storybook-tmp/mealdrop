import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import styled from 'styled-components';
import { Spinner } from './Spinner';

const Container = styled.div`
  width: 400px;
  height: 300px;
  position: relative;
  background: white;
`;

const meta = {
  title: 'AI Generated/Medium/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => React.createElement(Container, {}, React.createElement(Story)),
  ],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {};
