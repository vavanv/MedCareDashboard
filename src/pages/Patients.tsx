import React, { useState } from 'react';
import { Users, UserPlus, Download, Upload } from 'lucide-react';
import PatientTable from '../components/PatientTable';
import AddPatientForm from '../components/AddPatientForm';
import { patients as initialPatients } from '../data';
import { Patient } from '../types';

export default function Patients({ onPatientClick }: PatientsProps) {
  const [patients, setPatients] = useState(initialPatients);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleAddPatient = (newPatient: Patient) => {
    setPatients(prev => [...prev, newPatient]);
  };

  return (
    <div className="p-8">
      <AddPatientForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddPatient}
      />
      
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
            <button 
              onClick={() => setIsAddFormOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Patient</span>
            </button>
          </div>
        </div>

        {/* Rest of the Patients component remains the same */}
        <PatientTable patients={patients} onPatientClick={onPatientClick} />
      </div>
    </div>
  );
}
