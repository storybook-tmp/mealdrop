import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import styled from 'styled-components'

import sushi from '../../assets/images/sushi.svg'

import { ErrorBlock } from './ErrorBlock'

const Frame = styled.div`
  padding: 2rem;
`

const meta = {
  component: ErrorBlock,
  args: {
    title: 'Something went wrong!',
    body: 'Our bad, something went wrong on our side.',
    image: <img alt="temporary error" src={sushi} />,
    buttonText: 'Try again',
    onButtonClick: () => {},
  },
} satisfies Meta<typeof ErrorBlock>

export default meta

type Story = StoryObj<typeof meta>

export const EmptyCategory: Story = {
  render: () => (
    <Frame>
      <ErrorBlock
        body="It seems that there are no restaurants in this category yet. Try to come back later?"
        title="This is not the food you're looking for."
        image={<img alt="no restaurants found" src={sushi} />}
        buttonText="See all restaurants"
        onButtonClick={() => {}}
      />
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('heading', { name: "This is not the food you're looking for." })
    ).toBeVisible()
    await expect(canvas.getByAltText('no restaurants found')).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'See all restaurants' })).toBeVisible()
  },
}

export const ServerError: Story = {
  render: () => (
    <Frame>
      <ErrorBlock
        title="Something went wrong!"
        body="Our bad, something went wrong on our side."
        image={<img alt="temporary error" src={sushi} />}
        buttonText="Try again"
        onButtonClick={() => {}}
      />
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const retryButton = canvas.getByRole('button', { name: 'Try again' })

    await expect(canvas.getByText('Our bad, something went wrong on our side.')).toBeVisible()
    await userEvent.click(retryButton)
    await expect(retryButton).toBeEnabled()
  },
}

export const NotFound: Story = {
  render: () => (
    <Frame>
      <ErrorBlock
        title="We can't find this page"
        body="This page doesn’t exist, keep looking."
        image={<img alt="missing page" src={sushi} />}
        buttonText="Home"
        onButtonClick={() => {}}
      />
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByRole('heading', { name: "We can't find this page" })).toBeVisible()
    await expect(canvas.getByText('This page doesn’t exist, keep looking.')).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Home' })).toBeVisible()
  },
}
