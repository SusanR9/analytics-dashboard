function Pagination({ page, setPage, total }) {

  const itemsPerPage = 10;
  const totalPages = Math.ceil(total / itemsPerPage) || 1;

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 gap-2">

      {/* PREV */}
      <button
        className="btn btn-outline-primary btn-sm"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        ⬅ Prev
      </button>

      {/* CURRENT PAGE */}
    <span>
  Page {page} of {totalPages}
</span>

      {/* NEXT */}
      <button
        className="btn btn-outline-primary btn-sm"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next ➡
      </button>

    </div>
  );
}

export default Pagination;