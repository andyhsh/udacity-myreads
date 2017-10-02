import React from 'react'
import { Route } from 'react-router-dom'

import '../App.css'
import * as BooksAPI from '../utils/BooksAPI'
import ShelfContainer from './ShelfContainer'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  //TODO: get userRatings data from localStorage and map to the books retrieved
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
          const updatedBooks = [...books, book]
          this.setState({ books: updatedBooks })
        } 
      })
  }

  //TODO: save ratings to localStorage
  //Question: Function does not properly render the ratings for the search page on books that are already on the shelf until you go back to the shelf page. But books that are not on the shelf render the ratings properly when rated. Not sure why?
  handleRatingBook = (book, userRating) => {
    const books = [...this.state.books]
    let bookExists = books.find(b => b.id === book.id)
    if (bookExists) {
      bookExists.userRating = userRating
      this.setState({ books })
    }
    else if (typeof bookExists ==='undefined') {
      book.userRating = userRating
      const updatedBooks = [...books, book]
      this.setState({ books: updatedBooks })
    }
  }

  render() {
    const { books } = this.state

    // sort books by shelves
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
    const wantToRead = books.filter(book => book.shelf === 'wantToRead')
    const read = books.filter(book => book.shelf === 'read')

    return (
      <div className="app">
        <Route exact path="/search" 
          render={() => 
            <Search 
              onCloseSearchPage={this.handleCloseSearchPage}
              onUpdateBook={this.handleUpdateBook}
              onRatingBook={this.handleRatingBook}
              books={books} 
            />}
        />
        
        <Route exact path="/" 
          render={() => 
            <ShelfContainer
              onShowSearchPage={this.handleShowSearchPage}
              onUpdateBook={this.handleUpdateBook}
              onRatingBook={this.handleRatingBook}
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
