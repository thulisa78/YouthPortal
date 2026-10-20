import { useState } from 'react';
import { Users, Star, MessageCircle, Sparkles, Loader2, Send, ChevronRight } from 'lucide-react';
import PageHero from '../components/PageHero';

const MENTORS = [
  {
    id: 1,
    name: 'Naledi Dlamini',
    role: 'Senior Software Engineer',
    company: 'Takealot',
    areas: ['Web Development', 'Career Growth', 'Breaking into Tech'],
    bio: 'I grew up in Soweto and taught myself to code at 19. Now I lead a frontend team at Takealot. I want to help township youth who are where I was.',
    experience: '8 years',
    available: 'Weekends',
    avatar: 'ND',
    color: 'bg-blue-500',
    rating: 4.9,
    sessions: 42,
  },
  {
    id: 2,
    name: 'Sipho Molefe',
    role: 'HR Manager',
    company: 'Discovery Health',
    areas: ['HR Careers', 'Job Interviews', 'CV Review'],
    bio: 'I review CVs and conduct interviews daily. I know what makes a candidate stand out — and I want to share that knowledge with young South Africans.',
    experience: '10 years',
    available: 'Weekday evenings',
    avatar: 'SM',
    color: 'bg-emerald-500',
    rating: 4.8,
    sessions: 63,
  },
  {
    id: 3,
    name: 'Ayanda Khumalo',
    role: 'Founder & Marketing Consultant',
    company: 'Own Business',
    areas: ['Entrepreneurship', 'Digital Marketing', 'Small Business'],
    bio: 'I started my marketing agency with R0 and zero clients at 24. I mentor young entrepreneurs who want to build their own path.',
    experience: '6 years',
    available: 'Flexible',
    avatar: 'AK',
    color: 'bg-orange-500',
    rating: 4.7,
    sessions: 28,
  },
  {
    id: 4,
    name: 'Dr. Priya Naidoo',
    role: 'Data Scientist',
    company: 'Standard Bank',
    areas: ['Data Science', 'Postgraduate Studies', 'Finance Careers'],
    bio: 'First-gen university grad. I want to help other first-gen students navigate academia and break into data and finance careers.',
    experience: '12 years',
    available: 'Saturdays',
    avatar: 'PN',
    color: 'bg-purple-500',
    rating: 5.0,
    sessions: 17,
  },
  {
    id: 5,
    name: 'Thabo Sithole',
    role: 'Civil Engineer',
    company: 'Aveng Group',
    areas: ['Engineering Careers', 'Bursary Applications', 'Work-Life Balance'],
    bio: 'Got a bursary from the government, graduated from Wits. I guide aspiring engineers through the bursary application process.',
    experience: '7 years',
    available: 'Weekday evenings',
    avatar: 'TS',
    color: 'bg-teal-500',
    rating: 4.6,
    sessions: 34,
  },
  {
    id: 6,
    name: 'Lerato Mokone',
    role: 'Graphic Designer & Art Director',
    company: 'Ogilvy SA',
    areas: ['Creative Careers', 'Portfolio Building', 'Agency Life'],
    bio: 'Studied graphic design at CPUT. Now leading creative campaigns at Ogilvy. I love helping young creatives build killer portfolios.',
    experience: '9 years',
    available: 'Weekends',
    avatar: 'LM',
    color: 'bg-pink-500',
    rating: 4.9,
    sessions: 55,
  },
];

const AREAS = [...new Set(MENTORS.flatMap(m => m.areas))];

const CHAT_SYSTEM = `You are an AI career mentor for young South Africans. You are warm, encouraging, practical, and knowledgeable about the South African job market, education system (NQF, SETAs, bursaries, learnerships), and career paths. Give honest, actionable advice. When you don't know something, say so. Always encourage the person and remind them that their background doesn't define their ceiling.`;

