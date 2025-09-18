import React, { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import { Student } from './types';
import { StudentForm } from './components/StudentForm';
import { StudentCard } from './components/StudentCard';
import { SummaryReport } from './components/SummaryReport';
import { calculateAverage, calculateStats } from './utils/gradeCalculations';

function App() {
  const [students, setStudents] = useState<Student[]>([]);

  // Load students from localStorage on mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // Save students to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = (name: string, grades: number[]) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      grades,
      average: calculateAverage(grades),
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const removeStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const stats = calculateStats(students);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Student Grade Tracker</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage student grades, calculate averages, and track academic performance with ease.
            Add students, input their grades, and get comprehensive statistics instantly.
          </p>
        </div>

        {/* Summary Report */}
        <SummaryReport stats={stats} />

        {/* Student Form */}
        <StudentForm onAddStudent={addStudent} />

        {/* Students List */}
        {students.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              All Students ({students.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onRemove={removeStudent}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {students.length === 0 && (
          <div className="text-center py-16">
            <GraduationCap className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No Students Yet
            </h3>
            <p className="text-gray-500 mb-8">
              Get started by adding your first student and their grades above.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;