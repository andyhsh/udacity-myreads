import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import BooksGrid from './BooksGrid'
import * as BooksAPI from '../BooksAPI'
import { getSearchSuggestions } from '../searchTerms'

class Search extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    results: [],
    isSearching: false
  }

  handleSearch = (event) => {
    // Set input field value (controlled component)
    const searchValue = event.target.value
    this.setState({ query: searchValue })

    // normalize search queries to be capitalised
    const query = searchValue.trim().length > 0 ? searchValue[0].toUpperCase() + searchValue.slice(1) : ''
    if (query.length > 0) {

      // Set loading indicator
      this.setState({ isSearching: true })

      BooksAPI.search(query, 20)
        .then(results => {
          // if search query is valid, results will be set as a returned array of books
          // if an array is not returned, something as gone wrong => reset state
          if (Array.isArray(results)) {
            let books = [...this.props.books]

            // check if results are currently on bookshelf and add shelf to results if so
            results.forEach( book => {
              let bookShelved = books.find(b => b.id === book.id)
              if (bookShelved) book.shelf = bookShelved.shelf
            })

            this.setState({ results, isSearching: false })

          } else {
            this.setState({ results: [], isSearching: false })
          }
        })
    } else {
      this.setState({ results: [] })
    }
  }

  render() {
    const { onUpdateBook } = this.props
    const { query, results, isSearching } = this.state
    const suggestions = getSearchSuggestions()    

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleSearch}
              value={query} />
          </div>
        </div>
        <div className="search-books-results">

          {/* If there is a query and results are returned, render BooksGrid */}       
          { !!results.length &&
            !!query.length && ( 
            <BooksGrid 
              books={results} 
              isSearching={isSearching} 
              onUpdateBook={onUpdateBook}
            />
          )}

          {/* If there is a query and no results are returned, render the following */}
          { !!query.length &&
            !results.length &&
            !isSearching && (
              <div>
                No results found for <span className="no-results-found">"{query}"</span>. Try searching for <span className="no-results-found">"{suggestions[0]}"</span> or <span className="no-results-found">"{suggestions[1]}"</span> instead.
              </div>
          )}

        </div>
      </div>
    )
  }
}

export default Search