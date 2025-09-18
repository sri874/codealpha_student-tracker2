export interface Student {
  id: string;
  name: string;
  grades: number[];
  average: number;
}

export interface GradeStats {
  totalStudents: number;
  overallAverage: number;
  highestScore: number;
  lowestScore: number;
  highestAverage: number;
  lowestAverage: number;
}