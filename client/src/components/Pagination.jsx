import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Build page number array with ellipsis
  function getPageNumbers() {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }

  const btnBase = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '36px',
    minWidth: '36px',
    padding: '0 8px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    fontWeight: 500,
    border: '1px solid var(--border)',
    background: 'var(--bg-card)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'var(--transition)',
  };

  const btnActive = {
    ...btnBase,
    background: 'var(--accent)',
    border: '1px solid var(--accent)',
    color: '#fff',
    fontWeight: 700,
  };

  const btnDisabled = {
    ...btnBase,
    opacity: 0.35,
    cursor: 'not-allowed',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '20px',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      {/* Info text */}
      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
        Page <strong style={{ color: 'var(--text-primary)' }}>{page}</strong> of{' '}
        <strong style={{ color: 'var(--text-primary)' }}>{totalPages}</strong>
      </p>

      {/* Page controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Previous */}
        <button
          style={page === 1 ? btnDisabled : btnBase}
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          onMouseEnter={e => { if (page !== 1) { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
          onMouseLeave={e => { if (page !== 1) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
          title="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} style={{ color: 'var(--text-muted)', padding: '0 4px', fontSize: '14px' }}>
              …
            </span>
          ) : (
            <button
              key={p}
              style={p === page ? btnActive : btnBase}
              onClick={() => p !== page && onPageChange(p)}
              onMouseEnter={e => { if (p !== page) { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
              onMouseLeave={e => { if (p !== page) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          style={page === totalPages ? btnDisabled : btnBase}
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          onMouseEnter={e => { if (page !== totalPages) { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
          onMouseLeave={e => { if (page !== totalPages) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
          title="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;