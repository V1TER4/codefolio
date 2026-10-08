import educationData from './education.json';
import experienceData from './experience.json';
import type { TimelineItem } from '../types/portfolio';

export const experience = experienceData as TimelineItem[];
export const education = educationData as TimelineItem[];
