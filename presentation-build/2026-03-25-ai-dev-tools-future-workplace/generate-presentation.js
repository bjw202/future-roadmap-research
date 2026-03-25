'use strict';
const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
const TOTAL_SLIDES = 28;

// ===== 색상 상수 =====
const COLORS = {
  bg_primary:    'FFFFFF',
  bg_secondary:  'F5F7FA',
  bg_dark:       '1A1F36',
  text_primary:  '1A1F36',
  text_secondary:'4A5568',
  text_tertiary: '718096',
  text_on_dark:  'FFFFFF',
  accent_blue:   '4A7BF7',
  accent_cyan:   '00D4AA',
  accent_yellow: 'FFB020',
  accent_red:    'FF6B6B',
  accent_purple: '8B5CF6',
  // Aliases for Part B/C compatibility
  primary:    '1A1F36',
  accent:     '4A7BF7',
  text:       '4A5568',
  bg:         'FFFFFF',
  text_muted: '718096',
  border:     'E2E8F0',
  textBody:   '4A5568',
  textSub:    '718096'
};

// ===== 테이블 스타일 =====
const TABLE_STYLE = {
  header: {
    bold: true,
    fill: { color: COLORS.bg_dark },
    color: COLORS.text_on_dark,
    fontFace: 'Pretendard',
    fontSize: 11,
    align: 'center',
    valign: 'middle'
  },
  cell: {
    fontFace: 'Pretendard',
    fontSize: 11,
    color: COLORS.text_secondary,
    valign: 'middle'
  },
  cellRight: {
    fontFace: 'Pretendard',
    fontSize: 11,
    color: COLORS.text_secondary,
    align: 'right',
    valign: 'middle'
  },
  cellAlt: {
    fontFace: 'Pretendard',
    fontSize: 11,
    color: COLORS.text_secondary,
    fill: { color: COLORS.bg_secondary },
    valign: 'middle'
  },
  cellTotal: {
    bold: true,
    fontFace: 'Pretendard',
    fontSize: 11,
    color: COLORS.text_primary,
    border: [{ type: 'solid', pt: 1.5, color: COLORS.text_primary }, null, null, null],
    valign: 'middle'
  }
};

const TABLE_OPTIONS = {
  x: 0.6,
  y: 1.8,
  w: 12.13,
  border: { type: 'solid', pt: 0.5, color: 'E2E8F0' },
  autoPage: false,
  margin: [5, 8, 5, 8]
};

// ===== 차트 스타일 =====
const CHART_STYLE = {
  base: {
    showTitle: true,
    titleFontFace: 'Pretendard',
    titleFontSize: 14,
    titleColor: COLORS.text_primary,
    showLegend: true,
    legendFontFace: 'Pretendard',
    legendFontSize: 9,
    legendColor: COLORS.text_secondary,
    catAxisLabelFontFace: 'Pretendard',
    catAxisLabelFontSize: 10,
    catAxisLabelColor: COLORS.text_tertiary,
    valAxisLabelFontFace: 'Pretendard',
    valAxisLabelFontSize: 10,
    valAxisLabelColor: COLORS.text_tertiary,
  },
  colors: ['4A7BF7', '00D4AA', 'FFB020', 'FF6B6B', '8B5CF6', '38BDF8']
};

// ===== 폰트 상수 =====
const FONTS = {
  title:    { fontFace: 'Pretendard ExtraBold', bold: true },
  subtitle: { fontFace: 'Pretendard SemiBold',  bold: true },
  body:     { fontFace: 'Pretendard',            bold: false },
  caption:  { fontFace: 'Pretendard Light',      bold: false },
  serif:    { fontFace: 'ChosunNm',              bold: false },
  kpi:      { fontFace: 'Pretendard Black',      bold: true },
  deco:     { fontFace: 'Pretendard Thin',       bold: false },
  quote:    'ChosunNm',  // Alias for Part B compatibility
};

// ===== 레이아웃 상수 =====
const CARD_2X2 = {
  w: 5.915, h: 2.45,
  positions: [
    { x: 0.6,   y: 1.8 }, { x: 6.815, y: 1.8 },
    { x: 0.6,   y: 4.55 }, { x: 6.815, y: 4.55 }
  ]
};
const CARD_2X3 = {
  w: 3.843, h: 2.45,
  positions: [
    { x: 0.6,   y: 1.8 }, { x: 4.743, y: 1.8 }, { x: 8.886, y: 1.8 },
    { x: 0.6,   y: 4.55 }, { x: 4.743, y: 4.55 }, { x: 8.886, y: 4.55 }
  ]
};
const COL_W       = 5.865;
const COL_LEFT_X  = 0.6;
const COL_RIGHT_X = 6.865;

// ===== 헬퍼 함수 =====

function addTitleBar(slide, title, subtitle) {
  // accent 라인
  slide.addShape('rect', {
    x: 0.6, y: 0.5, w: 1.2, h: 0.06,
    fill: { color: COLORS.accent_blue }
  });
  // 제목
  slide.addText(title, {
    x: 0.6, y: 0.65, w: 12.13, h: 0.9,
    fontSize: 28, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_primary, charSpacing: -0.3,
    autoFit: true
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6, y: 1.6, w: 12.13, h: 0.4,
      fontSize: 16, fontFace: 'Pretendard',
      color: COLORS.text_tertiary
    });
  }
}

function addStyledTable(slide, headers, dataRows, opts) {
  opts = opts || {};
  const rows = [];
  rows.push(headers.map(function(h) { return { text: h, options: Object.assign({}, TABLE_STYLE.header) }; }));
  dataRows.forEach(function(row, i) {
    const isAlt = i % 2 === 1;
    const baseStyle = isAlt ? TABLE_STYLE.cellAlt : TABLE_STYLE.cell;
    rows.push(row.map(function(cell) {
      if (typeof cell === 'string') return { text: cell, options: Object.assign({}, baseStyle) };
      return { text: cell.text, options: Object.assign({}, baseStyle, cell.options) };
    }));
  });
  slide.addTable(rows, Object.assign({}, TABLE_OPTIONS, opts));
}

function addTitledTable(slide, tableTitle, headers, dataRows, opts) {
  opts = opts || {};
  const colCount = headers.length;
  const rows = [];
  rows.push([{
    text: tableTitle,
    options: {
      colspan: colCount, bold: true,
      fill: { color: COLORS.bg_dark }, color: COLORS.text_on_dark,
      fontFace: 'Pretendard', fontSize: 13, align: 'center', valign: 'middle'
    }
  }]);
  rows.push(headers.map(function(h) {
    return {
      text: h,
      options: {
        bold: true, fill: { color: COLORS.bg_secondary }, color: COLORS.text_primary,
        fontFace: 'Pretendard', fontSize: 11, align: 'center', valign: 'middle'
      }
    };
  }));
  dataRows.forEach(function(row, i) {
    const isAlt = i % 2 === 1;
    rows.push(row.map(function(cell) {
      const base = isAlt ? Object.assign({}, TABLE_STYLE.cellAlt) : Object.assign({}, TABLE_STYLE.cell);
      if (typeof cell === 'string') return { text: cell, options: base };
      return { text: cell.text, options: Object.assign({}, base, cell.options) };
    }));
  });
  slide.addTable(rows, Object.assign({}, TABLE_OPTIONS, opts));
}

function addStyledChart(slide, type, chartData, opts) {
  opts = opts || {};
  const typeMap = {
    BAR:      pptx.charts.BAR,
    LINE:     pptx.charts.LINE,
    PIE:      pptx.charts.PIE,
    DOUGHNUT: pptx.charts.DOUGHNUT,
    AREA:     pptx.charts.AREA,
    RADAR:    pptx.charts.RADAR,
    SCATTER:  pptx.charts.SCATTER,
    BUBBLE:   pptx.charts.BUBBLE
  };
  const defaults = Object.assign(
    { x: 0.6, y: 1.8, w: 12.13, h: 5.0 },
    CHART_STYLE.base,
    { chartColors: CHART_STYLE.colors.slice(0, chartData.length || 6) },
    opts
  );
  if (type === 'BAR') {
    defaults.barGapWidthPct     = defaults.barGapWidthPct     || 80;
    defaults.catAxisOrientation = defaults.catAxisOrientation || 'minMax';
    defaults.valAxisOrientation = defaults.valAxisOrientation || 'minMax';
  }
  if (type === 'LINE') {
    defaults.lineDataSymbol     = defaults.lineDataSymbol     !== undefined ? defaults.lineDataSymbol : 'circle';
    defaults.lineDataSymbolSize = defaults.lineDataSymbolSize || 8;
    defaults.lineSmooth         = defaults.lineSmooth         !== undefined ? defaults.lineSmooth : false;
  }
  if (type === 'PIE' || type === 'DOUGHNUT') {
    defaults.showPercent = true;
    defaults.showLegend  = true;
    defaults.legendPos   = 'b';
    defaults.chartColors = CHART_STYLE.colors.slice(0, (chartData[0] && chartData[0].values && chartData[0].values.length) || 6);
  }
  slide.addChart(typeMap[type], chartData, defaults);
}

// addCard — shadow 대신 line border 사용 (OOXML 호환)
function addCard(slide, cfg) {
  const x = cfg.x, y = cfg.y, w = cfg.w, h = cfg.h;
  const title = cfg.title, body = cfg.body;
  const accentColor = cfg.accentColor || COLORS.accent_blue;

  slide.addShape('roundRect', {
    x: x, y: y, w: w, h: h, rectRadius: 0.1,
    fill: { color: 'FFFFFF' },
    line: { color: 'E2E8F0', width: 1 }
  });
  slide.addShape('rect', {
    x: x + 0.02, y: y, w: w - 0.04, h: 0.06,
    fill: { color: accentColor }
  });
  slide.addText(title, {
    x: x + 0.2, y: y + 0.2, w: w - 0.4, h: 0.35,
    fontSize: 16, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_primary, autoFit: true
  });
  slide.addText(body, {
    x: x + 0.2, y: y + 0.55, w: w - 0.4, h: h - 0.75,
    fontSize: 13, fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    lineSpacingMultiple: 1.4, valign: 'top', autoFit: true
  });
}

function addPageNumber(slide, num, total) {
  slide.addText(num + ' / ' + total, {
    x: 12.0, y: 7.05, w: 1.0, h: 0.3,
    fontSize: 9, fontFace: 'Pretendard',
    color: COLORS.text_tertiary, align: 'right'
  });
}

// ============================================================
// 슬라이드 함수 정의
// ============================================================

// [01] Title Slide
function slide01_title() {
  const slide = pptx.addSlide();

  // 전체 다크 배경
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 좌측 세로 accent bar
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.18, h: 7.5,
    fill: { color: COLORS.accent_blue }
  });

  // 상단 장식 라인
  slide.addShape('rect', {
    x: 0.6, y: 1.5, w: 4.0, h: 0.05,
    fill: { color: COLORS.accent_cyan }
  });

  // 메인 타이틀
  slide.addText('AI 개발 도구 시대', {
    x: 0.6, y: 1.7, w: 12.13, h: 1.1,
    fontSize: 44, fontFace: FONTS.title.fontFace, bold: FONTS.title.bold,
    color: COLORS.text_on_dark, charSpacing: -0.5, autoFit: true
  });

  slide.addText('기술 도약, 산업 파급, 미래 일터 준비 전략', {
    x: 0.6, y: 2.85, w: 12.13, h: 0.75,
    fontSize: 26, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_cyan, charSpacing: -0.2, autoFit: true
  });

  // 구분선
  slide.addShape('rect', {
    x: 0.6, y: 3.75, w: 12.13, h: 0.03,
    fill: { color: '3A4060' }
  });

  // 부제 (날짜/리서치 정보)
  slide.addText('2026년 3월 전략 리서치 보고', {
    x: 0.6, y: 3.9, w: 7.0, h: 0.45,
    fontSize: 17, fontFace: 'Pretendard',
    color: COLORS.text_tertiary
  });

  // 우측 하단 KPI 뱃지 3개
  const badges = [
    { label: '개발자 AI 채택률', value: '85~95%' },
    { label: 'AI 지원 코드 비율', value: '41~46%' },
    { label: '시장 규모 (2026E)', value: '$128억' }
  ];
  badges.forEach(function(b, i) {
    const bx = 0.6 + i * 4.1;
    const by = 5.0;
    slide.addShape('roundRect', {
      x: bx, y: by, w: 3.8, h: 1.3, rectRadius: 0.1,
      fill: { color: '252B45' },
      line: { color: '3A4060', width: 1 }
    });
    slide.addShape('rect', {
      x: bx + 0.02, y: by, w: 3.76, h: 0.05,
      fill: { color: CHART_STYLE.colors[i] }
    });
    slide.addText(b.value, {
      x: bx + 0.15, y: by + 0.12, w: 3.5, h: 0.55,
      fontSize: 26, fontFace: FONTS.kpi.fontFace, bold: FONTS.kpi.bold,
      color: COLORS.text_on_dark, autoFit: true
    });
    slide.addText(b.label, {
      x: bx + 0.15, y: by + 0.7, w: 3.5, h: 0.45,
      fontSize: 11, fontFace: 'Pretendard',
      color: COLORS.text_tertiary
    });
  });
  // 표지는 페이지 번호 없음
}

// [02] Section Divider — "AI 개발 도구는 어디까지 왔는가"
function slide02_section_part1() {
  const slide = pptx.addSlide();

  // 배경: 다크
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 좌측 accent bar
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.18, h: 7.5,
    fill: { color: COLORS.accent_blue }
  });

  // PART 레이블
  slide.addText('PART 1', {
    x: 0.6, y: 2.4, w: 4.0, h: 0.45,
    fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_blue, charSpacing: 2.0
  });

  // 구분 라인
  slide.addShape('rect', {
    x: 0.6, y: 2.95, w: 3.5, h: 0.04,
    fill: { color: COLORS.accent_blue }
  });

  // 섹션 제목
  slide.addText('AI 개발 도구는\n어디까지 왔는가', {
    x: 0.6, y: 3.1, w: 10.0, h: 2.2,
    fontSize: 40, fontFace: FONTS.title.fontFace, bold: FONTS.title.bold,
    color: COLORS.text_on_dark, charSpacing: -0.5,
    lineSpacingMultiple: 1.2, autoFit: true
  });

  // 우측 하단 장식 숫자
  slide.addText('01', {
    x: 10.5, y: 5.5, w: 2.5, h: 1.5,
    fontSize: 90, fontFace: FONTS.deco.fontFace, bold: false,
    color: '252B45', align: 'right'
  });
  // 섹션 디바이더: 페이지 번호 없음
}

