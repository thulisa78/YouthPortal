import { useState } from 'react';
import {
  Briefcase,
  Plus,
  Trash2,
  Bell,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  CalendarClock,
  ChevronDown,
} from 'lucide-react';
import PageHero from '../components/PageHero';

const STATUS_OPTIONS = ['Applied', 'Interview Scheduled', 'Interviewed', 'Offer Received', 'Rejected', 'Withdrawn'];

const STATUS_STYLE = {
  'Applied':            { badge: 'bg-blue-50 text-blue-700',    dot: 'bg-blue-500' },
  'Interview Scheduled':{ badge: 'bg-yellow-50 text-yellow-700',dot: 'bg-yellow-500' },
  'Interviewed':        { badge: 'bg-indigo-50 text-indigo-700',dot: 'bg-indigo-500' },
  'Offer Received':     { badge: 'bg-emerald-50 text-emerald-700',dot: 'bg-emerald-500' },
  'Rejected':           { badge: 'bg-red-50 text-red-700',      dot: 'bg-red-500' },
  'Withdrawn':          { badge: 'bg-gray-100 text-gray-600',   dot: 'bg-gray-400' },
};

const SAMPLE_APPS = [
  { id: 1, company: 'Telkom SA', role: 'Junior Developer', date: '2025-06-01', status: 'Interview Scheduled', followUp: '2025-06-15', notes: 'HR screening done' },
  { id: 2, company: 'Nedbank', role: 'Graduate Analyst', date: '2025-05-28', status: 'Applied', followUp: '', notes: '' },
  { id: 3, company: 'Discovery Health', role: 'Data Intern', date: '2025-05-20', status: 'Rejected', followUp: '', notes: 'Keep an eye on next intake' },
  { id: 4, company: 'Standard Bank', role: 'IT Learnership', date: '2025-06-03', status: 'Offer Received', followUp: '', notes: '🎉 Start 1 July' },
];

const empty = { company: '', role: '', date: '', status: 'Applied', followUp: '', notes: '' };

export default function JobTracker() {
  const [apps, setApps] = useState(SAMPLE_APPS);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [editId, setEditId] = useState(null);

  const counts = {
    total: apps.length,
    offers: apps.filter(a => a.status === 'Offer Received').length,
    interviews: apps.filter(a => a.status === 'Interview Scheduled' || a.status === 'Interviewed').length,
    rejections: apps.filter(a => a.status === 'Rejected').length,
  };

  const successRate = counts.total > 0 ? Math.round((counts.offers / counts.total) * 100) : 0;

  const filtered = filterStatus ? apps.filter(a => a.status === filterStatus) : apps;

  const handleSubmit = () => {
    if (!form.company || !form.role) return;
    if (editId !== null) {
      setApps(prev => prev.map(a => a.id === editId ? { ...form, id: editId } : a));
      setEditId(null);
    } else {
      setApps(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setForm(empty);
    setShowForm(false);
  };

  const handleEdit = (app) => {
    setForm({ company: app.company, role: app.role, date: app.date, status: app.status, followUp: app.followUp, notes: app.notes });
    setEditId(app.id);
    setShowForm(true);
  };

  const handleDelete = (id) => setApps(prev => prev.filter(a => a.id !== id));

  const handleStatusChange = (id, status) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="space-y-5">
      <PageHero
        icon={Briefcase}
        title="Job Application Tracker"
        subtitle="Stay on top of every application — never lose track again."
        count={apps.length}
        gradient="from-blue-500 to-indigo-600"
      />

      {/* Analytics Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Applied', value: counts.total, icon: Briefcase, color: 'text-blue-600 bg-blue-50' },
          { label: 'Interviews', value: counts.interviews, icon: CalendarClock, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'Offers', value: counts.offers, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Success Rate', value: `${successRate}%`, icon: TrendingUp, color: 'text-indigo-600 bg-indigo-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}>
              <Icon size={17} strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="h-9 rounded-full border border-gray-200 bg-white pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-2.5 text-gray-400" />
        </div>
        <button
          onClick={() => { setShowForm(v => !v); setEditId(null); setForm(empty); }}
          className="flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <Plus size={15} /> Add Application
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 space-y-4">
          <h3 className="font-bold text-gray-900">{editId ? 'Edit Application' : 'New Application'}</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { label: 'Company Name *', key: 'company', placeholder: 'e.g. Absa Group' },
              { label: 'Role / Position *', key: 'role', placeholder: 'e.g. Graduate Trainee' },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="mb-1 block text-xs font-semibold text-gray-600">{label}</label>
                <input
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-600">Date Applied</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-600">Status</label>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-600">Follow-up Date</label>
              <input
                type="date"
                value={form.followUp}
                onChange={e => setForm(f => ({ ...f, followUp: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-gray-600">Notes</label>
              <input
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Any notes about this application..."
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSubmit} className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
              {editId ? 'Save Changes' : 'Add Application'}
            </button>
            <button onClick={() => { setShowForm(false); setEditId(null); setForm(empty); }} className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Application List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-14 text-center">
          <Briefcase size={36} className="mx-auto mb-3 text-gray-300" />
          <p className="font-semibold text-gray-500">No applications yet</p>
          <p className="mt-1 text-sm text-gray-400">Click "Add Application" to start tracking.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(app => {
            const style = STATUS_STYLE[app.status] || STATUS_STYLE['Applied'];
            const isFollowUpSoon = app.followUp && new Date(app.followUp) <= new Date(Date.now() + 3 * 86400000);
            return (
              <div key={app.id} className="group rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-gray-900">{app.role}</h3>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                        {app.status}
                      </span>
                      {isFollowUpSoon && app.status !== 'Rejected' && app.status !== 'Withdrawn' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-600">
                          <Bell size={10} /> Follow up
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{app.company}</p>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-400">
                      {app.date && <span className="flex items-center gap-1"><Clock size={11} /> Applied {app.date}</span>}
                      {app.followUp && <span className="flex items-center gap-1"><CalendarClock size={11} /> Follow-up {app.followUp}</span>}
                    </div>
                    {app.notes && <p className="mt-1.5 text-xs text-gray-500 italic">{app.notes}</p>}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <select
                      value={app.status}
                      onChange={e => handleStatusChange(app.id, e.target.value)}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    >
                      {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <button onClick={() => handleEdit(app)} className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-colors">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button onClick={() => handleDelete(app.id)} className="rounded-lg border border-gray-200 p-1.5 text-gray-400 hover:text-red-600 hover:border-red-200 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rejection Insight */}
      {counts.rejections > 0 && (
        <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4 flex gap-3">
          <XCircle size={20} className="shrink-0 text-red-400 mt-0.5" />
          <div>
            <p className="font-semibold text-red-700 text-sm">Rejection insight</p>
            <p className="text-sm text-red-600 mt-0.5">
              You've had {counts.rejections} rejection{counts.rejections > 1 ? 's' : ''}. Consider using the AI CV Builder to strengthen your application — most rejections happen before a human reads your CV.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
