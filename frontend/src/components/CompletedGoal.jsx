import { useState } from "react";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import Task from "./Task";
import Note from "./Note";

const CompletedGoal = ({ goal }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="card border-0 border-start border-5 border-secondary mb-2 goal">
      <div className="card-body">
        <p className="fw-bold text-secondary mb-2" style={{ fontSize: "12px" }}>
          COMPLETED
        </p>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{goal.title}</h5>
        </div>
        <p className="card-text">{goal.description}</p>

        <div className="d-flex justify-content-end align-items-center mb-2">
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
              </div>
              <div className="d-flex flex-column w-100">
                {goal?.tasks.map((t) => (
                  <Task key={t._id} goal={goal} task={t} />
                ))}
              </div>
            </div>
            <div className="d-flex flex-column align-items-center border-top border-2 pt-2">
              <div className="w-100 d-flex justify-content-between align-items-center mb-2">
                <p className="fw-bold mb-0">Notes</p>
              </div>
              <div className="d-flex flex-column w-100">
                {goal?.notes.map((n) => (
                  <Note key={n._id} goal={goal} note={n} />
                ))}
              </div>
            </div>
            <div className="d-flex flex-column align-items-center border-top border-2 pt-2">
              <div className="w-100 d-flex justify-content-between align-items-center mb-2">
                <p className="fw-bold mb-0">Image</p>
              </div>
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

export default CompletedGoal;
