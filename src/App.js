import React, { useState, createContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Signup from './Screens/SignUp/Signup';
import Login from './Screens/Login/Login';
import Forgotpass from './Screens/Forgotpass/Forgotpass';
import Course from './Screens/Course/Course';
import Feedback from './Screens/Feedback/Feedback';
import Activity from './Screens/Activity/Activity';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ListActivity from './Screens/Activity/ListActivity';
import Home from './Screens/MainPage';
import NoMatch from './Screens/NoMatch';
export const ContextData = createContext();
function App() {
  const [userUid, setUserUid] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  async function getAutherUserDetails(userValue) {
    const auth = getAuth();
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email
        setUserUid(uid);
        setUserEmail(email)
      } else {
        console.log("User Not Authenticated")
        setUserUid(userValue);
      }
    });
  }
  return (
    <>
      <ContextData.Provider value={{
        userUid: userUid,
        getAutherUserDetails: getAutherUserDetails,
        userEmail: userEmail,
        setUserEmail: setUserEmail

      }}>
        {
          !userUid ?
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/VTechadmin" element={<Login />} />
              <Route path="/VTechadmin/sign" element={<Signup />} />
              <Route path="/VtechAdmin/ForgotPassword" element={<Forgotpass />} />
              <Route path="*" element={<NoMatch />} />
            </Routes> :
            <div className="App">
              {
                userUid &&
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="VTechadmin" element={<Home />} />
                  <Route path="Course" element={<Course />} />
                  <Route path="FeedBack" element={<Feedback />} />
                  <Route path="Activity" element={<Activity />} />
                  <Route path="Activity/listactivity" element={<ListActivity />} />
                  <Route path="*" element={<NoMatch />} />
                </Routes>
              }
            </div>
        }
      </ContextData.Provider>
    </>
  );
}

export default App;
