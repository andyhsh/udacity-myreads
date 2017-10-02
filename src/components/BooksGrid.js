import React from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'

class BooksGrid extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,  
    isSearching: PropTypes.bool,
    onUpdateBook: PropTypes.func.isRequired,
    onRatingBook: PropTypes.func.isRequired
  }

  state = {
    openModal: false,
    modalContent: {}
  }

  renderAuthors(authors) {
    if (authors.length === 1) {
      return authors
    } else {
      return `${authors[0]}, et al.`
    }
  }

  //Question: there should be a much more efficient way to handle rendering the ratings? Feels like I'm really duplicating a lot of the code here.
  renderRating(book) {
    const { userRating } = book
    const { onRatingBook } = this.props
    return (
      <div className="book-rating">
        <i onClick={() => onRatingBook(book, 1)} className={userRating >= 1 ? "fa fa-star" : "fa fa-star-o"} aria-hidden="true" />
        <i onClick={() => onRatingBook(book, 2)} className={userRating >= 2 ? "fa fa-star" : "fa fa-star-o"} aria-hidden="true" />
        <i onClick={() => onRatingBook(book, 3)} className={userRating >= 3 ? "fa fa-star" : "fa fa-star-o"} aria-hidden="true" />
        <i onClick={() => onRatingBook(book, 4)} className={userRating >= 4 ? "fa fa-star" : "fa fa-star-o"} aria-hidden="true" />
        <i onClick={() => onRatingBook(book, 5)} className={userRating === 5 ? "fa fa-star" : "fa fa-star-o"} aria-hidden="true" />
      </div>
    )
  }

  handleOpenModal = (book) => {
    this.setState({ openModal: true, modalContent: book })
  }

  handleCloseModal = () => {
    this.setState({ openModal: false, modalContent: {} })
  }

  handleChangeShelf(shelf, book) {
    this.props.onUpdateBook(book, shelf)
  }

  render() {
    const { books, isSearching } = this.props
    const { openModal, modalContent } = this.state

    if (isSearching) {
      return <div>Loading...</div>
    }
    
    return (
      <ol className="books-grid">

        <Modal isOpen={openModal} onCloseModal={this.handleCloseModal} content={modalContent} />

        {books.map(book => {
          const thumbnail = book && book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'

          return (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" 
                  style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail}`, backgroundSize: 'cover' }}
                  onClick={() => this.handleOpenModal(book)} 
                />
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
              {this.renderRating(book)}
            </div>
          </li>
        )}
        )}
      </ol>
    )
  }
}

export default BooksGrid