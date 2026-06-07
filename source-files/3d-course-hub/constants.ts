import { CourseData } from './types';

// Colors extracted from the reference image
export const COLORS = {
  blue: '#0047AB',    // Basics, Graphics
  yellow: '#FFB800',  // DTP
  green: '#00A651',   // CCC
  cyan: '#00ADEF',    // Internet
  text: '#ffffff',
};

export const COURSES: CourseData[] = [
  {
    id: 'basics',
    title: 'BASICS OF\nCOMPUTER',
    color: COLORS.blue,
    position: [-2.4, 1.2, 0],
    icon: 'monitor'
  },
  {
    id: 'dtp',
    title: 'DTP\n(TYPING)',
    color: COLORS.yellow,
    position: [0, 1.2, 0.2], // Slightly forward to overlap if needed
    icon: 'keyboard'
  },
  {
    id: 'graphics',
    title: 'GRAPHICS\nDESIGNING',
    color: COLORS.blue,
    position: [2.4, 1.2, 0],
    icon: 'pen'
  },
  {
    id: 'ccc',
    title: 'CCC\nCOURSE',
    color: COLORS.green,
    position: [-1.2, -1.3, 0.1],
    icon: 'book'
  },
  {
    id: 'internet',
    title: 'INTERNET',
    color: COLORS.cyan,
    position: [1.2, -1.3, 0.1],
    icon: 'globe'
  },
];
