import { useState, useRef } from 'react';
import { FileText, Upload, Sparkles, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import PageHero from '../components/PageHero';

const TIPS = [
  'Start every bullet with a strong action verb (Built, Designed, Led, Reduced...)',
  'Quantify your impact wherever possible — numbers stand out to ATS and recruiters.',
  'Keep your CV to 1–2 pages for entry-level roles.',
  'Use standard section headings: Work Experience, Education, Skills, Certifications.',
  'Avoid tables, columns, and graphics — ATS systems often can\'t read them.',
  'Match keywords from the job description exactly — ATS filters for them.',
];

export default function CVBuilder() {
  const [step, setStep] = useState('upload'); // upload | analyze | result
  const [cvText, setCvText] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const textareaRef = useRef(null);

  const handleAnalyze = async () => {
    if (!cvText.trim()) { setError('Please paste your CV text first.'); return; }
    setError('');
    setLoading(true);
    setStep('analyze');

    try {
      const prompt = `You are an expert ATS-optimised CV coach helping South African youth get jobs.

Analyse the following CV${jobRole ? ` for the role of "${jobRole}"` : ''} and respond ONLY with a JSON object (no markdown, no backticks) with this exact shape:
{
  "score": <number 0-100 representing ATS strength>,
  "grade": "<A/B/C/D>",
  "summary": "<2 sentence plain English summary of main strengths and weaknesses>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": [
    { "issue": "<short issue title>", "fix": "<actionable fix instruction>" }
  ],
  "rewritten_summary": "<a rewritten 3-4 sentence professional CV summary section for this person, ATS-optimised>",
  "keywords": ["<relevant keyword 1>", "<keyword 2>", "<keyword 3>", "<keyword 4>", "<keyword 5>"]
}

CV TEXT:
${cvText}`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await response.json();
      const raw = data.content.map(b => b.text || '').join('').trim();
      const clean = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setStep('result');
    } catch (e) {
      setError('Something went wrong analysing your CV. Please try again.');
      setStep('upload');
    } finally {
      setLoading(false);
    }
  };

  const gradeColor = (g) => ({ A: 'text-emerald-600', B: 'text-blue-600', C: 'text-yellow-600', D: 'text-red-600' }[g] || 'text-gray-600');
  const scoreColor = (s) => s >= 75 ? 'bg-emerald-500' : s >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="space-y-5">
      <PageHero
        icon={FileText}
        title="AI CV Builder"
        subtitle="Get instant ATS feedback and suggestions powered by AI."
        count="Free"
        gradient="from-purple-500 to-pink-600"
      />

      {step !== 'result' && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
              <h2 className="font-bold text-gray-900">Paste your CV</h2>
              <p className="text-sm text-gray-500">Copy and paste your entire CV as plain text below. The AI will analyse it for ATS compatibility and give you specific improvements.</p>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">Target Job Role (optional)</label>
                <input
                  value={jobRole}
                  onChange={e => setJobRole(e.target.value)}
                  placeholder="e.g. Junior Software Developer, HR Graduate"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-600">Your CV Text *</label>
                <textarea
                  ref={textareaRef}
                  value={cvText}
                  onChange={e => setCvText(e.target.value)}
                  placeholder="Paste your full CV content here — name, contact info, work experience, education, skills..."
                  rows={12}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                />
                <p className="mt-1 text-xs text-gray-400">{cvText.length} characters</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-600">
                  <AlertCircle size={15} /> {error}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={loading || !cvText.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 size={15} className="animate-spin" /> Analysing…</> : <><Sparkles size={15} /> Analyse My CV</>}
              </button>
            </div>
          </div>

          {/* Tips Panel */}
          <div className="space-y-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-gray-900 mb-3">ATS Quick Tips</h3>
              <ul className="space-y-3">
                {TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-600">{i + 1}</span>
                    <span className="text-xs leading-relaxed text-gray-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 p-4">
              <p className="text-xs font-semibold text-purple-700 mb-1">Did you know?</p>
              <p className="text-xs text-purple-600 leading-relaxed">Up to 75% of CVs are rejected by ATS software before a human ever reads them. A well-formatted, keyword-rich CV can dramatically improve your chances.</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="rounded-2xl border border-purple-100 bg-purple-50/50 py-12 text-center">
          <Loader2 size={36} className="mx-auto mb-3 animate-spin text-purple-500" />
          <p className="font-semibold text-purple-700">AI is reading your CV…</p>
          <p className="mt-1 text-sm text-purple-500">Checking ATS compatibility, keywords, and structure</p>
        </div>
      )}

      {/* Result */}
      {step === 'result' && result && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-900">Your CV Analysis</h2>
            <button onClick={() => { setStep('upload'); setResult(null); }} className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">
              Analyse Another CV
            </button>
          </div>

          {/* Score Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-center">
                <p className={`text-5xl font-extrabold ${gradeColor(result.grade)}`}>{result.grade}</p>
                <p className="text-xs text-gray-500 mt-0.5">ATS Grade</p>
              </div>
              <div className="flex-1 min-w-[160px]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-gray-700">ATS Score</span>
                  <span className="text-sm font-bold text-gray-900">{result.score}/100</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${scoreColor(result.score)}`} style={{ width: `${result.score}%` }} />
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">{result.summary}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Strengths */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
              <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2"><CheckCircle size={16} /> What's Working</h3>
              <ul className="space-y-2">
                {result.strengths?.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-emerald-700">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-4">
              <h3 className="font-bold text-orange-800 mb-3 flex items-center gap-2"><AlertCircle size={16} /> What to Fix</h3>
              <ul className="space-y-3">
                {result.improvements?.map((imp, i) => (
                  <li key={i} className="text-sm">
                    <p className="font-semibold text-orange-800">{imp.issue}</p>
                    <p className="text-orange-600 mt-0.5 leading-relaxed">{imp.fix}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rewritten Summary */}
          {result.rewritten_summary && (
            <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-5">
              <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2"><Sparkles size={15} /> AI-Suggested Profile Summary</h3>
              <p className="text-sm text-purple-700 leading-relaxed">{result.rewritten_summary}</p>
              <button
                onClick={() => navigator.clipboard.writeText(result.rewritten_summary)}
                className="mt-3 rounded-full bg-purple-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-purple-700 transition-colors"
              >
                Copy to Clipboard
              </button>
            </div>
          )}

          {/* Keywords */}
          {result.keywords?.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Suggested Keywords to Add</h3>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((kw, i) => (
                  <span key={i} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{kw}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
