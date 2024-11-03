import React from 'react';
import { Clock, ArrowDownToLine, ArrowUpToLine } from 'lucide-react';
import type { ConnectionState } from '../types';

interface ConnectionStatusProps {
  connection: ConnectionState;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function formatDuration(date: Date): string {
  const diff = new Date().getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

export function ConnectionStatus({ connection }: ConnectionStatusProps) {
  if (!connection.isConnected) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
      <h2 className="text-lg font-semibold mb-4">Connection Status</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Connected Time</p>
            <p className="font-medium">
              {connection.connectedSince ? formatDuration(connection.connectedSince) : '-'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ArrowDownToLine className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Downloaded</p>
            <p className="font-medium">{formatBytes(connection.bytesReceived)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ArrowUpToLine className="w-5 h-5 text-orange-500" />
          <div>
            <p className="text-sm text-gray-600">Uploaded</p>
            <p className="font-medium">{formatBytes(connection.bytesSent)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}