export default function Mentorship() {
  const [filterArea, setFilterArea] = useState('');
  const [requested, setRequested] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI career mentor 👋 I\'m here to give you honest career advice tailored to the South African job market. What\'s on your mind?' }
  ]);
  const [input, setInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const filtered = filterArea ? MENTORS.filter(m => m.areas.includes(filterArea)) : MENTORS;

  const handleRequest = (id) => {
    setRequested(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const sendMessage = async () => {
    if (!input.trim() || chatLoading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setChatLoading(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: CHAT_SYSTEM,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content.map(b => b.text || '').join('');
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I had trouble connecting. Please try again.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <PageHero
        icon={Users}
        title="Mentorship"
        subtitle="Connect with professionals who've walked your path — and want to help."
        count={MENTORS.length}
        gradient="from-red-500 to-orange-500"
      />

      {/* AI Mentor Chat CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-5 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} />
              <h3 className="font-bold text-lg">AI Career Mentor</h3>
            </div>
            <p className="text-sm text-white/80 max-w-md">Need advice right now? Chat with an AI mentor trained on South African career paths, job market realities, and practical guidance.</p>
          </div>
          <button
            onClick={() => setChatOpen(v => !v)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors"
          >
            <MessageCircle size={15} /> {chatOpen ? 'Close Chat' : 'Start Chat'}
          </button>
        </div>

        {chatOpen && (
          <div className="mt-4 rounded-2xl bg-white overflow-hidden">
            <div className="h-72 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5">
                    <Loader2 size={14} className="animate-spin text-gray-500" />
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-gray-200 flex items-center gap-2 px-3 py-2.5">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask anything about your career..."
                className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                onClick={sendMessage}
                disabled={chatLoading || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-40"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Human Mentors */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h2 className="text-base font-bold text-gray-900">Volunteer Mentors</h2>
          <div className="relative">
            <select
              value={filterArea}
              onChange={e => setFilterArea(e.target.value)}
              className="h-9 rounded-full border border-gray-200 bg-white pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none"
            >
              <option value="">All Areas</option>
              {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <ChevronRight size={13} className="pointer-events-none absolute right-2.5 top-2.5 rotate-90 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(mentor => {
            const isRequested = requested.includes(mentor.id);
            return (
              <div key={mentor.id} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${mentor.color} text-base font-bold text-white`}>
                    {mentor.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 leading-tight">{mentor.name}</p>
                    <p className="text-sm text-gray-600">{mentor.role}</p>
                    <p className="text-xs text-gray-400">{mentor.company}</p>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-gray-500 flex-1">{mentor.bio}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {mentor.areas.map(a => (
                    <span key={a} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{a}</span>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-xs">
                  <div className="rounded-lg bg-gray-50 py-1.5">
                    <p className="font-bold text-gray-800">{mentor.experience}</p>
                    <p className="text-gray-400">Experience</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 py-1.5">
                    <p className="font-bold text-gray-800 flex items-center justify-center gap-0.5"><Star size={10} className="text-yellow-400 fill-yellow-400" />{mentor.rating}</p>
                    <p className="text-gray-400">Rating</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 py-1.5">
                    <p className="font-bold text-gray-800">{mentor.sessions}</p>
                    <p className="text-gray-400">Sessions</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available: {mentor.available}
                </div>

                <button
                  onClick={() => handleRequest(mentor.id)}
                  disabled={isRequested}
                  className={`mt-3 rounded-full py-2 text-sm font-semibold transition-colors ${
                    isRequested
                      ? 'bg-emerald-50 text-emerald-700 cursor-default'
                      : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:opacity-90'
                  }`}
                >
                  {isRequested ? '✓ Request Sent' : 'Request Mentorship'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Become a Mentor CTA */}
      <div className="rounded-2xl border border-dashed border-orange-300 bg-orange-50/50 p-6 text-center">
        <p className="text-2xl mb-2">🙋</p>
        <h3 className="font-bold text-gray-900 mb-1">Are you a professional who wants to give back?</h3>
        <p className="text-sm text-gray-500 mb-3 max-w-md mx-auto">Volunteer as a mentor. Even one session a month can change a young person's career trajectory.</p>
        <button className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors">
          Apply to Become a Mentor
        </button>
      </div>
    </div>
  );
}
