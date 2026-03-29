// ===== 1. Gerar vetor de tempo =====
function gerarTempo(inicio, fim, amostragem) {
  const t = [];
  const passo = (fim - inicio) / amostragem;

  for (let i = 0; i < amostragem; i++) {
    t.push(inicio + i * passo);
  }

  return t;
}

const t = gerarTempo(0, 0.5, 100);


// ===== 2. Criar sinais =====

// Sinal EEG (com envelope)
const sinal = t.map(v =>
  10 * Math.sin(2 * Math.PI * 10 * v) *
  Math.exp(-Math.pow((v - 1), 2) / 0.1)
);

// Ruído 60 Hz
const ruido = t.map(v =>
  Math.sin(2 * Math.PI * 60 * v)
);

// Ruído branco
const ruidoBranco = t.map(() =>
  (Math.random() * 4 - 2)
);

// Sinal final
const sinalRuidoso = sinal.map((v, i) =>
  v + ruido[i] + ruidoBranco[i]
);


// ===== 3. Criar gráfico =====
const ctx = document.getElementById('grafico-sinal-ruidoso');

new Chart(ctx, {
  type: 'line',

  data: {
    labels: t,
    datasets: [{
      data: sinalRuidoso,

      borderColor: '#3b82f6', // azul moderno
      borderWidth: 2,

      pointRadius: 0,
      tension: 0.2,

      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.08)'
    }]
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,

    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#111',
        borderColor: '#3b82f6',
        borderWidth: 1
      }
    },

    scales: {
      x: {
        title: {
          display: true,
          text: 'Tempo (s)',
          color: 'rgba(255, 255, 255, 1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 1)',
          maxTicksLimit: 6
        },
        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      },

      y: {
        title: {
          display: true,
          text: 'Amplitude',
          color: 'rgba(255, 255, 255, 1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 1)'
        },
        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      }
    }
  }
});

// ===== 1. Frequências =====
const frequencias = [0, 5, 10, 20, 40, 60, 80, 100];

// ===== 2. Dados fictícios =====

// Espectro ORIGINAL (com ruído 60Hz e todas as faixas)
const espectroOriginal = [
  2,   // 0 Hz
  3,   // 5 Hz
  8,   // 10 Hz (principal)
  2,   // 20 Hz
  1.5, // 40 Hz
  6,   // 60 Hz (ruído)
  2,   // 80 Hz
  1    // 100 Hz
];

// Espectro FILTRADO (PA + PB + NOTCH)
const espectroFiltrado = [
  0.2, // 0 Hz (removido - passa-alta)
  0.5, // 5 Hz (atenuado)
  7.5, // 10 Hz (preservado)
  2.0, // 20 Hz (preservado)
  0.8, // 40 Hz (caindo - passa-baixa)
  0.1, // 60 Hz (removido - notch)
  0.2, // 80 Hz (removido)
  0.1  // 100 Hz (removido)
];


// ===== 3. Configuração base =====
const configBase = {
  type: 'bar',

  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,

    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111',
        borderColor: '#3b82f6',
        borderWidth: 1
      }
    },

    scales: {
      x: {
        title: {
          display: true,
          text: 'Frequência (Hz)',
          color: 'rgba(255,255,255,0.7)'
        },
        ticks: {
          color: 'rgba(255,255,255,0.6)'
        },
        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      },

      y: {
        title: {
          display: true,
          text: 'Amplitude',
          color: 'rgba(255,255,255,0.7)'
        },
        ticks: {
          color: 'rgba(255,255,255,0.6)'
        },
        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      }
    }
  }
};


// ===== 4. Gráfico ORIGINAL =====
const ctx1 = document.getElementById('frequencias-sinal-ruidoso');

new Chart(ctx1, {
  ...configBase,
  data: {
    labels: frequencias,
    datasets: [{
      data: espectroOriginal,
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: '#3b82f6',
      borderWidth: 1
    }]
  }
});


// ===== 5. Gráfico FILTRADO =====
const ctx2 = document.getElementById('frequencias-sinal-filtrado');

new Chart(ctx2, {
  ...configBase,
  data: {
    labels: frequencias,
    datasets: [{
      data: espectroFiltrado,
      backgroundColor: 'rgba(59, 130, 246, 0.4)', // mais "leve" visualmente
      borderColor: '#3b82f6',
      borderWidth: 1
    }]
  }
});