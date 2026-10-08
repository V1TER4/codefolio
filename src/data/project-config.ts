import type { ProjectCustomization } from '../types/github';

/** Customize only portfolio presentation; repository data comes from GitHub. */
export const projectConfig: Record<string, ProjectCustomization> = {
  // 'nome-do-repositorio': {
  //   featured: true,
  //   order: 1,
  //   image: '/projects/nome-do-repositorio.png',
  //   description: 'Uma descrição mais editorial para o seu portfólio.',
  //   technologies: ['Tecnologia extra'],
  // },
  'Code Duel': {
    featured: true,
    order: 1,
    image: '/projects/code-duel.png',
    description: 'Projeto de um jogo de navegador, onde dois jogadores podem competir entre si em tempo real, onde cada um escolhe uma sequencia de numeros e o objetivo é adivinhar a sequencia do adversário. O jogo é construído com Node.js, TypeScript, React e TailwindCSS, utilizando WebSockets para comunicação em tempo real.',
    technologies: ['NodeJs', 'TypeScript', 'React', 'TailwindCSS'],
  },
  'donation-system-web': {
    featured: true,
    order: 2,
    // image: '/projects/donation-system-web.png',
    description: 'Projeto de um sistema de doações online, onde os usuários podem criar campanhas de arrecadação e receber doações de outros usuários. O sistema é construído com Node.js, TypeScript, React e TailwindCSS, utilizando Stripe para processamento de pagamentos.',
    technologies: ['NodeJs', 'TypeScript', 'React', 'TailwindCSS', 'Stripe'],
  },
  'donation-system-api': {
    featured: true,
    order: 3,
    // image: '/projects/donation-system-api.png',
    description: 'Projeto de uma API para um sistema de doações online, onde os usuários podem criar campanhas de arrecadação e receber doações de outros usuários. A API é construída com Node.js, TypeScript e Express, utilizando Stripe para processamento de pagamentos.',
    technologies: ['NodeJs', 'TypeScript', 'Express', 'Stripe'],
  },
};
