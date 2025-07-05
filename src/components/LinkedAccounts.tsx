import React, { useState } from "react";
import zelle_logo from '../assets/zelle_logo.png'
import cashapp_logo from '../assets/cashapp_logo.png'
import venmo_logo from '../assets/venmo_logo.png'


export function LinkedAccounts() {
  const [linkedAccounts, setLinkedAccounts] = useState([
    { name: "Venmo", logo: venmo_logo },
    { name: "Zelle", logo: zelle_logo },
    { name: "CashApp", logo: cashapp_logo },
  ]);

  const [newAccountName, setNewAccountName] = useState("");
  const [showNewAccountInput, setShowNewAccountInput] = useState(false);

  const [accountToRemove, setAccountToRemove] = useState("");

  const addNewAccount = () => {
    if (newAccountName.trim()) {
      setLinkedAccounts([
        ...linkedAccounts,
        {
          name: newAccountName,
          logo: "https://via.placeholder.com/40", // Placeholder logo
        },
      ]);
      setNewAccountName("");
      setShowNewAccountInput(false);
    }
  };

  const removeAccount = () => {
    if (accountToRemove) {
      setLinkedAccounts(linkedAccounts.filter((account) => account.name !== accountToRemove));
      setAccountToRemove("");
    }
  };

  return (
    <div className="col-span-2">
      <h3 className="text-lg font-semibold mb-4">Linked Accounts</h3>
      <ul className="space-y-4">
        {linkedAccounts.map((account, index) => (
          <li key={index} className="flex items-center space-x-4">
            <img src={account.logo} alt={account.name} className="h-8 w-8" />
            <span className="text-gray-700">{account.name}</span>
          </li>
        ))}
      </ul>

      {/* Link New Account Button */}
      <div className="mt-6">
        {!showNewAccountInput && (
          <button
            onClick={() => setShowNewAccountInput(true)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Link New Account
          </button>
        )}
        {showNewAccountInput && (
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="text"
              placeholder="Account Name"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={addNewAccount}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add
            </button>
            <button
              onClick={() => setShowNewAccountInput(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Remove Account Section */}
      <div className="mt-6">
        <div className="flex items-center space-x-2">
          <select
            value={accountToRemove}
            onChange={(e) => setAccountToRemove(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="">Select Account to Remove</option>
            {linkedAccounts.map((account, index) => (
              <option key={index} value={account.name}>
                {account.name}
              </option>
            ))}
          </select>
          <button
            onClick={removeAccount}
            disabled={!accountToRemove}
            className={`px-4 py-2 rounded-md text-white ${
              accountToRemove ? "bg-red-500 hover:bg-red-600" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Remove Account
          </button>
        </div>
      </div>
    </div>
  );
}
