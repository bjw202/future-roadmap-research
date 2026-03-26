// === DX사업부 공정 R&D AI 로드맵 프레젠테이션 ===
// === 합치기: 2026-03-25 ===

'use strict';

// ===== Part 1: 초기화 + 상수 + 헬퍼 + 슬라이드 1~10 =====


'use strict';

const PptxGenJS = require('pptxgenjs');
const path = require('path');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';

const TOTAL_SLIDES = 28;

// ===== 색상 상수 =====
const COLORS = {
  bg_primary:    'FFFFFF',
  bg_secondary:  'F7F8FC',
  bg_dark:       '1A1F36',
  text_primary:  '1A1F36',
  text_secondary:'4A5568',
  text_tertiary: '9CA3AF',
  text_on_dark:  'FFFFFF',
  accent_blue:   '4A7BF7',
  accent_cyan:   '00D4AA',
  accent_yellow: 'FFB020',
  accent_red:    'FF6B6B',
  accent_purple: '8B5CF6'
};

// ===== 폰트 상수 =====
const FONTS = {
  title:    { fontFace: 'Pretendard ExtraBold', bold: true },
  subtitle: { fontFace: 'Pretendard SemiBold',  bold: true },
  body:     { fontFace: 'Pretendard',            bold: false },
  caption:  { fontFace: 'Pretendard Light',      bold: false },
  serif:    { fontFace: 'ChosunNm',              bold: false },
  kpi:      { fontFace: 'Pretendard Black',      bold: true },
  deco:     { fontFace: 'Pretendard Thin',        bold: false }
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
    valAxisLabelColor: COLORS.text_tertiary
  },
  colors: ['4A7BF7', '00D4AA', 'FFB020', 'FF6B6B', '8B5CF6', '38BDF8']
};

// ===== 레이아웃 상수 =====
// 2x2 카드 그리드
const CARD_2X2 = {
  w: 5.915, h: 2.45, gap: 0.3,
  positions: [
    { x: 0.6,   y: 1.8  },
    { x: 6.815, y: 1.8  },
    { x: 0.6,   y: 4.55 },
    { x: 6.815, y: 4.55 }
  ]
};

// 2x3 카드 그리드
const CARD_2X3 = {
  w: 3.843, h: 2.45, gap: 0.3,
  positions: [
    { x: 0.6,   y: 1.8  },
    { x: 4.743, y: 1.8  },
    { x: 8.886, y: 1.8  },
    { x: 0.6,   y: 4.55 },
    { x: 4.743, y: 4.55 },
    { x: 8.886, y: 4.55 }
  ]
};

// 2단 컬럼 상수
const COL_W     = 5.865;
const COL_GAP   = 0.4;
const COL_LEFT_X  = 0.6;
const COL_RIGHT_X = COL_LEFT_X + COL_W + COL_GAP; // 6.865

// ===================================================================
// 헬퍼 함수
// ===================================================================

/**
 * addTitleBar — 표준 제목 바 (accent 라인 + 제목 + 선택적 부제목)
 */
function addTitleBar(slide, title, subtitle) {
  slide.addShape('rect', {
    x: 0.6, y: 0.5, w: 1.2, h: 0.06,
    fill: { color: COLORS.accent_blue }
  });
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

/**
 * addStyledTable — 디자인 테이블 (홀짝 행 교대 배경)
 */
function addStyledTable(slide, headers, dataRows, opts) {
  opts = opts || {};
  const rows = [];
  rows.push(headers.map(function(h) {
    return { text: h, options: Object.assign({}, TABLE_STYLE.header) };
  }));
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

/**
 * addTitledTable — colspan 제목 포함 테이블
 */
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

/**
 * addStyledChart — 디자인 차트
 * pptx는 전역 변수로 접근
 */
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
    defaults.barGapWidthPct       = 80;
    defaults.catAxisOrientation   = 'minMax';
    defaults.valAxisOrientation   = 'minMax';
  }
  if (type === 'LINE') {
    defaults.lineDataSymbol     = 'circle';
    defaults.lineDataSymbolSize = 8;
    defaults.lineSmooth         = false;
  }
  if (type === 'PIE' || type === 'DOUGHNUT') {
    defaults.showPercent = true;
    defaults.showLegend  = true;
    defaults.legendPos   = 'b';
    defaults.chartColors = CHART_STYLE.colors.slice(0, (chartData[0] && chartData[0].values && chartData[0].values.length) || 6);
  }
  slide.addChart(typeMap[type], chartData, defaults);
}

/**
 * addCard — 카드 컴포넌트
 * shadow 속성 제거 (OOXML 호환성 규칙)
 */
