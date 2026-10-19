import { Download, Printer } from 'lucide-react';
import Window from '../components/Window';
import {
  profile,
  collections,
  skills,
  achievements,
  publication,
  resumeProjectIds,
  resumeExperienceIds,
} from '../data/profile';

const pick = (list, ids) => ids.map((id) => list.find((x) => x.id === id)).filter(Boolean);
const bare = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

export default function ResumeApp() {
  const experience = pick(collections.experience, resumeExperienceIds);
  const projects = pick(collections.projects, resumeProjectIds);

  return (
    <Window id="resume" width={740} height={580}>
      <div className="resume">
        <div className="toolbar">
          <strong>{profile.name}.pdf</strong>
          {profile.resumePdf ? (
            <a className="btn primary" href={profile.resumePdf} download>
              <Download size={14} /> Download PDF
            </a>
          ) : (
            <button className="btn" onClick={() => window.print()}>
              <Printer size={14} /> Print / Save as PDF
            </button>
          )}
        </div>
        <div className="resume-scroll">
          <div className="resume-paper">
            <h1>{profile.name}</h1>
            <p className="r-contact">
              {profile.email}
              {profile.links.linkedin && ` · ${bare(profile.links.linkedin)}`}
              {profile.links.github && ` · ${bare(profile.links.github)}`}
            </p>

            <h3>Education</h3>
            {collections.education.map((e) => (
              <div key={e.id} className="r-item">
                <div className="r-head">
                  <b>
                    {e.title}, {e.subtitle}
                  </b>
                  <span>{e.meta}</span>
                </div>
                {e.bullets[0] && <div className="r-note">{e.bullets[0]}</div>}
              </div>
            ))}

            <h3>Technical skills</h3>
            {skills.map((g) => (
              <p key={g.group} className="r-skill">
                <b>{g.group}:</b> {g.items.join(', ')}
              </p>
            ))}

            <h3>Experience</h3>
            {experience.map((e) => (
              <div key={e.id} className="r-item">
                <div className="r-head">
                  <b>
                    {e.title} | {e.subtitle}
                  </b>
                  <span>{e.meta}</span>
                </div>
                <ul>
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h3>Projects</h3>
            {projects.map((p) => (
              <div key={p.id} className="r-item">
                <div className="r-head">
                  <b>
                    {p.title}
                    {p.links[0] && (
                      <>
                        {' '}
                        <a href={p.links[0].href} target="_blank" rel="noreferrer">
                          [{p.links[0].label}]
                        </a>
                      </>
                    )}
                  </b>
                  <span>{p.meta}</span>
                </div>
                <ul>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h3>Publications</h3>
            <p className="r-skill">
              <b>Research paper:</b>{' '}
              <a href={publication.href} target="_blank" rel="noreferrer">
                {publication.title}
              </a>
            </p>

            <h3>Achievements</h3>
            {achievements.map((a) => (
              <p key={a} className="r-skill">
                {a}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}
