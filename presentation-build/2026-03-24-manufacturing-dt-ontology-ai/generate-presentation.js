const PptxGenJS = require('pptxgenjs');
const path = require('path');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';

// ===== 색상 상수 =====
const COLORS = {
  bg_primary: 'FFFFFF',
  bg_secondary: 'F5F7FA',
  bg_dark: '1A1F36',
  text_primary: '1A1F36',
  text_secondary: '4A5568',
  text_tertiary: '718096',
  text_on_dark: 'FFFFFF',
  accent_blue: '4A7BF7',
  accent_cyan: '00D4AA',
  accent_yellow: 'FFB020',
  accent_red: 'FF6B6B',
  accent_purple: '8B5CF6',
};

// ===== 폰트 상수 =====
const FONTS = {
  title: { fontFace: 'Pretendard ExtraBold', bold: true },
  subtitle: { fontFace: 'Pretendard SemiBold', bold: true },
  body: { fontFace: 'Pretendard', bold: false },
  caption: { fontFace: 'Pretendard Light', bold: false },
  serif: { fontFace: 'ChosunNm', bold: false },
  kpi: { fontFace: 'Pretendard Black', bold: true },
  deco: { fontFace: 'Pretendard Thin', bold: false },
};

// ===== 테이블 스타일 =====
const TABLE_STYLE = {
  header: {
    bold: true, fill: { color: COLORS.bg_dark }, color: COLORS.text_on_dark,
    fontFace: 'Pretendard', fontSize: 11, align: 'center', valign: 'middle'
  },
  cell: {
    fontFace: 'Pretendard', fontSize: 11, color: COLORS.text_secondary, valign: 'middle'
  },
  cellRight: {
    fontFace: 'Pretendard', fontSize: 11, color: COLORS.text_secondary, align: 'right', valign: 'middle'
  },
  cellAlt: {
    fontFace: 'Pretendard', fontSize: 11, color: COLORS.text_secondary,
    fill: { color: COLORS.bg_secondary }, valign: 'middle'
  },
  cellTotal: {
    bold: true, fontFace: 'Pretendard', fontSize: 11, color: COLORS.text_primary,
    border: [{ type: 'solid', pt: 1.5, color: COLORS.text_primary }, null, null, null], valign: 'middle'
  }
};

const TABLE_OPTIONS = {
  x: 0.6, y: 1.8, w: 12.13,
  border: { type: 'solid', pt: 0.5, color: 'E2E8F0' },
  autoPage: false, margin: [5, 8, 5, 8]
};

const CHART_STYLE = {
  colors: ['4A7BF7', '00D4AA', 'FFB020', 'FF6B6B', '8B5CF6', '38BDF8']
};

// ===== 헬퍼 함수 =====
function addTitleBar(slide, title, subtitle) {
  slide.addShape('rect', { x: 0.6, y: 0.5, w: 1.2, h: 0.06, fill: { color: COLORS.accent_blue } });
  slide.addText(title, {
    x: 0.6, y: 0.65, w: 12.13, h: 0.9,
    fontSize: 28, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_primary, charSpacing: -0.3, autoFit: true
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6, y: 1.5, w: 12.13, h: 0.3,
      fontSize: 14, fontFace: 'Pretendard', color: COLORS.text_tertiary
    });
  }
}

function addStyledTable(slide, headers, dataRows, opts) {
  const rows = [];
  rows.push(headers.map(h => ({ text: h, options: { ...TABLE_STYLE.header } })));
  dataRows.forEach((row, i) => {
    const isAlt = i % 2 === 1;
    const baseStyle = isAlt ? TABLE_STYLE.cellAlt : TABLE_STYLE.cell;
    rows.push(row.map(cell => {
      if (typeof cell === 'string') return { text: cell, options: { ...baseStyle } };
      return { text: cell.text, options: { ...baseStyle, ...cell.options } };
    }));
  });
  slide.addTable(rows, { ...TABLE_OPTIONS, ...opts });
}

function addCard(slide, { x, y, w, h, title, body, accentColor }) {
  slide.addShape('roundRect', {
    x, y, w, h, rectRadius: 0.1,
    fill: { color: 'FFFFFF' },
    shadow: { type: 'outer', blur: 6, offset: 2, color: '000000', opacity: 0.08 }
  });
  slide.addShape('rect', {
    x: x + 0.02, y, w: w - 0.04, h: 0.06,
    fill: { color: accentColor || COLORS.accent_blue }
  });
  slide.addText(title, {
    x: x + 0.2, y: y + 0.15, w: w - 0.4, h: 0.4,
    fontSize: 15, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_primary, autoFit: true
  });
  slide.addText(body, {
    x: x + 0.2, y: y + 0.55, w: w - 0.4, h: h - 0.75,
    fontSize: 12, fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary, lineSpacingMultiple: 1.35, valign: 'top', autoFit: true
  });
}

function addPageNumber(slide, num) {
  slide.addText(`${num} / 20`, {
    x: 12.0, y: 7.05, w: 1.0, h: 0.3,
    fontSize: 9, fontFace: 'Pretendard', color: COLORS.text_tertiary, align: 'right'
  });
}

// ===================================================================
// 슬라이드 함수
// ===================================================================

