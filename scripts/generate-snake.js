import { writeFileSync } from 'fs';

const CONFIG = {
  username: 'marciocleydev',
  theme: 'rocket',
  snakeColor: 'purple',
  frames: 8 // quantas posições do foguete
};

// Gera o grid de contribuições
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

// Gera o foguete em uma posição específica
function rocketAt(x, y) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="16" height="24" rx="3" fill="${CONFIG.snakeColor}"/>
      <circle cx="${x + 8}" cy="${y + 8}" r="3" fill="#a8e6cf"/>
      <path d="M ${x} ${y + 8} L ${x - 8} ${y + 20} L ${x} ${y + 16} Z" fill="${CONFIG.snakeColor}"/>
      <path d="M ${x + 16} ${y + 8} L ${x + 24} ${y + 20} L ${x + 16} ${y + 16} Z" fill="${CONFIG.snakeColor}"/>
      <path d="M ${x + 4} ${y + 24} Q ${x + 8} ${y + 32} ${x + 12} ${y + 24} Q ${x + 8} ${y + 34} ${x + 4} ${y + 24}" fill="#ff6b00"/>
    </g>
  `;
}

// Gera todas as posições simulando movimento
function generateRocketFrames() {
  let frames = '';
  for (let i = 0; i < CONFIG.frames; i++) {
    const x = i * 84; // espaçamento horizontal
    const y = i % 2 === 0 ? 48 : 64; // sobe e desce alternadamente
    frames += rocketAt(x, y);
  }
  return frames;
}

// Gera SVG final
function generateSVG() {
  const gridSVG = generateGrid();
  const rocketSVG = generateRocketFrames();

  return `
<svg viewBox="0 0 880 112" width="880" height="112" xmlns="http://www.w3.org/2000/svg">
<desc>Foguete animado estático GitHub</desc>
<style>
.c{fill:#ebedf0;stroke:#1b1f230a;stroke-width:1px}
.c1{fill:#9be9a8}
.c2{fill:#40c463}
.c3{fill:#30a14e}
.c4{fill:#216e39}
</style>

${gridSVG}

${rocketSVG}

</svg>
  `.trim();
}

// Executa e salva
function main() {
  const svgContent = generateSVG();
  const fileName = `assets/github-contribution-grid-${CONFIG.theme}.svg`;
  writeFileSync(fileName, svgContent);
  console.log(`✅ SVG gerado com sucesso: ${fileName}`);
}

main();
