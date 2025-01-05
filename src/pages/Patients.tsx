import React from 'react';
import { Users, UserPlus, Download, Upload } from 'lucide-react';
import PatientTable from '../components/PatientTable';
import { patients } from '../data';
import { Patient } from '../types';

interface PatientsProps {
  onPatientClick?: (patient: Patient) => void;
}

export default function Patients({ onPatientClick }: PatientsProps) {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Patients</h1>
            <p className="text-secondary-600 dark:text-gray-400">Manage and view patient records</p>
          </div>
          
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-secondary-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-secondary-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              <UserPlus className="w-4 h-4" />
              <span>Add Patient</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { 
              label: 'Total Patients', 
              value: '1,234', 
              trend: '+12% from last month', 
              icon: Users, 
              color: 'bg-primary-500' 
            },
            { 
              label: 'New Patients', 
              value: '89', 
              trend: '+7% from last month', 
              icon: UserPlus, 
              color: 'bg-primary-500' 
            },
            { 
              label: 'Critical Cases', 
              value: '28', 
              trend: '-3% from last month', 
              icon: Users, 
              color: 'bg-amber-500' 
            },
            { 
              label: 'Scheduled Today', 
              value: '42', 
              trend: 'Same as yesterday', 
              icon: Users, 
              color: 'bg-green-500' 
            }
          ].map(({ label, value, trend, icon: Icon, color }) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-4">
                <div className={`${color} bg-opacity-10 p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-secondary-600 dark:text-gray-400">{label}</p>
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-semibold text-secondary-900 dark:text-white">{value}</p>
                  </div>
                  <p className="text-xs text-secondary-500 dark:text-gray-400 mt-1">{trend}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <PatientTable patients={patients} onPatientClick={onPatientClick} />
      </div>
    </div>
  );
}
