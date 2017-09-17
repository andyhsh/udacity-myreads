/**
 * BooksAPI.js taken from https://github.com/udacity/reactnd-project-myreads-starter
 */ 

 // BooksAPI endpoint
const api = "https://reactnd-books-api.udacity.com"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/**
 * Fetch a particular book by ID
 * @param {String} bookId - id of the book to fetch
 * @return {Object} - promise which resolves to a JSON object containing the book
 */
export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

/**
 * Fetch all books on a user's shelf
 * @return {Object} - promise which resolves to a JSON object containing all the books on shelf
 */
export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)

/**
 * Update a book's shelf 
 * @param {Object} book - the book to update 
 * @param {String} shelf - the shelf to place on
 * @return {Object} - a promise which resolves to a JSON object containing the book
 */
export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

/**
 * Search for books
 * @param {String} query - the term to search for
 * @param {Number} maxResults - the maximum number of results returned, capped at 20
 * @return {Object} - a promise which resolves to a JSON object containing an array of books
 */
export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)
