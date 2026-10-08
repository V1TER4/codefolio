import type { GitHubProject, ProjectCustomization } from '../types/github';
import { Icon } from './Icon';

export type PortfolioProject = GitHubProject & { customization: ProjectCustomization };
export const projectTech = (project: PortfolioProject) => [...new Set([project.language, ...project.topics, ...(project.customization.technologies ?? [])].filter(Boolean))] as string[];

export function ProjectCard({ project, featured = false }: { project: PortfolioProject; featured?: boolean }) {
  const image = project.customization.image ? <img src={project.customization.image} alt="" loading="lazy" /> : <div className="project-placeholder" aria-hidden="true">{project.name.slice(0, 2).toUpperCase()}</div>;
  return <article className={`project-card ${featured ? 'project-card-featured' : ''}`}><div className="project-image">{image}</div><div className="project-body"><div className="project-heading"><h3>{project.name}</h3><span className="project-date">{new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(new Date(project.updatedAt))}</span></div><p>{project.customization.description ?? project.description ?? 'Projeto público desenvolvido para o portfólio.'}</p><div className="tech-list">{projectTech(project).slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-links"><a href={project.htmlUrl} target="_blank" rel="noreferrer"><Icon name="github" /> Código</a>{project.homepage && <a href={project.homepage} target="_blank" rel="noreferrer" className="demo-link">Ver demo <Icon name="arrow" /></a>}</div></div></article>;
}
