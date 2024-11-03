export interface VPNServer {
  id: string;
  country: string;
  city: string;
  ip: string;
  load: number;
  ping: number;
  status: 'online' | 'offline';
  protocol: 'OpenVPN' | 'WireGuard';
}

export interface ConnectionState {
  isConnected: boolean;
  serverId: string | null;
  bytesReceived: number;
  bytesSent: number;
  connectedSince: Date | null;
}