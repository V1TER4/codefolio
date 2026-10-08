import profileData from './profile.json';

/** Simple deployment-specific values come from .env; long profile content lives in JSON files. */
export function profileEnv(viteKey: string, nodeKey = viteKey): string {
  if (typeof process !== 'undefined' && process.env?.[nodeKey]) return process.env[nodeKey] as string;
  return import.meta.env?.[viteKey] ?? '';
}

export const GITHUB_USERNAME = profileEnv('VITE_GITHUB_USERNAME', 'GITHUB_USERNAME') || 'SEU_USUARIO';
const linkedinUrl = profileEnv('VITE_LINKEDIN_URL', 'LINKEDIN_URL');
const email = profileEnv('VITE_EMAIL', 'EMAIL');

export const profile = {
  ...profileData,
  githubUrl: GITHUB_USERNAME === 'SEU_USUARIO' ? '' : `https://github.com/${GITHUB_USERNAME}`,
  linkedinUrl,
  email,
};
