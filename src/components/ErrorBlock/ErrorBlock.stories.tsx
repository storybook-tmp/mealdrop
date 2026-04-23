import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { AnimatedIllustration } from '../AnimatedIllustration'
import { ErrorBlock } from './ErrorBlock'

const meta = {
  component: ErrorBlock,
  tags: ['ai-generated'],
} satisfies Meta<typeof ErrorBlock>

export default meta
type Story = StoryObj<typeof meta>

export const NotFound: Story = {
  args: {
    title: "We can't find this page",
    body: "This page doesn't exist, keep looking.",
    image: <AnimatedIllustration animation="Error" />,
    buttonText: 'Home',
    onButtonClick: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: "We can't find this page" })).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Home' })).toBeVisible()
  },
}

export const ServerError: Story = {
  args: {
    title: 'Something went wrong!',
    body: 'Our bad, something went wrong on our side.',
    image: <AnimatedIllustration animation="NotFound" />,
    buttonText: 'Try again',
    onButtonClick: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Something went wrong!' })).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Try again' })).toBeVisible()
  },
}
