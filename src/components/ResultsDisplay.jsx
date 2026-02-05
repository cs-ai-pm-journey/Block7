// File: src/components/ResultsDisplay.jsx
import React from 'react';
import styles from './ResultsDisplay.module.css';
import { SavingsChart } from './SavingsChart';
import { generatePDFReport } from '../utils/pdfExport';

/**
 * ResultsDisplay Component
 * 
 * Purpose: Show calculated ROI metrics in compelling, executive-friendly format
 * Props:
 * - results: Object containing all calculated metrics from useROICalculator
 * - constants: Object containing fixed values (implementation cost)
 */

export const ResultsDisplay = ({ results, constants, inputs }) => {
  const {
    annualSavings,
    hoursSaved,
    breakEvenMonths,
    currentAnnualCost,
    aiEnabledCost,
    laborSavings,
    escalationSavings,
    totalAiCost,
    year3NetValue
  } = results;

  const { implementationCost } = constants;

  // Format currency with thousand separators
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format numbers with thousand separators
  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0
    }).format(value);
  };

  // Determine if ROI is positive
  const isPositiveROI = annualSavings > 0;

  return (
    <div className={styles.resultsContainer}>
      {/* ============================================
          PRIMARY METRIC (Hero Number)
          ============================================ */}
      
      <div className={styles.heroMetric}>
        <div className={styles.heroLabel}>Annual Savings</div>
        <div className={`${styles.heroValue} ${isPositiveROI ? styles.positive : styles.negative}`}>
          {formatCurrency(annualSavings)}
        </div>
        <div className={styles.heroSubtext}>
          Net value after AI operational costs
        </div>
      </div>
           {/* PDF Download Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => generatePDFReport(inputs, results, constants)}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1e40af'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          📄 Download PDF Report
        </button>
      </div>

      {/* ============================================
          SECONDARY METRICS (Quick Wins)
          ============================================ */}
      
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>⏱️</div>
          <div className={styles.metricValue}>
            {formatNumber(hoursSaved)} hrs
          </div>
          <div className={styles.metricLabel}>
            Hours Saved Annually
          </div>
          <div className={styles.metricContext}>
            Equivalent to {Math.round(hoursSaved / 2080)} FTE
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📊</div>
          <div className={styles.metricValue}>
            {breakEvenMonths < 999 ? `${breakEvenMonths} mo` : 'N/A'}
          </div>
          <div className={styles.metricLabel}>
            Break-Even Timeline
          </div>
          <div className={styles.metricContext}>
            {breakEvenMonths < 999 
              ? `Investment recovered in ${breakEvenMonths} months`
              : 'Adjust inputs to achieve positive ROI'
            }
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>📈</div>
          <div className={styles.metricValue}>
            {formatCurrency(year3NetValue)}
          </div>
          <div className={styles.metricLabel}>
            3-Year Net Value
          </div>
          <div className={styles.metricContext}>
            Cumulative value after {formatCurrency(implementationCost)} implementation
          </div>
        </div>
      </div>

      {/* ============================================
          VALUE BREAKDOWN (Show Your Work)
          ============================================ */}
      
      <details className={styles.breakdownSection}>
        <summary className={styles.breakdownToggle}>
          Value Breakdown (Show Your Work)
        </summary>
        
        <div className={styles.breakdownGrid}>
          <div className={styles.breakdownItem}>
            <div className={styles.breakdownLabel}>Labor Savings</div>
            <div className={`${styles.breakdownValue} ${styles.positive}`}>
              + {formatCurrency(laborSavings)}
            </div>
            <div className={styles.breakdownExplanation}>
              Reduced handle time × hourly wage
            </div>
          </div>

          <div className={styles.breakdownItem}>
            <div className={styles.breakdownLabel}>Escalation Savings</div>
            <div className={`${styles.breakdownValue} ${styles.positive}`}>
              + {formatCurrency(escalationSavings)}
            </div>
            <div className={styles.breakdownExplanation}>
              Improved FCR reduces costly escalations
            </div>
          </div>

          <div className={styles.breakdownItem}>
            <div className={styles.breakdownLabel}>AI Operational Cost</div>
            <div className={`${styles.breakdownValue} ${styles.negative}`}>
              - {formatCurrency(totalAiCost)}
            </div>
            <div className={styles.breakdownExplanation}>
              Annual token/compute costs
            </div>
          </div>

          <div className={styles.breakdownItem}>
            <div className={styles.breakdownLabel}>Implementation Cost</div>
            <div className={`${styles.breakdownValue} ${styles.neutral}`}>
              - {formatCurrency(implementationCost)}
            </div>
            <div className={styles.breakdownExplanation}>
              One-time setup (amortized over 3 years)
            </div>
          </div>
        </div>
      </details>

      {/* ============================================
          COST COMPARISON
          ============================================ */}
      
      <div className={styles.comparisonSection}>
        <h3 className={styles.comparisonTitle}>Annual Cost Comparison</h3>
        
        <div className={styles.comparisonBars}>
          <div className={styles.comparisonBar}>
            <div className={styles.barLabel}>Current State</div>
            <div 
              className={`${styles.barFill} ${styles.barCurrent}`}
              style={{ width: '100%' }}
            >
              {formatCurrency(currentAnnualCost)}
            </div>
          </div>

          <div className={styles.comparisonBar}>
            <div className={styles.barLabel}>With AI Copilot</div>
            <div 
              className={`${styles.barFill} ${styles.barAI}`}
              style={{ 
                width: `${(aiEnabledCost / currentAnnualCost) * 100}%` 
              }}
            >
              {formatCurrency(aiEnabledCost)}
            </div>
          </div>
        </div>

        <div className={styles.savingsCallout}>
          <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>
            <strong>{((annualSavings / currentAnnualCost) * 100).toFixed(1)}% reduction</strong> in annual support costs
          </span>
        </div>
            </div>

      {/* 3-Year Cumulative ROI Chart */}
      <SavingsChart results={results} constants={constants} />
    </div>
  );
};