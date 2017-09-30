import React from 'react'
import PropTypes from 'prop-types'

import BooksGrid from './BooksGrid'

class BookShelf extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const { name, books, onUpdateBook } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <BooksGrid books={books} onUpdateBook={onUpdateBook} />
        </div>
      </div>
    )
  }
}

export default BookShelf