import React from 'react'
import preview from '#.storybook/preview'
import { expect, fn } from 'storybook/test'

import { ErrorBlock } from './ErrorBlock'

const meta = preview.meta({
  component: ErrorBlock,
  tags: ['ai-generated'],
})

export const Default = meta.story({
  args: {
    title: 'Something went wrong!',
    body: 'Our bad, something went wrong on our side.',
    image: React.createElement('img', {
      alt: 'error illustration',
      src: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=100',
      style: { width: 200 },
    }),
    buttonText: 'Try again',
    onButtonClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Something went wrong!')).toBeVisible()
    await expect(canvas.getByText('Our bad, something went wrong on our side.')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /try again/i })).toBeVisible()
  },
})

export const NotFound = meta.story({
  args: {
    title: "We can't find this page",
    body: "This page doesn't exist, keep looking.",
    image: React.createElement('img', {
      alt: 'not found',
      src: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=100',
      style: { width: 200 },
    }),
    buttonText: 'Home',
    onButtonClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("We can't find this page")).toBeVisible()
    await expect(canvas.getByRole('button', { name: /home/i })).toBeVisible()
  },
})

export const EmptyCategory = meta.story({
  args: {
    title: "This is not the food you're looking for.",
    body: 'It seems that there are no restaurants in this category yet. Try to come back later?',
    image: React.createElement('img', {
      alt: 'no restaurants',
      src: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=100',
      style: { width: 200 },
    }),
    buttonText: 'See all restaurants',
    onButtonClick: fn(),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("This is not the food you're looking for.")).toBeVisible()
    await expect(canvas.getByRole('button', { name: /see all restaurants/i })).toBeVisible()
  },
})
