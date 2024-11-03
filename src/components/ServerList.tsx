import React from 'react';
import { Shield, ShieldAlert, Globe2, Signal, ArrowDownToLine, ArrowUpToLine } from 'lucide-react';
import type { VPNServer } from '../types';

interface ServerListProps {
  servers: VPNServer[];
  onConnect: (serverId: string) => void;
  activeServerId: string | null;
}

export function ServerList({ servers, onConnect, activeServerId }: ServerListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 w-full max-w-4xl">
      {servers.map((server) => (
        <div
          key={server.id}
          className={`bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg ${
            activeServerId === server.id ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-50 rounded-full">
                <Globe2 className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {server.city}, {server.country}
                </h3>
                <p className="text-sm text-gray-600">{server.ip}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <Signal className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">{server.ping}ms</span>
                </div>
                <div className="flex items-center space-x-2">
                  {server.status === 'online' ? (
                    <Shield className="w-4 h-4 text-green-500" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm font-medium capitalize">{server.status}</span>
                </div>
              </div>
              <button
                onClick={() => onConnect(server.id)}
                disabled={server.status === 'offline'}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeServerId === server.id
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } disabled:bg-gray-300 disabled:cursor-not-allowed`}
              >
                {activeServerId === server.id ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${server.load}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-600">Server Load</span>
              <span className="text-xs font-medium">{server.load}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}