function slide01_title() {
  const slide = pptx.addSlide();
  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_dark } });
  slide.addShape('rect', { x: 1.5, y: 2.3, w: 1.5, h: 0.06, fill: { color: COLORS.accent_cyan } });
  slide.addText('제조업의 다음 10년', {
    x: 1.5, y: 2.5, w: 10.33, h: 1.0,
    fontSize: 44, fontFace: FONTS.title.fontFace, bold: true,
    color: COLORS.text_on_dark, charSpacing: -0.5, lineSpacingMultiple: 1.1
  });
  slide.addText('디지털트윈 · 온톨로지 · AI 통합 전략 로드맵', {
    x: 1.5, y: 3.6, w: 10.33, h: 0.6,
    fontSize: 22, fontFace: 'Pretendard',
    color: 'FFFFFF', transparency: 25
  });
  slide.addText('임원 보고  |  2026년 3월', {
    x: 1.5, y: 6.0, w: 10.33, h: 0.4,
    fontSize: 14, fontFace: 'Pretendard',
    color: 'FFFFFF', transparency: 50, align: 'center'
  });
}

function slide02_execSummary() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '세 줄로 요약하면: 기반 → 실험 → 전환');

  const points = [
    { num: '1', color: COLORS.accent_blue, title: '병목은 기술이 아니라 데이터·조직·표준이다', desc: '프로젝트 64%가 실험 단계에 머물러 있으며, 실질 성공률은 33%에 불과합니다. 기술보다 데이터 품질과 조직 통합이 우선입니다.' },
    { num: '2', color: COLORS.accent_cyan, title: '통합 순서는 "데이터 → 의미 → 지능"이다', desc: '기반 인프라(IT/OT 통합) 없이 AI를 도입하면 실패합니다. 단계별 접근만이 양쪽 리스크를 모두 관리합니다.' },
    { num: '3', color: COLORS.accent_yellow, title: '지금 베팅할 것은 딱 2가지뿐이다', desc: '데이터 거버넌스와 2세대 디지털트윈 고도화. 나머지는 제한적 실험 또는 관망이 적절합니다.' },
  ];

  points.forEach((p, i) => {
    const yBase = 1.85 + i * 1.7;
    slide.addShape('ellipse', { x: 0.8, y: yBase + 0.05, w: 0.5, h: 0.5, fill: { color: p.color } });
    slide.addText(p.num, {
      x: 0.8, y: yBase + 0.05, w: 0.5, h: 0.5,
      fontSize: 20, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });
    slide.addText(p.title, {
      x: 1.55, y: yBase, w: 11.18, h: 0.5,
      fontSize: 20, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, valign: 'middle'
    });
    slide.addText(p.desc, {
      x: 1.55, y: yBase + 0.55, w: 11.18, h: 0.8,
      fontSize: 14, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, lineSpacingMultiple: 1.4, valign: 'top'
    });
    if (i < 2) {
      slide.addShape('line', {
        x: 0.6, y: yBase + 1.5, w: 12.13, h: 0,
        line: { color: 'E2E8F0', width: 0.5 }
      });
    }
  });
  addPageNumber(slide, 2);
}

function slide03_section1() {
  const slide = pptx.addSlide();
  slide.addShape('rect', { x: 0, y: 0, w: 5.33, h: 7.5, fill: { color: COLORS.bg_dark } });
  slide.addText('01', {
    x: 1.0, y: 2.5, w: 3.33, h: 1.5,
    fontSize: 72, fontFace: 'Pretendard', bold: true, color: COLORS.accent_cyan, align: 'center'
  });
  slide.addText('왜 지금 이 주제가\n중요한가', {
    x: 6.0, y: 2.2, w: 6.73, h: 1.2,
    fontSize: 36, fontFace: FONTS.title.fontFace, bold: true, color: COLORS.text_primary, lineSpacingMultiple: 1.2
  });
  slide.addText('세 가지 기술이 동시에 성숙하면서\n제조업의 구조적 전환이 시작되고 있습니다', {
    x: 6.0, y: 3.6, w: 6.73, h: 1.0,
    fontSize: 16, fontFace: 'Pretendard', color: COLORS.text_secondary, lineSpacingMultiple: 1.4
  });
  addPageNumber(slide, 3);
}

function slide04_marketKPI() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '디지털트윈 시장이 연 48%씩 성장하고 있다');

  const kpis = [
    { value: '$21B', label: '2025년 시장 규모', sub: '→ 2030년 $150B 전망' },
    { value: '48%', label: '연평균 성장률', sub: 'CAGR (MarketsandMarkets)' },
    { value: '1,000%', label: '5년간 채택 증가율', sub: '2020~2025 제조업 기준' },
  ];

  kpis.forEach((kpi, i) => {
    const x = 0.6 + i * 4.1;
    slide.addShape('roundRect', {
      x, y: 1.9, w: 3.8, h: 2.2, rectRadius: 0.08,
      fill: { color: COLORS.bg_secondary }
    });
    slide.addText(kpi.value, {
      x: x + 0.15, y: 2.0, w: 3.5, h: 1.0,
      fontSize: 48, fontFace: FONTS.kpi.fontFace, bold: true,
      color: CHART_STYLE.colors[i], align: 'center'
    });
    slide.addText(kpi.label, {
      x: x + 0.15, y: 3.0, w: 3.5, h: 0.4,
      fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, align: 'center'
    });
    slide.addText(kpi.sub, {
      x: x + 0.15, y: 3.4, w: 3.5, h: 0.4,
      fontSize: 11, fontFace: 'Pretendard', color: COLORS.text_tertiary, align: 'center'
    });
  });

  slide.addShape('roundRect', {
    x: 0.6, y: 4.5, w: 12.13, h: 2.2, rectRadius: 0.08,
    fill: { color: 'FFF8E1' }
  });
  slide.addText('⚠  수치 해석 유의사항', {
    x: 0.9, y: 4.6, w: 11.53, h: 0.4,
    fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.accent_yellow
  });
  slide.addText('• 시장 정의에 따라 $2.25B~$150B까지 70배 편차 — 투자 의사결정에 그대로 사용 불가\n• 성장률은 초기 채택 가속기를 반영한 것으로, S-curve 둔화가 발생할 가능성 높음\n• 보수적 정의(DT 전용 소프트웨어)로는 $2~5B 수준', {
    x: 0.9, y: 5.05, w: 11.53, h: 1.4,
    fontSize: 12, fontFace: FONTS.body.fontFace, color: COLORS.text_secondary,
    lineSpacingMultiple: 1.5, valign: 'top'
  });
  addPageNumber(slide, 4);
}

