import { fn } from 'storybook/test'

import preview from '../../../.storybook/preview'

import { Select } from './Select'

const quantityOptions = [0, 1, 2, 3, 4, 5]

const meta = preview.meta({
  title: 'AI Generated/Medium/Select',
  component: Select,
  args: {
    id: 'quantity',
    label: 'Quantity',
    onChange: fn(),
    options: quantityOptions,
    value: 1,
  },
})

export const Default = meta.story()

export const SelectedMany = meta.story({
  args: {
    value: 4,
  },
})
