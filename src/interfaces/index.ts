export interface IUserType {
  _id: string;
  clerkUserId: string;
  name: string;
  email: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
}

export interface IChatType {
  _id: string;
  users: IUserType[];
  createdBy: IUserType;
  lastMessage: IMessageType;
  isGroupChat: boolean;
  groupName: string;
  groupProfilePicture: string;
  groupBio: string;
  groupAdmins: IUserType[];
  unreadCounts: Record<string, number>;
  createdAt: string;
  updatedAt: string;
}

export interface IMessageType {
  _id: string;
  socketMessageId: string;
  chat: IChatType;
  sender: IUserType;
  text: string;
  image: string;
  readBy: IUserType[];
  createdAt: string;
  updatedAt: string;
}
