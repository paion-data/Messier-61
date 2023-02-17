// Copyright 2023 Paion Data. All rights reserved.
import React from "react";
import "./Home.css";

import { Link } from "react-router-dom";

import githubIcon from "./images/github-icon.png";
import docIcon from "./images/doc-icon.png";
import wikiIcon from "./images/wiki-icon.webp";
import knowledgeGraph from "./images/knowledge-graph.png";
import genshinImpact from "./images/genshin-impact.webp";

export default function App(): JSX.Element {
  return (
    <div>
      <main>
        <section className="glass">
          <div className="dashboard">
            <div className="user">
              <img src="https://paion-data.github.io/Messier-61/img/logo.svg" width="100px" alt="" />
              <h3>Messier 61</h3>
              <p>Next Generation of Wiki</p>
            </div>
            <div className="links">
              <div className="link">
                <img src={docIcon} width="40px" alt="" />
                <h2>Add</h2>
              </div>
              <div className="link">
                <img src={githubIcon} width="40px" alt="" />
                <a href="https://github.com/paion-data/Messier-61">
                  <h2>GitHub</h2>
                </a>
              </div>
              <div className="link">
                <img src={wikiIcon} width="40px" alt="" />
                <a href="https://paion-data.github.io/Messier-61/">
                  <h2>Help</h2>
                </a>
              </div>
            </div>
            <div className="pro">
              <h2>Knowledge Graph Based</h2>
              <img src={knowledgeGraph} width="120px" alt="" />
            </div>
          </div>
          <div className="games">
            <div className="status">
              <h1>Recent Wikis</h1>
              <input type="text" />
            </div>
            <div className="cards">
              <div className="card">
                <img src={genshinImpact} width="105px" alt="" />
                <div className="card-info">
                  <h2>Genshin Impact</h2>
                  <Link to={`wiki/gi`}>Gaming Strategy</Link>
                  <p></p>
                </div>
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
