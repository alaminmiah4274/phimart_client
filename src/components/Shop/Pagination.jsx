const Pagination = ({ totalPages, currentPage, handleCurrentPage }) => {
  return (
    <div className="flex justify-center mb-6">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          onClick={() => handleCurrentPage(i + 1)}
          key={i}
          className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? "bg-secondary text-white" : "bg-gray-200"}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
