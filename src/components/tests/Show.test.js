import React from 'react'
import { render, fireEvent, screen, userEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Show from './../Show'

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

test('renders without errors', () => {
  render(<Show show={testShow} selectedSeason={'none'} />)
})

test('renders Loading component when prop show is null', () => {
  render(<Show show={null} />)
  const loading = screen.queryByTestId('loading-container')
  expect(loading).toBeInTheDocument
})

test('renders same number of options seasons are passed in', () => {
  render(<Show show={testShow} selectedSeason={'none'} />)
  const showOpt = screen.queryAllByTestId('season-option')
  expect(showOpt).toHaveLength(4)
})

test('handleSelect is called when an season is selected', () => {
  const handleSelect = jest.fn()
  render(
    <Show show={testShow} selectedSeason={'none'} handleSelect={handleSelect} />
  )
  const select = screen.getByLabelText(/Select A Season/i)
  userEvent.selectOptions(select, ['1'])
  expect(handleSelect).toBeCalled()
})

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  const { rerender } = render(<Show show={testShow} selectedSeason={'none'} />)
  let episodes = screen.queryByTestId('episodes-container')
  expect(episodes).not.toBeInTheDocument()

  rerender(<Show show={testShow} selectedSeason={1} />)
  episodes = screen.queryByTestId('episodes-container')
  expect(episodes).toBeInTheDocument()
})