function slide05_threeTech() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '세 기술은 각각이 아닌, 결합할 때 가치가 폭발한다');

  const cards = [
    { title: '디지털트윈', body: '공장·설비의 실시간 가상 복제본\n\n현재 상태를 반영하고\n미래를 시뮬레이션합니다\n\n→ "무엇이 일어나고 있는가"', color: COLORS.accent_blue },
    { title: '온톨로지', body: '데이터에 의미와 관계를 부여하는 구조\n\n장비·공정·부품 간의 관계를\n기계가 이해할 수 있게 만듭니다\n\n→ "이것이 무엇을 의미하는가"', color: COLORS.accent_cyan },
    { title: 'AI / 생성AI', body: '데이터에서 판단과 행동을 도출\n\n이상 감지, 예측, 최적화,\n자연어 대화를 실현합니다\n\n→ "무엇을 해야 하는가"', color: COLORS.accent_yellow },
  ];

  cards.forEach((c, i) => {
    addCard(slide, {
      x: 0.6 + i * 4.1, y: 1.9, w: 3.8, h: 4.5,
      title: c.title, body: c.body, accentColor: c.color
    });
  });

  slide.addShape('rect', { x: 0.6, y: 6.6, w: 12.13, h: 0.5, fill: { color: COLORS.bg_secondary } });
  slide.addText('핵심 통찰: 온톨로지 없는 디지털트윈은 데이터 창고에 불과하고, AI 없는 온톨로지는 행동이 없는 사전에 불과합니다', {
    x: 0.8, y: 6.6, w: 11.73, h: 0.5,
    fontSize: 12, fontFace: FONTS.body.fontFace, color: COLORS.accent_blue, valign: 'middle'
  });
  addPageNumber(slide, 5);
}

function slide06_cases() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '선도 기업은 이미 구체적 성과를 증명했다');

  const cases = [
    { title: 'BMW iFACTORY', body: '양산 2년 전 가상 공장 가동\n생산 계획 비용 30% 절감\nNVIDIA Omniverse 기반', color: COLORS.accent_blue },
    { title: 'Boeing T-7A', body: '설계~초도비행 36개월 단축\n조립 공수 80% 감소\n초도 품질 75% 향상', color: COLORS.accent_cyan },
    { title: 'Siemens 양조장 15곳', body: '에너지 디지털트윈 적용\nCO₂ 50% 감소\n에너지 15~20% 절약', color: COLORS.accent_yellow },
  ];

  cases.forEach((c, i) => {
    addCard(slide, {
      x: 0.6 + i * 4.1, y: 1.9, w: 3.8, h: 2.8,
      title: c.title, body: c.body, accentColor: c.color
    });
  });

  slide.addShape('roundRect', {
    x: 0.6, y: 5.0, w: 12.13, h: 1.8, rectRadius: 0.08,
    fill: { color: 'FFF0F0' }
  });
  slide.addText('⚠  이 사례를 그대로 기대해서는 안 됩니다', {
    x: 0.9, y: 5.1, w: 11.53, h: 0.4,
    fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.accent_red
  });
  slide.addText('• 위 사례는 모두 항공·자동차 — 제품 단가 수억~수천억 원, 센서 밀도 극도로 높음, 전문 인력 풍부\n• 일반 제조업(식품, 금속, 기계)은 구조적으로 다름 → ROI 기대치를 50~70% 하향 조정 필요\n• 식음료 산업 실증 사례: 비용 15% 절감, 운영 효율 25% 향상 수준이 현실적 기대치', {
    x: 0.9, y: 5.5, w: 11.53, h: 1.1,
    fontSize: 12, fontFace: FONTS.body.fontFace, color: COLORS.text_secondary,
    lineSpacingMultiple: 1.5, valign: 'top'
  });
  addPageNumber(slide, 6);
}

function slide07_section2() {
  const slide = pptx.addSlide();
  slide.addShape('rect', { x: 0, y: 0, w: 5.33, h: 7.5, fill: { color: COLORS.bg_dark } });
  slide.addText('02', {
    x: 1.0, y: 2.5, w: 3.33, h: 1.5,
    fontSize: 72, fontFace: 'Pretendard', bold: true, color: COLORS.accent_cyan, align: 'center'
  });
  slide.addText('그러나 현실은\n기대와 다르다', {
    x: 6.0, y: 2.2, w: 6.73, h: 1.2,
    fontSize: 36, fontFace: FONTS.title.fontFace, bold: true, color: COLORS.text_primary, lineSpacingMultiple: 1.2
  });
  slide.addText('화려한 사례 뒤에 숨겨진\n구조적 실패 패턴을 직시해야 합니다', {
    x: 6.0, y: 3.6, w: 6.73, h: 1.0,
    fontSize: 16, fontFace: 'Pretendard', color: COLORS.text_secondary, lineSpacingMultiple: 1.4
  });
  addPageNumber(slide, 7);
}

