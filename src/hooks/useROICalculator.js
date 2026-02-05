// File: src/hooks/useROICalculator.js
import { useState, useEffect } from 'react';
/**

useROICalculator Hook

Purpose: Isolate ROI calculation logic from UI rendering

Why a custom hook?


Separation of concerns: Math logic ≠ UI rendering




Testability: Can unit test calculations without React




Reusability: Could use same logic in API endpoint
*/



export const useROICalculator = () => {
// ============================================
// INPUT STATE (What the user controls)
// ============================================
const [agentCount, setAgentCount] = useState(50);
const [monthlyTickets, setMonthlyTickets] = useState(10000);
const [avgHandleTime, setAvgHandleTime] = useState(15);
const [hourlyWage, setHourlyWage] = useState(28);
const [aiCostPerTicket, setAiCostPerTicket] = useState(0.04);
const [timeReduction, setTimeReduction] = useState(0.50);
const [fcrImprovement, setFcrImprovement] = useState(0.15);
const [escalationCost, setEscalationCost] = useState(75);
const [implementationCost] = useState(50000);
// ============================================
// OUTPUT STATE (Calculated results)
// ============================================
const [results, setResults] = useState({
annualSavings: 0,
hoursSaved: 0,
breakEvenMonths: 0,
currentAnnualCost: 0,
aiEnabledCost: 0,
laborSavings: 0,
escalationSavings: 0,
totalAiCost: 0,
year1NetValue: 0,
year2NetValue: 0,
year3NetValue: 0
});
// ============================================
// THE ROI CALCULATION ENGINE
// ============================================
useEffect(() => {
// Baseline (Current State)
const annualTickets = monthlyTickets * 12;
const avgTimeHours = avgHandleTime / 60;
const totalHoursPerYear = annualTickets * avgTimeHours;
const currentAnnualCost = totalHoursPerYear * hourlyWage;
// AI-Enabled State
const timeSavedPerTicket = avgTimeHours * timeReduction;
const hoursSavedPerYear = annualTickets * timeSavedPerTicket;
const laborSavings = hoursSavedPerYear * hourlyWage;

// Quality Improvement Value
const escalationsSavedPerYear = annualTickets * fcrImprovement;
const escalationSavings = escalationsSavedPerYear * escalationCost;

// AI Cost
const aiAnnualCost = annualTickets * aiCostPerTicket;

// Net Value
const totalValueCreated = laborSavings + escalationSavings;
const netSavings = totalValueCreated - aiAnnualCost;
const aiEnabledCost = currentAnnualCost - netSavings;

// Break-Even
const monthlySavings = netSavings / 12;
const breakEvenMonths = monthlySavings > 0 
  ? Math.ceil(implementationCost / monthlySavings)
  : 999;

// Multi-year Projections
const year1NetValue = netSavings - implementationCost;
const year2NetValue = year1NetValue + netSavings;
const year3NetValue = year2NetValue + netSavings;

setResults({
  annualSavings: netSavings,
  hoursSaved: hoursSavedPerYear,
  breakEvenMonths: breakEvenMonths,
  currentAnnualCost: currentAnnualCost,
  aiEnabledCost: aiEnabledCost,
  laborSavings: laborSavings,
  escalationSavings: escalationSavings,
  totalAiCost: aiAnnualCost,
  year1NetValue: year1NetValue,
  year2NetValue: year2NetValue,
  year3NetValue: year3NetValue
});
}, [
agentCount,
monthlyTickets,
avgHandleTime,
hourlyWage,
aiCostPerTicket,
timeReduction,
fcrImprovement,
escalationCost,
implementationCost
]);
return {
inputs: {
agentCount, setAgentCount,
monthlyTickets, setMonthlyTickets,
avgHandleTime, setAvgHandleTime,
hourlyWage, setHourlyWage,
aiCostPerTicket, setAiCostPerTicket,
timeReduction, setTimeReduction,
fcrImprovement, setFcrImprovement,
escalationCost, setEscalationCost
},
results,
constants: { implementationCost }
};
};