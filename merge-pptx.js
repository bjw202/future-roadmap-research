const fs = require('fs');
const dir = 'presentation-build/2026-03-25-dx-manufacturing-process-rd-roadmap';

// Read all parts
const part1 = fs.readFileSync(`${dir}/part-1.js`, 'utf8');
const part2 = fs.readFileSync(`${dir}/part-2.js`, 'utf8');
const part3 = fs.readFileSync(`${dir}/part-3.js`, 'utf8');

// Extract Part 1: everything between markers, remove execution block and module.exports
let p1Content = part1.split('// === Part 1 시작 ===')[1].split('// === Part 1 끝 ===')[0];
// Remove execution lines
const execStart = p1Content.indexOf('// ===================================================================\n// 슬라이드 실행');
if (execStart !== -1) {
  p1Content = p1Content.substring(0, execStart);
}

// Extract Part 2: between markers
let p2Content = part2.split('// === Part 2 시작 ===')[1].split('// === Part 2 끝 ===')[0];

// Extract Part 3: between markers
let p3Content = part3.split('// === Part 3 시작 ===')[1].split('// === Part 3 끝 ===')[0];

// Build function call list (sorted by slide number)
const allContent = p1Content + p2Content + p3Content;
const funcNames = [];
const regex = /^function (slide\d+_\w+)\(/gm;
let match;
while ((match = regex.exec(allContent)) !== null) {
  funcNames.push(match[1]);
}
funcNames.sort((a, b) => {
  const numA = parseInt(a.match(/\d+/)[0]);
  const numB = parseInt(b.match(/\d+/)[0]);
  return numA - numB;
});

// Assemble
let output = `// === DX사업부 공정 R&D AI 로드맵 프레젠테이션 ===\n`;
output += `// === 합치기: 2026-03-25 ===\n\n`;
output += `'use strict';\n\n`;

output += `// ===== Part 1: 초기화 + 상수 + 헬퍼 + 슬라이드 1~10 =====\n`;
output += p1Content;

output += `\n// ===== Part 2: 슬라이드 11~19 =====\n`;
output += p2Content;

output += `\n// ===== Part 3: 슬라이드 20~28 =====\n`;
output += p3Content;

output += `\n// ===== 슬라이드 실행 =====\n`;
funcNames.forEach(fn => {
  output += `${fn}();\n`;
});

output += `\npptx.writeFile({ fileName: '${dir}/dx-manufacturing-rd-roadmap.pptx' })\n`;
output += `  .then(function() { console.log('저장 완료: ${dir}/dx-manufacturing-rd-roadmap.pptx'); })\n`;
output += `  .catch(function(err) { console.error('저장 실패:', err); });\n`;

fs.writeFileSync('generate-presentation.js', output);
console.log('합치기 완료: ' + funcNames.length + '개 함수');
console.log('함수 목록: ' + funcNames.join(', '));
