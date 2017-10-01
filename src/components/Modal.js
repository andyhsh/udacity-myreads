import React from 'react'
import PropTypes from 'prop-types'

// Question for reviewer: can't get modal styling right. When in ShelfContainer, grey background overlay doesn't stretch all the way to the bottom. And content overflows through the top and bottom of the screen if there is too much content inside.

// Question for reviewer: If I want to make my Modal component reusable anywhere, not just for displaying books, how would I go about refactoring this component?

const Modal = ({ isOpen, content, onCloseModal }) => {
  const { authors } = content

  if (!isOpen) {
    return null
  }

  const authorList = authors.length === 1 ? authors[0] : authors.join(', ')    

  return (
    <div>
      <div className="modal-box">
        <div className="modal-content">
          <h1>{content.title}</h1>
          <p className="modal-author">{authorList}</p>
          <p className="modal-description">{content.description ? content.description : "No description available."}</p>
          <div className="modal-close-button" onClick={onCloseModal}>Close</div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onCloseModal} />
    </div>
  )
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired  
}

export default Modal