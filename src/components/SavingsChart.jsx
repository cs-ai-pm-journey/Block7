// File: src/components/SavingsChart.jsx

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import styles from './SavingsChart.module.css';

export const SavingsChart = ({ results, constants }) => {
  const {
    annualSavings,
    year1NetValue,
    year2NetValue,
    year3NetValue
  } = results;

  const { implementationCost } = constants;

  const chartData = [
    {
      year: 'Year 0',
      value: -implementationCost,
      displayValue: -implementationCost
    },
    {
      year: 'Year 1',
      value: year1NetValue,
      displayValue: year1NetValue
    },
    {
      year: 'Year 2',
      value: year2NetValue,
      displayValue: year2NetValue
    },
    {
      year: 'Year 3',
      value: year3NetValue,
      displayValue: year3NetValue
    }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const isNegative = value < 0;
      
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{payload[0].payload.year}</p>
          <p className={`${styles.tooltipValue} ${isNegative ? styles.negative : styles.positive}`}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0
            }).format(value)}
          </p>
          <p className={styles.tooltipDescription}>
            {isNegative ? 'Implementation Cost' : 'Cumulative Net Value'}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value) => {
    if (value === 0) return '$0';
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    if (value <= -1000000) return `-$${Math.abs(value / 1000000).toFixed(1)}M`;
    if (value <= -1000) return `-$${Math.abs(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const hasPositiveROI = year3NetValue > 0;

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>3-Year Cumulative Value</h3>
        <p className={styles.chartSubtitle}>
          Shows when you break even and total value created over time
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          
          <XAxis
            dataKey="year"
            tick={{ fill: '#6b7280', fontSize: 14 }}
            stroke="#9ca3af"
          />
          
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fill: '#6b7280', fontSize: 14 }}
            stroke="#9ca3af"
          />
          
          <ReferenceLine
            y={0}
            stroke="#374151"
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{
              value: 'Break-Even',
              position: 'right',
              fill: '#374151',
              fontSize: 12
            }}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px'
            }}
          />
          
          <Line
            type="monotone"
            dataKey="value"
            name="Cumulative Net Value"
            stroke={hasPositiveROI ? '#10b981' : '#ef4444'}
            strokeWidth={3}
            dot={{
              fill: '#fff',
              strokeWidth: 2,
              r: 6
            }}
            activeDot={{
              r: 8,
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className={styles.chartFooter}>
        <div className={styles.indicator}>
          <div className={`${styles.indicatorDot} ${styles.negative}`} />
          <span>Year 0: Initial Investment</span>
        </div>
        <div className={styles.indicator}>
          <div className={`${styles.indicatorDot} ${styles.positive}`} />
          <span>Years 1-3: Value Creation</span>
        </div>
      </div>

      {hasPositiveROI && (
        <div className={styles.insightCallout}>
          <svg className={styles.insightIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <strong>Key Insight:</strong> Your investment pays back in{' '}
            {results.breakEvenMonths < 999 ? `${results.breakEvenMonths} months` : 'under 1 year'}.
            By Year 3, you've created{' '}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0
            }).format(year3NetValue)}{' '}
            in cumulative value.
          </div>
        </div>
      )}
    </div>
  );
};