function slide08_realityKPI() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '실질 성공률은 33%에 불과하다');

  // Left KPI
  slide.addShape('roundRect', { x: 0.6, y: 1.9, w: 5.8, h: 3.0, rectRadius: 0.08, fill: { color: COLORS.bg_secondary } });
  slide.addText('64%', {
    x: 0.6, y: 2.0, w: 5.8, h: 1.2,
    fontSize: 64, fontFace: FONTS.kpi.fontFace, bold: true, color: COLORS.accent_red, align: 'center'
  });
  slide.addText('파일럿 함정', {
    x: 0.6, y: 3.1, w: 5.8, h: 0.4,
    fontSize: 18, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.text_primary, align: 'center'
  });
  slide.addText('10개 프로젝트 중 6개 이상이\n실험실을 벗어나지 못합니다', {
    x: 0.9, y: 3.6, w: 5.2, h: 0.8,
    fontSize: 13, fontFace: FONTS.body.fontFace, color: COLORS.text_secondary, align: 'center', lineSpacingMultiple: 1.4
  });

  // Right KPI
  slide.addShape('roundRect', { x: 6.73, y: 1.9, w: 6.0, h: 3.0, rectRadius: 0.08, fill: { color: COLORS.bg_secondary } });
  slide.addText('≈33%', {
    x: 6.73, y: 2.0, w: 6.0, h: 1.2,
    fontSize: 64, fontFace: FONTS.kpi.fontFace, bold: true, color: COLORS.accent_yellow, align: 'center'
  });
  slide.addText('실질 ROI 달성률', {
    x: 6.73, y: 3.1, w: 6.0, h: 0.4,
    fontSize: 18, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.text_primary, align: 'center'
  });
  slide.addText('"ROI 92%" 보도는 성공 기업만의 수치\n파일럿 탈출률(36%)을 곱하면 실질 약 33%', {
    x: 7.03, y: 3.6, w: 5.4, h: 0.8,
    fontSize: 13, fontFace: FONTS.body.fontFace, color: COLORS.text_secondary, align: 'center', lineSpacingMultiple: 1.4
  });

  // Bottom insight
  slide.addShape('rect', { x: 0.6, y: 5.3, w: 12.13, h: 0.06, fill: { color: COLORS.accent_blue } });
  slide.addText('성공과 실패를 가르는 차이는 기술이 아닙니다', {
    x: 0.6, y: 5.5, w: 12.13, h: 0.4,
    fontSize: 18, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.text_primary
  });
  slide.addText('• 스케일업 방법론(KPI 정의, 단계별 확장 기준)을 보유한 기업만 파일럿을 넘김\n• 경영진 스폰서십과 IT/OT 통합 조직이 없으면 조직 저항에 매몰\n• 데이터 품질 기반 없이 AI를 얹으면 "쓰레기 위에 쌓은 지능"', {
    x: 0.6, y: 5.95, w: 12.13, h: 1.0,
    fontSize: 13, fontFace: FONTS.body.fontFace, color: COLORS.text_secondary, lineSpacingMultiple: 1.5
  });
  addPageNumber(slide, 8);
}

function slide09_bottlenecks() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '병목은 기술이 아니라 데이터·조직·표준에 있다');

  const cards = [
    { title: '데이터 품질', body: '기업의 50%가 최대 장벽으로 지목\n\n센서 결측, 라벨 부재, 레거시 장비 비호환이 복합적으로 작용', color: COLORS.accent_blue },
    { title: '조직·문화 충돌', body: '통합 비용의 70%가 인력에 집중\n\n현장(OT)의 "안정 우선"과 IT의 "혁신 우선"이 구조적으로 충돌', color: COLORS.accent_cyan },
    { title: '표준화 부재', body: '벤더별 독자 데이터 모델 난립\n\nAAS, OPC UA 등 표준이 존재하나 실제 기업 구현은 초기 단계', color: COLORS.accent_yellow },
    { title: '인력 부족', body: '온톨로지 설계, OT-IT 연결 전문가 극소\n\n교육만으로 해소 어려운 구조적 부족', color: COLORS.accent_purple },
  ];

  const CARD_W = 5.915;
  const positions = [
    { x: 0.6, y: 1.9 }, { x: 6.815, y: 1.9 },
    { x: 0.6, y: 4.5 }, { x: 6.815, y: 4.5 }
  ];

  cards.forEach((c, i) => {
    addCard(slide, {
      x: positions[i].x, y: positions[i].y, w: CARD_W, h: 2.3,
      title: c.title, body: c.body, accentColor: c.color
    });
  });
  addPageNumber(slide, 9);
}

