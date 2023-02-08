import clsx from "clsx";
import { useState, useEffect, useCallback, useMemo } from "react";

import * as Icons from "../assets/icons";

import {
  useActiveChannelsAndScreens,
  useIsActive,
  useExpandAll,
  useFilterValue,
  useUsers,
} from "../context/CPData";

import useDebounce from "../lib/hooks/useDebounce";

import LiveStats from "./LiveStats";

const Header = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  let debouncedSearchInput: string = useDebounce<string>(searchInput, 500);

  const [openMore, setOpenMore] = useState<boolean>(false);

  const { activeChannels, activeScreens } = useActiveChannelsAndScreens();

  const { expandAll, setExpandAll } = useExpandAll();
  const { setFilterValue } = useFilterValue();
  const { isActive, setIsActive } = useIsActive();
  const users = useUsers();

  const activeUsersCount = useMemo(
    () =>
      users?.reduce(
        (acc, user) => acc + (user.onlineScreensCount > 0 ? 1 : 0),
        0
      ),
    [users]
  );

  useEffect(() => {
    setFilterValue(debouncedSearchInput);
  }, [debouncedSearchInput]);

  const onExpandAll = useCallback(() => {
    setExpandAll((prevState) => !prevState);
  }, []);

  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }, []);

  return (
    <header className="d-flex flex-column flex-xl-row bg-dark-blue p-3">
      <div className="col-12 col-xl-4 col-xxl-5 d-flex flex-row justify-content-between justify-content-xl-start ps-2">
        <div className="col-3  d-flex align-items-center">
          <Icons.Logo className="logo" color="#ffffff" />
        </div>
        <div className="d-flex text-disabled">
          <div className="d-flex">
            <Icons.Screen className="screen" color="#ABB6BC" />
            <div className="d-flex flex-column justify-content-center ps-2">
              <div className="fs-x-small mb-1 text-nowrap">Screens active</div>
              <span className="fs-x-large font-weight-bold text-white">
                {activeScreens}
              </span>
            </div>
          </div>
          <div className="d-flex ms-4 me-2">
            <Icons.Channel className="channel" color="#ABB6BC" />
            <div className="d-flex flex-column justify-content-center ps-2">
              <div className="fs-x-small mb-1 text-nowrap">Channels active</div>
              <span className="fs-x-large font-weight-bold text-white">
                {activeChannels}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-xl-8 col-xxl-7 d-flex flex-column flex-md-row justify-content-end align-items-center pt-3 pt-xl-0 ps-2">
        <div className="d-flex w-100">
          <div className="header__search flex-grow-1 position-relative pe-2 pe-md-4 me-md-4">
            <input
              className="w-100 rounded border-0 px-3 font-weight-medium fs-large text-dark-blue"
              placeholder="Search"
              value={searchInput}
              onChange={onSearch}
            />
            <div className="me-2 position-absolute top-0 end-0 p-2 h-100 d-flex align-items-center">
              {!!debouncedSearchInput ? (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSearchInput("");
                  }}
                >
                  <Icons.Close className="close me-1 me-sm-3" color="#2e4858" />
                </span>
              ) : (
                <Icons.Search className="search me-1 me-sm-3" color="#2e4858" />
              )}
            </div>
          </div>
          <button
            className="header__button text-uppercase text-dark-blue font-weight-bold me-3 px-3 rounded"
            onClick={onExpandAll}
          >
            {!expandAll ? (
              <>
                <Icons.Expand className="expand me-2" color="#2e4858" />
                <span>Expand</span>
              </>
            ) : (
              <>
                <Icons.Collapse className="collapse-all me-2" color="#2e4858" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
        <div className="col-12 col-sm-auto position-relative d-flex justify-content-between pt-3 pt-md-0 align-self-end">
          <div className="header__switch d-flex pe-4 me-4">
            <button
              className={clsx(
                "text-uppercase text-dark-blue font-weight-bold px-3 w-50 rounded-start",
                { active: !isActive }
              )}
              onClick={() => {
                setIsActive(false);
              }}
            >
              <div>
                All <div className="fs-x-small">{users?.length || 0}</div>
              </div>
            </button>
            <button
              className={clsx(
                "text-uppercase text-dark-blue font-weight-bold px-3 w-50 rounded-end",
                { active: isActive }
              )}
              onClick={() => {
                setIsActive(true);
              }}
            >
              <div>
                Active <div className="fs-x-small">{activeUsersCount}</div>
              </div>
            </button>
          </div>
          <LiveStats />
          <button
            className="ms-3 p-0"
            onClick={() => {
              setOpenMore(true);
            }}
          >
            <Icons.More className="header-more" color="#ffffff" />
          </button>
          {openMore && (
            <>
              <div
                className="header__backdrop"
                onClick={() => {
                  setOpenMore(false);
                }}
              ></div>
              <div className="header__more">
                <div>
                  <Icons.Cancel className="cancel me-2 pb-1" color="#2e4858" />
                  Kill all players
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
