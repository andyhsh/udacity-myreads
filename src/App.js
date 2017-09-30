import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'
import * as BooksAPI from './BooksAPI'
import ShelfContainer from './ShelfContainer'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(books => {
      this.setState({ books })
    })
  }
  
  handleUpdateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(response => {
        const books = [...this.state.books]

        // Check if the book is already on an existing shelf
        let bookExists = books.find(b => b.id === book.id)

        // Change shelf location if book exists
        if (bookExists) {
          bookExists.shelf = shelf      
          this.setState({ books })
        
          // Add book to shelf if book doesn't exist
        } else if (typeof bookExists === 'undefined') {
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
        {/* this.state.showSearchPage */}
        <Route exact path="/search" 
          render={() => 
            <Search 
              onCloseSearchPage={this.handleCloseSearchPage}
              onUpdateBook={this.handleUpdateBook}
              books={books} 
            />}
        />
        
        <Route exact path="/" 
          render={() => 
            <ShelfContainer
              onShowSearchPage={this.handleShowSearchPage}
              onUpdateBook={this.handleUpdateBook}
              books={books}
              currentlyReading={currentlyReading}
              wantToRead={wantToRead}
              read={read} 
            />}
        />
      </div>
    )
  }
}

export default BooksApp
