import { profile } from '../data/site-config';

export function Footer() {
  return <footer className="site-footer"><div className="container"><span>© 2026 {profile.name} &nbsp;</span><span>Feito com TypeScript e curiosidade.</span></div></footer>;
}
