import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Header from './Header'
import Search from './Search'
import BookShelf from './BookShelf'
import SearchButton from './SearchButton'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)

    this.handleSearch = this.handleSearch.bind(this)
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      books: []
    }
  }

  
  handleCloseSearchPage = () => this.setState({ showSearchPage: false})
  handleShowSearchPage = () => this.setState({ showSearchPage: true })

  handleSearch(searchValue) {
    if (searchValue === '') {
      return this.setState({ books: []})
    }
    // normalize search queries to be capitalised
    const query = searchValue[0].toUpperCase() + searchValue.slice(1)
    BooksAPI.search(query, 20)
      .then(results => {
        if (results.error === "empty query") {
          return
        }
        this.setState({ books: results })
      })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? 
        <Search
          onCloseSearchPage={this.handleCloseSearchPage}
          handleSearch={this.handleSearch}
          books={this.state.books} />
        : (
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              <div>
                <BookShelf name="Currently Reading" books={this.state.books} />
                <BookShelf name="Want to Read" books={this.state.books} />
                <BookShelf name="Read" books={this.state.books} />
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
