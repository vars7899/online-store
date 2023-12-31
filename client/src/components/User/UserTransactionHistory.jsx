import { useState } from "react";
import ReactPaginate from "react-paginate";
import { DateTime } from "luxon";
import { IconCreditCard } from "@tabler/icons-react";

export const UserTransactionHistory = ({ transactions }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const ITEMS_PER_PAGE = 10;

  const endOffset = itemOffset + ITEMS_PER_PAGE;
  const currentItems = transactions.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * ITEMS_PER_PAGE) % transactions.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="w-full grid grid-flow-row-dense gap-3">
      {currentItems.map((trans) => (
        <div key={trans._id} className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-lg mr-1.5 xl:mr-4">
              <IconCreditCard strokeWidth={1.25} />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-sm xl:text-base capitalize">{trans.transactionState}</p>
              <p className="text-gray-500 text-xs xl:text-sm">
                {DateTime.fromISO(trans.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm xl:text-base">CAD {Number(trans.amount).toFixed(2)}</p>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center">
        {transactions.length > ITEMS_PER_PAGE && (
          <ReactPaginate
            className="paginate"
            activeClassName="paginate-item active-paginate-item"
            breakClassName="paginate-item"
            pageClassName="paginate-item"
            nextClassName="paginate-move-item"
            previousClassName="paginate-move-item"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </div>
  );
};
