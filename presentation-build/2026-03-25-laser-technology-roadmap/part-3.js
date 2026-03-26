// === Part 3 시작 ===

// ---------------------------------------------------------------------------
// Slide 30 — [Section] Part 4: 구조 변화 — 레이저 소스 경쟁과 AI 융합이 산업 구도를 재편한다
// ---------------------------------------------------------------------------
function slide30_section_laser_competition() {
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
    color: COLORS.accent_cyan,
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
  slide.addText('레이저 소스 경쟁과 AI 융합이\n산업 구도를 재편한다', {
    x: 6.0, y: 2.2, w: 6.73, h: 1.8,
    fontSize: 32,
    fontFace: FONTS.title.fontFace,
    bold: FONTS.title.bold,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'top',
    wrap: true
  });

  // 우 설명
  slide.addText('IPG vs. 중국 레이저의 가격 역습, USP 시장 구조 변화,\nAI+센서 융합으로 레이저가 자율 공정 단위로 진화한다', {
    x: 6.0, y: 4.2, w: 6.73, h: 1.2,
    fontSize: 15,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'top',
    wrap: true
  });

  // 구분 액센트 라인
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.0, y: 4.05, w: 2.0, h: 0.05,
    fill: { color: COLORS.accent_cyan }
  });
}

// ---------------------------------------------------------------------------
// Slide 31 — [TwoColumn] 중국 파이버 레이저의 가격 역습: IPG -22% YoY vs Raycus 점유율 30%
// ---------------------------------------------------------------------------
function slide31_china_laser_price_war() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '중국 파이버 레이저의 가격 역습: IPG -22% YoY vs Raycus 점유율 30%');

  // ── 좌측 컬럼 헤더 (IPG 하락) ──────────────────────────────────────
  slide.addShape(pptx.ShapeType.rect, {
    x: COL_LEFT_X, y: 1.8, w: COL_W, h: 0.42,
    fill: { color: COLORS.accent_red }
  });
  slide.addText('IPG Photonics — 구조적 하락', {
    x: COL_LEFT_X, y: 1.8, w: COL_W, h: 0.42,
    fontSize: 13,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_on_dark,
    align: 'center',
    valign: 'middle'
  });

  // IPG KPI 수치
  slide.addText('-22%', {
    x: COL_LEFT_X + 0.2, y: 2.3, w: COL_W - 0.4, h: 0.9,
    fontSize: 52,
    fontFace: FONTS.kpi.fontFace,
    bold: FONTS.kpi.bold,
    color: COLORS.accent_red,
    align: 'center',
    valign: 'middle'
  });

  slide.addText('Q4 2024 매출 YoY', {
    x: COL_LEFT_X + 0.2, y: 3.2, w: COL_W - 0.4, h: 0.35,
    fontSize: 12,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'center'
  });

  // IPG 상세 항목
  const ipgItems = [
    { bullet: '중국 내 매출 비중 급감 — 2020년대 초 40%+ → 2024년 10%대로 수축', accent: COLORS.accent_red },
    { bullet: '파이버 레이저 평균 판가(ASP) 지속 하락 — 중국산 경쟁 심화', accent: COLORS.text_secondary },
    { bullet: '북미/유럽 시장은 방어 중이나 단독으로 성장 상쇄 불가', accent: COLORS.text_secondary },
    { bullet: '고출력 레이저 & 의료/방산 부문으로 포트폴리오 이동 중', accent: COLORS.accent_blue }
  ];

  ipgItems.forEach((item, i) => {
    const yPos = 3.65 + i * 0.65;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: COL_LEFT_X + 0.1, y: yPos + 0.18, w: 0.14, h: 0.14,
      fill: { color: item.accent }
    });
    slide.addText(item.bullet, {
      x: COL_LEFT_X + 0.35, y: yPos, w: COL_W - 0.45, h: 0.6,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle',
      wrap: true
    });
  });

  // ── 우측 컬럼 헤더 (중국 레이저 부상) ──────────────────────────────
  slide.addShape(pptx.ShapeType.rect, {
    x: COL_RIGHT_X, y: 1.8, w: COL_W, h: 0.42,
    fill: { color: COLORS.accent_cyan }
  });
  slide.addText('Raycus / MAX — 시장 점령', {
    x: COL_RIGHT_X, y: 1.8, w: COL_W, h: 0.42,
    fontSize: 13,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.bg_dark,
    align: 'center',
    valign: 'middle'
  });

  // Raycus KPI
  slide.addText('30%', {
    x: COL_RIGHT_X + 0.2, y: 2.3, w: COL_W - 0.4, h: 0.9,
    fontSize: 52,
    fontFace: FONTS.kpi.fontFace,
    bold: FONTS.kpi.bold,
    color: COLORS.accent_cyan,
    align: 'center',
    valign: 'middle'
  });

  slide.addText('Raycus 중국 내 파이버 레이저 점유율', {
    x: COL_RIGHT_X + 0.2, y: 3.2, w: COL_W - 0.4, h: 0.35,
    fontSize: 12,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'center'
  });

  // Raycus 상세 항목
  const raycusItems = [
    { bullet: 'MAX Photonics 20~30kW 고출력 제품 출시 — 산업용 두께 절단 시장 장악', accent: COLORS.accent_cyan },
    { bullet: 'Raycus 3kW 제품 IPG 대비 50~60% 저가 — 조선/중공업 고객 대거 이탈', accent: COLORS.accent_red },
    { bullet: 'TRUMPF, 특허 침해 소송 제기 (2024) — 법적 대응이 시장 진입 속도 제한 가능', accent: COLORS.accent_yellow },
    { bullet: '내수 보조금 + 수출 보조금 구조 — 원가 경쟁력의 구조적 기반', accent: COLORS.text_secondary }
  ];

  raycusItems.forEach((item, i) => {
    const yPos = 3.65 + i * 0.65;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: COL_RIGHT_X + 0.1, y: yPos + 0.18, w: 0.14, h: 0.14,
      fill: { color: item.accent }
    });
    slide.addText(item.bullet, {
      x: COL_RIGHT_X + 0.35, y: yPos, w: COL_W - 0.45, h: 0.6,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle',
      wrap: true
    });
  });

  // 중앙 구분선
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.595, y: 1.8, w: 0.04, h: 5.5,
    fill: { color: COLORS.bg_secondary }
  });

  addPageNumber(slide, 31, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 32 — [Before/After] 중국 USP 레이저 진입: '서방 수성' 가정이 5년 내 무효화될 수 있다
// ---------------------------------------------------------------------------
function slide32_china_usp_entry() {
  const slide = pptx.addSlide();
  addTitleBar(slide, "중국 USP 레이저 진입: '서방 수성' 가정이 5년 내 무효화될 수 있다");

  // ── BEFORE 패널 ──────────────────────────────────────────────────────
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 1.85, w: 5.7, h: 0.42,
    fill: { color: COLORS.text_tertiary }
  });
  slide.addText('BEFORE — 현재 통념', {
    x: 0.6, y: 1.85, w: 5.7, h: 0.42,
    fontSize: 13,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_on_dark,
    align: 'center',
    valign: 'middle'
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 2.27, w: 5.7, h: 4.8,
    fill: { color: COLORS.bg_secondary }
  });

  // Before 핵심 메시지
  slide.addText('"표준 레이저 = 중국\n고정밀 USP = 서방"', {
    x: 0.8, y: 2.45, w: 5.3, h: 0.9,
    fontSize: 18,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'middle',
    italic: true
  });

  slide.addText('고정된 분업 구도 가정', {
    x: 0.8, y: 3.35, w: 5.3, h: 0.35,
    fontSize: 12,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'left'
  });

  const beforeItems = [
    'Coherent, TRUMPF, II-VI가 USP fs/ps 시장 80%+ 장악',
    '중국 기업은 원가 경쟁력은 있으나 정밀 레이저 기술 부재',
    '고부가가치 응용(반도체, 의료, 정밀 가공)은 서방 독점 구조',
    'USP 레이저는 진입 장벽(광학 설계, 펨토초 제어) 높아 5~10년 격차 유지'
  ];

  beforeItems.forEach((text, i) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.8, y: 3.8 + i * 0.62 + 0.2, w: 0.12, h: 0.12,
      fill: { color: COLORS.text_tertiary }
    });
    slide.addText(text, {
      x: 1.05, y: 3.8 + i * 0.62, w: 5.1, h: 0.55,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'middle',
      wrap: true
    });
  });

  // ── 화살표 ────────────────────────────────────────────────────────────
  slide.addShape(pptx.ShapeType.rightArrow, {
    x: 6.5, y: 3.8, w: 0.9, h: 0.7,
    fill: { color: COLORS.accent_yellow }
  });
  slide.addText('5년 내', {
    x: 6.5, y: 4.55, w: 0.9, h: 0.3,
    fontSize: 10,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'center'
  });

  // ── AFTER 패널 ───────────────────────────────────────────────────────
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.63, y: 1.85, w: 5.1, h: 0.42,
    fill: { color: COLORS.accent_yellow }
  });
  slide.addText('AFTER — 가능한 미래 시나리오', {
    x: 7.63, y: 1.85, w: 5.1, h: 0.42,
    fontSize: 13,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.bg_dark,
    align: 'center',
    valign: 'middle'
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 7.63, y: 2.27, w: 5.1, h: 4.8,
    fill: { color: COLORS.bg_secondary }
  });

  // After 핵심 메시지
  slide.addText('"서방 수성" 가정이\n5년 내 무효화 가능', {
    x: 7.83, y: 2.45, w: 4.7, h: 0.9,
    fontSize: 18,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.accent_yellow,
    align: 'left',
    valign: 'middle'
  });

  slide.addText('[확신도: 낮음~중간]', {
    x: 7.83, y: 3.35, w: 4.7, h: 0.35,
    fontSize: 12,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'left'
  });

  const afterItems = [
    'Raycus, USP 펨토초 레이저 독자 개발 본격화 (2024 진행 중)',
    '100kW급 파이버 레이저 개발 완료 — 고출력 기술 축적 증명',
    '중국 내 반도체/디스플레이 USP 수요 급증으로 자체 공급 동기 강함',
    '5년 내 프리미엄 USP 시장 진입 가능 — 단, 수출 규제·특허 장벽이 변수'
  ];

  afterItems.forEach((text, i) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 7.83, y: 3.8 + i * 0.62 + 0.2, w: 0.12, h: 0.12,
      fill: { color: COLORS.accent_yellow }
    });
    slide.addText(text, {
      x: 8.08, y: 3.8 + i * 0.62, w: 4.5, h: 0.55,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'middle',
      wrap: true
    });
  });

  addPageNumber(slide, 32, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 33 — [Content] USP 레이저 시장: fs 64% 점유, $2.45~2.76B → $10B+(2033)
// ---------------------------------------------------------------------------
function slide33_usp_laser_market() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'USP 레이저 시장: fs 64% 점유, $2.45~2.76B(2025) → $10B+(2033)');

  // ── 상단 KPI 3개 ─────────────────────────────────────────────────────
  const kpis = [
    { value: '64.4%', label: 'fs(펨토초) 레이저 점유율', desc: 'USP 시장 내 fs 비중', color: COLORS.accent_blue },
    { value: '$2.76B', label: '2025년 USP 레이저 시장', desc: '고점 추정치 기준', color: COLORS.accent_cyan },
    { value: '$10B+', label: '2033년 전망 시장 규모', desc: 'CAGR 17~20% 가정', color: COLORS.accent_yellow }
  ];

  const kpiCardW = 3.7;
  const kpiCardH = 1.55;
  const kpiY = 1.85;
  const kpiXs = [0.6, 4.65, 8.7];

  kpis.forEach((kpi, i) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: kpiXs[i], y: kpiY, w: kpiCardW, h: kpiCardH,
      fill: { color: COLORS.bg_secondary },
      rectRadius: 0.08
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: kpiXs[i], y: kpiY, w: kpiCardW, h: 0.06,
      fill: { color: kpi.color }
    });
    slide.addText(kpi.value, {
      x: kpiXs[i] + 0.15, y: kpiY + 0.12, w: kpiCardW - 0.3, h: 0.75,
      fontSize: 36,
      fontFace: FONTS.kpi.fontFace,
      bold: FONTS.kpi.bold,
      color: kpi.color,
      align: 'center',
      valign: 'middle'
    });
    slide.addText(kpi.label, {
      x: kpiXs[i] + 0.15, y: kpiY + 0.9, w: kpiCardW - 0.3, h: 0.38,
      fontSize: 12,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'center',
      valign: 'top'
    });
    slide.addText(kpi.desc, {
      x: kpiXs[i] + 0.15, y: kpiY + 1.3, w: kpiCardW - 0.3, h: 0.22,
      fontSize: 10,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_tertiary,
      align: 'center'
    });
  });

  // ── 구조 변화 핵심 포인트 ────────────────────────────────────────────
  const points = [
    {
      title: '>100W fs 산업용 레이저 등장',
      body: 'Coherent EDGE FL30 (30kW급 파이버), >100W fs 고출력화 — 반도체·디스플레이 대면적 가공 확장',
      color: COLORS.accent_blue
    },
    {
      title: '적응형 빔 쉐이핑 + AI 결합',
      body: '실시간 빔 프로파일 최적화 + AI 파라미터 제어 — 다재료·다공정 대응 범용화 가속',
      color: COLORS.accent_cyan
    },
    {
      title: '비용 하락 곡선 가속',
      body: '5kW fs 레이저 가격 2020~2025년 40~50% 하락 추정 — 중소기업 진입 장벽 완화, 채택 가속',
      color: COLORS.accent_yellow
    },
    {
      title: '응용 확장: 반도체·의료·EV·항공',
      body: '태양전지 스크라이빙, 의료 스텐트 가공, EV 전극 슬리팅, 항공 냉각홀 — 수요 다각화',
      color: COLORS.accent_purple
    }
  ];

  const ptStartY = 3.6;
  const ptH = 0.72;

  points.forEach((pt, i) => {
    const yPos = ptStartY + i * ptH;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: yPos + 0.1, w: 0.22, h: 0.42,
      fill: { color: pt.color }
    });
    slide.addText(pt.title, {
      x: 0.98, y: yPos, w: 4.0, h: 0.36,
      fontSize: 13,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle'
    });
    slide.addText(pt.body, {
      x: 0.98, y: yPos + 0.36, w: 11.75, h: 0.35,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      wrap: true
    });
  });

  addPageNumber(slide, 33, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 34 — [Layered Stack] AI+센서 융합이 레이저를 '자율 공정 단위'로 전환시킨다
// ---------------------------------------------------------------------------
function slide34_ai_sensor_stack() {
  const slide = pptx.addSlide();
  addTitleBar(slide, "AI+센서 융합이 레이저를 '자율 공정 단위'로 전환시킨다");

  // 3계층 스택 구조
  const layers = [
    {
      label: '최상위 계층',
      title: '공정 플랫폼',
      body: '폐루프(Closed-Loop) 제어  •  예지 보전(Predictive Maintenance)\n품질 데이터 레이크  •  다공정 오케스트레이션',
      color: COLORS.accent_blue,
      icon: '🏭',
      y: 1.85
    },
    {
      label: '중간 계층',
      title: 'AI 엔진',
      body: '인라인 모니터링(Melt Pool / 용접 비드 실시간 분석)\n파라미터 자동 최적화  •  GAN 기반 melt pool 품질 예측',
      color: COLORS.accent_cyan,
      icon: '🤖',
      y: 3.55
    },
    {
      label: '기초 계층',
      title: '하드웨어',
      body: '레이저 소스(파이버/USP/그린)  •  고속 광학 센서  •  적응형 광학(AO)\n실시간 피드백 제어기(FPGA/DSP)',
      color: COLORS.accent_yellow,
      icon: '⚡',
      y: 5.25
    }
  ];

  const stackW = 12.13;
  const stackH = 1.55;
  const stackX = 0.6;

  layers.forEach((layer) => {
    // 계층 배경 박스
    slide.addShape(pptx.ShapeType.rect, {
      x: stackX, y: layer.y, w: stackW, h: stackH,
      fill: { color: COLORS.bg_secondary }
    });

    // 좌측 컬러 액센트 바
    slide.addShape(pptx.ShapeType.rect, {
      x: stackX, y: layer.y, w: 0.35, h: stackH,
      fill: { color: layer.color }
    });

    // 계층 레이블 (수직)
    slide.addText(layer.label, {
      x: stackX + 0.05, y: layer.y + 0.05, w: 0.25, h: stackH - 0.1,
      fontSize: 8,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle',
      rotate: 270
    });

    // 계층 제목
    slide.addText(layer.title, {
      x: stackX + 0.55, y: layer.y + 0.12, w: 3.5, h: 0.5,
      fontSize: 20,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: layer.color,
      align: 'left',
      valign: 'middle'
    });

    // 계층 본문
    slide.addText(layer.body, {
      x: stackX + 0.55, y: layer.y + 0.65, w: 11.2, h: 0.82,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      wrap: true
    });

    // 계층 우측 강조 레이블
    slide.addText(layer.title.toUpperCase(), {
      x: stackX + 8.0, y: layer.y + 0.12, w: 4.5, h: 0.45,
      fontSize: 10,
      fontFace: FONTS.body.fontFace,
      color: layer.color,
      align: 'right',
      valign: 'middle'
    });
  });

  // 화살표 연결: 최하 → 최상
  const arrowX = stackX + 5.5;
  // 하드웨어 → AI 화살표
  slide.addShape(pptx.ShapeType.upArrow, {
    x: arrowX, y: 4.85, w: 1.2, h: 0.35,
    fill: { color: COLORS.accent_yellow }
  });
  // AI → 플랫폼 화살표
  slide.addShape(pptx.ShapeType.upArrow, {
    x: arrowX, y: 3.15, w: 1.2, h: 0.35,
    fill: { color: COLORS.accent_cyan }
  });

  addPageNumber(slide, 34, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 35 — [Cards] AI 레이저 공정의 3대 구조 변화
// ---------------------------------------------------------------------------
function slide35_ai_laser_structural_change() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'AI 레이저 공정의 3대 구조 변화');

  const cards = [
    {
      accentColor: COLORS.accent_blue,
      title: '① 레이저 → 자율 공정 단위',
      body: '공정 엔지니어의 파라미터 수동 튜닝 역할 감소\n소프트웨어(AI 모델, 공정 레시피 DB)의 가치 급등\n장비 HW 마진 압박 — SW/서비스 수익 비중 증가'
    },
    {
      accentColor: COLORS.accent_cyan,
      title: '② 전용 장비 → 범용 플랫폼',
      body: '빔 쉐이핑 + AI 파라미터 최적화로 단일 장비가 다품종 대응\n고객당 매출 단가 상승 (장비 × 소프트웨어 × 유지보수)\n진입 장벽: 레시피 라이브러리가 경쟁 해자로 부상'
    },
    {
      accentColor: COLORS.accent_yellow,
      title: '③ 사후 검사 → 인라인 보정',
      body: '실시간 결함 억제 — 반품률·불량률 구조적 개선\nMelt pool 모니터링으로 용접 강도 예측 (GAN 모델 활용)\n검사 단계 제거 → 사이클타임 단축 + 라인 가동률 향상'
    }
  ];

  const positions = CARD_2X3.positions;
  const cardW = CARD_2X3.w;
  const cardH = 4.8;

  cards.forEach((card, i) => {
    if (i < 3) {
      addCard(slide, {
        x: positions[i].x,
        y: 1.85,
        w: cardW,
        h: cardH,
        title: card.title,
        body: card.body,
        accentColor: card.accentColor
      });
    }
  });

  addPageNumber(slide, 35, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 36 — [Comparison Table] 경쟁 기술 대비 레이저 우위/열위
// ---------------------------------------------------------------------------
function slide36_laser_vs_competitors() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '경쟁 기술 대비 레이저 우위/열위 — 정밀도·비용·환경·재료 범위·시장 규모');

  const features = ['정밀도', '비용 경쟁력', '환경 친화성', '재료 범위', '시장 규모'];
  const options = [
    {
      label: '레이저',
      color: COLORS.accent_blue,
      scores: ['✓ 우위', '△ 중간', '✓ 우위', '✓ 우위', '✓ 우위']
    },
    {
      label: '플라즈마',
      color: COLORS.text_tertiary,
      scores: ['✗ 열위', '✓ 우위', '✗ 열위', '✓ 우위', '✗ 열위']
    },
    {
      label: '전자빔',
      color: COLORS.text_tertiary,
      scores: ['✗ 열위', '✗ 열위', '✓ 우위', '△ 제한적', '✗ 소규모']
    },
    {
      label: 'CNC 기계가공',
      color: COLORS.text_tertiary,
      scores: ['✗ 열위', '✓ 우위', '✗ 열위', '△ 경성 재료', '✓ 우위']
    }
  ];

  // 테이블 헤더 행
  const headers = ['기술', '정밀도', '비용 경쟁력', '환경 친화성', '재료 범위', '시장 규모'];

  const dataRows = options.map((opt) => {
    const isLaser = opt.label === '레이저';
    return [
      { text: opt.label, options: { bold: isLaser, color: isLaser ? COLORS.accent_blue : COLORS.text_secondary } },
      ...opt.scores.map((score) => {
        const isAdvantage = score.startsWith('✓');
        const isNeutral = score.startsWith('△');
        return {
          text: score,
          options: {
            bold: isLaser,
            color: isAdvantage
              ? (isLaser ? COLORS.accent_blue : COLORS.text_tertiary)
              : (isNeutral ? COLORS.accent_yellow : COLORS.accent_red),
            align: 'center'
          }
        };
      })
    ];
  });

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.85, w: 12.13, h: 4.2,
    colW: [2.0, 2.03, 2.02, 2.03, 2.03, 2.02]
  });

  // 하단 인사이트 박스
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 6.2, w: 12.13, h: 0.65,
    fill: { color: COLORS.bg_secondary }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 6.2, w: 0.08, h: 0.65,
    fill: { color: COLORS.accent_blue }
  });
  slide.addText('핵심 인사이트: 레이저의 비용 열위는 고정밀·다재료 응용에서 상쇄된다. 비용이 유일한 선택 기준인 표준 절단 시장은 중국 레이저에 내어주고, 정밀도·유연성·환경 규제 대응이 필요한 고부가 시장 집중이 방어 전략이다.', {
    x: 0.82, y: 6.22, w: 11.8, h: 0.61,
    fontSize: 11,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'middle',
    wrap: true
  });

  addPageNumber(slide, 36, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 37 — [Section] Part 5: 3가지 미래 시나리오 — 어떤 미래에 베팅할 것인가
// ---------------------------------------------------------------------------
function slide37_section_scenarios() {
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
    color: COLORS.accent_yellow,
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
  slide.addText('3가지 미래 시나리오\n어떤 미래에 베팅할 것인가', {
    x: 6.0, y: 2.2, w: 6.73, h: 1.8,
    fontSize: 32,
    fontFace: FONTS.title.fontFace,
    bold: FONTS.title.bold,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'top',
    wrap: true
  });

  // 우 설명
  slide.addText('보수 / 기준 / 공격 시나리오별 전제, 촉발 조건, 우리의 전략을 정의한다', {
    x: 6.0, y: 4.2, w: 6.73, h: 1.0,
    fontSize: 15,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'top',
    wrap: true
  });

  // 구분 액센트 라인
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.0, y: 4.05, w: 2.0, h: 0.05,
    fill: { color: COLORS.accent_yellow }
  });

  // 시나리오 3개 아이콘 힌트
  const scenarios = [
    { label: '보수', color: COLORS.text_tertiary, x: 6.0 },
    { label: '기준', color: COLORS.accent_blue, x: 8.1 },
    { label: '공격', color: COLORS.accent_yellow, x: 10.2 }
  ];

  scenarios.forEach((s) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: s.x, y: 5.3, w: 1.8, h: 0.65,
      fill: { color: s.color }
    });
    slide.addText(s.label, {
      x: s.x, y: 5.3, w: 1.8, h: 0.65,
      fontSize: 14,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle'
    });
  });
}

