import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { DebtSummary } from './components/Dashboard/DebtSummary';
import { IOUList } from './components/IOUList/IOUList';
import { NewIOUForm } from './components/NewIOU/NewIOUForm';
import { Homepage } from './components/Homepage/Homepage';
import { HistoryPage } from './components/History/HistoryPage'; 
import { FriendsList } from './components/IOUList/FriendsLIst';
import { SignupPage } from './components/SignUpPage';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';



function App() {

  const [user, setUser] = useState<User | null>(null); // Correctly type the state

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update state with User or null
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
      {user && <Header />}

        <main className="container mx-auto px-4 py-8 flex-grow">
          {/* Define Routes for each page */}
          <Routes>

            <Route path="/" element={<Homepage onGetStarted={() => {}} />} />
            <Route path="/dashboard" element={<><DebtSummary /><IOUList /></>} />
            <Route path="/new" element={<NewIOUForm />} />
            <Route path="/social" element={<FriendsList />} /> {/* Route to FriendsList */}
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} /> {/* SignupPage route */}
            <Route path="/profile" element={<ProfilePage />} /> {/* SignupPage route */}

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
