import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BORNYEAR } from "../queries";

const Authors = ({ show }) => {
  const [name, setName] = useState("");
  const [bornYear, setBornYear] = useState("");

  const [editBorn] = useMutation(EDIT_BORNYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const update = async (e) => {
    e.preventDefault();

    editBorn({
      variables: { name, born: parseFloat(bornYear) },
    });
  };

  const result = useQuery(ALL_AUTHORS);
  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>...loading</div>;
  }
  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>set birthyear</h2>
      <form onSubmit={update}>
        <select
          name="selectAuthor"
          onChange={({ target }) => setName(target.value)}
        >
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          born{" "}
          <input
            type="text"
            value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
