// === Part 3 시작 ===

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
      line: { color: t.color, width: 0 }
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

// === Part 3 끝 ===
