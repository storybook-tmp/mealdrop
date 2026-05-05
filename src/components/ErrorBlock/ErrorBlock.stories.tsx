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
    image: <img src="https://via.placeholder.com/200" alt="error" />,
    onButtonClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /something went wrong/i })).toBeVisible()
    await expect(canvas.getByText(/our bad/i)).toBeVisible()
    await expect(canvas.getByRole('button', { name: /try again/i })).toBeVisible()
  },
}

export const NotFound: Story = {
  args: {
    title: "We can't find this page",
    body: "This page doesn't exist, keep looking.",
    buttonText: 'Home',
    image: <img src="https://via.placeholder.com/200" alt="not found" />,
    onButtonClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /can't find this page/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /home/i })).toBeVisible()
  },
}

export const ClickHandler: Story = {
  args: {
    title: 'Error occurred',
    body: 'Please try again later.',
    buttonText: 'Retry',
    image: <img src="https://via.placeholder.com/200" alt="error" />,
    onButtonClick: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole('button', { name: /retry/i })
    await userEvent.click(button)
    await expect(args.onButtonClick).toHaveBeenCalledTimes(1)
  },
}