// [03] Timeline — 4년 만에 멀티에이전트로 진화
function slide03_timeline() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '4년 만에 자동완성에서 멀티에이전트 병렬 실행으로 진화했다');

  // 타임라인 베이스 라인
  slide.addShape('rect', {
    x: 0.6, y: 4.05, w: 12.13, h: 0.05,
    fill: { color: 'D1D5DB' }
  });

  const stages = [
    {
      year: '2021',
      phase: '자동완성',
      desc: 'GitHub Copilot 출시\n단일 라인/함수 단위 제안\n평균 수락률 ~25~30%',
      color: COLORS.accent_blue,
      x: 0.6
    },
    {
      year: '2023',
      phase: '대화형 코딩',
      desc: '채팅 기반 코딩 지원\nAI-native IDE 등장\n컨텍스트 확장 8K→100K+',
      color: COLORS.accent_cyan,
      x: 3.73
    },
    {
      year: '2025',
      phase: '에이전틱 코딩',
      desc: '멀티파일 자율 편집\nSWE-bench 70%→80%+\nClaude 7시간 자율 작업',
      color: COLORS.accent_yellow,
      x: 6.86
    },
    {
      year: '2026',
      phase: '멀티에이전트',
      desc: '병렬 에이전트 실행\nCursor 10~20개 동시\n코드베이스 전체 조율',
      color: COLORS.accent_purple,
      x: 9.99
    }
  ];

  stages.forEach(function(s) {
    // 카드 배경
    slide.addShape('roundRect', {
      x: s.x, y: 1.85, w: 2.9, h: 1.95, rectRadius: 0.1,
      fill: { color: COLORS.bg_secondary },
      line: { color: 'E2E8F0', width: 1 }
    });
    // accent top bar
    slide.addShape('rect', {
      x: s.x + 0.02, y: 1.85, w: 2.86, h: 0.06,
      fill: { color: s.color }
    });
    // 연도
    slide.addText(s.year, {
      x: s.x + 0.12, y: 1.95, w: 2.66, h: 0.38,
      fontSize: 20, fontFace: FONTS.kpi.fontFace, bold: FONTS.kpi.bold,
      color: s.color
    });
    // 단계명
    slide.addText(s.phase, {
      x: s.x + 0.12, y: 2.35, w: 2.66, h: 0.35,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary
    });
    // 설명
    slide.addText(s.desc, {
      x: s.x + 0.12, y: 2.72, w: 2.66, h: 1.0,
      fontSize: 10, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.4, valign: 'top', autoFit: true
    });
    // 타임라인 도트
    slide.addShape('roundRect', {
      x: s.x + 1.27, y: 3.97, w: 0.16, h: 0.16, rectRadius: 0.08,
      fill: { color: s.color }
    });
    // 연결 라인 (도트 → 하단 카드)
    slide.addShape('rect', {
      x: s.x + 1.34, y: 4.02, w: 0.02, h: 0.3,
      fill: { color: s.color }
    });
    // 하단 라벨 카드
    slide.addShape('roundRect', {
      x: s.x, y: 4.35, w: 2.9, h: 2.25, rectRadius: 0.1,
      fill: { color: COLORS.bg_secondary },
      line: { color: 'E2E8F0', width: 1 }
    });
  });

  // SWE-bench 강조 레이블
  slide.addShape('roundRect', {
    x: 6.86, y: 4.5, w: 2.9, h: 0.55, rectRadius: 0.08,
    fill: { color: COLORS.accent_yellow },
    line: { color: COLORS.accent_yellow, width: 1 }
  });
  slide.addText('SWE-bench 70% 달성', {
    x: 6.86, y: 4.5, w: 2.9, h: 0.55,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.bg_dark, align: 'center', valign: 'middle'
  });
  slide.addShape('roundRect', {
    x: 9.99, y: 4.5, w: 2.9, h: 0.55, rectRadius: 0.08,
    fill: { color: COLORS.accent_purple },
    line: { color: COLORS.accent_purple, width: 1 }
  });
  slide.addText('SWE-bench 80%+ 돌파', {
    x: 9.99, y: 4.5, w: 2.9, h: 0.55,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_on_dark, align: 'center', valign: 'middle'
  });

  // 하단 설명 텍스트
  slide.addText('Claude Opus 4.5 기준 SWE-bench 80.9% (2025.11) | 출처: Pragmatic Engineer 2026-03, neurycode.com 2026-01', {
    x: 0.6, y: 6.85, w: 12.13, h: 0.3,
    fontSize: 9, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary
  });

  addPageNumber(slide, 3, TOTAL_SLIDES);
}

// [04] Cards — 시장 3강 구도
function slide04_market3() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '시장 3강이 코딩 AI 시장의 70%를 장악하고 있다');

  const cards = [
    {
      title: 'GitHub Copilot',
      body: '누적 사용자 2,000만 명\nFortune 100의 90% 채택\nARR $20억 이상\n엔터프라이즈 배포 표준\n\n출처: TechCrunch 2025-07',
      accentColor: COLORS.accent_blue
    },
    {
      title: 'Cursor (Anysphere)',
      body: '2026년 초 ARR $20억 도달\nFortune 500의 절반 이상 사용\nSeries C 밸류에이션 $99억\n\n출처: Panto AI 2026, Cursor 공식',
      accentColor: COLORS.accent_cyan
    },
    {
      title: 'Claude Code (Anthropic)',
      body: '출시 6개월 내 ARR $10억\n사용률 75% (Copilot 35%, Cursor 42%)\n선호도 46% — 업계 1위\n\n출처: Pragmatic Engineer 2026-03 (N=900+)',
      accentColor: COLORS.accent_purple
    }
  ];

  // 3-카드 레이아웃 (1행 3열)
  const cw = 3.843;
  const positions = [
    { x: 0.6,   y: 1.85 },
    { x: 4.743, y: 1.85 },
    { x: 8.886, y: 1.85 }
  ];

  cards.forEach(function(c, i) {
    addCard(slide, {
      x: positions[i].x, y: positions[i].y,
      w: cw, h: 3.2,
      title: c.title, body: c.body,
      accentColor: c.accentColor
    });
  });

  // 시장 규모 강조 바
  slide.addShape('roundRect', {
    x: 0.6, y: 5.3, w: 12.13, h: 1.25, rectRadius: 0.1,
    fill: { color: COLORS.bg_secondary },
    line: { color: 'E2E8F0', width: 1 }
  });
  slide.addText('AI 코딩 도구 시장 규모', {
    x: 0.8, y: 5.42, w: 3.5, h: 0.38,
    fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_secondary
  });

  // 화살표 시각화: 2024 → 2026
  slide.addText('$51억', {
    x: 4.5, y: 5.42, w: 1.5, h: 0.5,
    fontSize: 22, fontFace: FONTS.kpi.fontFace, bold: FONTS.kpi.bold,
    color: COLORS.text_tertiary, align: 'center'
  });
  slide.addText('2024', {
    x: 4.5, y: 5.92, w: 1.5, h: 0.3,
    fontSize: 10, fontFace: 'Pretendard',
    color: COLORS.text_tertiary, align: 'center'
  });
  // 화살표 라인
  slide.addShape('rect', {
    x: 6.1, y: 5.67, w: 1.2, h: 0.05,
    fill: { color: COLORS.accent_blue }
  });
  slide.addText('→', {
    x: 6.5, y: 5.5, w: 0.4, h: 0.4,
    fontSize: 18, fontFace: 'Pretendard',
    color: COLORS.accent_blue, align: 'center'
  });
  slide.addText('2.5배', {
    x: 6.1, y: 5.78, w: 1.2, h: 0.3,
    fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_blue, align: 'center'
  });
  slide.addText('$128억', {
    x: 7.4, y: 5.42, w: 1.8, h: 0.5,
    fontSize: 22, fontFace: FONTS.kpi.fontFace, bold: FONTS.kpi.bold,
    color: COLORS.accent_blue, align: 'center'
  });
  slide.addText('2026 (추정)', {
    x: 7.4, y: 5.92, w: 1.8, h: 0.3,
    fontSize: 10, fontFace: 'Pretendard',
    color: COLORS.text_tertiary, align: 'center'
  });
  slide.addText('출처: Tech Insider 2026-03-15', {
    x: 9.5, y: 5.6, w: 3.0, h: 0.6,
    fontSize: 10, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary, valign: 'middle'
  });

  addPageNumber(slide, 4, TOTAL_SLIDES);
}

// [05] KPI — 채택률 및 시민 개발자
function slide05_kpi_adoption() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '개발자 85~95%가 AI 도구를 사용하고, 코드의 41~46%가 AI 지원이다');

  // KPI 3개 (상단)
  const kpis = [
    {
      value: '85~95%',
      label: 'AI 도구 채택률',
      sub: '개발자 주간 단위 이상 사용\nDORA 2025 · JetBrains 2025\nStack Overflow 2025',
      color: COLORS.accent_blue
    },
    {
      value: '41~46%',
      label: '신규 코드 중 AI 지원 비율',
      sub: '신규 상업 코드 기준\nGitHub 공식 통계 2026\n전체 SDLC 기준 아님',
      color: COLORS.accent_cyan
    },
    {
      value: '$8.63억',
      label: '시민 개발자 플랫폼 시장',
      sub: '2025년 기준\n개발 임원 89%가 전략 시행·계획 중\nLovable, V0, Replit 포함',
      color: COLORS.accent_yellow
    }
  ];

  const kw = 3.843;
  const kx = [0.6, 4.743, 8.886];

  kpis.forEach(function(k, i) {
    // KPI 카드 배경
    slide.addShape('roundRect', {
      x: kx[i], y: 1.85, w: kw, h: 2.8, rectRadius: 0.1,
      fill: { color: COLORS.bg_secondary },
      line: { color: 'E2E8F0', width: 1 }
    });
    slide.addShape('rect', {
      x: kx[i] + 0.02, y: 1.85, w: kw - 0.04, h: 0.06,
      fill: { color: k.color }
    });
    // 큰 숫자
    slide.addText(k.value, {
      x: kx[i] + 0.15, y: 2.05, w: kw - 0.3, h: 0.85,
      fontSize: 36, fontFace: FONTS.kpi.fontFace, bold: FONTS.kpi.bold,
      color: k.color, align: 'center', autoFit: true
    });
    // 레이블
    slide.addText(k.label, {
      x: kx[i] + 0.15, y: 2.95, w: kw - 0.3, h: 0.42,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, align: 'center', autoFit: true
    });
    // 부가 설명
    slide.addText(k.sub, {
      x: kx[i] + 0.15, y: 3.42, w: kw - 0.3, h: 1.0,
      fontSize: 10, fontFace: FONTS.caption.fontFace,
      color: COLORS.text_tertiary, align: 'center',
      lineSpacingMultiple: 1.4, valign: 'top', autoFit: true
    });
  });

  // 하단 신뢰도 주의 박스
  slide.addShape('roundRect', {
    x: 0.6, y: 4.95, w: 12.13, h: 1.65, rectRadius: 0.1,
    fill: { color: 'FFF3CD' },
    line: { color: COLORS.accent_yellow, width: 1 }
  });
  slide.addText('수치 해석 주의', {
    x: 0.85, y: 5.08, w: 2.5, h: 0.38,
    fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: '7A5800'
  });
  slide.addText(
    '"사용"의 정의가 조사마다 상이 — 자동완성 한 번 수락도 "사용"으로 집계될 수 있음. ' +
    'AI 코드 비율은 신규 상업 코드 기준이며, 레거시 코드베이스 유지보수를 포함한 전체 SDLC 기준과 다름. ' +
    '출처: DORA 2025, JetBrains 2025, Stack Overflow 2025, GitHub 공식 통계 2026',
    {
      x: 0.85, y: 5.5, w: 11.7, h: 0.95,
      fontSize: 11, fontFace: FONTS.body.fontFace,
      color: '7A5800',
      lineSpacingMultiple: 1.4, valign: 'top', autoFit: true
    }
  );

  addPageNumber(slide, 5, TOTAL_SLIDES);
}

// [06] Content — 에이전트 생태계 인프라
function slide06_agent_ecosystem() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '에이전트 생태계 인프라가 새로운 승자 포지션이 되고 있다');

  // MCP 강조 배너
  slide.addShape('roundRect', {
    x: 0.6, y: 1.85, w: 12.13, h: 0.85, rectRadius: 0.08,
    fill: { color: COLORS.bg_dark },
    line: { color: COLORS.accent_blue, width: 1 }
  });
  slide.addText('MCP · A2A 프로토콜 표준화', {
    x: 0.85, y: 1.92, w: 5.0, h: 0.38,
    fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_blue
  });
  slide.addText('월 9,700만 SDK 다운로드 (Python + TypeScript 합산, 2026-02 기준) | OpenAI · Google · Microsoft · AWS 전원 채택', {
    x: 0.85, y: 2.33, w: 12.0, h: 0.28,
    fontSize: 10, fontFace: 'Pretendard',
    color: COLORS.text_tertiary
  });

  // 3계층 구조 카드
  const layers = [
    {
      num: '계층 1',
      title: '모델 제공자',
      items: 'Anthropic (Claude)\nOpenAI (GPT-5.x)\nGoogle (Gemini 3)\nxAI (Grok 4)',
      color: COLORS.accent_purple
    },
    {
      num: '계층 2',
      title: '에이전트 / IDE 제공자',
      items: 'Cursor · Windsurf (Cognition)\nGitHub Copilot (Microsoft)\nClaude Code · Kiro (AWS)',
      color: COLORS.accent_blue
    },
    {
      num: '계층 3',
      title: '수직 특화 도구',
      items: 'Lovable · V0 by Vercel · Replit\nTabnine · CodeWhisperer\n(프론트엔드, 보안 민감 기업)',
      color: COLORS.accent_cyan
    }
  ];

  const lw = 3.843;
  const lx = [0.6, 4.743, 8.886];

  layers.forEach(function(l, i) {
    slide.addShape('roundRect', {
      x: lx[i], y: 2.9, w: lw, h: 2.65, rectRadius: 0.1,
      fill: { color: COLORS.bg_secondary },
      line: { color: 'E2E8F0', width: 1 }
    });
    slide.addShape('rect', {
      x: lx[i] + 0.02, y: 2.9, w: lw - 0.04, h: 0.06,
      fill: { color: l.color }
    });
    slide.addText(l.num, {
      x: lx[i] + 0.15, y: 3.0, w: lw - 0.3, h: 0.3,
      fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: l.color
    });
    slide.addText(l.title, {
      x: lx[i] + 0.15, y: 3.32, w: lw - 0.3, h: 0.4,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, autoFit: true
    });
    slide.addText(l.items, {
      x: lx[i] + 0.15, y: 3.76, w: lw - 0.3, h: 1.65,
      fontSize: 11, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.5, valign: 'top', autoFit: true
    });
  });

  // 플랫폼 전쟁 인사이트 박스
  slide.addShape('roundRect', {
    x: 0.6, y: 5.75, w: 12.13, h: 0.95, rectRadius: 0.08,
    fill: { color: 'EEF2FF' },
    line: { color: COLORS.accent_purple, width: 1 }
  });
  slide.addText('전략적 시사점 — 플랫폼 전쟁', {
    x: 0.85, y: 5.85, w: 3.5, h: 0.35,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_purple
  });
  slide.addText(
    '승자 포지션이 "모델"에서 "에이전트 생태계 인프라(MCP 서버, 도구 레이어)"로 이동. ' +
    'OpenAI · Microsoft · Google이 IDE 계층을 수직 통합(Windsurf 인수 경쟁이 이를 증명). ' +
    'MCP 호환 도구 미보유 기업은 후발 탑승 비용 증가. 출처: The New Stack 2026-03, 90-signal-register.md 신호 1·2',
    {
      x: 0.85, y: 6.22, w: 11.7, h: 0.38,
      fontSize: 10, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.3, autoFit: true
    }
  );

  addPageNumber(slide, 6, TOTAL_SLIDES);
}