// ---------------------------------------------------------------------------
// Slide 38 — [Table] 시나리오 매트릭스: 보수/기준/공격
// ---------------------------------------------------------------------------
function slide38_scenario_matrix() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '시나리오 매트릭스: 보수 / 기준 / 공격 — 전제, 촉발 조건, 반증 조건');

  const headers = ['항목', '보수 (25%)', '기준 (50%)', '공격 (25%)'];

  const dataRows = [
    [
      '핵심 전제',
      'MicroLED 수율 미해소\n2029년 이후 상용화',
      'MicroLED 워치/AR 소량\n폴더블 침투율 3%+',
      'MicroLED 스마트폰 2027\n폴더블 5%+ / 로봇 10만대+'
    ],
    [
      '촉발 조건',
      '수율 99.99% 미달 지속\nApple Watch 2차 백지화',
      '폴더블 YoY 30%+ 성장\nEV CAGR 13% 유지',
      'MicroLED 수율 99.99% 달성\n로봇 1만대/년 양산 돌파'
    ],
    [
      '반증 조건',
      'MicroLED 수율 급등\n폴더블 시장 급성장',
      'MicroLED 2025~2026 조기 상용화\n로봇 양산 예상 초과',
      '수율 2030년까지 미달\nEV 접착 본딩 대체 가속'
    ],
    [
      'EV 레이저 전략',
      'LLO 기존 유지\nEV 용접 집중 (그린+파이버)',
      '폴더블+EV 양면 추진\nGLLO R&D 병행',
      'MicroLED LIFT 본격 + EV + 로봇'
    ],
    [
      '우리 전략 핵심',
      'EV 그린 레이저 PoC\nIATF 인증 착수',
      'EV + 폴더블 드릴링 역량 확보\nMicroLED R&D 준비',
      'MicroLED+로봇+AI 플랫폼\n공격적 선점'
    ]
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.85, w: 12.13, h: 5.0,
    colW: [2.2, 3.31, 3.31, 3.31]
  });

  addPageNumber(slide, 38, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 39 — [Cards] 시나리오별 핵심 차이점
// ---------------------------------------------------------------------------
function slide39_scenario_key_diff() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '시나리오별 핵심 차이점 — 무엇이 달라지는가');

  const cards = [
    {
      accentColor: COLORS.text_secondary,
      title: '보수 시나리오 — LLO 유지 + EV 집중',
      body: 'MicroLED 2029년+ 가정\nLLO 기존 공정 유지, 대규모 R&D 투자 보류\nEV 배터리 용접 집중: 그린+파이버 하이브리드\nIATF 인증 12~24개월 착수\n⚠ 기회 놓칠 리스크: MicroLED 조기 전환 시 2~3년 지연'
    },
    {
      accentColor: COLORS.accent_blue,
      title: '기준 시나리오 — 폴더블+EV 양면 추진',
      body: 'MicroLED R&D 준비 병행 (본격 투자는 아님)\n폴더블 드릴링 역량 확보 + EV 용접 동시 진행\nGLLO 스케일업 R&D 파트너십\nAI 인라인 모니터링 PoC 착수\n→ 균형 전략: 리스크 분산 + 기회 유지'
    },
    {
      accentColor: COLORS.accent_yellow,
      title: '공격 시나리오 — MicroLED + 로봇 + AI 플랫폼',
      body: 'MicroLED LIFT 장비 본격 개발 (수율 트리거 확인 후)\n인간형 로봇 레이저 가공 선점 시도\nAI 공정 플랫폼 구축 — 장비 → 소프트웨어 매출 전환\n⚠ 가장 큰 오판 리스크: MicroLED 지연·로봇 양산 실패 시 매몰비용 높음'
    }
  ];

  const positions = CARD_2X3.positions;
  const cardW = CARD_2X3.w;
  const cardH = 4.8;

  cards.forEach((card, i) => {
    addCard(slide, {
      x: positions[i].x,
      y: 1.85,
      w: cardW,
      h: cardH,
      title: card.title,
      body: card.body,
      accentColor: card.accentColor
    });
  });

  addPageNumber(slide, 39, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 40 — [Table] 오판 리스크 매트릭스
// ---------------------------------------------------------------------------
function slide40_misjudgment_risk() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '오판 리스크 매트릭스 — 이 판단이 틀렸을 때 무엇을 잃는가');

  const headers = ['판단 영역', '오판 내용', '잃는 것 (기회비용/매몰비용)', '가능성'];

  const dataRows = [
    [
      'EV 배터리 용접',
      '접착 본딩이 레이저 용접을 대체\n(전고체 배터리 구조 변경)',
      'IATF 인증 비용 + EV 투자 기회비용\n→ 대안: 전고체 대응 기술 별도 준비',
      { text: '낮음', options: { color: COLORS.accent_cyan, bold: true, align: 'center' } }
    ],
    [
      '폴더블 디스플레이',
      '시장 성장 정체\n(크리즈 문제 미해결, 소비자 외면)',
      '드릴링 장비 투자비\n→ 대안: OLED/UTG 공정으로 전환',
      { text: '중간', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ],
    [
      'MicroLED',
      '수율 갑자기 해결, 조기 양산\n(우리 진입 2~3년 지연)',
      '고부가 MicroLED 시장 선점 기회 상실\n→ 대안: 2027년 트리거 모니터링 필수',
      { text: '낮음~중간', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ],
    [
      'GLLO 스케일업',
      'R&D 성공했으나\n고객 채택 저조',
      'R&D 비용 (제한적, 파트너십으로 분산 가능)\n→ 대안: 외부 라이선싱 또는 공동 개발',
      { text: '중간', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ],
    [
      '중국 USP 진입',
      '중국 USP 급성장 대비 안 함\n(소싱·공급망 전략 부재)',
      '소싱 비용 급증 + 가격 경쟁력 약화\n→ 대안: 고정밀 응용 영역 선점 + 소싱 이원화',
      { text: '중간', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ]
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.85, w: 12.13, h: 4.9,
    colW: [2.0, 3.4, 4.5, 2.23]
  });

  addPageNumber(slide, 40, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 41 — [Content] 틀릴 가능성이 가장 큰 3가지 전제
// ---------------------------------------------------------------------------
function slide41_top3_wrong_assumptions() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '틀릴 가능성이 가장 큰 3가지 전제');

  const assumptions = [
    {
      num: '01',
      title: 'MicroLED 타임라인',
      subtitle: '역사적으로 가장 자주 틀려온 전제',
      body: [
        '• 2015년 이후 매 2~3년마다 "2~3년 내 상용화"가 반복됐다',
        '• 현재 수율 99.5~99.8% — 목표 99.99%까지 0.2% 격차가 기하급수적 어려움',
        '• 보수 시나리오: 2029년 이후. 단, 2027년 워치/AR 소량 양산 가능',
        '전략 함의: 2년 버퍼를 기본 가정으로 내장하고, 2026~2027년 신호를 분기별 점검'
      ],
      color: COLORS.accent_red,
      confidence: '[확신도: 낮음~중간]'
    },
    {
      num: '02',
      title: '인간형 로봇 양산 스케일',
      subtitle: '1만 대/년 이전 레이저 수요는 미미',
      body: [
        '• Tesla Optimus, Figure AI 등 "수십만 대" 목표 반복 발표 — 실현 지연 패턴 반복',
        '• 현실: 2025년 말 기준 연간 수천 대 수준 (레이저 수요 임계점 미달)',
        '• 하모닉 드라이브 레이저 가공 전환 근거 독립 검증 없음',
        '전략 함의: 2028년 이전 로봇 레이저 수요 기반 투자는 보류. 10만 대/년 돌파 확인 후 진입'
      ],
      color: COLORS.accent_yellow,
      confidence: '[확신도: 낮음]'
    },
    {
      num: '03',
      title: 'AI 공정 모니터링 범용화',
      subtitle: '파일럿→양산 갭이 예상보다 클 수 있다',
      body: [
        '• 파일럿 환경 성공률은 높으나 양산 전환 성공률은 1~5% (제조 AI 전반)',
        '• 레이저 공정 AI는 재료 변동성·빔 드리프트·환경 변수에 취약',
        '• 실무자 경험: "AI가 잘 되는 레이저 공정"과 "AI가 필요한 레이저 공정"이 다름',
        '전략 함의: 파일럿 PoC를 먼저 수행하고, 양산 갭 측정 후 투자 확대 결정'
      ],
      color: COLORS.accent_purple,
      confidence: '[확신도: 중간]'
    }
  ];

  const itemH = 1.65;
  const startY = 1.85;

  assumptions.forEach((item, i) => {
    const yPos = startY + i * itemH;

    // 번호 배지 (큰 원)
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.6, y: yPos + 0.25, w: 0.75, h: 0.75,
      fill: { color: item.color }
    });
    slide.addText(item.num, {
      x: 0.6, y: yPos + 0.25, w: 0.75, h: 0.75,
      fontSize: 18,
      fontFace: FONTS.kpi.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle'
    });

    // 전제 제목
    slide.addText(item.title, {
      x: 1.5, y: yPos + 0.1, w: 7.5, h: 0.42,
      fontSize: 17,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle'
    });

    // 부제목 (서브타이틀)
    slide.addText(item.subtitle, {
      x: 1.5, y: yPos + 0.5, w: 7.0, h: 0.3,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: item.color,
      align: 'left',
      valign: 'middle'
    });

    // 확신도 레이블
    slide.addText(item.confidence, {
      x: 9.3, y: yPos + 0.15, w: 3.43, h: 0.35,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_tertiary,
      align: 'right',
      valign: 'middle'
    });

    // 본문 항목들
    const bodyText = item.body.join('\n');
    const isLastBullet = (text) => !text.startsWith('•');

    // 일반 본문 (전략 함의 포함)
    slide.addText(bodyText, {
      x: 1.5, y: yPos + 0.82, w: 11.23, h: 0.78,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      wrap: true,
      lineSpacingMultiple: 1.3
    });

    // 구분선 (마지막 제외)
    if (i < assumptions.length - 1) {
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.6, y: yPos + itemH - 0.08, w: 12.13, h: 0.02,
        fill: { color: 'E2E8F0' }
      });
    }
  });

  addPageNumber(slide, 41, TOTAL_SLIDES);
}

// === Part 3 끝 ===
