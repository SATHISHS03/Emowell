import React from 'react';
import GaugeChart from '../components/Gauagechart'; // Corrected filename typo

// Mock data for psychiatry doctors
const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Clinical Psychiatry",
    location: "New York, NY",
    contact: "123-456-7890",
    email: "johndoe@example.com"
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Child and Adolescent Psychiatry",
    location: "Los Angeles, CA",
    contact: "987-654-3210",
    email: "janesmith@example.com"
  },
  {
    id: 3,
    name: "Dr. Richard Roe",
    specialty: "Geriatric Psychiatry",
    location: "Chicago, IL",
    contact: "456-789-1230",
    email: "richardroe@example.com"
  }
];

const Recommendation = () => {
  const stressLevel = 76; // This value can be dynamic based on actual data

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10">Stress Level Assessment</h1>
      <div className="flex justify-center items-center">
        <GaugeChart value={stressLevel} />
      </div>
      <p className="text-xl text-center my-6">
        Your current stress level is at <strong>{stressLevel}%</strong>.
        <br />
        Based on your assessment, we recommend consulting with a psychiatry specialist.
      </p>
      
      <h2 className="text-2xl font-semibold text-center mb-6">Recommended Psychiatry Doctors</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {doctors.map(doctor => (
          <div key={doctor.id} className="bg-white border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-blue-600">{doctor.name}</h3>
            <p className="text-md mb-1">{doctor.specialty}</p>
            <p className="mb-1"><span className="font-semibold">Location:</span> {doctor.location}</p>
            <p className="mb-1"><span className="font-semibold">Contact:</span> {doctor.contact}</p>
            <p className="mb-1"><span className="font-semibold">Email:</span> <a href={`mailto:${doctor.email}`} className="text-blue-500 hover:text-blue-700">{doctor.email}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
