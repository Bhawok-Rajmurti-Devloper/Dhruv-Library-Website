export interface CourseData {
  id: string;
  title: string;
  color: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  icon?: 'globe' | 'monitor' | 'pen' | 'keyboard' | 'book';
}

export interface BlockProps {
  data: CourseData;
  isActive: boolean;
  onClick: (id: string) => void;
  onHover: (hovered: boolean) => void;
}
