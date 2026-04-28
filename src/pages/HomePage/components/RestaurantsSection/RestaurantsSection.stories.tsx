import type { Meta, StoryObj } from '@storybook/react-vite'
import { http, HttpResponse } from 'msw'
import { expect } from 'storybook/test'

import { BASE_URL } from '../../../../api'

import { RestaurantsSection } from './RestaurantsSection'

const meta = {
  component: RestaurantsSection,
  tags: ['ai-generated'],
  args: { title: 'Our favorite picks' },
} satisfies Meta<typeof RestaurantsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('Burger Kingdom')).toBeVisible()
  },
}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(BASE_URL, async () => {
          await new Promise((resolve) => setTimeout(resolve, 30000))
          return HttpResponse.json([])
        }),
      ],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(BASE_URL, () => new HttpResponse(null, { status: 500 })),
      ],
    },
  },
}
