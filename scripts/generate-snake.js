import { writeFileSync } from 'fs';

// CONFIGURAÇÕES
const CONFIG = {
  username: 'marciocleydev',
  theme: 'rocket', // 'snake', 'rocket', 'pacman', 'dinosaur'
  snakeColor: 'purple' // Cor da snake (pode ser qualquer cor)
};

// Gera o grid no formato exato do Platane/snk
function generateGrid() {
  let gridHTML = '';
  
  // Grid 7x106 (formato original do Platane)
  for (let i = 0; i < 106; i++) {
    for (let j = 0; j < 7; j++) {
      const x = 2 + i * 16;
      const y = 2 + j * 16;
      
      // Aleatório baseado na posição para padrão consistente
      const rand = (i * 7 + j) % 10;
      let contribClass = '';
      
      if (rand === 0) contribClass = 'c4';
      else if (rand <= 2) contribClass = 'c3';
      else if (rand <= 4) contribClass = 'c2';
      else if (rand <= 6) contribClass = 'c1';
      // else sem classe = célula vazia
      
      gridHTML += `<rect class="c ${contribClass}" x="${x}" y="${y}" rx="2" ry="2"/>`;
    }
  }
  
  return gridHTML;
}

// Gera a snake no formato Platane
function generateSnake() {
  return `
    <rect class="s s0" x="0.8" y="0.8" width="14.4" height="14.4" rx="4.5" ry="4.5"/>
    <rect class="s s1" x="1.8" y="1.8" width="12.3" height="12.3" rx="4.1" ry="4.1"/>
    <rect class="s s2" x="2.6" y="2.6" width="10.8" height="10.8" rx="3.6" ry="3.6"/>
    <rect class="s s3" x="3.0" y="3.0" width="9.9" height="9.9" rx="3.3" ry="3.3"/>
  `;
}

// Gera o foguete no formato Platane
function generateRocket() {
  return `
    <!-- Foguete usando o mesmo sistema de camadas da snake -->
    <g transform="translate(0, -16)">
      <rect class="s s0" x="0.8" y="0.8" width="14.4" height="14.4" rx="4.5" ry="4.5" fill="${CONFIG.snakeColor}"/>
      <rect class="s s1" x="1.8" y="1.8" width="12.3" height="12.3" rx="4.1" ry="4.1" fill="${CONFIG.snakeColor}"/>
      <!-- Asas do foguete -->
      <rect x="0.5" y="6" width="3" height="3" rx="1" fill="${CONFIG.snakeColor}" opacity="0.8"/>
      <rect x="12.5" y="6" width="3" height="3" rx="1" fill="${CONFIG.snakeColor}" opacity="0.8"/>
      <!-- Chamas -->
      <rect x="6" y="14" width="4" height="4" rx="1" fill="#ff6b00" opacity="0.9"/>
    </g>
  `;
}

// Gera o Pacman no formato Platane
function generatePacman() {
  return `
    <!-- Pacman usando o mesmo sistema de camadas -->
    <g transform="translate(0, -16)">
      <circle class="s s0" cx="7.2" cy="7.2" r="7.2" fill="${CONFIG.snakeColor}"/>
      <!-- Boca -->
      <path d="M7.2,7.2 L14.4,0 L14.4,14.4 Z" fill="#0d1117"/>
      <!-- Olho -->
      <circle cx="10" cy="4" r="1" fill="#0d1117"/>
    </g>
  `;
}

// Gera o Dinossauro no formato Platane
function generateDinosaur() {
  return `
    <!-- Dinossauro usando o mesmo sistema -->
    <g transform="translate(0, -16)">
      <rect class="s s0" x="0.8" y="0.8" width="14.4" height="14.4" rx="4.5" ry="4.5" fill="${CONFIG.snakeColor}"/>
      <!-- Pernas -->
      <rect x="2" y="12" width="3" height="4" rx="1" fill="${CONFIG.snakeColor}"/>
      <rect x="9.4" y="12" width="3" height="4" rx="1" fill="${CONFIG.snakeColor}"/>
      <!-- Pescoço e cabeça -->
      <rect x="10" y="-2" width="4" height="6" rx="1" fill="${CONFIG.snakeColor}"/>
      <rect x="12" y="-4" width="4" height="4" rx="1" fill="${CONFIG.snakeColor}"/>
    </g>
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
  
  return `
<svg viewBox="-16 -32 880 192" width="880" height="192" xmlns="http://www.w3.org/2000/svg">
<desc>Generated with custom snake generator</desc>
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
  animation:none 27900ms linear infinite;
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
  animation:none linear 27900ms infinite
}

