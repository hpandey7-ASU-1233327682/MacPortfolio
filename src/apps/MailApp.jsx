import { useState } from 'react';
import { Send, Copy, Check, Github, Linkedin } from 'lucide-react';
import Window from '../components/Window';
import { profile } from '../data/profile';

export default function MailApp() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [copied, setCopied] = useState(false);

  const send = (e) => {
    e.preventDefault();
    const q = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = `mailto:${profile.email}?${q}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: the address is visible anyway */
    }
  };

  return (
    <Window id="mail" width={620} height={480}>
      <form className="mail" onSubmit={send}>
        <div className="mail-row">
          <span>To:</span>
          <b>{profile.email}</b>
          <button type="button" className="icon-btn" onClick={copy} aria-label="Copy email address">
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <div className="mail-row">
          <span>Subject:</span>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Say hi" />
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={`Hi ${profile.firstName},`}
          aria-label="Message"
        />
        <div className="mail-foot">
          <div className="link-row">
            {profile.links.github && (
              <a className="btn" href={profile.links.github} target="_blank" rel="noreferrer">
                <Github size={14} /> GitHub
              </a>
            )}
            {profile.links.linkedin && (
              <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={14} /> LinkedIn
              </a>
            )}
          </div>
          <button type="submit" className="btn primary">
            <Send size={14} /> Send
          </button>
        </div>
      </form>
    </Window>
  );
}
