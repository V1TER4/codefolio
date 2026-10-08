import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import type { GitHubProject } from '../src/types/github';

const OUTPUT = resolve(process.cwd(), 'src/data/generated/projects.json');

async function loadDotEnv(): Promise<void> {
  try {
    const content = await readFile(resolve(process.cwd(), '.env'), 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  } catch {
    // .env is optional in CI, where variables can be supplied by Actions.
  }
}

interface GitHubRepository {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  visibility?: string;
  fork: boolean;
}

async function fetchPage(page: number): Promise<GitHubRepository[]> {
  const url = `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?per_page=100&page=${page}&sort=updated`;
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-build' },
  });

  if (!response.ok) {
    const detail = response.status === 403 ? 'limite de requisições atingido' : `${response.status} ${response.statusText}`;
    throw new Error(`GitHub API: ${detail}`);
  }
  return response.json() as Promise<GitHubRepository[]>;
}

async function fetchProjects(): Promise<void> {
  if (GITHUB_USERNAME === 'SEU_USUARIO') {
    console.warn('GITHUB_USERNAME ainda não foi configurado; gerando uma lista vazia.');
    await writeFile(OUTPUT, '[]\n');
    return;
  }

  try {
    const repositories: GitHubRepository[] = [];
    for (let page = 1; ; page += 1) {
      const currentPage = await fetchPage(page);
      repositories.push(...currentPage);
      if (currentPage.length < 100) break;
    }

    const projects: GitHubProject[] = repositories
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        htmlUrl: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language,
        topics: repo.topics ?? [],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        createdAt: repo.created_at,
        visibility: repo.visibility ?? 'public',
      }));

    await mkdir(dirname(OUTPUT), { recursive: true });
    await writeFile(OUTPUT, `${JSON.stringify(projects, null, 2)}\n`);
    console.log(`✓ ${projects.length} projeto(s) salvo(s) em ${OUTPUT}`);
  } catch (error) {
    console.warn(`Não foi possível consultar o GitHub: ${(error as Error).message}`);
    console.warn('O build continuará com os dados já existentes (ou lista vazia).');
  }
}

await loadDotEnv();
const { GITHUB_USERNAME } = await import('../src/data/site-config');
await fetchProjects();
