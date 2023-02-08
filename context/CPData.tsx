import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { useQuery } from "react-query";

import {
  countActiveChannels,
  mergeLiveData,
  transformRawChannelData,
  filterUsers,
} from "../lib/common";

const ControlPanelContext = React.createContext<IControlPanelContextValue>(
  null!
);

export const useControlPanelContext = () => useContext(ControlPanelContext);

export const useActiveChannelsAndScreens = () => {
  const { activeChannels, activeScreens } = useControlPanelContext();

  return { activeChannels, activeScreens };
};

export const useStats = () => {
  const { stats } = useControlPanelContext();

  return stats;
};

export const useFilteredUsers = () => {
  const { filteredUsers } = useControlPanelContext();

  return filteredUsers;
};

export const useUsers = () => {
  const { users } = useControlPanelContext();

  return users;
};

export const useExpandAll = () => {
  const { expandAll, setExpandAll } = useControlPanelContext();

  return { expandAll, setExpandAll };
};

export const useFilterValue = () => {
  const { filterValue, setFilterValue } = useControlPanelContext();

  return { filterValue, setFilterValue };
};

export const useIsActive = () => {
  const { isActive, setIsActive } = useControlPanelContext();

  return { isActive, setIsActive };
};

const defaultStats = {
  online: 0,
  offline: 0,
  notStarted: 0,
  playerVersions: [],
};

interface ControlPanelProviderProps {
  children: React.ReactNode;
}

const ControlPanelProvider = React.memo<ControlPanelProviderProps>(
  ({ children }) => {
    const [activeChannels, setActiveChannels] = useState<number>(0);
    const [activeScreens, setActiveScreens] = useState<number>(0);

    const [users, setUsers] = useState<IUser[]>([]); // MainObjects
    const [filterValue, setFilterValue] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<IUser[] | null>(null);

    const [isActive, setIsActive] = useState<boolean>(false);

    const [stats, setStats] = useState<IStats>(defaultStats);
    const [expandAll, setExpandAll] = useState<boolean>(false);

    useEffect(() => {
      const data = new FormData();
      data.append("id", "331");
      fetch("https://app.castit.nl/ajax/getRawChannelData", {
        method: "post",
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUsers(transformRawChannelData(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    useEffect(() => {
      if (users.length > 0) {
        setFilteredUsers(filterUsers(users, filterValue, isActive));
      }
    }, [filterValue, users, isActive]);

    const onSuccess = (data: ILiveData) => {
      const { liveUsers, liveStats } = mergeLiveData(data, users);

      setActiveChannels(countActiveChannels(data.sockets));
      setActiveScreens(liveStats.online);

      setUsers(liveUsers);
      setStats(liveStats);
    };

    useQuery(
      "live-data",
      async () => {
        const { data } = await axios.get(
          "https://socket.castit.nl/?read=1&what=all"
        );
        return data;
      },

      {
        enabled: !!users.length,
        refetchInterval: 1500,
        onSuccess,
        onError(err) {
          console.log(err);
        },
      }
    );

    const value = {
      activeChannels,
      activeScreens,
      stats,
      users,
      filteredUsers,
      expandAll,
      setExpandAll,
      filterValue,
      setFilterValue,
      isActive,
      setIsActive,
    };

    return (
      <ControlPanelContext.Provider value={value}>
        {children}
      </ControlPanelContext.Provider>
    );
  }
);

export { ControlPanelProvider };
