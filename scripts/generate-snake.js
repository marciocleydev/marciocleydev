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

function generateGrid() {
  let gridHTML = '';
  const cellSize = 11;
  const spacing = 13;
  const weeks = 53;
  const days = 7;
  
  // Gerar grid com padrão mais realista
  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < days; day++) {
      const x = week * spacing;
      const y = day * spacing;
      
      // Padrão mais interessante para o grid
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

// GERADORES DE PERSONAGENS - VISÍVEIS E BEM POSICIONADOS
function generateSnake() {
  return `
    <!-- Snake visível -->
    <g transform="translate(400, 45)">
      <rect width="16" height="16" rx="4" ry="4" fill="${CONFIG.colors.snake}"/>
      <rect x="-4" y="2" width="12" height="12" rx="3" ry="3" fill="${CONFIG.colors.snake}" opacity="0.8"/>
      <rect x="-8" y="4" width="10" height="10" rx="2" ry="2" fill="${CONFIG.colors.snake}" opacity="0.6"/>
      <circle cx="12" cy="8" r="2" fill="white"/>
    </g>
  `;
}

function generateRocket() {
  return `
    <!-- Rocket grande e visível -->
    <g transform="translate(400, 45)">
      <path d="M0,5 L10,0 L0,-5 Z" fill="${CONFIG.colors.rocket}"/>
      <circle cx="3" cy="0" r="2" fill="#87CEEB"/>
      <path d="M0,-2 L-5,-4 L0,-6 Z" fill="${CONFIG.colors.rocket}" opacity="0.8"/>
      <path d="M0,2 L-5,4 L0,6 Z" fill="${CONFIG.colors.rocket}" opacity="0.8"/>
      <path d="M-5,0 L-15,-3 L-5,-6 Z" fill="#FFA500" opacity="0.9"/>
      <path d="M-5,0 L-15,3 L-5,6 Z" fill="#FF4500" opacity="0.9"/>
    </g>
  `;
}

function generatePacman() {
  return `
    <!-- Pacman grande e visível -->
    <g transform="translate(400, 45)">
      <circle r="12" fill="${CONFIG.colors.pacman}"/>
      <path d="M0,0 L12,-10 L12,10 Z" fill="black"/>
      <circle cx="4" cy="-5" r="2" fill="black"/>
    </g>
  `;
}

function generateDinosaur() {
  return `
    <!-- Dinosaur grande e visível -->
    <g transform="translate(400, 45)">
      <rect x="-8" y="-5" width="16" height="12" rx="3" ry="3" fill="${CONFIG.colors.dinosaur}"/>
      <rect x="-10" y="7" width="5" height="8" rx="2" ry="2" fill="${CONFIG.colors.dinosaur}"/>
      <rect x="5" y="7" width="5" height="8" rx="2" ry="2" fill="${CONFIG.colors.dinosaur}"/>
      <rect x="4" y="-10" width="6" height="8" rx="2" ry="2" fill="${CONFIG.colors.dinosaur}"/>
      <rect x="8" y="-13" width="8" height="8" rx="2" ry="2" fill="${CONFIG.colors.dinosaur}"/>
      <circle cx="13" cy="-9" r="1" fill="white"/>
    </g>
  `;
}

function generateSnakeSVG() {
  const { theme, colors } = CONFIG;
  
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
<svg width="880" height="185" viewBox="0 0 880 185" xmlns="http://www.w3.org/2000/svg">
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
    
    /* Animações simples que funcionam no GitHub */
    .character {
      animation: fadeIn 2s ease-in;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  </style>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="#0d1117" />
  
  <!-- Grid de Contribuições -->
  <g transform="translate(20, 20)">
    ${gridSVG}
  </g>
  
  <!-- Personagem (sem animação complexa) -->
  <g class="character">
    ${characterSVG}
  </g>
  
  <!-- Texto informativo -->
  <text x="440" y="170" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#8b949e">
    @${CONFIG.username} • ${CONFIG.theme.charAt(0).toUpperCase() + CONFIG.theme.slice(1)} Theme
  </text>
</svg>
  `;
}

// EXECUÇÃO PRINCIPAL
async function main() {
  try {
    console.log('🎨 Gerando animação...');
    
    const svgContent = generateSnakeSVG();
    
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
