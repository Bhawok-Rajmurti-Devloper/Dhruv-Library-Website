import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell 
} from 'recharts';
import { StatData } from '../types';

const learningData: StatData[] = [
  { name: 'Jan', value: 4 },
  { name: 'Feb', value: 7 },
  { name: 'Mar', value: 5 },
  { name: 'Apr', value: 12 },
  { name: 'May', value: 9 },
  { name: 'Jun', value: 15 },
];

const skillsData: StatData[] = [
  { name: 'Science', value: 120, fullMark: 150 },
  { name: 'History', value: 98, fullMark: 150 },
  { name: 'Tech', value: 140, fullMark: 150 },
  { name: 'Philosophy', value: 85, fullMark: 150 },
  { name: 'Arts', value: 65, fullMark: 150 },
  { name: 'Math', value: 110, fullMark: 150 },
];

const StatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
      {/* Chart 1: Reading Velocity */}
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-orange-600 font-serif text-lg mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-orange-500 rounded-sm"></span>
          Knowledge Acquisition Velocity
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={learningData}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: 'rgba(249, 115, 22, 0.1)'}}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #fed7aa', borderRadius: '8px', color: '#1e293b' }}
                itemStyle={{ color: '#f97316' }}
              />
              <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} barSize={30}>
                 {learningData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#f97316' : '#fdba74'} />
                 ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Cognitive Map */}
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-orange-600 font-serif text-lg mb-6 flex items-center gap-2">
          <span className="w-2 h-6 bg-purple-500 rounded-sm"></span>
          Cognitive Mastery Map
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
              <PolarGrid stroke="#cbd5e1" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar
                name="Proficiency"
                dataKey="value"
                stroke="#d946ef"
                strokeWidth={2}
                fill="#d946ef"
                fillOpacity={0.2}
              />
              <Tooltip 
                 contentStyle={{ backgroundColor: '#fff', border: '1px solid #d946ef', borderRadius: '8px', color: '#1e293b' }}
                 itemStyle={{ color: '#d946ef' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;