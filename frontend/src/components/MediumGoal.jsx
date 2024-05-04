import { GlobalContext } from "../context/GlobalState";
import { useContext, useState } from "react";

import { IoMdMore, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCircle, FaEdit, FaPlus, FaMinus, FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Task from "./Task";
import Note from "./Note";

const MediumGoal = ({ goal }) => {
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
    updateMedium,
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

  const [createNote, showCreateNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [messageNote, setMessageNote] = useState("");
  const [errorNote, showErrorNote] = useState(false);

  const [imageStatus, setImageStatus] = useState(false);
  const [file, setFile] = useState(null);
  const [messageImage, setMessageImage] = useState("");
  const [errorImage, showErrorImage] = useState(false);

  const toLow = async (id) => {
    const res = await fetch(
      `http://localhost:5000/api/goals/${id}?urgency=LOW`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await res.json();

    if (data.statusCode === 200) {
      const auxMedium = medium.filter((l) => l._id !== id);
      postMedium(auxMedium);

      const auxLow = [goal, ...low];
      postLow(auxLow);
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
      const auxMedium = medium.filter((l) => l._id !== id);
      postMedium(auxMedium);

      const auxHigh = [goal, ...high];
      postHigh(auxHigh);
    }
  };

  const toComplete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/goals/${id}/completed`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();

    if (data.statusCode === 200) {
      goal.isCompleted = true;
      const auxMedium = medium.filter((l) => l._id !== id);
      postMedium(auxMedium);

      const auxCompleted = [goal, ...completed];
      postCompleted(auxCompleted);
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
      const auxMedium = medium.filter((l) => l._id !== id);
      postMedium(auxMedium);
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

        updateMedium(goal);

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

        updateMedium(goal);

        setMessageTask("");
        setTaskText("");
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

  const onSubmitNote = async (e) => {
    e.preventDefault();

    const note = {
      text: noteText,
      goalId: goal._id,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(note),
      });

      const data = await res.json();

      if (data.statusCode === 201) {
        goal.notes.push(data.data);

        updateMedium(goal);

        setMessageNote("");
        setNoteText("");
        showErrorNote(false);
        showCreateNote(false);
      } else {
        setMessageNote(data.msg);
        showErrorNote(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const onSubmitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `http://localhost:5000/api/goals/${goal._id}/image`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (data.statusCode === 200) {
        goal.image = data.data.image;
        updateMedium(goal);

        setMessageImage("");
        setFile(null);
        showErrorImage(false);
        setImageStatus(false);
      } else {
        setMessageImage(data.msg);
        showErrorImage(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = async (id) => {
    const res = await fetch(`http://localhost:5000/api/goals/${id}/image`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await res.json();

    if (data.statusCode === 200) {
      goal.image = null;
      updateMedium(goal);
    }
  };

  return (
    <div className="card border-0 border-start border-5 border-warning mb-2 goal">
      <div className="card-body">
        <p className="fw-bold text-warning mb-2" style={{ fontSize: "12px" }}>
          MEDIUM URGENCY
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

              <ul className="dropdown-menu p-3 bg-dark text-white">
                <li
                  style={{ cursor: "pointer" }}
                  className="mb-2"
                  onClick={() => toLow(goal._id)}
                >
                  <FaCircle className="text-success me-2" />
                  Pass to Low Urgency
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="mb-2"
                  onClick={() => toHigh(goal._id)}
                >
                  <FaCircle className="text-danger me-2" />
                  Pass to High Urgency
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => toComplete(goal._id)}
                >
                  <FaCheck className="text-primary me-2" />
                  Complete Goal
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
                {createTask ? (
                  <FaMinus
                    className="text-dark"
                    type="button"
                    onClick={() => showCreateTask(!createTask)}
                  />
                ) : (
                  <FaPlus
                    className="text-dark"
                    type="button"
                    onClick={() => showCreateTask(!createTask)}
                  />
                )}
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
              <div className="d-flex flex-column w-100">
                {goal?.tasks.map((t) => (
                  <Task
                    key={t._id}
                    goal={goal}
                    task={t}
                    goals={medium}
                    postAction={postMedium}
                    action={updateMedium}
                    user={user}
                  />
                ))}
              </div>
            </div>
            <div className="d-flex flex-column align-items-center border-top border-2 pt-2">
              <div className="w-100 d-flex justify-content-between align-items-center mb-2">
                <p className="fw-bold mb-0">Notes</p>
                {createNote ? (
                  <FaMinus
                    className="text-dark"
                    type="button"
                    onClick={() => showCreateNote(!createNote)}
                  />
                ) : (
                  <FaPlus
                    className="text-dark"
                    type="button"
                    onClick={() => showCreateNote(!createNote)}
                  />
                )}
              </div>
              {createNote ? (
                <form onSubmit={onSubmitNote}>
                  <div className="d-flex flex-column">
                    <input
                      type="text"
                      className="form-control bg-white text-black mb-2"
                      placeholder="Add Note Text"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                    />
                  </div>

                  <div className="d-flex flex-column justify-content-center align-items-center my-2">
                    {errorNote ? (
                      <div
                        className="alert alert-danger text-center p-1 w-100"
                        role="alert"
                      >
                        {messageNote}!
                      </div>
                    ) : (
                      <></>
                    )}
                    <button type="submit" className="btn btn-dark w-100">
                      Create Note
                    </button>
                  </div>
                </form>
              ) : (
                <></>
              )}
              <div className="d-flex flex-column w-100">
                {goal?.notes.map((n) => (
                  <Note
                    key={n._id}
                    goal={goal}
                    note={n}
                    action={updateMedium}
                    user={user}
                  />
                ))}
              </div>
            </div>
            <div className="d-flex flex-column align-items-center border-top border-2 pt-2">
              <div className="w-100 d-flex justify-content-between align-items-center mb-2">
                <p className="fw-bold mb-0">Image</p>
                {goal.image === null ? (
                  !imageStatus ? (
                    <FaPlus
                      className="text-dark"
                      type="button"
                      onClick={() => setImageStatus(!imageStatus)}
                    />
                  ) : (
                    <FaMinus
                      className="text-dark"
                      type="button"
                      onClick={() => setImageStatus(!imageStatus)}
                    />
                  )
                ) : (
                  <MdDelete
                    className="text-dark"
                    type="button"
                    onClick={() => deleteImage(goal._id)}
                  />
                )}
              </div>
              {imageStatus ? (
                <form onSubmit={onSubmitImage}>
                  <div className="d-flex flex-column">
                    <input
                      type="file"
                      className="form-control bg-white text-black mb-2"
                      placeholder="Add Note Text"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="d-flex flex-column justify-content-center align-items-center my-2">
                    {errorImage ? (
                      <div
                        className="alert alert-danger text-center p-1 w-100"
                        role="alert"
                      >
                        {messageImage}!
                      </div>
                    ) : (
                      <></>
                    )}
                    <button type="submit" className="btn btn-dark w-100">
                      Upload Image
                    </button>
                  </div>
                </form>
              ) : (
                <></>
              )}
              {goal.image && (
                <img
                  src={goal.image}
                  alt="goal"
                  className=""
                  style={{ height: "200px" }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MediumGoal;
