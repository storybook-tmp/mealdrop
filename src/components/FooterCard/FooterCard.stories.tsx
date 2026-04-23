import { config } from '../../../.storybook/preview'

import { FooterCard } from './FooterCard'

const meta = config.meta({
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
})

export const WithLinks = meta.story()

export const WithCustomContent = meta.story({
  args: {
    title: 'Customer support',
    links: [],
    children: 'Available every day from 09:00 to 22:00.',
  },
})
