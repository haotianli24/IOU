import React, { useState } from "react";
import { Clock, Bell, Star, CircleDollarSign } from "lucide-react";
import terris from "../../assets/terris.jpeg"
import daniellec from "../../assets/daniellec.jpeg"
import vee from "../../assets/vee.png"
import deshae from "../../assets/deshae.png"
import taylor from "../../assets/taylor.png"
import lori from "../../assets/lori.png"
import amrutha from "../../assets/amrutha.png"
import rich from "../../assets/rich.png"
import obi from "../../assets/obi.png"
import ma from "../../assets/ma'chae.png"
import andre from "../../assets/andre.png"
import VenmoIcon from '../../assets/venmo_logo.png'; // Assuming you have SVG files for the icons
import ZelleIcon from '../../assets/zelle_logo.png';









// Mock transaction data (for demonstration purposes)
const mockTransactions = [
  {
    id: 1,
    name: "Danielle Valcarcel",
    amount: 800,
    date: "2024-03-15",
    isOwed: true,
    description: "New iPad",
    status: "pending",
    reliability: 9,
    profilePic: daniellec,
    daysAgo: 3, // Hardcoded days ago
    daysAgoColor: "text-gradient2", // Color for "days ago"
  },
  {
    id: 2,
    name: "Terris Johnson",
    amount: 999,
    date: "2024-03-10",
    isOwed: true,
    description: "Apex Premium Battle Pass",
    status: "pending",
    reliability: 98,
    profilePic: terris,
    daysAgo: 5, // Hardcoded days ago
    daysAgoColor: "text-gradient3", // Color for "days ago"
  },
  {
    id: 3,
    name: "Lori Smith",
    amount: 120,
    date: "2024-02-25",
    isOwed: true,
    description: "Cat Food",
    status: "pending",
    reliability: 2,
    profilePic: lori,
    daysAgo: 10, // Hardcoded days ago
    daysAgoColor: "text-gradient4", // Color for "days ago"
  },
  {
    id: 4,
    name: "Taylor Newton",
    amount: 285,
    date: "2024-02-25",
    isOwed: true,
    description: "Babysitting",
    status: "pending",
    reliability: 95,
    profilePic: taylor,
    daysAgo: 15, // Hardcoded days ago
    daysAgoColor: "text-gradient5", // Color for "days ago"
  },{
    id: 5,
    name: "Vee Denis",
    amount: 35,
    date: "2024-02-25",
    isOwed: false,
    description: "SnackMagic Box",
    status: "pending",
    reliability: 99,
    profilePic: vee,
    daysAgo: 2, // Hardcoded days ago
    daysAgoColor: "text-gradient1", // Color for "days ago"
  },
  {
    id: 6,
    name: "Amrutha Obbineni",
    amount: 25,
    date: "2024-02-25",
    isOwed: false,
    description: "Shark Plushie",
    status: "pending",
    reliability: 90,
    profilePic: amrutha,
    daysAgo: 6, // Hardcoded days ago
    daysAgoColor: "text-gradient3", // Color for "days ago"
  },
  {
    id: 7,
    name: "Rich Fairbank",
    amount:1000,
    date: "2024-02-25",
    isOwed: false,
    description: "Company Taxes",
    status: "pending",
    reliability: 80,
    profilePic: rich,
    daysAgo: 9, // Hardcoded days ago
    daysAgoColor: "text-gradient4", // Color for "days ago"
  },
  {
    id: 8,
    name: "Deshae Coleman",
    amount: 180,
    date: "2024-02-25",
    isOwed: false,
    description: "Pink Jacket",
    status: "pending",
    reliability: 80,
    profilePic: deshae,
    daysAgo: 28, // Hardcoded days ago
    daysAgoColor: "text-gradient6", // Color for "days ago"
  },
];


