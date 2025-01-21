import React from 'react';

const TimeTable = ({ data, workHours }) => {
  const calculateBalance = (entry1, exit1, entry2, exit2) => {
    const parseTime = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const totalWorked = (parseTime(exit1) - parseTime(entry1)) + (parseTime(exit2) - parseTime(entry2));
    const expectedWorked = workHours * 60;
    const balance = totalWorked - expectedWorked;

    return `${Math.floor(balance / 60)}:${Math.abs(balance % 60).toString().padStart(2, '0')}`;
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Data</th>
          <th>Entrada 1</th>
          <th>Saída 1</th>
          <th>Entrada 2</th>
          <th>Saída 2</th>
          <th>Saldo</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.Data}</td>
            <td>{row.Entrada}</td>
            <td>{row.Saída}</td>
            <td>{row['Entrada ']}</td>
            <td>{row['Saída ']}</td>
            <td>{calculateBalance(row.Entrada, row.Saída, row['Entrada '], row['Saída '])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TimeTable;
