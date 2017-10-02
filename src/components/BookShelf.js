import React from 'react'
import PropTypes from 'prop-types'

import BooksGrid from './BooksGrid'

const BookShelf = ({ name, books, onUpdateBook, onRatingBook }) => {
  if (books.length === 0) {
    return null
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <BooksGrid 
          books={books} 
          onUpdateBook={onUpdateBook} 
          onRatingBook={onRatingBook} 
        />
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  name: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  onRatingBook: PropTypes.func.isRequired
}

export default BookShelf