function addCard(slide, opts) {
  const x = opts.x, y = opts.y, w = opts.w, h = opts.h;
  const title = opts.title, body = opts.body;
  const accentColor = opts.accentColor || COLORS.accent_blue;

  slide.addShape('roundRect', {
    x: x, y: y, w: w, h: h, rectRadius: 0.1,
    fill: { color: 'FFFFFF' }
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

/**
 * addPageNumber — 페이지 번호
 */
function addPageNumber(slide, num, total) {
  slide.addText(num + ' / ' + total, {
    x: 12.0, y: 7.05, w: 1.0, h: 0.3,
    fontSize: 9, fontFace: 'Pretendard',
    color: COLORS.text_tertiary, align: 'right'
  });
}

// ===================================================================
// 슬라이드 함수 01 ~ 10
// ===================================================================

/**
 * [01] Title — AI 시대, 공정 R&D 조직은 어디로 가야 하는가
 * 표지/섹션 → 페이지 번호 없음
 */
function slide01_title() {
  const slide = pptx.addSlide();

  // 풀블리드 다크 배경
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 우측 상단 장식 — 희미한 큰 원
  slide.addShape('ellipse', {
    x: 9.5, y: -1.5, w: 5.0, h: 5.0,
    fill: { color: '4A7BF7' }, transparency: 88
  });

  // accent 라인 (cyan)
  slide.addShape('rect', {
    x: 1.5, y: 2.3, w: 1.5, h: 0.06,
    fill: { color: COLORS.accent_cyan }
  });

  // 메인 제목
  slide.addText('AI 시대, 공정 R&D 조직은 어디로 가야 하는가', {
    x: 1.5, y: 2.5, w: 10.33, h: 1.2,
    fontSize: 44, fontFace: FONTS.title.fontFace, bold: true,
    color: COLORS.text_on_dark,
    charSpacing: -0.5, lineSpacingMultiple: 1.1
  });

  // 부제목
  slide.addText('삼성전자 DX사업부 제조공정 개발 조직의 전략 방향', {
    x: 1.5, y: 3.8, w: 10.33, h: 0.6,
    fontSize: 20, fontFace: 'Pretendard',
    color: 'FFFFFF', transparency: 30
  });

  // 발표자/날짜
  slide.addText('Strategy Research Team  |  2026.03.25', {
    x: 1.5, y: 6.0, w: 10.33, h: 0.4,
    fontSize: 14, fontFace: 'Pretendard',
    color: 'FFFFFF', transparency: 50
  });
}

/**
 * [02] Content — 오늘 이야기의 핵심: 5가지 판단
 */
function slide02_agenda() {
  const slide = pptx.addSlide();

  // 배경
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  addTitleBar(slide, '오늘 이야기의 핵심: 5가지 판단');

  const bullets = [
    '기술은 이미 준비됐다 — 진짜 문제는 다른 곳에 있다',
    '경쟁사는 이미 움직이고 있다 — 우리의 창은 좁아지고 있다',
    'DX만의 구조적 제약을 직시해야 한다',
    '데이터 정비와 파일럿부터 시작하라 — 전사 일괄 전환은 금물',
    '도구보다 사람이 먼저다'
  ];

  // 번호 + 텍스트 조합으로 읽기 쉽게 배치
  const accentColors = [
    COLORS.accent_blue,
    COLORS.accent_cyan,
    COLORS.accent_yellow,
    COLORS.accent_red,
    COLORS.accent_purple
  ];

  bullets.forEach(function(text, i) {
    const yBase = 1.9 + i * 0.95;

    // 번호 원형 배지
    slide.addShape('ellipse', {
      x: 0.6, y: yBase + 0.05, w: 0.42, h: 0.42,
      fill: { color: accentColors[i] }
    });
    slide.addText(String(i + 1), {
      x: 0.6, y: yBase + 0.05, w: 0.42, h: 0.42,
      fontSize: 15, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    // 텍스트
    slide.addText(text, {
      x: 1.2, y: yBase, w: 11.5, h: 0.55,
      fontSize: 17, fontFace: FONTS.body.fontFace,
      color: COLORS.text_primary, valign: 'middle'
    });

    // 구분선 (마지막 제외)
    if (i < bullets.length - 1) {
      slide.addShape('rect', {
        x: 0.6, y: yBase + 0.7, w: 12.13, h: 0.01,
        fill: { color: 'E2E8F0' }
      });
    }
  });

  addPageNumber(slide, 2, TOTAL_SLIDES);
}

/**
 * [03] Section — 1. 무엇이 바뀌고 있는가
 * 섹션 디바이더 → 페이지 번호 없음
 */
function slide03_section1() {
  const slide = pptx.addSlide();

  // 좌 다크 패널
  slide.addShape('rect', {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 우 배경
  slide.addShape('rect', {
    x: 5.33, y: 0, w: 8.0, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  // 섹션 번호
  slide.addText('01', {
    x: 1.0, y: 2.5, w: 3.33, h: 1.5,
    fontSize: 72, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_cyan, align: 'center'
  });

  // 좌측 레이블
  slide.addText('SECTION', {
    x: 1.0, y: 4.1, w: 3.33, h: 0.4,
    fontSize: 11, fontFace: 'Pretendard',
    color: COLORS.text_on_dark, transparency: 40, align: 'center',
    charSpacing: 3
  });

  // 우측 섹션 제목
  slide.addText('무엇이 바뀌고 있는가', {
    x: 6.0, y: 2.5, w: 6.73, h: 0.8,
    fontSize: 36, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary
  });

  // 우측 설명
  slide.addText('AI가 제조 공정의 설계, 검증, 최적화 방식을 근본적으로 바꾸고 있다', {
    x: 6.0, y: 3.5, w: 6.73, h: 1.0,
    fontSize: 16, fontFace: 'Pretendard',
    color: COLORS.text_secondary,
    lineSpacingMultiple: 1.4
  });
}

/**
 * [04] KPI — AI 제조 시장은 3년 안에 3배로 커진다
 */
function slide04_kpi_market() {
  const slide = pptx.addSlide();

  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  addTitleBar(slide, 'AI 제조 시장은 3년 안에 3배로 커진다');

  // KPI 데이터
  const kpis = [
    {
      value:   '$438억 → $1,539억',
      label:   '글로벌 AI 제조 시장',
      sub:     '2024→2030, CAGR 23%',
      color:   COLORS.accent_blue
    },
    {
      value:   '$34억 → $188억',
      label:   '디지털 트윈 시장',
      sub:     '2024→2034, CAGR 18.6%',
      color:   COLORS.accent_cyan
    },
    {
      value:   '$4.7억 → $50억',
      label:   '생성형 AI 제조 시장',
      sub:     '2026→2034',
      color:   COLORS.accent_yellow
    }
  ];

  const cardW = 3.7;
  const cardH = 3.2;
  const xStarts = [0.6, 4.65, 8.7];
  const cardY   = 2.2;

  kpis.forEach(function(kpi, i) {
    const x = xStarts[i];

    // 카드 배경
    slide.addShape('roundRect', {
      x: x, y: cardY, w: cardW, h: cardH, rectRadius: 0.1,
      fill: { color: COLORS.bg_secondary }
    });

    // 상단 accent 라인
    slide.addShape('rect', {
      x: x + 0.02, y: cardY, w: cardW - 0.04, h: 0.06,
      fill: { color: kpi.color }
    });

    // KPI 값
    slide.addText(kpi.value, {
      x: x + 0.15, y: cardY + 0.25, w: cardW - 0.3, h: 1.1,
      fontSize: 26, fontFace: FONTS.kpi.fontFace, bold: true,
      color: kpi.color, align: 'center',
      lineSpacingMultiple: 1.1, autoFit: true
    });

    // 화살표 아이콘 영역 — 구분선
    slide.addShape('rect', {
      x: x + 0.15, y: cardY + 1.45, w: cardW - 0.3, h: 0.01,
      fill: { color: 'E2E8F0' }
    });

    // KPI 라벨
    slide.addText(kpi.label, {
      x: x + 0.15, y: cardY + 1.6, w: cardW - 0.3, h: 0.45,
      fontSize: 14, fontFace: 'Pretendard', bold: true,
      color: COLORS.text_primary, align: 'center'
    });

    // KPI 설명
    slide.addText(kpi.sub, {
      x: x + 0.15, y: cardY + 2.1, w: cardW - 0.3, h: 0.35,
      fontSize: 12, fontFace: 'Pretendard',
      color: COLORS.text_tertiary, align: 'center'
    });
  });

  // 하단 출처 주석
  slide.addText('출처: MarketsandMarkets, Grand View Research, IDC (2024~2025)', {
    x: 0.6, y: 6.6, w: 12.13, h: 0.3,
    fontSize: 10, fontFace: 'Pretendard',
    color: COLORS.text_tertiary
  });

  addPageNumber(slide, 4, TOTAL_SLIDES);
}

/**
 * [05] Cards (2x2) — 7가지 기술이 공정 R&D를 바꾸고 있다 (핵심 4개)
 */
function slide05_tech_cards() {
  const slide = pptx.addSlide();

  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  addTitleBar(slide, '7가지 기술이 공정 R&D를 바꾸고 있다');

  const cards = [
    {
      title: '디지털 트윈',
      body:  '제품을 만들기 전에 컴퓨터에서 먼저 만들어보는 것. 시뮬레이션 시간 70% 단축. 지금 바로 쓸 수 있다.',
      color: COLORS.accent_blue
    },
    {
      title: 'AI 공정 최적화',
      body:  '최적의 제조 조건을 AI가 찾아준다. 기존 실험 횟수를 절반 이하로 줄일 수 있다. 가장 성숙한 기술.',
      color: COLORS.accent_cyan
    },
    {
      title: '소재 AI (Materials Informatics)',
      body:  '새로운 소재를 AI가 설계한다. 아직 실험실 단계이지만, 2~3년 후 판도가 바뀔 수 있다.',
      color: COLORS.accent_yellow
    },
    {
      title: 'AI 로보틱스',
      body:  '정밀 조립을 로봇이 대신한다. 위치 정확도 70% 향상, 에너지 38% 절감. 삼성도 2030 로봇 전략 발표.',
      color: COLORS.accent_red
    }
  ];

  CARD_2X2.positions.forEach(function(pos, i) {
    if (i >= cards.length) return;
    addCard(slide, {
      x: pos.x, y: pos.y, w: CARD_2X2.w, h: CARD_2X2.h,
      title: cards[i].title,
      body:  cards[i].body,
      accentColor: cards[i].color
    });
  });

  addPageNumber(slide, 5, TOTAL_SLIDES);
}

/**
 * [06] Table — 기술마다 '지금 쓸 수 있는 것'과 '아직 먼 것'이 다르다
 */
function slide06_tech_readiness_table() {
  const slide = pptx.addSlide();

  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  addTitleBar(slide, "기술마다 '지금 쓸 수 있는 것'과 '아직 먼 것'이 다르다");

  const headers = ['기술', '성숙도', '스마트폰', 'TV/가전', '지금 시작?'];

  // 성숙도 색상 매핑 헬퍼
  function maturityOpts(stars) {
    const color = stars === '★★★' ? '27AE60' : (stars === '★★' ? 'FFB020' : 'FF6B6B');
    return { fontFace: 'Pretendard', fontSize: 12, bold: true, color: color, align: 'center', valign: 'middle' };
  }

  // 지금시작 색상 헬퍼
  function startOpts(val) {
    const color = val === '즉시 가능' ? '27AE60' : (val === '아직 이름' ? 'FF6B6B' : COLORS.text_secondary);
    return { fontFace: 'Pretendard', fontSize: 11, color: color, align: 'center', valign: 'middle' };
  }

  const data = [
    ['디지털 트윈',     { text: '★★★', options: maturityOpts('★★★') }, '높음', '높음', { text: '즉시 가능', options: startOpts('즉시 가능') }],
    ['AI 공정 최적화',  { text: '★★★', options: maturityOpts('★★★') }, '높음', '높음', { text: '즉시 가능', options: startOpts('즉시 가능') }],
    ['생성적 설계',     { text: '★★',  options: maturityOpts('★★')  }, '중간', '높음', { text: '금형/지그 한정', options: startOpts('금형/지그 한정') }],
    ['소재 AI',        { text: '★★',  options: maturityOpts('★★')  }, '높음', '중간', { text: '모니터링', options: startOpts('모니터링') }],
    ['Physics-ML',    { text: '★★',  options: maturityOpts('★★')  }, '높음', '높음', { text: '파일럿 가능', options: startOpts('파일럿 가능') }],
    ['AI 로보틱스',    { text: '★★★', options: maturityOpts('★★★') }, '높음', '중간', { text: '즉시 가능', options: startOpts('즉시 가능') }],
    ['대규모 AI 모델', { text: '★',   options: maturityOpts('★')   }, '중간', '중간', { text: '아직 이름', options: startOpts('아직 이름') }]
  ];

  // rowH 동적 계산: (7.0 - 1.8 - 0.4) / (7 + 1) = 4.8 / 8 = 0.6
  const rowH = 0.6;

  addStyledTable(slide, headers, data, {
    x: 0.6, y: 1.8, w: 12.13,
    rowH: rowH,
    colW: [2.6, 1.5, 1.8, 1.8, 2.83]
  });

  addPageNumber(slide, 6, TOTAL_SLIDES);
}

/**
 * [07] Content — 삼성도 2030 AI Factory를 선언했다 — 그런데 공정 R&D는?
 */
function slide07_samsung_ai_factory() {
  const slide = pptx.addSlide();

  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  addTitleBar(slide, '삼성도 2030 AI Factory를 선언했다 — 그런데 공정 R&D는?');

  const items = [
    { text: '2026.03 MWC: 2030년까지 전 공장 AI-Driven Factory 전환 공식 발표', highlight: true },
    { text: 'NVIDIA와 AI Megafactory 협력: 5만+ GPU, Omniverse 디지털 트윈', highlight: false },
    { text: "그런데: 이 전략은 '생산 운영' 자동화에 집중", highlight: false },
    { text: "공정 R&D(새로운 제조법을 개발하는 일)에 대한 별도 전략은 아직 보이지 않는다", highlight: false },
    { text: "핵심 질문: 공정을 '운영'하는 AI와 공정을 '개발'하는 AI는 다른 문제다", highlight: true }
  ];

  const highlightColor = COLORS.accent_blue;

  items.forEach(function(item, i) {
    const yBase = 1.9 + i * 0.93;

    // 마커
    slide.addShape('ellipse', {
      x: 0.6, y: yBase + 0.1, w: 0.18, h: 0.18,
      fill: { color: item.highlight ? highlightColor : COLORS.text_tertiary }
    });

    slide.addText(item.text, {
      x: 1.0, y: yBase, w: 11.73, h: 0.55,
      fontSize: item.highlight ? 17 : 16,
      fontFace: item.highlight ? FONTS.subtitle.fontFace : FONTS.body.fontFace,
      bold: item.highlight,
      color: item.highlight ? COLORS.text_primary : COLORS.text_secondary,
      valign: 'middle'
    });

    // 구분선
    if (i < items.length - 1) {
      slide.addShape('rect', {
        x: 0.6, y: yBase + 0.68, w: 12.13, h: 0.01,
        fill: { color: 'E2E8F0' }
      });
    }
  });

  addPageNumber(slide, 7, TOTAL_SLIDES);
}

/**
 * [08] Section — 2. 왜 이것이 쉽지 않은가
 * 섹션 디바이더 → 페이지 번호 없음
 */
function slide08_section2() {
  const slide = pptx.addSlide();

  // 좌 다크 패널
  slide.addShape('rect', {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 우 배경
  slide.addShape('rect', {
    x: 5.33, y: 0, w: 8.0, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  // 섹션 번호
  slide.addText('02', {
    x: 1.0, y: 2.5, w: 3.33, h: 1.5,
    fontSize: 72, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_cyan, align: 'center'
  });

  // 좌측 레이블
  slide.addText('SECTION', {
    x: 1.0, y: 4.1, w: 3.33, h: 0.4,
    fontSize: 11, fontFace: 'Pretendard',
    color: COLORS.text_on_dark, transparency: 40, align: 'center',
    charSpacing: 3
  });

  // 우측 섹션 제목
  slide.addText('왜 이것이 쉽지 않은가', {
    x: 6.0, y: 2.5, w: 6.73, h: 0.8,
    fontSize: 36, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary
  });

  // 우측 설명
  slide.addText('기술은 충분하다. 진짜 장벽은 데이터, 조직, 그리고 제품 사이클에 있다', {
    x: 6.0, y: 3.5, w: 6.73, h: 1.0,
    fontSize: 16, fontFace: 'Pretendard',
    color: COLORS.text_secondary,
    lineSpacingMultiple: 1.4
  });
}

/**
 * [09] Cards (2x2) — 진짜 병목은 기술이 아니라 3가지 다른 곳에 있다
 */
function slide09_bottleneck_cards() {
  const slide = pptx.addSlide();

  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  addTitleBar(slide, '진짜 병목은 기술이 아니라 3가지 다른 곳에 있다');

  const cards = [
    {
      title: '데이터',
      body:  "공정 데이터가 제각각 흩어져 있다. 47%의 기업이 '데이터 품질'을 AI 실패 1위 원인으로 지목. 데이터 정비 없이 AI 도구를 사도 쓸 수 없다.",
      color: COLORS.accent_blue
    },
    {
      title: '조직',
      body:  '공정 엔지니어의 48%가 AI 역량 부족을 호소. 도구는 있는데 쓸 줄 아는 사람이 없다. 도구보다 사람이 먼저다.',
      color: COLORS.accent_yellow
    },
    {
      title: '제품 사이클',
      body:  '스마트폰 모델은 1~2년마다 바뀐다. AI가 배우기도 전에 공정이 바뀐다. 반도체나 자동차와 근본적으로 다른 DX만의 제약.',
      color: COLORS.accent_red
    },
    {
      title: '요약',
      body:  '기술 알고리즘은 충분히 발전했다. 이 세 가지 병목을 먼저 풀어야 기술이 작동한다.',
      color: COLORS.accent_cyan
    }
  ];

  CARD_2X2.positions.forEach(function(pos, i) {
    if (i >= cards.length) return;
    addCard(slide, {
      x: pos.x, y: pos.y, w: CARD_2X2.w, h: CARD_2X2.h,
      title: cards[i].title,
      body:  cards[i].body,
      accentColor: cards[i].color
    });
  });

  addPageNumber(slide, 9, TOTAL_SLIDES);
}

/**
 * [10] Content — DX만의 구조적 제약: 제품 사이클이 AI 학습을 방해한다
 */
function slide10_dx_cycle_constraint() {
  const slide = pptx.addSlide();

  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  addTitleBar(slide, 'DX만의 구조적 제약: 제품 사이클이 AI 학습을 방해한다');

  // 비교 테이블 형식으로 시각화
  const rows = [
    { category: '반도체',    cycle: '하나의 공정이 수년간 유지',  impact: 'AI가 충분히 학습 가능',            color: '27AE60' },
    { category: '자동차',    cycle: '모델 사이클 3~5년',          impact: '데이터 축적 여유 있음',            color: '27AE60' },
    { category: 'DX 스마트폰', cycle: '모델 사이클 1~2년',       impact: 'AI가 배우기 전에 공정이 바뀜 ⚠',  color: 'FF6B6B' }
  ];

  // 비교 카드
  rows.forEach(function(row, i) {
    const yBase = 1.85 + i * 1.2;

    slide.addShape('roundRect', {
      x: 0.6, y: yBase, w: 12.13, h: 1.05, rectRadius: 0.08,
      fill: { color: i === 2 ? 'FFF5F5' : COLORS.bg_secondary }
    });

    // 왼쪽 accent 바
    slide.addShape('rect', {
      x: 0.6, y: yBase, w: 0.05, h: 1.05,
      fill: { color: row.color }
    });

    // 카테고리 레이블
    slide.addText(row.category, {
      x: 0.85, y: yBase + 0.05, w: 2.5, h: 0.45,
      fontSize: 16, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, valign: 'middle'
    });

    // 사이클 정보
    slide.addText(row.cycle, {
      x: 3.5, y: yBase + 0.05, w: 4.2, h: 0.45,
      fontSize: 14, fontFace: 'Pretendard',
      color: COLORS.text_secondary, valign: 'middle'
    });

    // 영향
    slide.addText(row.impact, {
      x: 7.85, y: yBase + 0.05, w: 4.7, h: 0.45,
      fontSize: 14, fontFace: i === 2 ? FONTS.subtitle.fontFace : 'Pretendard',
      bold: i === 2,
      color: row.color, valign: 'middle'
    });
  });

  // 해법 강조 박스
  slide.addShape('roundRect', {
    x: 0.6, y: 5.45, w: 12.13, h: 1.25, rectRadius: 0.1,
    fill: { color: '4A7BF7' }, transparency: 90
  });

  slide.addShape('rect', {
    x: 0.6, y: 5.45, w: 0.05, h: 1.25,
    fill: { color: COLORS.accent_blue }
  });

  slide.addText('해법: 공정 플랫폼 공통화', {
    x: 0.85, y: 5.5, w: 11.73, h: 0.4,
    fontSize: 16, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_blue
  });

  slide.addText('제품은 바뀌어도 공통 공정 모듈은 유지. 이것이 안 되면 AI 투자 대비 효과(ROI)를 정당화하기 어렵다.', {
    x: 0.85, y: 5.92, w: 11.73, h: 0.6,
    fontSize: 14, fontFace: 'Pretendard',
    color: COLORS.text_secondary
  });

  addPageNumber(slide, 10, TOTAL_SLIDES);
}


// ===== Part 2: 슬라이드 11~19 =====


function slide11_kpi_failure_rate() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'AI 파일럿이 양산으로 이어지는 비율: 1%');

  const kpis = [
    {
      value: '1%',
      label: 'AI 제조 파일럿 → 양산 전환 성공률',
      desc: '출처: MIT NANDA 2025',
      accent: COLORS.accent_red,
    },
    {
      value: '95%',
      label: 'GenAI 파일럿 실패율',
      desc: '기술이 아니라 데이터/조직 문제\n출처: MIT NANDA 2025',
      accent: COLORS.accent_yellow,
    },
    {
      value: '47%',
      label: '데이터 품질을 AI 실패 1위 원인으로 꼽은 기업 비율',
      desc: '출처: Imubit',
      accent: COLORS.accent_blue,
    },
  ];

  const cardW = 3.7;
  const cardH = 3.2;
  const cardY = 2.2;
  const startXs = [0.6, 4.65, 8.7];

  kpis.forEach((kpi, i) => {
    const x = startXs[i];
    const y = cardY;

    // 카드 배경
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: cardW, h: cardH,
      fill: { color: COLORS.bg_secondary },
      line: { color: kpi.accent, width: 2 },
      rectRadius: 0.08,
    });

    // 상단 액센트 바
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: cardW, h: 0.07,
      fill: { color: kpi.accent },
      line: { type: 'none' },
    });

    // KPI 수치
    slide.addText(kpi.value, {
      x: x + 0.15,
      y: y + 0.2,
      w: cardW - 0.3,
      h: 1.2,
      fontSize: 48,
      fontFace: FONTS.kpi.fontFace,
      bold: FONTS.kpi.bold,
      color: kpi.accent,
      align: 'center',
      valign: 'middle',
    });

    // KPI 라벨
    slide.addText(kpi.label, {
      x: x + 0.15,
      y: y + 1.5,
      w: cardW - 0.3,
      h: 0.9,
      fontSize: 13,
      fontFace: FONTS.subtitle.fontFace,
      bold: FONTS.subtitle.bold,
      color: COLORS.text_primary,
      align: 'center',
      valign: 'top',
      wrap: true,
    });

    // KPI 설명
    slide.addText(kpi.desc, {
      x: x + 0.15,
      y: y + 2.5,
      w: cardW - 0.3,
      h: 0.6,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      bold: false,
      color: COLORS.text_tertiary,
      align: 'center',
      valign: 'top',
      wrap: true,
    });
  });

  addPageNumber(slide, 11, TOTAL_SLIDES);
}

function slide12_section_competitors() {
  const slide = pptx.addSlide();

  // 좌측 다크 패널
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark },
    line: { type: 'none' },
  });

  // 섹션 번호
  slide.addText('3', {
    x: 1.0, y: 2.5, w: 3.0, h: 1.4,
    fontSize: 72,
    fontFace: FONTS.kpi.fontFace,
    bold: FONTS.kpi.bold,
    color: COLORS.accent_cyan,
    align: 'left',
    valign: 'top',
  });

  // 섹션 제목
  slide.addText('경쟁사는\n이미 움직이고 있다', {
    x: 6.0, y: 2.5, w: 6.5, h: 2.0,
    fontSize: 36,
    fontFace: FONTS.title.fontFace,
    bold: FONTS.title.bold,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'top',
    wrap: true,
  });

  // 섹션 설명
  slide.addText(
    'Apple, LG, Foxconn, Bosch, Xiaomi —\n각자의 방식으로 공정 R&D를 전환 중이다',
    {
      x: 6.0, y: 4.65,
      w: 6.5, h: 1.2,
      fontSize: 16,
      fontFace: FONTS.body.fontFace,
      bold: false,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      wrap: true,
    }
  );
}

function slide13_apple_3d_printing() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'Apple: 3D 프린팅으로 공정 혁신의 새 기준을 세우다');

  const bullets = [
    'Watch Ultra 3 케이스 전량을 100% 재활용 티타늄 3D 프린팅으로 양산 (2025)',
    '원재료 50% 절감, 연간 400+ 톤 티타늄 절약',
    '핵심: 환경 목표가 공정 혁신의 강력한 동기로 작동',
    '"한 번만 하는 것이 아니라, 시스템이 작동하는 방식이 되도록 한다" — Apple VP',
    '시사점: 공정 R&D가 디자인·환경·공급망의 교차점으로 진화',
  ];

  bullets.forEach((text, i) => {
    const isInsight = text.startsWith('시사점');
    const isQuote = text.startsWith('"');

    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.6,
      y: 1.95 + i * 0.82,
      w: 0.18,
      h: 0.18,
      fill: { color: isInsight ? COLORS.accent_cyan : COLORS.accent_blue },
      line: { type: 'none' },
    });

    slide.addText(text, {
      x: 0.95,
      y: 1.87 + i * 0.82,
      w: 11.6,
      h: 0.7,
      fontSize: isInsight ? 15 : 14,
      fontFace: isQuote ? FONTS.serif : FONTS.body.fontFace,
      bold: isInsight ? true : false,
      italic: isQuote,
      color: isInsight ? COLORS.accent_cyan : COLORS.text_primary,
      align: 'left',
      valign: 'middle',
      wrap: true,
    });
  });

  addPageNumber(slide, 13, TOTAL_SLIDES);
}

