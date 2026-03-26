// === Part 1 시작 ===

const PptxGenJS = require('pptxgenjs');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 16:9, 13.33" x 7.5"

const TOTAL_SLIDES = 38;

// ===== 색상 상수 =====
const COLORS = {
  bg_primary:    'FFFFFF',
  bg_secondary:  'F7F9FC',
  bg_dark:       '1A2340',
  text_primary:  '1A2340',
  text_secondary:'4A5568',
  text_tertiary: '94A3B8',
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
  deco:     { fontFace: 'Pretendard Thin',       bold: false }
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

// ===== Two Column 상수 =====
const COL_W       = 5.865;
const COL_GAP     = 0.4;
const COL_LEFT_X  = 0.6;
const COL_RIGHT_X = COL_LEFT_X + COL_W + COL_GAP; // 6.865

// ===== Card Grid 상수 =====
const CARD_2X2 = {
  w: 5.915, h: 2.45, gap: 0.3,
  positions: [
    { x: 0.6,   y: 1.8  },
    { x: 6.815, y: 1.8  },
    { x: 0.6,   y: 4.55 },
    { x: 6.815, y: 4.55 }
  ]
};

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

// ===== 헬퍼 함수 =====

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

function addCard(slide, { x, y, w, h, title, body, accentColor }) {
  slide.addShape('roundRect', {
    x, y, w, h, rectRadius: 0.1,
    fill: { color: 'FFFFFF' },
    line: { color: 'E2E8F0', width: 0.5 }
  });
  slide.addShape('rect', {
    x: x + 0.02, y, w: w - 0.04, h: 0.06,
    fill: { color: accentColor || COLORS.accent_blue }
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
  slide.addText(`${num} / ${total}`, {
    x: 12.0, y: 7.05, w: 1.0, h: 0.3,
    fontSize: 9, fontFace: 'Pretendard',
    color: COLORS.text_tertiary, align: 'right'
  });
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
  slide.addTable(rows, { ...TABLE_OPTIONS, ...(opts || {}) });
}

function calcTierCoords(tierCount, opts) {
  const startY  = (opts && opts.startY  != null) ? opts.startY  : 1.8;
  const endY    = (opts && opts.endY    != null) ? opts.endY    : 6.8;
  const maxW    = (opts && opts.maxW    != null) ? opts.maxW    : 12.13;
  const minW    = (opts && opts.minW    != null) ? opts.minW    : 4.0;
  const centerX = (opts && opts.centerX != null) ? opts.centerX : 6.665;
  const gap     = (opts && opts.gap     != null) ? opts.gap     : 0.15;
  const totalH  = endY - startY;
  const tierH   = (totalH - gap * (tierCount - 1)) / tierCount;
  const tiers   = [];
  for (let i = 0; i < tierCount; i++) {
    const ratio = tierCount > 1 ? i / (tierCount - 1) : 0;
    const w     = maxW - ratio * (maxW - minW);
    const x     = centerX - w / 2;
    const y     = startY + i * (tierH + gap);
    tiers.push({ x, y, w, h: tierH });
  }
  return tiers;
}

// ============================================================
// [01] Title Slide — 표지
// ============================================================
(function slide01() {
  const slide = pptx.addSlide();

  // 풀블리드 다크 배경
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 장식 accent 라인
  slide.addShape('rect', {
    x: 1.5, y: 2.3, w: 1.5, h: 0.06,
    fill: { color: COLORS.accent_cyan }
  });

  // 메인 제목
  slide.addText('레이저 R&D 프론티어', {
    x: 1.5, y: 2.5, w: 10.33, h: 0.9,
    fontSize: 44, fontFace: FONTS.title.fontFace, bold: true,
    color: COLORS.text_on_dark, align: 'center',
    charSpacing: -0.5, lineSpacingMultiple: 1.1
  });

  // 부제목
  slide.addText('3가지 기술이 만드는 통합 혁신', {
    x: 1.5, y: 3.5, w: 10.33, h: 0.6,
    fontSize: 26, fontFace: 'Pretendard',
    color: COLORS.accent_cyan, align: 'center',
    lineSpacingMultiple: 1.1
  });

  // 소제목 설명
  slide.addText('AI 공정 제어  ·  빔 쉐이핑(ARM)  ·  레이저 세정', {
    x: 1.5, y: 4.2, w: 10.33, h: 0.5,
    fontSize: 18, fontFace: 'Pretendard',
    color: 'FFFFFF', transparency: 25, align: 'center'
  });

  // 날짜/소속
  slide.addText('Laser R&D  |  2026.03.26', {
    x: 1.5, y: 6.0, w: 10.33, h: 0.4,
    fontSize: 14, fontFace: 'Pretendard',
    color: 'FFFFFF', transparency: 50, align: 'center'
  });

  addPageNumber(slide, 1, TOTAL_SLIDES);
})();

// ============================================================
// [02] Stat Highlight — ARM 빔 쉐이핑 1대 = 기존 레이저 4대
// ============================================================
(function slide02() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'ARM 빔 쉐이핑: 장비 효율의 구조적 전환');

  // accent 라인 (중앙)
  slide.addShape('rect', {
    x: 5.665, y: 1.8, w: 2.0, h: 0.06,
    fill: { color: COLORS.accent_blue }
  });

  // 큰 숫자 "1:4"
  slide.addText('1:4', {
    x: 0.6, y: 2.0, w: 12.13, h: 1.5,
    fontSize: 88, fontFace: FONTS.kpi.fontFace, bold: true,
    color: COLORS.accent_blue, align: 'center', valign: 'middle',
    autoFit: true
  });

  // 레이블
  slide.addText('ARM 빔 쉐이핑 장비 대체 효과', {
    x: 0.6, y: 3.6, w: 12.13, h: 0.5,
    fontSize: 20, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary, align: 'center', autoFit: true
  });

  // 맥락 텍스트 배경
  slide.addShape('roundRect', {
    x: 1.5, y: 4.25, w: 10.33, h: 1.25,
    rectRadius: 0.08,
    fill: { color: COLORS.bg_secondary },
    line: { color: 'E2E8F0', width: 0.5 }
  });

  // 맥락 텍스트
  slide.addText('nLIGHT AFX 1대가 표준 레이저 4대를 대체  |  Coherent ARM 스패터 90%+ 감소\n이종금속(Cu-Al) 용접 품질 일관성 대폭 향상  ·  EOS·DMG Mori 등 다수 OEM 채택 진행 중', {
    x: 1.7, y: 4.35, w: 9.93, h: 1.05,
    fontSize: 15, fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary, align: 'center',
    lineSpacingMultiple: 1.5, autoFit: true
  });

  // 트렌드 지표
  slide.addText('▲ EOS/DMG Mori 등 다수 OEM 채택', {
    x: 4.0, y: 5.7, w: 5.33, h: 0.4,
    fontSize: 15, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: '27AE60', align: 'center', autoFit: true
  });

  addPageNumber(slide, 2, TOTAL_SLIDES);
})();

// ============================================================
// [03] Section — Part 1. R&D 프론티어
// ============================================================
(function slide03() {
  const slide = pptx.addSlide();

  // 좌측 다크 패널 (40%)
  slide.addShape('rect', {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 섹션 번호
  slide.addText('01', {
    x: 1.0, y: 2.2, w: 3.33, h: 1.5,
    fontSize: 80, fontFace: FONTS.kpi.fontFace, bold: true,
    color: COLORS.accent_cyan, align: 'center'
  });

  // 좌측 하단 소제목
  slide.addText('R&D Frontier', {
    x: 1.0, y: 3.8, w: 3.33, h: 0.5,
    fontSize: 16, fontFace: 'Pretendard',
    color: COLORS.text_on_dark, transparency: 30, align: 'center'
  });

  // 우측 섹션 제목
  slide.addText('Part 1', {
    x: 6.0, y: 2.2, w: 6.73, h: 0.5,
    fontSize: 18, fontFace: 'Pretendard',
    color: COLORS.accent_blue
  });

  slide.addText('R&D 프론티어', {
    x: 6.0, y: 2.75, w: 6.73, h: 0.8,
    fontSize: 36, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary
  });

  // accent 라인
  slide.addShape('rect', {
    x: 6.0, y: 3.65, w: 3.0, h: 0.04,
    fill: { color: COLORS.accent_blue }
  });

  // 우측 설명
  slide.addText('왜 지금 이 기술들인가\n\nAI 공정 제어, 빔 쉐이핑(ARM), 레이저 세정 — 3가지 기술이 독립적으로 발전하는 동시에 통합 시너지를 형성하는 구조적 전환점에 도달했다.', {
    x: 6.0, y: 3.8, w: 6.73, h: 2.5,
    fontSize: 16, fontFace: 'Pretendard',
    color: COLORS.text_secondary,
    lineSpacingMultiple: 1.5
  });

  addPageNumber(slide, 3, TOTAL_SLIDES);
})();

// ============================================================
// [04] Cards — 레이저 R&D의 3가지 구조적 압력
// ============================================================
(function slide04() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '레이저 R&D의 3가지 구조적 압력');

  const cards = [
    {
      title: 'EV·디스플레이 공정 정밀도 요구 급증',
      body: 'Cu-Al 이종금속 IMC 제어 필요\nLLO 대면적 균일도 요구 증가\nUTG 마이크로크랙 억제 과제\n→ 기존 단일 빔 레이저로는 한계 도달'
    },
    {
      title: '중국 표준 레이저 경쟁 심화',
      body: 'IPG Photonics 매출 -22% YoY (2023)\n중국산 저가 파이버 레이저 점유율 급등\n하드웨어 가격 경쟁 불가 → 소프트웨어·AI 차별화가 생존 전략으로 부상'
    },
    {
      title: 'EU 환경규제 → 화학 전처리 대체',
      body: 'REACH 규제: VOC 용제 사용 제한 강화\n용제 폐기 비용 드럼당 $200+ 수준\n레이저 세정이 친환경 대안으로 급부상\n→ 규제가 채택을 가속하는 구조'
    }
  ];

  // 3카드를 상단 행에 배치 (2x3 레이아웃 상단 3개만)
  cards.forEach((card, i) => {
    const pos = CARD_2X3.positions[i];
    addCard(slide, {
      x: pos.x, y: pos.y,
      w: CARD_2X3.w, h: CARD_2X3.h,
      title: card.title,
      body: card.body,
      accentColor: CHART_STYLE.colors[i % CHART_STYLE.colors.length]
    });
  });

  // 하단 인사이트 바
  slide.addShape('roundRect', {
    x: 0.6, y: 4.65, w: 12.13, h: 2.15,
    rectRadius: 0.08,
    fill: { color: COLORS.bg_secondary },
    line: { color: 'E2E8F0', width: 0.5 }
  });

  slide.addShape('rect', {
    x: 0.62, y: 4.65, w: 12.09, h: 0.06,
    fill: { color: COLORS.accent_purple }
  });

  slide.addText('핵심 인사이트', {
    x: 0.9, y: 4.8, w: 3.0, h: 0.35,
    fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_purple
  });

  slide.addText('세 압력은 동시에 작용한다. 수요 측 정밀도 요구 + 공급 측 가격 경쟁 + 규제 측 환경 압박이 중첩되면서 "소프트웨어·AI·공정 통합"을 통한 차별화가 선택이 아닌 필수가 되었다.', {
    x: 0.9, y: 5.2, w: 11.63, h: 1.4,
    fontSize: 14, fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    lineSpacingMultiple: 1.5, valign: 'top', autoFit: true
  });

  addPageNumber(slide, 4, TOTAL_SLIDES);
})();

// ============================================================
// [05] Before/After — 장비 판매에서 통합 솔루션으로
// ============================================================
(function slide05() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '현재 vs 미래: 장비 판매에서 통합 솔루션으로');

  // Before 패널 배경 (다크): x=0, y=1.8, w=6.465, h=5.2
  slide.addShape('rect', {
    x: 0, y: 1.8, w: 6.465, h: 5.2,
    fill: { color: COLORS.bg_dark }
  });

  // After 패널 배경 (라이트): x=6.865, y=1.8, w=5.865, h=5.2
  slide.addShape('rect', {
    x: COL_RIGHT_X, y: 1.8, w: COL_W, h: 5.2,
    fill: { color: COLORS.bg_secondary }
  });

  // BEFORE 레이블
  slide.addText('BEFORE', {
    x: COL_LEFT_X, y: 1.85, w: COL_W, h: 0.4,
    fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_red, align: 'center', charSpacing: 2
  });

  // AFTER 레이블
  slide.addText('AFTER', {
    x: COL_RIGHT_X, y: 1.85, w: COL_W, h: 0.4,
    fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_cyan, align: 'center', charSpacing: 2
  });

  // Before 구분선
  slide.addShape('rect', {
    x: COL_LEFT_X, y: 2.3, w: COL_W, h: 0.01,
    fill: { color: COLORS.accent_red }
  });

  // After 구분선
  slide.addShape('rect', {
    x: COL_RIGHT_X, y: 2.3, w: COL_W, h: 0.01,
    fill: { color: COLORS.accent_cyan }
  });

  // Before 콘텐츠 (불릿 항목)
  const beforeItems = [
    '공정별 전용 장비 — 유연성 없음',
    '파라미터 수동 설정 — 전문 인력 의존',
    '화학 전처리 외주 — 비용·리드타임 증가',
    '사후 품질 검사 — 불량 발견 시 이미 손실',
    '장비 판매 1회성 수익 구조'
  ];

  slide.addText(beforeItems.map(b => ({ text: b, options: { bullet: { type: 'bullet' }, indentLevel: 0 } })), {
    x: COL_LEFT_X + 0.15, y: 2.4, w: COL_W - 0.3, h: 4.3,
    fontSize: 15, fontFace: FONTS.body.fontFace,
    color: COLORS.text_on_dark,
    lineSpacingMultiple: 1.55, paraSpaceAfter: 6, valign: 'top', autoFit: true
  });

  // After 콘텐츠 (불릿 항목)
  const afterItems = [
    '범용 플랫폼 + AI 자동 최적화',
    '실시간 파라미터 자동 조정',
    '인라인 레이저 세정 통합',
    '실시간 폐루프 제어 — 불량률 최소화',
    'HeSaaS — 구독·서비스 기반 반복 수익'
  ];

  slide.addText(afterItems.map(b => ({ text: b, options: { bullet: { type: 'bullet' }, indentLevel: 0 } })), {
    x: COL_RIGHT_X + 0.15, y: 2.4, w: COL_W - 0.3, h: 4.3,
    fontSize: 15, fontFace: FONTS.body.fontFace,
    color: COLORS.text_primary,
    lineSpacingMultiple: 1.55, paraSpaceAfter: 6, valign: 'top', autoFit: true
  });

  addPageNumber(slide, 5, TOTAL_SLIDES);
})();

