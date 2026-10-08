import { profile } from '../data/site-config';
import type { TimelineItem } from '../types/portfolio';
import { Icon } from './Icon';
import { ProjectCard, type PortfolioProject } from './ProjectCard';
import { TechIcon } from './TechIcon';

function Timeline({ items, emptyLabel }: { items: TimelineItem[]; emptyLabel: string }) {
  if (!items.length) return <div className="timeline-empty">{emptyLabel}</div>;
  return <div className="timeline">{items.map((item) => <article className="timeline-item" key={`${item.title}-${item.organization}`}><span className="timeline-dot" /><div><span className="timeline-period">{item.period}</span><h3>{item.title}</h3><h4>{item.organization}</h4>{item.description && <p>{item.description}</p>}</div></article>)}</div>;
}

export function HomePage({ featured, experience, education }: { featured: PortfolioProject[]; experience: TimelineItem[]; education: TimelineItem[] }) {
  return <main>
    <section className="hero" id="inicio"><div className="container hero-grid"><div><p className="eyebrow">Olá, eu sou</p><h1>{profile.name}</h1><p className="hero-role">{profile.role}</p><p className="hero-copy">{profile.bio}</p><div className="hero-tech">{['PHP', 'Laravel', 'Node.js', 'TypeScript', 'React'].map((tech) => <span key={tech}>{tech}</span>)}</div><div className="hero-actions"><a className="button button-primary" href={profile.githubUrl} target="_blank" rel="noreferrer"><Icon name="github" /> Ver no GitHub</a><a className="button button-secondary" href={profile.linkedinUrl} target="_blank" rel="noreferrer">in&nbsp; Conectar no LinkedIn</a></div></div><div className="profile-aside"><div className="profile-monogram">VC</div><div className="profile-details">{profile.location && <span><Icon name="location" /> {profile.location}</span>}{profile.experience && <span><Icon name="briefcase" /> {profile.experience}</span>}{profile.email && <span><Icon name="mail" /> {profile.email}</span>}</div></div></div></section>
    <section className="section projects-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">O que eu construo</p><h2>Projetos em destaque</h2></div><a className="section-index" href="#/projetos">Ver todos os projetos →</a></div>{featured.length ? <div className="featured-grid">{featured.map((project) => <ProjectCard key={project.name} project={project} featured />)}</div> : <div className="empty-state">Configure seus projetos em <code>src/data/project-config.ts</code> para destacá-los aqui.</div>}</div></section>
    <section className="section about-section" id="sobre"><div className="container about-grid"><div><p className="eyebrow">Um pouco sobre mim</p><h2>Sobre mim</h2><p>{profile.bio}</p></div><div className="stack-column"><h3>Stack principal</h3><div className="stack-list">{['PHP', 'Laravel', 'Lumen', 'Node.js', 'TypeScript', 'React', 'JavaScript', 'MySQL'].map((tech) => <span className="stack-item" key={tech}><TechIcon technology={tech} /><span>{tech}</span></span>)}</div></div></div></section>
    <section className="section timeline-section" id="experiencia"><div className="container timeline-grid"><div><p className="eyebrow">Trajetória</p><h2>Experiência</h2><Timeline items={experience} emptyLabel="Adicione suas experiências em src/data/experience.json." /></div><div id="formacao"><p className="eyebrow">Aprendizado</p><h2>Formação</h2><Timeline items={education} emptyLabel="Adicione sua formação em src/data/education.json." /></div></div></section>
  </main>;
}
