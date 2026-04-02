import { config } from '../../../.storybook/preview'

import { Input } from './Input'

const meta = config.meta({
  title: 'AI Generated/Medium/Input',
  component: Input,
  args: {
    id: 'email',
    label: 'Email',
    name: 'email',
    placeholder: 'email address',
    value: '',
    onChange: () => {},
  },
})

export const Empty = meta.story()

export const WithError = meta.story({
  args: {
    value: 'invalid',
    error: 'Please enter a valid email address',
  },
})
