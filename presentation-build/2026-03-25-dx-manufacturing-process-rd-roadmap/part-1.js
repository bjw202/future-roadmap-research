// === Part 1 시작 ===

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

// ===================================================================
// 슬라이드 실행
// ===================================================================
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

// ===================================================================
// 저장 (Part 1 단독 실행 시에만 활성화)
// ===================================================================
// Part 1 단독 실행 시:
// pptx.writeFile({ fileName: 'presentation-build/2026-03-25-dx-manufacturing-process-rd-roadmap/part-1-preview.pptx' })
//   .then(function() { console.log('Part 1 저장 완료'); })
//   .catch(function(err) { console.error('저장 실패:', err); });

module.exports = { pptx, COLORS, FONTS, TABLE_STYLE, TABLE_OPTIONS, CHART_STYLE,
                   CARD_2X2, CARD_2X3, COL_W, COL_GAP, COL_LEFT_X, COL_RIGHT_X,
                   addTitleBar, addStyledTable, addTitledTable, addStyledChart,
                   addCard, addPageNumber, TOTAL_SLIDES };

// === Part 1 끝 ===
