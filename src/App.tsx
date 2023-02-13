// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import "./App.css";

import avatar from "./images/avatar.png";
import twitch from "./images/twitch.png";
import steam from "./images/steam.png";
import upcoming from "./images/upcoming.png";
import library from "./images/library.png";
import controller from "./images/controller.png";
import assassins from "./images/assassins.png";
import sackboy from "./images/sackboy.png";
import spiderman from "./images/spiderman.png";

export default function App(): JSX.Element {
  return (
    <div>
      <main>
        <section className="glass">
          <div className="dashboard">
            <div className="user">
              <img src={avatar} alt="" />
              <h3>Simo Edwin</h3>
              <p>Pro Member</p>
            </div>
            <div className="links">
              <div className="link">
                <img src={twitch} alt="" />
                <h2>Streams</h2>
              </div>
              <div className="link">
                <img src={steam} alt="" />
                <h2>Games</h2>
              </div>
              <div className="link">
                <img src={upcoming} alt="" />
                <h2>New</h2>
              </div>
              <div className="link">
                <img src={library} alt="" />
                <h2>Library</h2>
              </div>
            </div>
            <div className="pro">
              <h2>Join pro for free games.</h2>
              <img src={controller} alt="" />
            </div>
          </div>
          <div className="games">
            <div className="status">
              <h1>Active Games</h1>
              <input type="text" />
            </div>
            <div className="cards">
              <div className="card">
                <img src={assassins} alt="" />
                <div className="card-info">
                  <h2>Assassins Creed Valhalla</h2>
                  <p>PS5 Version</p>
                  <div className="progress"></div>
                </div>
                <h2 className="percentage">60%</h2>
              </div>
              <div className="card">
                <img src={sackboy} alt="" />
                <div className="card-info">
                  <h2>Sackboy A Great Advanture</h2>
                  <p>PS5 Version</p>
                  <div className="progress"></div>
                </div>
                <h2 className="percentage">60%</h2>
              </div>
              <div className="card">
                <img src={spiderman} alt="" />
                <div className="card-info">
                  <h2>Spiderman Miles Morales</h2>
                  <p>PS5 Version</p>
                  <div className="progress"></div>
                </div>
                <h2 className="percentage">60%</h2>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="circle1"></div>
      <div className="circle2"></div>
    </div>
  );
}
