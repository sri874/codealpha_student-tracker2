import { Student, GradeStats } from '../types';

export const calculateAverage = (grades: number[]): number => {
  if (grades.length === 0) return 0;
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return Math.round((sum / grades.length) * 100) / 100;
};

export const getLetterGrade = (score: number): string => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

export const getGradeColor = (score: number): string => {
  if (score >= 90) return 'text-green-600 bg-green-50';
  if (score >= 80) return 'text-blue-600 bg-blue-50';
  if (score >= 70) return 'text-yellow-600 bg-yellow-50';
  if (score >= 60) return 'text-orange-600 bg-orange-50';
  return 'text-red-600 bg-red-50';
};

export const calculateStats = (students: Student[]): GradeStats => {
  if (students.length === 0) {
    return {
      totalStudents: 0,
      overallAverage: 0,
      highestScore: 0,
      lowestScore: 0,
      highestAverage: 0,
      lowestAverage: 0,
    };
  }

  const allGrades = students.flatMap(student => student.grades);
  const averages = students.map(student => student.average);
  
  const overallSum = students.reduce((sum, student) => {
    return sum + (student.grades.reduce((gradeSum, grade) => gradeSum + grade, 0));
  }, 0);
  const totalGrades = students.reduce((total, student) => total + student.grades.length, 0);

  return {
    totalStudents: students.length,
    overallAverage: totalGrades > 0 ? Math.round((overallSum / totalGrades) * 100) / 100 : 0,
    highestScore: allGrades.length > 0 ? Math.max(...allGrades) : 0,
    lowestScore: allGrades.length > 0 ? Math.min(...allGrades) : 0,
    highestAverage: averages.length > 0 ? Math.max(...averages) : 0,
    lowestAverage: averages.length > 0 ? Math.min(...averages) : 0,
  };
};