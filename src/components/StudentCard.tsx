import React from 'react';
import { User, Trash2, BarChart3 } from 'lucide-react';
import { Student } from '../types';
import { getLetterGrade, getGradeColor } from '../utils/gradeCalculations';

interface StudentCardProps {
  student: Student;
  onRemove: (id: string) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onRemove }) => {
  const letterGrade = getLetterGrade(student.average);
  const gradeColorClass = getGradeColor(student.average);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
            <p className="text-gray-500 text-sm">{student.grades.length} grades recorded</p>
          </div>
        </div>
        <button
          onClick={() => onRemove(student.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">Average Grade</span>
          </div>
          <div className={`px-3 py-1 rounded-full font-bold text-lg ${gradeColorClass}`}>
            {student.average}% ({letterGrade})
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-2">Individual Grades</h4>
          <div className="flex flex-wrap gap-2">
            {student.grades.map((grade, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-md text-sm font-medium ${getGradeColor(grade)}`}
              >
                {grade}%
              </span>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Highest:</span>
              <span className="font-semibold text-green-600 ml-1">
                {Math.max(...student.grades)}%
              </span>
            </div>
            <div>
              <span className="text-gray-500">Lowest:</span>
              <span className="font-semibold text-red-600 ml-1">
                {Math.min(...student.grades)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};