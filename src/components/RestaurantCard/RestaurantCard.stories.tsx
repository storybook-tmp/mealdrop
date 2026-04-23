import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  title: 'Components/RestaurantCard',
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Italian Kitchen',
    specialty: 'Authentic Italian cuisine with fresh ingredients',
    photoUrl: 'https://via.placeholder.com/500x200',
    rating: 4.5,
    categories: ['Italian', 'Pizza'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Italian Kitchen');
    await expect(heading).toBeInTheDocument();
    const image = canvas.getByAltText('restaurant');
    await expect(image).toBeInTheDocument();
  },
};

export const WithRating: Story = {
  args: {
    name: 'Burger Paradise',
    specialty: 'Classic American burgers and fries',
    photoUrl: 'https://via.placeholder.com/500x200',
    rating: 4.8,
    categories: ['Burgers', 'American'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Burger Paradise');
    await expect(heading).toBeInTheDocument();
  },
};

export const New: Story = {
  args: {
    name: 'Sushi Express',
    specialty: 'Fresh sushi and Japanese dishes',
    photoUrl: 'https://via.placeholder.com/500x200',
    rating: 4.2,
    isNew: true,
    categories: ['Sushi', 'Japanese'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const newTag = canvas.getByText('new');
    await expect(newTag).toBeInTheDocument();
  },
};

export const Closed: Story = {
  args: {
    name: 'Closed Restaurant',
    specialty: 'This restaurant is temporarily closed',
    photoUrl: 'https://via.placeholder.com/500x200',
    isClosed: true,
    categories: ['Closed'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const closedText = canvas.getByText('This restaurant is closed.');
    await expect(closedText).toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: {
    name: '',
    specialty: '',
    photoUrl: '',
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loading = canvas.getByTestId('loading');
    await expect(loading).toBeInTheDocument();
  },
};

export const Interactive: Story = {
  args: {
    name: 'Interactive Restaurant',
    specialty: 'Click to view details',
    photoUrl: 'https://via.placeholder.com/500x200',
    rating: 4.0,
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByTestId('restaurant-card');
    await expect(card).toBeInTheDocument();
    await userEvent.click(card);
  },
};