// [07] Section Divider — "낙관론 이면의 세 가지 역설"
function slide07_section_part2() {
  const slide = pptx.addSlide();

  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.18, h: 7.5,
    fill: { color: COLORS.accent_red }
  });

  slide.addText('PART 2', {
    x: 0.6, y: 2.4, w: 4.0, h: 0.45,
    fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_red, charSpacing: 2.0
  });
  slide.addShape('rect', {
    x: 0.6, y: 2.95, w: 3.5, h: 0.04,
    fill: { color: COLORS.accent_red }
  });
  slide.addText('낙관론 이면의\n세 가지 역설', {
    x: 0.6, y: 3.1, w: 10.5, h: 2.2,
    fontSize: 40, fontFace: FONTS.title.fontFace, bold: FONTS.title.bold,
    color: COLORS.text_on_dark, charSpacing: -0.5,
    lineSpacingMultiple: 1.2, autoFit: true
  });
  slide.addText('02', {
    x: 10.5, y: 5.5, w: 2.5, h: 1.5,
    fontSize: 90, fontFace: FONTS.deco.fontFace, bold: false,
    color: '252B45', align: 'right'
  });
  // 섹션 디바이더: 페이지 번호 없음
}

// [08] TwoColumn — AI 생산성 조건부
function slide08_productivity_paradox() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'AI 생산성은 조건부다: 단순 과제 +30~50%, 복잡 과제에서는 역효과');

  // 좌: 긍정 (초록 계열 배경)
  slide.addShape('roundRect', {
    x: COL_LEFT_X, y: 1.85, w: COL_W, h: 4.3, rectRadius: 0.1,
    fill: { color: 'F0FDF4' },
    line: { color: COLORS.accent_cyan, width: 1 }
  });
  slide.addShape('rect', {
    x: COL_LEFT_X + 0.02, y: 1.85, w: COL_W - 0.04, h: 0.06,
    fill: { color: COLORS.accent_cyan }
  });
  slide.addText('긍정적 데이터', {
    x: COL_LEFT_X + 0.2, y: 1.95, w: COL_W - 0.4, h: 0.38,
    fontSize: 15, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_cyan
  });

  const positives = [
    ['보일러플레이트 / 스캐폴딩', '+50~70%', '[높음]'],
    ['테스트 코드 생성',           '+40~60%', '[중간]'],
    ['단순 버그 수정',             '+30~50%', '[중간]'],
    ['문서화',                   '+50~70%', '[높음]'],
    ['PR 처리 시간 단축', '9.6일→2.4일 (75%)', '[중간]'],
  ];

  addStyledTable(slide, ['작업 유형', 'AI 효과', '확신도'], positives, {
    x: COL_LEFT_X, y: 2.4, w: COL_W,
    rowH: [0.38, 0.32, 0.32, 0.32, 0.32, 0.32]
  });

  slide.addText('출처: GitClear 2025, GitHub Copilot 복합 지표, Quantumrun 2026-01', {
    x: COL_LEFT_X + 0.1, y: 5.78, w: COL_W - 0.2, h: 0.3,
    fontSize: 9, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary
  });

  // 우: 반증 (빨간 계열)
  slide.addShape('roundRect', {
    x: COL_RIGHT_X, y: 1.85, w: COL_W, h: 4.3, rectRadius: 0.1,
    fill: { color: 'FFF5F5' },
    line: { color: COLORS.accent_red, width: 1 }
  });
  slide.addShape('rect', {
    x: COL_RIGHT_X + 0.02, y: 1.85, w: COL_W - 0.04, h: 0.06,
    fill: { color: COLORS.accent_red }
  });
  slide.addText('반증 데이터', {
    x: COL_RIGHT_X + 0.2, y: 1.95, w: COL_W - 0.4, h: 0.38,
    fontSize: 15, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_red
  });

  const negatives = [
    ['METR RCT (2025-07)',     '숙련 개발자 -19% 느려짐', '[중간]'],
    ['GitClear (2025)',         'Code churn 2배 증가', '[중간]'],
    ['Fastly 보고서',           '개발자 95%가 AI 코드 수정에 추가 시간 소비', '[중간]'],
    ['복잡한 아키텍처 설계',    '효과 불명확 (역효과 가능)', '[낮음]'],
    ['레거시 코드 이해/수정',   '효과 불명확', '[낮음]'],
  ];

  addStyledTable(slide, ['출처/유형', '결과', '확신도'], negatives, {
    x: COL_RIGHT_X, y: 2.4, w: COL_W,
    rowH: [0.38, 0.32, 0.38, 0.32, 0.32, 0.32]
  });

  slide.addText('출처: MIT Technology Review 2025-12, GitClear 2026-03, Apiiro LinkedIn 2025', {
    x: COL_RIGHT_X + 0.1, y: 5.78, w: COL_W - 0.2, h: 0.3,
    fontSize: 9, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary
  });

  // 하단 주석
  slide.addShape('roundRect', {
    x: 0.6, y: 6.22, w: 12.13, h: 0.55, rectRadius: 0.08,
    fill: { color: 'FFF3CD' },
    line: { color: COLORS.accent_yellow, width: 1 }
  });
  slide.addText(
    '주의: "55% 생산성 향상"(GitHub 2022, N=95)은 단일 과제 실험의 최대치이며 전체 SDLC에 일반화 불가. ' +
    '"-19%"(METR 2025)는 숙련 개발자·자기 리포지토리라는 특수 조건의 RCT. 둘 다 극단값.',
    {
      x: 0.8, y: 6.27, w: 11.7, h: 0.4,
      fontSize: 10, fontFace: FONTS.body.fontFace,
      color: '7A5800', autoFit: true
    }
  );

  addPageNumber(slide, 8, TOTAL_SLIDES);
}

// [09] KPI — 조직 수준 생산성 상한
function slide09_org_productivity() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '조직 수준에서는 프로세스 변화 없이 10~15%가 생산성 상한이다');

  // 상단 KPI 3개
  const kpis = [
    {
      value: '+21%',
      label: '개인 산출량 증가',
      sub: 'PR 생성 기준\n(개인 레벨)',
      color: COLORS.accent_cyan
    },
    {
      value: '+98%',
      label: 'PR 병합 수 증가',
      sub: 'AI 지원 개발자\nvs 미사용 개발자',
      color: COLORS.accent_blue
    },
    {
      value: '10~15%',
      label: '조직 전달 지표 향상 상한',
      sub: '프로세스 미변화 시\n(Bain 2025)',
      color: COLORS.accent_yellow
    }
  ];

  const kw = 3.843;
  const kx = [0.6, 4.743, 8.886];

  kpis.forEach(function(k, i) {
    slide.addShape('roundRect', {
      x: kx[i], y: 1.85, w: kw, h: 2.3, rectRadius: 0.1,
      fill: { color: COLORS.bg_secondary },
      line: { color: 'E2E8F0', width: 1 }
    });
    slide.addShape('rect', {
      x: kx[i] + 0.02, y: 1.85, w: kw - 0.04, h: 0.06,
      fill: { color: k.color }
    });
    slide.addText(k.value, {
      x: kx[i] + 0.15, y: 2.0, w: kw - 0.3, h: 0.75,
      fontSize: 38, fontFace: FONTS.kpi.fontFace, bold: FONTS.kpi.bold,
      color: k.color, align: 'center', autoFit: true
    });
    slide.addText(k.label, {
      x: kx[i] + 0.15, y: 2.8, w: kw - 0.3, h: 0.38,
      fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, align: 'center', autoFit: true
    });
    slide.addText(k.sub, {
      x: kx[i] + 0.15, y: 3.22, w: kw - 0.3, h: 0.65,
      fontSize: 10, fontFace: FONTS.caption.fontFace,
      color: COLORS.text_tertiary, align: 'center',
      lineSpacingMultiple: 1.4, valign: 'top', autoFit: true
    });
  });

  // 핵심 인사이트 박스
  slide.addShape('roundRect', {
    x: 0.6, y: 4.35, w: 12.13, h: 1.3, rectRadius: 0.1,
    fill: { color: COLORS.bg_dark },
    line: { color: COLORS.accent_yellow, width: 1 }
  });
  slide.addText('"AI 생산성 역설"', {
    x: 0.85, y: 4.47, w: 3.5, h: 0.38,
    fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_yellow
  });
  slide.addText(
    '코딩은 전체 SDLC의 25~35%에 불과. 개인 산출량이 올라도 리뷰·통합·배포 병목이 해소되지 않으면 ' +
    '조직 전달 지표는 정체된다. Faros AI가 10,000명 이상의 개발자 텔레메트리를 통해 확인한 가장 신뢰할 수 있는 조직 수준 수치.',
    {
      x: 0.85, y: 4.88, w: 11.7, h: 0.65,
      fontSize: 11, fontFace: FONTS.body.fontFace,
      color: COLORS.text_on_dark,
      lineSpacingMultiple: 1.4, autoFit: true
    }
  );

  // 하단 비교 테이블
  addStyledTable(slide, ['측정 수준', '지표', '결과', '출처'], [
    ['개인',   'PR 생성 수',      '+21%',   'Faros AI 2025'],
    ['개인',   'PR 병합 수',      '+98%',   'Faros AI 2025'],
    ['조직',   '출시 주기',       '정체',   'Faros AI 2025'],
    ['조직',   '전체 생산성 향상', '10~15%', 'Bain 2025'],
  ], {
    y: 5.85, rowH: [0.38, 0.3, 0.3, 0.3, 0.3]
  });

  addPageNumber(slide, 9, TOTAL_SLIDES);
}

// [10] Chart — AI 신뢰도 vs 사용률
function slide10_trust_paradox() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'AI 도구 신뢰도는 하락하는데, 사용률은 상승한다');

  // 차트: 신뢰도 vs 사용률 비교
  // 신뢰도 시계열: 43% → 29%
  // 사용률: 84% (최근 시점)
  addStyledChart(slide, 'BAR',
    [
      {
        name: '신뢰도 (%)',
        labels: ['이전 (2023~2024)', '현재 (2025~2026)'],
        values: [43, 29]
      },
      {
        name: '사용률 (%)',
        labels: ['이전 (2023~2024)', '현재 (2025~2026)'],
        values: [63, 84]
      }
    ],
    {
      x: 0.6, y: 1.85, w: 7.5, h: 4.5,
      showTitle: false,
      showLegend: true,
      legendPos: 'b',
      barGapWidthPct: 50,
      chartColors: [COLORS.accent_red, COLORS.accent_blue],
      valAxisMaxVal: 100,
      valAxisMinVal: 0,
      showValue: true,
      dataLabelFontFace: 'Pretendard',
      dataLabelFontSize: 11,
      dataLabelColor: COLORS.text_primary
    }
  );

  // 우측 인사이트 패널
  slide.addShape('roundRect', {
    x: 8.35, y: 1.85, w: 4.38, h: 4.5, rectRadius: 0.1,
    fill: { color: COLORS.bg_dark },
    line: { color: '3A4060', width: 1 }
  });
  slide.addShape('rect', {
    x: 8.37, y: 1.85, w: 4.34, h: 0.06,
    fill: { color: COLORS.accent_red }
  });
  slide.addText('핵심 인사이트', {
    x: 8.55, y: 1.97, w: 4.0, h: 0.38,
    fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_red
  });

  const insights = [
    { icon: '↓', label: '신뢰도 하락', val: '43% → 29%', color: COLORS.accent_red },
    { icon: '↑', label: '사용률 상승', val: '63% → 84%', color: COLORS.accent_cyan },
    { icon: '⚠', label: 'Lock-in 패턴', val: '대안 부재', color: COLORS.accent_yellow }
  ];

  insights.forEach(function(ins, i) {
    const iy = 2.5 + i * 1.05;
    slide.addShape('roundRect', {
      x: 8.55, y: iy, w: 3.95, h: 0.85, rectRadius: 0.08,
      fill: { color: '252B45' },
      line: { color: ins.color, width: 1 }
    });
    slide.addText(ins.val, {
      x: 8.7, y: iy + 0.06, w: 3.65, h: 0.38,
      fontSize: 20, fontFace: FONTS.kpi.fontFace, bold: FONTS.kpi.bold,
      color: ins.color, autoFit: true
    });
    slide.addText(ins.label, {
      x: 8.7, y: iy + 0.46, w: 3.65, h: 0.3,
      fontSize: 10, fontFace: 'Pretendard',
      color: COLORS.text_tertiary
    });
  });

  // 해석 텍스트
  slide.addText(
    '"신뢰해서 쓰는 것이 아니라\n대안이 없어서 쓴다"',
    {
      x: 8.55, y: 5.22, w: 3.95, h: 0.72,
      fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_on_dark, align: 'center',
      lineSpacingMultiple: 1.3, valign: 'middle'
    }
  );

  // 하단 출처 및 주석
  slide.addShape('roundRect', {
    x: 0.6, y: 6.5, w: 12.13, h: 0.65, rectRadius: 0.08,
    fill: { color: COLORS.bg_secondary },
    line: { color: 'E2E8F0', width: 1 }
  });
  slide.addText(
    '출처: 00-synthesis.md 섹션 4 "AI 도구 신뢰 역설" | 신뢰도: 개발자 설문 기준 (조사마다 정의 차이 있음) | ' +
    '사용률: Stack Overflow 2025, DORA 2025 기준. 신규 코드 작성 과제 만족도 높음, AI 코드 검토 부담 불만.',
    {
      x: 0.8, y: 6.56, w: 11.7, h: 0.5,
      fontSize: 9, fontFace: FONTS.caption.fontFace,
      color: COLORS.text_tertiary, autoFit: true
    }
  );

  addPageNumber(slide, 10, TOTAL_SLIDES);
}

// ============================================================
// 슬라이드 실행
// ============================================================