// ============================================================
// [06] Content — R&D 도전 과제: 3가지 프론티어의 현주소
// ============================================================
(function slide06() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'R&D 도전 과제: 3가지 프론티어의 현주소');

  // 3컬럼 레이아웃
  // 컬럼 폭: (12.13 - 0.3*2) / 3 = 3.843"
  const colW   = 3.843;
  const colGap = 0.3;
  const startX = 0.6;
  const startY = 1.8;

  const domains = [
    {
      title: 'AI 기반 공정 제어',
      color: COLORS.accent_blue,
      now: '모니터링·이상감지 양산 적용 중\n플라즈마 분광, OCT 센서 통합\nIPG LDD, Precitec WeldMaster 출시',
      future: 'AI 자율 폐루프 제어\n파라미터 실시간 자동 조정\n멀티-공정 범용 제어 AI (R&D)'
    },
    {
      title: '빔 쉐이핑 (ARM)',
      color: COLORS.accent_cyan,
      now: 'ARM(코어+링) 양산 적용\nnLIGHT AFX, Coherent ARM 출시\nEOS·DMG Mori OEM 채택',
      future: 'SLM(Spatially Localized Modulation)\n초고속 동적 빔 분포 제어\n멀티-빔 동시 독립 제어 (연구)'
    },
    {
      title: '레이저 세정',
      color: COLORS.accent_yellow,
      now: '금속 표면 산화물·오일 제거 양산\n자동차·항공우주 생산라인 적용\nLaser Photonics, Clean-Lasersysteme 공급',
      future: '반도체 웨이퍼 세정 파일럿\n극자외선(EUV) 포토마스크 세정\n유리·세라믹 미세 세정 (R&D)'
    }
  ];

  domains.forEach((domain, i) => {
    const x = startX + i * (colW + colGap);

    // 컬럼 배경
    slide.addShape('roundRect', {
      x, y: startY, w: colW, h: 5.0,
      rectRadius: 0.1,
      fill: { color: 'FFFFFF' },
      line: { color: 'E2E8F0', width: 0.5 }
    });

    // 상단 accent 바
    slide.addShape('rect', {
      x: x + 0.02, y: startY, w: colW - 0.04, h: 0.06,
      fill: { color: domain.color }
    });

    // 도메인 제목
    slide.addText(domain.title, {
      x: x + 0.2, y: startY + 0.15, w: colW - 0.4, h: 0.45,
      fontSize: 17, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, autoFit: true
    });

    // "지금 가능" 섹션
    slide.addShape('rect', {
      x: x + 0.2, y: startY + 0.72, w: colW - 0.4, h: 0.01,
      fill: { color: 'E2E8F0' }
    });

    slide.addText('지금 가능 (양산·파일럿)', {
      x: x + 0.2, y: startY + 0.78, w: colW - 0.4, h: 0.32,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: domain.color, autoFit: true
    });

    slide.addText(domain.now, {
      x: x + 0.2, y: startY + 1.12, w: colW - 0.4, h: 1.55,
      fontSize: 12, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.45, valign: 'top', autoFit: true
    });

    // "3~5년 R&D" 섹션
    slide.addShape('roundRect', {
      x: x + 0.15, y: startY + 2.75, w: colW - 0.3, h: 0.32,
      rectRadius: 0.06,
      fill: { color: domain.color }
    });

    slide.addText('3~5년 R&D 과제', {
      x: x + 0.2, y: startY + 2.78, w: colW - 0.4, h: 0.26,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: 'FFFFFF', align: 'center', autoFit: true
    });

    slide.addText(domain.future, {
      x: x + 0.2, y: startY + 3.12, w: colW - 0.4, h: 1.6,
      fontSize: 12, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.45, valign: 'top', autoFit: true
    });
  });

  addPageNumber(slide, 6, TOTAL_SLIDES);
})();

// ============================================================
// [07] Section — Part 2. 핵심 인사이트 — 통합 포트폴리오
// ============================================================
(function slide07() {
  const slide = pptx.addSlide();

  // 좌측 다크 패널 (40%)
  slide.addShape('rect', {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 섹션 번호
  slide.addText('02', {
    x: 1.0, y: 2.2, w: 3.33, h: 1.5,
    fontSize: 80, fontFace: FONTS.kpi.fontFace, bold: true,
    color: COLORS.accent_yellow, align: 'center'
  });

  slide.addText('Key Insights', {
    x: 1.0, y: 3.8, w: 3.33, h: 0.5,
    fontSize: 16, fontFace: 'Pretendard',
    color: COLORS.text_on_dark, transparency: 30, align: 'center'
  });

  // 우측 섹션 제목
  slide.addText('Part 2', {
    x: 6.0, y: 2.2, w: 6.73, h: 0.5,
    fontSize: 18, fontFace: 'Pretendard',
    color: COLORS.accent_yellow
  });

  slide.addText('핵심 인사이트', {
    x: 6.0, y: 2.75, w: 6.73, h: 0.8,
    fontSize: 36, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary
  });

  // accent 라인
  slide.addShape('rect', {
    x: 6.0, y: 3.65, w: 3.0, h: 0.04,
    fill: { color: COLORS.accent_yellow }
  });

  // 우측 설명
  slide.addText('독립 기술이 아닌 통합 포트폴리오\n\n3가지 기술은 각각 독립적 가치를 지니지만, 조합할 때 비로소 기존 솔루션으로 불가능했던 공정 결과를 만들어낸다. 포트폴리오 통합이 진짜 차별화 지점이다.', {
    x: 6.0, y: 3.8, w: 6.73, h: 2.5,
    fontSize: 16, fontFace: 'Pretendard',
    color: COLORS.text_secondary,
    lineSpacingMultiple: 1.5
  });

  addPageNumber(slide, 7, TOTAL_SLIDES);
})();

// ============================================================
// [08] Process Flow — 이종금속 용접 통합 라인
// ============================================================
(function slide08() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '이종금속 용접 통합 라인: 3가지 기술 1개 라인에서 검증');

  const steps = [
    {
      title: '소재 투입',
      body: 'Cu-Al 이종금속 판재\n또는 EV 배터리 탭\n공정 파라미터 자동 인식',
      accentColor: CHART_STYLE.colors[0]
    },
    {
      title: '레이저 세정',
      body: '산화물·오일 제거\n인라인 세정 (무화학)\nREACH 규제 대응',
      accentColor: CHART_STYLE.colors[1]
    },
    {
      title: 'ARM 빔 쉐이핑 용접',
      body: '코어:링 비율 실시간 조정\nIMC 두께 5µm 이하 제어\n스패터 90%+ 감소',
      accentColor: CHART_STYLE.colors[2]
    },
    {
      title: 'AI 모니터링',
      body: '플라즈마 분광 실시간 분석\nOCT 용입깊이 측정\n이상 즉시 경보',
      accentColor: CHART_STYLE.colors[3]
    },
    {
      title: '양품 출하',
      body: '폐루프 검증 완료\n공정 데이터 자동 기록\n불량률 최소화',
      accentColor: CHART_STYLE.colors[4]
    }
  ];

  const n      = steps.length;
  const arrowW = 0.3;
  const stepW  = (12.13 - arrowW * (n - 1)) / n;
  const stepH  = 4.8;
  const stepY  = 1.8;

  steps.forEach((step, i) => {
    const x = 0.6 + i * (stepW + arrowW);

    // 스텝 배경 roundRect
    slide.addShape('roundRect', {
      x, y: stepY, w: stepW, h: stepH,
      rectRadius: 0.08,
      fill: { color: COLORS.bg_secondary }
    });

    // 상단 accent 컬러 바
    slide.addShape('roundRect', {
      x, y: stepY, w: stepW, h: 0.25,
      rectRadius: 0.08,
      fill: { color: step.accentColor }
    });

    // 스텝 번호
    slide.addText(`${i + 1}`, {
      x: x + 0.1, y: stepY + 0.33, w: stepW - 0.2, h: 0.4,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: step.accentColor, align: 'center'
    });

    // 스텝 제목
    slide.addText(step.title, {
      x: x + 0.1, y: stepY + 0.8, w: stepW - 0.2, h: 0.6,
      fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, align: 'center', autoFit: true
    });

    // 스텝 본문
    slide.addText(step.body, {
      x: x + 0.1, y: stepY + 1.5, w: stepW - 0.2, h: 2.9,
      fontSize: 12, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'center', valign: 'top',
      lineSpacingMultiple: 1.45, autoFit: true
    });

    // 화살표
    if (i < n - 1) {
      slide.addText('→', {
        x: x + stepW, y: stepY + (stepH / 2) - 0.2,
        w: arrowW, h: 0.4,
        fontSize: 18, fontFace: 'Pretendard', bold: true,
        color: COLORS.text_tertiary, align: 'center'
      });
    }
  });

  addPageNumber(slide, 8, TOTAL_SLIDES);
})();

// ============================================================
// [09] Cards — 3대 시너지 시나리오
// ============================================================
(function slide09() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '3대 시너지 시나리오');

  const scenarios = [
    {
      title: '이종금속 용접 통합 (R1+R2+R3)',
      body: '적용 기술: AI 모니터링 + ARM 빔 쉐이핑 + 레이저 세정\n목표 시장: EV 배터리 탭 용접 ($3.2B)\n가장 높은 ROI — 세 기술이 동일 공정에서 동시 적용 가능\n→ 단기 공략 1순위'
    },
    {
      title: 'LLO 수율 향상 (DOE+AI+세정)',
      body: '적용 기술: DOE 균일화 + AI 공정 제어 + 세정\n목표 시장: 대면적 플렉시블 디스플레이 OLED\n대면적 균일도 문제 해결이 핵심 병목\n→ 중기 공략 2순위'
    },
    {
      title: '범용 레이저 플랫폼 (HeSaaS)',
      body: '적용 기술: ARM + AI + 인라인 세정 통합 플랫폼\n목표: 공정별 전용 장비 → 소프트웨어 구독 전환\n구독·유지보수·데이터 서비스 반복 수익\n→ 장기 전략 비전 (3~5년)'
    }
  ];

  scenarios.forEach((card, i) => {
    const pos = CARD_2X3.positions[i];
    addCard(slide, {
      x: pos.x, y: pos.y,
      w: CARD_2X3.w, h: CARD_2X3.h,
      title: card.title,
      body: card.body,
      accentColor: CHART_STYLE.colors[i % CHART_STYLE.colors.length]
    });
  });

  // 하단 통합 메시지
  slide.addShape('roundRect', {
    x: 0.6, y: 4.65, w: 12.13, h: 2.15,
    rectRadius: 0.08,
    fill: { color: COLORS.bg_secondary },
    line: { color: 'E2E8F0', width: 0.5 }
  });

  slide.addShape('rect', {
    x: 0.62, y: 4.65, w: 12.09, h: 0.06,
    fill: { color: COLORS.accent_purple }
  });

  slide.addText('전략 판단', {
    x: 0.9, y: 4.78, w: 2.5, h: 0.35,
    fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_purple
  });

  slide.addText('시나리오 1은 기술 준비도와 시장 규모가 모두 높다. 시나리오 2는 고객 Pain Point가 명확하나 검증 기간이 필요하다. 시나리오 3은 장기적 플랫폼 비전으로, 지금은 인프라 구축 단계다.', {
    x: 0.9, y: 5.2, w: 11.63, h: 1.4,
    fontSize: 14, fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    lineSpacingMultiple: 1.5, valign: 'top', autoFit: true
  });

  addPageNumber(slide, 9, TOTAL_SLIDES);
})();

// ============================================================
// [10] Pyramid — 공통 기반 → 전용 응용
// ============================================================
(function slide10() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '공통 기반 → 전용 응용: 투자 효율의 핵심 원칙');

  // 피라미드: 3계층 (상→하 = 좁→넓), 역순으로 렌더링
  // 계층 정의 (0=상단/좁음, 2=하단/넓음)
  const tiers = [
    {
      label: '전용 응용 레이어',
      body: 'IMC 제어 / LLO 균일화 / 세정+텍스처링',
      color: CHART_STYLE.colors[0] // accent_blue
    },
    {
      label: '기술 모듈 레이어',
      body: 'ARM 빔 쉐이핑 / AI 모니터링 / 인라인 세정',
      color: CHART_STYLE.colors[1] // accent_cyan
    },
    {
      label: '공통 기반 레이어',
      body: '센서 인프라 / 데이터 파이프라인 / 광학 설계',
      color: CHART_STYLE.colors[2] // accent_yellow
    }
  ];

  // calcTierCoords: 하단이 가장 넓도록 reverse
  const coords = calcTierCoords(tiers.length, {
    startY: 1.9, endY: 6.8, maxW: 12.13, minW: 4.0
  }).reverse(); // reverse → [0]=넓음(하단), [1]=중간, [2]=좁음(상단)

  // 하단(넓은)부터 그려서 z-order 올바르게
  for (let i = 0; i < tiers.length; i++) {
    const coord = coords[i];       // i=0: 가장 넓음(하단 기반), i=2: 가장 좁음(상단)
    const tier  = tiers[tiers.length - 1 - i]; // i=0 → tier[2](공통 기반), i=2 → tier[0](전용 응용)

    slide.addShape('roundRect', {
      x: coord.x, y: coord.y, w: coord.w, h: coord.h,
      rectRadius: 0.06,
      fill: { color: tier.color }
    });

    // 계층 이름 (좌측)
    slide.addText(tier.label, {
      x: coord.x + 0.25, y: coord.y + 0.1, w: coord.w * 0.45, h: coord.h - 0.2,
      fontSize: 15, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: 'FFFFFF', valign: 'middle', autoFit: true
    });

    // 세부 내용 (우측)
    slide.addText(tier.body, {
      x: coord.x + coord.w * 0.5, y: coord.y + 0.1, w: coord.w * 0.47, h: coord.h - 0.2,
      fontSize: 13, fontFace: FONTS.body.fontFace,
      color: 'FFFFFF', valign: 'middle',
      lineSpacingMultiple: 1.3, autoFit: true
    });
  }

  // 투자 방향 설명
  slide.addShape('rect', {
    x: 0.6, y: 6.82, w: 12.13, h: 0.01,
    fill: { color: 'E2E8F0' }
  });

  addPageNumber(slide, 10, TOTAL_SLIDES);
})();

// ============================================================
// [11] Section — Part 3-1. AI 기반 실시간 레이저 공정 제어
// ============================================================
(function slide11() {
  const slide = pptx.addSlide();

  // 좌측 다크 패널 (40%)
  slide.addShape('rect', {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 섹션 번호
  slide.addText('03', {
    x: 1.0, y: 2.2, w: 3.33, h: 1.5,
    fontSize: 80, fontFace: FONTS.kpi.fontFace, bold: true,
    color: COLORS.accent_cyan, align: 'center'
  });

  slide.addText('AI Process Control', {
    x: 0.5, y: 3.8, w: 4.33, h: 0.5,
    fontSize: 13, fontFace: 'Pretendard',
    color: COLORS.text_on_dark, transparency: 30, align: 'center'
  });

  // 우측 섹션 제목
  slide.addText('Part 3-1', {
    x: 6.0, y: 2.2, w: 6.73, h: 0.5,
    fontSize: 18, fontFace: 'Pretendard',
    color: COLORS.accent_cyan
  });

  slide.addText('AI 기반 실시간\n레이저 공정 제어', {
    x: 6.0, y: 2.75, w: 6.73, h: 1.2,
    fontSize: 32, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary,
    lineSpacingMultiple: 1.2
  });

  // accent 라인
  slide.addShape('rect', {
    x: 6.0, y: 4.05, w: 3.0, h: 0.04,
    fill: { color: COLORS.accent_cyan }
  });

  // 우측 설명
  slide.addText('센서 데이터 → AI 판단 → 자동 조정의 4단계 성숙도 구조를 이해하면, 현재 양산 가능한 기술과 3~5년 R&D가 필요한 기술을 명확히 구분할 수 있다.', {
    x: 6.0, y: 4.2, w: 6.73, h: 2.0,
    fontSize: 16, fontFace: 'Pretendard',
    color: COLORS.text_secondary,
    lineSpacingMultiple: 1.5
  });

  addPageNumber(slide, 11, TOTAL_SLIDES);
})();

// ============================================================
// [12] Layered Stack — AI 공정 제어의 4단계 성숙도
// ============================================================
(function slide12() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'AI 공정 제어의 4단계 성숙도');

  // 4계층: 하→상 = L1→L4 (그리기는 L4부터 = 맨 아래 렌더)
  const layers = [
    {
      title: 'L4  AI 자율 폐루프 (R&D — Hype 주의)',
      body: '완전 자동 파라미터 조정 / 사람 개입 없는 실시간 최적화 / 양산 적용 사례 극소수 — 현재 연구 단계'
    },
    {
      title: 'L3  인간+AI 협력 제어',
      body: 'AI 경보 → 작업자 수동 조정 / 실질적 품질 향상 확인 / EWI·IPG 파일럿 적용 中'
    },
    {
      title: 'L2  AI 모니터링·이상감지 (양산 검증)',
      body: '포토다이오드·카메라 기반 이상 감지 / 용접 불량 실시간 경보 / Precitec WeldMaster·IPG LDD 출시'
    },
    {
      title: 'L1  센서 데이터 수집 (인프라)',
      body: '포토다이오드 / 고속 카메라 / OCT(광학 간섭 단층) / 플라즈마 분광 / LIBS — 모든 AI의 기초'
    }
  ];

  const n      = layers.length;
  const offset = 0.3;
  const totalH = 7.0 - 1.8 - offset * (n - 1);
  const layerH = totalH / n;

  // 맨 아래(i=n-1)부터 위로 그림 (z-order)
  for (let i = n - 1; i >= 0; i--) {
    const lx = 0.6 + offset * i;
    const ly = 1.8 + offset * (n - 1 - i);
    const lw = 12.13 - offset * i * 2;

    slide.addShape('roundRect', {
      x: lx, y: ly, w: lw, h: layerH,
      fill: { color: CHART_STYLE.colors[i % CHART_STYLE.colors.length] },
      rectRadius: 0.08
    });

    // 제목 (좌측)
    slide.addText(layers[i].title, {
      x: lx + 0.3, y: ly + 0.05, w: lw * 0.4 - 0.3, h: layerH * 0.85,
      fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: 'FFFFFF', valign: 'middle', autoFit: true
    });

    // 본문 (우측)
    slide.addText(layers[i].body, {
      x: lx + lw * 0.42, y: ly + 0.05, w: lw * 0.56, h: layerH * 0.85,
      fontSize: 12, fontFace: FONTS.body.fontFace,
      color: 'FFFFFF', valign: 'middle',
      lineSpacingMultiple: 1.35, autoFit: true
    });
  }

  addPageNumber(slide, 12, TOTAL_SLIDES);
})();

