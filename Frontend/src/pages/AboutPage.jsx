import React from "react";
import { Container } from "react-bootstrap";
import "../components/styles/AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-hero">
      <Container className="about-container">
        <h1 className="about-title">About NextStep</h1>
        <p className="about-subtitle" style={{ color: "blue" }} >
          Guiding students towards their dream careers.
        </p>

        <div className="about-sections">
          <section>
            <h2>🌟 Our Mission</h2>
            <p>
              NextStep helps students discover their ideal career paths
              through AI-powered recommendations and personalized guidance.
              We aim to make career choices simple, clear, and future-focused.
            </p>
          </section>

          <section>
            <h2>⚙️ How It Works</h2>
            <p>
              Our platform analyzes your skills, interests, and academic
              performance to match you with the most suitable career options.
              We combine data, AI, and expert knowledge to give you
              personalized recommendations.
            </p>
          </section>

          <section>
            <h2>👩‍🏫 The Team</h2>
            <p>
              Founded by career guidance experts and AI specialists, NextStep
              is dedicated to empowering students with clarity and confidence in
              shaping their futures.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
