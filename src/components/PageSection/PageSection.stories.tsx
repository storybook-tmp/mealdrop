import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'
import { PageSection } from './PageSection'

const meta = {
  component: PageSection,
  tags: ['ai-generated'],
} satisfies Meta<typeof PageSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Our favorite picks',
    children: <p>Section content goes here</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /our favorite picks/i })).toBeVisible()
    await expect(canvas.getByText('Section content goes here')).toBeVisible()
  },
}

export const WithButton: Story = {
  args: {
    title: 'Categories',
    topButtonLabel: 'View all categories',
    onTopButtonClick: fn(),
    children: <p>Category items here</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /categories/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /view all categories/i })).toBeVisible()
  },
}

export const LongTitle: Story = {
  args: {
    title: 'Award winning restaurants near you',
    children: <p>Restaurant cards here</p>,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('heading', { name: /award winning restaurants near you/i })
    ).toBeVisible()
  },
}
