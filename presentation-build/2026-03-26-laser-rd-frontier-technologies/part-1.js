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