function slide10_maturityGap() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '산업과 규모에 따라 출발선이 완전히 다르다');

  addStyledTable(slide,
    ['산업', '현재 성숙도', '현실적 기대 ROI', '핵심 병목', '권고 진입점'],
    [
      ['항공우주', '3세대 (자율 최적화 진입)', '높음', '인증·규제 속도', '고급 AI + 인지 DT'],
      ['자동차', '2~3세대', '중~높음', '공급망 통합', '온톨로지 + 코파일럿'],
      ['화학·에너지', '2세대', '중간', '안전 규제', '예지보전 + 공정 최적화'],
      ['식음료', '1~2세대', '낮~중간', '센서 밀도 부족', '기본 DT + 데이터 수집'],
      ['기계·금속', '1세대 이하', '불확실', 'MES 자체 부재', '디지털 기반 구축부터'],
      [
        { text: '중소 제조업', options: { bold: true } },
        { text: '0~1세대', options: { bold: true } },
        { text: '장기적 (SaaS 경로)', options: { bold: true } },
        { text: '투자 여력·인력', options: { bold: true } },
        { text: 'SaaS 구독형 진입', options: { bold: true } }
      ],
    ],
    { y: 1.85, rowH: [0.45, 0.5, 0.5, 0.5, 0.5, 0.5, 0.55] }
  );

  slide.addText('💡 한국 제조업의 99%는 중소기업입니다. 대기업 사례를 그대로 적용하면 실패합니다.', {
    x: 0.6, y: 6.2, w: 12.13, h: 0.5,
    fontSize: 13, fontFace: FONTS.body.fontFace, color: COLORS.accent_blue, valign: 'middle'
  });
  addPageNumber(slide, 10);
}

function slide11_section3() {
  const slide = pptx.addSlide();
  slide.addShape('rect', { x: 0, y: 0, w: 5.33, h: 7.5, fill: { color: COLORS.bg_dark } });
  slide.addText('03', {
    x: 1.0, y: 2.5, w: 3.33, h: 1.5,
    fontSize: 72, fontFace: 'Pretendard', bold: true, color: COLORS.accent_cyan, align: 'center'
  });
  slide.addText('미래는 어떤 방향으로\n전개되는가', {
    x: 6.0, y: 2.2, w: 6.73, h: 1.2,
    fontSize: 36, fontFace: FONTS.title.fontFace, bold: true, color: COLORS.text_primary, lineSpacingMultiple: 1.2
  });
  slide.addText('불확실성이 높은 만큼\n시나리오별 대비가 핵심입니다', {
    x: 6.0, y: 3.6, w: 6.73, h: 1.0,
    fontSize: 16, fontFace: 'Pretendard', color: COLORS.text_secondary, lineSpacingMultiple: 1.4
  });
  addPageNumber(slide, 11);
}

function slide12_scenarioMatrix() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'AI 성숙 속도와 표준화 속도가 미래를 결정한다');

  // 2x2 Matrix
  // Labels
  slide.addText('표준화 빠름 →', {
    x: 3.5, y: 1.85, w: 3.0, h: 0.3,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.accent_blue, align: 'center'
  });
  slide.addText('← 표준화 느림', {
    x: 8.5, y: 1.85, w: 3.0, h: 0.3,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.accent_red, align: 'center'
  });
  slide.addText('AI 빠름 ↑', {
    x: 0.6, y: 2.4, w: 1.5, h: 0.3,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.text_tertiary, align: 'center'
  });
  slide.addText('AI 느림 ↓', {
    x: 0.6, y: 4.8, w: 1.5, h: 0.3,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.text_tertiary, align: 'center'
  });

  // Quadrants
  const quads = [
    { x: 2.3, y: 2.25, title: 'A: 통합 가속', prob: '20~25%', desc: '인지 DT 2027~28 상용화\n모든 기술이 빠르게 수렴', color: COLORS.accent_cyan, bg: 'E8FAF5' },
    { x: 7.5, y: 2.25, title: 'B: 플랫폼 전쟁 ★', prob: '35~40%', desc: '벤더 종속 경쟁 심화\n가장 유력한 시나리오', color: COLORS.accent_red, bg: 'FFF0F0' },
    { x: 2.3, y: 4.65, title: 'C: 표준 선행', prob: '15~20%', desc: '데이터 인프라 먼저\nAI는 검증된 영역 한정', color: COLORS.accent_blue, bg: 'EEF2FF' },
    { x: 7.5, y: 4.65, title: 'D: 점진적 진화', prob: '20~25%', desc: '2세대 DT 주류 유지\nROI 회의론 확산 가능', color: COLORS.accent_yellow, bg: 'FFF8E1' },
  ];

  quads.forEach(q => {
    slide.addShape('roundRect', { x: q.x, y: q.y, w: 4.8, h: 2.2, rectRadius: 0.1, fill: { color: q.bg } });
    slide.addShape('rect', { x: q.x + 0.02, y: q.y, w: 4.76, h: 0.06, fill: { color: q.color } });
    slide.addText(q.title, {
      x: q.x + 0.2, y: q.y + 0.15, w: 3.0, h: 0.35,
      fontSize: 15, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.text_primary
    });
    slide.addText(q.prob, {
      x: q.x + 3.4, y: q.y + 0.15, w: 1.2, h: 0.35,
      fontSize: 14, fontFace: FONTS.kpi.fontFace, bold: true, color: q.color, align: 'right'
    });
    slide.addText(q.desc, {
      x: q.x + 0.2, y: q.y + 0.6, w: 4.4, h: 1.4,
      fontSize: 12, fontFace: FONTS.body.fontFace, color: COLORS.text_secondary, lineSpacingMultiple: 1.4, valign: 'top'
    });
  });
  addPageNumber(slide, 12);
}