function slide14_lg_process_ai() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'LG전자: 공정 AI를 만들고, 이제 외부에 팔기 시작했다');

  const bullets = [
    {
      text: 'Eng.AI 플랫폼: 3D 도면만 넣으면 품질 예측 — 검증 시간 99% 단축 (LG 자체 발표)',
      accent: COLORS.accent_blue,
    },
    {
      text: "생산기술원 내 '스마트팩토리솔루션센터' 신설 (2025 조직개편)",
      accent: COLORS.accent_blue,
    },
    {
      text: '스마트팩토리 외판 수주: 2024년 3,000억원 → 2025년 4,000억원 → 2030년 조 단위 목표',
      accent: COLORS.accent_cyan,
    },
    {
      text: '10년간 축적한 제조 데이터 770TB + 특허 1,000건이 핵심 자산',
      accent: COLORS.accent_blue,
    },
    {
      text: '시사점: 공정 역량이 비용이 아니라 수익원이 될 수 있다',
      accent: COLORS.accent_cyan,
      bold: true,
    },
    {
      text: '⚠ 주의: 수치는 LG 자체 발표, 독립 검증 없음',
      accent: COLORS.accent_yellow,
      small: true,
    },
  ];

  bullets.forEach((item, i) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.6,
      y: 1.98 + i * 0.76,
      w: 0.16,
      h: 0.16,
      fill: { color: item.accent },
      line: { type: 'none' },
    });

    slide.addText(item.text, {
      x: 0.95,
      y: 1.9 + i * 0.76,
      w: 11.6,
      h: 0.65,
      fontSize: item.small ? 11 : item.bold ? 15 : 13,
      fontFace: FONTS.body.fontFace,
      bold: item.bold || false,
      color: item.small ? COLORS.text_tertiary : item.bold ? item.accent : COLORS.text_primary,
      align: 'left',
      valign: 'middle',
      wrap: true,
    });
  });

  addPageNumber(slide, 14, TOTAL_SLIDES);
}

