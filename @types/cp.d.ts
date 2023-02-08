interface IPlayerVersion {
  version: string;
  count: number;
}

interface IStats {
  online: number;
  offline: number;
  notStarted: number;
  playerVersions: IPlayerVersion[];
}

interface IControlPanelContextValue {
  activeChannels: number;
  activeScreens: number;
  stats: IStats;
  users: IUser[] | null;
  filteredUsers: IUser[] | null;
  expandAll: boolean;
  setExpandAll: React.Dispatch<React.SetStateAction<boolean>>;
  filterValue: string;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ISocket {
  now: number;
  max: number;
  activations: { [key: string]: string };
}

interface ISockets {
  [key: string]: ISocket;
}

type ScreenStatus = "ONLINE" | "OFFLINE" | "NOT-STARTED";

interface IScreen {
  screenName: string;
  activationCode: string;
  channelName: string;
  channelCode: string;
  version: string;
  system: {
    UpTime: string;
    Cron: "on" | "off";
    Memory: {
      Free: number;
      Total: number;
      Info: string;
    };
    OS: {
      Arch: string;
      Type: string;
      Info: string;
    };
  };
  status: ScreenStatus;
}

type TContract = "Free" | "Professional" | "Enterprise";

interface IUser {
  id: number;
  username: string;
  createdAt: string;
  companyName: string;
  contract: TContract;
  contact: string;
  note: string;
  totalScreensCount: number;
  onlineScreensCount: number;
  screens: IScreen[];
}

interface IRowChannelData {
  [key: string]: {
    MainObject: string;
    MainObjectID: number;
    Channel: {
      Code: string;
      Created: string;
      Name: string;
    };
    RegistredPlayers: string[];
  };
}

interface ILiveData {
  message: { [key: string]: any };
  screenInfo: { [key: string]: any };
  sockets: {
    [key: string]: {
      now: number;
      max: number;
      activations: { [key: string]: string };
    };
  };
}
interface IUsersTableData extends Omit<IUser, "screens"> {
  subRows: IScreen[];
  openMore: boolean;
}

interface IScreensTableData {
  screenName: string;
  activationCode: string;
  channelPlaying: string;
  uptime: string;
  player:
    | {
        version: string;
        browser: string;
        os: string;
      }
    | string;
  systemInfo:
    | {
        ram: string;
        disk: string;
        node: string;
        cron: "on" | "off";
      }
    | string;
  status: ScreenStatus;
  openMore: boolean;
}

interface ISvg {
  className?: string;
  color: string;
}
