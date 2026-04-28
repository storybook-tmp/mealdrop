import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { CategoryListPage } from './CategoryListPage'

const meta = preview.meta({
  component: CategoryListPage,
  tags: ['ai-generated'],
})

export const Default = meta.story({
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /on the menu/i })).toBeVisible()
    // Verify category items are rendered
    await expect(canvas.getByTestId('Pizza')).toBeVisible()
    await expect(canvas.getByTestId('Burgers')).toBeVisible()
  },
})
