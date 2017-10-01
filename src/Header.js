import React from 'react'

const Header = (props) => (
  <div className="list-books-title">
    <h1>{props.children}</h1>
  </div>
)

export default Header