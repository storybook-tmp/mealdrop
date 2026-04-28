import preview from '#.storybook/preview'
import { expect, waitFor } from 'storybook/test'

import { HomePage } from './HomePage'

const meta = preview.meta({
  component: HomePage,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
})

export const Default = meta.story({
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Burger Palace')).toBeVisible()
      },
      { timeout: 5000 }
    )
  },
})
