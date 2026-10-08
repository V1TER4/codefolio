import { useEffect, useMemo, useState } from 'react';
import projects from './data/generated/projects.json';
import { education, experience } from './data/portfolio-content';
import { projectConfig } from './data/project-config';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProjectsPage } from './components/ProjectsPage';
import type { PortfolioProject } from './components/ProjectCard';
import type { GitHubProject } from './types/github';

const normalizeProjectName = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');
const customizationFor = (name: string) => projectConfig[name] ?? Object.entries(projectConfig).find(([key]) => normalizeProjectName(key) === normalizeProjectName(name))?.[1] ?? {};

export function App() {
  const [hash, setHash] = useState(window.location.hash);
  const [lightTheme, setLightTheme] = useState(() => window.localStorage.getItem('portfolio-theme') === 'light');
  const allProjects = useMemo<PortfolioProject[]>(() => (projects as GitHubProject[]).filter((project) => !customizationFor(project.name).hidden).map((project) => ({ ...project, customization: customizationFor(project.name) })), []);
  const featured = useMemo(() => allProjects.filter((project) => project.customization.featured).sort((a, b) => (a.customization.order ?? 999) - (b.customization.order ?? 999)), [allProjects]);
  const page = hash === '#/projetos' ? 'projects' : 'home';

  useEffect(() => { const onHashChange = () => setHash(window.location.hash); window.addEventListener('hashchange', onHashChange); return () => window.removeEventListener('hashchange', onHashChange); }, []);
  useEffect(() => { document.documentElement.classList.toggle('light-theme', lightTheme); window.localStorage.setItem('portfolio-theme', lightTheme ? 'light' : 'dark'); }, [lightTheme]);
  useEffect(() => { const scrollTarget = new URLSearchParams(hash.split('?')[1] ?? '').get('scroll'); if (scrollTarget) window.setTimeout(() => document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' }), 50); else window.scrollTo({ top: 0, behavior: 'instant' }); }, [hash]);

  return <><Header activePage={page} lightTheme={lightTheme} onThemeToggle={() => setLightTheme((current) => !current)} />{page === 'projects' ? <ProjectsPage projects={allProjects} /> : <HomePage featured={featured} experience={experience} education={education} />}<Footer /></>;
}
