export interface NotificationAdapter {
  success(message: string, detail?: string): void;
  error(message: string, detail?: string): void;
  info(message: string, detail?: string): void;
  warn(message: string, detail?: string): void;
} 