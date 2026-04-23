import type { Meta, StoryObj } from '@storybook/react-vite'

import { CategoryDetailPage } from './CategoryDetailPage'

const meta = {
  component: CategoryDetailPage,
} satisfies Meta<typeof CategoryDetailPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    route: {
      entry: '/categories/pizza',
      path: '/categories/:id',
    },
  },
  render: () => <CategoryDetailPage />,
}
