import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  });
  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>...loading</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      {genre && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setGenre("refactoring")}>refactoring</button>
      <button onClick={() => setGenre("agile")}>agile</button>
      <button onClick={() => setGenre("patterns")}>patterns</button>
      <button onClick={() => setGenre("design")}>design</button>
      <button onClick={() => setGenre("crime")}>crime</button>
      <button onClick={() => setGenre("classic")}>classic</button>
      <button onClick={() => setGenre("revolution")}>revolution</button>
      <button onClick={() => setGenre(null)}>allBooks</button>
    </div>
  );
};

export default Books;
