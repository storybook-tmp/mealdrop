import { fn } from 'storybook/test'

import preview from '../../../.storybook/preview'

import { Input } from './Input'

const meta = preview.meta({
  title: 'AI Generated/Medium/Input',
  component: Input,
  args: {
    id: 'email',
    label: 'Email',
    name: 'email',
    onChange: fn(),
    placeholder: 'name@example.com',
    value: '',
  },
})

export const Empty = meta.story()

export const WithError = meta.story({
  args: {
    error: 'Please enter a valid email address',
    value: 'mealdrop',
  },
})
