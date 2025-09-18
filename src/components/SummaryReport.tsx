import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Users, Award } from 'lucide-react';
import { GradeStats } from '../types';

interface SummaryReportProps {
  stats: GradeStats;
}

export const SummaryReport: React.FC<SummaryReportProps> = ({ stats }) => {
  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <div className={`p-6 rounded-xl ${color} transform hover:scale-105 transition-all`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-green-600" />
        Summary Report
      </h2>

      {stats.totalStudents === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No students added yet</p>
          <p className="text-sm">Add your first student to see statistics</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<Users className="w-8 h-8" />}
            color="bg-blue-50 text-blue-700"
          />
          
          <StatCard
            title="Overall Average"
            value={`${stats.overallAverage}%`}
            icon={<BarChart3 className="w-8 h-8" />}
            color="bg-purple-50 text-purple-700"
          />
          
          <StatCard
            title="Highest Score"
            value={`${stats.highestScore}%`}
            icon={<TrendingUp className="w-8 h-8" />}
            color="bg-green-50 text-green-700"
          />
          
          <StatCard
            title="Lowest Score"
            value={`${stats.lowestScore}%`}
            icon={<TrendingDown className="w-8 h-8" />}
            color="bg-red-50 text-red-700"
          />
          
          <StatCard
            title="Best Average"
            value={`${stats.highestAverage}%`}
            icon={<Award className="w-8 h-8" />}
            color="bg-yellow-50 text-yellow-700"
          />
          
          <StatCard
            title="Lowest Average"
            value={`${stats.lowestAverage}%`}
            icon={<TrendingDown className="w-8 h-8" />}
            color="bg-orange-50 text-orange-700"
          />
        </div>
      )}
    </div>
  );
};