function slide15_global_players_cards() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '글로벌 플레이어들의 공통된 방향 3가지');

  const cards = [
    {
      title: 'Foxconn + Google',
      body: 'Alphabet 자회사 Intrinsic과 AI 로보틱스 합작법인 설립. 전자 조립 자동화의 표준 인프라를 만들겠다는 야심.',
      accentColor: COLORS.accent_blue,
    },
    {
      title: 'Bosch',
      body: "2027년까지 AI에 25억 유로(약 3.5조원) 투자. '에이전틱 AI'로 공장을 스스로 판단하는 시스템으로 전환.",
      accentColor: COLORS.accent_cyan,
    },
    {
      title: 'Siemens',
      body: "NVIDIA와 '산업용 AI 운영체제' 공동 개발. 공정 R&D 도구를 만드는 회사에서, 공정 R&D 인프라를 파는 회사로 전환.",
      accentColor: COLORS.accent_yellow,
    },
    {
      title: 'Xiaomi / BYD',
      body: '수직계열화 + AI 다크팩토리. 극한의 자동화로 원가 구조 자체를 재편. 비용 경쟁의 판을 바꾸려 한다.',
      accentColor: COLORS.accent_red,
    },
  ];

  cards.forEach((card, i) => {
    addCard(slide, {
      x: CARD_2X2.positions[i].x,
      y: CARD_2X2.positions[i].y,
      w: CARD_2X2.w,
      h: CARD_2X2.h,
      title: card.title,
      body: card.body,
      accentColor: card.accentColor,
    });
  });

  addPageNumber(slide, 15, TOTAL_SLIDES);
}

