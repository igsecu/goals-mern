import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

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
      toast.error(data.msg, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="w-100 px-2 py-1 d-flex justify-content-between">
      <p className="mb-0 fw-bold" style={{ fontSize: "14px" }}>
        {note.text}
      </p>

      {goal.isCompleted === false && (
        <div className="d-flex justify-content-end mb-2">
          <MdDelete
            className="text-dark fs-4"
            type="button"
            onClick={() => deleteNote(note._id)}
          />
        </div>
      )}
    </div>
  );
};

export default Note;
