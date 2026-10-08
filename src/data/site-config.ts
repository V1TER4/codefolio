import profileData from './profile.json';

/** Simple deployment-specific values come from .env; long profile content lives in JSON files. */
export function profileEnv(viteKey: string, nodeKey = viteKey): string {
  if (typeof process !== 'undefined' && process.env?.[nodeKey]) return process.env[nodeKey] as string;
  return import.meta.env?.[viteKey] ?? '';
}

export const GITHUB_USERNAME = profileEnv('VITE_GITHUB_USERNAME', 'GITHUB_USERNAME') || 'V1TER4';
const linkedinUrl = profileEnv('VITE_LINKEDIN_URL', 'LINKEDIN_URL') || 'https://www.linkedin.com/in/victor-castilhop/';
const email = profileEnv('VITE_EMAIL', 'EMAIL') || 'victor.cast.2@gmail.com';

export const profile = {
  ...profileData,
  githubUrl: GITHUB_USERNAME === 'SEU_USUARIO' ? '' : `https://github.com/${GITHUB_USERNAME}`,
  linkedinUrl,
  email,
};