function slide16_competitor_table() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '경쟁사 전환 현황을 한눈에 보면');

  const headers = ['기업', '핵심 전략', 'AI 투자 규모', '조직 변화', '위협 수준'];
  const dataRows = [
    ['Apple', '소재+공정+환경 교차 혁신', '미공개', '기능 전문조직 유지', '높음'],
    ['LG전자', '공정 AI B2B 수익화', '미공개', '스마트팩토리 센터 신설', '중간'],
    ['Foxconn', 'AI 로보틱스 JV', '미공개', 'Intrinsic JV', '중간'],
    ['Bosch', '에이전틱 AI', '25억 유로', '그룹 AI 표준화', '낮음'],
    ['Siemens', '디지털 트윈 인프라', 'Altair 인수', 'ONE Tech Company', '간접'],
    ['Xiaomi', 'AI 다크팩토리', '5년 28조원(R&D 전체)', '수직계열화', '높음'],
    ['BYD', '수직계열+AI 품질관리', '미공개', '97% 자율운영(자체주장)', '중간'],
  ];

  addTitledTable(slide, '', headers, dataRows, {
    x: 0.6,
    y: 1.85,
    w: 12.13,
    colW: [1.4, 2.8, 2.1, 2.6, 1.23],
  });

  addPageNumber(slide, 16, TOTAL_SLIDES);
}

function slide17_section_other_industries() {
  const slide = pptx.addSlide();

  // 좌측 다크 패널
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark },
    line: { type: 'none' },
  });

  // 섹션 번호
  slide.addText('4', {
    x: 1.0, y: 2.5, w: 3.0, h: 1.4,
    fontSize: 72,
    fontFace: FONTS.kpi.fontFace,
    bold: FONTS.kpi.bold,
    color: COLORS.accent_cyan,
    align: 'left',
    valign: 'top',
  });

  // 섹션 제목
  slide.addText('다른 산업은\n이미 이 길을 걸었다', {
    x: 6.0, y: 2.5, w: 6.5, h: 2.0,
    fontSize: 36,
    fontFace: FONTS.title.fontFace,
    bold: FONTS.title.bold,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'top',
    wrap: true,
  });

  // 섹션 설명
  slide.addText(
    '반도체, 제약, 자동차 —\n이들의 경험에서 성공과 실패의 패턴을 배울 수 있다',
    {
      x: 6.0, y: 4.65,
      w: 6.5, h: 1.2,
      fontSize: 16,
      fontFace: FONTS.body.fontFace,
      bold: false,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      wrap: true,
    }
  );
}

