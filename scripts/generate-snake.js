import { writeFileSync } from 'fs';
import { get } from 'https';

// CONFIGURAÇÕES
const CONFIG = {
  username: 'marciocleydev',
  theme: 'rocket', // 'snake', 'rocket', 'pacman', 'dinosaur'
  colors: {
    background: '#ebedf0',
    grid: ['#9be9a8', '#40c463', '#30a14e', '#216e39'],
    snake: '#216e39',
    rocket: '#ff6b6b',
    pacman: '#ffd93d',
    dinosaur: '#4ecdc4'
  }
};

function generateSampleData() {
  const events = [];
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const activityLevel = Math.floor(Math.random() * 5);
    for (let j = 0; j < activityLevel; j++) {
      events.push({
        created_at: date.toISOString(),
        type: 'PushEvent'
      });
    }
  }
  
  return events;
}

function generateGrid() {
  let gridHTML = '';
  const cellSize = 11;
  const spacing = 13;
  const weeks = 53;
  const days = 7;
  
  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < days; day++) {
      const x = week * spacing;
      const y = day * spacing;
      
      const contribLevel = Math.floor(Math.random() * 5);
      const contribClass = contribLevel > 0 ? `contrib-${contribLevel}` : '';
      
      gridHTML += `
        <rect class="grid-cell ${contribClass}" 
              x="${x}" y="${y}" 
              width="${cellSize}" height="${cellSize}" rx="2" ry="2"/>
      `;
    }
  }
  
  return gridHTML;
}

// GERADORES DE PERSONAGENS - POSIÇÕES CORRIGIDAS
function generateSnake() {
  return `
    <!-- Cabeça da snake -->
    <rect x="400" y="45" width="14" height="14" rx="3" ry="3" fill="${CONFIG.colors.snake}"/>
    <!-- Corpo -->
    <rect x="385" y="47" width="12" height="10" rx="2" ry="2" fill="${CONFIG.colors.snake}" opacity="0.8"/>
    <rect x="370" y="49" width="10" height="8" rx="2" ry="2" fill="${CONFIG.colors.snake}" opacity="0.6"/>
  `;
}

function generateRocket() {
  return `
    <!-- Corpo do foguete -->
    <path d="M400,50 L410,45 L400,40 Z" fill="${CONFIG.colors.rocket}"/>
    <!-- Janela -->
    <circle cx="403" cy="45" r="2" fill="#87CEEB"/>
    <!-- Asas -->
    <path d="M400,42 L395,40 L400,38 Z" fill="${CONFIG.colors.rocket}" opacity="0.8"/>
    <path d="M400,52 L395,50 L400,48 Z" fill="${CONFIG.colors.rocket}" opacity="0.8"/>
    <!-- Chamas -->
    <path d="M395,45 L385,42 L395,39 Z" fill="#FFA500" opacity="0.9"/>
    <path d="M395,45 L385,48 L395,51 Z" fill="#FF4500" opacity="0.9"/>
  `;
}

function generatePacman() {
  return `
    <!-- Corpo do Pacman -->
    <circle cx="400" cy="45" r="12" fill="${CONFIG.colors.pacman}"/>
    <!-- Boca -->
    <path d="M400,45 L412,35 L412,55 Z" fill="black"/>
    <!-- Olho -->
    <circle cx="404" cy="40" r="2" fill="black"/>
  `;
}

function generateDinosaur() {
  return `
    <!-- Corpo -->
    <rect x="395" y="40" width="16" height="12" rx="3" ry="3" fill="${CONFIG.colors.dinosaur}"/>
    <!-- Pernas -->
    <rect x="393" y="52" width="5" height="8" rx="2" ry="2" fill="${CONFIG.colors.dinosaur}"/>
    <rect x="408" y="52" width="5" height="8" rx="2" ry="2" fill="${CONFIG.colors.dinosaur}"/>
    <!-- Pescoço -->
    <rect x="407" y="35" width="6" height="8" rx="2" ry="2" fill="${CONFIG.colors.dinosaur}"/>
    <!-- Cabeça -->
    <rect x="411" y="30" width="8" height="8" rx="2" ry="2" fill="${CONFIG.colors.dinosaur}"/>
    <!-- Olho -->
    <circle cx="416" cy="34" r="1" fill="white"/>
  `;
}

function generateSnakeSVG() {
  const { theme, colors } = CONFIG;
  const primaryColor = colors[theme] || colors.snake;
  
  let characterSVG = '';

  switch (theme) {
    case 'rocket':
      characterSVG = generateRocket();
      break;
    case 'pacman':
      characterSVG = generatePacman();
      break;
    case 'dinosaur':
      characterSVG = generateDinosaur();
      break;
    case 'snake':
    default:
      characterSVG = generateSnake();
  }

  const gridSVG = generateGrid();
  
  return `
<svg width="880" height="185" xmlns="http://www.w3.org/2000/svg">
  <style>
    .grid-cell { 
      fill: ${colors.background}; 
      stroke: #1b1f23; 
      stroke-width: 0.5; 
    }
    .contrib-1 { fill: ${colors.grid[0]}; }
    .contrib-2 { fill: ${colors.grid[1]}; }
    .contrib-3 { fill: ${colors.grid[2]}; }
    .contrib-4 { fill: ${colors.grid[3]}; }
    
    .character {
      animation: moveCharacter 20s ease-in-out infinite;
    }
    
    @keyframes moveCharacter {
      0% { transform: translate(0px, 0px); }
      25% { transform: translate(300px, 30px); }
      50% { transform: translate(600px, 0px); }
      75% { transform: translate(300px, -30px); }
      100% { transform: translate(0px, 0px); }
    }
  </style>
  
  <!-- Grid de Contribuições -->
  <g transform="translate(20, 20)">
    ${gridSVG}
  </g>
  
  <!-- Personagem Animado -->
  <g class="character">
    ${characterSVG}
  </g>
</svg>
  `;
}

// EXECUÇÃO PRINCIPAL
async function main() {
  try {
    console.log('🎨 Gerando animação...');
    
    const sampleData = generateSampleData();
    const svgContent = generateSnakeSVG(sampleData);
    
    const fileName = `assets/github-contribution-grid-${CONFIG.theme}.svg`;
    
    console.log('💾 Salvando arquivo...');
    writeFileSync(fileName, svgContent);
    
    console.log('✅ Animação gerada com sucesso!');
    console.log(`🎯 Tema: ${CONFIG.theme}`);
    console.log(`📁 Arquivo: ${fileName}`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar o script
main();
