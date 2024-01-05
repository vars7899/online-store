import { Button, IconButton, Input, InputGroup, InputLeftElement, Select } from "@chakra-ui/react";
import { IconChevronLeft, IconChevronRight, IconFileDownload, IconSearch } from "@tabler/icons-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

export const BasicTable = ({ data, columns }) => {
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-2 rounded-lg">
        <InputGroup size="md" rounded={"lg"}>
          <InputLeftElement className="InputLeft" pointerEvents="none" children={<IconSearch size={16} />} size="xs" />
          <Input
            className="Input"
            variant="outline"
            size="md"
            placeholder={`Search`}
            maxW={"md"}
            onChange={(e) => setFiltering(e.target.value)}
            fontSize={"sm"}
          />
        </InputGroup>
        <Button
          variant={"ghost"}
          size={"sm"}
          ml={4}
          leftIcon={<IconFileDownload strokeWidth={1.5} size={18} />}
          colorScheme="blue"
          px={"8"}
          mr={"2"}
        >
          Export Data
        </Button>
        <div className="flex items-center justify-start text-sm border-l-[1px] pl-4">
          <p className="whitespace-nowrap">Show rows per page</p>
          <Select
            size={"md"}
            pl={2}
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            minW={"max-content"}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex items-center justify-end text-sm pl-4">
          <p className="px-2 whitespace-nowrap">
            <span className="font-bold">{table.getState().pagination.pageIndex + 1} </span>
            of {table.getPageCount()}
          </p>
          <IconButton
            size={"sm"}
            isDisabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            mx={"2"}
            variant={"ghost"}
            colorScheme="blackAlpha"
          >
            <IconChevronLeft />
          </IconButton>
          <IconButton
            size={"sm"}
            isDisabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            variant={"ghost"}
            colorScheme="blackAlpha"
          >
            <IconChevronRight />
          </IconButton>
        </div>
      </div>
      <div className="overflow-auto min-h-[700px]">
        <table className="w-[100%]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="text-left text-sm bg-white border-b-[1px]">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="font-medium py-4 px-3">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 cursor-pointer">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
