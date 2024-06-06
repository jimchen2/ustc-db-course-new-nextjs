interface AuthorFormProps {
  index: number;
  author: {
    id: string;
    isCorrespondingAuthor: boolean;
    ranking: number;
  };
  handleAuthorChange: (index: number, field: string, value: any) => void;
  handleRemoveAuthor: (index: number) => void; // Add this prop
}

const AuthorForm = ({ index, author, handleAuthorChange, handleRemoveAuthor }: AuthorFormProps) => {
  return (
    <div>
      <label>
        Author ID:
        <input
          type="text"
          value={author.id}
          onChange={(e) =>
            handleAuthorChange(index, "id", e.target.value)
          }
        />
      </label>
      <label>
        Corresponding Author:
        <input
          type="checkbox"
          checked={author.isCorrespondingAuthor}
          onChange={(e) =>
            handleAuthorChange(
              index,
              "isCorrespondingAuthor",
              e.target.checked
            )
          }
        />
      </label>
      <label>
        Ranking:
        <input
          type="number"
          value={author.ranking}
          onChange={(e) =>
            handleAuthorChange(index, "ranking", parseInt(e.target.value))
          }
        />
      </label>
      <button onClick={() => handleRemoveAuthor(index)}>Remove Author</button>
    </div>
  );
};

export default AuthorForm;