/* Animações IDÊNTICAS ao Platane/snk */
@keyframes s0{
  0%,99.64%{transform:translate(0px,-16px)}
  0.36%{transform:translate(0px,0px)}
  12.9%{transform:translate(560px,0px)}
  14.7%{transform:translate(560px,80px)}
  15.05%,54.48%{transform:translate(576px,80px)}
  15.41%{transform:translate(576px,96px)}
  17.56%,56.99%{transform:translate(672px,96px)}
  17.92%{transform:translate(672px,80px)}
  18.28%{transform:translate(688px,80px)}
  18.64%{transform:translate(688px,64px)}
  20.07%,37.99%{transform:translate(752px,64px)}
  20.79%{transform:translate(752px,32px)}
  21.51%{transform:translate(784px,32px)}
  21.86%{transform:translate(784px,16px)}
  22.94%{transform:translate(736px,16px)}
  23.66%{transform:translate(736px,48px)}
  24.37%{transform:translate(704px,48px)}
  25.09%{transform:translate(704px,16px)}
  25.45%{transform:translate(688px,16px)}
  25.81%{transform:translate(688px,32px)}
  26.16%{transform:translate(672px,32px)}
  26.52%{transform:translate(672px,48px)}
  27.6%{transform:translate(720px,48px)}
  28.67%,60.22%{transform:translate(720px,96px)}
  29.03%{transform:translate(704px,96px)}
  29.39%{transform:translate(704px,80px)}
  30.82%,35.13%{transform:translate(640px,80px)}
  31.54%,34.41%{transform:translate(640px,48px)}
  32.26%{transform:translate(608px,48px)}
  32.62%,73.48%{transform:translate(608px,32px)}
  32.97%,53.05%{transform:translate(592px,32px)}
  33.33%{transform:translate(592px,48px)}
  36.92%{transform:translate(720px,80px)}
  37.28%,60.93%{transform:translate(720px,64px)}
  38.35%{transform:translate(752px,80px)}
  39.43%{transform:translate(800px,80px)}
  40.14%{transform:translate(800px,48px)}
  40.5%{transform:translate(784px,48px)}
  40.86%{transform:translate(784px,64px)}
  41.94%{transform:translate(832px,64px)}
  42.65%,44.09%{transform:translate(832px,32px)}
  43.01%,44.44%{transform:translate(816px,32px)}
  43.37%{transform:translate(816px,16px)}
  43.73%{transform:translate(832px,16px)}
  44.8%{transform:translate(816px,48px)}
  45.88%,78.85%{transform:translate(768px,48px)}
  46.24%{transform:translate(768px,32px)}
  48.75%,70.25%{transform:translate(656px,32px)}
  49.1%{transform:translate(656px,16px)}
  50.18%{transform:translate(608px,16px)}
  50.54%{transform:translate(608px,0px)}
  50.9%{transform:translate(592px,0px)}
  51.25%{transform:translate(592px,16px)}
  51.97%{transform:translate(624px,16px)}
  52.33%{transform:translate(624px,32px)}
  53.76%{transform:translate(592px,64px)}
  54.12%{transform:translate(576px,64px)}
  55.2%,72.4%{transform:translate(608px,80px)}
  55.56%{transform:translate(608px,96px)}
  57.71%{transform:translate(672px,64px)}
  59.14%{transform:translate(736px,64px)}
  59.86%{transform:translate(736px,96px)}
  63.08%{transform:translate(624px,64px)}
  63.44%,71.33%{transform:translate(624px,48px)}
  64.87%{transform:translate(560px,48px)}
  65.59%{transform:translate(560px,16px)}
  67.38%,69.53%{transform:translate(640px,16px)}
  67.74%{transform:translate(640px,0px)}
  68.46%{transform:translate(672px,0px)}
  68.82%{transform:translate(672px,16px)}
  69.89%{transform:translate(640px,32px)}
  70.61%{transform:translate(656px,48px)}
  72.04%{transform:translate(624px,80px)}
  74.19%{transform:translate(576px,32px)}
  74.55%{transform:translate(576px,48px)}
  79.21%{transform:translate(768px,64px)}
  79.93%{transform:translate(800px,64px)}
  81%{transform:translate(800px,16px)}
  97.13%{transform:translate(80px,16px)}
  97.85%{transform:translate(80px,-16px)}
}
.s.s0{transform:translate(0px,-16px);animation-name:s0}

