import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import React from 'react';

import { PageSection } from './PageSection';

const meta = {
  component: PageSection,
  tags: ['ai-generated'],
  args: {
    title: 'Our favorite picks',
    children: <p>Section content goes here</p>,
  },
} satisfies Meta<typeof PageSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /our favorite picks/i })).toBeVisible();
  },
};

export const WithTopButton: Story = {
  args: {
    title: 'All restaurants',
    topButtonLabel: 'See all',
    onTopButtonClick: () => {},
  },
};
