import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

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

  const updateTask = async (id) => {
    if (task.status === "NOT STARTED") {
      const res = await fetch(
        `http://localhost:5000/api/tasks/${id}/status/progress`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await res.json();

      if (data.statusCode === 200) {
        task.status = "IN PROGRESS";
        goal.tasks = goal.tasks.map((t) => (t._id === id ? task : t));
        action(goal);
      }
    }
    if (task.status === "IN PROGRESS") {
      const res = await fetch(
        `http://localhost:5000/api/tasks/${id}/status/completed`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await res.json();

      if (data.statusCode === 200) {
        task.status = "COMPLETED";
        goal.tasks = goal.tasks.map((t) => (t._id === id ? task : t));
        action(goal);
      }
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
        {task.status !== "COMPLETED" && (
          <RxUpdate
            className="text-dark fs-5 me-2"
            type="button"
            onClick={() => updateTask(task._id)}
          />
        )}

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
