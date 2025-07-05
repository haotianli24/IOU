import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

import tswift from '../../assets/tswift.png';
import jen from '../../assets/jen.jpg';
import c1guy from '../../assets/c1guy.jpg';
import sam from '../../assets/sam.png';
import c1logo from '../../assets/c1logo.png';
import mark from '../../assets/mark.jpg';
import lebron from '../../assets/lebron.jpeg';
import mrw from '../../assets/mrw.jpg';
import terris from '../../assets/terris.jpeg';
import vee from '../../assets/vee.png';
import amrutha from '../../assets/amrutha.png';
import taylor from '../../assets/taylor.png';
import lori from '../../assets/lori.png';
import deshae from '../../assets/deshae.png'



const mockFriendRequestsData = [
  { id: 1, name: 'Taylor Swift', reliability: 9, amount: 500, date: '2024-03-15', isOwed: true, isPending: false, image: tswift },
  { id: 2, name: 'Jennifer Garner', reliability: 7, amount: 750, date: '2024-03-14', isOwed: true, isPending: true, image: jen },
  { id: 3, name: 'Samuel L. Jackson', reliability: 8, amount: -450, date: '2024-03-13', isOwed: false, isPending: false, image: sam },
  { id: 4, name: 'Capital One Guy', reliability: 6, amount: 300, date: '2024-03-12', isOwed: true, isPending: false, image: c1guy },
];

const mockSuggestionsData = [
  { id: 4, name: 'Mr. Wonderful', reliability: 6, amount: 300, date: '2024-03-12', isOwed: true, isPending: false, image: mrw },
  { id: 5, name: 'Mark Cuban', reliability: 7, amount: 200, date: '2024-03-11', isOwed: true, isPending: true, image: mark },
  { id: 6, name: 'Lebron James', reliability: 8, amount: 300, date: '2024-03-10', isOwed: false, isPending: false, image: lebron },
  { id: 7, name: 'Capital One Logo', reliability: 9, amount: 400, date: '2024-03-09', isOwed: true, isPending: false, image: c1logo },
];

const mockAllFriendsData = [
  { id: 4, name: 'Taylor Newton', reliability: 95, amount: 300, date: '2024-03-12', isOwed: true, isPending: false, image: taylor },
  { id: 5, name: 'Amrutha Obbineni', reliability: 90, amount: 200, date: '2024-03-11', isOwed: true, isPending: true, image: amrutha },
  { id: 6, name: 'Vee Denis', reliability: 99, amount: 300, date: '2024-03-10', isOwed: false, isPending: false, image: vee },
  { id: 7, name: 'Terris Johnson', reliability: 98, amount: 400, date: '2024-03-09', isOwed: true, isPending: false, image: terris },
];

const leaderboardData = [
  { name: 'Terris', score: 98, totalPaid: 500, onTimeRate: '95%' },
  { name: 'Vee', score: 99, totalPaid: 450, onTimeRate: '90%' },
  { name: 'Taylor', score: 95, totalPaid: 400, onTimeRate: '85%' },
  { name: 'Amrutha', score: 90, totalPaid: 350, onTimeRate: '80%' },
  { name: 'Lori', score: 85, totalPaid: 300, onTimeRate: '75%' },
  { name: 'Deshae', score: 80, totalPaid: 250, onTimeRate: '70%' },
];

