import { useState } from "react";

import * as Icons from "../assets/icons";

import { useStats } from "../context/CPData";

import useImperativeDisableScroll from "../lib/hooks/useImperativeDisableScroll";

const LiveStats = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);

  const { online, offline, notStarted, playerVersions } = useStats();

  useImperativeDisableScroll({
    element: typeof document !== "undefined" ? document.documentElement : null,
    disabled: sidebar,
  });

  return (
    <>
      <button
        className="header__button text-uppercase text-dark-blue font-weight-bold px-3 rounded d-flex align-items-center"
        onClick={() => {
          setSidebar(true);
        }}
      >
        <Icons.Stats className="stats me-2" color="#2e4858" />
        <span className="text-nowrap">Live stats</span>
      </button>
      <div className={`sidebar ${sidebar && "open"}`}>
        <div
          className="sidebar__backdrop"
          onClick={() => {
            setSidebar(false);
          }}
        ></div>
        <div className="sidebar__content font-weight-bold text-uppercase">
          <div className="bg-hover-blue px-4 py-3 fs-xx-large rounded-start">
            <Icons.Stats className="statistics me-3" color="#2e4858" />
            Live Statistics
          </div>
          <div className="px-4 py-3">
            <div className=" fs-x-large pb-3">Screens</div>
            <ul className="list-unstyled mb-0">
              <li className="d-flex justify-content-between fs-small py-2 border-bottom border-disabled">
                <div className="d-flex align-items-center">
                  <Icons.Online className="online me-2" color="#5FAD56" />
                  <span>Online</span>
                </div>
                <div>{online}</div>
              </li>
              <li className="d-flex justify-content-between fs-small py-2 border-bottom border-disabled">
                <div className="d-flex align-items-center">
                  <Icons.Offline className="offline me-2" color="#DC6666" />

                  <span>Offline</span>
                </div>
                <div>{offline}</div>
              </li>
              <li className="d-flex justify-content-between fs-small py-2 border-bottom border-disabled">
                <div className="d-flex align-items-center">
                  <Icons.NotStarted
                    className="not-started me-2"
                    color="#abb6bc"
                  />
                  <span>Not started</span>
                </div>
                <div>{notStarted}</div>
              </li>
            </ul>
          </div>
          <div className="px-4 py-3">
            <div className=" fs-x-large pb-3">Player versions</div>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between fs-small py-2 border-bottom border-dark-blue">
                <div className="d-flex align-items-center">Version</div>
                <div>Online count</div>
              </li>
              {playerVersions.map((playerVersion, i) => (
                <li
                  className="d-flex justify-content-between fs-small py-2 border-bottom border-disabled"
                  key={i}
                >
                  <div className="d-flex align-items-center">
                    {playerVersion.version === undefined
                      ? "undefined"
                      : playerVersion.version}
                  </div>
                  <div>{playerVersion.count}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveStats;