function slide18_success_timeline() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '성공한 산업들의 공통 경로: 5단계');

  const steps = [
    {
      title: '데이터 수집',
      desc: '공정 센서를 연결하고, 실험 데이터를 디지털로 바꾼다',
    },
    {
      title: '단일 공정 예측',
      desc: '하나의 공정에서 AI가 품질을 예측한다 (예: 반도체 가상 계측)',
    },
    {
      title: '디지털 트윈',
      desc: '전체 공정을 가상으로 만들어, 실험 없이 테스트한다',
    },
    {
      title: '폐루프 제어',
      desc: 'AI가 스스로 공정 조건을 조정한다. 실험→분석→최적화 자동화',
    },
    {
      title: '자율 공정 개발',
      desc: 'AI가 가설을 세우고, 실험을 설계하고, 결과를 해석한다',
    },
  ];

  // 세로 타임라인 바
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 1.8, w: 0.06, h: 5.0,
    fill: { color: COLORS.accent_blue },
    line: { type: 'none' },
  });

  const stepHeight = 5.0 / 5;

  steps.forEach((step, i) => {
    const dotY = 1.8 + i * stepHeight + stepHeight / 2 - 0.115;
    const textY = 1.8 + i * stepHeight + stepHeight / 2 - 0.35;

    // 타임라인 점
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.515,
      y: dotY,
      w: 0.23,
      h: 0.23,
      fill: { color: COLORS.accent_blue },
      line: { color: COLORS.bg_primary, width: 2 },
    });

    // 단계 번호 배지
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 1.1,
      y: textY,
      w: 0.55,
      h: 0.32,
      fill: { color: COLORS.accent_blue },
      line: { type: 'none' },
      rectRadius: 0.04,
    });
    slide.addText(`0${i + 1}`, {
      x: 1.1,
      y: textY,
      w: 0.55,
      h: 0.32,
      fontSize: 11,
      fontFace: FONTS.kpi.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle',
    });

    // 단계 제목
    slide.addText(step.title, {
      x: 1.75,
      y: textY - 0.02,
      w: 10.8,
      h: 0.35,
      fontSize: 15,
      fontFace: FONTS.subtitle.fontFace,
      bold: FONTS.subtitle.bold,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle',
    });

    // 단계 설명
    slide.addText(step.desc, {
      x: 1.75,
      y: textY + 0.35,
      w: 10.8,
      h: 0.45,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      bold: false,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      wrap: true,
    });
  });

  addPageNumber(slide, 18, TOTAL_SLIDES);
}

function slide19_lessons_two_column() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '다른 산업에서 가져올 수 있는 것 vs. 없는 것');

  // 좌측 컬럼 헤더
  slide.addShape(pptx.ShapeType.rect, {
    x: COL_LEFT_X, y: 1.8, w: COL_W, h: 0.45,
    fill: { color: COLORS.accent_blue },
    line: { type: 'none' },
  });
  slide.addText('가져올 수 있는 것', {
    x: COL_LEFT_X, y: 1.8, w: COL_W, h: 0.45,
    fontSize: 14,
    fontFace: FONTS.subtitle.fontFace,
    bold: FONTS.subtitle.bold,
    color: COLORS.text_on_dark,
    align: 'center',
    valign: 'middle',
  });

  // 우측 컬럼 헤더
  slide.addShape(pptx.ShapeType.rect, {
    x: COL_RIGHT_X, y: 1.8, w: COL_W, h: 0.45,
    fill: { color: COLORS.accent_red },
    line: { type: 'none' },
  });
  slide.addText('가져올 수 없는 것', {
    x: COL_RIGHT_X, y: 1.8, w: COL_W, h: 0.45,
    fontSize: 14,
    fontFace: FONTS.subtitle.fontFace,
    bold: FONTS.subtitle.bold,
    color: COLORS.text_on_dark,
    align: 'center',
    valign: 'middle',
  });

  const leftItems = [
    "반도체의 '가상 계측' 개념 → 조립 품질 예측에 적용",
    "자동차의 '가상 실험' → 금형 시뮬레이션에 적용",
    "제약의 'QbD(설계 기반 품질)' 개념 → 공정 파라미터 관리",
    '모든 산업의 공통 교훈: 데이터 정비가 반드시 먼저',
  ];

  const rightItems = [
    "수치 벤치마크: '22% 변동 감소'(반도체)를 DX에 그대로 기대하면 안 된다",
    '데이터 볼륨: 반도체는 웨이퍼당 수백만 데이터 포인트, DX는 훨씬 적다',
    '공정 지속 기간: 반도체/제약은 수년간 같은 공정, DX는 1~2년마다 리셋',
    '규제 환경: 제약/항공우주의 인증 프레임워크는 DX에 맞지 않는다',
  ];

  const itemH = 1.0;
  const startY = 2.4;

  leftItems.forEach((text, i) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: COL_LEFT_X + 0.12,
      y: startY + i * itemH + 0.3,
      w: 0.14,
      h: 0.14,
      fill: { color: COLORS.accent_blue },
      line: { type: 'none' },
    });
    slide.addText(text, {
      x: COL_LEFT_X + 0.35,
      y: startY + i * itemH + 0.15,
      w: COL_W - 0.45,
      h: 0.75,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      bold: false,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle',
      wrap: true,
    });
  });

  rightItems.forEach((text, i) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: COL_RIGHT_X + 0.12,
      y: startY + i * itemH + 0.3,
      w: 0.14,
      h: 0.14,
      fill: { color: COLORS.accent_red },
      line: { type: 'none' },
    });
    slide.addText(text, {
      x: COL_RIGHT_X + 0.35,
      y: startY + i * itemH + 0.15,
      w: COL_W - 0.45,
      h: 0.75,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      bold: false,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle',
      wrap: true,
    });
  });

  // 중앙 구분선
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.595, y: 1.8, w: 0.04, h: 5.1,
    fill: { color: COLORS.bg_secondary },
    line: { type: 'none' },
  });

  addPageNumber(slide, 19, TOTAL_SLIDES);
}


// ===== Part 3: 슬라이드 20~28 =====


function slide20_section_strategy() {
  const slide = pptx.addSlide();

  // 좌 다크 패널
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 섹션 번호
  slide.addText('5', {
    x: 1.0, y: 2.5, w: 3.33, h: 1.5,
    fontSize: 72,
    fontFace: FONTS.kpi.fontFace,
    bold: FONTS.kpi.bold,
    color: COLORS.accent_cyan,
    align: 'left',
    valign: 'middle'
  });

  // 우 제목
  slide.addText('우리는 무엇을 해야 하는가', {
    x: 6.0, y: 2.5, w: 6.73, h: 0.8,
    fontSize: 36,
    fontFace: FONTS.title.fontFace,
    bold: FONTS.title.bold,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'middle'
  });

  // 우 설명
  slide.addText('시나리오, 전략 옵션, 우선순위 — 구체적인 판단과 행동 계획', {
    x: 6.0, y: 3.5, w: 6.73, h: 1.0,
    fontSize: 16,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'top'
  });
}

