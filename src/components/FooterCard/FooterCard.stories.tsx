import type { Meta, StoryObj } from '@storybook/react-vite'

import { Body } from '../typography/Body'
import { FooterCard } from './FooterCard'

const meta = {
  title: 'AI Generated/Medium/FooterCard',
  component: FooterCard,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Support',
    links: [
      { name: 'FAQ', href: '/categories' },
      { name: 'Contact', href: '/checkout' },
    ],
  },
  render: (args) => (
    <div
      style={{
        background: '#2C2C2C',
        borderRadius: '8px',
        padding: '24px',
        width: '320px',
      }}
    >
      <FooterCard {...args} />
    </div>
  ),
} satisfies Meta<typeof FooterCard>

export default meta

type Story = StoryObj<typeof meta>

export const WithInternalLinks: Story = {}

export const WithExternalLinkAndCopy: Story = {
  args: {
    title: 'Company',
    links: [{ name: 'Design system', href: 'https://storybook.js.org', external: true }],
  },
  render: (args) => (
    <div
      style={{
        background: '#2C2C2C',
        borderRadius: '8px',
        padding: '24px',
        width: '320px',
      }}
    >
      <FooterCard {...args}>
        <Body>Open daily from 10:00 to 22:00.</Body>
      </FooterCard>
    </div>
  ),
}
