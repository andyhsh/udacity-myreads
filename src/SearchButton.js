import React from 'react'

const SearchButton = ({onShowSearchPage}) => (
  <div className="open-search">
    <a onClick={() => onShowSearchPage()}>Add a book</a>
  </div>
)

export default SearchButton