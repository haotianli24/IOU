import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getAuth, signOut } from "firebase/auth";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Upload, Key } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { LinkedAccounts } from "./LinkedAccounts";

// Helper to generate an array of random data ending in a specific final value
function generateDataWithFinalValue(length: number, finalValue: number) {
  // Generate random partial values, then ensure the last data point = finalValue
  const data = Array.from({ length: length - 1 }, () =>
    Math.floor(Math.random() * (finalValue * 0.8))
  );
  data.push(finalValue);
  return data;
}

function getLabels(range: string) {
  if (range === "week") return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  if (range === "month") return Array.from({ length: 30 }, (_, i) => `${i + 1}`);
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
}

function generateRandomPassword() {
  // Example random password generator
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let pwd = "";
  for (let i = 0; i < 8; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

export function ProfilePage() {
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Tracks the currently selected time range for each graph
  const [timeRanges, setTimeRanges] = useState({
    owed: "week",
    owe: "week",
    reliability: "week",
  });

  // We’ll store the final displayed values in state so that when we switch ranges,
  // new random values (and chart data) get generated
  const [finalOwed, setFinalOwed] = useState<number>(0);
  const [finalOwe, setFinalOwe] = useState<number>(0);
  const [finalReliability, setFinalReliability] = useState<number>(0);

  // Chart data state for each section
  const [owedData, setOwedData] = useState<number[]>([]);
  const [oweData, setOweData] = useState<number[]>([]);
  const [reliabilityData, setReliabilityData] = useState<number[]>([]);

  // Password management
  const [password, setPassword] = useState<string>(generateRandomPassword());
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");

  // Whenever a time range changes for one of the sections, regenerate data
  useEffect(() => {
    // For owed chart
    const lengthOwed = getLabels(timeRanges.owed).length;
    const randomFinalOwed = Math.floor(Math.random() * 5000 + 500); // e.g., 500 - 5500
    setFinalOwed(randomFinalOwed);
    setOwedData(generateDataWithFinalValue(lengthOwed, randomFinalOwed));

    // For owe chart
    const lengthOwe = getLabels(timeRanges.owe).length;
    const randomFinalOwe = Math.floor(Math.random() * 3000 + 300); // e.g., 300 - 3300
    setFinalOwe(randomFinalOwe);
    setOweData(generateDataWithFinalValue(lengthOwe, randomFinalOwe));

    // For reliability chart
    const lengthReliability = getLabels(timeRanges.reliability).length;
    // Reliability is typically 0-100, let’s keep 70-100 range to look “decent”
    const randomFinalReliability = Math.floor(Math.random() * 30 + 70);
    setFinalReliability(randomFinalReliability);
    setReliabilityData(
      generateDataWithFinalValue(lengthReliability, randomFinalReliability)
    );
  }, [timeRanges]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setProfilePic(fileReader.result as string);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleSavePassword = () => {
    // Save the new password
    setPassword(newPassword);
    setNewPassword("");
    setIsChangingPassword(false);
  };

  // Chart config builder
  const chartConfig = (color: string, labels: string[], data: number[]) => ({
    labels,
    datasets: [
      {
        label: "Value",
        data,
        borderColor: color,
        backgroundColor: `${color}40`,
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Profile Picture Section */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-teal"
          />
          <label
            htmlFor="upload-profile-pic"
            className="absolute bottom-0 right-0 bg-teal text-white p-2 rounded-full cursor-pointer"
          >
            <Upload size={18} />
          </label>
          <input
            id="upload-profile-pic"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
        <div>
          <h2 className="text-5xl font-bold">Daniel Kardhashi</h2>
          <p className="text-gray-600 text-xl">dkardhashi@gmail.com</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 bg-white shadow-md rounded-xl p-6">
  {/* Password Section */}
  <div className="col-span-1 bg-gray-50 rounded-lg shadow-sm p-4">
    <div className="flex items-center space-x-2 mb-4">
      <Key size={20} className="text-gray-600" />
      <h3 className="text-lg font-semibold">Password</h3>
    </div>
    {!isChangingPassword && (
      <div className="flex items-center justify-between">
        <span className="text-gray-700 font-mono">{password}</span>
        <button
          onClick={handleChangePassword}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Change Password
        </button>
      </div>
    )}
    {isChangingPassword && (
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleSavePassword}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Save
        </button>
      </div>
    )}
        <div className="mt-6 flex justify-end">
        <button
            onClick={() => {
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                console.log("User signed out successfully.");
                // Optionally redirect to a login page or show a message
                window.location.href = "/login"; // Change this to your login page route
                })
                .catch((error) => {
                console.error("Error signing out: ", error);
                });
            }}
            className="w-1/2 px-4 py-2 bg-teal text-white rounded-md hover:bg-darker-blue"
        >
            Sign Out
        </button>
        </div>

  </div>

  {/* Linked Accounts Section */}
  <div className="col-span-1 bg-gray-50 rounded-lg shadow-sm p-4">
    <LinkedAccounts />
  </div>
</div>
      {/* Graph Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Owed Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Total Balance Owed</h3>
              <p className="text-xl font-bold text-gray-700 mt-1">
                ${finalOwed.toLocaleString()}
              </p>
            </div>
            <select
              value={timeRanges.owed}
              onChange={(e) =>
                setTimeRanges((prev) => ({ ...prev, owed: e.target.value }))
              }
              className="border px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div className="h-72">
            <Line
              data={chartConfig(
                "#34d0d3",
                getLabels(timeRanges.owed),
                owedData
              )}
              options={chartOptions}
            />
          </div>
        </div>

        {/* You Owe Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Total Balance You Owe</h3>
              <p className="text-xl font-bold text-gray-700 mt-1">
                ${finalOwe.toLocaleString()}
              </p>
            </div>
            <select
              value={timeRanges.owe}
              onChange={(e) =>
                setTimeRanges((prev) => ({ ...prev, owe: e.target.value }))
              }
              className="border px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div className="h-72">
            <Line
              data={chartConfig("#f87171", getLabels(timeRanges.owe), oweData)}
              options={chartOptions}
            />
          </div>
        </div>

        {/* Reliability Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Reliability Score</h3>
              <p className="text-xl font-bold text-gray-700 mt-1">
                {finalReliability}%
              </p>
            </div>
            <select
              value={timeRanges.reliability}
              onChange={(e) =>
                setTimeRanges((prev) => ({
                  ...prev,
                  reliability: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          <div className="h-72">
            <Line
              data={chartConfig(
                "#facc15",
                getLabels(timeRanges.reliability),
                reliabilityData
              )}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
