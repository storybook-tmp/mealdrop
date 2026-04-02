import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta = {
  title: 'AI Generated/Medium/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Cuisine Type',
    options: ['Italian', 'Japanese', 'Mexican', 'Indian'],
    value: 'Italian',
  },
}

export const LargeOptions: Story = {
  args: {
    label: 'Restaurant',
    options: [
      'Pasta House',
      'Sushi Palace',
      'Taco Bell',
      'Curry House',
      'Pizza King',
      'Burger World',
    ],
    value: 'Pasta House',
  },
}

export const Empty: Story = {
  args: {
    label: 'Select an option',
    options: ['Option 1', 'Option 2', 'Option 3'],
    value: '',
  },
}
