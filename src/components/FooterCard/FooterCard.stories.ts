import type { Meta, StoryObj } from '@storybook/react-vite'

import { FooterCard } from './FooterCard'

const meta = {
  title: 'AI Generated/Medium/FooterCard',
  component: FooterCard,
  args: {
    title: 'Support',
    links: [
      { name: 'Browse restaurants', href: '/categories' },
      { name: 'Checkout', href: '/checkout' },
    ],
  },
} satisfies Meta<typeof FooterCard>

export default meta

type Story = StoryObj<typeof meta>

export const Links: Story = {}

export const WithCustomContent: Story = {
  args: {
    title: 'Contact',
    links: [{ name: 'Visit MealDrop', href: 'https://example.com', external: true }],
    children: 'Questions? Reach out to support@mealdrop.test',
  },
}