// ============================================================
// [13] Table — 센서 × AI 모델 × 공정: 적용 매트릭스
// ============================================================
(function slide13() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '센서 × AI 모델 × 공정: 적용 매트릭스');

  const headers = ['공정', '적합 센서', 'AI 모델', '성숙도', '우선순위'];

  const dataRows = [
    [
      { text: '이종금속 용접 (Cu-Al)', options: { bold: true, color: COLORS.text_primary } },
      '분광(플라즈마) + IR 카메라',
      'CNN + DNN 융합',
      { text: '파일럿 → 양산 전환 中', options: { color: '27AE60', bold: true } },
      { text: '★★★★★', options: { color: COLORS.accent_blue, bold: true } }
    ],
    [
      { text: 'LLO (디스플레이 분리)', options: { bold: true, color: COLORS.text_primary } },
      '분광 + OCT',
      'CNN 기반 수율 예측',
      { text: 'R&D (파일럿 초기)', options: { color: COLORS.accent_yellow, bold: true } },
      { text: '★★★', options: { color: COLORS.accent_yellow } }
    ],
    [
      { text: 'LILE (유리 내부 각인)', options: { bold: true, color: COLORS.text_primary } },
      'OCT + 고속 비전',
      'CNN 결함 분류',
      { text: 'R&D', options: { color: COLORS.accent_yellow, bold: true } },
      { text: '★★★', options: { color: COLORS.accent_yellow } }
    ],
    [
      { text: '글라스 절단', options: { bold: true, color: COLORS.text_primary } },
      '카메라 + IR',
      'CNN 균열 감지',
      { text: 'R&D', options: { color: COLORS.text_tertiary, bold: true } },
      { text: '★★', options: { color: COLORS.text_tertiary } }
    ],
    [
      { text: 'Selective 표면 처리', options: { bold: true, color: COLORS.text_primary } },
      '포토다이오드 + LIBS',
      'CNN 조성 분석',
      { text: 'R&D', options: { color: COLORS.text_tertiary, bold: true } },
      { text: '★★', options: { color: COLORS.text_tertiary } }
    ]
  ];

  // 동적 rowH 계산: (7.0 - 1.8 - 0.4) / (5 + 1) = 0.8
  const totalRows = dataRows.length + 1; // 헤더 포함
  const rowH = Math.max(0.3, (7.0 - 1.8 - 0.4) / totalRows);

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.8, w: 12.13,
    rowH: rowH,
    colW: [2.8, 2.8, 2.4, 2.0, 2.13]
  });

  addPageNumber(slide, 13, TOTAL_SLIDES);
})();

// ============================================================
// 파일 저장
// ============================================================
pptx.writeFile({ fileName: 'presentation-build/2026-03-26-laser-rd-frontier-technologies/part-1.pptx' })
  .then(() => console.log('Part 1 저장 완료: part-1.pptx'))
  .catch(err => console.error('저장 오류:', err));

// === Part 1 끝 ===

