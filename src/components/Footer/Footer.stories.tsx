import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { Footer } from './Footer'

const meta = preview.meta({
  component: Footer,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
})

export const Default = meta.story({
  render: () => <Footer />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Discover us')).toBeVisible()
    await expect(canvas.getByText('Our social media')).toBeVisible()
    await expect(canvas.getByText('Check our apps')).toBeVisible()
  },
})

export const WithNavLinks = meta.story({
  render: () => <Footer />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Home')).toBeVisible()
    await expect(canvas.getByText('Categories')).toBeVisible()
    await expect(canvas.getByText('About')).toBeVisible()
  },
})

export const WithSocialLinks = meta.story({
  render: () => <Footer />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Facebook')).toBeVisible()
    await expect(canvas.getByText('Instagram')).toBeVisible()
    await expect(canvas.getByText('Twitter')).toBeVisible()
  },
})
