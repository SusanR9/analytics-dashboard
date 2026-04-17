import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import Filters from "./Filters";
import Pagination from "./Pagination";
import Charts from "./Charts";

const API_URL = "https://analytics-dashboard-zmwk.onrender.com/api/records/";

function Dashboard() {
const [data, setData] = useState([]);
const [total, setTotal] = useState(0);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("");
const [minAmount, setMinAmount] = useState("");
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

// ✅ FETCH DATA WITH FILTERS
const fetchData = async () => {
  setLoading(true);

  try {
    const res = await axios.get(API_URL, {
      params: {
        search: search || "",
        category: category || "",
        minAmount: minAmount || "",
        page: page,
      },
    });

    if (res.data.results) {
      setData(res.data.results);
      setTotal(res.data.count);
    } else if (Array.isArray(res.data)) {
      setData(res.data);
      setTotal(res.data.length);
    } else {
      setData([]);
      setTotal(0);
    }

    setError("");
  } catch (err) {
    console.error(err);
    setError("Error fetching data");
  }

  setLoading(false);
};

// ✅ Reset page when filters change
useEffect(() => {
setPage(1);
}, [search, category, minAmount]);

// ✅ Fetch whenever anything changes
useEffect(() => {
fetchData();
}, [page, search, category, minAmount]);

return ( <div className="container mt-4"> <h2 className="mb-4">
  📊 Advanced Analytics Dashboard</h2>

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