// ─────────────────────────────────────────────────────────────────────
// Slide 14 — TwoColumn: 이종금속 용접 AI: 세 접근법의 역할 분담
// ─────────────────────────────────────────────────────────────────────
function slide14_heterometal_ai_roles() {
  const slide = pptx.addSlide();

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_primary } });
  addTitleBar(slide, '이종금속 용접 AI: 세 접근법의 역할 분담');

  // ── 좌측 컬럼: 플라즈마 분광 → IMC 감지 ──
  slide.addShape('roundRect', {
    x: 0.6, y: 1.85, w: 5.865, h: 4.65,
    rectRadius: 0.1,
    fill: { color: COLORS.bg_secondary },
    line: { color: 'E2E8F0', width: 0.5 }
  });
  // 확신도 배지 (낮음)
  slide.addShape('roundRect', {
    x: 0.75, y: 2.0, w: 1.4, h: 0.32,
    rectRadius: 0.06,
    fill: { color: 'FFB020' },
    line: { color: 'FFB020', width: 0.01 }
  });
  slide.addText('확신도: 낮음', {
    x: 0.75, y: 2.0, w: 1.4, h: 0.32,
    fontSize: 9, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_on_dark, align: 'center', valign: 'middle', bold: true
  });

  slide.addText('플라즈마 분광 모니터링 → IMC 징후 감지', {
    x: 0.75, y: 2.42, w: 5.55, h: 0.5,
    fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary, wrap: true, autoFit: true
  });
  slide.addShape('rect', {
    x: 0.75, y: 2.97, w: 5.55, h: 0.02,
    fill: { color: 'E2E8F0' }
  });

  const leftPoints = [
    { label: '원리', value: '플라즈마 방출 분광으로 Cu/Al 증기비 실시간 감지 → IMC 형성 전조 포착' },
    { label: '현황', value: 'IMC 전용 사례 없음. 분광 모니터링 자체는 Ti/Al 용접에서 연구 수준 검증' },
    { label: '한계', value: '용접 풀 내부 IMC 생성과 분광 신호 간 정량적 상관관계 미확립' },
    { label: '권고', value: '즉시 도입 불가 — 12개월 데이터 수집 후 파일럿 검토' }
  ];

  leftPoints.forEach((pt, i) => {
    const yBase = 3.1 + i * 0.8;
    slide.addText(pt.label, {
      x: 0.85, y: yBase, w: 1.0, h: 0.26,
      fontSize: 9, fontFace: FONTS.caption.fontFace,
      color: COLORS.text_tertiary, bold: false
    });
    slide.addText(pt.value, {
      x: 1.9, y: yBase, w: 4.35, h: 0.65,
      fontSize: 10, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, wrap: true, autoFit: true, valign: 'top'
    });
  });

  // ── 우측 컬럼: Precitec LWM AI → OK/NOK ──
  slide.addShape('roundRect', {
    x: 6.865, y: 1.85, w: 5.865, h: 4.65,
    rectRadius: 0.1,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent_blue, width: 1.5 }
  });
  // 확신도 배지 (높음)
  slide.addShape('roundRect', {
    x: 7.02, y: 2.0, w: 1.4, h: 0.32,
    rectRadius: 0.06,
    fill: { color: COLORS.accent_cyan },
    line: { color: COLORS.accent_cyan, width: 0.01 }
  });
  slide.addText('확신도: 높음', {
    x: 7.02, y: 2.0, w: 1.4, h: 0.32,
    fontSize: 9, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_on_dark, align: 'center', valign: 'middle', bold: true
  });

  slide.addText('Precitec LWM AI → OK/NOK 자동 판정', {
    x: 7.02, y: 2.42, w: 5.55, h: 0.5,
    fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary, wrap: true, autoFit: true
  });
  slide.addShape('rect', {
    x: 7.02, y: 2.97, w: 5.55, h: 0.02,
    fill: { color: COLORS.accent_blue }
  });

  const rightPoints = [
    { label: '원리', value: '광다이오드 + 고속카메라로 용접 풀 감지, CNN 기반 OK/NOK 자동 판정' },
    { label: '현황', value: 'Audi 배터리 모듈 용접 24/7 양산 적용 — 실측 성과 다수 확인됨' },
    { label: '강점', value: 'IMC 제어보다 결함 감지 영역. 후속 리젝션 자동화로 직접 수율 연결' },
    { label: '권고', value: 'ARM 빔 쉐이핑과 결합 시 즉시 도입 가능 — 가장 현실적 경로' }
  ];

  rightPoints.forEach((pt, i) => {
    const yBase = 3.1 + i * 0.8;
    slide.addText(pt.label, {
      x: 7.12, y: yBase, w: 1.0, h: 0.26,
      fontSize: 9, fontFace: FONTS.caption.fontFace,
      color: COLORS.text_tertiary, bold: false
    });
    slide.addText(pt.value, {
      x: 8.17, y: yBase, w: 4.35, h: 0.65,
      fontSize: 10, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, wrap: true, autoFit: true, valign: 'top'
    });
  });

  // ── 하단 메시지 배너 ──
  slide.addShape('rect', {
    x: 0.6, y: 6.6, w: 12.13, h: 0.42,
    fill: { color: COLORS.bg_dark },
    line: { color: COLORS.bg_dark }
  });
  slide.addShape('rect', {
    x: 0.6, y: 6.6, w: 0.06, h: 0.42,
    fill: { color: COLORS.accent_cyan },
    line: { color: COLORS.accent_cyan }
  });
  slide.addText('전략 원칙: 모니터링 먼저(Precitec LWM) → 데이터 확보 후 단계적 폐루프 — 순서 역전 금지', {
    x: 0.8, y: 6.6, w: 11.8, h: 0.42,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_on_dark, valign: 'middle'
  });

  addPageNumber(slide, 14, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────────────
// Slide 15 — Content: LLO 탄화 감지 + 에너지 보정: 가능성과 한계
// ─────────────────────────────────────────────────────────────────────
function slide15_llo_charring_ai() {
  const slide = pptx.addSlide();

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_primary } });
  addTitleBar(slide, 'LLO 탄화 감지 + 에너지 보정: 가능성과 한계');

  // 핵심 경고 배너
  slide.addShape('rect', {
    x: 0.6, y: 1.85, w: 12.13, h: 0.5,
    fill: { color: 'FFF3CD' },
    line: { color: 'FFB020', width: 1 }
  });
  slide.addShape('rect', {
    x: 0.6, y: 1.85, w: 0.06, h: 0.5,
    fill: { color: 'FFB020' },
    line: { color: 'FFB020' }
  });
  slide.addText('⚠  탄화율 감소 50~70% 수치는 근거 없는 추정 — Critic N1 지적. 이 수치를 투자 판단 근거로 사용하지 말 것.  [확신도: 매우 낮음]', {
    x: 0.8, y: 1.85, w: 11.8, h: 0.5,
    fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: '7D4E00', valign: 'middle'
  });

  // 3열 레이아웃
  const cols = [
    {
      title: '기술 시나리오',
      accentColor: COLORS.accent_blue,
      items: [
        'AI + 분광 센서로 LLO 공정 중 탄화 실시간 감지',
        '탄화 신호 임계값 초과 시 → 레이저 에너지 자동 감쇄',
        '이론적 원리: 분광 발광비(CN band / C2 band) 변화 = 탄화 전조',
        '가능성 자체는 물리적으로 타당'
      ]
    },
    {
      title: '현실적 제약',
      accentColor: COLORS.accent_yellow,
      items: [
        'LLO 공정 탄화 전용 AI 사례 데이터 없음 — 산업계 미확인',
        '유리/OLED 계면 반응 특이성: 일반 금속 분광 모델 직접 이전 불가',
        '에너지 보정 응답 속도 vs LLO 공정 속도 정합성 검증 필요',
        '학습 데이터 확보에 최소 12개월 소요 예상'
      ]
    },
    {
      title: '현실적 접근',
      accentColor: COLORS.accent_cyan,
      items: [
        '즉시: 기존 LLO 라인에 분광 센서 부착 → 탄화 데이터 수집 시작',
        '6개월 후: 탄화 신호-품질 상관관계 분석',
        '12개월 후: 상관관계 확인 시 에너지 보정 파일럿',
        '가치: 데이터 자산 = 경쟁사 대비 AI 모델 차별화 해자'
      ]
    }
  ];

  const colW = 3.9;
  const colXs = [0.6, 4.68, 8.76];
  const colY = 2.5;
  const colH = 4.15;

  cols.forEach((col, i) => {
    const x = colXs[i];

    slide.addShape('roundRect', {
      x: x, y: colY, w: colW, h: colH,
      rectRadius: 0.1,
      fill: { color: 'FFFFFF' },
      line: { color: col.accentColor, width: 1 }
    });
    slide.addShape('rect', {
      x: x + 0.02, y: colY, w: colW - 0.04, h: 0.06,
      fill: { color: col.accentColor },
      line: { color: col.accentColor }
    });
    slide.addText(col.title, {
      x: x + 0.2, y: colY + 0.12, w: colW - 0.4, h: 0.38,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, autoFit: true
    });
    slide.addShape('rect', {
      x: x + 0.2, y: colY + 0.55, w: colW - 0.4, h: 0.01,
      fill: { color: 'E2E8F0' }
    });

    col.items.forEach((item, j) => {
      slide.addShape('ellipse', {
        x: x + 0.2, y: colY + 0.72 + j * 0.83, w: 0.18, h: 0.18,
        fill: { color: col.accentColor },
        line: { color: col.accentColor }
      });
      slide.addText(item, {
        x: x + 0.46, y: colY + 0.68 + j * 0.83, w: colW - 0.66, h: 0.72,
        fontSize: 10, fontFace: FONTS.body.fontFace,
        color: COLORS.text_secondary, wrap: true, autoFit: true, valign: 'top',
        lineSpacingMultiple: 1.3
      });
    });
  });

  addPageNumber(slide, 15, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────────────
// Slide 16 — Section: Part 3-2. 빔 쉐이핑 + SLM 홀로그래픽 공정
// ─────────────────────────────────────────────────────────────────────
function slide16_section_beam_shaping() {
  const slide = pptx.addSlide();

  // 좌 40% 다크 패널
  slide.addShape('rect', {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });
  // 우 60% 흰색 패널
  slide.addShape('rect', {
    x: 5.33, y: 0, w: 8.0, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  // 섹션 번호 (좌)
  slide.addText('3-2', {
    x: 0.6, y: 2.0, w: 4.1, h: 1.6,
    fontSize: 72, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_yellow, align: 'center', autoFit: true
  });
  slide.addText('SECTION', {
    x: 0.6, y: 3.7, w: 4.1, h: 0.4,
    fontSize: 11, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_on_dark, transparency: 40, align: 'center',
    charSpacing: 3
  });

  // 우측 제목
  slide.addText('빔 쉐이핑 +\nSLM 홀로그래픽 공정', {
    x: 6.0, y: 1.8, w: 6.73, h: 1.5,
    fontSize: 34, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary, lineSpacingMultiple: 1.15, autoFit: true
  });

  // 우측 설명
  slide.addText('ARM/AFX — 지금 도입 가능한 게임체인저부터\nSLM 홀로그래픽 — 연구 흥미도 높으나 양산 5년+까지', {
    x: 6.0, y: 3.5, w: 6.73, h: 1.0,
    fontSize: 15, fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary, lineSpacingMultiple: 1.5, wrap: true
  });

  // 핵심 키워드 배지 3개
  const badges = [
    { text: 'ARM/AFX — 즉시', color: COLORS.accent_cyan },
    { text: 'DOE — 저비용', color: COLORS.accent_blue },
    { text: 'SLM — 장기', color: COLORS.accent_purple }
  ];
  badges.forEach((b, i) => {
    const bx = 6.0 + i * 2.3;
    slide.addShape('roundRect', {
      x: bx, y: 4.8, w: 2.1, h: 0.42,
      rectRadius: 0.08,
      fill: { color: b.color },
      line: { color: b.color, width: 0.01 }
    });
    slide.addText(b.text, {
      x: bx, y: 4.8, w: 2.1, h: 0.42,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: 'FFFFFF', align: 'center', valign: 'middle'
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// Slide 17 — Comparison Table: 5가지 빔 쉐이핑 방식 비교
// ─────────────────────────────────────────────────────────────────────
function slide17_beam_shaping_comparison() {
  const slide = pptx.addSlide();

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_primary } });
  addTitleBar(slide, '5가지 빔 쉐이핑 방식 비교');

  const featColW = 2.2;
  const dataColW = (12.13 - featColW) / 5;  // 1.986

  const headers = ['기능 / 방식', 'ARM / AFX', 'DOE', '변형 거울', 'SLM (LCoS)', 'CBC'];
  const rows = [
    ['출력 한계',  'kW+',        'kW+',        'kW',        '~1.4 kW',   'kW+'],
    ['응답 속도',  'µs (초고속)', '고정 (수동)', 'ms',        'ms',        'MHz'],
    ['패턴 유연성','7단계',      '단일 패턴',   '연속 조정', '완전 유연', '제한적'],
    ['양산 검증',  '양산 (다수 OEM)', '양산 (Holoor)', '파일럿',    'R&D',       'R&D'],
    ['비용',       '중',          '저',          '중~고',     '고',        '고'],
  ];

  // 색상 매핑
  const colAccents = [
    COLORS.accent_cyan,   // ARM/AFX
    COLORS.accent_blue,   // DOE
    COLORS.accent_yellow, // 변형거울
    COLORS.accent_purple, // SLM
    COLORS.accent_red     // CBC
  ];

  // 헤더 행 구성
  const tableRows = [];
  const headerRow = [
    { text: '기능 / 방식', options: { ...TABLE_STYLE.header, align: 'center' } },
    ...headers.slice(1).map((h, i) => ({
      text: h,
      options: { ...TABLE_STYLE.header, align: 'center', fill: { color: colAccents[i] } }
    }))
  ];
  tableRows.push(headerRow);

  rows.forEach((row, ri) => {
    const isAlt = ri % 2 === 1;
    const base  = isAlt ? TABLE_STYLE.cellAlt : TABLE_STYLE.cell;
    const dataRow = row.map((cell, ci) => {
      if (ci === 0) {
        return { text: cell, options: { ...base, bold: true, color: COLORS.text_primary, align: 'left' } };
      }
      // 양산 행 강조
      let extra = {};
      if (ri === 3) {
        if (ci === 1 || ci === 2) extra = { bold: true, color: COLORS.accent_cyan };
        else if (ci === 3) extra = { color: COLORS.accent_yellow };
        else extra = { color: COLORS.accent_red };
      }
      return { text: cell, options: { ...base, align: 'center', ...extra } };
    });
    tableRows.push(dataRow);
  });

  const colWidths = [featColW, dataColW, dataColW, dataColW, dataColW, dataColW];
  slide.addTable(tableRows, {
    x: 0.6, y: 1.85, w: 12.13,
    border: { type: 'solid', pt: 0.5, color: 'E2E8F0' },
    colW: colWidths,
    rowH: 0.65,
    autoPage: false,
    margin: [5, 8, 5, 8]
  });

  // 추천 배너
  slide.addShape('rect', {
    x: 0.6, y: 6.05, w: 12.13, h: 0.42,
    fill: { color: COLORS.accent_cyan },
    line: { color: COLORS.accent_cyan }
  });
  slide.addText('▶  즉시 투자 우선순위: ARM/AFX (양산+최고효과) → DOE (저비용 LLO) → 변형거울 (파일럿) ── SLM/CBC는 선행연구 수준', {
    x: 0.8, y: 6.05, w: 11.8, h: 0.42,
    fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_on_dark, valign: 'middle'
  });

  addPageNumber(slide, 17, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────────────
// Slide 18 — TwoColumn: ARM/AFX — 지금 도입 가능한 게임체인저
// ─────────────────────────────────────────────────────────────────────
function slide18_arm_afx_gamechanger() {
  const slide = pptx.addSlide();

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_primary } });
  addTitleBar(slide, 'ARM / AFX: 지금 도입 가능한 게임체인저');

  // 좌: nLIGHT AFX-2000
  slide.addShape('roundRect', {
    x: 0.6, y: 1.85, w: 5.865, h: 4.8,
    rectRadius: 0.1,
    fill: { color: COLORS.bg_secondary },
    line: { color: 'E2E8F0', width: 0.5 }
  });
  slide.addShape('rect', {
    x: 0.6, y: 1.85, w: 5.865, h: 0.06,
    fill: { color: COLORS.accent_blue },
    line: { color: COLORS.accent_blue }
  });
  slide.addText('nLIGHT AFX-2000', {
    x: 0.8, y: 1.98, w: 5.45, h: 0.45,
    fontSize: 16, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary, autoFit: true
  });
  slide.addShape('rect', {
    x: 0.8, y: 2.5, w: 5.45, h: 0.01,
    fill: { color: 'E2E8F0' }
  });

  const leftData = [
    { kpi: '7단계', label: '코어:링 비율 (µs 전환)', desc: '공정별 최적 패턴 즉시 전환 — 용접·절삭·표면처리 단일 장비 대응' },
    { kpi: '1대 = 4대', label: '장비 대체 효과', desc: 'EOS & DMG Mori LPBF 시스템 채택. 설비 투자 및 바닥면적 대폭 절감' },
    { kpi: '커스텀', label: '빔 프로파일 자유도', desc: '링 / 탑햇 / 가우시안 — 소재·두께별 최적 프로파일 적용 가능' }
  ];

  leftData.forEach((d, i) => {
    const yBase = 2.65 + i * 1.27;
    slide.addShape('roundRect', {
      x: 0.8, y: yBase, w: 5.45, h: 1.1,
      rectRadius: 0.08,
      fill: { color: 'FFFFFF' },
      line: { color: 'E2E8F0', width: 0.5 }
    });
    slide.addText(d.kpi, {
      x: 0.95, y: yBase + 0.08, w: 1.6, h: 0.45,
      fontSize: 24, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.accent_blue, align: 'left', autoFit: true
    });
    slide.addText(d.label, {
      x: 2.65, y: yBase + 0.1, w: 2.9, h: 0.38,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, valign: 'middle', wrap: true, autoFit: true
    });
    slide.addText(d.desc, {
      x: 0.95, y: yBase + 0.57, w: 5.1, h: 0.45,
      fontSize: 9, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, wrap: true, autoFit: true
    });
  });

  // 우: Coherent ARM
  slide.addShape('roundRect', {
    x: 6.865, y: 1.85, w: 5.865, h: 4.8,
    rectRadius: 0.1,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent_cyan, width: 1.5 }
  });
  slide.addShape('rect', {
    x: 6.865, y: 1.85, w: 5.865, h: 0.06,
    fill: { color: COLORS.accent_cyan },
    line: { color: COLORS.accent_cyan }
  });
  slide.addText('Coherent ARM', {
    x: 7.05, y: 1.98, w: 5.45, h: 0.45,
    fontSize: 16, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary, autoFit: true
  });
  slide.addShape('rect', {
    x: 7.05, y: 2.5, w: 5.45, h: 0.01,
    fill: { color: COLORS.accent_cyan }
  });

  const rightData = [
    { kpi: '스패터 90%+', label: 'Cu-Al 용접 스패터 감소', desc: 'EV 배터리 탭 Cu-Al 이종금속 용접. 링 빔으로 용융 풀 안정화 — 양산 실증' },
    { kpi: 'IMC 억제', label: '금속간 화합물 생성 감소', desc: '코어:링 비율로 열구배 제어 → IMC 두께 감소. Cu-Al 용접의 핵심 과제 해결' },
    { kpi: 'EV 배터리', label: '직접 연결 시장', desc: '$3.2B 레이저 배터리 용접 시장. 세정 전처리 + ARM 용접 조합으로 1라인 완결' }
  ];

  rightData.forEach((d, i) => {
    const yBase = 2.65 + i * 1.27;
    slide.addShape('roundRect', {
      x: 7.05, y: yBase, w: 5.45, h: 1.1,
      rectRadius: 0.08,
      fill: { color: 'FFFFFF' },
      line: { color: 'E2E8F0', width: 0.5 }
    });
    slide.addText(d.kpi, {
      x: 7.2, y: yBase + 0.08, w: 2.0, h: 0.45,
      fontSize: 20, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.accent_cyan, align: 'left', autoFit: true
    });
    slide.addText(d.label, {
      x: 9.3, y: yBase + 0.1, w: 3.0, h: 0.38,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, valign: 'middle', wrap: true, autoFit: true
    });
    slide.addText(d.desc, {
      x: 7.2, y: yBase + 0.57, w: 5.1, h: 0.45,
      fontSize: 9, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, wrap: true, autoFit: true
    });
  });

  addPageNumber(slide, 18, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────────────
// Slide 19 — Content: DOE 기반 LLO 균일화: 저투자 고효과 경로
// ─────────────────────────────────────────────────────────────────────
function slide19_doe_llo_uniformity() {
  const slide = pptx.addSlide();

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_primary } });
  addTitleBar(slide, 'DOE 기반 LLO 균일화: 저투자 고효과 경로');

  // 경고 배너
  slide.addShape('rect', {
    x: 0.6, y: 1.85, w: 12.13, h: 0.44,
    fill: { color: 'FFF3CD' },
    line: { color: 'FFB020', width: 1 }
  });
  slide.addShape('rect', {
    x: 0.6, y: 1.85, w: 0.06, h: 0.44,
    fill: { color: 'FFB020' },
    line: { color: 'FFB020' }
  });
  slide.addText('⚠  수율 향상 5~15%p는 출처 부재 추정값 — Critic N2 지적. 현재 근거 없음.  [확신도: 낮음]', {
    x: 0.8, y: 1.85, w: 11.8, h: 0.44,
    fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: '7D4E00', valign: 'middle'
  });

  // 핵심 지표 3개
  const kpis = [
    { value: '±15% → ±3%', label: '엑시머 라인빔 균일도 개선', sub: 'DOE 삽입 후 목표 시나리오 (시뮬레이션 기반)', color: COLORS.accent_blue },
    { value: '저', label: '초기 투자 수준', sub: 'DOE 광학 소자 교체만으로 기존 라인 적용 — 장비 교체 불필요', color: COLORS.accent_cyan },
    { value: '6개월', label: '파일럿 소요 기간 (추정)', sub: '광학 시뮬레이션 → DOE 제작 → 현장 삽입 → 균일도 측정', color: COLORS.accent_yellow }
  ];

  const kpiW = 3.7;
  const kpiXs = [0.6, 4.65, 8.7];

  kpis.forEach((kpi, i) => {
    const x = kpiXs[i];
    slide.addShape('roundRect', {
      x: x, y: 2.45, w: kpiW, h: 2.1,
      rectRadius: 0.1,
      fill: { color: COLORS.bg_secondary },
      line: { color: 'E2E8F0', width: 0.5 }
    });
    slide.addShape('rect', {
      x: x + 0.02, y: 2.45, w: kpiW - 0.04, h: 0.06,
      fill: { color: kpi.color },
      line: { color: kpi.color }
    });
    slide.addText(kpi.value, {
      x: x + 0.15, y: 2.58, w: kpiW - 0.3, h: 0.7,
      fontSize: 24, fontFace: FONTS.kpi.fontFace, bold: true,
      color: kpi.color, align: 'center', autoFit: true
    });
    slide.addShape('rect', {
      x: x + 0.15, y: 3.32, w: kpiW - 0.3, h: 0.01,
      fill: { color: 'E2E8F0' }
    });
    slide.addText(kpi.label, {
      x: x + 0.15, y: 3.38, w: kpiW - 0.3, h: 0.38,
      fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, align: 'center', wrap: true, autoFit: true
    });
    slide.addText(kpi.sub, {
      x: x + 0.15, y: 3.8, w: kpiW - 0.3, h: 0.5,
      fontSize: 9, fontFace: FONTS.body.fontFace,
      color: COLORS.text_tertiary, align: 'center', wrap: true
    });
  });

  // 접근 순서
  slide.addText('현실적 접근 순서', {
    x: 0.6, y: 4.7, w: 3.0, h: 0.35,
    fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary
  });

  const steps = [
    { step: '1', text: '광학 시뮬레이션 (Zemax/VirtualLab): 현 라인 균일도 맵핑 + DOE 스펙 도출', color: COLORS.accent_blue },
    { step: '2', text: 'DOE 광학 소자 제작 발주 (Holoor, PowerPhotonic) — 8~12주', color: COLORS.accent_cyan },
    { step: '3', text: '현장 삽입 후 균일도 재측정. ±3% 달성 여부 확인', color: COLORS.accent_yellow },
    { step: '4', text: '수율 데이터 수집 3개월 → 수율 향상 실측 후 수치 확정', color: COLORS.accent_cyan }
  ];

  steps.forEach((s, i) => {
    const stepX = 0.6 + i * 3.05;
    slide.addShape('ellipse', {
      x: stepX, y: 5.12, w: 0.4, h: 0.4,
      fill: { color: s.color },
      line: { color: s.color }
    });
    slide.addText(s.step, {
      x: stepX, y: 5.12, w: 0.4, h: 0.4,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });
    slide.addText(s.text, {
      x: stepX + 0.5, y: 5.1, w: 2.45, h: 0.75,
      fontSize: 9, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, wrap: true, autoFit: true, valign: 'top',
      lineSpacingMultiple: 1.3
    });
    if (i < steps.length - 1) {
      slide.addShape('rect', {
        x: stepX + 2.97, y: 5.3, w: 0.2, h: 0.02,
        fill: { color: 'E2E8F0' }
      });
    }
  });

  addPageNumber(slide, 19, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────────────
// Slide 20 — Content: SLM 홀로그래픽 — 연구 흥미도 높으나 양산 5년+
// ─────────────────────────────────────────────────────────────────────
function slide20_slm_holographic() {
  const slide = pptx.addSlide();

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_primary } });
  addTitleBar(slide, 'SLM 홀로그래픽: 연구 흥미도 높으나 양산 5년+');

  // 경고 배너
  slide.addShape('rect', {
    x: 0.6, y: 1.85, w: 12.13, h: 0.44,
    fill: { color: 'FDECEA' },
    line: { color: COLORS.accent_red, width: 1 }
  });
  slide.addShape('rect', {
    x: 0.6, y: 1.85, w: 0.06, h: 0.44,
    fill: { color: COLORS.accent_red },
    line: { color: COLORS.accent_red }
  });
  slide.addText('⚠  Critic D6 내부 모순: "5kW — 3~5년" vs 반증 증거 "10년+". 5kW 달성은 소재 혁신 선행 필요.  [확신도: 낮음]', {
    x: 0.8, y: 1.85, w: 11.8, h: 0.44,
    fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: 'C0392B', valign: 'middle'
  });

  // 좌: 현황 / 우: 한계 + 권고
  // 현황 블록
  slide.addShape('roundRect', {
    x: 0.6, y: 2.42, w: 5.865, h: 4.1,
    rectRadius: 0.1,
    fill: { color: 'FFFFFF' },
    line: { color: COLORS.accent_purple, width: 1 }
  });
  slide.addShape('rect', {
    x: 0.6, y: 2.42, w: 5.865, h: 0.06,
    fill: { color: COLORS.accent_purple },
    line: { color: COLORS.accent_purple }
  });
  slide.addText('기술 현황', {
    x: 0.8, y: 2.54, w: 5.45, h: 0.38,
    fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary
  });
  slide.addShape('rect', {
    x: 0.8, y: 2.98, w: 5.45, h: 0.01,
    fill: { color: 'E2E8F0' }
  });

  const currentFacts = [
    { num: '1.4 kW', desc: '세계 기록 (Meadowlark Optics, LCoS 기반) — 안정 운용 임계값' },
    { num: '2 kW', desc: 'Fraunhofer ILT 멀티빔 플랫폼 — 연구소 환경 데모 수준' },
    { num: '~1 kW', desc: '산업 응용 실측 안정 운용 범위 — 현실적 상한선' },
    { num: '완전 유연', desc: '빔 패턴 실시간 재프로그래밍 — 이론적 최대 유연성' }
  ];

  currentFacts.forEach((f, i) => {
    const yBase = 3.1 + i * 0.83;
    slide.addText(f.num, {
      x: 0.8, y: yBase, w: 1.4, h: 0.35,
      fontSize: 16, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.accent_purple, align: 'left', autoFit: true
    });
    slide.addText(f.desc, {
      x: 2.3, y: yBase, w: 3.8, h: 0.65,
      fontSize: 10, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, wrap: true, valign: 'top', autoFit: true,
      lineSpacingMultiple: 1.3
    });
  });

  // 한계 + 권고 블록
  slide.addShape('roundRect', {
    x: 6.865, y: 2.42, w: 5.865, h: 4.1,
    rectRadius: 0.1,
    fill: { color: COLORS.bg_secondary },
    line: { color: 'E2E8F0', width: 0.5 }
  });
  slide.addShape('rect', {
    x: 6.865, y: 2.42, w: 5.865, h: 0.06,
    fill: { color: COLORS.accent_red },
    line: { color: COLORS.accent_red }
  });
  slide.addText('핵심 병목 & 권고', {
    x: 7.05, y: 2.54, w: 5.45, h: 0.38,
    fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary
  });
  slide.addShape('rect', {
    x: 7.05, y: 2.98, w: 5.45, h: 0.01,
    fill: { color: 'E2E8F0' }
  });

  const limits = [
    { icon: '🔴', text: '5 kW 달성: 액정 소재 내열성 근본 한계 — 소재 혁신 없이 불가', color: COLORS.accent_red },
    { icon: '🔴', text: '고출력 시 위상 안정성 급격 저하 — 열렌즈 효과', color: COLORS.accent_red },
    { icon: '🟡', text: 'LILE 마스크리스 비전 (FMM 제거) — 장기 R&D, 즉시 연결 불가', color: COLORS.accent_yellow },
    { icon: '🟢', text: '권고: 선행연구(논문 추적 + 소재 동향)만 유지. 대규모 즉시 투자 금지', color: COLORS.accent_cyan }
  ];

  limits.forEach((l, i) => {
    const yBase = 3.1 + i * 0.83;
    slide.addShape('roundRect', {
      x: 7.05, y: yBase, w: 5.45, h: 0.7,
      rectRadius: 0.06,
      fill: { color: 'FFFFFF' },
      line: { color: l.color, width: 0.5 }
    });
    slide.addText(l.text, {
      x: 7.2, y: yBase + 0.05, w: 5.15, h: 0.6,
      fontSize: 10, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, wrap: true, valign: 'middle', autoFit: true,
      lineSpacingMultiple: 1.3
    });
  });

  addPageNumber(slide, 20, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────────────
// Slide 21 — Content: 기존 어플리케이션 확장 — 이종금속 + 글라스 + LILE
// ─────────────────────────────────────────────────────────────────────
function slide21_application_expansion() {
  const slide = pptx.addSlide();

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_primary } });
  addTitleBar(slide, '기존 어플리케이션 확장: 이종금속 + 글라스 + LILE');

  const apps = [
    {
      title: '이종금속 용접 (Cu-Al)',
      badge: '확신도: 높음',
      badgeColor: COLORS.accent_cyan,
      content: 'ARM 코어:링으로 IMC 두께 제어\n\n• Coherent ARM Cu-Al 용접 스패터 90%+ 감소 — 양산 실증\n• 코어:링 비율 최적화 = 열구배 제어 = IMC 층 억제\n• EV 배터리 탭 용접 직접 적용 가능 — 즉시 도입 대상',
      accentColor: COLORS.accent_cyan
    },
    {
      title: '글라스 커팅 / 표면처리',
      badge: '확신도: 중간',
      badgeColor: COLORS.accent_yellow,
      content: '베셀빔 DOE + 적응형 광학 조합\n\n• 베셀빔 비회절 특성 → 두꺼운 글라스 단면 품질 개선\n• 마이크로크랙 30~50% 감소 추정 [중간 — 조건부 타당]\n• 적응형 광학으로 초점 심도 동적 조정 — 굴곡면 대응\n• 권고: 현 라인 데이터 측정 후 DOE 스펙 설계',
      accentColor: COLORS.accent_yellow
    },
    {
      title: 'LILE (레이저 유도 분리)',
      badge: '확신도: 낮음 / 장기',
      badgeColor: COLORS.accent_purple,
      content: 'SLM 마스크리스 → FMM 제거 비전\n\n• LILE + SLM = FMM 없이 픽셀 패터닝 단일 공정 이론\n• 현재 SLM 출력 제약 (~1 kW)으로 LILE 요구 에너지 미달\n• 잉크젯 OLED와 경쟁 — 전환 시 레이저 수요 자체 감소 리스크\n• 권고: 3~5년 선행연구. 잉크젯 진행 속도 모니터링 병행',
      accentColor: COLORS.accent_purple
    }
  ];

  const colW = 3.9;
  const colXs = [0.6, 4.68, 8.76];
  const colY = 1.85;
  const colH = 4.65;

  apps.forEach((app, i) => {
    const x = colXs[i];

    slide.addShape('roundRect', {
      x: x, y: colY, w: colW, h: colH,
      rectRadius: 0.1,
      fill: { color: 'FFFFFF' },
      line: { color: app.accentColor, width: 1.5 }
    });
    slide.addShape('rect', {
      x: x + 0.02, y: colY, w: colW - 0.04, h: 0.06,
      fill: { color: app.accentColor },
      line: { color: app.accentColor }
    });

    // 확신도 배지
    slide.addShape('roundRect', {
      x: x + colW - 2.1, y: colY + 0.1, w: 2.0, h: 0.28,
      rectRadius: 0.05,
      fill: { color: app.badgeColor },
      line: { color: app.badgeColor, width: 0.01 }
    });
    slide.addText(app.badge, {
      x: x + colW - 2.1, y: colY + 0.1, w: 2.0, h: 0.28,
      fontSize: 8, fontFace: FONTS.caption.fontFace,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle', bold: true
    });

    slide.addText(app.title, {
      x: x + 0.2, y: colY + 0.48, w: colW - 0.4, h: 0.42,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, wrap: true, autoFit: true
    });
    slide.addShape('rect', {
      x: x + 0.2, y: colY + 0.97, w: colW - 0.4, h: 0.01,
      fill: { color: 'E2E8F0' }
    });
    slide.addText(app.content, {
      x: x + 0.2, y: colY + 1.08, w: colW - 0.4, h: colH - 1.28,
      fontSize: 10, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, wrap: true, autoFit: true,
      lineSpacingMultiple: 1.4, valign: 'top'
    });
  });

  addPageNumber(slide, 21, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────────────
// Slide 22 — Section: Part 3-3. 레이저 세정 — Selective 제거 기술의 직접 확장
// ─────────────────────────────────────────────────────────────────────
function slide22_section_laser_cleaning() {
  const slide = pptx.addSlide();

  // 좌 40% 다크
  slide.addShape('rect', {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });
  // 우 60% 흰색
  slide.addShape('rect', {
    x: 5.33, y: 0, w: 8.0, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  // 섹션 번호
  slide.addText('3-3', {
    x: 0.6, y: 2.0, w: 4.1, h: 1.6,
    fontSize: 72, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_red, align: 'center', autoFit: true
  });
  slide.addText('SECTION', {
    x: 0.6, y: 3.7, w: 4.1, h: 0.4,
    fontSize: 11, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_on_dark, transparency: 40, align: 'center',
    charSpacing: 3
  });

  // 우측 제목
  slide.addText('레이저 세정:\nSelective 제거 기술의 직접 확장', {
    x: 6.0, y: 1.8, w: 6.73, h: 1.5,
    fontSize: 32, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary, lineSpacingMultiple: 1.15, autoFit: true
  });

  slide.addText('기존 Selective 제거 역량이 세정에 직결되는 이유:\n동일한 광흡수율 차이 원리 — 소재 경계에서의 선택적 에너지 전달', {
    x: 6.0, y: 3.5, w: 6.73, h: 1.1,
    fontSize: 14, fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary, lineSpacingMultiple: 1.5, wrap: true
  });

  // 핵심 포인트 배지
  const pts = [
    { text: '전처리 세정', color: COLORS.accent_blue },
    { text: '후처리 세정', color: COLORS.accent_cyan },
    { text: '표면 활성화', color: COLORS.accent_yellow }
  ];
  pts.forEach((p, i) => {
    const bx = 6.0 + i * 2.3;
    slide.addShape('roundRect', {
      x: bx, y: 4.8, w: 2.1, h: 0.42,
      rectRadius: 0.08,
      fill: { color: p.color },
      line: { color: p.color, width: 0.01 }
    });
    slide.addText(p.text, {
      x: bx, y: 4.8, w: 2.1, h: 0.42,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: 'FFFFFF', align: 'center', valign: 'middle'
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// Slide 23 — Icon Grid: 레이저 세정 4가지 원리와 적용 영역
// ─────────────────────────────────────────────────────────────────────
function slide23_cleaning_principles_grid() {
  const slide = pptx.addSlide();

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_primary } });
  addTitleBar(slide, '레이저 세정 4가지 원리와 적용 영역');

  const items = [
    {
      icon: '🔥',
      title: '열적 절삭 (Thermal Ablation)',
      body: '금속 산화물 / 도장 제거\n\n고에너지 펄스 → 오염층 급속 가열 → 기화 제거\nSelective 제거와 동일 원리: 기재-오염물 흡수율 차이 활용\n\n적용: 철강/Al 산화물, 용접 전 스케일 제거'
    },
    {
      icon: '⚡',
      title: '광화학 분해 (Photochemical)',
      body: '반도체 / 정밀 전자 부품\n\nUV 단파장 → 분자 결합 직접 절단 (열 최소화)\n수 nm 레벨 정밀 제거 — 기재 손상 최소\n\n적용: 웨이퍼 표면, PCB 잔류 플럭스, OLED 계면'
    },
    {
      icon: '💥',
      title: '충격파 제거 (Laser Shock)',
      body: '미세 파티클 / 웨이퍼\n\n플라즈마 팽창 → 충격파 → 파티클 분리\n비접촉 — 수 µm 이하 미세 파티클 제거 가능\n\n적용: 반도체 웨이퍼, 정밀 광학 부품'
    },
    {
      icon: '🌊',
      title: '기화 증발 (Dry Steam)',
      body: '대면적 / 중공업 세정\n\n연속파 레이저 → 오염물 가열 증발\n넓은 면적 고속 처리 — 수중 또는 건식 방식\n\n적용: 대형 구조물 녹 제거, 선박 도장 제거'
    }
  ];

  // 2x2 그리드 커스텀 배치
  const positions = [
    { x: 0.6,  y: 1.85, w: 5.865, h: 2.5 },
    { x: 6.865, y: 1.85, w: 5.865, h: 2.5 },
    { x: 0.6,  y: 4.5,  w: 5.865, h: 2.5 },
    { x: 6.865, y: 4.5,  w: 5.865, h: 2.5 }
  ];
  const accentColors = [COLORS.accent_red, COLORS.accent_blue, COLORS.accent_yellow, COLORS.accent_cyan];

  items.forEach((item, i) => {
    const pos = positions[i];
    const ac = accentColors[i];

    slide.addShape('roundRect', {
      x: pos.x, y: pos.y, w: pos.w, h: pos.h,
      rectRadius: 0.1,
      fill: { color: 'FFFFFF' },
      line: { color: ac, width: 1 }
    });
    slide.addShape('rect', {
      x: pos.x + 0.02, y: pos.y, w: pos.w - 0.04, h: 0.06,
      fill: { color: ac },
      line: { color: ac }
    });

    // 아이콘
    slide.addText(item.icon, {
      x: pos.x + 0.15, y: pos.y + 0.12, w: 0.55, h: 0.55,
      fontSize: 22, fontFace: FONTS.body.fontFace,
      color: ac, align: 'center', valign: 'middle'
    });

    slide.addText(item.title, {
      x: pos.x + 0.8, y: pos.y + 0.12, w: pos.w - 0.95, h: 0.55,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, wrap: true, autoFit: true, valign: 'middle'
    });

    slide.addShape('rect', {
      x: pos.x + 0.2, y: pos.y + 0.75, w: pos.w - 0.4, h: 0.01,
      fill: { color: 'E2E8F0' }
    });

    slide.addText(item.body, {
      x: pos.x + 0.2, y: pos.y + 0.86, w: pos.w - 0.4, h: pos.h - 1.0,
      fontSize: 10, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, wrap: true, autoFit: true,
      lineSpacingMultiple: 1.35, valign: 'top'
    });
  });

  addPageNumber(slide, 23, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────────────
// Slide 24 — Comparison Table: 레이저 세정 vs 경쟁 기술
// ─────────────────────────────────────────────────────────────────────
function slide24_cleaning_vs_competitors() {
  const slide = pptx.addSlide();

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_primary } });
  addTitleBar(slide, '레이저 세정 vs 경쟁 기술 5종 비교');

  const featColW  = 2.3;
  const dataColW  = (12.13 - featColW) / 5;  // 1.966

  // 헤더 색상
  const headerColors = [
    COLORS.accent_cyan,   // 레이저
    COLORS.accent_red,    // 화학
    'A0AEC0',             // 샌드블라스팅
    COLORS.accent_blue,   // 드라이아이스
    COLORS.accent_yellow  // 초음파
  ];

  const headers = ['기능 / 기술', '레이저', '화학 처리', '샌드블라스팅', '드라이아이스', '초음파'];

  // 심볼 정의
  const EX = '\u2713\u2713'; // 매우좋음 (✓✓)
  const GD = '\u2713';       // 좋음 (✓)
  const MD = '\u25CB';       // 중간 (○)
  const BD = '\u2717';       // 나쁨 (✗)

  const tableData = [
    { feat: '환경 영향',   vals: [EX, BD, BD, GD, MD], colors: [COLORS.accent_cyan, COLORS.accent_red, COLORS.accent_red, COLORS.accent_cyan, COLORS.text_tertiary] },
    { feat: '선택성',      vals: [EX, BD, BD, MD, MD], colors: [COLORS.accent_cyan, COLORS.accent_red, COLORS.accent_red, COLORS.text_tertiary, COLORS.text_tertiary] },
    { feat: '기재 손상',   vals: [EX, BD, BD, GD, GD], colors: [COLORS.accent_cyan, COLORS.accent_red, COLORS.accent_red, COLORS.accent_cyan, COLORS.accent_cyan] },
    { feat: '처리 속도',   vals: [MD, GD, GD, GD, MD], colors: [COLORS.text_tertiary, COLORS.accent_blue, COLORS.accent_blue, COLORS.accent_blue, COLORS.text_tertiary] },
    { feat: '자동화',      vals: [GD, MD, MD, MD, MD], colors: [COLORS.accent_cyan, COLORS.text_tertiary, COLORS.text_tertiary, COLORS.text_tertiary, COLORS.text_tertiary] },
    { feat: 'CAPEX',       vals: [BD, GD, GD, MD, MD], colors: [COLORS.accent_red, COLORS.accent_cyan, COLORS.accent_cyan, COLORS.text_tertiary, COLORS.text_tertiary] },
    { feat: 'OPEX',        vals: [EX, BD, BD, MD, MD], colors: [COLORS.accent_cyan, COLORS.accent_red, COLORS.accent_red, COLORS.text_tertiary, COLORS.text_tertiary] },
  ];

  const tableRows = [];

  // 헤더 행
  tableRows.push([
    { text: '기능 / 기술', options: { ...TABLE_STYLE.header, align: 'center' } },
    ...headers.slice(1).map((h, i) => ({
      text: h,
      options: { ...TABLE_STYLE.header, align: 'center', fill: { color: headerColors[i] } }
    }))
  ]);

  tableData.forEach((row, ri) => {
    const isAlt = ri % 2 === 1;
    const base  = isAlt ? TABLE_STYLE.cellAlt : TABLE_STYLE.cell;
    tableRows.push([
      { text: row.feat, options: { ...base, bold: true, color: COLORS.text_primary } },
      ...row.vals.map((v, vi) => ({
        text: v,
        options: { ...base, align: 'center', bold: true, fontSize: 14, color: row.colors[vi] }
      }))
    ]);
  });

  const colWidths = [featColW, dataColW, dataColW, dataColW, dataColW, dataColW];
  slide.addTable(tableRows, {
    x: 0.6, y: 1.85, w: 12.13,
    border: { type: 'solid', pt: 0.5, color: 'E2E8F0' },
    colW: colWidths,
    rowH: 0.6,
    autoPage: false,
    margin: [4, 8, 4, 8]
  });

  // 범례
  const legends = [
    { sym: EX, label: '매우 유리', color: COLORS.accent_cyan },
    { sym: GD, label: '유리',      color: COLORS.accent_blue },
    { sym: MD, label: '중간',      color: COLORS.text_tertiary },
    { sym: BD, label: '불리',      color: COLORS.accent_red }
  ];
  legends.forEach((l, i) => {
    const lx = 0.6 + i * 3.05;
    slide.addText(l.sym + '  ' + l.label, {
      x: lx, y: 6.7, w: 2.8, h: 0.3,
      fontSize: 10, fontFace: FONTS.body.fontFace,
      color: l.color, bold: true
    });
  });

  // 요약 배너
  slide.addShape('rect', {
    x: 0.6, y: 6.0, w: 12.13, h: 0.42,
    fill: { color: COLORS.accent_cyan },
    line: { color: COLORS.accent_cyan }
  });
  slide.addText('레이저 세정: 환경·선택성·기재보호·OPEX 우위 — CAPEX만 단점. 대량 양산 및 정밀 전처리에서 ROI 역전점 빠르게 도달', {
    x: 0.8, y: 6.0, w: 11.8, h: 0.42,
    fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_on_dark, valign: 'middle'
  });

  addPageNumber(slide, 24, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────────────
// Slide 25 — Cards: 기존 보유 기술 5대 결합 시나리오
// ─────────────────────────────────────────────────────────────────────
function slide25_cleaning_combination_scenarios() {
  const slide = pptx.addSlide();

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_primary } });
  addTitleBar(slide, '기존 보유 기술과의 5대 결합 시나리오');

  const scenarios = [
    {
      label: 'A',
      title: 'Selective 제거 → 세정 직결',
      badge: '즉시 가능',
      badgeColor: COLORS.accent_cyan,
      body: '기존 Selective 제거 공정의 광흡수율 제어 원리가 세정에 직접 이전.\n장비 추가 없이 파라미터 조정만으로 표면 세정 기능 확장 가능.\n진입장벽 최저 — 빠른 PoC.',
      accentColor: COLORS.accent_cyan
    },
    {
      label: 'B',
      title: 'LILE + 세정 + 패터닝 통합',
      badge: '파일럿 3~5년',
      badgeColor: COLORS.accent_purple,
      body: 'LILE 공정 전 레이저 세정으로 계면 순도 향상 → LILE 수율 개선.\n장기: LILE + 세정 단일 패스 통합 공정.\n단, LILE 자체 성숙도 의존 — 즉시 투자 불가.',
      accentColor: COLORS.accent_purple
    },
    {
      label: 'C',
      title: '이종금속 용접 전처리 세정',
      badge: '즉시 가능',
      badgeColor: COLORS.accent_cyan,
      body: 'Cu-Al 용접 전 계면 산화물 레이저 세정 → IMC 억제 효과 증대.\nLaserax 알루미늄 배터리 세정 양산 실증 있음.\n세정 → ARM 용접 → AI 모니터링 3단계 통합 라인의 1단계.',
      accentColor: COLORS.accent_blue
    },
    {
      label: 'D',
      title: '글라스 표면 활성화',
      badge: '파일럿 검토',
      badgeColor: COLORS.accent_yellow,
      body: '글라스 절단 전 표면 세정 + 텍스처링으로 접착력 향상.\n용접·봉지 공정 전 세정과 결합 시 수율 연결.\n베셀빔 DOE + 세정 순차 공정 검토 대상.',
      accentColor: COLORS.accent_yellow
    },
    {
      label: 'E',
      title: 'LLO 후처리 잔류물 제거',
      badge: '파일럿 검토',
      badgeColor: COLORS.accent_yellow,
      body: 'LLO 후 OLED/기판 계면 잔류 탄화물 레이저 세정 제거.\n기존 화학 세정 대체 시 VOC/폐수 제로화.\n단, OLED 계면 손상 리스크 — 에너지 밀도 정밀 제어 필수.',
      accentColor: COLORS.accent_red
    }
  ];

  // 2+3 레이아웃: 상단 2개, 하단 3개
  const topW = 5.865;
  const botW = 3.843;
  const topPositions = [
    { x: 0.6,   y: 1.85 },
    { x: 6.865, y: 1.85 }
  ];
  const botPositions = [
    { x: 0.6,   y: 4.5 },
    { x: 4.743, y: 4.5 },
    { x: 8.886, y: 4.5 }
  ];
  const cardH = 2.45;

  scenarios.forEach((sc, i) => {
    const isTop = i < 2;
    const pos   = isTop ? topPositions[i] : botPositions[i - 2];
    const w     = isTop ? topW : botW;

    slide.addShape('roundRect', {
      x: pos.x, y: pos.y, w: w, h: cardH,
      rectRadius: 0.1,
      fill: { color: 'FFFFFF' },
      line: { color: sc.accentColor, width: 1 }
    });
    slide.addShape('rect', {
      x: pos.x + 0.02, y: pos.y, w: w - 0.04, h: 0.06,
      fill: { color: sc.accentColor },
      line: { color: sc.accentColor }
    });

    // 라벨 배지
    slide.addShape('ellipse', {
      x: pos.x + 0.15, y: pos.y + 0.1, w: 0.38, h: 0.38,
      fill: { color: sc.accentColor },
      line: { color: sc.accentColor }
    });
    slide.addText(sc.label, {
      x: pos.x + 0.15, y: pos.y + 0.1, w: 0.38, h: 0.38,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    // 배지
    slide.addShape('roundRect', {
      x: pos.x + w - 1.65, y: pos.y + 0.12, w: 1.5, h: 0.26,
      rectRadius: 0.05,
      fill: { color: sc.badgeColor },
      line: { color: sc.badgeColor, width: 0.01 }
    });
    slide.addText(sc.badge, {
      x: pos.x + w - 1.65, y: pos.y + 0.12, w: 1.5, h: 0.26,
      fontSize: 8, fontFace: FONTS.caption.fontFace,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle', bold: true
    });

    slide.addText(sc.title, {
      x: pos.x + 0.62, y: pos.y + 0.12, w: w - 2.42, h: 0.4,
      fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, wrap: true, autoFit: true, valign: 'middle'
    });

    slide.addShape('rect', {
      x: pos.x + 0.2, y: pos.y + 0.57, w: w - 0.4, h: 0.01,
      fill: { color: 'E2E8F0' }
    });

    slide.addText(sc.body, {
      x: pos.x + 0.2, y: pos.y + 0.66, w: w - 0.4, h: cardH - 0.82,
      fontSize: 9, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, wrap: true, autoFit: true,
      lineSpacingMultiple: 1.35, valign: 'top'
    });
  });

  addPageNumber(slide, 25, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────────────
// Slide 26 — TwoColumn: EV 배터리 세정+텍스처링 — Alodine 대체
// ─────────────────────────────────────────────────────────────────────
function slide26_ev_battery_cleaning() {
  const slide = pptx.addSlide();

  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_primary } });
  addTitleBar(slide, 'EV 배터리 세정 + 텍스처링: Alodine 화학처리 대체');

  // 좌: Laserax 실증
  slide.addShape('roundRect', {
    x: 0.6, y: 1.85, w: 5.865, h: 4.8,
    rectRadius: 0.1,
    fill: { color: 'FFFFFF' },
    line: { color: COLORS.accent_cyan, width: 1.5 }
  });
  slide.addShape('rect', {
    x: 0.6, y: 1.85, w: 5.865, h: 0.06,
    fill: { color: COLORS.accent_cyan },
    line: { color: COLORS.accent_cyan }
  });
  slide.addText('Laserax 실증: 45일 염수 시험', {
    x: 0.8, y: 1.98, w: 5.45, h: 0.42,
    fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary, autoFit: true
  });
  slide.addShape('rect', {
    x: 0.8, y: 2.47, w: 5.45, h: 0.01,
    fill: { color: COLORS.accent_cyan }
  });

  // KPI 2개
  const leftKpis = [
    { value: '45일', label: '레이저 세정+텍스처링', sub: '알루미늄 배터리 하우징 처리 후 염수 시험 — 부식 제로', color: COLORS.accent_cyan },
    { value: '38일', label: 'Alodine 화학처리', sub: '동일 조건 — 38일에 파단 발생. 레이저 대비 17% 조기 열화', color: COLORS.accent_red }
  ];

  leftKpis.forEach((k, i) => {
    const yBase = 2.6 + i * 1.7;
    slide.addShape('roundRect', {
      x: 0.8, y: yBase, w: 5.45, h: 1.5,
      rectRadius: 0.08,
      fill: { color: COLORS.bg_secondary },
      line: { color: k.color, width: 1 }
    });
    slide.addText(k.value, {
      x: 0.95, y: yBase + 0.1, w: 1.6, h: 0.75,
      fontSize: 36, fontFace: FONTS.kpi.fontFace, bold: true,
      color: k.color, align: 'center', valign: 'middle', autoFit: true
    });
    slide.addShape('rect', {
      x: 2.65, y: yBase + 0.2, w: 0.01, h: 1.0,
      fill: { color: 'E2E8F0' }
    });
    slide.addText(k.label, {
      x: 2.8, y: yBase + 0.1, w: 3.2, h: 0.42,
      fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, wrap: true, autoFit: true
    });
    slide.addText(k.sub, {
      x: 2.8, y: yBase + 0.58, w: 3.2, h: 0.75,
      fontSize: 9, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, wrap: true, autoFit: true, valign: 'top',
      lineSpacingMultiple: 1.3
    });
  });

  // 출처 라벨
  slide.addText('출처: Laserax 공식 케이스 스터디 (양산 검증)', {
    x: 0.8, y: 6.1, w: 5.45, h: 0.3,
    fontSize: 9, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary
  });

  // 우: 경제성 비교
  slide.addShape('roundRect', {
    x: 6.865, y: 1.85, w: 5.865, h: 4.8,
    rectRadius: 0.1,
    fill: { color: COLORS.bg_secondary },
    line: { color: 'E2E8F0', width: 0.5 }
  });
  slide.addShape('rect', {
    x: 6.865, y: 1.85, w: 5.865, h: 0.06,
    fill: { color: COLORS.accent_yellow },
    line: { color: COLORS.accent_yellow }
  });
  slide.addText('경제성 비교: 소모품 + 유지비', {
    x: 7.05, y: 1.98, w: 5.45, h: 0.42,
    fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_primary, autoFit: true
  });
  slide.addShape('rect', {
    x: 7.05, y: 2.47, w: 5.45, h: 0.01,
    fill: { color: COLORS.accent_yellow }
  });

  const costItems = [
    {
      label: '소모품 비용',
      laser: '$0.02 / m²',
      competitor: '$2.50~4.00 / m²',
      laserColor: COLORS.accent_cyan,
      compColor: COLORS.accent_red,
      compLabel: '샌드블라스팅'
    },
    {
      label: '연간 유지비',
      laser: '$500~1,000 / 년',
      competitor: '$3,000~6,000 / 년',
      laserColor: COLORS.accent_cyan,
      compColor: COLORS.accent_red,
      compLabel: '화학 처리 (Alodine)'
    }
  ];

  costItems.forEach((c, i) => {
    const yBase = 2.6 + i * 2.05;
    slide.addText(c.label, {
      x: 7.05, y: yBase, w: 5.45, h: 0.3,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary
    });

    // 레이저 바
    slide.addShape('roundRect', {
      x: 7.05, y: yBase + 0.38, w: 5.45, h: 0.68,
      rectRadius: 0.06,
      fill: { color: 'FFFFFF' },
      line: { color: COLORS.accent_cyan, width: 1 }
    });
    slide.addText('레이저  ' + c.laser, {
      x: 7.2, y: yBase + 0.38, w: 5.15, h: 0.68,
      fontSize: 18, fontFace: FONTS.kpi.fontFace, bold: true,
      color: c.laserColor, valign: 'middle', autoFit: true
    });

    // 경쟁 바
    slide.addShape('roundRect', {
      x: 7.05, y: yBase + 1.15, w: 5.45, h: 0.68,
      rectRadius: 0.06,
      fill: { color: 'FFFFFF' },
      line: { color: COLORS.accent_red, width: 1 }
    });
    slide.addText(c.compLabel + '  ' + c.competitor, {
      x: 7.2, y: yBase + 1.15, w: 5.15, h: 0.68,
      fontSize: 14, fontFace: FONTS.body.fontFace, bold: true,
      color: c.compColor, valign: 'middle', autoFit: true
    });
  });

  // 하단 요약 배너
  slide.addShape('rect', {
    x: 0.6, y: 6.7, w: 12.13, h: 0.42,
    fill: { color: COLORS.bg_dark },
    line: { color: COLORS.bg_dark }
  });
  slide.addShape('rect', {
    x: 0.6, y: 6.7, w: 0.06, h: 0.42,
    fill: { color: COLORS.accent_cyan },
    line: { color: COLORS.accent_cyan }
  });
  slide.addText('결론: 세정+텍스처링은 Alodine 대비 내부식성 우위 + OPEX 1/5 수준 — EV 배터리 전처리 즉시 도입 대상', {
    x: 0.8, y: 6.7, w: 11.8, h: 0.42,
    fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_on_dark, valign: 'middle'
  });

  addPageNumber(slide, 26, TOTAL_SLIDES);
}


// ---------------------------------------------------------------------------
// Slide 27 — [Section] Part 4. Hype vs Reality
// ---------------------------------------------------------------------------
function slide27_section_hype_reality() {
  const slide = pptx.addSlide();

  // 좌 다크 패널 (40%)
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 우 흰색 배경 (60%)
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.33, y: 0, w: 8.0, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  // 섹션 번호
  slide.addText('4', {
    x: 1.0, y: 2.3, w: 3.33, h: 1.5,
    fontSize: 80,
    fontFace: FONTS.kpi.fontFace,
    bold: FONTS.kpi.bold,
    color: COLORS.accent_yellow,
    align: 'left',
    valign: 'middle'
  });

  // Part 레이블
  slide.addText('Part 4', {
    x: 1.0, y: 1.6, w: 3.33, h: 0.5,
    fontSize: 14,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'left',
    valign: 'middle'
  });

  // 우 섹션 제목
  slide.addText('Hype vs Reality', {
    x: 6.0, y: 2.0, w: 6.73, h: 0.8,
    fontSize: 36,
    fontFace: FONTS.title.fontFace,
    bold: FONTS.title.bold,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'middle'
  });

  slide.addText('무엇이 즉시 가능하고,\n무엇이 3~5년 R&D인가', {
    x: 6.0, y: 2.9, w: 6.73, h: 1.0,
    fontSize: 22,
    fontFace: FONTS.subtitle.fontFace,
    bold: FONTS.subtitle.bold,
    color: COLORS.accent_yellow,
    align: 'left',
    valign: 'top',
    wrap: true
  });

  // 구분 accent 라인
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.0, y: 4.05, w: 2.0, h: 0.05,
    fill: { color: COLORS.accent_yellow }
  });

  // 우 설명
  slide.addText('Critic 검증과 양산 사례를 기반으로 투자 판단을 위한\n기술 성숙도 × Hype 수준을 교차 분석한다', {
    x: 6.0, y: 4.2, w: 6.73, h: 1.0,
    fontSize: 15,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'top',
    wrap: true
  });
}

// ---------------------------------------------------------------------------
// Slide 28 — [Matrix] 기술 성숙도 × Hype 매트릭스
// X축: Hype 수준 (낮→높), Y축: Reality/양산 검증 (높→낮)
// ---------------------------------------------------------------------------
function slide28_hype_reality_matrix() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '기술 성숙도 × Hype 매트릭스', 'X축: Hype 수준 (낮→높)  |  Y축: Reality/양산 검증 (낮→높)');

  const matrixTop = 2.0;
  const matrixH = 4.85;
  const matrixX = 0.6;
  const matrixW = 12.13;
  const midX = matrixX + matrixW / 2;
  const midY = matrixTop + matrixH / 2;

  // 사분면 배경
  const quadrants = [
    // Q2: 낮Hype + 높Reality (즉시 도입) — 왼쪽 상단
    { x: matrixX, y: matrixTop, w: matrixW / 2 - 0.15, h: matrixH / 2 - 0.15,
      fill: '00D4AA', alpha: 15, label: '즉시 도입 가능', corner: 'Q2 (낮Hype + 높Reality)',
      items: ['ARM/AFX 빔 쉐이핑', '금속 레이저 세정', 'AI 모니터링 (감지/경고)'],
      itemColor: COLORS.accent_cyan },
    // Q1: 높Hype + 높Reality — 오른쪽 상단 (해당없음)
    { x: midX + 0.15, y: matrixTop, w: matrixW / 2 - 0.15, h: matrixH / 2 - 0.15,
      fill: 'E2E8F0', alpha: 0, label: '해당 없음', corner: 'Q1 (높Hype + 높Reality)',
      items: [],
      itemColor: COLORS.text_tertiary },
    // Q3: 낮Hype + 낮Reality — 왼쪽 하단 (해당없음)
    { x: matrixX, y: midY + 0.15, w: matrixW / 2 - 0.15, h: matrixH / 2 - 0.15,
      fill: 'E2E8F0', alpha: 0, label: '해당 없음', corner: 'Q3 (낮Hype + 낮Reality)',
      items: [],
      itemColor: COLORS.text_tertiary },
    // Q4: 높Hype + 낮Reality (Hype 경계) — 오른쪽 하단
    { x: midX + 0.15, y: midY + 0.15, w: matrixW / 2 - 0.15, h: matrixH / 2 - 0.15,
      fill: 'FF6B6B', alpha: 12, label: 'Hype 경계 — 3~5년 R&D', corner: 'Q4 (높Hype + 낮Reality)',
      items: ['AI 자율 폐루프 제어', 'SLM 홀로그래픽 양산'],
      itemColor: COLORS.accent_red }
  ];

  quadrants.forEach(function(q) {
    // 사분면 배경 박스
    slide.addShape(pptx.ShapeType.rect, {
      x: q.x, y: q.y, w: q.w, h: q.h,
      fill: { color: q.fill, transparency: q.alpha },
      line: { color: 'E2E8F0', width: 0.5 }
    });

    // 코너 레이블
    slide.addText(q.corner, {
      x: q.x + 0.15, y: q.y + 0.1, w: q.w - 0.3, h: 0.28,
      fontSize: 9,
      fontFace: FONTS.caption.fontFace,
      color: COLORS.text_tertiary,
      align: 'left',
      valign: 'middle'
    });

    // 섹션 제목 레이블
    slide.addText(q.label, {
      x: q.x + 0.15, y: q.y + 0.38, w: q.w - 0.3, h: 0.35,
      fontSize: 13,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: q.itemColor,
      align: 'left',
      valign: 'middle'
    });

    // 항목 목록
    q.items.forEach(function(item, idx) {
      const dotY = q.y + 0.85 + idx * 0.55;
      slide.addShape(pptx.ShapeType.ellipse, {
        x: q.x + 0.18, y: dotY + 0.1, w: 0.12, h: 0.12,
        fill: { color: q.itemColor }
      });
      slide.addText(item, {
        x: q.x + 0.40, y: dotY, w: q.w - 0.55, h: 0.42,
        fontSize: 12,
        fontFace: FONTS.body.fontFace,
        color: COLORS.text_primary,
        align: 'left',
        valign: 'middle',
        wrap: true
      });
    });
  });

  // 중간 영역 박스 (파일럿)
  const pilotY = midY - 0.72;
  slide.addShape(pptx.ShapeType.rect, {
    x: matrixX + 2.2, y: pilotY, w: matrixW - 4.4, h: 1.05,
    fill: { color: 'FFB020', transparency: 15 },
    line: { color: COLORS.accent_yellow, width: 1 }
  });
  slide.addText('중간 영역 — 파일럿 단계', {
    x: matrixX + 2.35, y: pilotY + 0.05, w: 3.5, h: 0.3,
    fontSize: 10,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.accent_yellow,
    align: 'left',
    valign: 'middle'
  });
  slide.addText('세정+텍스처링  /  DOE LLO 균일화  /  반도체급 세정  /  적응형 광학(변형거울)', {
    x: matrixX + 2.35, y: pilotY + 0.35, w: matrixW - 4.9, h: 0.6,
    fontSize: 11,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'top',
    wrap: true
  });

  // 십자 구분선
  slide.addShape(pptx.ShapeType.rect, {
    x: midX - 0.15, y: matrixTop, w: 0.3, h: matrixH,
    fill: { color: COLORS.bg_primary }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: matrixX, y: midY - 0.15, w: matrixW, h: 0.3,
    fill: { color: COLORS.bg_primary }
  });

  // 축 레이블
  slide.addText('← 낮음  |  Hype 수준  |  높음 →', {
    x: matrixX, y: matrixTop + matrixH + 0.1, w: matrixW, h: 0.28,
    fontSize: 11,
    fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary,
    align: 'center'
  });
  slide.addText('Reality\n/\n양산\n검증', {
    x: 0.0, y: matrixTop, w: 0.55, h: matrixH,
    fontSize: 10,
    fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary,
    align: 'center',
    valign: 'middle',
    vert: 'eaVert'
  });

  addPageNumber(slide, 28, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 29 — [Table] 확신도 교정: Critic 검증 결과
// 6행 × 3열
// ---------------------------------------------------------------------------
function slide29_confidence_calibration() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '확신도 교정 테이블: Critic 검증 결과', 'Researcher 초안 → Critic 검토 → 교정 확신도');

  const headers = ['주요 수치 / 주장', '원래 확신도', '교정 확신도'];

  const dataRows = [
    [
      'LLO AI 탄화율 감소 (50~70%)',
      { text: '낮음', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } },
      { text: '매우 낮음', options: { color: COLORS.accent_red, bold: true, align: 'center' } }
    ],
    [
      'LLO 수율 향상 (5~15%p)',
      { text: '중간', options: { color: COLORS.accent_cyan, bold: true, align: 'center' } },
      { text: '낮음', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ],
    [
      'SLM 5kW 달성 (3~5년)',
      { text: '중간', options: { color: COLORS.accent_cyan, bold: true, align: 'center' } },
      { text: '낮음', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ],
    [
      '홀로그래픽 처리량 5~8배 향상',
      { text: '중간', options: { color: COLORS.accent_cyan, bold: true, align: 'center' } },
      { text: '낮음~중간', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ],
    [
      '레이저 세정 시장 CAGR (10~12%)',
      { text: '중간', options: { color: COLORS.accent_cyan, bold: true, align: 'center' } },
      { text: '낮음~중간', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ],
    [
      'AI 자율 폐루프 — 근시일 내 양산 가능',
      { text: '명시 안 됨', options: { color: COLORS.text_tertiary, bold: false, align: 'center' } },
      { text: '낮음', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ]
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.8, w: 12.13, h: 5.0,
    colW: [6.5, 2.8, 2.83]
  });

  // 하단 주석
  slide.addText('* 확신도 기준: 매우 낮음(양산 근거 없음) / 낮음(출처 미검증) / 낮음~중간(간접 근거) / 중간(파일럿 수준) / 높음(양산 실증)', {
    x: 0.6, y: 7.0, w: 12.13, h: 0.28,
    fontSize: 9,
    fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary,
    align: 'left',
    valign: 'middle'
  });

  addPageNumber(slide, 29, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 30 — [Comparison Table] 이종금속 IMC 제어: 3접근법 우선순위
// features × options 구조 (텍스트 셀)
// ---------------------------------------------------------------------------
function slide30_imc_comparison() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '이종금속 IMC 제어: 3가지 접근법 우선순위', 'Cu-Al 이종금속 용접 — 인터메탈릭 화합물(IMC) 억제 전략 비교');

  const headers = ['평가 항목', 'ARM 빔 쉐이핑', '용접 전 레이저 세정', 'AI 분광 모니터링'];

  const dataRows = [
    [
      '효과 확신도',
      { text: '높음', options: { color: COLORS.accent_cyan, bold: true, align: 'center' } },
      { text: '높음', options: { color: COLORS.accent_cyan, bold: true, align: 'center' } },
      { text: '낮음', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ],
    [
      '투자 규모',
      { text: '중 (장비 도입)', options: { align: 'center' } },
      { text: '중소 (시스템 추가)', options: { align: 'center' } },
      { text: '중 (센서+AI 개발)', options: { align: 'center' } }
    ],
    [
      '도입 시기',
      { text: '즉시', options: { color: COLORS.accent_blue, bold: true, align: 'center' } },
      { text: '즉시', options: { color: COLORS.accent_blue, bold: true, align: 'center' } },
      { text: '6개월 후', options: { color: COLORS.accent_yellow, align: 'center' } }
    ],
    [
      '양산 검증',
      { text: 'Coherent ARM\n(EV 배터리 실증)', options: { align: 'center' } },
      { text: 'Laserax / Trumpf\n(양산 사례)', options: { align: 'center' } },
      { text: 'IMC 전용 사례 없음\n(일반 용접 모니터링만)', options: { color: COLORS.accent_red, align: 'center' } }
    ]
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.8, w: 12.13, h: 4.3,
    colW: [2.8, 3.11, 3.11, 3.11]
  });

  // 권고 시퀀스 배너
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 6.3, w: 12.13, h: 0.65,
    fill: { color: COLORS.accent_blue }
  });
  slide.addText('권고 시퀀스:', {
    x: 0.85, y: 6.3, w: 1.5, h: 0.65,
    fontSize: 13,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_on_dark,
    align: 'left',
    valign: 'middle'
  });
  slide.addText('① 레이저 세정 (즉시)  →  ② ARM 빔 쉐이핑 (즉시)  →  ③ AI 분광 모니터링 (6개월 후, 데이터 확보 후)', {
    x: 2.5, y: 6.3, w: 10.0, h: 0.65,
    fontSize: 13,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_on_dark,
    align: 'left',
    valign: 'middle',
    wrap: true
  });

  addPageNumber(slide, 30, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 31 — [Section] Part 5. 검증된 성과
// ---------------------------------------------------------------------------
function slide31_section_proof() {
  const slide = pptx.addSlide();

  // 좌 다크 패널 (40%)
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 우 흰색 배경 (60%)
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.33, y: 0, w: 8.0, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  // 섹션 번호
  slide.addText('5', {
    x: 1.0, y: 2.3, w: 3.33, h: 1.5,
    fontSize: 80,
    fontFace: FONTS.kpi.fontFace,
    bold: FONTS.kpi.bold,
    color: COLORS.accent_blue,
    align: 'left',
    valign: 'middle'
  });

  // Part 레이블
  slide.addText('Part 5', {
    x: 1.0, y: 1.6, w: 3.33, h: 0.5,
    fontSize: 14,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'left',
    valign: 'middle'
  });

  // 우 섹션 제목
  slide.addText('검증된 성과', {
    x: 6.0, y: 2.0, w: 6.73, h: 0.8,
    fontSize: 36,
    fontFace: FONTS.title.fontFace,
    bold: FONTS.title.bold,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'middle'
  });

  slide.addText('양산 사례와 정량 효과', {
    x: 6.0, y: 2.9, w: 6.73, h: 0.6,
    fontSize: 22,
    fontFace: FONTS.subtitle.fontFace,
    bold: FONTS.subtitle.bold,
    color: COLORS.accent_blue,
    align: 'left',
    valign: 'middle'
  });

  // 구분 accent 라인
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.0, y: 3.6, w: 2.0, h: 0.05,
    fill: { color: COLORS.accent_blue }
  });

  // 우 설명
  slide.addText('Hype 영역을 걷어내고 남은 것 —\n실제 양산 라인에서 검증된 수치와 사례', {
    x: 6.0, y: 3.75, w: 6.73, h: 1.0,
    fontSize: 15,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'top',
    wrap: true
  });
}

// ---------------------------------------------------------------------------
// Slide 32 — [KPI] 핵심 검증 수치 3개
// ---------------------------------------------------------------------------
function slide32_kpi_proof() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '핵심 검증 수치 3개 — 양산 라인 실증 데이터');

  const kpis = [
    {
      value: '90%+',
      label: '스패터 감소',
      sub: 'Coherent ARM — Cu-Al 이종금속 EV 탭 용접\n[확신도: 높음 — 양산 실증]',
      color: COLORS.accent_blue
    },
    {
      value: '65%',
      label: '기공 편차 감소',
      sub: 'CIRP 2024 — ML 기반 파워 제어 적용\n기공 크기 12% 감소 + 편차 65% 감소 [확신도: 높음]',
      color: COLORS.accent_cyan
    },
    {
      value: '1대 = 4대',
      label: '장비 효율',
      sub: 'nLIGHT AFX — EOS LPBF 4개사 채택\n1대로 기존 4가지 레이저 모드 대체 + 3배 속도 향상',
      color: COLORS.accent_yellow
    }
  ];

  const kpiW = 3.71;
  const kpiH = 4.4;
  const kpiY = 2.0;
  const positions = [
    { x: 0.6 },
    { x: 4.61 },
    { x: 8.62 }
  ];

  kpis.forEach(function(kpi, i) {
    const x = positions[i].x;

    // 카드 배경
    slide.addShape(pptx.ShapeType.rect, {
      x: x, y: kpiY, w: kpiW, h: kpiH,
      fill: { color: COLORS.bg_secondary },
      line: { color: kpi.color, width: 1.5 }
    });

    // 상단 accent bar
    slide.addShape(pptx.ShapeType.rect, {
      x: x, y: kpiY, w: kpiW, h: 0.08,
      fill: { color: kpi.color }
    });

    // KPI 수치
    slide.addText(kpi.value, {
      x: x + 0.2, y: kpiY + 0.2, w: kpiW - 0.4, h: 1.2,
      fontSize: 52,
      fontFace: FONTS.kpi.fontFace,
      bold: true,
      color: kpi.color,
      align: 'center',
      valign: 'middle',
      autoFit: true
    });

    // KPI 레이블
    slide.addText(kpi.label, {
      x: x + 0.2, y: kpiY + 1.5, w: kpiW - 0.4, h: 0.45,
      fontSize: 16,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'center',
      valign: 'middle'
    });

    // 구분선
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.3, y: kpiY + 2.0, w: kpiW - 0.6, h: 0.02,
      fill: { color: 'E2E8F0' }
    });

    // 부연 설명
    slide.addText(kpi.sub, {
      x: x + 0.2, y: kpiY + 2.1, w: kpiW - 0.4, h: kpiH - 2.2,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      lineSpacingMultiple: 1.45,
      wrap: true
    });
  });

  addPageNumber(slide, 32, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 33 — [Table] 양산 검증 사례 종합
// 5행 × 4열
// ---------------------------------------------------------------------------
function slide33_proof_table() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '양산 검증 사례 종합', '실제 생산 라인에서 검증된 기업별 핵심 성과');

  const headers = ['기업 / 솔루션', '적용 공정', '핵심 성과', '검증 수준'];

  const dataRows = [
    [
      'Precitec LWM AI',
      'Audi 배터리 용접\n(24/7 연속 생산)',
      'OK / NOK 자동 판정\n→ 불량 즉시 검출',
      { text: '양산', options: { color: COLORS.accent_blue, bold: true, align: 'center' } }
    ],
    [
      'Coherent ARM',
      'EV 탭 Cu-Al\n이종금속 용접',
      'IMC 층 감소\n스패터 90%+ 감소',
      { text: '양산', options: { color: COLORS.accent_blue, bold: true, align: 'center' } }
    ],
    [
      'nLIGHT AFX',
      'LPBF 금속 적층\n(EOS / DMG Mori 등)',
      '1대 = 4가지 모드\n3× 처리 속도 향상',
      { text: '양산', options: { color: COLORS.accent_blue, bold: true, align: 'center' } }
    ],
    [
      'Laserax',
      'EV 배터리 하우징\n세정 + 텍스처링',
      'Alodine 화학처리 대체\n45일 염수시험 무결함',
      { text: '양산', options: { color: COLORS.accent_blue, bold: true, align: 'center' } }
    ],
    [
      'Trumpf BrightLine',
      'Al 합금 용접\n(자동차 차체)',
      '스패터 95%+ 감소\n용접 품질 안정화',
      { text: '양산', options: { color: COLORS.accent_blue, bold: true, align: 'center' } }
    ]
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.8, w: 12.13, h: 5.0,
    colW: [2.5, 2.8, 3.83, 1.5]
  });

  addPageNumber(slide, 33, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 34 — [Content] 비즈니스 모델 전환: HeSaaS
// ---------------------------------------------------------------------------
function slide34_hesaas_model() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '비즈니스 모델 전환 가능성: HeSaaS', 'Hardware + embedded Software as a Service — 4가지 전환 벡터');

  const transitions = [
    {
      from: '장비 일회 판매',
      to: 'AI 솔루션 구독',
      desc: '파라미터 자동 최적화 + 원격 진단 → 반복 수익',
      color: COLORS.accent_blue
    },
    {
      from: '공정별 전용 장비',
      to: '범용 플랫폼 (AFX/ARM)',
      desc: '빔 프로파일 전환으로 1대가 다공정 커버 → 고객 ROI 향상',
      color: COLORS.accent_cyan
    },
    {
      from: '화학 전처리 외주',
      to: '인라인 레이저 세정',
      desc: 'Alodine 제거 → CAPEX 포함 통합 공급 → 장기 OPEX 절감',
      color: COLORS.accent_yellow
    },
    {
      from: '엔지니어 수동 설정',
      to: 'AI 자동 최적화',
      desc: '센서+AI로 품질 보증 자동화 → 인건비·부적합 비용 절감',
      color: COLORS.accent_purple
    }
  ];

  const arrowY = [2.0, 3.3, 4.6, 5.9];

  transitions.forEach(function(t, i) {
    const y = arrowY[i];

    // accent 마커
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: y + 0.12, w: 0.22, h: 0.22,
      fill: { color: t.color }
    });

    // FROM 박스
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.95, y: y, w: 3.5, h: 0.5,
      fill: { color: 'E2E8F0' },
      line: { color: 'CBD5E1', width: 0.5 }
    });
    slide.addText(t.from, {
      x: 0.95, y: y, w: 3.5, h: 0.5,
      fontSize: 13,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'center',
      valign: 'middle'
    });

    // 화살표
    slide.addText('→', {
      x: 4.6, y: y, w: 0.55, h: 0.5,
      fontSize: 18,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: t.color,
      align: 'center',
      valign: 'middle'
    });

    // TO 박스
    slide.addShape(pptx.ShapeType.rect, {
      x: 5.25, y: y, w: 3.5, h: 0.5,
      fill: { color: t.color },
      line: { color: t.color, width: 0.01 }
    });
    slide.addText(t.to, {
      x: 5.25, y: y, w: 3.5, h: 0.5,
      fontSize: 13,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle'
    });

    // 설명
    slide.addText(t.desc, {
      x: 8.9, y: y, w: 3.83, h: 0.5,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'middle',
      wrap: true
    });
  });

  // 주의 박스
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 7.05, w: 12.13, h: 0.28,
    fill: { color: 'FFF3CD' }
  });
  slide.addText('⚠  주의: HeSaaS 전환은 B2B 레이저 시장 특성상 고객의 공정 데이터 공유 의향 미검증 — 비즈니스 모델 전환 전 검증 필요 [Critic 지적]', {
    x: 0.75, y: 7.05, w: 11.98, h: 0.28,
    fontSize: 9,
    fontFace: FONTS.caption.fontFace,
    color: '7A5800',
    align: 'left',
    valign: 'middle'
  });

  addPageNumber(slide, 34, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 35 — [Roadmap] 통합 R&D 로드맵: 3단계 시퀀스
// Phase 1(0~6개월) / Phase 2(6~12개월) / Phase 3(12~36개월)
// ---------------------------------------------------------------------------
function slide35_rd_roadmap() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '통합 R&D 투자 로드맵: 3단계 시퀀스', '공통 기반 → 이종금속 통합 파일럿 → 확장 + IP 확보');

  const phases = [
    {
      label: 'Phase 1',
      period: '0 ~ 6개월',
      title: '공통 기반 구축',
      color: COLORS.accent_blue,
      x: 0.6,
      w: 3.7,
      items: [
        '센서 인프라\n(고속카메라 + 포토다이오드)',
        '데이터 파이프라인\n(수집 → 레이블링 → 저장)',
        'ARM/AFX 파이버 레이저\n평가 1대 도입',
        '레이저 세정 시스템\n평가 (500W급)'
      ]
    },
    {
      label: 'Phase 2',
      period: '6 ~ 12개월',
      title: '이종금속 용접 통합 파일럿',
      color: COLORS.accent_cyan,
      x: 4.61,
      w: 3.7,
      items: [
        '세정 → ARM 용접 → AI 검사\n단일 라인 파일럿',
        'Precitec LWM AI\n인라인 도입',
        'ARM 파라미터 최적화\n(Cu-Al IMC 최소화)',
        'DOE LLO 균일화\n시뮬레이션 착수'
      ]
    },
    {
      label: 'Phase 3',
      period: '12 ~ 36개월',
      title: '확장 + IP 확보',
      color: COLORS.accent_yellow,
      x: 8.62,
      w: 4.11,
      items: [
        'AI 폐루프 파일럿\n(데이터 확보 후)',
        'DOE LLO 양산 적용\n+ 세정+텍스처링 통합',
        '결합 공정 특허 3건+\n(세정×ARM×AI)',
        'SLM 홀로그래픽\n선행 연구 착수'
      ]
    }
  ];

  // 수평 타임라인 바
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 2.35, w: 12.13, h: 0.08,
    fill: { color: COLORS.bg_secondary }
  });

  phases.forEach(function(phase) {
    // 타임라인 진행 바
    slide.addShape(pptx.ShapeType.rect, {
      x: phase.x, y: 2.35, w: phase.w, h: 0.08,
      fill: { color: phase.color }
    });

    // Phase 헤더 박스
    slide.addShape(pptx.ShapeType.rect, {
      x: phase.x, y: 1.8, w: phase.w, h: 0.48,
      fill: { color: phase.color }
    });
    slide.addText(phase.label + '  ' + phase.period, {
      x: phase.x + 0.1, y: 1.8, w: phase.w - 0.2, h: 0.48,
      fontSize: 12,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'left',
      valign: 'middle'
    });

    // Phase 제목
    slide.addText(phase.title, {
      x: phase.x + 0.1, y: 2.5, w: phase.w - 0.2, h: 0.5,
      fontSize: 14,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle'
    });

    // 카드 본문 영역
    slide.addShape(pptx.ShapeType.rect, {
      x: phase.x, y: 3.08, w: phase.w, h: 3.9,
      fill: { color: COLORS.bg_primary },
      line: { color: phase.color, width: 1 }
    });

    // 항목 목록
    phase.items.forEach(function(item, idx) {
      const itemY = 3.2 + idx * 0.92;
      slide.addShape(pptx.ShapeType.ellipse, {
        x: phase.x + 0.15, y: itemY + 0.08, w: 0.12, h: 0.12,
        fill: { color: phase.color }
      });
      slide.addText(item, {
        x: phase.x + 0.38, y: itemY, w: phase.w - 0.53, h: 0.82,
        fontSize: 11,
        fontFace: FONTS.body.fontFace,
        color: COLORS.text_primary,
        align: 'left',
        valign: 'top',
        lineSpacingMultiple: 1.35,
        wrap: true
      });
    });
  });

  addPageNumber(slide, 35, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 36 — [Table] 핵심 병목 × 해결 경로
// 6행 × 3열
// ---------------------------------------------------------------------------
function slide36_bottleneck_table() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '핵심 병목 × 해결 경로 테이블', '기술 성숙보다 병목 해소가 먼저다 — 6가지 핵심 제약과 대응 경로');

  const headers = ['핵심 병목', '해결 경로', '예상 해소 시점'];

  const dataRows = [
    [
      'AI 학습 데이터 부족\n(공정 특화 데이터 없음)',
      '자체 데이터 파이프라인 구축\n+ GAN 합성 데이터 보완',
      { text: '6~12개월', options: { color: COLORS.accent_cyan, bold: true, align: 'center' } }
    ],
    [
      'SLM 소자 내열성 한계\n(~1.4kW 실용 한계)',
      '차세대 내열 LCoS 소재 혁신\n(Meadowlark / Fraunhofer ILT 연구 중)',
      { text: '3~5년+', options: { color: COLORS.accent_red, bold: true, align: 'center' } }
    ],
    [
      'UV 대역 동적 빔 쉐이핑 소자 부재\n(SLM의 UV 파장 제한)',
      'DOE 고정 패턴으로 보완\n+ UV 전용 적응형 광학 연구',
      { text: '3~5년+', options: { color: COLORS.accent_red, bold: true, align: 'center' } }
    ],
    [
      '레이저 세정 장비 CAPEX\n($20K~200K 초기 부담)',
      '비용 하락 추세 지속 중\n(중국산 세정 레이저 경쟁)',
      { text: '자연 해소 중', options: { color: COLORS.accent_cyan, bold: true, align: 'center' } }
    ],
    [
      'IATF / 항공우주 AI 인증 부재\n(AI 판단의 법적 책임 미정립)',
      'ISO/IEC 42001 AI 경영시스템\n+ 산업별 표준화 참여',
      { text: '2~3년', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ],
    [
      'R&D 전문 인력 부족\n(레이저+AI 융합 인력 희소)',
      '대학 연구실 협력\n+ 핵심 인재 외부 채용',
      { text: '지속적 과제', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ]
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.8, w: 12.13, h: 5.0,
    colW: [4.0, 5.3, 2.83]
  });

  addPageNumber(slide, 36, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 37 — [Cards] R&D 권고안: 4가지 액션 레벨 (2×2)
// ---------------------------------------------------------------------------
function slide37_rd_recommendation_cards() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '회사 관점 R&D 권고안: 4가지 액션 레벨');

  const cards = [
    {
      accentColor: COLORS.accent_blue,
      title: '즉시 착수',
      body: '• 이종금속 용접 통합 PoC\n  (세정 → ARM → AI 검사)\n• DOE LLO 균일화 시뮬레이션\n• 공통 데이터 파이프라인 구축'
    },
    {
      accentColor: COLORS.accent_cyan,
      title: '파일럿 확장 (6~18개월)',
      body: '• AI 폐루프 제어 파일럿\n  (데이터 확보 후 단계 진입)\n• 세정+텍스처링 양산 적용\n• DOE LLO 현장 적용'
    },
    {
      accentColor: COLORS.accent_yellow,
      title: '중기 R&D (18~36개월)',
      body: '• AI 플랫폼 v1.0 구축\n• SLM 홀로그래픽 선행 연구\n• 결합 공정 특허 3건 이상\n  (세정 × ARM × AI 통합)'
    },
    {
      accentColor: COLORS.accent_red,
      title: '하지 말 것',
      body: '• SLM 대규모 즉시 투자\n  (소재 한계 미해결)\n• AI 자율 마케팅 선행\n  (양산 사례 없음)\n• 세 기술 독립 R&D팀 운영\n  (공통 기반 낭비)'
    }
  ];

  const positions = CARD_2X2.positions;
  const cardW = CARD_2X2.w;
  const cardH = CARD_2X2.h;

  cards.forEach(function(card, i) {
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

  addPageNumber(slide, 37, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 38 — [Closing] 3가지 기술, 1개의 통합 전략: 데이터가 해자다
// ---------------------------------------------------------------------------
function slide38_closing() {
  const slide = pptx.addSlide();

  // 풀블리드 다크 배경
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 좌상단 accent 라인
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0, y: 1.3, w: 2.0, h: 0.06,
    fill: { color: COLORS.accent_cyan }
  });

  // 메인 제목
  slide.addText('3가지 기술, 1개의 통합 전략', {
    x: 1.0, y: 1.45, w: 11.33, h: 0.9,
    fontSize: 38,
    fontFace: FONTS.title.fontFace,
    bold: FONTS.title.bold,
    color: COLORS.text_on_dark,
    align: 'left',
    valign: 'middle'
  });

  slide.addText('데이터가 해자(moat)다', {
    x: 1.0, y: 2.4, w: 8.0, h: 0.65,
    fontSize: 26,
    fontFace: FONTS.subtitle.fontFace,
    bold: FONTS.subtitle.bold,
    color: COLORS.accent_cyan,
    align: 'left',
    valign: 'middle'
  });

  // 구분선
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0, y: 3.15, w: 11.33, h: 0.01,
    fill: { color: '3A4A5E' }
  });

  // 3가지 요약 포인트
  const points = [
    {
      num: '01',
      text: '공통 기반 먼저 → 전용 응용 나중',
      sub: '센서·데이터·광학 역량을 먼저 구축하면 AI / 빔 쉐이핑 / 세정 응용 확장이 효율적이다'
    },
    {
      num: '02',
      text: '이종금속 용접 통합 라인으로 3가지 기술 동시 검증',
      sub: '세정(전처리) → ARM(용접) → AI(검사) 단일 라인 = 가장 높은 ROI 검증 경로'
    },
    {
      num: '03',
      text: '데이터 축적 = 선발주자 우위 + 중국 경쟁 대비 차별화',
      sub: '공정 데이터를 먼저 모은 기업이 AI 모델 성능에서 앞서고, 소프트웨어/노하우 기반 차별화가 가능하다'
    }
  ];

  points.forEach(function(p, i) {
    const yBase = 3.3 + i * 1.15;

    // 번호
    slide.addText(p.num, {
      x: 1.0, y: yBase, w: 0.65, h: 0.9,
      fontSize: 22,
      fontFace: FONTS.kpi.fontFace,
      bold: true,
      color: COLORS.accent_cyan,
      align: 'left',
      valign: 'middle'
    });

    // 제목
    slide.addText(p.text, {
      x: 1.75, y: yBase, w: 9.58, h: 0.42,
      fontSize: 16,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'left',
      valign: 'middle'
    });

    // 설명
    slide.addText(p.sub, {
      x: 1.75, y: yBase + 0.44, w: 9.58, h: 0.6,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_on_dark,
      transparency: 30,
      align: 'left',
      valign: 'top',
      wrap: true
    });
  });

  // CTA 박스
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.0, y: 6.55, w: 11.33, h: 0.65,
    fill: { color: COLORS.accent_blue }
  });
  slide.addText('CTA: Phase 1 공통 기반 구축 착수 승인 요청 — 센서 인프라 + 데이터 파이프라인 + ARM 평가', {
    x: 1.15, y: 6.55, w: 11.03, h: 0.65,
    fontSize: 14,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_on_dark,
    align: 'center',
    valign: 'middle',
    wrap: true
  });
}


// === 실행 블록 (자동 생성) ===
slide14_heterometal_ai_roles();
slide15_llo_charring_ai();
slide16_section_beam_shaping();
slide17_beam_shaping_comparison();
slide18_arm_afx_gamechanger();
slide19_doe_llo_uniformity();
slide20_slm_holographic();
slide21_application_expansion();
slide22_section_laser_cleaning();
slide23_cleaning_principles_grid();
slide24_cleaning_vs_competitors();
slide25_cleaning_combination_scenarios();
slide26_ev_battery_cleaning();
slide27_section_hype_reality();
slide28_hype_reality_matrix();
slide29_confidence_calibration();
slide30_imc_comparison();
slide31_section_proof();
slide32_kpi_proof();
slide33_proof_table();
slide34_hesaas_model();
slide35_rd_roadmap();
slide36_bottleneck_table();
slide37_rd_recommendation_cards();
slide38_closing();

const path = require('path');
pptx.writeFile({ fileName: path.join(__dirname, 'laser-rd-frontier.pptx') })
  .then(() => console.log('저장 완료: laser-rd-frontier.pptx'))
  .catch(err => console.error('저장 실패:', err));