// ============================================================
// Part B: 슬라이드 11~19
// ============================================================


// ---------------------------------------------------------------------------
// Slide 11 — [Content] AI 코드 보안 부채가 조용히 누적되고 있다
// 출처: 90-signal-register.md 신호6, 00-synthesis.md 섹션4
// ---------------------------------------------------------------------------
function slide11_security_debt() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'AI 코드 보안 부채가 조용히 누적되고 있다');

  // ── 경고 배너 ──────────────────────────────────────────────────────────
  slide.addShape('rect', {
    x: 0.6, y: 1.85, w: 12.13, h: 0.45,
    fill: { color: COLORS.accent },
    line: { color: COLORS.accent, pt: 0 },
  });
  slide.addText('신호 강도: 강 | 잠재 폭발 시점: 12~24개월', {
    x: 0.6, y: 1.85, w: 12.13, h: 0.45,
    fontSize: 11, bold: true, color: COLORS.bg,
    align: 'center', valign: 'middle',
    fontFace: FONTS.body,
  });

  // ── 핵심 수치 3개 (상단 카드 행) ────────────────────────────────────
  const statCards = [
    { pct: '45%',  label: 'AI 생성 코드 샘플에서\nOWASP Top 10 취약점 발생', src: 'Veracode 2025' },
    { pct: '62%',  label: 'AI 생성 코드에\n설계 결함 또는 알려진\n보안 취약점 포함',   src: 'Veracode 2025' },
    { pct: '40%',  label: 'AI 코드 프로젝트가\n2027년까지 비용 초과·\n가치 불명확으로 취소 예측', src: 'Gartner 예측' },
  ];

  const cardW = 3.7;
  const cardH = 1.75;
  const cardY = 2.45;
  const cardXs = [0.6, 4.55, 8.5];

  statCards.forEach((c, i) => {
    slide.addShape('rect', {
      x: cardXs[i], y: cardY, w: cardW, h: cardH,
      fill: { color: COLORS.bg_secondary },
      line: { color: COLORS.border, pt: 1 },
    });
    slide.addText(c.pct, {
      x: cardXs[i], y: cardY + 0.12, w: cardW, h: 0.7,
      fontSize: 36, bold: true, color: COLORS.accent,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
    slide.addText(c.label, {
      x: cardXs[i] + 0.15, y: cardY + 0.82, w: cardW - 0.3, h: 0.65,
      fontSize: 11, color: COLORS.text,
      align: 'center', valign: 'top', fontFace: FONTS.body,
    });
    slide.addText(c.src, {
      x: cardXs[i], y: cardY + 1.52, w: cardW, h: 0.2,
      fontSize: 9, color: COLORS.text_muted, italic: true,
      align: 'center', fontFace: FONTS.body,
    });
  });

  // ── 핵심 메커니즘 설명 블록 ─────────────────────────────────────────
  const bullets = [
    { text: '대량 생성이 총 취약점 노출면 확대', indent: false },
    { text: '개별 코드 품질보다 볼륨 증가가 핵심 리스크 — 보안 파이프라인 없이 생산성만 추구하면 순손실', indent: true },
    { text: '프롬프트 붕괴(Prompt Decay): 장기 실행 에이전트에서 보안 에이전트가 500회 이상 검토 후 임계 문제 조용히 누락', indent: false },
    { text: 'IDEsaster: Cursor IDE·GitHub Copilot에서 CVE 등 실제 익스플로잇 취약점 사례 보고', indent: false },
    { text: '인간 작성 코드 대비 비교치 부재 — "45%" 수치는 방향 지표로만 해석 요망', indent: true },
  ];

  const bulletY = 4.38;
  const lineH = 0.34;
  bullets.forEach((b, i) => {
    const prefix = b.indent ? '    ↳ ' : '• ';
    slide.addText(prefix + b.text, {
      x: 0.6, y: bulletY + i * lineH, w: 12.13, h: lineH,
      fontSize: b.indent ? 11 : 12,
      color: b.indent ? COLORS.text_muted : COLORS.text,
      fontFace: FONTS.body,
    });
  });

  // ── 전환 트리거 ─────────────────────────────────────────────────────
  slide.addShape('rect', {
    x: 0.6, y: 6.12, w: 12.13, h: 0.52,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.border, pt: 1 },
  });
  slide.addText('전환 트리거: Fortune 500에서 AI 생성 코드 취약점 기반 대형 보안 침해 사고가 공개 발생 | 규제 당국 필수 보안 감사 의무화', {
    x: 0.65, y: 6.12, w: 12.03, h: 0.52,
    fontSize: 10.5, color: COLORS.text, fontFace: FONTS.body,
    align: 'left', valign: 'middle',
  });

  addPageNumber(slide, 11, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 12 — [Quote] AI는 기존 조직의 강점과 약점을 증폭시키는 '증폭기'다
// 출처: 03-preparation-strategy.md 섹션3.3 (DORA 2025)
// ---------------------------------------------------------------------------
function slide12_dora_amplifier() {
  const slide = pptx.addSlide();

  // 풀블리드 배경
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.bg_secondary, pt: 0 },
  });

  // 상단 장식 선
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 0.06,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, pt: 0 },
  });

  // 인용 출처 태그
  slide.addText('DORA 2025 · Google State of AI-assisted Software Development', {
    x: 1.0, y: 0.45, w: 11.33, h: 0.35,
    fontSize: 12, color: COLORS.primary, bold: true,
    align: 'center', fontFace: FONTS.body,
  });

  // 인용문
  slide.addText(
    '"AI는 기존 조직의 강점과 약점을 증폭시키는 \'증폭기\'다.\n잘 작동하는 조직은 더 잘 되고, 문제 있는 조직은 더 악화된다."',
    {
      x: 1.2, y: 1.1, w: 10.93, h: 2.2,
      fontSize: 24, bold: true, color: COLORS.text,
      align: 'center', valign: 'middle',
      fontFace: FONTS.quote,
      paraSpaceAfter: 6,
    }
  );

  // 구분선
  slide.addShape('rect', {
    x: 3.5, y: 3.42, w: 6.33, h: 0.04,
    fill: { color: COLORS.border },
    line: { color: COLORS.border, pt: 0 },
  });

  // 부제: 7가지 역량
  slide.addText('AI 효과를 조직 성과로 연결하는 7가지 역량 (DORA 2025)', {
    x: 1.0, y: 3.6, w: 11.33, h: 0.38,
    fontSize: 13, bold: true, color: COLORS.primary,
    align: 'center', fontFace: FONTS.body,
  });

  const capabilities = [
    '① 명확한 AI 입장 (AI Stance)',
    '② 건강한 데이터 생태계',
    '③ AI 접근 가능한 내부 데이터',
    '④ 강력한 버전 관리 체계',
    '⑤ 소규모 배치 작업 문화',
    '⑥ 사용자 중심 집중',
    '⑦ 우수한 내부 플랫폼',
  ];

  // 7개 역량 — 두 줄로 배치 (4 + 3)
  const row1 = capabilities.slice(0, 4);
  const row2 = capabilities.slice(4);
  const capW = 2.85;
  const capH = 0.62;

  row1.forEach((cap, i) => {
    const x = 0.6 + i * (capW + 0.12);
    slide.addShape('rect', {
      x, y: 4.12, w: capW, h: capH,
      fill: { color: COLORS.bg },
      line: { color: COLORS.primary, pt: 1 },
    });
    slide.addText(cap, {
      x, y: 4.12, w: capW, h: capH,
      fontSize: 11, color: COLORS.text,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
  });

  const row2StartX = 0.6 + (13.33 - 0.6 - 0.6 - (row2.length * capW + (row2.length - 1) * 0.12)) / 2;
  row2.forEach((cap, i) => {
    const x = row2StartX + i * (capW + 0.12);
    slide.addShape('rect', {
      x, y: 4.88, w: capW, h: capH,
      fill: { color: COLORS.bg },
      line: { color: COLORS.primary, pt: 1 },
    });
    slide.addText(cap, {
      x, y: 4.88, w: capW, h: capH,
      fontSize: 11, color: COLORS.text,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
  });

  // 함의
  slide.addText('→ 도구 도입 전 조직 체력 점검이 선행되어야 한다', {
    x: 1.0, y: 5.72, w: 11.33, h: 0.4,
    fontSize: 13, bold: true, color: COLORS.accent,
    align: 'center', fontFace: FONTS.body,
  });

  // 하단 장식 선
  slide.addShape('rect', {
    x: 0, y: 7.44, w: 13.33, h: 0.06,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, pt: 0 },
  });

  addPageNumber(slide, 12, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 13 — [Table] 수혜는 비대칭적으로 귀속된다: 플랫폼 > 대기업 > 시니어 > 주니어
// 출처: 00-synthesis.md 섹션4
// ---------------------------------------------------------------------------
function slide13_asymmetric_benefit() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '수혜는 비대칭적으로 귀속된다: 플랫폼 > 대기업 > 시니어 > 주니어');

  // 서브타이틀
  slide.addText('AI 개발 도구 시대의 최대 수혜자는 누구인가 — 00-synthesis.md 섹션 4 핵심 발견', {
    x: 0.6, y: 1.82, w: 12.13, h: 0.3,
    fontSize: 11, color: COLORS.text_muted, italic: true, fontFace: FONTS.body,
  });

  // 수혜 귀속 비교 표
  const tableRows = [
    [
      { text: '수혜 주체', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '핵심 이익', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '대표 지표', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '리스크 / 과제', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
    ],
    [
      { text: '플랫폼 제공자\n(Anthropic / Microsoft / Anysphere)', options: { bold: true, color: COLORS.accent } },
      { text: 'AI 도구 구독 수익 + 생태계 Lock-in', options: {} },
      { text: 'ARR $10억~$20억 (각사)', options: { bold: true } },
      { text: '경쟁 격화, 오픈소스 대안 부상', options: {} },
    ],
    [
      { text: 'AI 조기 채택 대기업', options: { bold: true, color: COLORS.primary } },
      { text: '자체 코드베이스 파인튜닝 → 경쟁 우위 확보', options: {} },
      { text: '상위 사분위: 65%+ 일일 사용 → 15%+ 속도 향상', options: { bold: true } },
      { text: '거버넌스 없으면 기술 부채 폭발', options: {} },
    ],
    [
      { text: '시니어 개발자', options: { bold: true, color: COLORS.primary } },
      { text: 'AI를 레버리지로 활용 → 생산량 급증', options: {} },
      { text: 'GitHub Copilot 사용 시 22% 속도 향상', options: { bold: true } },
      { text: '일부 환경에서 -19% (복잡 과제·METR 2025)', options: {} },
    ],
    [
      { text: '주니어 개발자', options: { bold: true, color: COLORS.accent } },
      { text: 'AI 도구 사용은 가능하나 기회 자체가 축소', options: {} },
      { text: '4% 속도 향상 / 신규 채용 13~50% 감소', options: { bold: true, color: COLORS.accent } },
      { text: '역할 재정의 없이는 진입 경로 협소화', options: {} },
    ],
  ];

  slide.addTable(tableRows, {
    x: 0.6, y: 2.2, w: 12.13,
    colW: [3.1, 3.3, 3.1, 2.63],
    border: { type: 'solid', pt: 0.5, color: 'E2E8F0' },
    autoPage: false,
    margin: [5, 8, 5, 8],
    rowH: [0.5, 0.7, 0.7, 0.7, 0.7]
  });

  // 핵심 인사이트 박스
  slide.addShape('rect', {
    x: 0.6, y: 5.82, w: 12.13, h: 0.72,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent, pt: 2 },
  });
  slide.addText(
    '핵심: "AI 도구 시대의 가장 날카로운 질문은 어떤 도구를 쓸 것인가가 아니라, 수혜가 누구에게 귀속되는가이다." — 00-synthesis.md',
    {
      x: 0.75, y: 5.82, w: 11.83, h: 0.72,
      fontSize: 12, bold: false, color: COLORS.text,
      align: 'left', valign: 'middle', fontFace: FONTS.body,
    }
  );

  addPageNumber(slide, 13, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 14 — [Section] 미래 일터는 어떻게 변화하는가 (파트 3)
// ---------------------------------------------------------------------------
function slide14_section_future_work() {
  const slide = pptx.addSlide();

  // 풀블리드 배경
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, pt: 0 },
  });

  // 파트 레이블
  slide.addText('Part 3', {
    x: 0, y: 2.0, w: 13.33, h: 0.55,
    fontSize: 16, color: COLORS.bg, bold: false,
    align: 'center', fontFace: FONTS.body,
    transparency: 40,
  });

  // 섹션 타이틀
  slide.addText('미래 일터는\n어떻게 변화하는가', {
    x: 0.8, y: 2.62, w: 11.73, h: 2.0,
    fontSize: 44, bold: true, color: COLORS.bg,
    align: 'center', valign: 'middle',
    fontFace: FONTS.body,
    paraSpaceAfter: 8,
  });

  // 서브 키워드
  const keywords = ['팀 규모', '역할 전환', '산업 파급', '고용 구조'];
  const kwW = 2.5;
  const kwTotal = keywords.length * kwW + (keywords.length - 1) * 0.25;
  const kwStartX = (13.33 - kwTotal) / 2;
  keywords.forEach((kw, i) => {
    const x = kwStartX + i * (kwW + 0.25);
    slide.addShape('rect', {
      x, y: 5.0, w: kwW, h: 0.48,
      fill: { color: '000000', transparency: 60 },
      line: { color: COLORS.bg, pt: 1 },
    });
    slide.addText(kw, {
      x, y: 5.0, w: kwW, h: 0.48,
      fontSize: 13, color: COLORS.bg, bold: false,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
  });

  // 하단 장식 선
  slide.addShape('rect', {
    x: 0, y: 7.44, w: 13.33, h: 0.06,
    fill: { color: COLORS.bg },
    line: { color: COLORS.bg, pt: 0 },
  });
}

// ---------------------------------------------------------------------------
// Slide 15 — [Content] 소프트웨어 팀은 이미 축소되고 있다
// 출처: 02-industry-impact-future-work.md 섹션1.1
// ---------------------------------------------------------------------------
function slide15_team_shrinking() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '소프트웨어 팀은 이미 축소되고 있다');

  // 서브타이틀
  slide.addText('실증 사례와 산업 전망 — 02-industry-impact-future-work.md 섹션 1.1', {
    x: 0.6, y: 1.82, w: 12.13, h: 0.28,
    fontSize: 11, color: COLORS.text_muted, italic: true, fontFace: FONTS.body,
  });

  // ── 3개 사례 카드 (상단) ────────────────────────────────────────────
  const cases = [
    {
      label: '헬스케어 기업 사례',
      before: '10인\n개발팀',
      after: '3인 팀',
      desc: '제품 오너 + AI 프롬팅 가능 개발자\n+ 시스템 아키텍트',
      src: 'Fortune 보도 [중간 - 단일 사례]',
      highlight: true,
    },
    {
      label: 'Pragmatic Engineer 설문',
      before: '2인 피자 팀\n(6~10인)',
      after: '1인 피자 팀\n(3~4인)',
      desc: '농업 분야 200년 기업 엔지니어링 리더 발언\n"더 적게, 더 많은 것을 창출"',
      src: 'Pragmatic Engineer Newsletter [중간]',
      highlight: false,
    },
    {
      label: 'Gartner 전망 (2030)',
      before: '대규모\n소프트웨어 팀',
      after: '80%\n기업 전환',
      desc: '소규모 AI-증강 팀으로 전환\n※ 방향성 지표로만 활용 (장기 예측 불확실)',
      src: 'Gartner / Deloitte 2026 Outlook [낮음]',
      highlight: false,
    },
  ];

  const cardW = 3.8;
  const cardH = 2.7;
  const cardY = 2.18;
  const cardXs = [0.6, 4.67, 8.73];

  cases.forEach((c, i) => {
    const borderColor = c.highlight ? COLORS.accent : COLORS.border;
    slide.addShape('rect', {
      x: cardXs[i], y: cardY, w: cardW, h: cardH,
      fill: { color: COLORS.bg_secondary },
      line: { color: borderColor, pt: c.highlight ? 2 : 1 },
    });
    // 레이블
    slide.addText(c.label, {
      x: cardXs[i], y: cardY + 0.1, w: cardW, h: 0.3,
      fontSize: 11, bold: true, color: COLORS.primary,
      align: 'center', fontFace: FONTS.body,
    });
    // Before → After
    slide.addText(c.before, {
      x: cardXs[i] + 0.15, y: cardY + 0.48, w: 1.35, h: 0.75,
      fontSize: 14, bold: true, color: COLORS.text_muted,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
    slide.addText('→', {
      x: cardXs[i] + 1.6, y: cardY + 0.48, w: 0.55, h: 0.75,
      fontSize: 20, bold: true, color: COLORS.primary,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
    slide.addText(c.after, {
      x: cardXs[i] + 2.2, y: cardY + 0.48, w: 1.45, h: 0.75,
      fontSize: 18, bold: true, color: c.highlight ? COLORS.accent : COLORS.primary,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
    // 설명
    slide.addText(c.desc, {
      x: cardXs[i] + 0.1, y: cardY + 1.32, w: cardW - 0.2, h: 0.88,
      fontSize: 10.5, color: COLORS.text,
      align: 'center', valign: 'top', fontFace: FONTS.body,
    });
    // 출처
    slide.addText(c.src, {
      x: cardXs[i], y: cardY + 2.44, w: cardW, h: 0.22,
      fontSize: 9, color: COLORS.text_muted, italic: true,
      align: 'center', fontFace: FONTS.body,
    });
  });

  // ── Atlassian 인용 ──────────────────────────────────────────────────
  slide.addShape('rect', {
    x: 0.6, y: 5.08, w: 12.13, h: 0.75,
    fill: { color: COLORS.bg },
    line: { color: COLORS.primary, pt: 1 },
  });
  slide.addText(
    '"일부 팀은 코드를 사실상 한 줄도 직접 작성하지 않는다. 모두 에이전트 오케스트레이션이다.\n결과적으로 팀이 작아지는 게 아니라 2~5배 더 많은 것을 창출한다." — Atlassian 엔지니어링 리더',
    {
      x: 0.75, y: 5.08, w: 11.83, h: 0.75,
      fontSize: 11, color: COLORS.text, italic: true,
      align: 'left', valign: 'middle', fontFace: FONTS.body,
    }
  );

  // ── 수치 투명성 주석 ─────────────────────────────────────────────────
  slide.addText(
    '* Gartner 80% 수치는 B2B 대기업 설문 기반. 스타트업·중소기업은 채택 속도 상이. AI 코드 품질 신뢰도 45% 기업 우려 시 팀 축소 속도 둔화 가능.',
    {
      x: 0.6, y: 5.97, w: 12.13, h: 0.38,
      fontSize: 10, color: COLORS.text_muted, italic: true,
      align: 'left', fontFace: FONTS.body,
    }
  );

  addPageNumber(slide, 15, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 16 — [TwoColumn] 주니어 고용은 감소하지만, 전체 개발자 수요는 증가한다
// 출처: 02-industry-impact-future-work.md 섹션1.2
// ---------------------------------------------------------------------------
function slide16_junior_vs_total() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '주니어 고용은 감소하지만, 전체 개발자 수요는 증가한다');

  // 컬럼 구분선
  const divX = COL_LEFT_X + COL_W + 0.18;
  slide.addShape('rect', {
    x: divX, y: 1.85, w: 0.03, h: 5.0,
    fill: { color: COLORS.border },
    line: { color: COLORS.border, pt: 0 },
  });

  // ── 좌: 주니어 고용 감소 ───────────────────────────────────────────
  slide.addText('주니어 개발자 고용 감소', {
    x: COL_LEFT_X, y: 1.87, w: COL_W, h: 0.38,
    fontSize: 14, bold: true, color: COLORS.accent,
    align: 'center', fontFace: FONTS.body,
  });

  const leftStats = [
    { val: '13%', label: 'AI 노출 직군 22~25세 초기 경력자\n고용 감소 (2022~2025)', src: 'Stanford 2025 [높음]' },
    { val: '50%', label: '빅테크 신규 졸업자 채용 감소\n(최근 3년)', src: 'Rest of World [중간]' },
    { val: '31%', label: '한국 대기업 신입 공채 축소\n(AI 네이티브 경력직 전환)', src: '00-synthesis.md' },
  ];

  leftStats.forEach((s, i) => {
    const y = 2.38 + i * 1.35;
    slide.addShape('rect', {
      x: COL_LEFT_X, y, w: COL_W, h: 1.22,
      fill: { color: COLORS.bg_secondary },
      line: { color: COLORS.accent, pt: 1 },
    });
    slide.addText(s.val + ' 감소', {
      x: COL_LEFT_X, y: y + 0.05, w: COL_W, h: 0.48,
      fontSize: 28, bold: true, color: COLORS.accent,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
    slide.addText(s.label, {
      x: COL_LEFT_X + 0.1, y: y + 0.54, w: COL_W - 0.2, h: 0.44,
      fontSize: 10.5, color: COLORS.text,
      align: 'center', valign: 'top', fontFace: FONTS.body,
    });
    slide.addText(s.src, {
      x: COL_LEFT_X, y: y + 1.0, w: COL_W, h: 0.19,
      fontSize: 9, color: COLORS.text_muted, italic: true,
      align: 'center', fontFace: FONTS.body,
    });
  });

  // ── 우: 전체 수요 증가 ─────────────────────────────────────────────
  slide.addText('전체 개발자 수요 증가', {
    x: COL_RIGHT_X, y: 1.87, w: COL_W, h: 0.38,
    fontSize: 14, bold: true, color: COLORS.primary,
    align: 'center', fontFace: FONTS.body,
  });

  const rightStats = [
    { val: '17.9%', label: 'BLS 소프트웨어 개발자 고용 성장\n예측 (2023~2033)', src: 'BLS [높음]' },
    { val: '+수요 폭발', label: 'AI가 진입장벽 낮춰 더 많은 산업에\n소프트웨어 침투 → 전체 수요 증가', src: 'WEF Future of Jobs 2025' },
    { val: '총량↑ 구성↔', label: '"총 수요 증가 + 구성 변화"\n(주니어 비중 감소, 시니어/AI 전문가 증가)', src: '00-synthesis.md 상충점 해결' },
  ];

  rightStats.forEach((s, i) => {
    const y = 2.38 + i * 1.35;
    slide.addShape('rect', {
      x: COL_RIGHT_X, y, w: COL_W, h: 1.22,
      fill: { color: COLORS.bg_secondary },
      line: { color: COLORS.primary, pt: 1 },
    });
    slide.addText(s.val, {
      x: COL_RIGHT_X, y: y + 0.05, w: COL_W, h: 0.48,
      fontSize: 22, bold: true, color: COLORS.primary,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
    slide.addText(s.label, {
      x: COL_RIGHT_X + 0.1, y: y + 0.54, w: COL_W - 0.2, h: 0.44,
      fontSize: 10.5, color: COLORS.text,
      align: 'center', valign: 'top', fontFace: FONTS.body,
    });
    slide.addText(s.src, {
      x: COL_RIGHT_X, y: y + 1.0, w: COL_W, h: 0.19,
      fontSize: 9, color: COLORS.text_muted, italic: true,
      align: 'center', fontFace: FONTS.body,
    });
  });

  // ── 하단 종합 메시지 ─────────────────────────────────────────────────
  slide.addShape('rect', {
    x: 0.6, y: 6.48, w: 12.13, h: 0.48,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, pt: 0 },
  });
  slide.addText(
    '해석: 주니어 대량 해고는 잘못된 전략 — "채용 축소보다 역할 재정의로 대응"이 정답 (00-synthesis.md 역방향 의사결정 가이드)',
    {
      x: 0.75, y: 6.48, w: 11.83, h: 0.48,
      fontSize: 11, bold: true, color: COLORS.bg,
      align: 'left', valign: 'middle', fontFace: FONTS.body,
    }
  );

  addPageNumber(slide, 16, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 17 — [Cards] 개발자 역할이 코딩에서 오케스트레이션으로 전환 중이다
// 출처: 02-industry-impact-future-work.md 섹션2, 90-signal-register.md 신호7
// ---------------------------------------------------------------------------
function slide17_role_transition() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '개발자 역할이 코딩에서 오케스트레이션으로 전환 중이다');

  // 서브타이틀
  slide.addText('02-industry-impact-future-work.md 섹션 2 · 90-signal-register.md 신호 7', {
    x: 0.6, y: 1.82, w: 12.13, h: 0.28,
    fontSize: 11, color: COLORS.text_muted, italic: true, fontFace: FONTS.body,
  });

  // ── 4개 역할 카드 (2×2) ─────────────────────────────────────────────
  const roleCards = [
    {
      icon: '①',
      title: 'AI 감독 & 오케스트레이션',
      desc: '에이전트 방향 설정, 결과물 검증,\n품질 보증 — AI를 자동조종이 아닌\n페어 프로그래머로 운용',
    },
    {
      icon: '②',
      title: '시스템 아키텍처 설계',
      desc: 'AI가 실행하는 복잡 시스템의\n전체 구조 설계 — AI 확장 시대의\n핵심 인간 역량',
    },
    {
      icon: '③',
      title: '도메인 전문성 × AI 융합',
      desc: '금융·의료·법률·제조 등 특정 산업\n맥락에서 AI를 적용\n— AI가 모르는 암묵적 지식 보유',
    },
    {
      icon: '④',
      title: '"빌더" 역할 부상',
      desc: '문제 발견부터 AI 활용 구현까지\n전 과정을 1인이 담당\n(SF Standard 2026: "Everyone\'s a Builder")',
    },
  ];

  const cW = CARD_2X2.w;
  const cH = CARD_2X2.h;
  const accentColors = [COLORS.accent_blue, COLORS.accent_cyan, COLORS.accent_yellow, COLORS.accent_purple];

  roleCards.forEach((card, i) => {
    const pos = CARD_2X2.positions[i];
    addCard(slide, {
      x: pos.x, y: pos.y, w: cW, h: cH,
      title: card.title,
      body: card.desc,
      accentColor: accentColors[i]
    });
  });

  // ── 부상 직무 & 신호 배너 ────────────────────────────────────────────
  slide.addShape('rect', {
    x: 0.6, y: 6.32, w: 12.13, h: 0.56,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.primary, pt: 1 },
  });
  slide.addText(
    '부상 직무 (신호 7) — AI Agent Architect: $140K~$225K  |  Agentic AI Specialist: $100K~$180K  |  RAG Engineer: $110K~$180K  |  AI 엔지니어 직무 YoY +143%',
    {
      x: 0.75, y: 6.32, w: 11.83, h: 0.56,
      fontSize: 10.5, color: COLORS.text,
      align: 'left', valign: 'middle', fontFace: FONTS.body,
    }
  );

  addPageNumber(slide, 17, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 18 — [Table] 비소프트웨어 산업에서도 AI 파급이 빠르게 확산 중이다
// 출처: 02-industry-impact-future-work.md 섹션3
// ---------------------------------------------------------------------------
function slide18_industry_spread() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '비소프트웨어 산업에서도 AI 파급이 빠르게 확산 중이다');

  // 서브타이틀
  slide.addText('채택 병목은 공통적으로 기술이 아닌 거버넌스·데이터·조직 변화관리 — 02-industry-impact-future-work.md 섹션 3', {
    x: 0.6, y: 1.82, w: 12.13, h: 0.28,
    fontSize: 11, color: COLORS.text_muted, italic: true, fontFace: FONTS.body,
  });

  // 산업별 테이블
  const tableRows = [
    [
      { text: '산업', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '주요 AI 적용 영역', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '핵심 성과 지표', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '핵심 병목', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '신뢰도', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
    ],
    [
      { text: '제조', options: { bold: true } },
      { text: '예측 유지보수, 디지털 트윈, AI 품질 검사', options: {} },
      { text: '가동중단 비용 50% 감소\n유지보수 비용 30% 절감', options: {} },
      { text: '레거시 장비, 안전 규제', options: {} },
      { text: '[중간]', options: { color: COLORS.text_muted, italic: true } },
    ],
    [
      { text: '금융', options: { bold: true } },
      { text: '반복 데이터 처리·예측 분석 자동화', options: {} },
      { text: 'McKinsey: 64%가 비용·수익 개선 보고', options: {} },
      { text: '규제 준수, 감사 추적, 할루시네이션', options: {} },
      { text: '[중간~높음]', options: { color: COLORS.text_muted, italic: true } },
    ],
    [
      { text: '의료', options: { bold: true } },
      { text: '방사선 영상 분석, 진단 보조 AI', options: {} },
      { text: '헬스케어 기업 10인→3인 팀 전환', options: {} },
      { text: 'HIPAA/GDPR, 임상 검증, 의사 신뢰', options: {} },
      { text: '[중간]', options: { color: COLORS.text_muted, italic: true } },
    ],
    [
      { text: '법률', options: { bold: true } },
      { text: '계약 검토, 법률 리서치, 컴플라이언스 분석', options: {} },
      { text: '법률 보조 인력(paralegal) 역할 변화', options: {} },
      { text: '책임 귀속, 오류 비용, 변호사 단체 규제', options: {} },
      { text: '[중간]', options: { color: COLORS.text_muted, italic: true } },
    ],
    [
      { text: '교육', options: { bold: true } },
      { text: 'AI 개인화 학습, 자동 채점, 적응형 커리큘럼', options: {} },
      { text: 'AI 능숙 직원 56% 임금 프리미엄 (PwC 2025)', options: {} },
      { text: '교사 역할 재정의, 스킬 격차 관리', options: {} },
      { text: '[중간]', options: { color: COLORS.text_muted, italic: true } },
    ],
  ];

  slide.addTable(tableRows, {
    x: 0.6, y: 2.18, w: 12.13,
    colW: [1.35, 3.2, 3.0, 2.8, 1.4],
    border: { type: 'solid', pt: 0.5, color: 'E2E8F0' },
    autoPage: false,
    margin: [5, 8, 5, 8],
    rowH: [0.45, 0.55, 0.55, 0.55, 0.55, 0.55]
  });

  // 공통 병목 박스
  slide.addShape('rect', {
    x: 0.6, y: 5.82, w: 12.13, h: 0.56,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent, pt: 2 },
  });
  slide.addText(
    '공통 병목 (전 산업): 기술 성숙도가 아닌 거버넌스 체계 / 고품질 내부 데이터 확보 / 조직 변화관리 역량\n→ 채택 속도는 기술 준비도보다 조직 준비도에 달려 있다',
    {
      x: 0.75, y: 5.82, w: 11.83, h: 0.56,
      fontSize: 11, color: COLORS.text,
      align: 'left', valign: 'middle', fontFace: FONTS.body,
    }
  );

  addPageNumber(slide, 18, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 19 — [Section] 우리는 무엇을 준비해야 하는가 (파트 4)
// ---------------------------------------------------------------------------
function slide19_section_preparation() {
  const slide = pptx.addSlide();

  // 풀블리드 배경
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, pt: 0 },
  });

  // 좌측 액센트 바
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.18, h: 7.5,
    fill: { color: COLORS.accent },
    line: { color: COLORS.accent, pt: 0 },
  });

  // 파트 레이블
  slide.addText('Part 4', {
    x: 0.5, y: 2.0, w: 12.33, h: 0.55,
    fontSize: 16, color: COLORS.bg, bold: false,
    align: 'center', fontFace: FONTS.body,
    transparency: 40,
  });

  // 섹션 타이틀
  slide.addText('우리는 무엇을\n준비해야 하는가', {
    x: 0.5, y: 2.62, w: 12.33, h: 2.0,
    fontSize: 44, bold: true, color: COLORS.bg,
    align: 'center', valign: 'middle',
    fontFace: FONTS.body,
    paraSpaceAfter: 8,
  });

  // 서브 키워드
  const keywords = ['개인 역량', '기업 전략', '로드맵', '권고안'];
  const kwW = 2.5;
  const kwTotal = keywords.length * kwW + (keywords.length - 1) * 0.25;
  const kwStartX = (13.33 - kwTotal) / 2;
  keywords.forEach((kw, i) => {
    const x = kwStartX + i * (kwW + 0.25);
    slide.addShape('rect', {
      x, y: 5.0, w: kwW, h: 0.48,
      fill: { color: '000000', transparency: 60 },
      line: { color: COLORS.bg, pt: 1 },
    });
    slide.addText(kw, {
      x, y: 5.0, w: kwW, h: 0.48,
      fontSize: 13, color: COLORS.bg, bold: false,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
  });

  // 하단 장식 선
  slide.addShape('rect', {
    x: 0, y: 7.44, w: 13.33, h: 0.06,
    fill: { color: COLORS.accent },
    line: { color: COLORS.accent, pt: 0 },
  });
}


// ============================================================
// Part C: 슬라이드 20~28
// ============================================================

// ─────────────────────────────────────────────────────────────
// 슬라이드 20: [Cards] 4가지 시나리오
// ─────────────────────────────────────────────────────────────
function slide20_scenarios() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '4가지 시나리오: 가장 가능성 높은 미래는 "점진적 통합"이다');

  // 확률 부제
  slide.addText('시나리오 A가 50~60% — 그래도 나머지 40~50%를 무시할 수 없다', {
    x: 0.6, y: 1.65, w: 12.13, h: 0.32,
    fontSize: 11, color: COLORS.textSub, italic: true,
  });

  // 카드 배경 색상 정의
  const cardColors = [
    { bg: 'EBF5FB', border: '2E86C1' }, // A 파랑
    { bg: 'EAFAF1', border: '1E8449' }, // B 초록
    { bg: 'FDEDEC', border: 'CB4335' }, // C 빨강
    { bg: 'FEF9E7', border: 'B7950B' }, // D 노랑
  ];

  const cards = [
    {
      label: 'A 점진적 통합',
      prob: '50~60%',
      probColor: '2E86C1',
      items: [
        '기술 연 15~25% 개선 + 조직 점진 수용',
        '팀 규모 20~30% 축소 (3년 내 주류)',
        '에이전틱 코딩 → 반복 업무 40~50% 대체',
        '전략: 단계적 도입 + 거버넌스 선행',
      ],
    },
    {
      label: 'B 소프트웨어 수요 폭발',
      prob: '15~25%',
      probColor: '1E8449',
      items: [
        'AI 성능 급진전 + 규제 혁신 친화',
        '전 산업 소프트웨어화 → 개발자 총 수요 증가',
        'AI 에이전트가 SDLC 70%+ 자동 처리',
        '전략: 적극 투자 + 인재 조기 확보',
      ],
    },
    {
      label: 'C 규제 브레이크',
      prob: '15~20%',
      probColor: 'CB4335',
      items: [
        '대형 AI 코드 보안 사고 + 규제 급강화',
        'AI 코드 인간 검토 의무화',
        '채택 속도 50% 둔화, 컴플라이언스 비용 급증',
        '전략: 거버넌스가 경쟁력, 컴플라이언스 선행',
      ],
    },
    {
      label: 'D 기술 정체 (고원기)',
      prob: '10~15%',
      probColor: 'B7950B',
      items: [
        'Scaling law 한계 → SWE-bench 80%에서 포화',
        '에이전틱 코딩 → 실험 수준 고착',
        '구독 해지 증가, 과잉 투자 기업 손실',
        '전략: 현 수준 실용적 활용, 과잉 투자 회피',
      ],
    },
  ];

  const positions = [
    { x: 0.6,  y: 2.05 },
    { x: 6.7,  y: 2.05 },
    { x: 0.6,  y: 4.65 },
    { x: 6.7,  y: 4.65 },
  ];

  const cw = 5.8;
  const ch = 2.35;

  cards.forEach((card, i) => {
    const { x, y } = positions[i];
    const { bg, border } = cardColors[i];

    // 카드 배경
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: cw, h: ch,
      fill: { color: bg },
      line: { color: border, width: 1.5 },
    });

    // 카드 상단 라벨 바
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: cw, h: 0.38,
      fill: { color: border },
      line: { color: border, width: 0 },
    });

    // 라벨 텍스트
    slide.addText(card.label, {
      x: x + 0.12, y: y + 0.03, w: cw - 0.5, h: 0.32,
      fontSize: 11.5, bold: true, color: 'FFFFFF',
    });

    // 확률 뱃지
    slide.addText(card.prob, {
      x: x + cw - 1.05, y: y + 0.04, w: 0.95, h: 0.28,
      fontSize: 10, bold: true, color: 'FFFFFF', align: 'right',
    });

    // 내용 항목
    card.items.forEach((item, j) => {
      slide.addText('• ' + item, {
        x: x + 0.15, y: y + 0.5 + j * 0.43, w: cw - 0.25, h: 0.4,
        fontSize: 9.5, color: COLORS.textBody,
        wrap: true,
      });
    });
  });

  // 공통 대비 전략 하단 노트
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 7.08, w: 12.13, h: 0.32,
    fill: { color: 'EBF5FB' },
    line: { color: '2E86C1', width: 1 },
  });
  slide.addText(
    '공통 대비: 시나리오 A(기준)를 중심으로 설계  |  C·D 방어 내장  |  B 업사이드 옵션 유지  —  출처: 91-scenario-matrix.md',
    {
      x: 0.7, y: 7.1, w: 12.0, h: 0.28,
      fontSize: 8.5, color: '2E86C1', italic: true,
    }
  );

  addPageNumber(slide, 20, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 21: [Table] 시나리오별 핵심 차이 비교
// ─────────────────────────────────────────────────────────────
function slide21_scenario_comparison() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '시나리오별 핵심 차이: 어떤 세상이 오느냐에 따라 전략이 달라진다');

  const headers = ['차원', 'A 점진적 통합', 'B 수요 폭발', 'C 규제 브레이크', 'D 기술 정체'];

  const rows = [
    ['개발자 총 수요', '소폭 감소 후 안정', '증가', '유지~소폭 감소', '유지'],
    ['주니어 수요', '구조적 감소', '역할 재정의 후 반등', '검토 역할로 유지', '완만한 감소'],
    ['팀 규모', '20~30% 축소', '1인 팀 증가\n총 팀 수 증가', '축소 둔화', '소폭 축소'],
    ['핵심 역량', 'AI 오케스트레이션', '도메인 × AI 융합', '거버넌스·컴플라이언스', '전통 개발 + AI 보조'],
    ['최대 리스크', '보안 부채 누적', '플랫폼 종속', '혁신 경쟁력 저하', '과잉 투자 손실'],
    ['한국 기업 전략', '단계적 도입\n+ 거버넌스', '적극 투자\n+ 인재 확보', '컴플라이언스 선행', '제한적 도입 유지'],
  ];

  const colW = [2.1, 2.4, 2.4, 2.7, 2.5];

  const tableRows = [
    headers.map((h, i) => ({
      text: h,
      options: {
        bold: true,
        color: 'FFFFFF',
        fill: i === 0 ? { color: COLORS.primary } : { color: i === 1 ? '2E86C1' : i === 2 ? '1E8449' : i === 3 ? 'CB4335' : 'B7950B' },
        align: 'center',
        fontSize: 10.5,
      },
    })),
    ...rows.map((row) =>
      row.map((cell, ci) => ({
        text: cell,
        options: {
          fontSize: 9.5,
          color: ci === 0 ? COLORS.primary : COLORS.textBody,
          bold: ci === 0,
          align: 'center',
          valign: 'middle',
          fill: { color: ci === 0 ? 'EBF5FB' : 'FFFFFF' },
        },
      }))
    ),
  ];

  slide.addTable(tableRows, {
    x: 0.6, y: 1.85, w: 12.13,
    rowH: 0.62,
    colW,
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    autoPage: false,
  });

  slide.addText('출처: 91-scenario-matrix.md — 시나리오 간 비교 요약', {
    x: 0.6, y: 7.15, w: 12.13, h: 0.22,
    fontSize: 8, color: COLORS.textSub, italic: true,
  });

  addPageNumber(slide, 21, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 22: [Table] 기업 전략 옵션 4분류
// ─────────────────────────────────────────────────────────────
function slide22_strategy_options() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '기업 전략: 지금 실행 / 제한적 실험 / 관망 / 회피');

  const categoryColors = {
    '지금 실행': { header: '1A5276', fill: 'EBF5FB', badge: '2E86C1' },
    '제한적 실험': { header: '1E8449', fill: 'EAFAF1', badge: '27AE60' },
    '관망': { header: '7D6608', fill: 'FEF9E7', badge: 'F39C12' },
    '회피': { header: '922B21', fill: 'FDEDEC', badge: 'E74C3C' },
  };

  const sections = [
    {
      category: '지금 실행',
      timeframe: '0~3개월',
      rows: [
        ['AI 도구 파일럿 (5~10명)', 'Copilot/Cursor, 비용 낮음', '모든 시나리오에서 유효, 즉시 학습 축적'],
        ['AI 코드 보안 스캔 파이프라인', 'CI/CD 통합 필요', '보안 부채 선제 차단, 규제 대비'],
        ['AI 거버넌스 정책 v1 수립', '조직 합의 필요', 'Shadow AI 리스크 제거, 모든 시나리오 필수'],
      ],
    },
    {
      category: '제한적 실험',
      timeframe: '3~12개월',
      rows: [
        ['SDLC 전 주기 AI 통합', '조직 변화 관리 高', '생산성 10~15% → 20~30% 달성 열쇠'],
        ['에이전틱 코딩 제한적 도입', '보안 파이프라인 선결', '반복 업무 30~50% 자동화 잠재력'],
        ['역할 재정의 설계 착수', '인재 전략 기반 구축', 'AI 오케스트레이터·에이전트 아키텍트'],
      ],
    },
    {
      category: '관망',
      timeframe: '12~36개월 (조건부)',
      rows: [
        ['멀티에이전트 전면 도입', '기술 성숙도 미검증', 'SWE-bench 실세계 60%+ 확인 후 검토'],
        ['오픈소스 모델 자체 호스팅', '인프라·MLOps 역량 필요', '시장 안정화 후 비용/보안/성능 삼각 검토'],
      ],
    },
    {
      category: '회피',
      timeframe: '하지 말 것',
      rows: [
        ['프로세스 변화 없이 도구만 전사 확산', 'Bain: 10~15%가 상한', '오히려 안정성 7.2% 저하 가능'],
        ['거버넌스 없이 에이전틱 AI 배포', '보안 부채 폭발 경로', '대형 침해 사고 리스크'],
        ['AI 대체 목적 주니어 대량 해고', '장기 인재 파이프라인 고갈', '시나리오 B 발생 시 대응 불능'],
      ],
    },
  ];

  let currentY = 1.88;

  sections.forEach((sec) => {
    const col = categoryColors[sec.category];

    // 섹션 헤더
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: currentY, w: 12.13, h: 0.36,
      fill: { color: col.header },
      line: { color: col.header, width: 0 },
    });
    slide.addText(`${sec.category}  |  ${sec.timeframe}`, {
      x: 0.7, y: currentY + 0.04, w: 12.0, h: 0.28,
      fontSize: 10.5, bold: true, color: 'FFFFFF',
    });
    currentY += 0.36;

    // 행 데이터
    sec.rows.forEach((row, ri) => {
      const rowFill = ri % 2 === 0 ? col.fill : 'FFFFFF';
      const rowH = 0.42;

      // 옵션
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.6, y: currentY, w: 4.5, h: rowH,
        fill: { color: rowFill },
        line: { color: 'CCCCCC', width: 0.5 },
      });
      slide.addText(row[0], {
        x: 0.7, y: currentY + 0.04, w: 4.3, h: rowH - 0.08,
        fontSize: 9, bold: true, color: COLORS.textBody,
        valign: 'middle',
      });

      // 비용/조건
      slide.addShape(pptx.ShapeType.rect, {
        x: 5.1, y: currentY, w: 3.2, h: rowH,
        fill: { color: rowFill },
        line: { color: 'CCCCCC', width: 0.5 },
      });
      slide.addText(row[1], {
        x: 5.2, y: currentY + 0.04, w: 3.0, h: rowH - 0.08,
        fontSize: 9, color: COLORS.textSub,
        valign: 'middle',
      });

      // 이유/효과
      slide.addShape(pptx.ShapeType.rect, {
        x: 8.3, y: currentY, w: 4.43, h: rowH,
        fill: { color: rowFill },
        line: { color: 'CCCCCC', width: 0.5 },
      });
      slide.addText(row[2], {
        x: 8.4, y: currentY + 0.04, w: 4.23, h: rowH - 0.08,
        fontSize: 9, color: COLORS.textBody,
        valign: 'middle',
      });

      currentY += rowH;
    });
  });

  slide.addText('출처: 92-strategy-options.md, 00-synthesis.md §8', {
    x: 0.6, y: 7.15, w: 12.13, h: 0.22,
    fontSize: 8, color: COLORS.textSub, italic: true,
  });

  addPageNumber(slide, 22, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 23: [Content] 프로세스 재설계 — 생산성 10~15% → 20~30%
// ─────────────────────────────────────────────────────────────
function slide23_process_redesign() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '프로세스 재설계가 생산성 10~15%를 20~30%로 끌어올리는 열쇠다');

  // 핵심 인사이트 박스
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 1.78, w: 12.13, h: 0.78,
    fill: { color: 'EBF5FB' },
    line: { color: '2E86C1', width: 1.5 },
  });
  slide.addText(
    'Bain(2025): "AI가 없어도 할 수 있는 단계에만 집중"했던 기업들이 ROI 달성에 실패했다.\n코딩 단계(전체 SDLC의 25~35%)만 최적화해서는 조직 수준 생산성 상한이 10~15%이다.',
    {
      x: 0.75, y: 1.82, w: 11.85, h: 0.7,
      fontSize: 10.5, color: '1A5276', bold: false,
      valign: 'middle',
    }
  );

  // 왼쪽 — SDLC 전 주기 AI 통합
  slide.addText('SDLC 전 주기 AI 통합 (20~30% 경로)', {
    x: 0.6, y: 2.68, w: 5.8, h: 0.36,
    fontSize: 11, bold: true, color: COLORS.primary,
  });

  const sdlcSteps = [
    { step: '요구사항', detail: 'AI 기반 스펙 초안, 사용자 스토리 자동 생성' },
    { step: '설계', detail: '아키텍처 리뷰 보조, 다이어그램 자동화' },
    { step: '코딩', detail: 'Copilot/Cursor 코드 완성, 보일러플레이트 제거' },
    { step: '테스트', detail: 'AI 유닛 테스트 자동 생성, QA 커버리지 확장' },
    { step: '배포·운영', detail: 'CI/CD 자동화, SRE 이상 감지 보조' },
  ];

  sdlcSteps.forEach((s, i) => {
    const sy = 3.1 + i * 0.6;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: sy, w: 1.3, h: 0.48,
      fill: { color: COLORS.primary },
      line: { color: COLORS.primary, width: 0 },
    });
    slide.addText(s.step, {
      x: 0.6, y: sy, w: 1.3, h: 0.48,
      fontSize: 9.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle',
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.9, y: sy, w: 4.5, h: 0.48,
      fill: { color: 'F4F6F7' },
      line: { color: 'CCCCCC', width: 0.5 },
    });
    slide.addText(s.detail, {
      x: 2.0, y: sy, w: 4.3, h: 0.48,
      fontSize: 9.5, color: COLORS.textBody, valign: 'middle',
    });
  });

  // 오른쪽 — 성공/실패 사례 비교
  slide.addText('성공 vs 실패 — 핵심 변수', {
    x: 6.7, y: 2.68, w: 6.0, h: 0.36,
    fontSize: 11, bold: true, color: COLORS.primary,
  });

  const cases = [
    {
      label: '성공: Goldman Sachs',
      color: '1E8449',
      bg: 'EAFAF1',
      content: '사유 코드베이스 기반 파인튜닝 → 컨텍스트 인식 코드 생성. SDLC 전 단계 통합으로 개발 주기 단축.',
    },
    {
      label: '실패: 광범위 산업 평균',
      color: 'CB4335',
      bg: 'FDEDEC',
      content: 'Bain(2025): AI 코드 27% 생성에도 생산성 ~10%. 처리량 1.5% 감소, 안정성 7.2% 저하. 코딩 속도 20% 향상이 테스트·리뷰 병목(19% 증가)으로 상쇄.',
    },
    {
      label: 'Faros AI: AI 생산성 역설',
      color: 'B7950B',
      bg: 'FEF9E7',
      content: '10,000+ 개발자 텔레메트리: 개인 PR 병합 98% 증가. 그러나 조직 전달 지표는 정체. 프로세스 변화 없는 도구 교체의 한계.',
    },
  ];

  cases.forEach((c, i) => {
    const cy = 3.1 + i * 1.35;
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.7, y: cy, w: 5.83, h: 1.2,
      fill: { color: c.bg },
      line: { color: c.color, width: 1.5 },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.7, y: cy, w: 5.83, h: 0.3,
      fill: { color: c.color },
      line: { color: c.color, width: 0 },
    });
    slide.addText(c.label, {
      x: 6.8, y: cy + 0.02, w: 5.6, h: 0.26,
      fontSize: 9.5, bold: true, color: 'FFFFFF',
    });
    slide.addText(c.content, {
      x: 6.8, y: cy + 0.35, w: 5.6, h: 0.8,
      fontSize: 9, color: COLORS.textBody, wrap: true,
    });
  });

  slide.addText('출처: Bain 2025, Faros AI 2025, 03-preparation-strategy.md §3~4', {
    x: 0.6, y: 7.15, w: 12.13, h: 0.22,
    fontSize: 8, color: COLORS.textSub, italic: true,
  });

  addPageNumber(slide, 23, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 24: [Content] 개인 전략 — 3계층 스킬
// ─────────────────────────────────────────────────────────────
function slide24_individual_strategy() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '개인 전략: AI 시대에 대체 불가능한 포지션을 확립하라');

  slide.addText(
    '핵심 질문: "어떤 AI 도구를 쓸 것인가"가 아니라 "AI 도구 시대에 대체 불가능한 포지션을 어떻게 확립할 것인가"',
    {
      x: 0.6, y: 1.7, w: 12.13, h: 0.36,
      fontSize: 10, color: COLORS.textSub, italic: true,
    }
  );

  // 3계층 스킬 카드
  const layers = [
    {
      num: '1',
      title: 'AI 리터러시 + 도구 숙련',
      timeframe: '즉시 필요',
      color: 'CB4335',
      bg: 'FDEDEC',
      skills: [
        '프롬프트 엔지니어링 — 정밀한 컨텍스트, 범위 제한, 반복 정제',
        '비판적 평가 역량 — AI 출력의 보안성·정확성 검증',
        '도구 전환 유창성 — Copilot·Cursor·Claude Code 상황별 활용',
        '데이터 리터러시 — AI 출력 불확실성 이해',
      ],
      action: '지금 시작: Cursor/Copilot 일상화, AI 생성 코드 리뷰 습관 형성',
    },
    {
      num: '2',
      title: '시스템 사고 + 아키텍처 역량',
      timeframe: '12개월 내 준비',
      color: '1A5276',
      bg: 'EBF5FB',
      skills: [
        'AI 에이전트 조율 — 작업 위임, 체크포인트, 결과 검증',
        'AI 워크플로우 재설계 — 요구사항~배포 전 과정 AI 통합',
        '레거시 시스템 × AI 통합 역량',
      ],
      action: '3~12개월: RAG·AI 에이전트 실습 (LangChain/LlamaIndex), 아키텍처 포트폴리오',
    },
    {
      num: '3',
      title: '도메인 전문성 × AI 융합',
      timeframe: '장기 차별화',
      color: '1E8449',
      bg: 'EAFAF1',
      skills: [
        '금융·의료·법률·제조 등 특정 산업 맥락에서 AI 적용',
        'AI가 모르는 암묵적 지식(tacit knowledge)과 도메인 규제',
        '고객 요구사항을 AI가 실행 가능한 시스템으로 변환',
      ],
      action: '1~3년: AI Systems Builder 또는 Domain×AI 전문가 포지션 확립. 임금 프리미엄 56% 보고',
    },
  ];

  layers.forEach((layer, i) => {
    const lx = 0.6;
    const ly = 2.17 + i * 1.55;
    const lw = 12.13;
    const lh = 1.45;

    slide.addShape(pptx.ShapeType.rect, {
      x: lx, y: ly, w: lw, h: lh,
      fill: { color: layer.bg },
      line: { color: layer.color, width: 1.5 },
    });

    // 번호 원
    slide.addShape(pptx.ShapeType.ellipse, {
      x: lx + 0.08, y: ly + 0.08, w: 0.5, h: 0.5,
      fill: { color: layer.color },
      line: { color: layer.color, width: 0 },
    });
    slide.addText(layer.num, {
      x: lx + 0.08, y: ly + 0.08, w: 0.5, h: 0.5,
      fontSize: 14, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle',
    });

    // 제목
    slide.addText(layer.title, {
      x: lx + 0.68, y: ly + 0.1, w: 6.5, h: 0.34,
      fontSize: 11.5, bold: true, color: layer.color,
    });
    slide.addText(layer.timeframe, {
      x: lx + 7.2, y: ly + 0.1, w: 4.8, h: 0.34,
      fontSize: 10, color: layer.color, align: 'right', italic: true,
    });

    // 스킬 항목
    layer.skills.forEach((sk, j) => {
      slide.addText('• ' + sk, {
        x: lx + 0.7, y: ly + 0.52 + j * 0.26, w: 8.5, h: 0.26,
        fontSize: 9, color: COLORS.textBody,
      });
    });

    // 액션 라인
    slide.addShape(pptx.ShapeType.rect, {
      x: lx + 0.08, y: ly + lh - 0.36, w: lw - 0.16, h: 0.3,
      fill: { color: layer.color },
      line: { color: layer.color, width: 0 },
    });
    slide.addText(layer.action, {
      x: lx + 0.18, y: ly + lh - 0.36, w: lw - 0.3, h: 0.3,
      fontSize: 8.5, color: 'FFFFFF', valign: 'middle',
    });
  });

  // 상시 병행 메모
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 6.83, w: 12.13, h: 0.32,
    fill: { color: 'F2F3F4' },
    line: { color: '7F8C8D', width: 1 },
  });
  slide.addText(
    '★ 상시 병행: AI 없는 기초 역량 유지 — AI 의존 심화 방지, 장기적 판단력과 AI 오류 감지 능력의 기반  |  출처: 03-preparation-strategy.md §2, 92-strategy-options.md',
    {
      x: 0.7, y: 6.85, w: 12.0, h: 0.28,
      fontSize: 8.5, color: '555555', italic: false,
    }
  );

  addPageNumber(slide, 24, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 25: [Timeline] 기술 로드맵 3단계
// ─────────────────────────────────────────────────────────────
function slide25_roadmap() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '기술 로드맵: 지금부터 36개월까지 단계별 실행 계획');

  const phases = [
    {
      label: '0~3개월\n즉시 실행',
      color: 'CB4335',
      bg: 'FDEDEC',
      items: [
        '• AI 코딩 도구 파일럿 시작\n  (5~10명, 측정 기준 사전 정의)',
        '• AI 생성 코드 보안 스캔\n  파이프라인 CI/CD 통합',
        '• AI 거버넌스 정책 v1 수립\n  (Shadow AI, 데이터 입력 기준, IP)',
        '• [개인] AI 도구 일상화 +\n  비판적 검토 습관 형성',
      ],
    },
    {
      label: '3~12개월\n제한적 실험',
      color: '1A5276',
      bg: 'EBF5FB',
      items: [
        '• SDLC 전 주기 AI 통합\n  (요구사항→설계→코딩→테스트→배포)',
        '• 에이전틱 코딩 제한적 실험\n  (반복 피처 개발, CI/CD 자동화)',
        '• 역할 재정의 설계 착수\n  (AI 오케스트레이터, 코드 검토 전문가)',
        '• EU AI Act 대응 컴플라이언스\n  체계 구축 (EU 시장 대상 기업)',
      ],
    },
    {
      label: '12~36개월\n조건부 확장',
      color: '1E8449',
      bg: 'EAFAF1',
      items: [
        '• 멀티에이전트 파이프라인 조건부\n  도입 (SWE-bench 실세계 60%+ 확인 시)',
        '• 조직 구조 조정 (소규모 AI-증강\n  팀, 관리 레이어 재정의)',
        '• 오픈소스 모델 자체 호스팅\n  평가 (비용/보안/성능 삼각 검토)',
        '• 비개발 부서 AI 리터러시\n  프로그램 전사 확산',
      ],
    },
  ];

  // 타임라인 가로 화살표 라인
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 2.15, w: 12.13, h: 0.06,
    fill: { color: 'BDC3C7' },
    line: { color: 'BDC3C7', width: 0 },
  });

  const phaseW = 3.85;
  const phaseH = 4.55;
  const phaseGap = 0.2;

  phases.forEach((phase, i) => {
    const px = 0.6 + i * (phaseW + phaseGap);
    const py = 1.95;

    // 헤더
    slide.addShape(pptx.ShapeType.rect, {
      x: px, y: py, w: phaseW, h: 0.7,
      fill: { color: phase.color },
      line: { color: phase.color, width: 0 },
    });
    slide.addText(phase.label, {
      x: px + 0.1, y: py + 0.04, w: phaseW - 0.15, h: 0.62,
      fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle',
    });

    // 타임라인 점
    slide.addShape(pptx.ShapeType.ellipse, {
      x: px + phaseW / 2 - 0.13, y: 2.09, w: 0.26, h: 0.26,
      fill: { color: phase.color },
      line: { color: 'FFFFFF', width: 1.5 },
    });

    // 내용 박스
    slide.addShape(pptx.ShapeType.rect, {
      x: px, y: py + 0.7, w: phaseW, h: phaseH - 0.7,
      fill: { color: phase.bg },
      line: { color: phase.color, width: 1 },
    });

    phase.items.forEach((item, j) => {
      slide.addText(item, {
        x: px + 0.12, y: py + 0.8 + j * 0.9, w: phaseW - 0.22, h: 0.85,
        fontSize: 9, color: COLORS.textBody, wrap: true, valign: 'top',
      });
    });
  });

  slide.addText('출처: 00-synthesis.md §10', {
    x: 0.6, y: 7.15, w: 12.13, h: 0.22,
    fontSize: 8, color: COLORS.textSub, italic: true,
  });

  addPageNumber(slide, 25, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 26: [TwoColumn] 한국 기업의 '시범 도입 함정'
// ─────────────────────────────────────────────────────────────
function slide26_korea_context() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '한국 기업은 "시범 도입의 함정"에서 벗어나야 한다');

  // 왼쪽: 현황
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 1.82, w: 5.8, h: 0.4,
    fill: { color: '922B21' },
    line: { color: '922B21', width: 0 },
  });
  slide.addText('현황 — 시범 도입에 머무른 한국 기업', {
    x: 0.7, y: 1.84, w: 5.6, h: 0.36,
    fontSize: 11, bold: true, color: 'FFFFFF',
  });

  const koreaStats = [
    { label: 'AI 도구 도입률', value: '55.7~80%', note: '수치는 높지만 전사 내재화는 미미' },
    { label: '전사 내재화 기업', value: '6.7%', note: '도입과 내재화 사이 큰 간극' },
    { label: 'AI 로드맵 보유 기업', value: '15.5%', note: '전략 없는 도입이 대부분' },
    { label: '대기업 신입 공채 축소', value: '31%', note: 'AI 네이티브 경력직 전환 중' },
    { label: '개발자 규모', value: '266만 명', note: 'AI 리터러시 수준 미측정' },
  ];

  koreaStats.forEach((stat, i) => {
    const sy = 2.32 + i * 0.82;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: sy, w: 5.8, h: 0.72,
      fill: { color: i % 2 === 0 ? 'FDEDEC' : 'FDFEFE' },
      line: { color: 'E6B0AA', width: 0.5 },
    });
    slide.addText(stat.label, {
      x: 0.7, y: sy + 0.06, w: 2.8, h: 0.28,
      fontSize: 9.5, color: COLORS.textSub,
    });
    slide.addText(stat.value, {
      x: 0.7, y: sy + 0.34, w: 2.3, h: 0.32,
      fontSize: 18, bold: true, color: '922B21',
    });
    slide.addText(stat.note, {
      x: 3.1, y: sy + 0.1, w: 3.2, h: 0.52,
      fontSize: 8.5, color: COLORS.textSub, wrap: true, valign: 'middle', italic: true,
    });
  });

  // 오른쪽: 즉시 실행 권고
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.7, y: 1.82, w: 6.03, h: 0.4,
    fill: { color: '1A5276' },
    line: { color: '1A5276', width: 0 },
  });
  slide.addText('즉시 실행 3원칙', {
    x: 6.8, y: 1.84, w: 5.8, h: 0.36,
    fontSize: 11, bold: true, color: 'FFFFFF',
  });

  const actions = [
    {
      num: '01',
      title: '파일럿 즉시 시작',
      detail: '5~10명 팀으로 Cursor/Copilot 파일럿을 즉시 시작하라. 준비가 완벽해질 때까지 기다리지 말라. 3개월 후 학습만으로도 경쟁력 격차가 벌어진다.',
      color: '2E86C1',
    },
    {
      num: '02',
      title: '거버넌스 선행',
      detail: '도구 확산 전에 보안 가이드라인, 데이터 입력 기준, IP 책임을 명확히 하라. Shadow AI는 이미 진행 중이며 관리되지 않으면 데이터 유출 경로가 된다.',
      color: '1A5276',
    },
    {
      num: '03',
      title: '성과 측정 기준 전환',
      detail: '"코드 생성량" 대신 출시 주기 단축, 버그 발생률 감소, 개발자 만족도로 측정하라. 잘못된 지표는 AI 도구 효과를 왜곡하고 잘못된 의사결정으로 이어진다.',
      color: '117A65',
    },
  ];

  actions.forEach((action, i) => {
    const ay = 2.32 + i * 1.52;
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.7, y: ay, w: 6.03, h: 1.42,
      fill: { color: 'EBF5FB' },
      line: { color: action.color, width: 1.5 },
    });
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 6.78, y: ay + 0.1, w: 0.5, h: 0.5,
      fill: { color: action.color },
      line: { color: action.color, width: 0 },
    });
    slide.addText(action.num, {
      x: 6.78, y: ay + 0.1, w: 0.5, h: 0.5,
      fontSize: 10, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle',
    });
    slide.addText(action.title, {
      x: 7.38, y: ay + 0.1, w: 5.2, h: 0.34,
      fontSize: 11, bold: true, color: action.color,
    });
    slide.addText(action.detail, {
      x: 6.8, y: ay + 0.52, w: 5.8, h: 0.82,
      fontSize: 9, color: COLORS.textBody, wrap: true,
    });
  });

  slide.addText('출처: 00-synthesis.md — 한국 맥락 특수 고려', {
    x: 0.6, y: 7.15, w: 12.13, h: 0.22,
    fontSize: 8, color: COLORS.textSub, italic: true,
  });

  addPageNumber(slide, 26, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 27: [Table] 오판 리스크 + 모니터링 지표
// ─────────────────────────────────────────────────────────────
function slide27_risk_monitoring() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '이 판단이 틀렸을 때 무엇을 잃는가 — 오판 리스크와 모니터링 지표');

  // 가장 위험한 오판 박스
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 1.78, w: 12.13, h: 0.55,
    fill: { color: '922B21' },
    line: { color: '922B21', width: 0 },
  });
  slide.addText(
    '⚠ 가장 위험한 오판: "AI 도구가 보조 수준에 머물 것"이라 판단하여 아무것도 하지 않는 것\n→ 시나리오 D(기술 정체) 확률은 10~15%에 불과. 나머지 85~90%에서는 AI 준비가 경쟁력을 좌우한다.',
    {
      x: 0.75, y: 1.8, w: 11.85, h: 0.5,
      fontSize: 10, bold: true, color: 'FFFFFF', valign: 'middle',
    }
  );

  // 왼쪽: 오판 리스크 테이블
  slide.addText('5대 오판 리스크', {
    x: 0.6, y: 2.42, w: 5.8, h: 0.3,
    fontSize: 10.5, bold: true, color: COLORS.primary,
  });

  const risks = [
    ['제한적 도입', 'AI가 예상보다 빨리 성숙', '경쟁사 대비 뒤처짐'],
    ['에이전틱 적극 투자', '기술 정체(시나리오 D)', '과잉 투자 손실'],
    ['주니어 채용 축소', '소프트웨어 수요 폭발', '인재 파이프라인 고갈'],
    ['AI 도구 사용 제한', '보안 도구 빠른 성숙', '불필요한 혁신 지연'],
    ['관망 (전사 확산 지연)', '글로벌 AI-first 전환', '경쟁력 격차 확대'],
  ];

  const riskHeader = [
    [
      { text: '판단', options: { bold: true, color: 'FFFFFF', fill: { color: COLORS.primary }, fontSize: 9.5, align: 'center' } },
      { text: '틀릴 경우 상황', options: { bold: true, color: 'FFFFFF', fill: { color: COLORS.primary }, fontSize: 9.5, align: 'center' } },
      { text: '손실', options: { bold: true, color: 'FFFFFF', fill: { color: COLORS.primary }, fontSize: 9.5, align: 'center' } },
    ],
    ...risks.map((r, i) => [
      { text: r[0], options: { fontSize: 9, color: COLORS.textBody, fill: { color: i % 2 === 0 ? 'F4F6F7' : 'FFFFFF' }, valign: 'middle' } },
      { text: r[1], options: { fontSize: 9, color: COLORS.textSub, fill: { color: i % 2 === 0 ? 'F4F6F7' : 'FFFFFF' }, valign: 'middle' } },
      { text: r[2], options: { fontSize: 9, color: 'CB4335', fill: { color: i % 2 === 0 ? 'F4F6F7' : 'FFFFFF' }, valign: 'middle', bold: true } },
    ]),
  ];

  slide.addTable(riskHeader, {
    x: 0.6, y: 2.75, w: 5.8,
    rowH: 0.52,
    colW: [1.5, 2.3, 2.0],
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    autoPage: false,
  });

  // 오른쪽: 모니터링 선행지표
  slide.addText('7대 선행지표 + 전환 트리거', {
    x: 6.7, y: 2.42, w: 6.03, h: 0.3,
    fontSize: 10.5, bold: true, color: COLORS.primary,
  });

  const indicators = [
    { label: 'SWE-bench 실세계 점수', trigger: '60%+ 달성 시 → 에이전틱 코딩 본격 도입' },
    { label: 'Fortune 500 AI 코드 보안 사고', trigger: '발생 시 → 거버넌스 가속, 에이전틱 감속' },
    { label: 'AI 도구 구독 해지율', trigger: '20%+ 시 → 투자 재검토, ROI 측정 강화' },
    { label: '주니어 개발자 채용 비율', trigger: '30%+ 감소 지속 → 교육 프로그램 강화' },
    { label: 'Gartner Hype Cycle 위치', trigger: '환멸 단계 진입 시 → 기대 수준 재조정' },
    { label: '오픈소스 vs 상용 벤치마크 격차', trigger: '오픈소스 정기 추월 → 자체 호스팅 검토' },
    { label: 'EU AI Act 최초 대규모 벌금', trigger: '발생 시 → 컴플라이언스 체계 점검' },
  ];

  indicators.forEach((ind, i) => {
    const iy = 2.75 + i * 0.62;
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.7, y: iy, w: 6.03, h: 0.57,
      fill: { color: i % 2 === 0 ? 'F4F6F7' : 'FFFFFF' },
      line: { color: 'CCCCCC', width: 0.5 },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.7, y: iy, w: 0.18, h: 0.57,
      fill: { color: '2E86C1' },
      line: { color: '2E86C1', width: 0 },
    });
    slide.addText(ind.label, {
      x: 6.95, y: iy + 0.04, w: 5.7, h: 0.24,
      fontSize: 9, bold: true, color: COLORS.textBody,
    });
    slide.addText('→ ' + ind.trigger, {
      x: 6.95, y: iy + 0.3, w: 5.7, h: 0.22,
      fontSize: 8.5, color: COLORS.textSub,
    });
  });

  slide.addText('출처: 00-synthesis.md §9, §11', {
    x: 0.6, y: 7.15, w: 12.13, h: 0.22,
    fontSize: 8, color: COLORS.textSub, italic: true,
  });

  addPageNumber(slide, 27, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 28: [Closing] 핵심 메시지 + 행동 촉구
// ─────────────────────────────────────────────────────────────
function slide28_closing() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'AI 도구는 이미 왔다. 문제는 "도입 여부"가 아니라 "통제된 도입"이다');

  // 부제
  slide.addText('5가지 핵심 발견 요약', {
    x: 0.6, y: 1.72, w: 12.13, h: 0.32,
    fontSize: 11.5, bold: true, color: COLORS.primary,
  });

  // 핵심 메시지 5개 — 번호 원 + 텍스트
  const messages = [
    {
      title: 'AI 생산성은 조건부',
      body: '단순 과제 +30~50%, 조직 수준은 프로세스 변화 없이 10~15%가 상한. 도구만 도입하면 안정성이 오히려 7.2% 저하될 수 있다.',
    },
    {
      title: '진짜 병목은 기술이 아니라 거버넌스·프로세스',
      body: '95%가 사용 중임에도 전사 내재화 6.7%. 채택의 장벽은 도구 품질이 아니라 조직 거버넌스와 프로세스 재설계다.',
    },
    {
      title: '수혜 귀속이 비대칭적이다',
      body: '최대 수혜자: 플랫폼 제공자 > AI 조기 채택 대기업 > 시니어 개발자. 주니어 개발자는 기회 자체가 축소 중이며 역할 재정의가 시급하다.',
    },
    {
      title: '4개 시나리오 중 "점진적 통합"이 50~60%',
      body: '그러나 나머지 40~50%도 무시 불가. 기준 시나리오 중심 설계 + 규제·정체 방어 내장 + 수요폭발 업사이드 유지가 최선의 포트폴리오 전략이다.',
    },
    {
      title: '가장 위험한 오판은 "아무것도 하지 않는 것"',
      body: '기술 정체(시나리오 D) 확률은 10~15%에 불과. 지금 파일럿을 시작하지 않으면 3개월 후 경쟁사와 학습 격차가 돌이킬 수 없이 벌어진다.',
    },
  ];

  const msgColors = ['2E86C1', '1E8449', '8E44AD', 'B7950B', 'CB4335'];

  messages.forEach((msg, i) => {
    const my = 2.12 + i * 0.95;
    const mc = msgColors[i];

    // 번호 원
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.6, y: my, w: 0.46, h: 0.46,
      fill: { color: mc },
      line: { color: mc, width: 0 },
    });
    slide.addText(String(i + 1), {
      x: 0.6, y: my, w: 0.46, h: 0.46,
      fontSize: 13, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle',
    });

    // 배경
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.18, y: my, w: 11.55, h: 0.82,
      fill: { color: 'F8F9FA' },
      line: { color: mc, width: 1 },
    });
    // 좌측 강조 바
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.18, y: my, w: 0.14, h: 0.82,
      fill: { color: mc },
      line: { color: mc, width: 0 },
    });

    slide.addText(msg.title, {
      x: 1.4, y: my + 0.06, w: 11.2, h: 0.28,
      fontSize: 10.5, bold: true, color: mc,
    });
    slide.addText(msg.body, {
      x: 1.4, y: my + 0.38, w: 11.2, h: 0.38,
      fontSize: 9, color: COLORS.textBody, wrap: true,
    });
  });

  // 행동 촉구 하단 바
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 6.88, w: 12.13, h: 0.52,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, width: 0 },
  });
  slide.addText(
    '지금 할 것:  파일럿 시작  |  거버넌스 수립  |  프로세스 재설계  |  역할 재정의 설계  |  선행지표 모니터링',
    {
      x: 0.7, y: 6.9, w: 12.0, h: 0.48,
      fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle',
    }
  );

  // 페이지 번호 — Closing 슬라이드에도 추가
  addPageNumber(slide, 28, TOTAL_SLIDES);
}

// ============================================================
// 실행: 전체 슬라이드 호출
// ============================================================

// Part A
slide01_title();
slide02_section_part1();
slide03_timeline();
slide04_market3();
slide05_kpi_adoption();
slide06_agent_ecosystem();
slide07_section_part2();
slide08_productivity_paradox();
slide09_org_productivity();
slide10_trust_paradox();

// Part B
slide11_security_debt();
slide12_dora_amplifier();
slide13_asymmetric_benefit();
slide14_section_future_work();
slide15_team_shrinking();
slide16_junior_vs_total();
slide17_role_transition();
slide18_industry_spread();
slide19_section_preparation();

// Part C
slide20_scenarios();
slide21_scenario_comparison();
slide22_strategy_options();
slide23_process_redesign();
slide24_individual_strategy();
slide25_roadmap();
slide26_korea_context();
slide27_risk_monitoring();
slide28_closing();

pptx.writeFile({
  fileName: 'presentation-build/2026-03-25-ai-dev-tools-future-workplace/AI-Dev-Tools-Future-Workplace.pptx'
})
  .then(() => console.log('생성 완료: AI-Dev-Tools-Future-Workplace.pptx'))
  .catch(err => console.error('오류:', err));
