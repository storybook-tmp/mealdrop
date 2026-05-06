import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'
import { ErrorBlock } from './ErrorBlock'

const meta = {
  component: ErrorBlock,
  tags: ['ai-generated'],
} satisfies Meta<typeof ErrorBlock>

export default meta
type Story = StoryObj<typeof meta>

export const ServerError: Story = {
  args: {
    title: 'Something went wrong!',
    body: 'Our bad, something went wrong on our side.',
    buttonText: 'Try again',
    image: <img src="/sprite-map.svg" alt="error" width={120} height={120} />,
    onButtonClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Something went wrong!')).toBeVisible()
    await expect(canvas.getByText('Our bad, something went wrong on our side.')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /try again/i })).toBeVisible()
  },
}

export const NotFound: Story = {
  args: {
    title: "We can't find this page",
    body: "This page doesn't exist, keep looking.",
    buttonText: 'Home',
    image: <img src="/sprite-map.svg" alt="not found" width={120} height={120} />,
    onButtonClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("We can't find this page")).toBeVisible()
    await expect(canvas.getByRole('button', { name: /home/i })).toBeVisible()
  },
}

export const ClickAction: Story = {
  args: {
    title: 'Oops!',
    body: 'Please try again later.',
    buttonText: 'Retry',
    image: <img src="/sprite-map.svg" alt="error" width={120} height={120} />,
    onButtonClick: fn(),
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /retry/i })
    await userEvent.click(button)
    await expect(button).toBeVisible()
  },
}
