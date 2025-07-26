import { Pagination as PaginationComponent } from "@mantine/core";

import usePagination from "../hooks/usePagination";

function Pagination() {
  const { page, pages, setPage } = usePagination();

  return (
    <PaginationComponent
      color="gray"
      mt="xl"
      onChange={setPage}
      total={pages}
      value={page}
    />
  );
}

export default Pagination;
