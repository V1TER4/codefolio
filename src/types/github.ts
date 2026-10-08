export interface GitHubProject {
  name: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
  createdAt: string;
  visibility: string;
}

export interface ProjectCustomization {
  featured?: boolean;
  order?: number;
  image?: string;
  description?: string;
  technologies?: string[];
  hidden?: boolean;
}
