import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Header, HeaderComponent } from './Header'

const meta = {
  title: 'AI Generated/Complex/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Sticky: Story = {
  args: {
    sticky: true,
  },
}

export const LogoOnly: Story = {
  render: () => (
    <HeaderComponent
      logoOnly={true}
      isCartVisible={false}
      cartItems={[]}
      totalPrice={0}
      toggleCartVisibility={() => {}}
      goToCheckout={() => {}}
      saveItem={() => {}}
    />
  ),
}
