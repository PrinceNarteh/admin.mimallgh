interface IPagination {
  page: number;
  perPage: number;
  totalPages: number;
  fetchData: (page: number) => Promise<void>;
  handlePrev: (page: number) => Promise<void>;
  handleNext: (page: number) => Promise<void>;
}

// const pager = ({
//   totalPages,
//   currentPage,
//   axios,
//   shopId,
// }: {
//   totalPages: number;
//   currentPage: number;
//   axios: AxiosInstance;
//   shopId: string;
// }) => {
//   let pagination = [],
//     i = 1;

//   const handleClick = (page) => {};

//   while (i <= totalPages) {
//     if (
//       i <= 3 || //the first three pages
//       i >= totalPages - 2 || //the last three pages
//       (i >= currentPage - 1 && i <= currentPage + 1)
//     ) {
//       //the currentPage, the page before and after
//       pagination.push(
//         // <Link href={`?page=${i}`} key={i}>
//         <li>
//           <Link
//             href={`/products`}
//             className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//           >
//             {i}
//           </Link>
//         </li>
//         // </Link>
//       );
//       i++;
//     } else {
//       //any other page should be represented by ...
//       pagination.push(<div>...</div>);
//       //jump to the next page to be linked in the navigation
//       i = i < currentPage ? currentPage - 1 : totalPages - 2;
//     }
//   }
//   return pagination;
// };

const Pagination = (props: IPagination) => {
  const { handleNext, handlePrev, totalPages, fetchData, page } = props;

  return (
    <nav aria-label="" className="py-5">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            onClick={() => handlePrev(page)}
            disabled={page === 1}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Prev
          </button>
        </li>
        {Array(totalPages)
          .fill(null)
          .map((_, idx) => (
            <li key={idx}>
              <button
                onClick={() => fetchData(idx + 1)}
                className={`
                px-3 py-2 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                ${idx + 1 === page ? "text-gray-700 bg-gray-600" : ""}
                `}
              >
                {idx + 1}
              </button>
            </li>
          ))}
        <li>
          <button
            onClick={() => handleNext(page)}
            disabled={page === totalPages}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
          >
            Next
            <svg
              aria-hidden="true"
              className="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
