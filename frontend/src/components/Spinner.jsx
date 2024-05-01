const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="spinner-border text-success"
        role="status"
        style={{ width: "25px", height: "25px" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
