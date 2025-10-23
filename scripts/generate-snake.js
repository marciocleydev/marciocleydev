import { writeFileSync } from 'fs';
import { get } from 'https';

// CONFIGURAÇÕES - MUDE AQUI PARA PERSONALIZAR
const CONFIG = {
  username: 'marciocleydev',
  theme: 'rocket', // 'snake', 'rocket', 'pacman', 'dinosaur' - MUDE AQUI!
  colors: {
    background: '#ebedf0',
    grid: ['#9be9a8', '#40c463', '#30a14e', '#216e39'],
    snake: '#216e39',
    rocket: '#ff6b6b',
    pacman: '#ffd93d',
    dinosaur: '#4ecdc4'
  },
  animation: {
    duration: '15s',
    style: 'smooth'
  }
};

// ... (mantenha as funções getGitHubData, generateSampleData, etc.)

function generateSnakeSVG(contributionsData) {
  const { theme, colors, animation } = CONFIG;
  const primaryColor = colors[theme] || colors.snake;
  
  let characterSVG = '';

  // CORREÇÃO: Switch statement funcionando corretamente
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
    default: // snake como padrão
      characterSVG = generateSnake();
  }

  const gridSVG = generateGrid(contributionsData);
  
  return `
<svg width="880" height="185" xmlns="http://www.w3.org/2000/svg">
  <style>
    .grid-cell { 
      fill: ${colors.background}; 
      stroke: #1b1f23; 
      stroke-width: 0.5; 
      rx: 2; 
      ry: 2; 
    }
    .contrib-1 { fill: ${colors.grid[0]}; }
    .contrib-2 { fill: ${colors.grid[1]}; }
    .contrib-3 { fill: ${colors.grid[2]}; }
    .contrib-4 { fill: ${colors.grid[3]}; }
    
    .character {
      fill: ${primaryColor};
      animation: moveCharacter ${animation.duration} infinite ${animation.style};
    }
    
    @keyframes moveCharacter {
      0% { transform: translate(0, 0); opacity: 1; }
      25% { transform: translate(400px, 80px); opacity: 0.9; }
      50% { transform: translate(600px, 20px); opacity: 1; }
      75% { transform: translate(200px, 120px); opacity: 0.9; }
      100% { transform: translate(0, 0); opacity: 1; }
    }
    
    .pulse {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
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
  
  <!-- Efeitos Especiais -->
  <g class="pulse">
    <circle cx="50" cy="50" r="3" fill="${primaryColor}" opacity="0.6"/>
    <circle cx="800" cy="120" r="2" fill="${primaryColor}" opacity="0.4"/>
    <circle cx="300" cy="80" r="2" fill="${primaryColor}" opacity="0.5"/>
  </g>
</svg>
  `;
}

// GERADORES DE PERSONAGENS - CORRIGIDOS
function generateSnake() {
  return `
    <rect x="30" y="30" width="16" height="16" rx="4" ry="4" class="pulse"/>
    <rect x="20" y="32" width="12" height="12" rx="3" ry="3" opacity="0.8"/>
    <rect x="10" y="34" width="10" height="10" rx="2" ry="2" opacity="0.6"/>
    <circle cx="38" cy="38" r="2" fill="white"/>
  `;
}

function generateRocket() {
  return `
    <path d="M35,35 L45,30 L35,25 Z" class="pulse"/>
    <rect x="33" y="28" width="4" height="4" rx="1" ry="1" fill="white" opacity="0.8"/>
    <circle cx="35" cy="30" r="1" fill="white"/>
    <path d="M25,30 L35,28 L35,32 Z" fill="${CONFIG.colors.rocket}" opacity="0.7"/>
    <!-- Chamas -->
    <path d="M25,28 L20,25 L25,22 Z" fill="#ffa726" opacity="0.8"/>
    <path d="M25,32 L20,35 L25,38 Z" fill="#ffa726" opacity="0.8"/>
  `;
}

function generatePacman() {
  return `
    <circle cx="35" cy="30" r="10" fill="${CONFIG.colors.pacman}" class="pulse"/>
    <!-- Boca -->
    <path d="M35,30 L45,20 L45,40 Z" fill="black"/>
    <!-- Olho -->
    <circle cx="38" cy="25" r="1.5" fill="black"/>
  `;
}

function generateDinosaur() {
  return `
    <!-- Corpo -->
    <rect x="30" y="25" width="14" height="10" rx="3" ry="3" class="pulse"/>
    <!-- Pernas -->
    <rect x="28" y="35" width="6" height="12" rx="2" ry="2"/>
    <rect x="40" y="35" width="6" height="12" rx="2" ry="2"/>
    <!-- Pescoço e cabeça -->
    <rect x="38" y="18" width="8" height="10" rx="2" ry="2"/>
    <rect x="44" y="15" width="6" height="6" rx="2" ry="2"/>
    <!-- Olho -->
    <circle cx="47" cy="18" r="1" fill="white"/>
  `;
}

// ... (mantenha as funções generateGrid, calculateContributionLevel, etc.)

// EXECUÇÃO PRINCIPAL
async function main() {
  try {
    console.log('🔄 Buscando dados do GitHub...');
    const githubData = await getGitHubData();
    
    console.log('🎨 Gerando animação...');
    const svgContent = generateSnakeSVG(githubData);
    
    // NOME DO ARQUIVO BASEADO NO TEMA
    const fileName = `assets/github-contribution-grid-${CONFIG.theme}.svg`;
    
    console.log('💾 Salvando arquivo...');
    writeFileSync(fileName, svgContent);
    
    console.log('✅ Animação gerada com sucesso!');
    console.log(`🎯 Tema: ${CONFIG.theme}`);
    console.log(`📁 Arquivo: ${fileName}`);
    console.log(`🎨 Cor principal: ${CONFIG.colors[CONFIG.theme]}`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar o script
main();
