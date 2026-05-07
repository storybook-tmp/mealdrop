import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Select } from './Select'

const QuantitySelect = () => {
  const [value, setValue] = useState(1)

  return (
    <Select
      id="quantity"
      label="Quantity"
      options={[1, 2, 3, 4]}
      value={value}
      onChange={(next: any) => setValue(Number(next))}
    />
  )
}

const meta = {
  component: Select,
  tags: ['ai-generated'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Quantity: Story = {
  args: {
    options: [],
  },
  render: () => <QuantitySelect />,
  play: async ({ canvas, userEvent }) => {
    const select = canvas.getByLabelText(/quantity/i)
    await userEvent.selectOptions(select, '3')
    await expect(select).toHaveValue('3')
  },
}

export const Preselected: Story = {
  args: {
    id: 'partySize',
    label: 'Party size',
    options: [2, 4, 6, 8],
    value: 4,
    onChange: () => {},
  },
}

export const Compact: Story = {
  args: {
    options: [1, 2],
    value: 1,
    onChange: () => {},
    'aria-label': 'compact quantity',
  },
}
