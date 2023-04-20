export type Appointment = {
  time: Date;
  description: string;
  doctorId: number;
  patientId: number;
  pending: boolean;
  approved: boolean;
};
