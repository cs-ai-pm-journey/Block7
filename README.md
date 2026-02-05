AI Copilot ROI Calculator
Live Demo: https://roi-calculator-9l9k.onrender.com/ 
A production-ready React application that translates AI capabilities into CFO-ready business metrics. Built to help Directors justify AI adoption budgets by showing measurable ROI with industry-backed benchmarks.

The Problem
Support Directors want to adopt AI copilots but struggle to justify the investment to finance teams. They need to answer:

"How much will this actually save us?"
"When do we break even?"
"Can you prove the ROI?"

Generic vendor claims ("30% efficiency gains!") aren't enough. CFOs need concrete numbers tied to their specific team size and workload.

💡 The Solution
This calculator transforms AI capabilities into executive-ready financial analysis:
✅ Real-time ROI calculations - Adjust inputs, see results instantly
✅ Multi-variable modeling - Labor savings + quality improvements (FCR, escalations)
✅ Industry benchmarks - Cites Forrester 2024 and Zendesk 2024 data
✅ Visual storytelling - 3-year cumulative value chart showing break-even timeline
✅ PDF export - Downloadable reports for executive presentations
✅ Responsive design - Works on desktop, tablet, and mobile
Result: Directors can model scenarios like "What if we deploy AI to 50 agents handling 10K tickets/month?" and get defensible answers in seconds.

Key Features
1. Real-Time Calculations

10 configurable inputs (agent count, tickets, handle time, etc.)
Instant recalculation as sliders move
No page reloads, no waiting

2. Comprehensive ROI Model
Calculates:

Annual labor savings (time reduction × hourly wage)
Escalation cost savings (FCR improvement × escalation cost)
AI operational costs (tickets × AI cost per ticket)
Net annual savings
Break-even timeline
3-year cumulative value

3. Visual Impact

Hero metric: Annual Savings (large, impossible to miss)
3-year chart: Line graph showing trajectory from implementation cost to profit
Cost comparison: Before/after horizontal bars showing reduction
Value breakdown: Transparent calculation showing where savings come from

4. Credibility Features

Industry benchmark citations (Forrester 2024, Zendesk 2024)
Conservative default assumptions (50% time reduction, not 80%)
Helper text explaining each input
Methodology notes in PDF export

5. Executive-Ready PDF Export

2-page professional report
Cover page with executive summary
Detailed metrics tables
Input assumptions (so CFO can verify)
3-year projection
Sources and methodology


Technical Stack
LayerTechnologyWhy?FrontendReact 18 + ViteFast dev experience, modern toolingState ManagementCustom hooks (useState, useEffect)Lightweight, no over-engineeringStylingCSS ModulesScoped styles, no naming conflictsChartsRechartsDeclarative, responsive, industry standardPDF GenerationjsPDF + autoTableClient-side (no backend needed)DeploymentRender (Static Site)Free tier, auto-deploy from GitHub

Architecture Decisions
Why Custom Hook for State Management?
Decision: Built useROICalculator custom hook instead of Redux/Zustand.
Reasoning:

Calculator is single-page, single-user (no shared state across routes)
All calculations are synchronous (no async complexity)
Custom hook provides clean API: const { inputs, results, constants } = useROICalculator()
Easier to test in isolation

Trade-off: If we added multi-user collaboration or saved scenarios, would reconsider global state.

Why Client-Side PDF Generation?
Decision: Used jsPDF instead of server-side PDF service.
Reasoning:

Keeps architecture simple (no backend needed)
Zero latency (generates instantly in browser)
Zero server costs
Works offline

Trade-off: Limited styling flexibility vs. HTML-to-PDF services. But for tabular data, jsPDF is sufficient.

Why Recharts Over D3?
Decision: Recharts instead of D3.js for visualizations.
Reasoning:

Declarative API (React-friendly)
Responsive by default
Lower learning curve
Sufficient for line/bar charts

Trade-off: Less customization than D3. But for this use case (3-year line chart), Recharts handles it perfectly.

🎨 Design System
Built a custom design system with CSS variables for consistency:
css/* Colors */
--color-primary: #2563eb (Blue - trust, professionalism)
--color-success: #10b981 (Green - savings, positive ROI)
--color-danger: #ef4444 (Red - costs, negative values)

/* Typography */
--font-body: 'Inter', sans-serif (readability)
--font-mono: 'Roboto Mono', monospace (numbers)

/* Spacing */
8px base unit (consistent rhythm)
Design Principles:

