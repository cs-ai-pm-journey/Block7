// File: src/utils/pdfExport.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDFReport = (inputs, results, constants) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  const fmt = (value) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);

  const pct = (value) => `${(value * 100).toFixed(0)}%`;

  // Header
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('AI Copilot ROI Analysis', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });

  doc.setTextColor(0, 0, 0);

  // Executive Summary Box
  let yPos = 50;
  doc.setFillColor(209, 250, 229);
  doc.roundedRect(15, yPos, pageWidth - 30, 50, 3, 3, 'F');
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', 20, yPos + 10);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Annual Savings: ${fmt(results.annualSavings)}`, 20, yPos + 20);
  doc.text(`Break-Even: ${results.breakEvenMonths} months`, 20, yPos + 30);
  doc.text(`3-Year Net Value: ${fmt(results.year3NetValue)}`, 20, yPos + 40);

  // Key Metrics Table
  yPos = 110;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Metrics', 15, yPos);
  
  yPos += 5;
  doc.autoTable({
    startY: yPos,
    head: [['Metric', 'Value']],
    body: [
      ['Annual Labor Savings', fmt(results.laborSavings)],
      ['Escalation Cost Savings', fmt(results.escalationSavings)],
      ['Annual AI Operational Cost', fmt(results.totalAiCost)],
      ['Net Annual Savings', fmt(results.annualSavings)],
      ['Hours Saved Per Year', `${new Intl.NumberFormat('en-US').format(results.hoursSaved)} hrs`],
      ['FTE Equivalent', `${Math.round(results.hoursSaved / 2080)} FTE`],
    ],
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 },
    margin: { left: 15, right: 15 }
  });

  // PAGE 2
  doc.addPage();
  yPos = 20;
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Input Assumptions', 15, yPos);
  
  yPos += 10;
  doc.autoTable({
    startY: yPos,
    head: [['Input', 'Value', 'Industry Benchmark']],
    body: [
      ['Agent Count', `${inputs.agentCount} agents`, '-'],
      ['Monthly Tickets', `${inputs.monthlyTickets.toLocaleString()} tickets`, '~200/agent/month'],
      ['Avg Handle Time', `${inputs.avgHandleTime} minutes`, '12-18 min (Zendesk 2024)'],
      ['Hourly Wage', `$${inputs.hourlyWage}/hr`, 'Fully loaded cost'],
      ['Expected Time Reduction', pct(inputs.timeReduction), '35-60% (Forrester 2024)'],
      ['AI Cost per Ticket', `$${inputs.aiCostPerTicket.toFixed(3)}`, 'Based on GPT-4'],
      ['FCR Improvement', pct(inputs.fcrImprovement), '10-20% (Forrester 2024)'],
      ['Escalation Cost', `$${inputs.escalationCost}`, 'L2 agent cost × 45 min'],
      ['Implementation Cost', fmt(constants.implementationCost), 'One-time'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 9 },
    margin: { left: 15, right: 15 }
  });

  // 3-Year Projection Table
  yPos = doc.lastAutoTable.finalY + 15;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('3-Year Financial Projection', 15, yPos);
  
  yPos += 5;
  doc.autoTable({
    startY: yPos,
    head: [['Year', 'Annual Savings', 'Cumulative Value']],
    body: [
      ['Year 0', '-', fmt(-constants.implementationCost)],
      ['Year 1', fmt(results.annualSavings), fmt(results.year1NetValue)],
      ['Year 2', fmt(results.annualSavings), fmt(results.year2NetValue)],
      ['Year 3', fmt(results.annualSavings), fmt(results.year3NetValue)],
    ],
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 },
    columnStyles: {
      1: { halign: 'right' },
      2: { halign: 'right', fontStyle: 'bold' }
    },
    margin: { left: 15, right: 15 }
  });

  // Disclaimer
  yPos = doc.lastAutoTable.finalY + 15;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Methodology & Sources', 15, yPos);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  
  const disclaimerText = [
    'This ROI analysis uses conservative industry benchmarks from:',
    '• Forrester 2024 Customer Service Report (AI performance metrics)',
    '• Zendesk 2024 Benchmark Data (handle time averages)',
    '',
    'Assumptions are configurable and should be adjusted to match your',
    'specific team metrics. Results are estimates, not guarantees.'
  ];
  
  let disclaimerY = yPos + 5;
  disclaimerText.forEach(line => {
    doc.text(line, 15, disclaimerY);
    disclaimerY += 4;
  });

  const fileName = `roi-calculator-${inputs.agentCount}-agents-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};