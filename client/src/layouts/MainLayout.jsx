import Navbar from '../components/Navbar';

function MainLayout({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;