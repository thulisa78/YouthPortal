import { useState } from 'react';
import { TrendingUp, ChevronDown, ChevronRight, CheckCircle2, Sparkles, Loader2, Lock } from 'lucide-react';
import PageHero from '../components/PageHero';

const ROADMAPS = [
  {
    id: 'webdev',
    title: 'Web Developer',
    emoji: '💻',
    duration: '6–12 months',
    demand: 'Very High',
    color: 'from-blue-500 to-indigo-600',
    tagColor: 'bg-blue-50 text-blue-700',
    phases: [
      {
        phase: 'Foundation',
        weeks: 'Weeks 1–6',
        skills: ['HTML5 & CSS3', 'Responsive design', 'Basic JavaScript'],
        courses: [{ name: 'The Odin Project', url: 'https://theodinproject.com', free: true }, { name: 'freeCodeCamp Web Design', url: 'https://freecodecamp.org', free: true }],
        project: 'Build a personal portfolio website',
      },
      {
        phase: 'Intermediate',
        weeks: 'Weeks 7–16',
        skills: ['JavaScript ES6+', 'React basics', 'Git & GitHub'],
        courses: [{ name: 'React - The Odin Project', url: 'https://theodinproject.com', free: true }, { name: 'Scrimba React Course', url: 'https://scrimba.com', free: true }],
        project: 'Build a to-do app with React',
      },
      {
        phase: 'Job Ready',
        weeks: 'Weeks 17–26',
        skills: ['Node.js basics', 'REST APIs', 'Databases (SQL basics)'],
        courses: [{ name: 'freeCodeCamp Back End', url: 'https://freecodecamp.org', free: true }, { name: 'CS50 Web by Harvard', url: 'https://cs50.harvard.edu', free: true }],
        project: 'Build a full-stack CRUD application',
      },
    ],
    certs: ['freeCodeCamp Responsive Web Design', 'freeCodeCamp JavaScript Algorithms', 'freeCodeCamp Front End Libraries'],
  },
  {
    id: 'dataanalyst',
    title: 'Data Analyst',
    emoji: '📊',
    duration: '6–9 months',
    demand: 'High',
    color: 'from-emerald-500 to-teal-600',
    tagColor: 'bg-emerald-50 text-emerald-700',
    phases: [
      {
        phase: 'Foundation',
        weeks: 'Weeks 1–4',
        skills: ['Excel (advanced)', 'Basic statistics', 'Data thinking'],
        courses: [{ name: 'Excel Skills for Business — Coursera', url: 'https://coursera.org', free: true }, { name: 'Khan Academy Statistics', url: 'https://khanacademy.org', free: true }],
        project: 'Analyse a public South African dataset in Excel',
      },
      {
        phase: 'Core Tools',
        weeks: 'Weeks 5–16',
        skills: ['SQL', 'Python (pandas, matplotlib)', 'Data visualisation'],
        courses: [{ name: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial', free: true }, { name: 'Kaggle Python Course', url: 'https://kaggle.com/learn', free: true }],
        project: 'Query and visualise a real database',
      },
      {
        phase: 'Job Ready',
        weeks: 'Weeks 17–28',
        skills: ['Power BI or Tableau', 'Storytelling with data', 'Business reporting'],
        courses: [{ name: 'Microsoft Power BI — free learning path', url: 'https://learn.microsoft.com', free: true }, { name: 'Google Data Analytics — Coursera (audit free)', url: 'https://coursera.org', free: true }],
        project: 'Build an end-to-end analysis project with a dashboard',
      },
    ],
    certs: ['Google Data Analytics Certificate (audit free)', 'Microsoft Power BI Data Analyst', 'Kaggle Data Analysis Certificate'],
  },
  {
    id: 'graphic',
    title: 'Graphic Designer',
    emoji: '🎨',
    duration: '4–8 months',
    demand: 'High',
    color: 'from-pink-500 to-rose-600',
    tagColor: 'bg-pink-50 text-pink-700',
    phases: [
      {
        phase: 'Design Fundamentals',
        weeks: 'Weeks 1–4',
        skills: ['Design principles', 'Typography', 'Colour theory'],
        courses: [{ name: 'Canva Design School', url: 'https://designschool.canva.com', free: true }, { name: 'Google UX Design (audit free)', url: 'https://coursera.org', free: true }],
        project: 'Design 3 social media posts for a local business',
      },
      {
        phase: 'Tools',
        weeks: 'Weeks 5–14',
        skills: ['Figma', 'Adobe Express', 'Logo & branding design'],
        courses: [{ name: 'Figma Tutorials (official)', url: 'https://help.figma.com', free: true }, { name: 'Interaction Design Foundation (free plan)', url: 'https://interaction-design.org', free: true }],
        project: 'Design a brand identity pack (logo, colours, fonts)',
      },
      {
        phase: 'Portfolio',
        weeks: 'Weeks 15–24',
        skills: ['Portfolio building', 'Client briefs', 'Social media design'],
        courses: [{ name: 'Behance Portfolio Tips', url: 'https://behance.net', free: true }],
        project: 'Build a 5-piece portfolio on Behance',
      },
    ],
    certs: ['Canva Design Certificate', 'Google UX Design (audit)', 'Figma Community Certificate'],
  },
  {
    id: 'humanresources',
    title: 'HR Practitioner',
    emoji: '🤝',
    duration: '6–12 months',
    demand: 'Medium-High',
    color: 'from-orange-500 to-amber-500',
    tagColor: 'bg-orange-50 text-orange-700',
    phases: [
      {
        phase: 'HR Basics',
        weeks: 'Weeks 1–6',
        skills: ['Labour law basics', 'Recruitment fundamentals', 'BBBEE overview'],
        courses: [{ name: 'CCMA Free Resources', url: 'https://ccma.org.za', free: true }, { name: 'HR Fundamentals — Alison', url: 'https://alison.com', free: true }],
        project: 'Write a compliant job description for a real role',
      },
      {
        phase: 'Core HR Skills',
        weeks: 'Weeks 7–18',
        skills: ['Employee relations', 'Performance management', 'Payroll basics'],
        courses: [{ name: 'CIPD Free Learning Resources', url: 'https://cipd.org', free: true }, { name: 'Alison HR Management Diploma', url: 'https://alison.com', free: true }],
        project: 'Design a performance review process',
      },
      {
        phase: 'Job Ready',
        weeks: 'Weeks 19–28',
        skills: ['HR systems (SAP basics)', 'IR procedures', 'Skills development (WSP)'],
        courses: [{ name: 'Skills Portal SA', url: 'https://skillsportal.co.za', free: true }],
        project: 'Complete a sample Workplace Skills Plan',
      },
    ],
    certs: ['Alison HR Management Diploma', 'CCMA Basic Conditions of Employment', 'Google Project Management (audit free)'],
  },
];

export default function SkillsRoadmaps() {
  const [active, setActive] = useState(null);
  const [aiRole, setAiRole] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [expandedPhase, setExpandedPhase] = useState({});

  const togglePhase = (roadmapId, idx) => {
    const key = `${roadmapId}-${idx}`;
    setExpandedPhase(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAIRoadmap = async () => {
    if (!aiRole.trim()) return;
    setAiLoading(true);
    setAiError('');
    setAiResult(null);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a career coach for unemployed South African youth. Create a practical skills roadmap for someone who wants to become a "${aiRole}".

Respond ONLY with a JSON object (no markdown, no backticks) with this shape:
{
  "title": "<role title>",
  "duration": "<e.g. 6-12 months>",
  "demand": "<e.g. High / Medium>",
  "phases": [
    {
      "phase": "<phase name>",
      "weeks": "<e.g. Weeks 1-6>",
      "skills": ["skill1", "skill2", "skill3"],
      "courses": [{"name": "<free course name>", "url": "<url if known else #>"}],
      "project": "<practical project to build>"
    }
  ],
  "certs": ["<free cert 1>", "<free cert 2>"],
  "tip": "<one sentence of honest career advice for SA youth>"
}`
          }]
        })
      });
      const data = await response.json();
      const raw = data.content.map(b => b.text || '').join('').trim();
      const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
      setAiResult(parsed);
    } catch {
      setAiError('Could not generate roadmap. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const RoadmapDetail = ({ roadmap, id }) => (
    <div className="mt-3 space-y-3">
      {roadmap.phases.map((phase, idx) => {
        const key = `${id}-${idx}`;
        const open = expandedPhase[key];
        return (
          <div key={idx} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <button
              onClick={() => togglePhase(id, idx)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">{idx + 1}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{phase.phase}</p>
                  <p className="text-xs text-gray-400">{phase.weeks}</p>
                </div>
              </div>
              {open ? <ChevronDown size={15} className="text-gray-400" /> : <ChevronRight size={15} className="text-gray-400" />}
            </button>
            {open && (
              <div className="border-t border-gray-100 px-4 py-4 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">Skills to Learn</p>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.skills.map((s, i) => (
                      <span key={i} className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">Free Courses</p>
                  <ul className="space-y-1">
                    {phase.courses.map((c, i) => (
                      <li key={i}>
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                          <CheckCircle2 size={11} className="text-emerald-500" /> {c.name}
                          {c.free && <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-xs text-emerald-600 font-semibold ml-1">Free</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2">
                  <p className="text-xs font-semibold text-amber-700 mb-0.5">Project to Build</p>
                  <p className="text-xs text-amber-600">{phase.project}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-semibold text-gray-500 mb-2">Recommended Certificates</p>
        <ul className="space-y-1">
          {roadmap.certs.map((c, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle2 size={12} className="text-emerald-500 shrink-0" /> {c}
            </li>
          ))}
        </ul>
      </div>
      {roadmap.tip && (
        <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 p-3">
          <p className="text-xs font-semibold text-indigo-700 mb-1">💡 Career Tip</p>
          <p className="text-xs text-indigo-600 leading-relaxed">{roadmap.tip}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-5">
      <PageHero
        icon={TrendingUp}
        title="Free Skills Roadmaps"
        subtitle="Exact skills, courses, and projects you need — step by step."
        count={ROADMAPS.length}
        gradient="from-green-500 to-teal-600"
      />

      {/* AI Custom Roadmap */}
      <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50 p-5">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={16} className="text-purple-600" />
          <h3 className="font-bold text-purple-900">Generate a Custom Roadmap</h3>
        </div>
        <p className="text-sm text-purple-600 mb-3">Don't see your career? Ask the AI to build a roadmap for any role.</p>
        <div className="flex gap-2">
          <input
            value={aiRole}
            onChange={e => setAiRole(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAIRoadmap()}
            placeholder="e.g. Cybersecurity Analyst, Social Media Manager..."
            className="flex-1 rounded-xl border border-purple-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleAIRoadmap}
            disabled={aiLoading || !aiRole.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            {aiLoading ? 'Generating…' : 'Generate'}
          </button>
        </div>
        {aiError && <p className="mt-2 text-xs text-red-600">{aiError}</p>}
        {aiResult && (
          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h4 className="font-bold text-gray-900">{aiResult.title} Roadmap</h4>
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700">{aiResult.duration}</span>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">Demand: {aiResult.demand}</span>
            </div>
            <RoadmapDetail roadmap={aiResult} id="ai" />
          </div>
        )}
      </div>

      {/* Curated Roadmaps */}
      <div>
        <h2 className="mb-3 text-base font-bold text-gray-900">Curated Roadmaps</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ROADMAPS.map(rm => (
            <div key={rm.id} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
              <div className={`bg-gradient-to-r ${rm.color} px-5 py-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl">{rm.emoji}</p>
                    <h3 className="font-bold text-white text-lg leading-tight">{rm.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white">{rm.duration}</span>
                      <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white">Demand: {rm.demand}</span>
                    </div>
                  </div>
                  <span className="text-white/60 text-xs">{rm.phases.length} phases</span>
                </div>
              </div>
              <div className="p-4">
                <button
                  onClick={() => setActive(active === rm.id ? null : rm.id)}
                  className="w-full flex items-center justify-between rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {active === rm.id ? 'Hide Roadmap' : 'View Full Roadmap'}
                  {active === rm.id ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                </button>
                {active === rm.id && <RoadmapDetail roadmap={rm} id={rm.id} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