function slide21_scenario_matrix() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '3가지 시나리오: 보수, 기준, 공격', null);

  const headers = ['항목', '보수 (25%)', '기준 (50%)', '공격 (25%)'];
  const dataRows = [
    [
      '전제',
      '파일럿 실패 확산,\n데이터 정비 3년+',
      '2027년 2~3개 공정\n양산 적용',
      'DS 시너지 + 경영진 의지\n+ FM 급진전'
    ],
    [
      'NPI 단축 효과',
      '미미',
      '15~20%',
      '30%+'
    ],
    [
      '핵심 리스크',
      '뒤처짐 누적',
      '기회비용',
      '과잉투자/방향 오류'
    ],
    [
      '대응',
      '모니터링 +\n선택적 파일럿',
      '단계적: 데이터\n→파일럿→확산',
      '전담 조직, DS 협업,\n특허 선점'
    ]
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.8, w: 12.13, h: 5.0,
    colW: [2.0, 3.38, 3.38, 3.37]
  });

  addPageNumber(slide, 21, TOTAL_SLIDES);
}

function slide22_five_actions() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '지금 시작할 5가지', null);

  const cards = [
    {
      accentColor: COLORS.accent_blue,
      title: '① 공정 데이터 정비',
      body: '모든 것의 전제. 공정 데이터를 모으고, 정리하고, 표준화한다. EU 규제 대응과 동시에 추진하면 일석이조.'
    },
    {
      accentColor: COLORS.accent_cyan,
      title: '② 가상 실험 파일럿',
      body: '가장 비싼 실험을 줄이는 공정부터 시작. 디지털 트윈으로 물리 실험 30~50% 대체 가능. 가장 빠른 ROI.'
    },
    {
      accentColor: COLORS.accent_yellow,
      title: '③ AI+실험계획 도구',
      body: '기존에 쓰던 DOE 도구에 AI를 얹는다. Quick Win. 기존 업무 방식을 거의 안 바꿔도 효과.'
    },
    {
      accentColor: COLORS.accent_purple,
      title: '④ AI 엔지니어 양성',
      body: '도구보다 사람이 먼저다. 기존 공정 엔지니어의 AI 역량 교육. 1~2년 격차가 벌어지면 만회 어렵다.'
    },
    {
      accentColor: COLORS.accent_red,
      title: '⑤ 탄소+공정 데이터 통합',
      body: 'EU CBAM(2026 시행)·DPP 대응은 필수. 이 투자를 AI 데이터 기반으로 전환하면 규제 비용이 자산이 된다.'
    }
  ];

  const positions = CARD_2X3.positions;
  const cardW = CARD_2X3.w;
  const cardH = CARD_2X3.h;

  cards.forEach((card, i) => {
    if (i < positions.length) {
      addCard(slide, {
        x: positions[i].x,
        y: positions[i].y,
        w: cardW,
        h: cardH,
        title: card.title,
        body: card.body,
        accentColor: card.accentColor
      });
    }
  });

  addPageNumber(slide, 22, TOTAL_SLIDES);
}

function slide23_strategy_options() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '10개 전략 옵션의 우선순위', null);

  const headers = ['옵션', '기대 효과', '난이도', '권고'];
  const dataRows = [
    ['공정 데이터 인프라 정비', '모든 AI의 전제', '중~고', '⬛ 지금 시작'],
    ['가상 DoE 파일럿', '물리 실험 30~50% 대체', '중', '⬛ 지금 시작'],
    ['AI+DOE 도구 도입', 'Quick Win, 워크플로 최소 변경', '저', '⬛ 지금 시작'],
    ['AI 엔지니어 양성', '모든 전환의 전제', '중', '⬛ 지금 시작'],
    ['탄소-공정 데이터 통합', '규제 대응 + AI 기반', '중', '⬛ 지금 시작'],
    ['공정 플랫폼 공통화', 'AI ROI의 구조적 전제', '고', '◻ 다음 분기'],
    ['DS-DX 시너지 탐색', '비용/속도 변수 근본 해결', '중(정치)', '◻ 다음 분기'],
    ['PIML 파일럿', '소규모 데이터 환경 적합', '중', '◻ 다음 분기'],
    ['Materials Informatics', '도구 미성숙', '고', '△ 모니터링'],
    ['B2B 수익화', '내부 역량 미실증', '고', '✕ 보류']
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.8, w: 12.13, h: 5.0,
    colW: [3.5, 3.5, 1.63, 3.5]
  });

  addPageNumber(slide, 23, TOTAL_SLIDES);
}

function slide24_dont_do() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '절대 하지 말아야 할 것들', null);

  const items = [
    {
      title: '전사 일괄 AI 전환',
      body: '파일럿→양산 성공률이 1%인 세계에서, 한꺼번에 바꾸는 것은 도박이다'
    },
    {
      title: 'Foundation Model 공정 직접 적용',
      body: '아직 실험 단계. 기대와 현실의 격차가 크다'
    },
    {
      title: '외부 플랫폼 전면 의존',
      body: 'NVIDIA/Siemens 도구는 활용하되, 핵심 공정 지식은 반드시 내재화'
    },
    {
      title: '휴머노이드 로봇 공장 도입',
      body: '현재는 마케팅. 코봇과 AMR이 현실적 선택'
    },
    {
      title: '데이터 없이 AI 도구 구매',
      body: '47% 기업이 이 실수로 실패했다'
    }
  ];

  const startY = 1.9;
  const itemH = 0.88;

  items.forEach((item, i) => {
    const yPos = startY + i * itemH;

    // 빨간 불릿 마커
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: yPos + 0.08, w: 0.28, h: 0.28,
      fill: { color: COLORS.accent_red }
    });

    // 제목 (빨간색 강조)
    slide.addText(item.title, {
      x: 1.05, y: yPos, w: 11.68, h: 0.35,
      fontSize: 16,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.accent_red,
      align: 'left',
      valign: 'middle'
    });

    // 본문
    slide.addText(item.body, {
      x: 1.05, y: yPos + 0.35, w: 11.68, h: 0.45,
      fontSize: 13,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top'
    });
  });

  addPageNumber(slide, 24, TOTAL_SLIDES);
}

function slide25_section_roadmap() {
  const slide = pptx.addSlide();

  // 좌 다크 패널
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 섹션 번호
  slide.addText('6', {
    x: 1.0, y: 2.5, w: 3.33, h: 1.5,
    fontSize: 72,
    fontFace: FONTS.kpi.fontFace,
    bold: FONTS.kpi.bold,
    color: COLORS.accent_cyan,
    align: 'left',
    valign: 'middle'
  });

  // 우 제목
  slide.addText('로드맵과 다음 단계', {
    x: 6.0, y: 2.5, w: 6.73, h: 0.8,
    fontSize: 36,
    fontFace: FONTS.title.fontFace,
    bold: FONTS.title.bold,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'middle'
  });

  // 우 설명
  slide.addText('0~3개월, 3~12개월, 12~36개월 — 단계별 실행 계획', {
    x: 6.0, y: 3.5, w: 6.73, h: 1.0,
    fontSize: 16,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'top'
  });
}

