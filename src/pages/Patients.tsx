import React, { useState } from 'react';
import { Users, UserPlus, Download, Upload } from 'lucide-react';
import PatientTable from '../components/PatientTable';
import AddPatientForm from '../components/AddPatientForm';
import { patients as initialPatients } from '../data';
import { Patient } from '../types';
import { Box, Button, Stack } from '@mui/material';

export default function Patients({ onPatientClick }: { onPatientClick: (patient: Patient) => void }) {
  const [patients, setPatients] = useState(initialPatients);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleAddPatient = (newPatient: Patient) => {
    setPatients(prev => [...prev, newPatient]);
    setIsAddFormOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <AddPatientForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddPatient}
      />
      
      <Box sx={{ maxWidth: '100%', mx: 'auto' }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { sm: 'center' },
          gap: 2,
          mb: 4
        }}>
          <Box>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Patients</h1>
            <p className="text-secondary-600 dark:text-gray-400">Manage and view patient records</p>
          </Box>
          
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Upload size={16} />}
              sx={{ textTransform: 'none' }}
            >
              Import
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download size={16} />}
              sx={{ textTransform: 'none' }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<UserPlus size={16} />}
              onClick={() => setIsAddFormOpen(true)}
              sx={{ textTransform: 'none' }}
            >
              Add Patient
            </Button>
          </Stack>
        </Box>

        <Box sx={{ 
          height: 'calc(100vh - 200px)',
          width: '100%',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          <PatientTable 
            patients={patients} 
            onPatientClick={onPatientClick} 
          />
        </Box>
      </Box>
    </Box>
  );
}
