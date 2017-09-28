import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Header from './Header'
import Search from './Search'
import BookShelf from './BookShelf'
import SearchButton from './SearchButton'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(books => {
      this.setState({ books })
    })
  }
  
  handleCloseSearchPage = () => this.setState({ showSearchPage: false})
  handleShowSearchPage = () => this.setState({ showSearchPage: true })

  handleUpdateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(response => {
        const books = [...this.state.books]

        // Check if the book is already on an existing shelf
        let bookExists = books.find(b => b.id === book.id)

        if (bookExists) {
          bookExists.shelf = shelf      
          this.setState({ books })
        
        } else if (typeof bookExists !== 'undefined') {
          book.shelf = shelf
          let updatedBooks = [...books, book]
          this.setState({ books: updatedBooks })
        } 
      })
  }

  render() {
    const { books } = this.state

    // sort books by shelves
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = books.filter(book => book.shelf === 'wantToRead')
    const read = books.filter(book => book.shelf === 'read')

    return (
      <div className="app">
        {this.state.showSearchPage ? 
        <Search 
          onCloseSearchPage={this.handleCloseSearchPage}
          onUpdateBook={this.handleUpdateBook}
          books={books} />
        : (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <div>
                <BookShelf 
                  name="Currently Reading" 
                  books={currentlyReading} 
                  onUpdateBook={this.handleUpdateBook}
                />
                <BookShelf 
                  name="Want to Read" 
                  books={wantToRead} 
                  onUpdateBook={this.handleUpdateBook}
                />
                <BookShelf 
                  name="Read" 
                  books={read} 
                  onUpdateBook={this.handleUpdateBook} 
                />
              </div>
            </div>
            <SearchButton onShowSearchPage={this.handleShowSearchPage} />
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
