import { FaExclamation } from "react-icons/fa";

const NoFoundUrgency = ({ text }) => {
  return (
    <div
      className="text-center bg-dark d-flex flex-column align-items-center justify-content-center"
      style={{ height: "650px" }}
    >
      <FaExclamation className="text-danger fs-1 mb-3" />
      <h5 className="text-white">You do not have {text} goals yet!</h5>
    </div>
  );
};

export default NoFoundUrgency;
