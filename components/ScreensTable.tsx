/* eslint-disable react/display-name */
import { useState, useMemo, memo } from "react";

import { useTable, useSortBy, Column } from "react-table";
import dayjs from "dayjs";
import clsx from "clsx";

import * as Icons from "../assets/icons";

const ScreensTable: React.FC<{ screens: IScreen[] }> = memo(({ screens }) => {
  const data = useMemo(
    () =>
      screens.map(({ channelName, version, system, screenName, ...rest }) => ({
        ...rest,
        screenName: screenName || "Screen name",
        channelPlaying: channelName,
        uptime: system ? dayjs(system?.UpTime).format("HH:mm:ss") : "n/a",
        player:
          version || system
            ? {
                version: version || "n/a",
                browser:
                  !system?.OS.Type && system?.OS.Info
                    ? system?.OS.Info.split(" ")[1]
                    : "n/a",
                os: system?.OS.Type || system?.OS.Arch || "n/a",
              }
            : "n/a",
        systemInfo: system
          ? {
              ram: system.Memory.Info || "n/a",
              disk: "n/a", //to do
              node: "n/a",
              cron: system.Cron,
            }
          : "n/a",
        openMore: false,
      })),
    [screens]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <div
            className={clsx(
              "font-weight-bold px-3 py-2 rounded-pill d-inline-block",
              {
                "bg-dark-green text-white": value === "ONLINE",
                "bg-dark-red text-white": value === "OFFLINE",
                "bg-gray text-dark-blue": value === "NOT-STARTED",
              }
            )}
          >
            {value}
          </div>
        ),
      },
      {
        Header: "Screen name",
        accessor: "screenName",
        Cell: ({ value }) => {
          return <span className="font-weight-bold">{value}</span>;
        },
      },
      {
        Header: "Activation code",
        accessor: "activationCode",
        Cell: ({ value }) => {
          return <span className="font-weight-bold">{value}</span>;
        },
      },
      { Header: "Channel playing", accessor: "channelPlaying" },
      { Header: "Uptime", accessor: "uptime" },
      {
        Header: "Player",
        accessor: "player",
        disableSortBy: true,
        Cell: ({ value }) => {
          return typeof value === "string" ? (
            <div>{value}</div>
          ) : (
            <div>
              <div>
                <span className="font-weight-bold">Version : </span>
                {value.version}
              </div>
              <div>
                <span className="font-weight-bold">Browser : </span>
                {value.browser}
              </div>
              <div>
                <span className="font-weight-bold">OS : </span>
                {value.os}
              </div>
            </div>
          );
        },
      },
      {
        Header: "System info",
        accessor: "systemInfo",
        disableSortBy: true,
        Cell: ({ value }) => {
          return typeof value === "string" ? (
            <div>{value}</div>
          ) : (
            <div>
              <div>
                <span className="font-weight-bold">RAM : </span>
                {value.ram.substring(4)}
              </div>
              <div>
                <span className="font-weight-bold">Disk : </span>
                {value.disk}
              </div>
              <div>
                <span className="font-weight-bold">Node : </span>
                {value.node}
              </div>
              <div>
                <span className="font-weight-bold">Cron : </span>
                {value.cron}
              </div>
            </div>
          );
        },
      },
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
                    className="screens-table__backdrop"
                    onClick={() => {
                      setOpenMore(false);
                    }}
                  ></div>
                  <div className="screens-table__more">
                    <div>
                      <Icons.Screen
                        className="preview me-2 pb-1"
                        color="#2e4858"
                      />
                      Preview screen
                    </div>
                    <div>
                      <Icons.Restart
                        className="restart me-2 pb-1"
                        color="#2e4858"
                      />
                      Restart player
                    </div>
                    <div>
                      <Icons.Connect
                        className="connect me-2 pb-1"
                        color="#2e4858"
                      />
                      Connect to system
                    </div>
                    <div>
                      <Icons.Delete
                        className="delete me-2 pb-1"
                        color="#2e4858"
                      />
                      Delete screen
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        autoResetSortBy: false,
        disableSortRemove: true,
        defaultCanSort: true,
        initialState: {
          sortBy: [{ id: "status", desc: true }],
        },
      },
      useSortBy
    );

  return (
    <table {...getTableProps()} className="screens-table">
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, i) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={i}
              >
                {column.render("Header")}
                {column.isSorted && (
                  <Icons.Sort
                    className={clsx("sort ms-2", {
                      desc: column.isSortedDesc,
                    })}
                    color="#3dacff"
                  />
                )}
                {!column.isSorted && ![5, 6, 7].includes(i) && (
                  <Icons.Sort className="sort ms-2" color="#abb6bc" />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any, i) => {
          prepareRow(row);
          return (
            <tr
              key={i}
              {...row.getRowProps()}
              onClick={() => {
                row.toggleRowExpanded();
              }}
              className={row.original.status.toLowerCase()}
            >
              {row.cells.map((cell, i) => (
                <td key={i} {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default ScreensTable;
