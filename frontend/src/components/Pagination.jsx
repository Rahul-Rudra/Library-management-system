import React from "react";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.css";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-left">
        {pages.map((page) => {
          return (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                href="#"
                className="page-link"
                onClick={() => {
                  props.onPageChange(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
