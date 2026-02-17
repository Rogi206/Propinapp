
import React, { useState, useEffect } from 'react';
import { AppView, User, TipHistory } from './types';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ProfileEditor from './components/ProfileEditor';
import TeamManagement from './components/TeamManagement';
import CardGenerator from './components/CardGenerator';
import PublicLanding from './components/PublicLanding';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.AUTH);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('propinapp_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView(AppView.DASHBOARD);
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('propinapp_user', JSON.stringify(newUser));
    setView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('propinapp_user');
    setView(AppView.AUTH);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('propinapp_user', JSON.stringify(updatedUser));
  };

  const addTip = (amount: number, workerId?: string) => {
    if (!user) return;
    const newTip: TipHistory = {
      id: Math.random().toString(36).substr(2, 9),
      amount,
      timestamp: new Date().toISOString(),
      workerId,
      workerName: workerId ? user.workers?.find(w => w.id === workerId)?.name : undefined
    };
    const updatedUser = { ...user, tipHistory: [newTip, ...user.tipHistory] };
    updateUser(updatedUser);
  };

  if (view === AppView.AUTH) return <Auth onLogin={handleLogin} />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-lg mx-auto relative shadow-2xl bg-white min-h-[100dvh]">
      <header className="p-6 flex justify-between items-center bg-white sticky top-0 z-30 border-b border-slate-50">
        <h1 className="text-2xl font-black text-indigo-600 flex items-center gap-2">
          <i className="fa-solid fa-bolt-lightning"></i>
          Propinapp
        </h1>
        <button onClick={handleLogout} className="text-slate-300 hover:text-red-500 transition-colors"><i className="fa-solid fa-power-off"></i></button>
      </header>

      <main className="flex-1 p-6 pb-28">
        {view === AppView.DASHBOARD && <Dashboard user={user} setView={setView} />}
        {view === AppView.PROFILE_EDITOR && <ProfileEditor user={user} onSave={updateUser} onBack={() => setView(AppView.DASHBOARD)} />}
        {view === AppView.TEAM && <TeamManagement user={user} onSave={updateUser} onBack={() => setView(AppView.DASHBOARD)} />}
        {view === AppView.CARDS && <CardGenerator user={user} onBack={() => setView(AppView.DASHBOARD)} />}
        {view === AppView.PUBLIC_VIEW && <PublicLanding user={user} onTipReceived={addTip} onBack={() => setView(AppView.DASHBOARD)} />}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[420px] bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-2 flex justify-between items-center border border-white/50 z-40">
        <button onClick={() => setView(AppView.DASHBOARD)} className={`flex-1 py-4 rounded-[2rem] flex flex-col items-center gap-1 transition-all ${view === AppView.DASHBOARD ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}>
          <i className="fa-solid fa-house"></i>
          <span className="text-[9px] font-black uppercase tracking-widest">Panel</span>
        </button>
        <button onClick={() => setView(AppView.PROFILE_EDITOR)} className={`flex-1 py-4 rounded-[2rem] flex flex-col items-center gap-1 transition-all ${view === AppView.PROFILE_EDITOR ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}>
          <i className="fa-solid fa-gear"></i>
          <span className="text-[9px] font-black uppercase tracking-widest">Config</span>
        </button>
        <button onClick={() => setView(AppView.PUBLIC_VIEW)} className={`flex-1 py-4 rounded-[2rem] flex flex-col items-center gap-1 transition-all ${view === AppView.PUBLIC_VIEW ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400'}`}>
          <i className="fa-solid fa-eye"></i>
          <span className="text-[9px] font-black uppercase tracking-widest">Preview</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
