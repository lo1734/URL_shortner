import { useRef, forwardRef, useImperativeHandle } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

/**
 * Usage:
 *   const captchaRef = useRef();
 *   <Captcha ref={captchaRef} />
 *
 *   // get token:  captchaRef.current.getToken()
 *   // reset:      captchaRef.current.reset()
 */
const Captcha = forwardRef(function Captcha(_, ref) {
  const recaptchaRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getToken: () => recaptchaRef.current?.getValue() || null,
    reset:    () => recaptchaRef.current?.reset(),
  }));

  if (!SITE_KEY || SITE_KEY === 'your_recaptcha_site_key_here') {
    // Show a placeholder when no key is configured so development still works visually
    return (
      <div
        style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-accent)',
          background: 'rgba(124,58,237,0.06)',
          fontSize: '13px',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span style={{ fontSize: '18px' }}>🤖</span>
        <span>
          reCAPTCHA not configured.{' '}
          <a
            href="https://www.google.com/recaptcha/admin/create"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent-light)', textDecoration: 'underline' }}
          >
            Get your site key →
          </a>
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        // reCAPTCHA iframe has a fixed white background — wrap it
        filter: 'none',
      }}
    >
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={SITE_KEY}
        theme="dark"
        size="normal"
      />
    </div>
  );
});

export default Captcha;
