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
  accent_purple: '8B5CF6'
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

// Part A는 여기까지. Part B·C·D에서 pptx.writeFile()을 호출한다.
module.exports = { pptx };

// === Part A 끝 ===
