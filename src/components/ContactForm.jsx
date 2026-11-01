import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail } from 'lucide-react';
import { INFO } from '../data/info';

/**
 * ContactForm Component
 * ==============================================================================
 * A fully functional, resilient contact form reusable across inline sections & modals.
 * Submits to a real endpoint (configurable via REACT_APP_CONTACT_ENDPOINT),
 * validates all inputs, prevents duplicate submissions, and provides honest status feedback.
 */
export default function ContactForm({ isModal = false, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const endpoint = process.env.REACT_APP_CONTACT_ENDPOINT || 'https://formsubmit.co/ajax/syedraheelshah0318@gmail.com';

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please write a message before submitting.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!validate()) return;

    setStatus('submitting');
    setStatusMessage('');

    try {
      const siteUrl = 'https://raheeljamal.vercel.app/';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _subject: formData.subject.trim()
            ? `[Portfolio Inquiry] ${formData.subject.trim()}`
            : `[Portfolio Inquiry] from ${formData.name.trim()}`,
          message: formData.message.trim(),
          _captcha: 'false',
          _template: 'table',
          _url: siteUrl,
          _next: siteUrl
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        // If FormSubmit indicates first-time activation needed
        if (data.success === 'false' && typeof data.message === 'string' && data.message.includes('Activation')) {
          setStatus('error');
          setStatusMessage('Endpoint setup notice: An activation confirmation was dispatched to the portfolio owner to activate direct inbox routing. Please reach out via direct email or WhatsApp in the meantime.');
          return;
        }

        setStatus('success');
        setStatusMessage(`Thank you, ${formData.name.trim()}! Your inquiry has been sent successfully. I will review and reply within 24 hours.`);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setValidationErrors({});
        if (onSuccess) onSuccess();
      } else {
        setStatus('error');
        const errText = data.message || `Server responded with status ${response.status}. Please reach out via WhatsApp or direct email.`;
        setStatusMessage(errText);
      }
    } catch (err) {
      setStatus('error');
      setStatusMessage('Network request failed. Please check your internet connection or reach out directly via email/WhatsApp.');
    }
  };

  const openMailtoFallback = () => {
    const mailtoUrl = `mailto:${INFO.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name || 'Visitor'}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
      {/* Name & Email Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label
            htmlFor={`contact-name-${isModal ? 'modal' : 'inline'}`}
            style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}
          >
            Your Name <span style={{ color: '#DC2626' }}>*</span>
          </label>
          <input
            id={`contact-name-${isModal ? 'modal' : 'inline'}`}
            type="text"
            name="name"
            placeholder="e.g. Sarah Miller"
            value={formData.name}
            onChange={handleInputChange}
            disabled={status === 'submitting'}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.65rem',
              background: 'rgba(24, 24, 27, 0.03)',
              border: validationErrors.name ? '1px solid #DC2626' : '1px solid rgba(24, 24, 27, 0.12)',
              color: '#18181B',
              fontSize: '0.92rem',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = validationErrors.name ? '#DC2626' : '#18181B')}
            onBlur={(e) => (e.currentTarget.style.borderColor = validationErrors.name ? '#DC2626' : 'rgba(24, 24, 27, 0.12)')}
          />
          {validationErrors.name && (
            <span style={{ fontSize: '0.75rem', color: '#DC2626', marginTop: '0.25rem', display: 'block' }}>
              {validationErrors.name}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor={`contact-email-${isModal ? 'modal' : 'inline'}`}
            style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}
          >
            Email Address <span style={{ color: '#DC2626' }}>*</span>
          </label>
          <input
            id={`contact-email-${isModal ? 'modal' : 'inline'}`}
            type="email"
            name="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleInputChange}
            disabled={status === 'submitting'}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.65rem',
              background: 'rgba(24, 24, 27, 0.03)',
              border: validationErrors.email ? '1px solid #DC2626' : '1px solid rgba(24, 24, 27, 0.12)',
              color: '#18181B',
              fontSize: '0.92rem',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = validationErrors.email ? '#DC2626' : '#18181B')}
            onBlur={(e) => (e.currentTarget.style.borderColor = validationErrors.email ? '#DC2626' : 'rgba(24, 24, 27, 0.12)')}
          />
          {validationErrors.email && (
            <span style={{ fontSize: '0.75rem', color: '#DC2626', marginTop: '0.25rem', display: 'block' }}>
              {validationErrors.email}
            </span>
          )}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor={`contact-subject-${isModal ? 'modal' : 'inline'}`}
          style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}
        >
          Subject / Project Type <span style={{ color: '#94A3B8', fontWeight: 400 }}>(Optional)</span>
        </label>
        <input
          id={`contact-subject-${isModal ? 'modal' : 'inline'}`}
          type="text"
          name="subject"
          placeholder="Software Development / AI Automation / General Inquiry"
          value={formData.subject}
          onChange={handleInputChange}
          disabled={status === 'submitting'}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.65rem',
            background: 'rgba(24, 24, 27, 0.03)',
            border: '1px solid rgba(24, 24, 27, 0.12)',
            color: '#18181B',
            fontSize: '0.92rem',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#18181B')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(24, 24, 27, 0.12)')}
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor={`contact-message-${isModal ? 'modal' : 'inline'}`}
          style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#52525B', marginBottom: '0.35rem' }}
        >
          Your Message <span style={{ color: '#DC2626' }}>*</span>
        </label>
        <textarea
          id={`contact-message-${isModal ? 'modal' : 'inline'}`}
          name="message"
          rows={isModal ? 3 : 4}
          placeholder="Describe your project, timeline, or engineering inquiry..."
          value={formData.message}
          onChange={handleInputChange}
          disabled={status === 'submitting'}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.65rem',
            background: 'rgba(24, 24, 27, 0.03)',
            border: validationErrors.message ? '1px solid #DC2626' : '1px solid rgba(24, 24, 27, 0.12)',
            color: '#18181B',
            fontSize: '0.92rem',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = validationErrors.message ? '#DC2626' : '#18181B')}
          onBlur={(e) => (e.currentTarget.style.borderColor = validationErrors.message ? '#DC2626' : 'rgba(24, 24, 27, 0.12)')}
        />
        {validationErrors.message && (
          <span style={{ fontSize: '0.75rem', color: '#DC2626', marginTop: '0.25rem', display: 'block' }}>
            {validationErrors.message}
          </span>
        )}
      </div>

      {/* Honest Status Notifications */}
      {status === 'success' && (
        <div
          role="status"
          style={{
            padding: '0.85rem 1rem',
            borderRadius: '0.65rem',
            background: 'rgba(22, 101, 52, 0.08)',
            border: '1px solid rgba(22, 101, 52, 0.25)',
            color: '#166534',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.6rem'
          }}
        >
          <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{statusMessage}</span>
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          style={{
            padding: '0.85rem 1rem',
            borderRadius: '0.65rem',
            background: 'rgba(220, 38, 38, 0.06)',
            border: '1px solid rgba(220, 38, 38, 0.22)',
            color: '#B91C1C',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{statusMessage}</span>
          </div>

          <button
            type="button"
            onClick={openMailtoFallback}
            style={{
              alignSelf: 'flex-start',
              background: 'none',
              border: 'none',
              padding: 0,
              color: '#9A5B32',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              textDecoration: 'underline',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Mail size={14} /> Open in your default email client
          </button>
        </div>
      )}

      {/* Submit Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary"
          style={{
            flex: 1,
            padding: '0.85rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            justifyContent: 'center',
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
            opacity: status === 'submitting' ? 0.75 : 1
          }}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Send Inquiry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
