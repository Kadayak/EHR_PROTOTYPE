import React from "react";
import "./HomePage.css";
import heroImage from "./images/bg_hero.jpg";
import featureImage1 from "./images/feature-image-1.jpg";
import featureImage2 from "./images/feature-image-2.jpg";
import featureImage3 from "./images/feature-image-3.jpg";

function HomePage() {
  return (
    <div className="HomePage">
      <section className="HeroSection">
        <div className="HeroCard">
          <div className="HeroCardContent">
            <h1>Welcome to our EHR System</h1>
            <p>Manage your health records easily and securely</p>
            <button>Get Started</button>
          </div>
          <div className="HeroCardImage" style={{ backgroundImage: `url(${heroImage})` }}></div>
        </div>
      </section>
      <section className="FeaturesSection">
        <div className="FeatureContainer">
          <div className="Card">
            <img src={featureImage1} alt="feature 1" className="CardImage" />
            <h2 className="CardTitle">Easy to Use</h2>
            <p className="CardDescription">Our system is user-friendly and easy to navigate, making it simple to manage your health records.</p>
            <button className="CardButton">Learn More</button>
          </div>
          <div className="Card">
            <img src={featureImage2} alt="feature 2" className="CardImage" />
            <h2 className="CardTitle">Secure and Private</h2>
            <p className="CardDescription">Your health records are stored securely and privately, with advanced encryption and security measures.</p>
            <button className="CardButton">Learn More</button>
          </div>
          <div className="Card">
            <img src={featureImage3} alt="feature 3" className="CardImage" />
            <h2 className="CardTitle">Accessible Anywhere</h2>
            <p className="CardDescription">With our system, you can access your health records from anywhere, at any time, using any device.</p>
            <button className="CardButton">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;