import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './AppContent.css';

function AppContent() {
  const [horarios, setHorarios] = useState([]);
  const [manualTime, setManualTime] = useState('');

  // Função para carregar horários do backend
  const fetchHorarios = () => {
    fetch('http://localhost/ponto-react/ponto-excel-app/backend/get_time.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setHorarios(data))
      .catch((error) => console.error('Erro ao carregar horários:', error));
  };

  // Carregar horários ao montar o componente
  useEffect(() => {
    fetchHorarios();
  }, []);

  // Adicionar horário ao banco de dados
  const addTimeToDatabase = (time) => {
    fetch('http://localhost/ponto-react/ponto-excel-app/backend/add_time.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ horario: time }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'success') {
          console.log('Horário adicionado com sucesso:', data);
          // Adiciona o horário diretamente no estado
          setHorarios((prevHorarios) => [...prevHorarios, { horario: time }]);
        } else {
          console.error('Erro ao adicionar horário:', data.message);
        }
      })
      .catch((error) => {
        console.error('Erro ao adicionar horário:', error);
      });
  };

  // Adicionar horário atual
  const addCurrentTime = () => {
    const now = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    addTimeToDatabase(now);
  };

  // Adicionar horário manual
  const addManualTime = () => {
    if (manualTime) {
      addTimeToDatabase(manualTime);
      setManualTime('');
    }
  };

  // Limpar horários do banco de dados
  const clearHorarios = () => {
    fetch('http://localhost/ponto-react/ponto-excel-app/backend/clear_times.php', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setHorarios([]); // Atualiza o estado para limpar os horários
        } else {
          console.error(data.message);
        }
      });
  };

  return (
    <main className="content">
      <div className="add-time-section">
        <button className="btn-add-time" onClick={addCurrentTime}>
          Adicionar Horário Atual
        </button>
        <div className="manual-input">
          <input
            type="time"
            value={manualTime}
            onChange={(e) => setManualTime(e.target.value)}
            placeholder="00:00:00"
          />
          <button onClick={addManualTime}>Adicionar</button>
        </div>
      </div>
      <div className="table-section">
        <h3>Horários Adicionados</h3>
        <table className="time-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Horário</th>
            </tr>
          </thead>
          <TransitionGroup component="tbody">
            {horarios.map((horario, index) => (
              <CSSTransition key={index} timeout={500} classNames="fade">
                <tr>
                  <td>{index + 1}</td>
                  <td>{horario.horario}</td>
                </tr>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </table>
        {horarios.length === 0 && <p>Nenhum horário adicionado.</p>}
      </div>
      <button className="btn-clear" onClick={clearHorarios}>
        Limpar Horários
      </button>
    </main>
  );
}

export default AppContent;