export function FriendsList() {
  const [activeTab, setActiveTab] = useState<'friendRequests' | 'suggestions' | 'allFriends'>('allFriends');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState<'name' | 'rating' | 'amount'>('name');
  const [selectedFriend, setSelectedFriend] = useState<null | typeof mockAllFriendsData[0]>(null);

  // Filter and sort logic for 'All Friends'
  const filteredFriends = mockAllFriendsData.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFriends = filteredFriends.sort((a, b) => {
    if (sortCriteria === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === 'rating') {
      return b.reliability! - a.reliability!;
    } else {
      return b.amount! - a.amount!;
    }
  });

  const openProfile = (friend: typeof mockAllFriendsData[0]) => {
    setSelectedFriend(friend);
  };

  const closeProfile = () => {
    setSelectedFriend(null);
  };

  // Larger, square-ish boxes for All Friends, Suggestions, Friend Requests
  // (two columns, bigger images, bigger text)
  const renderFriendRequests = () => (
    <div className="grid grid-cols-2 gap-8">
      {mockFriendRequestsData.map((friend) => (
        <div
          key={friend.id}
          className="bg-white rounded-md shadow-md flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer w-[350px] h-[350px]"
          onClick={() => openProfile(friend)}
        >
          <img
            src={friend.image}
            alt={friend.name}
            className="w-40 h-40 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold">{friend.name}</h3>
          <div className="flex space-x-2 mt-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition text-sm">
              Confirm
            </button>
            <button className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition text-sm">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSuggestions = () => (
    <div className="grid grid-cols-2 gap-8">
      {mockSuggestionsData.map((friend) => (
        <div
          key={friend.id}
          className="bg-white rounded-md shadow-md flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer w-[350px] h-[350px]"
        >
          <img
            src={friend.image}
            alt={friend.name}
            className="w-40 h-40 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold">{friend.name}</h3>
          <button className="mt-4 bg-middle-blue text-white px-4 py-2 rounded-md hover:bg-darker-blue transition text-sm">
            Add Friend
          </button>
        </div>
      ))}
    </div>
  );

  const renderAllFriends = () => (
    <div className="grid grid-cols-2 gap-8">
      {sortedFriends.map((friend) => (
        <div
          key={friend.id}
          className="bg-white rounded-md shadow-md flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer w-[350px] h-[350px] p-4"
          onClick={() => openProfile(friend)}
        >
          <img
            src={friend.image}
            alt={friend.name}
            className="w-40 h-40 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold">{friend.name}</h3>
          <p className="text-lg text-gray-500">{friend.reliability}% Reliability</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex justify-start">
      {/* Friends Section */}
      <div className="w-1/2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Friends</h1>
          {/* Horizontal Navigation Bar */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('allFriends')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'allFriends' ? 'bg-middle-blue/80 text-white' : 'hover:bg-middle-blue/20'
                }`}
              >
                All Friends
              </button>
              <button
                onClick={() => setActiveTab('friendRequests')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'friendRequests' ? 'bg-middle-blue/80 text-white' : 'hover:bg-middle-blue/20'
                }`}
              >
                Friend Requests
              </button>
              <button
                onClick={() => setActiveTab('suggestions')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'suggestions' ? 'bg-middle-blue/80 text-white' : 'hover:bg-middle-blue/20'
                }`}
              >
                Suggestions
              </button>
            </div>
            <input
              type="text"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-3">
          {activeTab === 'allFriends' && renderAllFriends()}
          {activeTab === 'friendRequests' && renderFriendRequests()}
          {activeTab === 'suggestions' && renderSuggestions()}
        </div>
      </div>

      {/* Leaderboard Section */}
<div className="flex-shrink-0 w-[50%] bg-white rounded-lg shadow-md p-8 ml-8">
  <div className="flex items-center space-x-2 mb-8">
    <Trophy className="text-yellow-500" size={28} />
    <h3 className="text-2xl font-semibold">Reliability Score Leaderboard</h3>
  </div>

  {/* Podium for Top 3 */}
  <div className="flex justify-center items-end space-x-8 mb-10 relative mt-20">
    {leaderboardData.slice(0, 3).map((user, index) => {
      // Define podium order and styles (2nd, 1st, 3rd)
      const podiumOrder = [1, 0, 2]; // Podium positions: 2nd, 1st, 3rd
      const podiumIndex = podiumOrder[index];
      const place = podiumIndex + 1; // 1, 2, 3

      // Hardcoded images for the podium
      const podiumImages = [vee, terris, taylor]; // Images for 1st, 2nd, 3rd places

      const podiumColors = {
        1: 'bg-yellow-300', // 1st place
        2: 'bg-gray-300',   // 2nd place
        3: 'bg-orange-300', // 3rd place
      };

      const podiumHeights = {
        1: '300px', // 1st place tallest
        2: '220px', // 2nd place medium
        3: '140px', // 3rd place shorter
      };

      return (
        <div
          key={podiumIndex}
          className={`flex flex-col items-center justify-end ${podiumColors[place]} rounded-md`}
          style={{
            height: podiumHeights[place],
            width: '140px',
            position: 'relative',
          }}
        >
          {/* Profile Picture on Top */}
          <div
            style={{
              position: 'absolute',
              top: '-48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={podiumImages[podiumIndex]}
              alt={`Podium Place ${place}`}
              className="w-20 h-20 rounded-full object-cover border-4 border-white"
            />
            <span className="mt-2 text-xl font-bold text-middle-blue">#{place}</span>
            <h4 className="font-semibold text-lg">{user.name}</h4>
            <div className="text-base text-gray-600">{user.score}% Reliability</div>
          </div>
        </div>
      );
    })}
  </div>

  {/* Remaining Leaderboard Entries */}
  <div className="space-y-4">
    {leaderboardData.slice(3).map((user, index) => {
      const overallPlace = index + 4; // 4th onward

      // Hardcoded images for 4th, 5th, 6th places
      const remainingImages = [amrutha, lori, deshae]; // Replace with your specific images

      return (
        <div
          key={index + 3}
          className="flex items-center justify-between p-6 bg-gray-50 rounded-md"
        >
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-middle-blue">#{overallPlace}</span>
            {/* Larger profile pic, bigger text */}
            <img
              src={remainingImages[index] || terris} // Fallback to a default image
              alt={`Place ${overallPlace}`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="text-lg">
              <h4 className="font-semibold">{user.name}</h4>
              <div className="text-gray-600">{user.score}% Reliability</div>
            </div>
          </div>
          <div className="text-right text-lg">
            <div className="text-gray-600">Total Paid: ${user.totalPaid}</div>
          </div>
        </div>
      );
    })}
  </div>
</div>


    </div>
  );
}
