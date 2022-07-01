import React, { useEffect, useState } from "react";
import Navbar from "../Share/Navbar/Navbar";
import { useParams } from "react-router-dom";

const Modal = () => {
  const billId = useParams();
  const [billInfo, setBillInfo] = useState([]);
  const [updateBillInfo, setUpdateBillInfo] = useState({});
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const id=billId.id;
    const url = `https://boxing-eds-53942.herokuapp.com/api/billing/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBillInfo(data));
  }, [billId]);
  console.log(billInfo);
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newAddData = { ...updateBillInfo };
    newAddData[field] = value;
    setUpdateBillInfo(newAddData);
  };
  const handleAddProduct = (e) => {
    e.preventDefault();
    const id=billId.id;
    const item = {
      ...updateBillInfo,
    };
    fetch(`https://boxing-eds-53942.herokuapp.com/api/update-billing/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setConfirm(true);
          document.getElementById("create-course-form").reset();
        }
      });
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2">
          <div className="col">
            <h3 className="mt-5">
              Please Provide<span className="text-danger"> Information </span>
              For Update <span className="text-danger">Bill</span>
            </h3>
            <form
              className="row g-3 w-100 inputFrom mt-2 loginFrom"
              id="create-course-form"
              onSubmit={handleAddProduct}
            >
              <div className="col-12">
                <label for="inputAddress" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputAddress"
                  onkeypress="return event.charCode >= 48"
                  min="1"
                />
              </div>
              <div className="col-12">
                <label for="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                />
              </div>
              <div className="col-12">
                <label for="inputEmail4" className="form-label">
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                  onkeypress="return event.charCode >= 48"
                  min="1"
                />
              </div>
              <div className="col-12">
                <label for="inputEmail4" className="form-label">
                  Payed Amount
                </label>
                <input
                  type="number"
                  name="paidAmount"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="inputEmail4"
                  onkeypress="return event.charCode >= 48"
                  min="1"
                />
              </div>
              <div className="col-12 mx-auto text-center">
                <button type="submit" className="btn btn-dark">
                  Update Bill Info
                </button>
              </div>
            </form>
            {confirm && (
              <div class="alert alert-success" role="alert">
                Update Bill Successfully
              </div>
            )}
          </div>
          <div className="col mt-5">
            <h4 className="text-center">Previous Information</h4>
            <div className="mx-auto w-50 border border-4 p-3 loginFrom">
              <h6>Name: {billInfo.name}</h6>
              <h6>Email: {billInfo.email}</h6>
              <h6>Phone: {billInfo.phone}</h6>
              <h6>Paid Amount: {billInfo.paidAmount}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
