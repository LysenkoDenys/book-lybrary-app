import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import {
  selectTitleFilter,
  selectAuthorFilter,
} from "../../redux/slices/filterSlice";
import "./BookList.css";

const BookList = () => {
  const books = useSelector((state) => state.books);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const dispatch = useDispatch();

  const handleDeleteBook = (id) => dispatch(deleteBook(id));
  const handleToggleFavoriteBook = (id) => dispatch(toggleFavorite(id));

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    //my solution:
    // if (matchesTitle && !matchesAuthor) {
    //   return matchesAuthor;
    // }
    // return matchesTitle;
    //Bogdan`s solution:
    return matchesTitle && matchesAuthor;
  });

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, index) => {
            return (
              <li key={book.id}>
                <div className="book-nfo">
                  {++index}. {book.title} by <strong>{book.author}</strong>
                </div>
                <div className="book-actions">
                  <span onClick={() => handleToggleFavoriteBook(book.id)}>
                    {book.isFavorite ? (
                      <BsBookmarkStarFill className="star-icon" />
                    ) : (
                      <BsBookmarkStar className="star-icon" />
                    )}
                  </span>
                  <button onClick={() => handleDeleteBook(book.id)}>
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookList;
