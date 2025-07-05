import React from 'react';
import { User, Calendar, Star, Bell, Clock } from 'lucide-react';

interface IOUCardProps {
  name: string;
  amount: number;
  date: string;
  isOwed: boolean;
  reliability: number;
  isPending: boolean;
  image?: string; // Optional image prop
}

export function IOUCard({ name, amount, date, isOwed, reliability, isPending, image }: IOUCardProps) {
  return (
    <div className="w-full md:w-6/6">
      <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-all transform hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Profile Picture or Default Icon */}
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
              {image ? (
                <img src={image} alt={`${name}'s profile`} className="w-full h-full object-cover" />
              ) : (
                <div className="bg-gray-100 p-2 rounded-full flex items-center justify-center h-full w-full">
                  <User className="text-gray-600" size={40} />
                </div>
              )}
            </div>
            {/* User Information */}
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400" size={16} />
                <span className="text-sm text-gray-600">{reliability}% Reliability</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar size={16} className="mr-2" />
                <span>{date}</span>
              </div>
            </div>
          </div>
          {/* Amount and Actions */}
          <div className="text-right">
            <span className={`text-lg font-bold ${isOwed ? 'text-green-600' : 'text-red-600'}`}>
              {isOwed ? '+' : '-'}${Math.abs(amount).toFixed(2)}
            </span>
            {isPending && (
              <div className="flex items-center text-orange-500 text-xs mt-1 justify-end">
                <Clock size={14} className="mr-1" />
                Pending
              </div>
            )}
            {isPending && (
              <div className="flex items-center text-xs mt-2 justify-end w-full">
                <button className="flex items-center space-x-1 text-xs text-white justify-end border border-middle-blue rounded px-2 py-1 bg-middle-blue hover:bg-blue-700 hover:border-blue-700 transition duration-300">
                  <Bell size={18} className="text-white" />
                  <span>Remind</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
