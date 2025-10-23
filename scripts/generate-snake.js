import { writeFileSync } from 'fs';

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

function generateRealisticGrid() {
  let gridHTML = '';
  const cellSize = 11;
  const spacing = 13;
  const weeks = 53;
  const days = 7;
  
  // Padrão mais realista baseado em dias da semana
  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < days; day++) {
      const x = week * spacing;
      const y = day * spacing;
      
      // Mais atividade durante a semana, menos no fim de semana
      let activityChance = 0.7;
      if (day >= 5) activityChance = 0.3; // Fim de semana
      
      const hasActivity = Math.random() < activityChance;
      const contribLevel = hasActivity ? Math.floor(Math.random() * 4) + 1 : 0;
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

// PERSONAGENS ESTÁTICOS MAS BEM POSICIONADOS
function generateSnake() {
  return `
    <!-- Snake estática -->
    <g transform="translate(400, 45)">
      <rect width="16" height="16" rx="4" ry="4" fill="${CONFIG.colors.snake}"/>
      <rect x="-4" y="2" width="12" height="12" rx="3" ry="3" fill="${CONFIG.colors.snake}" opacity="0.8"/>
      <rect x="-8" y="4" width="10" height="10" rx="2" ry="2" fill="${CONFIG.colors.snake}" opacity="0.6"/>
      <circle cx="12" cy="8" r="2" fill="white"/>
    </g>
    
    <!-- Rastro da snake -->
    <g opacity="0.4">
      <circle cx="350" cy="50" r="3" fill="${CONFIG.colors.snake}"/>
      <circle cx="320" cy="55" r="2" fill="${CONFIG.colors.snake}"/>
      <circle cx="290" cy="60" r="2" fill="${CONFIG.colors.snake}"/>
    </g>
  `;
}

function generateRocket() {
  return `
    <!-- Rocket estático -->
    <g transform="translate(500, 60)">
      <path d="M0,8 L12,0 L0,-8 Z" fill="${CONFIG.colors.rocket}"/>
      <circle cx="4" cy="0" r="2.5" fill="#87CEEB"/>
      <path d="M0,-3 L-6,-6 L0,-9 Z" fill="${CONFIG.colors.rocket}" opacity="0.8"/>
      <path d="M0,3 L-6,6 L0,9 Z" fill="${CONFIG.colors.rocket}" opacity="0.8"/>
      <!-- Chamas -->
      <g opacity="0.9">
        <path d="M-6,0 L-18,-5 L-6,-10 Z" fill="#FFA500"/>
        <path d="M-6,0 L-18,5 L-6,10 Z" fill="#FF4500"/>
      </g>
    </g>
    
    <!-- Estrelas no caminho -->
    <g fill="#FFD700" opacity="0.7">
      <circle cx="450" cy="40" r="1"/>
      <circle cx="380" cy="70" r="1.2"/>
      <circle cx="550" cy="30" r="1"/>
      <circle cx="600" cy="80" r="1.5"/>
      <circle cx="320" cy="20" r="1"/>
    </g>
  `;
}

function generatePacman() {
  return `
    <!-- Pacman estático -->
    <g transform="translate(300, 70)">
      <circle r="14" fill="${CONFIG.colors.pacman}"/>
      <path d="M0,0 L14,-12 L14,12 Z" fill="black"/>
      <circle cx="5" cy="-6" r="2.5" fill="black"/>
    </g>
    
    <!-- Pontos que seriam comidos -->
    <g fill="${CONFIG.colors.pacman}" opacity="0.8">
      <circle cx="350" cy="70" r="3"/>
      <circle cx="400" cy="70" r="3"/>
      <circle cx="450" cy="70" r="3"/>
      <circle cx="500" cy="70" r="3"/>
    </g>
  `;
}

function generateDinosaur() {
  return `
    <!-- Dinosaur estático -->
    <g transform="translate(600, 80)">
      <rect x="-10" y="-8" width="20" height="16" rx="4" ry="4" fill="${CONFIG.colors.dinosaur}"/>
      <rect x="-12" y="8" width="6" height="10" rx="2" ry="2" fill="${CONFIG.colors.dinosaur}"/>
      <rect x="6" y="8" width="6" height="10" rx="2" ry="2" fill="${CONFIG.colors.dinosaur}"/>
      <rect x="5" y="-15" width="8" height="10" rx="2" ry="2" fill="${CONFIG.colors.dinosaur}"/>
      <rect x="11" y="-20" width="10" height="10" rx="3" ry="3" fill="${CONFIG.colors.dinosaur}"/>
      <circle cx="16" cy="-16" r="1.5" fill="white"/>
    </g>
    
    <!-- Pegadas -->
    <g fill="${CONFIG.colors.dinosaur}" opacity="0.5">
      <rect x="550" y="95" width="4" height="8" rx="1" ry="1"/>
      <rect x="530" y="100" width="4" height="8" rx="1" ry="1"/>
      <rect x="510" y="95" width="4" height="8" rx="1" ry="1"/>
    </g>
  `;
}

function generateSnakeSVG() {
  const { theme, colors, username } = CONFIG;
  
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

  const gridSVG = generateRealisticGrid();
  
  return `
<svg width="880" height="185" viewBox="0 0 880 185" xmlns="http://www.w3.org/2000/svg">
  <defs>
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
    </style>
  </defs>
  
  <!-- Background suave -->
  <rect width="100%" height="100%" fill="#f6f8fa"/>
  
  <!-- Grid de Contribuições -->
  <g transform="translate(20, 20)">
    ${gridSVG}
  </g>
  
  <!-- Personagem Estático -->
  ${characterSVG}
  
  <!-- Informações -->
  <g font-family="Arial, sans-serif" font-size="12" fill="#586069">
    <text x="20" y="170" font-weight="bold">@${username}</text>
    <text x="440" y="170" text-anchor="middle">GitHub Contributions - ${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme</text>
    <text x="860" y="170" text-anchor="end">${new Date().getFullYear()}</text>
  </g>
</svg>
  `;
}

// EXECUÇÃO PRINCIPAL
async function main() {
  try {
    console.log('🎨 Gerando SVG estático...');
    
    const svgContent = generateSnakeSVG();
    
    const fileName = `assets/github-contribution-grid-${CONFIG.theme}.svg`;
    
    console.log('💾 Salvando arquivo...');
    writeFileSync(fileName, svgContent);
    
    console.log('✅ SVG estático gerado com sucesso!');
    console.log(`🎯 Tema: ${CONFIG.theme}`);
    console.log(`📁 Arquivo: ${fileName}`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar o script
main();
