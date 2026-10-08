import { useMemo, useState } from 'react';
import { projectTech, ProjectCard, type PortfolioProject } from './ProjectCard';

export function ProjectsPage({ projects }: { projects: PortfolioProject[] }) {
  const [technology, setTechnology] = useState('all');
  const technologies = [...new Set(projects.flatMap(projectTech))].sort();
  const filtered = useMemo(() => projects.filter((project) => technology === 'all' || project.language === technology || project.customization.technologies?.includes(technology) || project.topics.includes(technology)), [projects, technology]);
  return <main className="projects-page"><section className="page-heading"><div className="container"><p className="eyebrow">Explorar</p><h1>Todos os projetos</h1><p>Uma coleção dos projetos públicos encontrados no GitHub.</p></div></section><section className="section"><div className="container"><div className="project-toolbar"><span>{projects.length} projeto(s) público(s)</span><select value={technology} onChange={(event) => setTechnology(event.target.value)} aria-label="Filtrar por tecnologia"><option value="all">Todas as tecnologias</option>{technologies.map((tech) => <option value={tech} key={tech}>{tech}</option>)}</select></div><div className="projects-grid">{filtered.map((project) => <ProjectCard key={project.name} project={project} />)}</div>{!filtered.length && <p className="no-results">Nenhum projeto encontrado para este filtro.</p>}</div></section></main>;
}