function slide26_timeline() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '0~3개월, 3~12개월, 12~36개월 로드맵', null);

  const timelineItems = [
    {
      label: '즉시 (0~3개월)',
      body: '• 공정 데이터 현황 진단\n• AI+DOE 도구 평가 및 파일럿 선정\n• AI 엔지니어 양성 프로그램 설계\n• EU 규제-데이터 연계 방안 수립\n• DS 인프라 공유 비공식 탐색'
    },
    {
      label: '근시계 (3~12개월)',
      body: '• 2~3개 NPI 공정에서 가상 DoE 파일럿\n• 공정 데이터 표준화 본격 착수\n• 공정 플랫폼 공통화 범위 분석\n• Physics-ML 파일럿 (열처리/성형)\n• AI 엔지니어 1기 교육 완료'
    },
    {
      label: '중기 (12~36개월)',
      body: '• 핵심 공정 3~5개 양산 적용\n• 디지털 트윈 NPI 가상 커미셔닝 제도화\n• DS 시너지 시: Omniverse 기반 통합 플랫폼\n• Materials Informatics PoC\n• 공정 AI 특허 포트폴리오 구축'
    }
  ];

  const barX = 0.6;
  const barY = 1.9;
  const barH = 4.8;
  const barW = 0.06;

  // 세로 타임라인 바
  slide.addShape(pptx.ShapeType.rect, {
    x: barX, y: barY, w: barW, h: barH,
    fill: { color: COLORS.accent_blue }
  });

  const itemSpacing = barH / timelineItems.length;

  timelineItems.forEach((item, i) => {
    const dotY = barY + i * itemSpacing + itemSpacing * 0.15;
    const dotSize = 0.23;
    const dotX = barX - (dotSize - barW) / 2;

    // 타임라인 점
    slide.addShape(pptx.ShapeType.ellipse, {
      x: dotX, y: dotY, w: dotSize, h: dotSize,
      fill: { color: COLORS.accent_blue },
      line: { color: COLORS.bg_primary, width: 2 }
    });

    const textX = 1.1;
    const titleY = dotY - 0.05;
    const bodyY = titleY + 0.38;
    const availableH = itemSpacing - 0.55;

    // 단계 제목
    slide.addText(item.label, {
      x: textX, y: titleY, w: 11.63, h: 0.35,
      fontSize: 18,
      fontFace: FONTS.subtitle.fontFace,
      bold: FONTS.subtitle.bold,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle'
    });

    // 단계 본문
    slide.addText(item.body, {
      x: textX, y: bodyY, w: 11.63, h: Math.max(availableH, 0.8),
      fontSize: 13,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top'
    });
  });

  addPageNumber(slide, 26, TOTAL_SLIDES);
}

function slide27_risk_if_wrong() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '이 판단이 틀리면 무엇을 잃는가', null);

  const cards = [
    {
      accentColor: COLORS.accent_red,
      title: '과잉 투자 시',
      body: 'AI 공정에 과도하게 투자했으나 ROI가 나오지 않으면: 매몰 비용 + 핵심 전통 공정 역량 희석'
    },
    {
      accentColor: COLORS.accent_yellow,
      title: '과소 투자 시',
      body: '너무 늦게 시작하면: Apple·Xiaomi와의 공정 경쟁력 격차 확대. 만회 비용이 기하급수적으로 증가'
    },
    {
      accentColor: COLORS.accent_blue,
      title: 'DS 시너지 실패 시',
      body: 'DS 인프라에 의존했으나 실현 안 되면: 독자 구축 전환 시 2년+ 지연. 별도 대비 필요'
    },
    {
      accentColor: COLORS.accent_purple,
      title: '플랫폼 공통화 실패 시',
      body: '공정 모듈화 없이 AI 도입하면: 제품마다 모델 재학습. 투자 대비 효과(ROI) 미달'
    }
  ];

  const positions = CARD_2X2.positions;
  const cardW = CARD_2X2.w;
  const cardH = CARD_2X2.h;

  cards.forEach((card, i) => {
    addCard(slide, {
      x: positions[i].x,
      y: positions[i].y,
      w: cardW,
      h: cardH,
      title: card.title,
      body: card.body,
      accentColor: card.accentColor
    });
  });

  addPageNumber(slide, 27, TOTAL_SLIDES);
}

function slide28_closing() {
  const slide = pptx.addSlide();

  // 풀블리드 다크 배경
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // accent 라인
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.5, y: 1.8, w: 1.5, h: 0.06,
    fill: { color: COLORS.accent_cyan }
  });

  // 결론 제목
  slide.addText('결론: 기술보다 데이터, 도구보다 사람이 먼저다', {
    x: 1.5, y: 2.0, w: 10.33, h: 0.9,
    fontSize: 36,
    fontFace: FONTS.title.fontFace,
    bold: true,
    color: COLORS.text_on_dark,
    align: 'left',
    valign: 'middle'
  });

  // 핵심 메시지
  slide.addText('AI 공정 R&D 전환은 기술의 문제가 아니라, 데이터·조직·실행의 문제다', {
    x: 1.5, y: 3.0, w: 10.33, h: 0.5,
    fontSize: 16,
    fontFace: FONTS.body.fontFace,
    color: COLORS.accent_cyan,
    align: 'left',
    valign: 'middle'
  });

  // 구분선
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.5, y: 3.6, w: 10.33, h: 0.03,
    fill: { color: COLORS.text_tertiary },
    transparency: 60
  });

  // 3가지 기억할 것 레이블
  slide.addText('3가지 기억할 것', {
    x: 1.5, y: 3.75, w: 10.33, h: 0.4,
    fontSize: 14,
    fontFace: FONTS.body.fontFace,
    bold: true,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'middle'
  });

  // 3가지 항목
  const bullets = [
    '1.  데이터 정비 → 파일럿 → 확산, 이 순서를 지켜라',
    '2.  도구를 사기 전에 사람을 키워라',
    '3.  전사 일괄 전환이 아닌, 작은 성공의 반복이 유일한 길이다'
  ];

  slide.addText(bullets.join('\n'), {
    x: 1.5, y: 4.2, w: 10.33, h: 1.4,
    fontSize: 18,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_on_dark,
    align: 'left',
    valign: 'top',
    lineSpacingMultiple: 1.4
  });

  // CTA
  slide.addText('다음 단계: 공정 데이터 현황 진단 착수', {
    x: 1.5, y: 5.8, w: 10.33, h: 0.5,
    fontSize: 20,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.accent_cyan,
    align: 'left',
    valign: 'middle'
  });
}


// ===== 슬라이드 실행 =====
slide01_title();
slide02_agenda();
slide03_section1();
slide04_kpi_market();
slide05_tech_cards();
slide06_tech_readiness_table();
slide07_samsung_ai_factory();
slide08_section2();
slide09_bottleneck_cards();
slide10_dx_cycle_constraint();
slide11_kpi_failure_rate();
slide12_section_competitors();
slide13_apple_3d_printing();
slide14_lg_process_ai();
slide15_global_players_cards();
slide16_competitor_table();
slide17_section_other_industries();
slide18_success_timeline();
slide19_lessons_two_column();
slide20_section_strategy();
slide21_scenario_matrix();
slide22_five_actions();
slide23_strategy_options();
slide24_dont_do();
slide25_section_roadmap();
slide26_timeline();
slide27_risk_if_wrong();
slide28_closing();

pptx.writeFile({ fileName: 'presentation-build/2026-03-25-dx-manufacturing-process-rd-roadmap/dx-manufacturing-rd-roadmap.pptx' })
  .then(function() { console.log('저장 완료: presentation-build/2026-03-25-dx-manufacturing-process-rd-roadmap/dx-manufacturing-rd-roadmap.pptx'); })
  .catch(function(err) { console.error('저장 실패:', err); });
