import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Display from './../Display'
import fetchShow from './../../api/fetchShow'
jest.mock('./../../api/fetchShow')

const testShow = {
  name: 'test',
  summary: 'test summart',
  seasons: [
    {
      id: 0,
      name: 'Season 1',
      episodes: [],
    },
    {
      id: 1,
      name: 'Season 2',
      episodes: [],
    },
    {
      id: 2,
      name: 'Season 3',
      episodes: [],
    },
    {
      id: 3,
      name: 'Season 4',
      episodes: [],
    },
  ],
}

test('renders without errors with no props', async () => {
  render(<Display />)
})

test('renders Show component when the button is clicked ', async () => {
  fetchShow.mockResolvedValueOnce(testShow)
  render(<Display />)
  const button = screen.getByRole('button')
  fireEvent.click(button)

  const show = await screen.findByTestId('show-container')
  expect(show).toBeInTheDocument
})

test('renders show season options matching your data when the button is clicked', async () => {
  fetchShow.mockResolvedValueOnce(testShow)
  render(<Display />)
  const button = screen.getByRole('button')
  fireEvent.click(button)

  await waitFor(() => {
    const seasonOpt = screen.queryAllByTestId('season-option')
    expect(seasonOpt).toHaveLength(4)
  })
})

test('displayFunc is called when the fetch button is pressed', async () => {
  fetchShow.mockResolvedValueOnce(testShow)
  const displayFunc = jest.fn()
  render(<Display displayFunc={displayFunc} />)
  const button = screen.getByRole('button')
  fireEvent.click(button)

  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled()
  })
})
