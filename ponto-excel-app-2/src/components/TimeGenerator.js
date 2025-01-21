import React, { useState } from 'react';

const TimeGenerator = ({ onGenerate }) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleGenerate = () => {
    const time = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    onGenerate(time);
    setHours('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <div>
      <input type="number" placeholder="Horas" value={hours} onChange={(e) => setHours(e.target.value)} />
      <input type="number" placeholder="Minutos" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
      <input type="number" placeholder="Segundos" value={seconds} onChange={(e) => setSeconds(e.target.value)} />
      <button onClick={handleGenerate}>Gerar Horário</button>
    </div>
  );
};

export default TimeGenerator;
