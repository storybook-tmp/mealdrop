import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { ErrorBlock } from './ErrorBlock'

const meta = {
  component: ErrorBlock,
  tags: ['ai-generated'],
  args: {
    title: 'Something went wrong',
    body: 'We could not load the content. Please try again.',
    buttonText: 'Retry',
    image: <img alt="error" src="https://placehold.co/200x200" />,
    onButtonClick: fn(),
  },
} satisfies Meta<typeof ErrorBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Something went wrong')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /retry/i })).toBeVisible()
  },
}

export const NotFound: Story = {
  args: {
    title: "This is not the food you're looking for.",
    body: 'It seems that there are no restaurants in this category yet.',
    buttonText: 'See all restaurants',
  },
}
