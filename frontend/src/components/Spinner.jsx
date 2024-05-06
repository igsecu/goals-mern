const Spinner = () => {
  return (
    <div
      className="bg-dark d-flex justify-content-center align-items-center"
      style={{ height: "750px" }}
    >
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
