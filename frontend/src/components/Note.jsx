import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const Note = ({ note, goal, action, user }) => {
  const deleteNote = async (id) => {
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();

    if (data.statusCode === 200) {
      goal.notes = goal.notes.filter((t) => t._id !== id);
      action(goal);
    }
  };

  return (
    <div className="w-100 px-2 py-1 d-flex justify-content-between">
      <p className="mb-0 fw-bold" style={{ fontSize: "14px" }}>
        {note.text}
      </p>

      <div className="d-flex justify-content-end mb-2">
        <MdDelete
          className="text-dark fs-4"
          type="button"
          onClick={() => deleteNote(note._id)}
        />
      </div>
    </div>
  );
};

export default Note;
