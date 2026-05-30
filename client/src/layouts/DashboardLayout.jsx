import { useState } from 'react';
import { Menu, Link2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';

function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Desktop Sidebar */}
      <div
        style={{
          display: 'none',
          width: 'var(--sidebar-width)',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
        className="md-sidebar"
      >
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Sidebar shown on md+ */}
      <aside
        style={{
          width: 'var(--sidebar-width)',
          flexShrink: 0,
          height: '100vh',
          position: 'sticky',
          top: 0,
          borderRight: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
          overflowY: 'auto',
        }}
        className="hidden md:block"
      >
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} desktop />
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Mobile Topbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            height: '60px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
          className="md:hidden"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="btn-ghost"
            style={{ color: 'var(--text-primary)', padding: '8px' }}
          >
            <Menu size={22} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '18px' }}>
            <Link2 size={20} style={{ color: 'var(--accent-light)' }} />
            <span>Shortify</span>
          </div>
          <div style={{ width: 38 }} />
        </div>

        {/* Mobile Sidebar Drawer */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Page Content */}
        <main style={{ padding: '32px', maxWidth: '1200px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;