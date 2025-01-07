import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Patient } from '../types';
import { Avatar, Chip } from '@mui/material';

interface PatientTableProps {
  patients: Patient[];
  onPatientClick?: (patient: Patient) => void;
}

const columns: GridColDef[] = [
  { 
    field: 'image',
    headerName: '',
    width: 80,
    renderCell: (params) => (
      <Avatar 
        src={params.value} 
        alt={params.row.name}
        sx={{ width: 40, height: 40 }}
      />
    ),
    sortable: false,
    filterable: false
  },
  { 
    field: 'name', 
    headerName: 'Patient', 
    width: 200,
    valueGetter: (params: GridValueGetterParams) => `${params.row.name}`
  },
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 120,
    valueGetter: (params: GridValueGetterParams) => `#${params.row.id.padStart(6, '0')}`
  },
  { 
    field: 'age', 
    headerName: 'Age', 
    width: 100,
    valueGetter: (params: GridValueGetterParams) => `${params.row.age} years`
  },
  { 
    field: 'gender', 
    headerName: 'Gender', 
    width: 120 
  },
  { 
    field: 'condition', 
    headerName: 'Condition', 
    width: 200 
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          backgroundColor: 
            params.value === 'Stable' ? 'success.light' :
            params.value === 'Critical' ? 'error.light' :
            'warning.light',
          color: 'white',
          fontWeight: 500
        }}
      />
    )
  },
  {
    field: 'lastVisit',
    headerName: 'Last Visit',
    width: 150,
    valueGetter: (params: GridValueGetterParams) => 
      new Date(params.value).toLocaleDateString()
  }
];

export default function PatientTable({ patients, onPatientClick }: PatientTableProps) {
  return (
    <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
      <DataGrid
        rows={patients}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        onRowClick={(params) => onPatientClick?.(params.row)}
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: 0
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer'
          }
        }}
      />
    </div>
  );
}
