import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import Filters from "./Filters";
import Pagination from "./Pagination";
import Charts from "./Charts";

const API_URL = "http://127.0.0.1:8001/api/records/"; // make sure this URL exists

function Dashboard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const fetchData = async () => {
  setLoading(true);
  try {
    const res = await axios.get(API_URL, {
      params: { search, category, page, minAmount },
    });

    console.log("API RESPONSE:", res.data);

    // Case 1: Django paginated response
    if (res.data.results) {
      setData(res.data.results);
      setTotal(res.data.count);
    }
    // Case 2: Custom { data: [...] }
    else if (res.data.data) {
      setData(res.data.data);
      setTotal(res.data.total || res.data.data.length);
    }
    // Case 3: Simple array
    else if (Array.isArray(res.data)) {
      setData(res.data);
      setTotal(res.data.length);
    } 
    else {
      setData([]);
      setTotal(0);
    }

    setError("");
  } catch (err) {
    console.error("FULL ERROR:", err);

    // 🔥 SHOW REAL ERROR
    if (err.response) {
      console.error("BACKEND ERROR:", err.response.data);
      setError("Backend error: " + JSON.stringify(err.response.data));
    } else if (err.request) {
      setError("No response from server (Is Django running?)");
    } else {
      setError("Error: " + err.message);
    }
  }
  setLoading(false);
};
  // reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, category, minAmount]);

  // fetch data
  useEffect(() => {
    fetchData();
  }, [page, search, category, minAmount]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📊 Advanced Analytics Dashboard</h2>

      <Filters
        setSearch={setSearch}
        setCategory={setCategory}
        setMinAmount={setMinAmount}
      />

      {/* Loading & Error */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Summary */}
      <div className="card p-3 mb-3">
        <h5>Total Records: {total}</h5>
        <h6>
          Total Amount: ₹{" "}
          {data.reduce((sum, item) => sum + (item.amount || 0), 0)}
        </h6>
      </div>

      {/* Table */}
      <Table data={data} />

      {/* Charts */}
      <Charts data={data} />

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <Pagination page={page} setPage={setPage} total={total} />
      </div>
    </div>
  );
}

export default Dashboard;