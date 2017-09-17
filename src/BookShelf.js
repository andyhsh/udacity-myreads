import React from 'react'
import BooksGrid from './BooksGrid'

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <BooksGrid books={this.props.books} />
        </div>
      </div>
    )
  }
}

export default BookShelf