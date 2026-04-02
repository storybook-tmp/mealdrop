import type { Meta, StoryObj } from '@storybook/react-vite'

import { Body } from '../typography'

import { FooterCard } from './FooterCard'

const meta = {
  title: 'AI Generated/Medium/FooterCard',
  component: FooterCard,
  args: {
    title: 'Discover us',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Categories', href: '/categories' },
      { name: 'Instagram', href: 'https://instagram.com', external: true },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#363636', padding: '2rem', maxWidth: '20rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FooterCard>

export default meta

type Story = StoryObj<typeof meta>

export const WithLinks: Story = {}

export const WithCustomContent: Story = {
  args: {
    title: 'Check our apps',
    links: [],
    children: <Body color="#ffffff">Download the MealDrop app for quick reorders.</Body>,
  },
}
