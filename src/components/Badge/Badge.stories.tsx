import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { Badge } from './Badge'

const meta = preview.meta({
  component: Badge,
  tags: ['ai-generated'],
})

export const Default = meta.story({
  args: {
    text: 'pizza',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('pizza')).toBeVisible()
  },
})

export const LongText = meta.story({
  args: {
    text: 'comfort-food',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('comfort-food')).toBeVisible()
  },
})

export const MultipleCategories = meta.story({
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Badge text="burgers" />
      <Badge text="sushi" />
      <Badge text="asian" />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('burgers')).toBeVisible()
    await expect(canvas.getByText('sushi')).toBeVisible()
    await expect(canvas.getByText('asian')).toBeVisible()
  },
})
