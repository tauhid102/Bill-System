import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Style/Style.css";
const BillSystem = () => {
  const [billInfo, setBillInfo] = useState({});
  const [loadBillInfo, setLoadBillInfo] = useState([]);
  const [load, setLoad] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const handleAddInfo = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    const newData = { ...billInfo };
    newData[field] = value;
    setBillInfo(newData);
  };
  const handleSubmitInfo = () => {
    fetch("https://boxing-eds-53942.herokuapp.com/api/add-billing", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(billInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledge===true) {
          alert("Save Data");
        }
      });
  };
  useEffect(() => {
    fetch(`https://boxing-eds-53942.herokuapp.com/api/billing-list?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setLoadBillInfo(data.billInfo);
        const count = data.count;
        const pageNumber = Math.ceil(count / 10);
        setPageCount(pageNumber);
      });
  }, [page, billInfo]);

  const handleDeleteStudent = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `https://boxing-eds-53942.herokuapp.com/api/delete-billing/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            alert("Cancel Successfully");
            const restBillInfo = billInfo.filter((food) => food._id !== id);
            setBillInfo(restBillInfo);
          }
        });
    }
  };
  useEffect(()=>{
    fetch('https://boxing-eds-53942.herokuapp.com/bill')
    .then(res=>res.json())
    .then(data=>setLoad(data))
  },[billInfo])
  const handleSearch=(e)=>{
    e.preventDefault();
    const searchText=(e.target.value);
    const searchItem=load.filter(e=>e.name.includes(searchText)||e.email.includes(searchText)||e.phone.includes(searchText))
    setLoadBillInfo(searchItem);
  }
  let total=0;
  load.forEach(item=>{
    total=total+parseInt(item.paidAmount)
  })
  return (
    <>
      <nav className="navbar container navbar-light bg-light mt-4">
        <div className="container-fluid">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={handleSearch}
            />
          </form>
          <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link active" aria-current="page" href="#">
                  Paid Amount: {total}
                </span>
              </li>
            </ul>
          <button
            className="btn btn-info"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add New Bill
          </button>
        </div>
      </nav>
      {/* modal for information  */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add Information
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Full Name"
                    onChange={handleAddInfo}
                    name="name"
                  />
                </div>
                <div class="col-12 mt-2">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    onChange={handleAddInfo}
                    name="email"
                  />
                </div>
                <div class="col-12 mt-2">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Phone"
                    onChange={handleAddInfo}
                    name="phone"
                  />
                </div>
                <div class="col-12 mt-2">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Paid Amount"
                    onChange={handleAddInfo}
                    name="paidAmount"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSubmitInfo}
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="table-responsive container mt-3">
        <table className="table table-bordered table-light">
          <thead>
            <tr>
              <th>Billing ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Paid Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loadBillInfo?.map((item) => (
              <tr>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.paidAmount}</td>
                <td>
                  <Link to={`/billInfoUpdate/${item._id}`}>
                    <button className="btn btn-primary b-0 ">
                      <i class="far fa-edit"></i>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteStudent(item._id)}
                    className="btn btn-danger b-0"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination container mb-5">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            className={number === page ? "selected" : ""}
            key={number}
            onClick={() => setPage(number)}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default BillSystem;
