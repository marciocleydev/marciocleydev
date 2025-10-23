// generate-snake.js - VERSÃO FOGUETE COMPLETO

import { writeFileSync } from 'fs';

const CONFIG = {
  username: 'marciocleydev',
  theme: 'rocket',
  snakeColor: 'purple'
};

function generateGrid() {
  let gridHTML = '';
  
  for (let i = 0; i < 54; i++) {
    for (let j = 0; j < 7; j++) {
      const x = i * 16;
      const y = j * 16;
      
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

function generateRocket() {
  return `
    <!-- Foguete COMPLETO animado -->
    <g class="s s0">
      <!-- Corpo principal -->
      <rect x="400" y="48" width="16" height="24" rx="3" fill="${CONFIG.snakeColor}"/>
      <!-- Janela -->
      <circle cx="408" y="56" r="3" fill="#a8e6cf"/>
      <!-- Aleta esquerda -->
      <path d="M 400 56 L 392 68 L 400 64 Z" fill="${CONFIG.snakeColor}"/>
      <!-- Aleta direita -->
      <path d="M 416 56 L 424 68 L 416 64 Z" fill="${CONFIG.snakeColor}"/>
      <!-- Chamas -->
      <path d="M 404 72 Q 408 80 412 72 Q 408 82 404 72" fill="#ff6b00"/>
    </g>
    
    <g class="s s1">
      <!-- Corpo principal -->
      <rect x="384" y="48" width="16" height="24" rx="3" fill="${CONFIG.snakeColor}"/>
      <!-- Janela -->
      <circle cx="392" y="56" r="3" fill="#a8e6cf"/>
      <!-- Aleta esquerda -->
      <path d="M 384 56 L 376 68 L 384 64 Z" fill="${CONFIG.snakeColor}"/>
      <!-- Aleta direita -->
      <path d="M 400 56 L 408 68 L 400 64 Z" fill="${CONFIG.snakeColor}"/>
      <!-- Chamas -->
      <path d="M 388 72 Q 392 80 396 72 Q 392 82 388 72" fill="#ff6b00"/>
    </g>
  `;
}

function generateSnakeSVG() {
  const { theme, snakeColor } = CONFIG;
  
  let characterSVG = generateRocket(); // Sempre foguete para teste
  const gridSVG = generateGrid();
  
  return `
<svg viewBox="0 0 880 112" width="880" height="112" xmlns="http://www.w3.org/2000/svg">
<desc>Generated with custom rocket generator</desc>
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
  25% { transform: translate(100px, 0px); }
  50% { transform: translate(100px, 32px); }
  75% { transform: translate(200px, 32px); }
  100% { transform: translate(200px, 0px); }
}

.s.s0 {
  animation: move-s0 8s linear infinite;
}

@keyframes move-s1 {
  0% { transform: translate(0px, 0px); }
  25% { transform: translate(84px, 0px); }
  50% { transform: translate(84px, 32px); }
  75% { transform: translate(184px, 32px); }
  100% { transform: translate(184px, 0px); }
}

.s.s1 {
  animation: move-s1 8s linear infinite;
  animation-delay: 0.1s;
}
</style>

${gridSVG}

${characterSVG}

</svg>
  `.trim();
}

async function main() {
  try {
    console.log('🎨 Gerando foguete animado...');
    
    const svgContent = generateSnakeSVG();
    const fileName = `assets/github-contribution-grid-rocket.svg`;
    
    writeFileSync(fileName, svgContent);
    
    console.log('✅ Foguete gerado com sucesso!');
    console.log(`📁 Arquivo: ${fileName}`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

main();
