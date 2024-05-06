const SmallSpinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "200px" }}
    >
      <div
        className="spinner-border text-success"
        role="status"
        style={{ width: "25px", height: "25px" }}
      ></div>
    </div>
  );
};

export default SmallSpinner;
