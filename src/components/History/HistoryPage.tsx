import React from "react";
import { Clock, Bell, Star } from "lucide-react";
import venmoIcon from "../../assets/venmo_logo.png";
import zelleIcon from "../../assets/zelle_logo.png";
import cashappIcon from "../../assets/cashapp_logo.png";
import terris from '../../assets/terris.jpeg'
import vee from '../../assets/vee.png'
import lori from '../../assets/lori.png'
import deshae from '../../assets/deshae.png'
import danielle from '../../assets/daniellec.jpeg'
import amrutha from '../../assets/amrutha.png'
import rich from '../../assets/rich.png'
import taylor from '../../assets/taylor.png'



interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  app: string;
  reliability: number;
  description: string;
  status: "paid" | "pending";
  profilePic: string;
}

const mockHistoryData: Transaction[] = [
  { id: 1, name: "Vee Denis", amount: 350, date: "2025-01-09", app: "Venmo", reliability: 99, description: "New SnackMagic Box", status: "paid", profilePic: vee },
  { id: 2, name: "Terris Johnson", amount: 870, date: "2025-01-08", app: "Zelle", reliability: 98, description: "Kahoot Bribes", status: "pending", profilePic: terris},
  { id: 3, name: "Lori Smith", amount: 400, date: "2025-01-07", app: "CashApp", reliability: 85, description: "Nintendo Switch", status: "paid", profilePic: lori },
  { id: 4, name: "Deshae Coleman", amount: 210, date: "2025-01-01", app: "CashApp", reliability: 80, description: "Dinner at Nobu", status: "paid", profilePic: deshae },
  { id: 5, name: "Rich Fairbank", amount: 65, date: "2024-12-30", app: "Zelle", reliability: 68, description: "Bunny Plushie", status: "pending", profilePic: rich },
  { id: 6, name: "Taylor Newton", amount: 90, date: "2024-12-28", app: "Venmo", reliability: 95, description: "New Arduino Kit", status: "pending", profilePic: taylor },
  { id: 7, name: "Amrutha Obbineni", amount: 55, date: "2024-12-15", app: "Venmo", reliability: 90, description: "Shark Pillow Pet", status: "paid", profilePic: amrutha },
  { id: 8, name: "Danielle Valcarcel", amount: 650, date: "2024-12-10", app: "Zelle", reliability: 9, description: "Mentor Sponsorship", status: "paid", profilePic: danielle },
];

const getAppIcon = (app: string) => {
  if (app === "Venmo") return venmoIcon;
  if (app === "Zelle") return zelleIcon;
  if (app === "CashApp") return cashappIcon;
  return undefined;
};

const formatDate = (date: string) => new Date(date).toLocaleDateString();

export function HistoryPage() {
  const pastWeek = mockHistoryData.slice(0, 3);
  const pastMonth = mockHistoryData.slice(3, 8);

  return (
    <div className="space-y-8">
      {/* Header */}
      <h2 className="text-3xl font-extrabold text-gray-800">Transaction History</h2>

      {/* Past Week Section */}
      <div>
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Past Week</h3>
        <div className="space-y-4">
          {pastWeek.map((transaction) => (
            <div key={transaction.id} className="flex items-center bg-white p-6 rounded-xl shadow-md">
              {/* Left Section: Profile Picture */}
              <img
                src = {transaction.profilePic}
                alt={transaction.name}
                className="w-20 h-20 rounded-full object-contain mr-5"
              />

              {/* Middle Section: Details */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{transaction.name}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <Star size={16} className="text-yellow-500 mr-1" />
                  {transaction.reliability}% Reliability
                </div>
                <p className="text-gray-600 text-sm">{transaction.description}</p>
              </div>

              {/* Right Section: Amount & Status */}
              <div className="text-right flex space-between">
                
                <img
                  src={getAppIcon(transaction.app)}
                  alt={transaction.app}
                  className="w-12 h-12 object-contain mr-4"
                />
                
                <div className="text-right">
                <p
                  className={`font-bold text-xl ${
                    transaction.status === "paid" ? "text-green-600" : "text-red-600"
                  }`}
                >

                  {transaction.status === "paid" ? "+" : " -"}${transaction.amount.toFixed(2)}
                </p>
                
                <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Month Section */}
      <div>
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Past Month</h3>
        <div className="space-y-4">
          {pastMonth.map((transaction) => (
            <div key={transaction.id} className="flex items-center bg-white p-6 rounded-xl shadow-md">
              {/* Left Section: Profile Picture */}
              <img
                src = {transaction.profilePic}
                alt={transaction.name}
                className="w-20 h-20 rounded-full object-contain mr-5"
              />

              {/* Middle Section: Details */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{transaction.name}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <Star size={16} className="text-yellow-500 mr-1" />
                  {transaction.reliability}% reliability
                </div>
                <p className="text-gray-600 text-sm">{transaction.description}</p>
              </div>

              {/* Right Section: Amount & Status */}
              <div className="text-right flex space-between">
                
                <img
                  src={getAppIcon(transaction.app)}
                  alt={transaction.app}
                  className="w-12 h-12 object-contain mr-4"
                />
                
                <div className="text-right">
                <p
                  className={`font-bold text-xl ${
                    transaction.status === "paid" ? "text-green-600" : "text-red-600"
                  }`}
                >

                  {transaction.status === "paid" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </p>
                
                <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
