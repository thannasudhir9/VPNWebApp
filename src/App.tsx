import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { ServerList } from './components/ServerList';
import { ConnectionStatus } from './components/ConnectionStatus';
import type { VPNServer, ConnectionState } from './types';

// Simulated VPN servers data
const mockServers: VPNServer[] = [
  {
    id: '1',
    country: 'Netherlands',
    city: 'Amsterdam',
    ip: '185.65.134.201',
    load: 45,
    ping: 23,
    status: 'online',
    protocol: 'OpenVPN'
  },
  {
    id: '2',
    country: 'United States',
    city: 'New York',
    ip: '156.146.38.163',
    load: 78,
    ping: 98,
    status: 'online',
    protocol: 'WireGuard'
  },
  {
    id: '3',
    country: 'Japan',
    city: 'Tokyo',
    ip: '45.76.148.229',
    load: 32,
    ping: 156,
    status: 'online',
    protocol: 'OpenVPN'
  },
  {
    id: '4',
    country: 'Germany',
    city: 'Frankfurt',
    ip: '194.156.98.214',
    load: 65,
    ping: 45,
    status: 'offline',
    protocol: 'WireGuard'
  }
];

function App() {
  const [servers, setServers] = useState<VPNServer[]>(mockServers);
  const [connection, setConnection] = useState<ConnectionState>({
    isConnected: false,
    serverId: null,
    bytesReceived: 0,
    bytesSent: 0,
    connectedSince: null
  });

  // Simulate data transfer when connected
  useEffect(() => {
    let interval: number;
    if (connection.isConnected) {
      interval = setInterval(() => {
        setConnection(prev => ({
          ...prev,
          bytesReceived: prev.bytesReceived + Math.floor(Math.random() * 100000),
          bytesSent: prev.bytesSent + Math.floor(Math.random() * 50000)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [connection.isConnected]);

  const handleConnect = (serverId: string) => {
    if (connection.serverId === serverId) {
      // Disconnect
      setConnection({
        isConnected: false,
        serverId: null,
        bytesReceived: 0,
        bytesSent: 0,
        connectedSince: null
      });
    } else {
      // Connect
      setConnection({
        isConnected: true,
        serverId,
        bytesReceived: 0,
        bytesSent: 0,
        connectedSince: new Date()
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="w-12 h-12 text-blue-500" />
              <h1 className="text-4xl font-bold">SecureVPN</h1>
            </div>
            <p className="text-gray-600 max-w-2xl">
              Connect to our secure VPN servers around the world for enhanced privacy and unrestricted access.
            </p>
          </div>

          {connection.isConnected && <ConnectionStatus connection={connection} />}
          
          <ServerList
            servers={servers}
            onConnect={handleConnect}
            activeServerId={connection.serverId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;