import { writeFileSync } from 'fs';

// CONFIGURAÇÕES
const CONFIG = {
  username: 'marciocleydev',
  theme: 'rocket', // 'snake', 'rocket', 'pacman', 'dinosaur'
  snakeColor: 'purple'
};

// Gera o grid CORRETAMENTE alinhado
function generateGrid() {
  let gridHTML = '';
  
  // Grid 7x54 (formato correto do Platane)
  for (let i = 0; i < 54; i++) {
    for (let j = 0; j < 7; j++) {
      const x = i * 16;
      const y = j * 16;
      
      // Padrão de cores consistente
      const rand = (i * 7 + j) % 10;
      let contribClass = '';
      
      if (rand === 0) contribClass = 'c4';
      else if (rand <= 2) contribClass = 'c3';
      else if (rand <= 4) contribClass = 'c2';
      else if (rand <= 6) contribClass = 'c1';
      
      gridHTML += `<rect class="c ${contribClass}" x="${x}" y="${y}" rx="2" ry="2"/>`;
    }
  }
  
  return gridHTML;
}

// Gera a snake com classes CORRETAS
function generateSnake() {
  return `
    <!-- Snake com classes corretas -->
    <rect class="s s0" x="0" y="0" width="16" height="16" rx="3" fill="${CONFIG.snakeColor}"/>
    <rect class="s s1" x="16" y="0" width="16" height="16" rx="3" fill="${CONFIG.snakeColor}"/>
    <rect class="s s2" x="32" y="0" width="16" height="16" rx="3" fill="${CONFIG.snakeColor}"/>
  `;
}

// Gera foguete com classes CORRETAS
function generateRocket() {
  return `
    <!-- Foguete com classes corretas -->
    <rect class="s s0" x="400" y="48" width="16" height="16" rx="3" fill="${CONFIG.snakeColor}"/>
    <rect class="s s1" x="416" y="48" width="16" height="16" rx="3" fill="${CONFIG.snakeColor}"/>
    <!-- Detalhes do foguete (sem classes de animação) -->
    <rect x="408" y="40" width="8" height="8" rx="4" fill="#a8e6cf"/>
    <path d="M 400 56 L 392 64 L 400 60 Z" fill="${CONFIG.snakeColor}"/>
    <path d="M 432 56 L 440 64 L 432 60 Z" fill="${CONFIG.snakeColor}"/>
    <path d="M 408 64 Q 416 72 424 64 Q 416 76 408 64" fill="#ff6b00"/>
  `;
}

// Gera Pacman com classes CORRETAS
function generatePacman() {
  return `
    <!-- Pacman com classes corretas -->
    <circle class="s s0" cx="408" cy="56" r="8" fill="${CONFIG.snakeColor}"/>
    <!-- Boca (sem classe de animação) -->
    <path d="M408,56 L416,48 L416,64 Z" fill="#0d1117"/>
    <!-- Olho (sem classe de animação) -->
    <circle cx="411" cy="53" r="1" fill="#0d1117"/>
  `;
}

// Gera Dinossauro com classes CORRETAS
function generateDinosaur() {
  return `
    <!-- Dinossauro com classes corretas -->
    <rect class="s s0" x="400" y="48" width="16" height="16" rx="3" fill="${CONFIG.snakeColor}"/>
    <rect class="s s1" x="416" y="48" width="16" height="16" rx="3" fill="${CONFIG.snakeColor}"/>
    <!-- Cabeça e pernas (sem classes de animação) -->
    <rect x="424" y="40" width="8" height="8" rx="2" fill="${CONFIG.snakeColor}"/>
    <rect x="428" y="36" width="8" height="6" rx="2" fill="${CONFIG.snakeColor}"/>
    <rect x="404" y="64" width="4" height="6" rx="1" fill="${CONFIG.snakeColor}"/>
    <rect x="412" y="64" width="4" height="6" rx="1" fill="${CONFIG.snakeColor}"/>
  `;
}

function generateSnakeSVG() {
  const { theme, snakeColor } = CONFIG;
  
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
  
  // SVG com viewBox CORRETO e animações SIMPLIFICADAS
  return `
<svg viewBox="0 0 880 112" width="880" height="112" xmlns="http://www.w3.org/2000/svg">
<desc>Generated with custom ${theme} generator</desc>
<style>
:root{
  --cb:#1b1f230a;
  --cs:${snakeColor};
  --ce:#ebedf0;
  --c0:#ebedf0;
  --c1:#9be9a8;
  --c2:#40c463;
  --c3:#30a14e;
  --c4:#216e39
}
.c{
  shape-rendering:geometricPrecision;
  fill:var(--ce);
  stroke-width:1px;
  stroke:var(--cb);
  width:12px;
  height:12px
}
.c.c1{fill:var(--c1)}
.c.c2{fill:var(--c2)}
.c.c3{fill:var(--c3)}
.c.c4{fill:var(--c4)}

.s{
  shape-rendering:geometricPrecision;
  fill:var(--cs);
}

/* Animações BÁSICAS - GitHub safe */
@keyframes move-s0 {
  0% { transform: translate(0px, 0px); }
  25% { transform: translate(200px, 0px); }
  50% { transform: translate(200px, 50px); }
  75% { transform: translate(400px, 50px); }
  100% { transform: translate(400px, 0px); }
}

.s.s0 {
  animation: move-s0 10s linear infinite;
}

@keyframes move-s1 {
  0% { transform: translate(0px, 0px); }
  25% { transform: translate(184px, 0px); }
  50% { transform: translate(184px, 50px); }
  75% { transform: translate(384px, 50px); }
  100% { transform: translate(384px, 0px); }
}

.s.s1 {
  animation: move-s1 10s linear infinite;
  animation-delay: 0.1s;
}

@keyframes move-s2 {
  0% { transform: translate(0px, 0px); }
  25% { transform: translate(168px, 0px); }
  50% { transform: translate(168px, 50px); }
  75% { transform: translate(368px, 50px); }
  100% { transform: translate(368px, 0px); }
}

.s.s2 {
  animation: move-s2 10s linear infinite;
  animation-delay: 0.2s;
}
</style>

${gridSVG}

${characterSVG}

</svg>
  `.trim();
}

// EXECUÇÃO PRINCIPAL
async function main() {
  try {
    console.log('🎨 Gerando SVG corrigido...');
    
    const svgContent = generateSnakeSVG();
    
    // Adiciona timestamp para forçar commit
    const timestamp = new Date().getTime();
    const fileName = `assets/github-contribution-grid-${CONFIG.theme}-${timestamp}.svg`;
    const finalFileName = `assets/github-contribution-grid-${CONFIG.theme}.svg`;
    
    console.log('💾 Salvando arquivo...');
    writeFileSync(fileName, svgContent);
    writeFileSync(finalFileName, svgContent);
    
    console.log('✅ SVG gerado com sucesso!');
    console.log(`🎯 Tema: ${CONFIG.theme}`);
    console.log(`🎨 Cor: ${CONFIG.snakeColor}`);
    console.log(`📁 Arquivos: ${fileName} e ${finalFileName}`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar o script
main();
