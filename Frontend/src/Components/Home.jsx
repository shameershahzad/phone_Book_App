import React from 'react';
import './Home.css';


function Home() {
  return (
    <>
      <div className="homeContainer">
        <div className="homeBox">
          <h2 className="homeTitle">📱 Welcome to SmartContact</h2>
          <p className="homeIntro">
            Easily manage your contacts in one safe and simple app. Add, edit, delete, or search contacts in just a few clicks!
          </p>

          <div className="homePoints">
            <h3 className="homeSubTitle">🔑 What You Can Do</h3>
            <ul>
              <li>➕ Add contacts with name, phone number, and address</li>
              <li>📋 View your entire contact list at any time</li>
              <li>🔍 Search by name, phone, or email instantly</li>
              <li>🔒 100% secure — only you can see your contacts</li>
            </ul>
          </div>

          <div className="homeNote">
            <p>🚀 Get started now using the navigation bar above.</p>
            <p>Your digital phone book is just one click away!</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
