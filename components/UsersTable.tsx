/* eslint-disable react/display-name */
import {
  useState,
  useMemo,
  Fragment,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";

import { useTable, useExpanded, Column, useSortBy } from "react-table";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import dayjs from "dayjs";
import clsx from "clsx";

import * as Icons from "../assets/icons";

import { useExpandAll, useFilteredUsers } from "../context/CPData";

import { sortScreens, sortUsernames } from "../lib/common";

import ScreensTable from "./ScreensTable";

const UsersTable = memo(() => {
  const virtuoso = useRef<VirtuosoHandle | null>(null);

  const filteredUsers = useFilteredUsers();

  const data = useMemo(
    () =>
      filteredUsers?.map(({ screens, ...rest }) => ({
        ...rest,
        subRows: screens,
        openMore: false,
      })) || [],
    [filteredUsers]
  );

  const columns: Column<IUsersTableData>[] = useMemo(
    () => [
      {
        Header: () => null,
        accessor: "id",
        disableSortBy: true,
        Cell: ({ row }) =>
          row.canExpand ? (
            <span {...row.getRowProps({ className: "text-center" })}>
              <Icons.Chevron
                className={clsx("chevron", { expand: row.isExpanded })}
                color="#2e4858"
              />
            </span>
          ) : null,
      },
      {
        Header: "User name",
        accessor: "username",
        sortType: sortUsernames,
        Cell: ({ value }) => {
          return <span className="font-weight-bold">{value}</span>;
        },
      },
      {
        Header: "Date created",
        accessor: "createdAt",
        Cell: ({ value }) => {
          return <>{dayjs(value).format("DD.MM.YYYY.")}</>;
        },
      },
      {
        Header: "Screens",
        accessor: "onlineScreensCount",
        sortType: sortScreens,
        Cell: ({ value, row }) => (
          <>
            {value}/{row.original.totalScreensCount}
          </>
        ),
      },
      { Header: "Company name", accessor: "companyName" },
      { Header: "Contract", accessor: "contract" },
      { Header: "Contact", accessor: "contact", disableSortBy: true },
      { Header: "Note", accessor: "note", disableSortBy: true },
      {
        Header: () => null,
        accessor: "openMore",
        disableSortBy: true,
        Cell: ({ row }) => {
          const [openMore, setOpenMore] = useState<boolean>(
            row.original.openMore
          );

          return (
            <div
              className="position-relative"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span
                {...row.getRowProps({ className: "text-center" })}
                onClick={() => {
                  setOpenMore(true);
                }}
              >
                <Icons.More className="row-more" color="#2e4858" />
              </span>
              {openMore && (
                <>
                  <div
                    className="users-table__backdrop"
                    onClick={() => {
                      setOpenMore(false);
                    }}
                  ></div>
                  <div className="users-table__more">
                    <div>
                      <Icons.Edit className="edit me-2 pb-1" color="#2e4858" />
                      Edit note
                    </div>
                    <div>
                      <Icons.Delete
                        className="delete me-2 pb-1"
                        color="#2e4858"
                      />
                      Delete note
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    toggleAllRowsExpanded,
  } = useTable(
    {
      columns,
      data,
      autoResetExpanded: false,
      autoResetSortBy: false,
      disableSortRemove: true,
      defaultCanSort: true,
      initialState: {
        sortBy: [{ id: "username", desc: false }],
      },
      getRowId: (row: any, relativeIndex, parent) =>
        parent
          ? [parent.id, row?.id?.toString()].join(".")
          : row?.id?.toString(),
    },
    useSortBy,
    useExpanded
  );

  const { expandAll } = useExpandAll();

  useEffect(() => {
    toggleAllRowsExpanded(expandAll);

    virtuoso.current?.scrollToIndex({
      index: 0,
      align: "start",
      behavior: "auto",
    });
  }, [expandAll]);

  const renderRow = useCallback(
    (index: number) => {
      const row = rows[index];
      prepareRow(row);

      if (row.canExpand) {
        return (
          <Fragment key={index}>
            <div
              {...row.getRowProps()}
              onClick={() => {
                row.toggleRowExpanded();
              }}
              className="tr tr--tbody"
            >
              {row.cells.map((cell, i) => (
                <div {...cell.getCellProps()} className="td" key={i}>
                  {cell.render("Cell")}
                </div>
              ))}
            </div>
            {row.isExpanded ? (
              <div className="tr bg-gray expand-row">
                <div className="w-100 p-3">
                  <ScreensTable screens={row.original.subRows} />
                </div>
              </div>
            ) : null}
          </Fragment>
        );
      }
      return null;
    },
    [prepareRow, rows]
  );

  if (!filteredUsers) {
    return (
      <div className="loading">
        <div
          className="spinner-grow text-dark-blue"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="no-results">
        <div className="fs-xx-large">No results!</div>
      </div>
    );
  }

  if (filteredUsers.length > 0) {
    return (
      <div className="height-no-header table-responsive p-2 p-md-3 p-xl-4 bg-light-gray">
        <div {...getTableProps()} className="users-table">
          <div>
            {headerGroups.map((headerGroup, i) => (
              <div
                key={i}
                {...headerGroup.getHeaderGroupProps()}
                className="tr tr--thead"
              >
                {headerGroup.headers.map((column, i) => (
                  <div
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="th"
                    key={i}
                    onClick={(e) => {
                      virtuoso.current?.scrollToIndex({
                        index: 0,
                        align: "start",
                        behavior: "auto",
                      });

                      column.getSortByToggleProps().onClick?.(e);
                    }}
                  >
                    <div className="d-flex">
                      {column.render("Header")}
                      {column.isSorted && (
                        <Icons.Sort
                          className={clsx("sort ms-2", {
                            desc: column.isSortedDesc,
                          })}
                          color="#3dacff"
                        />
                      )}
                      {!column.isSorted && ![0, 6, 7, 8].includes(i) && (
                        <Icons.Sort className="sort ms-2" color="#abb6bc" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Virtuoso
            totalCount={rows.length}
            className="tbody"
            itemContent={renderRow}
            ref={virtuoso}
          />
        </div>
      </div>
    );
  }
  return null;
});

export default UsersTable;
