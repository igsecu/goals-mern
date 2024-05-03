import { GlobalContext } from "../context/GlobalState";
import { useContext, useState } from "react";

import { IoMdMore, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCircle, FaEdit, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const LowGoal = ({ goal }) => {
  const {
    user,
    low,
    postLow,
    medium,
    postMedium,
    high,
    postHigh,
    completed,
    postCompleted,
    updateLow,
  } = useContext(GlobalContext);

  const [show, setShow] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [message, setMessage] = useState("");
  const [error, showError] = useState(false);

  const [createTask, showCreateTask] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [messageTask, setMessageTask] = useState("");
  const [errorTask, showErrorTask] = useState(false);

  const toMedium = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/goals/${id}?urgency=MEDIUM`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await res.json();

    if (data.statusCode === 200) {
      const auxLow = low.filter((l) => l._id !== id);
      postLow(auxLow);

      const auxMedium = [goal, ...medium];
      postMedium(auxMedium);
    }
  };

  const toHigh = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/goals/${id}?urgency=HIGH`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await res.json();

    if (data.statusCode === 200) {
      const auxLow = low.filter((l) => l._id !== id);
      postLow(auxLow);

      const auxHigh = [goal, ...high];
      postHigh(auxHigh);
    }
  };

  const deleteGoal = async (id) => {
    const res = await fetch(`http://localhost:5000/api/goals/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();

    if (data.statusCode === 200) {
      const auxLow = low.filter((l) => l._id !== id);
      postLow(auxLow);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const goalUpdated = {
      title,
      description,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/goals/${goal._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(goalUpdated),
      });

      const data = await res.json();

      if (data.statusCode === 200) {
        goal.title = title;
        goal.description = description;

        updateLow(goal);

        setMessage("");
        showError(false);
        setEditForm(false);
      } else {
        setMessage(data.msg);
        showError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitTask = async (e) => {
    e.preventDefault();

    const task = {
      text: taskText,
      goalId: goal._id,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      if (data.statusCode === 201) {
        goal.tasks.push(data.data);

        updateLow(goal);

        setMessageTask("");
        showErrorTask(false);
        showCreateTask(false);
      } else {
        setMessageTask(data.msg);
        showErrorTask(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="card border-0 border-start border-5 border-success mb-2"
      style={{ width: "18rem" }}
    >
      <div className="card-body">
        <p className="fw-bold text-success mb-2" style={{ fontSize: "12px" }}>
          LOW URGENCY
        </p>
        {!editForm ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="card-title mb-0">{goal.title}</h5>
              <IoMdMore
                className="text-dark fs-4 dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />

              <ul className="dropdown-menu p-2 bg-dark text-white">
                <li
                  style={{ cursor: "pointer" }}
                  className="mb-2"
                  onClick={() => toMedium(goal._id)}
                >
                  <FaCircle className="text-warning me-2" />
                  Pass to Medium Urgency
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => toHigh(goal._id)}
                >
                  <FaCircle className="text-danger me-2" />
                  Pass to High Urgency
                </li>
              </ul>
            </div>
            <p className="card-text">{goal.description}</p>
          </>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="d-flex flex-column">
              <input
                type="text"
                className="form-control bg-white text-black mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <textarea
                className="form-control bg-light"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center my-2">
              {error ? (
                <div
                  className="alert alert-danger text-center p-1 w-100"
                  role="alert"
                >
                  {message}!
                </div>
              ) : (
                <></>
              )}
              <button type="submit" className="btn btn-dark w-100">
                Edit Goal
              </button>
            </div>
          </form>
        )}

        <div className="d-flex justify-content-end align-items-center mb-2">
          <FaEdit
            className="text-dark fs-5 me-2"
            type="button"
            onClick={() => setEditForm(!editForm)}
          />
          <MdDelete
            className="text-dark fs-4 me-2"
            type="button"
            onClick={() => deleteGoal(goal._id)}
          />
          {show ? (
            <IoIosArrowUp
              className="text-dark fs-5"
              type="button"
              onClick={() => setShow(!show)}
            />
          ) : (
            <IoIosArrowDown
              className="text-dark fs-5"
              type="button"
              onClick={() => setShow(!show)}
            />
          )}
        </div>
        {show && (
          <>
            <div className="d-flex flex-column align-items-center mt-2 border-top border-2 pt-2">
              <div className="w-100 d-flex justify-content-between align-items-center mb-2">
                <p className="fw-bold mb-0">Tasks</p>
                <FaPlus
                  className="text-dark"
                  type="button"
                  onClick={() => showCreateTask(!createTask)}
                />
              </div>
              {createTask ? (
                <form onSubmit={onSubmitTask}>
                  <div className="d-flex flex-column">
                    <input
                      type="text"
                      className="form-control bg-white text-black mb-2"
                      placeholder="Add Task Text"
                      value={taskText}
                      onChange={(e) => setTaskText(e.target.value)}
                    />
                  </div>

                  <div className="d-flex flex-column justify-content-center align-items-center my-2">
                    {errorTask ? (
                      <div
                        className="alert alert-danger text-center p-1 w-100"
                        role="alert"
                      >
                        {messageTask}!
                      </div>
                    ) : (
                      <></>
                    )}
                    <button type="submit" className="btn btn-dark w-100">
                      Create Task
                    </button>
                  </div>
                </form>
              ) : (
                <></>
              )}
            </div>
            <div className="d-flex flex-column align-items-center border-top border-2 pt-2">
              <div className="w-100 d-flex justify-content-between align-items-center mb-2">
                <p className="fw-bold mb-0">Notes</p>
                <FaPlus className="text-dark" type="button" />
              </div>
            </div>
            <div className="d-flex flex-column align-items-center border-top border-2 pt-2">
              <div className="w-100 d-flex justify-content-between align-items-center mb-2">
                <p className="fw-bold mb-0">Image</p>
                <FaPlus className="text-dark" type="button" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LowGoal;
