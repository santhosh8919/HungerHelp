import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
export const Home = () =>
{
    return( <>
    <main>
        <section>
            <div className="background-image">
                <img src="/images/food.jpeg" alt="surplus food management" width="1470" height="630"/>
            </div>
            <div className="heading-overlay">
                <h1>SURPLUS FOOD MANAGEMENT SYSTEM</h1>
            </div>
             {/* Our Activities Section */}
        <section className="activities-section">
          <h2 className="activities-heading">Our Activities</h2>
          <div className="slider-container">
            <div className="slider">
              <div className="slider-item">
                <img src="/images/Donate1.png" alt="Activity 1" />
              </div>
              <div className="slider-item">
                <img src="/images/Donate2.png" alt="Activity 2" />
              </div>
              <div className="slider-item">
                <img src="/images/Donate3.png" alt="Activity 3" />
              </div>
              <div className="slider-item">
                <img src="/images/Donate4.png" alt="Activity 4" />
              </div>
            </div>
          </div>
        </section>
        </section>
    </main>
    </>
    );
};