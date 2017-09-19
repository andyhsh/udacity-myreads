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
  
  handleCloseSearchPage = () => this.setState({ showSearchPage: false})
  handleShowSearchPage = () => this.setState({ showSearchPage: true })

  handleUpdateBook(book, shelf) {
    BooksAPI.update(book.id)
      .then(response => {
        console.log(response)
      })
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        {this.state.showSearchPage ? 
        <Search onCloseSearchPage={this.handleCloseSearchPage} />
        : (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <div>
                {/* {books && <BookShelf name="Currently Reading" books={books} />}
                {books && <BookShelf name="Want to Read" books={books} />}
                {books && <BookShelf name="Read" books={books} />} */}
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
