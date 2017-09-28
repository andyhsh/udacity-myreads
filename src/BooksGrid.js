import React from 'react'
import PropTypes from 'prop-types'

class BooksGrid extends React.Component {

  static propTypes = {
    books: PropTypes.array,  
    isSearching: PropTypes.bool,
    onUpdateBook: PropTypes.func.isRequired  
  }

  renderAuthors(authors) {
    if (authors.length === 1) {
      return authors
    } else {
      return `${authors[0]}, et al.`
    }
  }

  handleChangeShelf(shelf, book) {
    this.props.onUpdateBook(book, shelf)
  }

  render() {
    const { books, isSearching } = this.props

    if (isSearching) {
      return <div>Loading...</div>
    }
    
    return (
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail}` }}></div>
                <div className="book-shelf-changer">
                  <select value={book.hasOwnProperty('shelf') ? book.shelf : "none"} onChange={(e) => this.handleChangeShelf(e.target.value, book)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors ? this.renderAuthors(book.authors) : null}</div>
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default BooksGrid