export function DebtSummary() {
  const [remindPopupVisible, setRemindPopupVisible] = useState(false);
  const [payNowPopupVisible, setPayNowPopupVisible] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Venmo');
  const [paymentPopupVisible, setPaymentPopupVisible] = useState(false);



  // Separate transactions based on whether they owe you or you owe them
  const owesYou = mockTransactions.filter((t) => t.isOwed);
  const youOwe = mockTransactions.filter((t) => !t.isOwed);
  const handleRemindClick = () => {
    setRemindPopupVisible(true);
    setTimeout(() => {
      setRemindPopupVisible(false);
    }, 3000); // Hide the popup after 3 seconds
  };

  const handlePayNowClick = () => {
    setPayNowPopupVisible(true);
  };

  const handlePaymentSubmit = () => {
   // Process the payment here
    setPayNowPopupVisible(false);
    setPaymentPopupVisible(true);
    setTimeout(() => {
      setPaymentPopupVisible(false);
    }, 4000); // Hide the popup after 3 seconds
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Owes You Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-4xl font-extrabold text-gray-800 mb-8">Owe U</h3>
        <div className="space-y-4">
          {owesYou.map((transaction) => (
            <div key={transaction.id} className="bg-white border p-4 rounded-lg shadow-sm">
              {/* Top Row: Profile + Name + Amount */}
              <div className="flex justify-between items-start mb-2">
                {/* Left Section: Profile Pic & Name */}
                <div className="flex justify-center items-center ml-3">
                  <img
                    src={transaction.profilePic}
                    alt={transaction.name}
                    className="w-20 h-20 rounded-full object-cover mr-6 mt-1"
                  />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 leading-tight">
                      {transaction.name}
                    </p>
                    {/* Reliability Score */}
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Star size={16} className="text-yellow-500 mr-1" />
                      <span>{transaction.reliability}% Reliability</span>
                    </div>
                    {/* Description */}
                    <p className="text-med text-gray-600">{transaction.description}</p>
                  </div>
                </div>

                <div className="text-right">
  <p
                      className={`font-bold text-2xl ${
                        transaction.isOwed ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.isOwed ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </p>
                    <div className={`flex items-center text-med mt-1 justify-end ${transaction.daysAgoColor}`}>
                      <Clock size={14} className="mr-1" />
                      <span>{transaction.daysAgo} days ago</span>
                    </div>
                  {/* Bottom Row: Remind Button */}
                  <div className="flex items-center text-xs mt-2 justify-end">
                    <button onClick={handleRemindClick} className="flex items-center space-x-1 text-sm text-white justify-end border border-middle-blue rounded px-2 py-1 bg-middle-blue hover:bg-blue-700 hover:border-blue-700 transition duration-300">
                      <Bell size={18} className="text-white" />
                      <span>Remind</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {remindPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-center">Reminder Sent</h3>
            <p className="text-gray-600">The user has been reminded.</p>
            <div className="flex justify-center">
              <button
              onClick={() => setRemindPopupVisible(false)}
              className="align-center mt-4 bg-middle-blue text-white px-4 py-2 rounded-md hover:bg-darker-blue transition"
              >
              Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* You Owe Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-4xl font-extrabold text-gray-800 mb-8">U Owe</h3>
        <div className="space-y-4">
          {youOwe.map((transaction) => (
            <div key={transaction.id} className="bg-white border p-4 rounded-lg shadow-sm">
              {/* Top Row: Profile + Name + Amount */}
              <div className="flex justify-between items-start mb-2">
                {/* Left Section: Profile Pic & Name */}
                <div className="flex justify-center items-center ml-3">
                  <img
                    src={transaction.profilePic}
                    alt={transaction.name}
                    className="w-20 h-20 rounded-full object-cover mr-6 mt-1"
                  />
                  <div>
                    <p className="text-2xl font-bold text-gray-900 leading-tight">
                      {transaction.name}
                    </p>
                    {/* Reliability Score */}
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Star size={16} className="text-yellow-500 mr-1" />
                      <span>{transaction.reliability}% Reliability</span>
                    </div>
                    {/* Description */}
                    <p className="text-med text-gray-600">{transaction.description}</p>
                  </div>
                </div>

                {/* Right Section: Amount & Days Ago */}
                <div className="text-right">
                  <p
                    className={`font-bold text-2xl ${
                      transaction.isOwed ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.isOwed ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </p>
                  <div
                    className={`flex items-center text-med mt-1 justify-end ${transaction.daysAgoColor}`}
                  >
                    <Clock size={14} className="mr-1" />
                    <span>{transaction.daysAgo} days ago</span>
                  </div>
                  {/* Bottom Row: Pay Button */}
                  <div className="flex items-center text-xs mt-2 justify-end">
                    <button onClick={handlePayNowClick} className="flex items-center space-x-1 text-sm text-white justify-end border border-middle-blue rounded px-2 py-1 bg-middle-blue hover:bg-blue-700 hover:border-blue-700 transition duration-300">
                      <CircleDollarSign size={18} className="text-white" />
                      <span>Pay Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {payNowPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-semibold text-center">Pay Now</h3>
            <form onSubmit={handlePaymentSubmit}>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <div className="mt-1">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter at least $1"
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <div className="mt-1">
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="p-2 border rounded w-full"
                  >
                    <option value="Venmo">
                      <div className="flex items-center">
                      <img src={VenmoIcon} alt="Venmo" className="w-5 h-5 mr-2" />
                      Venmo
                      </div>
                    </option>
                    <option value="Zelle">
                      <div className="flex items-center">
                      <img src={ZelleIcon} alt="Zelle" className="w-5 h-5 mr-2" />
                      Zelle
                      </div>
                    </option>
                    <option value="Venmo">
                      <div className="flex items-center">
                      <img src={VenmoIcon} alt="Venmo" className="w-5 h-5 mr-2" />
                      CashApp
                      </div>
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  type="button"
                  className="bg-middle-blue text-white px-4 py-2 rounded-md hover:bg-darker-blue transition"
                  onClick={() => {
                    if (paymentMethod === 'Venmo') {
                        window.location.href = 'https://venmo.com';
                    } else if (paymentMethod === 'Zelle') {
                        window.location.href = 'https://zellepay.com';
                    }
                }}
                >
                  Pay
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {paymentPopupVisible && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg mt-96 shadow-md w-96">
            <h3 className="text-lg font-semibold text-center text-green-700">
              Payment Successful
            </h3>
            <p className="text-gray-600 text-center mt-2">
              Your payment of ${customAmount || 'the full amount'} to {paymentMethod} has been logged.
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setPaymentPopupVisible(false)}
                className="bg-middle-blue text-white px-4 py-2 rounded-md hover:bg-darker-blue transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
