
export default function Pagination({ productsPerPage, totalProducts, paginate, currentPage }) {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="mt-8">
        <ul className="flex flex-wrap justify-center">
          {pageNumbers.map(number => (
            <li key={number} className="m-1">
              <button
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded ${currentPage === number 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} transition duration-300`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  