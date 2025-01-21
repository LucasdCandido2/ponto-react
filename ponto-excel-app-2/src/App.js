import React, { useState } from 'react';
import ExcelUploader from './components/ExcelUploader';
import TimeTable from './components/TimeTable';
import TimeGenerator from './components/TimeGenerator';

const App = () => {
  const [data, setData] = useState([]);
  const [generatedTimes, setGeneratedTimes] = useState([]);
  const workHours = 8; // Horário fixo das 08:00 às 17:00 (com 1 hora de almoço)

  return (
    <div>
      <h1>Gerenciador de Ponto</h1>
      <ExcelUploader onDataLoaded={setData} />
      {data.length > 0 && <TimeTable data={data} workHours={workHours} />}
      <TimeGenerator onGenerate={(time) => setGeneratedTimes([...generatedTimes, time])} />
      {generatedTimes.length > 0 && (
        <div>
          <h2>Horários Gerados</h2>
          <ul>
            {generatedTimes.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
