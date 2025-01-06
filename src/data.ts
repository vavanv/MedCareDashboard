import { Patient, Appointment, Medication, Record } from './types';

const generatePatients = (): Patient[] => {
  const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'James', 'Isabella', 'Oliver'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const conditions = ['Hypertension', 'Diabetes', 'Asthma', 'Arthritis', 'Migraine', 'Depression', 'Anxiety', 'Osteoporosis', 'COPD', 'Allergies'];
  const statuses = ['Stable', 'Critical', 'Recovering'];
  const genders = ['Male', 'Female', 'Other'];

  const patients: Patient[] = [];
  const usedIds = new Set();

  for (let i = 0; i < 100; i++) {
    let id;
    do {
      id = String(Math.floor(100000 + Math.random() * 900000));
    } while (usedIds.has(id));
    usedIds.add(id);

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const age = Math.floor(18 + Math.random() * 60);
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const lastVisit = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString();
    const nextAppointment = new Date(Date.now() + Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString();
    const image = `https://randomuser.me/api/portraits/${gender === 'Male' ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`;

    patients.push({
      id,
      name: `${firstName} ${lastName}`,
      age,
      gender,
      condition,
      status,
      lastVisit,
      nextAppointment,
      image
    });
  }

  return patients;
};

export const patients: Patient[] = generatePatients();

// Rest of your existing data exports (appointments, patientMedications, patientRecords) remain the same
export const appointments: Appointment[] = [
  // ... existing appointment data
];

export const patientMedications: Record<string, Medication[]> = {
  // ... existing medication data
};

export const patientRecords: Record<string, Record[]> = {
  // ... existing record data
};
