import { profile } from '../data/site-config';
import { Icon } from './Icon';

export function Header({ activePage, onThemeToggle, lightTheme }: { activePage: 'home' | 'projects'; onThemeToggle: () => void; lightTheme: boolean }) {
  return <header className="site-header"><div className="container nav-wrap">
    <a className="brand" href="#/"><span className="brand-mark">&lt;/&gt;</span> {profile.name}</a>
    <nav aria-label="Navegação principal"><a className={activePage === 'home' ? 'active' : ''} href="#/">Início</a><a className={activePage === 'projects' ? 'active' : ''} href="#/projetos">Projetos</a><a href="#/?scroll=sobre">Sobre</a></nav>
    <div className="header-links"><a href={profile.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a><a href={profile.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><button className="theme-button" type="button" aria-label={lightTheme ? 'Ativar tema escuro' : 'Ativar tema claro'} onClick={onThemeToggle}>{lightTheme ? '☾' : '☼'}</button></div>
  </div></header>;
}