@keyframes s1{
  0%,99.64%{transform:translate(16px,-16px)}
  0.36%{transform:translate(0px,-16px)}
  0.72%{transform:translate(0px,0px)}
  13.26%{transform:translate(560px,0px)}
  15.05%{transform:translate(560px,80px)}
  15.41%,54.84%{transform:translate(576px,80px)}
  15.77%{transform:translate(576px,96px)}
  17.92%,57.35%{transform:translate(672px,96px)}
  18.28%{transform:translate(672px,80px)}
  18.64%{transform:translate(688px,80px)}
  19%{transform:translate(688px,64px)}
  20.43%,38.35%{transform:translate(752px,64px)}
  21.15%{transform:translate(752px,32px)}
  21.86%{transform:translate(784px,32px)}
  22.22%{transform:translate(784px,16px)}
  23.3%{transform:translate(736px,16px)}
  24.01%{transform:translate(736px,48px)}
  24.73%{transform:translate(704px,48px)}
  25.45%{transform:translate(704px,16px)}
  25.81%{transform:translate(688px,16px)}
  26.16%{transform:translate(688px,32px)}
  26.52%{transform:translate(672px,32px)}
  26.88%{transform:translate(672px,48px)}
  27.96%{transform:translate(720px,48px)}
  29.03%,60.57%{transform:translate(720px,96px)}
  29.39%{transform:translate(704px,96px)}
  29.75%{transform:translate(704px,80px)}
  31.18%,35.48%{transform:translate(640px,80px)}
  31.9%,34.77%{transform:translate(640px,48px)}
  32.62%{transform:translate(608px,48px)}
  32.97%,73.84%{transform:translate(608px,32px)}
  33.33%,53.41%{transform:translate(592px,32px)}
  33.69%{transform:translate(592px,48px)}
  37.28%{transform:translate(720px,80px)}
  37.63%,61.29%{transform:translate(720px,64px)}
  38.71%{transform:translate(752px,80px)}
  39.78%{transform:translate(800px,80px)}
  40.5%{transform:translate(800px,48px)}
  40.86%{transform:translate(784px,48px)}
  41.22%{transform:translate(784px,64px)}
  42.29%{transform:translate(832px,64px)}
  43.01%,44.44%{transform:translate(832px,32px)}
  43.37%,44.8%{transform:translate(816px,32px)}
  43.73%{transform:translate(816px,16px)}
  44.09%{transform:translate(832px,16px)}
  45.16%{transform:translate(816px,48px)}
  46.24%,79.21%{transform:translate(768px,48px)}
  46.59%{transform:translate(768px,32px)}
  49.1%,70.61%{transform:translate(656px,32px)}
  49.46%{transform:translate(656px,16px)}
  50.54%{transform:translate(608px,16px)}
  50.9%{transform:translate(608px,0px)}
  51.25%{transform:translate(592px,0px)}
  51.61%{transform:translate(592px,16px)}
  52.33%{transform:translate(624px,16px)}
  52.69%{transform:translate(624px,32px)}
  54.12%{transform:translate(592px,64px)}
  54.48%{transform:translate(576px,64px)}
  55.56%,72.76%{transform:translate(608px,80px)}
  55.91%{transform:translate(608px,96px)}
  58.06%{transform:translate(672px,64px)}
  59.5%{transform:translate(736px,64px)}
  60.22%{transform:translate(736px,96px)}
  63.44%{transform:translate(624px,64px)}
  63.8%,71.68%{transform:translate(624px,48px)}
  65.23%{transform:translate(560px,48px)}
  65.95%{transform:translate(560px,16px)}
  67.74%,69.89%{transform:translate(640px,16px)}
  68.1%{transform:translate(640px,0px)}
  68.82%{transform:translate(672px,0px)}
  69.18%{transform:translate(672px,16px)}
  70.25%{transform:translate(640px,32px)}
  70.97%{transform:translate(656px,48px)}
  72.4%{transform:translate(624px,80px)}
  74.55%{transform:translate(576px,32px)}
  74.91%{transform:translate(576px,48px)}
  79.57%{transform:translate(768px,64px)}
  80.29%{transform:translate(800px,64px)}
  81.36%{transform:translate(800px,16px)}
  97.49%{transform:translate(80px,16px)}
  98.21%{transform:translate(80px,-16px)}
}
.s.s1{transform:translate(16px,-16px);animation-name:s1}
</style>

${gridSVG}

${characterSVG}

</svg>
  `;
}

// EXECUÇÃO PRINCIPAL
async function main() {
  try {
    console.log('🎨 Gerando SVG no formato Platane/snk...');
    
    const svgContent = generateSnakeSVG();
    
    const fileName = `assets/github-contribution-grid-${CONFIG.theme}.svg`;
    
    console.log('💾 Salvando arquivo...');
    writeFileSync(fileName, svgContent);
    
    console.log('✅ SVG gerado com sucesso!');
    console.log(`🎯 Tema: ${CONFIG.theme}`);
    console.log(`🎨 Cor: ${CONFIG.snakeColor}`);
    console.log(`📁 Arquivo: ${fileName}`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar o script
main();
