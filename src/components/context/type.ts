export interface NotificationType {
  status: string;
  title: string;
  message: string;
}

export type Status = string;

export interface NotificationContextType {
  requestStatus: null | string;
  notification: null | NotificationType;
  setRequestStatus: (status: Status) => void;
}