function slide13_platformWar() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '가장 유력한 시나리오: 3개 플랫폼이 생태계를 지배한다');

  const players = [
    { title: 'Siemens', sub: '전체 수명주기 통합자', body: '• PLM 시장 1위 (~5% 점유)\n• Altair 인수($10B)로 시뮬레이션 내재화\n• NVIDIA 연합으로 물리 AI 통합\n• Industrial Copilot으로 GenAI 선점', color: COLORS.accent_blue },
    { title: 'NVIDIA', sub: '플랫폼 아래의 플랫폼', body: '• Omniverse + OpenUSD로 인프라 독점\n• 모든 산업 SW 벤더와 파트너십\n• GPU + 물리 시뮬레이션 대체재 없음\n• Isaac Sim으로 로봇/공장 DT 기반', color: COLORS.accent_cyan },
    { title: 'Palantir', sub: '운영 온톨로지 AI', body: '• Foundry 온톨로지 엔진 차별화\n• 데이터→실세계 객체 매핑 독보적\n• Snowflake·Databricks 통합 확보\n• AI 에이전트의 실행 계층 장악', color: COLORS.accent_yellow },
  ];

  players.forEach((p, i) => {
    const x = 0.6 + i * 4.1;
    addCard(slide, { x, y: 1.9, w: 3.8, h: 4.3, title: `${p.title}\n${p.sub}`, body: p.body, accentColor: p.color });
  });

  slide.addText('핵심: 플랫폼 선택이 10년의 전략적 종속을 결정합니다. 데이터 이동성(portability) 확보가 생존 조건입니다.', {
    x: 0.6, y: 6.5, w: 12.13, h: 0.4,
    fontSize: 12, fontFace: FONTS.body.fontFace, color: COLORS.accent_red, valign: 'middle'
  });
  addPageNumber(slide, 13);
}

function slide14_ontologyInsight() {
  const slide = pptx.addSlide();

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_secondary } });
  slide.addShape('rect', { x: 6.17, y: 2.0, w: 1.0, h: 0.06, fill: { color: COLORS.accent_blue } });

  slide.addText('\u201C온톨로지는 데이터 정리 기술이 아닙니다.\nAI 에이전트가 공장을 이해하는 언어입니다.\u201D', {
    x: 1.5, y: 2.3, w: 10.33, h: 2.0,
    fontSize: 24, fontFace: FONTS.serif.fontFace, italic: true,
    color: COLORS.text_primary, align: 'center', lineSpacingMultiple: 1.5
  });

  slide.addText('이 관점 전환이 투자 우선순위를 결정합니다', {
    x: 1.5, y: 4.6, w: 10.33, h: 0.4,
    fontSize: 14, fontFace: FONTS.body.fontFace, color: COLORS.text_tertiary, align: 'center'
  });

  // Two column comparison
  const colW = 5.0;
  const items = [
    { x: 1.5, title: '기존 관점: 데이터 통합 도구', body: '• 이종 시스템 간 형식 변환\n• 기존 미들웨어로도 가능\n• 투자 우선순위: 낮음' },
    { x: 7.0, title: '새로운 관점: AI의 운영 언어', body: '• AI가 "장비, 공정, 관계"를 이해하는 구조\n• AI 에이전트의 행동 범위를 정의\n• 투자 우선순위: 전략적 핵심' },
  ];

  items.forEach((it, i) => {
    slide.addShape('roundRect', { x: it.x, y: 5.15, w: colW, h: 1.8, rectRadius: 0.08, fill: { color: 'FFFFFF' } });
    slide.addText(it.title, {
      x: it.x + 0.2, y: 5.25, w: colW - 0.4, h: 0.35,
      fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: i === 0 ? COLORS.text_tertiary : COLORS.accent_blue
    });
    slide.addText(it.body, {
      x: it.x + 0.2, y: 5.65, w: colW - 0.4, h: 1.1,
      fontSize: 12, fontFace: FONTS.body.fontFace, color: COLORS.text_secondary, lineSpacingMultiple: 1.4, valign: 'top'
    });
  });
  addPageNumber(slide, 14);
}

function slide15_section4() {
  const slide = pptx.addSlide();
  slide.addShape('rect', { x: 0, y: 0, w: 5.33, h: 7.5, fill: { color: COLORS.bg_dark } });
  slide.addText('04', {
    x: 1.0, y: 2.5, w: 3.33, h: 1.5,
    fontSize: 72, fontFace: 'Pretendard', bold: true, color: COLORS.accent_cyan, align: 'center'
  });
  slide.addText('우리는 무엇을\n해야 하는가', {
    x: 6.0, y: 2.2, w: 6.73, h: 1.2,
    fontSize: 36, fontFace: FONTS.title.fontFace, bold: true, color: COLORS.text_primary, lineSpacingMultiple: 1.2
  });
  slide.addText('단계적 접근이 과소 투자와\n과대 투자 리스크를 모두 관리합니다', {
    x: 6.0, y: 3.6, w: 6.73, h: 1.0,
    fontSize: 16, fontFace: 'Pretendard', color: COLORS.text_secondary, lineSpacingMultiple: 1.4
  });
  addPageNumber(slide, 15);
}

