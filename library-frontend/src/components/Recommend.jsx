import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommend = ({ show, genre }) => {
  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  });

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>...loading</div>;
  }

  const books = data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <b>{genre}</b>
      </p>
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
    </div>
  );
};

export default Recommend;
