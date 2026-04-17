function Filters({ setSearch, setCategory, setMinAmount }) {
  return (
    <div className="row mb-3">

      {/* Search Input */}
      <div className="col-md-4">
        <label className="form-label">Search</label>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="col-md-4">
        <label className="form-label">Category</label>
       <select
  className="form-control"
  onChange={(e) => {
    setCategory(e.target.value);
  }}
>
          <option value="">All</option>
          <option value="Tech">Tech</option>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>

      {/* Min Amount Filter */}
      <div className="col-md-4">
        <label className="form-label">Min Amount</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter min amount"
          onChange={(e) => setMinAmount(e.target.value)}
        />
      </div>

    </div>
  );
}

export default Filters;