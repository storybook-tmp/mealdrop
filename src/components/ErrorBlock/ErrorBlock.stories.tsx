import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { ErrorBlock } from './ErrorBlock'

const meta = {
  component: ErrorBlock,
  tags: ['ai-generated'],
} satisfies Meta<typeof ErrorBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Something went wrong!',
    body: 'We could not load the restaurants. Please try again later.',
    buttonText: 'Try again',
    image: <img alt="error" src="https://via.placeholder.com/200" />,
    onButtonClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /something went wrong/i })).toBeVisible()
    await expect(canvas.getByText(/we could not load/i)).toBeVisible()
    await expect(canvas.getByRole('button', { name: /try again/i })).toBeVisible()
  },
}

export const NotFound: Story = {
  args: {
    title: "This is not the food you're looking for.",
    body: 'It seems that there are no restaurants in this category yet.',
    buttonText: 'See all restaurants',
    image: <img alt="not found" src="https://via.placeholder.com/200" />,
    onButtonClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /not the food/i })).toBeVisible()
    await expect(canvas.getByRole('button', { name: /see all restaurants/i })).toBeVisible()
  },
}

export const ClickRetry: Story = {
  args: {
    title: 'Connection lost',
    body: 'Please check your internet connection and try again.',
    buttonText: 'Retry',
    image: <img alt="connection lost" src="https://via.placeholder.com/200" />,
    onButtonClick: fn(),
  },
  play: async ({ canvas, userEvent, args }) => {
    const button = canvas.getByRole('button', { name: /retry/i })
    await userEvent.click(button)
    await expect(args.onButtonClick).toHaveBeenCalledOnce()
  },
}
