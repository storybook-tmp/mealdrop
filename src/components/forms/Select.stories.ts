import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta = {
  title: 'AI Generated/Medium/Select',
  component: Select,
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Category',
    options: ['Pizza', 'Pasta', 'Salad', 'Dessert'],
    value: 'Pizza',
  },
}

export const Empty: Story = {
  args: {
    label: 'Select an option',
    options: ['Option 1', 'Option 2', 'Option 3'],
    value: '',
  },
}
