// File: src/components/CalculatorForm.jsx
import React from 'react';
import styles from './CalculatorForm.module.css';
/**

CalculatorForm Component

Purpose: Render all input controls (sliders) for the ROI calculator
Props: inputs - Object containing all input values and setters from useROICalculator
*/

export const CalculatorForm = ({ inputs }) => {
const {
agentCount, setAgentCount,
monthlyTickets, setMonthlyTickets,
avgHandleTime, setAvgHandleTime,
hourlyWage, setHourlyWage,
aiCostPerTicket, setAiCostPerTicket,
timeReduction, setTimeReduction,
fcrImprovement, setFcrImprovement,
escalationCost, setEscalationCost
} = inputs;
return (
<div className={styles.formContainer}>
<h2 className={styles.formTitle}>Your Support Metrics</h2>
<p className={styles.formSubtitle}>
Adjust these values to match your team. Defaults are based on industry benchmarks.
</p>
  {/* PRIMARY INPUTS */}
  <div className={styles.section}>
    <h3 className={styles.sectionTitle}>Team & Volume</h3>
    
    <div className={styles.formGroup}>
      <label className={styles.label}>
        <span className={styles.labelText}>Current Agent Count</span>
        <span className={styles.labelValue}>{agentCount} agents</span>
      </label>
      <input
        type="range"
        min="10"
        max="500"
        step="5"
        value={agentCount}
        onChange={(e) => setAgentCount(Number(e.target.value))}
        className={styles.slider}
      />
      <div className={styles.helperText}>
        How many support agents are on your team?
      </div>
    </div>

    <div className={styles.formGroup}>
      <label className={styles.label}>
        <span className={styles.labelText}>Monthly Ticket Volume</span>
        <span className={styles.labelValue}>{monthlyTickets.toLocaleString()} tickets</span>
      </label>
      <input
        type="range"
        min="1000"
        max="100000"
        step="1000"
        value={monthlyTickets}
        onChange={(e) => setMonthlyTickets(Number(e.target.value))}
        className={styles.slider}
      />
      <div className={styles.helperText}>
        Industry average: ~200 tickets per agent per month
      </div>
    </div>
  </div>

  <div className={styles.section}>
    <h3 className={styles.sectionTitle}>Current Performance</h3>
    
    <div className={styles.formGroup}>
      <label className={styles.label}>
        <span className={styles.labelText}>Average Handle Time</span>
        <span className={styles.labelValue}>{avgHandleTime} minutes</span>
      </label>
      <input
        type="range"
        min="5"
        max="60"
        step="1"
        value={avgHandleTime}
        onChange={(e) => setAvgHandleTime(Number(e.target.value))}
        className={styles.slider}
      />
      <div className={styles.helperText}>
        SaaS benchmark: 12-18 minutes (Zendesk 2024)
      </div>
    </div>

    <div className={styles.formGroup}>
      <label className={styles.label}>
        <span className={styles.labelText}>Agent Hourly Wage</span>
        <span className={styles.labelValue}>${hourlyWage}/hour</span>
      </label>
      <input
        type="range"
        min="15"
        max="50"
        step="1"
        value={hourlyWage}
        onChange={(e) => setHourlyWage(Number(e.target.value))}
        className={styles.slider}
      />
      <div className={styles.helperText}>
        Fully loaded cost (includes benefits: base × 1.4)
      </div>
    </div>
  </div>

  <div className={styles.section}>
    <h3 className={styles.sectionTitle}>AI Performance</h3>
    
    <div className={styles.formGroup}>
      <label className={styles.label}>
        <span className={styles.labelText}>Expected Time Reduction</span>
        <span className={styles.labelValue}>{(timeReduction * 100).toFixed(0)}%</span>
      </label>
      <input
        type="range"
        min="0.20"
        max="0.80"
        step="0.05"
        value={timeReduction}
        onChange={(e) => setTimeReduction(Number(e.target.value))}
        className={styles.slider}
      />
      <div className={styles.helperText}>
        Industry range: 35-60% (Forrester 2024 CS Report)
      </div>
    </div>

    <div className={styles.formGroup}>
      <label className={styles.label}>
        <span className={styles.labelText}>AI Cost per Ticket</span>
        <span className={styles.labelValue}>${aiCostPerTicket.toFixed(3)}</span>
      </label>
      <input
        type="range"
        min="0.01"
        max="0.10"
        step="0.01"
        value={aiCostPerTicket}
        onChange={(e) => setAiCostPerTicket(Number(e.target.value))}
        className={styles.slider}
      />
      <div className={styles.helperText}>
        Based on Block 6 Copilot deployment (2,500 tokens avg)
      </div>
    </div>
  </div>

  {/* ADVANCED INPUTS */}
  <details className={styles.advancedSection}>
    <summary className={styles.advancedToggle}>
      Advanced Metrics (Quality Improvement Value)
    </summary>
    
    <div className={styles.section}>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          <span className={styles.labelText}>First Contact Resolution Improvement</span>
          <span className={styles.labelValue}>{(fcrImprovement * 100).toFixed(0)}%</span>
        </label>
        <input
          type="range"
          min="0.05"
          max="0.30"
          step="0.01"
          value={fcrImprovement}
          onChange={(e) => setFcrImprovement(Number(e.target.value))}
          className={styles.slider}
        />
        <div className={styles.helperText}>
          AI improves FCR by reducing need for escalations (Forrester: 10-20%)
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          <span className={styles.labelText}>Cost per Escalation</span>
          <span className={styles.labelValue}>${escalationCost}</span>
        </label>
        <input
          type="range"
          min="30"
          max="150"
          step="5"
          value={escalationCost}
          onChange={(e) => setEscalationCost(Number(e.target.value))}
          className={styles.slider}
        />
        <div className={styles.helperText}>
          L2 agent cost × avg 45 min handling (3× base handle time)
        </div>
      </div>
    </div>
  </details>

  {/* BENCHMARK NOTICE */}
  <div className={styles.benchmarkNotice}>
    <svg className={styles.infoIcon} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
    <div className={styles.benchmarkText}>
      <strong>Industry Benchmarks:</strong> Defaults are based on Forrester 2024 
      Customer Service Report and Zendesk 2024 Benchmark Data. Conservative 
      estimates ensure credibility in CFO presentations.
    </div>
  </div>
</div>
);
};