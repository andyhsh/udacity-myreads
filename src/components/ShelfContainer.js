import React from 'react'

import Header from './Header'
import BookShelf from './BookShelf'
import SearchButton from './SearchButton'
import PropTypes from 'prop-types'

const ShelfContainer = ({ currentlyReading, wantToRead, read, onUpdateBook, onRatingBook }) => (
  <div className="list-books">
    <Header>MyReads</Header>
    <div className="list-books-content">
      <div>
        <BookShelf 
          name="Currently Reading" 
          books={currentlyReading} 
          onUpdateBook={onUpdateBook}
          onRatingBook={onRatingBook}
        />
        <BookShelf 
          name="Want to Read" 
          books={wantToRead} 
          onUpdateBook={onUpdateBook}
          onRatingBook={onRatingBook}
        />
        <BookShelf 
          name="Read" 
          books={read} 
          onUpdateBook={onUpdateBook}
          onRatingBook={onRatingBook}
        />
      </div>
    </div>
    <SearchButton />
  </div>
)

ShelfContainer.propTypes = {
  currentlyReading: PropTypes.array.isRequired,
  wantToRead: PropTypes.array.isRequired,
  read: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  onRatingBook: PropTypes.func.isRequired
}

export default ShelfContainer