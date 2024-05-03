import { MdDelete } from "react-icons/md";

const Task = ({ task, goal, action, user }) => {
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();

    if (data.statusCode === 200) {
      goal.tasks = goal.tasks.filter((t) => t._id !== id);
      action(goal);
    }
  };

  return (
    <div className="w-100">
      <p className="mb-0 fw-bold" style={{ fontSize: "14px" }}>
        {task.text}
      </p>

      <p
        className={`fw-bold ${
          task.status === "NOT STARTED"
            ? "text-danger"
            : task.status === "IN PROGRESS"
            ? "text-primary"
            : "text-success"
        } mb-2`}
        style={{ fontSize: "12px" }}
      >
        {task.status}
      </p>

      <div className="d-flex justify-content-end align-items-center mb-2">
        <MdDelete
          className="text-dark fs-4 me-2"
          type="button"
          onClick={() => deleteTask(task._id)}
        />
      </div>
    </div>
  );
};

export default Task;