function slide16_roadmap() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '통합은 "데이터 → 의미 → 지능" 순서를 따른다');

  slide.addShape('rect', { x: 0.6, y: 1.85, w: 0.06, h: 5.0, fill: { color: COLORS.accent_blue } });

  const phases = [
    { step: '지금 ~ 3개월', title: 'Phase 0: 기반 정비', desc: 'IT/OT 통합 조직 구성 · 데이터 품질 진단 · OPC UA 게이트웨이 배포', color: COLORS.accent_blue },
    { step: '3 ~ 12개월', title: 'Phase 1: 연결과 예측', desc: '2세대 DT 고도화(예지보전) · 기본 ML 적용 · AAS 서브모델 파일럿', color: COLORS.accent_cyan },
    { step: '6 ~ 18개월', title: 'Phase 2: 의미 부여', desc: '온톨로지/KG 파일럿 · AI 코파일럿 PoC · UNS 아키텍처 구축', color: COLORS.accent_yellow },
    { step: '12 ~ 24개월', title: 'Phase 3: 지능 확장', desc: '3세대 DT 전환 · KG 확장 · AI 에이전트 제한적 실행 권한 부여', color: COLORS.accent_purple },
    { step: '24 ~ 36개월', title: 'Phase 4: 인지 통합 (선도 기업)', desc: '4세대 인지 DT PoC · AI 자율 의사결정(Human-in-the-loop 필수)', color: COLORS.accent_red },
  ];

  const itemH = 5.0 / phases.length;
  phases.forEach((p, i) => {
    const itemY = 1.85 + i * itemH;
    slide.addShape('ellipse', {
      x: 0.515, y: itemY + 0.12, w: 0.23, h: 0.23, fill: { color: p.color }
    });
    slide.addText(p.step, {
      x: 1.0, y: itemY, w: 2.2, h: 0.3,
      fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: true, color: p.color
    });
    slide.addText(p.title, {
      x: 1.0, y: itemY + 0.3, w: 11.73, h: 0.3,
      fontSize: 15, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.text_primary
    });
    slide.addText(p.desc, {
      x: 1.0, y: itemY + 0.6, w: 11.73, h: itemH - 0.7,
      fontSize: 12, fontFace: FONTS.body.fontFace, color: COLORS.text_secondary, valign: 'top'
    });
    if (i < phases.length - 1) {
      slide.addShape('line', {
        x: 1.0, y: itemY + itemH - 0.05, w: 11.73, h: 0,
        line: { color: 'E2E8F0', width: 0.5 }
      });
    }
  });
  addPageNumber(slide, 16);
}

function slide17_strategyOptions() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '7가지 옵션 중 지금 베팅할 것은 2가지뿐이다');

  const headers = ['전략 옵션', '권고', '비용', '핵심 근거'];
  const rows = [
    [
      { text: '데이터 거버넌스 + IT/OT 통합', options: { bold: true } },
      { text: '지금 베팅', options: { bold: true, color: '27AE60' } },
      '중',
      '모든 시나리오에서 유효. 이것 없이는 어떤 투자도 무효'
    ],
    [
      { text: '2세대 DT 고도화 (예지보전)', options: { bold: true } },
      { text: '지금 베팅', options: { bold: true, color: '27AE60' } },
      '중',
      '검증된 ROI (비용 25~40% 절감). 파일럿→스케일업 전환 집중'
    ],
    [
      'AI 코파일럿',
      { text: '제한적 실험', options: { color: COLORS.accent_blue } },
      '낮~중',
      '기술 준비 완료이나 벤더 종속·환각 리스크 미검증'
    ],
    [
      'AAS/OPC UA 표준 인프라',
      { text: '제한적 실험', options: { color: COLORS.accent_blue } },
      '중~높',
      'EU 규제 방향 명확, 시행 속도는 불확실'
    ],
    [
      '온톨로지/KG 파일럿',
      { text: '제한적 실험', options: { color: COLORS.accent_blue } },
      '높',
      '장기 전략 가치 높으나 단기 ROI 불투명'
    ],
    [
      '인지 DT (4세대) PoC',
      { text: '관망', options: { color: COLORS.text_tertiary } },
      '높',
      'LLM 환각·규제 미해소. 2027~28 재평가'
    ],
    [
      { text: '검증 없는 빅뱅 도입', options: { bold: true } },
      { text: '회피', options: { bold: true, color: COLORS.accent_red } },
      '—',
      '64% 파일럿 함정. 단계적 검증 없으면 실패 확률 극도로 높음'
    ],
  ];

  addStyledTable(slide, headers, rows, { y: 1.85, rowH: [0.42, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55] });
  addPageNumber(slide, 17);
}

function slide18_signals() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '이 5가지 신호가 전략 방향을 바꾼다');

  const signals = [
    { title: 'LLM 환각률 급락', body: '산업 벤치마크에서 0.1% 이하 달성 시\n→ 인지 DT 투자를 "관망"에서 "실험"으로 전환', color: COLORS.accent_blue },
    { title: 'EU 디지털 제품 여권 확대', body: '배터리(2026) → 전자기기(2027) 확산 시\n→ AAS/OPC UA 표준 인프라 투자 즉시 확대', color: COLORS.accent_cyan },
    { title: 'DT 파일럿 성공률 개선', body: '64% 함정이 50% 이하로 개선 시\n→ 2세대 DT 스케일업 투자 확대 근거', color: COLORS.accent_yellow },
    { title: '대형 AI 제조 사고 발생', body: '환각/오판에 의한 안전 사고 보도 시\n→ AI 자율 제어 전략 전면 재검토', color: COLORS.accent_red },
    { title: '플랫폼 독점 신호', body: 'Siemens/Palantir 중 하나가 60%+ 장악 시\n→ 플랫폼 종속 vs 대안 확보 의사결정 필요', color: COLORS.accent_purple },
  ];

  signals.forEach((s, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const w = i < 3 ? 3.843 : 5.915;
    const xBase = i < 3 ? (0.6 + col * (3.843 + 0.3)) : (0.6 + (i - 3) * (5.915 + 0.3));
    const yBase = row === 0 ? 1.9 : 4.55;
    addCard(slide, { x: xBase, y: yBase, w, h: 2.35, title: s.title, body: s.body, accentColor: s.color });
  });
  addPageNumber(slide, 18);
}

