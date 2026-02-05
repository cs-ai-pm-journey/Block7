// File: src/App.jsx
import React from 'react';
import './App.css';
import { useROICalculator } from './hooks/useROICalculator';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';

function App() {
  const { inputs, results, constants } = useROICalculator();

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>AI Copilot ROI Calculator</h1>
          <p className="subtitle">
            Stop pitching AI with buzzwords. Pitch it with math.
          </p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="hero-section">
            <h2>Calculate Your AI Investment Return</h2>
            <p>
              Model labor savings, quality improvements, and break-even timelines
              for AI-powered customer support automation.
            </p>
          </div>

          <div className="calculator-layout">
            <div className="calculator-column">
              <CalculatorForm inputs={inputs} />
            </div>
            
            <div className="calculator-column">
           <ResultsDisplay results={results} constants={constants} inputs={inputs} />
            </div>
          </div>

          <div className="benchmark-footer">
            <h3>Industry Benchmarks Used</h3>
            <ul>
              <li><strong>Handle Time Reduction:</strong> 35-60% (Forrester 2024)</li>
              <li><strong>FCR Improvement:</strong> 10-20% (Forrester 2024)</li>
              <li><strong>Average Handle Time:</strong> 12-18 min (Zendesk 2024)</li>
              <li><strong>AI Cost:</strong> $0.039 (Block 6 Copilot: 2,500 tokens avg)</li>
            </ul>
            <p className="benchmark-disclaimer">
              Defaults are conservative estimates. Adjust to match your metrics.
            </p>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>Built by Adam Saulters | Block 7, Week 2</p>
          <p className="footer-links">
            <a href="https://linkedin.com/in/adamsaulters">LinkedIn</a>
            {' • '}
            <a href="https://github.com/asaulters">GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;