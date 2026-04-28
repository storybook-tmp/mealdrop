import preview from '#.storybook/preview'
import { expect, waitFor } from 'storybook/test'

import { HomePage } from './HomePage'

const meta = preview.meta({
  component: HomePage,
  tags: ['ai-generated'],
})

export const Default = meta.story({
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    // Wait for the restaurant data to load from MSW
    await waitFor(
      () => {
        expect(canvas.getByText('Our favorite picks')).toBeVisible()
      },
      { timeout: 5000 }
    )
  },
})
