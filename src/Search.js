import React from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

class Search extends React.Component {
  state = {
    query: ''
  }

  // reset search page
  componentDidMount() {
    this.props.handleSearch('')
  }

  // pass search query to main container to handle
  onSearch = (e) => {
    const searchValue = e.target.value
    this.setState({ query: searchValue })
    this.props.handleSearch(searchValue)
  }

  render() {
    const { onCloseSearchPage, books} = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => onCloseSearchPage()}>Close</a>
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
              onChange={this.onSearch}
              value={this.state.query} />
          </div>
        </div>
        <div className="search-books-results">
          {books && <BooksGrid books={books} />}
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  books: PropTypes.array,
  onCloseSearchPage: PropTypes.func.isRequired
}

export default Search