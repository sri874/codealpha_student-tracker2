import React, { useState } from 'react';
import { Plus, UserPlus } from 'lucide-react';

interface StudentFormProps {
  onAddStudent: (name: string, grades: number[]) => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({ onAddStudent }) => {
  const [name, setName] = useState('');
  const [gradeInput, setGradeInput] = useState('');
  const [grades, setGrades] = useState<number[]>([]);

  const addGrade = () => {
    const grade = parseFloat(gradeInput);
    if (!isNaN(grade) && grade >= 0 && grade <= 100) {
      setGrades([...grades, grade]);
      setGradeInput('');
    }
  };

  const removeGrade = (index: number) => {
    setGrades(grades.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && grades.length > 0) {
      onAddStudent(name.trim(), grades);
      setName('');
      setGrades([]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <UserPlus className="w-6 h-6 text-blue-600" />
        Add New Student
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
            Student Name
          </label>
          <input
            type="text"
            id="studentName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter student name"
            required
          />
        </div>

        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
            Add Grades (0-100)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              id="grade"
              value={gradeInput}
              onChange={(e) => setGradeInput(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter grade"
              min="0"
              max="100"
              step="0.1"
            />
            <button
              type="button"
              onClick={addGrade}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {grades.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Grades ({grades.length})
            </label>
            <div className="flex flex-wrap gap-2">
              {grades.map((grade, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm cursor-pointer hover:bg-blue-200 transition-colors"
                  onClick={() => removeGrade(index)}
                >
                  {grade}
                  <span className="text-xs opacity-70">×</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!name.trim() || grades.length === 0}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};