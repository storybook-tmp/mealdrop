import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'
import { Body } from '../typography'
import { RestaurantCard } from './RestaurantCard'

const meta = {
  component: RestaurantCard,
} satisfies Meta<typeof RestaurantCard>

export default meta

type Story = StoryObj<typeof meta>

const burgerKingdom = restaurantsCompleteData[0]
const kuyltje = restaurantsCompleteData[3]
const oliewinkel = restaurantsCompleteData[2]

export const Default: Story = {
  args: burgerKingdom,
  render: function Render() {
    const [clickedRestaurant, setClickedRestaurant] = useState('Selected: nothing')

    return (
      <div style={{ display: 'grid', gap: '16px', maxWidth: '420px' }}>
        <RestaurantCard
          {...burgerKingdom}
          onClick={() => setClickedRestaurant(`Selected: ${burgerKingdom.name}`)}
        />
        <Body type="span">{clickedRestaurant}</Body>
      </div>
    )
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible()
    await expect(canvas.getByText('★ 4.2 Very good')).toBeVisible()
    await expect(canvas.getByText('burgers')).toBeVisible()
    await userEvent.click(canvas.getByTestId('restaurant-card'))
    await expect(canvas.getByText('Selected: Burger Kingdom')).toBeVisible()
  },
}

export const NewRestaurant: Story = {
  args: kuyltje,
  render: () => (
    <div style={{ maxWidth: '420px' }}>
      <RestaurantCard {...kuyltje} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("'t Kuyltje")).toBeVisible()
    await expect(canvas.getByText('new')).toBeVisible()
    await expect(canvas.getByText('comfort food')).toBeVisible()
  },
}

export const ClosedRestaurant: Story = {
  args: oliewinkel,
  render: function Render() {
    const [clickedRestaurant, setClickedRestaurant] = useState('Still closed')

    return (
      <div style={{ display: 'grid', gap: '16px', maxWidth: '420px' }}>
        <RestaurantCard {...oliewinkel} onClick={() => setClickedRestaurant(oliewinkel.name)} />
        <Body type="span">{clickedRestaurant}</Body>
      </div>
    )
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('De Oliewinkel')).toBeVisible()
    await expect(canvas.getByText('This restaurant is closed.')).toBeVisible()
    await userEvent.click(canvas.getByTestId('restaurant-card'))
    await expect(canvas.getByText('Still closed')).toBeVisible()
  },
}