Hierarchy: Most important metric (Annual Savings) is 5× larger than secondary metrics
Color coding: Green = savings, Red = costs (universal business convention)
Progressive disclosure: Advanced metrics hidden by default (80% of users don't need them)
Responsive: Mobile-first, works on 320px+ screens


Real-World Validation
This calculator is backed by real production data from my Block 6 Competitive Intelligence Agent:
Agent Cost: $0.26/query (7 queries tracked with cost logging)

GPT-4 Turbo: ~$0.01-0.03/query
Embeddings: ~$0.0001/query
Tavily Search: $0.25/search

Calculator Default: $0.04/ticket (conservative, based on 2,500 tokens × $0.01/1K)
Result: Calculator assumptions are defensible with actual production telemetry.

Example Scenario
Inputs:

50 support agents
10,000 tickets/month
15-minute average handle time
$30/hour fully loaded wage
50% time reduction (AI-assisted)
$0.04 AI cost per ticket

Outputs:

Annual Savings: $1,053,000
AI Operational Cost: $2,080/year
Net ROI: $1,050,920
Break-Even: 0.5 months
3-Year Value: $3,109,000

Translation: Invest $50K once, save $1M+ annually, break even in 2 weeks, create $3.1M in 3 years.

🚀 Getting Started
Prerequisites

Node.js 18+
npm or yarn

Installation
bash# Clone the repository
git clone https://github.com/cs-ai-pm-journey/Block7
cd roi-calculator

# Install dependencies
npm install

# Start development server
npm run dev
Open: http://localhost:5173

Build & Deploy
Build for Production
bashnpm run build
Creates optimized build in /dist folder.
Preview Production Build
bashnpm run preview
Deploy to Render

Push to GitHub
Connect repo to Render
Set build command: npm run build
Set publish directory: dist
Deploy!


Testing Locally
Test the calculator:

Adjust "Agent Count" slider → Numbers update instantly
Drag "Time Reduction" slider → Chart redraws
Click "Download PDF" → PDF downloads with current inputs
Resize browser → Layout adapts responsively

Expected behavior:

All sliders functional ✅
Chart shows 4 data points (Year 0, 1, 2, 3) ✅
PDF contains 2 pages with tables ✅
Mobile view stacks layout vertically ✅


Project Structure
roi-calculator/
├── src/
│   ├── components/
│   │   ├── CalculatorForm.jsx          # Input sliders
│   │   ├── CalculatorForm.module.css
│   │   ├── ResultsDisplay.jsx          # Metrics + chart
│   │   ├── ResultsDisplay.module.css
│   │   ├── SavingsChart.jsx            # 3-year line chart
│   │   └── SavingsChart.module.css
│   ├── hooks/
│   │   └── useROICalculator.js         # Business logic
│   ├── styles/
│   │   └── variables.css               # Design system
│   ├── utils/
│   │   └── pdfExport.js                # PDF generation
│   ├── App.jsx                         # Main layout
│   ├── App.css
│   └── main.jsx                        # Entry point
├── public/                             # Static assets
├── package.json
├── vite.config.js
└── README.md

Learning Outcomes
Building this project taught me:
1. Product Thinking

Designed for "buyer ≠ user" (Director creates report, CFO reads it)
Progressive disclosure (advanced metrics hidden by default)
Credibility through transparency (show benchmark sources)

2. Technical Skills

React hooks for state management
CSS Modules for scoped styling
Recharts integration for data visualization
Client-side PDF generation
Responsive design patterns

3. Business Acumen

ROI modeling (labor savings + quality improvements)
Industry research (citing Forrester, Zendesk)
Executive communication (translate tech → dollars)


Future Enhancements
If I had more time, I'd add:

Scenario Comparison

Save multiple scenarios
Side-by-side comparison table
"Optimistic vs Conservative" toggle


Team Size Optimizer

Reverse calculator: "How many agents needed for $1M savings?"
Break-even agent count


Integration Cost Model

Training time estimates
Change management costs
Maintenance fees


Chart Enhancements

Monthly break-even detail (not just year-level)
Sensitivity analysis (tornado chart)
Export chart as PNG


Backend (if scaling to multi-user)

Save scenarios to database
Share URLs with specific inputs pre-filled
Usage analytics (which inputs do users adjust most?)



But: Shipping v1 beats perfecting features no one asked for. These are "nice to haves," not blockers.

Known Issues & Limitations
1. PDF Security Warning
jsPDF v2.5.2 has known vulnerabilities (prototype pollution, ReDoS).
Impact: Low (client-side only, no user-generated content)
Mitigation: For production apps, would evaluate react-pdf or pdfmake
Context: Acceptable for portfolio/demo projects
2. Large Bundle Size
Main JavaScript bundle is ~950KB (uncompressed).
Cause: Recharts + jsPDF dependencies
Impact: ~3s initial load on 3G
Mitigation: Could code-split or lazy-load charts
Decision: Acceptable for demo (most users on WiFi)
3. No Persistence
Inputs reset on page refresh.
Why: No backend, no localStorage (intentional)
Workaround: PDF export preserves state
Future: Could add localStorage or URL params

Resources & Citations
Industry Benchmarks:

Forrester 2024 Customer Service Report - AI performance metrics
Zendesk 2024 Benchmark Data - Handle time averages

Technical Documentation:

Recharts Documentation
jsPDF Documentation
React Hooks Guide


Contributing
This is a portfolio project, but feedback is welcome!
Found a bug? Open an issue
Have a suggestion? Start a discussion
Want to fork it? Go for it! (MIT License)

📄 License
MIT License - feel free to use this for your own projects!

About Me
Adam Saulters
Account Manager → AI Product Manager
I'm executing an 18-block learning roadmap to transition into AI-fluent Product Management. This ROI Calculator is Block 7 of 18.
Other Projects:

Block 6: Competitive Intelligence Agent - Hybrid RAG + ReAct system

Connect:

LinkedIn
GitHub


Acknowledgments
Built with guidance from:


Forrester Research (benchmark data)
Zendesk (industry standards)


Built in public. Shipping v1 > perfecting v0.
Last updated: February 2026