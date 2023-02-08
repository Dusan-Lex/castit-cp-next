import dayjs from "dayjs";
import { groupBy, sortBy } from "lodash";
import { Row } from "react-table";

export const countActiveChannels = (sockets: ISockets) =>
  Object.values(sockets)
    .filter((socket) => socket.now > 0)
    .reduce((acc) => acc + 1, 0);

export const transformRawChannelData = (
  rawChannelData: IRowChannelData
): IUser[] =>
  Object.values(groupBy(Object.values(rawChannelData), "MainObjectID"))
    .map((user: any) => {
      return {
        id: user[0].MainObjectID,
        username: user[0].MainObject.trim(),
        createdAt: new Date(user[0].Channel.Created).toISOString(),
        companyName: "Test company", // to do
        contract: "Free" as TContract, // to do
        contact: "Test contact", // to do
        note: "Test note", // to do
        totalScreensCount: user.reduce(
          (acc: any, val: any) => acc + val.RegistredPlayers.length,
          0
        ),
        onlineScreensCount: 0,
        screens: user
          .map((channel) =>
            channel.RegistredPlayers.map((player) => {
              return {
                channelCode: channel.Channel.Code,
                channelName: channel.Channel.Name,
                activationCode: player,
                status: "NOT-STARTED",
              };
            })
          )
          .reduce((acc: any, val: any) => acc.concat(val), []),
      };
    })
    .filter((user) => user.totalScreensCount > 0);

export const mergeLiveData = (
  { message, screenInfo, sockets }: ILiveData,
  users: IUser[]
): { liveUsers: IUser[]; liveStats: IStats } => {
  let totalOnlineScreens = 0;
  let totalOfflineScreens = 0;
  let playerVersions: IPlayerVersion[] = [];

  const transformedUsers = users.map((user) => {
    const screens = user.screens.map((screen) => {
      if (message.hasOwnProperty(screen.channelCode)) {
        let screenName = "";
        let status: ScreenStatus = "OFFLINE";
        let system = null;
        let version = "";

        if (screenInfo.hasOwnProperty(screen.activationCode)) {
          system = screenInfo[screen.activationCode].SystemInfo.System;
          const pVersion = screenInfo[screen.activationCode].playerVersion;
          version =
            typeof pVersion === "string" || pVersion === undefined
              ? pVersion
              : pVersion.version;
        }

        if (
          sockets[screen.channelCode] &&
          sockets[screen.channelCode].now > 0 &&
          Object.values(sockets[screen.channelCode].activations).includes(
            screen.activationCode
          )
        ) {
          status = "ONLINE";
          totalOnlineScreens++;

          const i = playerVersions.findIndex(
            (playerVersion) => playerVersion.version === version
          );

          if (i > -1) {
            playerVersions[i].count++;
          } else {
            playerVersions.push({ version, count: 1 });
          }
        } else {
          totalOfflineScreens++;
        }

        return {
          ...screen,
          screenName,
          system,
          version,
          status,
        };
      }
      return screen;
    });

    const onlineScreensCount = screens.reduce(
      (acc, val) => acc + (val.status === "ONLINE" ? 1 : 0),
      0
    );

    return {
      ...user,
      screens,
      onlineScreensCount,
    };
  });

  const liveStats = {
    online: totalOnlineScreens,
    offline: totalOfflineScreens,
    notStarted:
      Object.values(users).reduce((acc, val) => acc + val.screens.length, 0) -
      totalOnlineScreens -
      totalOfflineScreens,
    playerVersions: sortBy(playerVersions, "version"),
  };

  return {
    liveUsers: transformedUsers,
    liveStats,
  };
};

export const sortUsernames = (prev: any, curr: any) => {
  if (
    prev.original.username?.toLowerCase() >
    curr.original.username?.toLowerCase()
  ) {
    return 1;
  }
  if (
    prev.original.username?.toLowerCase() <
    curr.original.username?.toLowerCase()
  ) {
    return -1;
  }
  return 0;
};

export const sortScreens = (prev: any, curr: any) => {
  if (prev.original.onlineScreensCount > curr.original.onlineScreensCount) {
    return -1;
  }
  if (prev.original.onlineScreensCount < curr.original.onlineScreensCount) {
    return 1;
  }
  if (prev.original.totalScreensCount > curr.original.totalScreensCount) {
    return -1;
  }
  if (prev.original.totalScreensCount < curr.original.totalScreensCount) {
    return 1;
  }
  return 0;
};

export const filterUsers = (
  rawUsers: IUser[],
  filter: string,
  isActive: boolean
) => {
  const users = isActive
    ? rawUsers.filter((user) => user.onlineScreensCount)
    : rawUsers;

  if (filter === "" || filter === null || filter === undefined) {
    return users;
  }

  const filterValue = filter.trim().toLowerCase();

  return users.filter((user: IUser) =>
    Object.values(user).some((value: string | number | IScreen[]) => {
      if (typeof value === "string")
        if (dayjs(value).isValid())
          return dayjs(value).format("DD.MM.YYYY.").includes(filterValue);
        else return value.toLocaleLowerCase().includes(filterValue);

      if (typeof value === "number")
        return value.toString().includes(filterValue);

      if (Array.isArray(value))
        return value.some((screen) =>
          Object.values(screen).some((screenValue: string | object) => {
            if (typeof screenValue === "string")
              return screenValue.toLocaleLowerCase().includes(filterValue);
            return false;
          })
        );
      return false;
    })
  );
};