function slide19_risks() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '가장 틀리기 쉬운 전제와 그때 잃는 것');

  addStyledTable(slide,
    ['틀릴 수 있는 전제', '왜 틀릴 수 있는가', '틀릴 경우 영향'],
    [
      ['AI 환각이 2~3년 내 미해결',  'OpenAI/Anthropic 발전 속도 초과 가능\nPINN이 환각을 구조적으로 억제 가능', '인지 DT 관망이\n큰 기회비용 발생'],
      ['데이터 품질이 핵심 병목',      'GenAI 합성 데이터 + 자동 정제가\n데이터 문제를 우회할 수 있음', '거버넌스 우선\n전략 ROI 하락'],
      ['표준화가 느릴 것',             'EU DPP + 중국 참여로\n수렴이 예상보다 빠를 수 있음', '벤더 종속 대비\n불필요해짐'],
      ['DT 시장 고성장 지속',          '하이프 정점 이후 시장 재편\n경기 침체 시 투자 위축', '전체 투자 계획\n축소 필요'],
    ],
    { y: 1.85, rowH: [0.42, 0.95, 0.95, 0.95, 0.95] }
  );

  // Bottom box
  slide.addShape('roundRect', { x: 0.6, y: 5.6, w: 12.13, h: 1.2, rectRadius: 0.08, fill: { color: 'EEF2FF' } });
  slide.addText('비대칭 리스크 판단', {
    x: 0.9, y: 5.7, w: 11.53, h: 0.35,
    fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.accent_blue
  });
  slide.addText('과소 투자 시 최악: 경쟁사가 30~50% 비용 우위 확보 → 시장 점유율 회복 불가\n과대 투자 시 최악: 수백억 원 매몰 비용 → 경영진 디지털 불신 → 5년간 전환 동력 상실\n→ 점진적·단계적 "옵션 가치" 접근이 양쪽 리스크를 모두 관리하는 최선의 전략', {
    x: 0.9, y: 6.05, w: 11.53, h: 0.7,
    fontSize: 11, fontFace: FONTS.body.fontFace, color: COLORS.text_secondary, lineSpacingMultiple: 1.45
  });
  addPageNumber(slide, 19);
}

function slide20_closing() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '기반을 먼저, 실험은 신중하게, 종속은 피하라');

  const points = [
    '데이터 거버넌스와 IT/OT 통합부터 시작하십시오. 이것이 모든 시나리오에서 유일한 "후회 없는 투자"입니다.',
    '2세대 디지털트윈(예지보전)은 지금 스케일업 가능한 검증된 영역입니다. 파일럿을 넘기는 방법론에 집중하십시오.',
    '플랫폼 종속은 피하되, 핵심 트리거를 모니터링하며 시나리오별 대응을 준비하십시오.',
  ];

  points.forEach((point, i) => {
    const y = 2.0 + i * 1.1;
    slide.addShape('ellipse', { x: 0.8, y: y + 0.1, w: 0.5, h: 0.5, fill: { color: COLORS.accent_blue } });
    slide.addText(`${i + 1}`, {
      x: 0.8, y: y + 0.1, w: 0.5, h: 0.5,
      fontSize: 18, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });
    slide.addText(point, {
      x: 1.55, y: y, w: 11.18, h: 0.7,
      fontSize: 16, fontFace: FONTS.body.fontFace, color: COLORS.text_primary, valign: 'middle', lineSpacingMultiple: 1.3
    });
  });

  // Divider
  slide.addShape('line', { x: 0.6, y: 5.5, w: 12.13, h: 0, line: { color: 'E2E8F0', width: 0.5 } });

  // Next steps
  slide.addText('Next Steps', {
    x: 0.6, y: 5.7, w: 12.13, h: 0.4,
    fontSize: 16, fontFace: FONTS.subtitle.fontFace, bold: true, color: COLORS.accent_blue
  });
  slide.addText([
    { text: '1주 내', options: { bold: true } }, { text: '  데이터 품질 현황 진단 착수  |  ' },
    { text: '1개월 내', options: { bold: true } }, { text: '  IT/OT 통합 TF 구성  |  ' },
    { text: '3개월 내', options: { bold: true } }, { text: '  플랫폼 벤더 3곳 비교 평가 완료' },
  ], {
    x: 0.6, y: 6.15, w: 12.13, h: 0.5,
    fontSize: 14, fontFace: FONTS.body.fontFace, color: COLORS.text_secondary, valign: 'middle'
  });
  addPageNumber(slide, 20);
}

// ===================================================================
// 실행
// ===================================================================
slide01_title();
slide02_execSummary();
slide03_section1();
slide04_marketKPI();
slide05_threeTech();
slide06_cases();
slide07_section2();
slide08_realityKPI();
slide09_bottlenecks();
slide10_maturityGap();
slide11_section3();
slide12_scenarioMatrix();
slide13_platformWar();
slide14_ontologyInsight();
slide15_section4();
slide16_roadmap();
slide17_strategyOptions();
slide18_signals();
slide19_risks();
slide20_closing();

const outputPath = path.join(__dirname, 'manufacturing-dt-ontology-ai-strategy.pptx');
pptx.writeFile({ fileName: outputPath })
  .then(() => console.log(`저장 완료: ${outputPath}`))
  .catch(err => console.error('저장 실패:', err));
