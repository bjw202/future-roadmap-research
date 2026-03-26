// === Part 2 시작 ===

// Slide 15 — TwoColumn: 크리즈프리 폴더블 레이저 드릴 금속 플레이트
function slide15_creasefree_foldable() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '크리즈프리 폴더블: 레이저 드릴 금속 플레이트가 핵심 공정으로 부상');

  // 좌측 컬럼 배경
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.05, w: 5.9, h: 5.7,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.bg_secondary }
  });

  // 좌측 헤더
  slide.addText('CES 2026 Samsung Display 시연', {
    x: 0.4, y: 1.1, w: 5.7, h: 0.35,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_blue
  });

  // 좌측 accent bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.4, y: 1.45, w: 0.05, h: 4.8,
    fill: { color: COLORS.accent_blue },
    line: { color: COLORS.accent_blue }
  });

  const leftItems = [
    { label: '크리즈 저감', value: '20% 감소', desc: 'CES 2026 공개 시연 — 레이저 드릴 금속 플레이트 적용 결과' },
    { label: '대상 패널', value: '15M+/년', desc: 'Apple/Samsung 확정 폴더블 OLED 수요 (2026~2027)' },
    { label: '적용 기술', value: 'GLLO + 드릴링', desc: '그래핀 지원 LLO + 마이크로홀 금속 힌지 플레이트 복합 공정' },
    { label: '기대 효과', value: '힌지 내구성 ↑', desc: '사용자 체감 폴드 품질 개선 — 프리미엄 제품 차별화 핵심' }
  ];

  leftItems.forEach((item, i) => {
    const yBase = 1.55 + i * 1.18;
    slide.addText(item.label, {
      x: 0.55, y: yBase, w: 5.5, h: 0.26,
      fontSize: 9, fontFace: FONTS.caption.fontFace, bold: false,
      color: COLORS.text_tertiary
    });
    slide.addText(item.value, {
      x: 0.55, y: yBase + 0.25, w: 5.5, h: 0.34,
      fontSize: 16, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(item.desc, {
      x: 0.55, y: yBase + 0.58, w: 5.5, h: 0.45,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  // 구분선
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.3, y: 1.05, w: 0.03, h: 5.7,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.bg_secondary }
  });

  // 우측 컬럼 배경
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.43, y: 1.05, w: 5.9, h: 5.7,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.bg_secondary }
  });

  // 우측 헤더
  slide.addText('Fine M-Tec 공급망 & 원가 비교', {
    x: 6.53, y: 1.1, w: 5.7, h: 0.35,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_yellow
  });

  // 우측 accent bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.53, y: 1.45, w: 0.05, h: 4.8,
    fill: { color: COLORS.accent_yellow },
    line: { color: COLORS.accent_yellow }
  });

  const rightItems = [
    { label: '화학 에칭 원가', value: '$20/플레이트', desc: '기존 공정 — 식각 균일도 한계, 홀 정밀도 ±5μm 수준' },
    { label: '레이저 드릴링 원가', value: '$30~35/플레이트', desc: '레이저 마이크로홀 — 정밀도 ±1μm, 크리즈 저감 핵심 요인' },
    { label: '원가 프리미엄', value: '50~75% 높음', desc: '그러나 품질/수율 개선 효과로 Total BOM에서 정당화 가능' },
    { label: '주요 공급사', value: 'Fine M-Tec (한국)', desc: '삼성디스플레이 주 공급사 — 글로벌 경쟁사 진입 시도 중' }
  ];

  rightItems.forEach((item, i) => {
    const yBase = 1.55 + i * 1.18;
    slide.addText(item.label, {
      x: 6.68, y: yBase, w: 5.5, h: 0.26,
      fontSize: 9, fontFace: FONTS.caption.fontFace, bold: false,
      color: COLORS.text_tertiary
    });
    slide.addText(item.value, {
      x: 6.68, y: yBase + 0.25, w: 5.5, h: 0.34,
      fontSize: 16, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(item.desc, {
      x: 6.68, y: yBase + 0.58, w: 5.5, h: 0.45,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 15, TOTAL_SLIDES);
}

// Slide 16 — Timeline: 폴더블 OLED 레이저 공정 진화 타임라인
function slide16_foldable_timeline() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '폴더블 OLED 레이저 공정 진화 타임라인');

  const milestones = [
    {
      period: '2026 Q1',
      title: 'GLLO 파일럿 양산',
      items: ['삼성디스플레이 그래핀 LLO 파일럿 라인 가동', '탄화 잔류물 92.8% 감소 검증', '캐리어 기판 재사용 공정 확립'],
      color: COLORS.accent_blue
    },
    {
      period: '2026 H2',
      title: 'Z Fold 8 / iPhone Fold 양산',
      items: ['레이저 드릴 금속 플레이트 본격 적용', 'Apple 첫 폴더블 iPhone 출하 예정', '연간 15M+ 패널 수요 발생'],
      color: COLORS.accent_cyan
    },
    {
      period: '2027',
      title: '폴더블 침투율 3%+',
      items: ['스마트폰 전체 대비 폴더블 3% 돌파 전망', 'UTG 2세대 공정 상용화 검토', '레이저 드릴 공급망 경쟁 본격화'],
      color: COLORS.accent_yellow
    },
    {
      period: '2028',
      title: 'UTG 이중층 표준화',
      items: ['이중층 UTG 구조로 크리즈 추가 저감', 'USP 인라인 검사 통합 표준화', 'MicroLED 폴더블 시제품 등장 가능성'],
      color: COLORS.accent_purple
    }
  ];

  const totalW = 12.13;
  const startX = 0.3;
  const colW = totalW / milestones.length;
  const lineY = 2.5;

  // 타임라인 기준선
  slide.addShape(pptx.ShapeType.rect, {
    x: startX, y: lineY, w: totalW, h: 0.04,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.bg_secondary }
  });

  milestones.forEach((m, i) => {
    const cx = startX + colW * i + colW / 2;
    const dotX = cx - 0.15;

    // 마일스톤 점
    slide.addShape(pptx.ShapeType.ellipse, {
      x: dotX, y: lineY - 0.15, w: 0.3, h: 0.3,
      fill: { color: m.color },
      line: { color: m.color }
    });

    // 기간 뱃지
    slide.addShape(pptx.ShapeType.rect, {
      x: startX + colW * i + 0.1, y: 1.15, w: colW - 0.2, h: 0.36,
      fill: { color: m.color },
      line: { color: m.color }
    });
    slide.addText(m.period, {
      x: startX + colW * i + 0.1, y: 1.15, w: colW - 0.2, h: 0.36,
      fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    // 제목
    slide.addText(m.title, {
      x: startX + colW * i + 0.1, y: 1.6, w: colW - 0.2, h: 0.5,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, align: 'center', wrap: true
    });

    // 세로 연결선
    slide.addShape(pptx.ShapeType.rect, {
      x: cx - 0.02, y: 2.1, w: 0.04, h: lineY - 2.1,
      fill: { color: m.color },
      line: { color: m.color }
    });

    // 아이템 카드
    slide.addShape(pptx.ShapeType.rect, {
      x: startX + colW * i + 0.1, y: lineY + 0.3, w: colW - 0.2, h: 4.1,
      fill: { color: COLORS.bg_secondary },
      line: { color: m.color }
    });

    // 상단 accent
    slide.addShape(pptx.ShapeType.rect, {
      x: startX + colW * i + 0.1, y: lineY + 0.3, w: colW - 0.2, h: 0.06,
      fill: { color: m.color },
      line: { color: m.color }
    });

    m.items.forEach((item, j) => {
      slide.addText('• ' + item, {
        x: startX + colW * i + 0.2, y: lineY + 0.55 + j * 1.12, w: colW - 0.4, h: 1.0,
        fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
        color: COLORS.text_secondary, wrap: true
      });
    });
  });

  addPageNumber(slide, 16, TOTAL_SLIDES);
}

// Slide 17 — Cards: MicroLED 장기 기회와 수율 병목
function slide17_microled_cards() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'MicroLED: 장기 최대 기회이나 수율 병목이 핵심 장벽');

  const cards = [
    {
      title: 'LLO / LIFT 필수 공정',
      body: '4K 디스플레이 기준 800만 개 마이크로칩 전사 필요.\nLaser-Induced Forward Transfer(LIFT)가 핵심 공정으로 레이저 정밀도가 수율 직결.',
      accentColor: COLORS.accent_blue
    },
    {
      title: '수율 목표 vs 현실',
      body: '상용화 목표 수율: 99.99%+\n현재 달성 수준: 99.5~99.8%\n\n0.01% 불량 = 4K 화면에 800개 불량 픽셀 → 허용 불가.',
      accentColor: COLORS.accent_red
    },
    {
      title: '장비 시장 전망 (불확실성 높음)',
      body: '$4.5B (2035) 전망 — 단일 출처, 수율 해소 전제.\n\n수율 병목 지속 시 시장 실현 시기 후퇴 가능. 투자 판단 시 전제 확인 필수.',
      accentColor: COLORS.accent_yellow
    },
    {
      title: 'Apple Watch MicroLED 백지화 (2024)',
      body: '2024년 Apple이 MicroLED Apple Watch 개발을 전면 중단.\n원가 ($3,000/시계)와 수율 문제가 원인 — 기술 낙관론 경계 신호.',
      accentColor: COLORS.accent_purple
    }
  ];

  const positions = [
    { x: 0.3, y: 1.15 },
    { x: 6.46, y: 1.15 },
    { x: 0.3, y: 4.25 },
    { x: 6.46, y: 4.25 }
  ];

  cards.forEach((card, i) => {
    addCard(slide, {
      x: positions[i].x,
      y: positions[i].y,
      w: 5.9,
      h: 2.75,
      title: card.title,
      body: card.body,
      accentColor: card.accentColor
    });
  });

  addPageNumber(slide, 17, TOTAL_SLIDES);
}

// Slide 18 — Before/After: MicroLED 타임라인 현실 보정
function slide18_microled_before_after() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'MicroLED 타임라인: 역사적 지연 패턴을 반영하라');

  addBeforeAfter(slide,
    {
      label: 'BEFORE — 낙관적 전망',
      content: '"2027~2028년 MicroLED 상용화"\n\n• 기술 성능 향상 속도를 채택 가능성으로 오인\n• 단일 출처 수율 데이터 과신\n• Apple Watch 백지화 교훈 반영 미흡\n• 확신도: [중간] — 근거 불충분\n\n위험: 이 타임라인을 전제로 투자 결정 시 조기 진입 손실 위험',
      color: COLORS.accent_red
    },
    {
      label: 'AFTER — 현실 조정 전망',
      content: '"보수 시나리오: 2029년 이후 상용화"\n\n• 수율 99.99%+ 달성 시점이 핵심 촉발 조건\n• Apple Watch 백지화 = 2~3년 추가 지연 선행 신호\n• 2027년 수율 개선 트리거 모니터링 후 재평가\n• 확신도: [낮음~중간] — 수율 단일 출처 주의\n\n권고: 관망 + 2027년 전환 트리거 추적',
      color: COLORS.accent_blue
    }
  );

  addPageNumber(slide, 18, TOTAL_SLIDES);
}

// Slide 19 — Content: 잉크젯 OLED의 FMM 구조적 위협
function slide19_inkjet_oled_threat() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '잉크젯 OLED가 FMM 레이저 가공의 구조적 위협이다');

  // 핵심 메시지 배너
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.1, w: 12.13, h: 0.6,
    fill: { color: COLORS.accent_red },
    line: { color: COLORS.accent_red }
  });
  slide.addText('FMM(Fine Metal Mask) 레이저 가공 의존 사업은 잉크젯 전환 시나리오 대비가 필요하다', {
    x: 0.3, y: 1.1, w: 12.13, h: 0.6,
    fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_on_dark, align: 'center', valign: 'middle'
  });

  const sections = [
    {
      icon: '①',
      title: 'Samsung EL-QD 잉크젯 264PPI 시제품',
      body: '2025년 Samsung Display가 264PPI 잉크젯 QD-OLED 시제품 공개. FMM 없이 RGB 패터닝 가능성 실증. 현재 색순도·수명 상용화 기준 미달이나 개발 속도 주목.',
      color: COLORS.accent_blue
    },
    {
      icon: '②',
      title: 'Canon Tokki 잉크젯 OLED 라인 개발 진행',
      body: 'Canon Tokki가 증착 장비 독점 지위에서 잉크젯 방식으로 병행 투자. 기존 FMM 증착 장비 공급사의 자기잠식(cannibalization) 전략 — 시장 전환 임박 신호.',
      color: COLORS.accent_cyan
    },
    {
      icon: '③',
      title: 'FMM 시장 축소 — 시간 문제',
      body: '잉크젯 상용화 시 FMM 레이저 커팅·용접·검사 수요 구조적 감소. 단기(~2027) 영향 미미, 2028~2030 전환 가속 시나리오에서 FMM 의존 매출 30~50% 영향 가능.',
      color: COLORS.accent_yellow
    },
    {
      icon: '④',
      title: '전략 대응: FMM 의존 사업 축소 시나리오 준비',
      body: '지금 당장 FMM을 대체하는 것이 아니라, 잉크젯 전환 트리거(264PPI 양산 승인, Canon Tokki 라인 발주)를 모니터링하고, FMM 외 레이저 응용 포트폴리오 다각화를 병행.',
      color: COLORS.accent_purple
    }
  ];

  sections.forEach((sec, i) => {
    const x = i < 2 ? 0.3 + (i % 2) * 6.16 : 0.3 + (i % 2) * 6.16;
    const y = i < 2 ? 1.85 : 4.45;
    const w = 5.9;
    const h = 2.35;

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w, h,
      fill: { color: COLORS.bg_secondary },
      line: { color: sec.color }
    });

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w, h: 0.06,
      fill: { color: sec.color },
      line: { color: sec.color }
    });

    slide.addShape(pptx.ShapeType.rect, {
      x, y: y + 0.1, w: 0.06, h: h - 0.1,
      fill: { color: sec.color },
      line: { color: sec.color }
    });

    slide.addText(sec.icon + ' ' + sec.title, {
      x: x + 0.15, y: y + 0.12, w: w - 0.25, h: 0.4,
      fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, wrap: true
    });
    slide.addText(sec.body, {
      x: x + 0.15, y: y + 0.55, w: w - 0.25, h: h - 0.65,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 19, TOTAL_SLIDES);
}

// Slide 20 — TwoColumn: LLO 대체 위협 GLLO vs Omniply
function slide20_llo_alternatives() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'LLO 대체 위협: GLLO(업그레이드) vs Omniply(파괴)');

  // 좌측 — GLLO
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.1, w: 5.9, h: 5.65,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent_blue }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.1, w: 5.9, h: 0.06,
    fill: { color: COLORS.accent_blue },
    line: { color: COLORS.accent_blue }
  });

  slide.addText('GLLO — 레이저 LLO의 진화형 (업그레이드)', {
    x: 0.4, y: 1.2, w: 5.7, h: 0.4,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_blue
  });

  const glloItems = [
    { label: '탄화 저감', value: '92.8% 감소', desc: '기존 LLO 탄화 잔류물 대비 — 패널 불량 대폭 축소' },
    { label: '캐리어 재사용', value: '비용 절감 직결', desc: '그래핀 계면층으로 캐리어 기판 반복 사용 가능' },
    { label: '스케일업 과제', value: '그래핀 균일도', desc: '대면적(Gen 8+) 그래핀 증착 균일도 확보가 핵심 병목' },
    { label: '현 상태', value: '파일럿 진행 중', desc: '2026 Q1 삼성디스플레이 파일럿 — 양산 타임라인 미확정' }
  ];

  glloItems.forEach((item, i) => {
    const yBase = 1.7 + i * 1.22;
    slide.addText(item.label, {
      x: 0.45, y: yBase, w: 5.5, h: 0.22,
      fontSize: 8, fontFace: FONTS.caption.fontFace, bold: false,
      color: COLORS.text_tertiary
    });
    slide.addText(item.value, {
      x: 0.45, y: yBase + 0.2, w: 5.5, h: 0.32,
      fontSize: 14, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(item.desc, {
      x: 0.45, y: yBase + 0.5, w: 5.5, h: 0.4,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  // 우측 — Omniply
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.43, y: 1.1, w: 5.9, h: 5.65,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent_red }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.43, y: 1.1, w: 5.9, h: 0.06,
    fill: { color: COLORS.accent_red },
    line: { color: COLORS.accent_red }
  });

  slide.addText('Omniply — 비레이저 방식의 파괴적 도전 (파괴)', {
    x: 6.53, y: 1.2, w: 5.7, h: 0.4,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_red
  });

  const omniplyItems = [
    { label: 'CAPEX 비교', value: '기존 LLO의 1/3', desc: '설비 투자 비용 대폭 절감 — 중소 팹 진입 장벽 낮춤' },
    { label: '방식', value: '비레이저 박리', desc: '레이저 없이 기계적/화학적 계면 분리 — LLO 시장 직접 위협' },
    { label: '현 상태', value: 'TV 팹 평가 중', desc: '2026년 중 대형 TV 팹 평가 결과 예정 — 결과가 핵심 트리거' },
    { label: '위협 수준', value: '[중간~높음]', desc: 'TV 팹 채택 확정 시 모바일 OLED로 확산 가능 — 지속 모니터링 필요' }
  ];

  omniplyItems.forEach((item, i) => {
    const yBase = 1.7 + i * 1.22;
    slide.addText(item.label, {
      x: 6.58, y: yBase, w: 5.5, h: 0.22,
      fontSize: 8, fontFace: FONTS.caption.fontFace, bold: false,
      color: COLORS.text_tertiary
    });
    slide.addText(item.value, {
      x: 6.58, y: yBase + 0.2, w: 5.5, h: 0.32,
      fontSize: 14, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(item.desc, {
      x: 6.58, y: yBase + 0.5, w: 5.5, h: 0.4,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 20, TOTAL_SLIDES);
}

// Slide 21 — Content: 디스플레이 핵심 병목 4가지
function slide21_display_bottlenecks() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '디스플레이 분야 핵심 병목 4가지와 해결 조건');

  const bottlenecks = [
    {
      num: '①',
      problem: 'LLO 탄화 잔류물',
      solution: 'GLLO — 그래핀 계면층 적용',
      status: '파일럿 단계',
      statusColor: COLORS.accent_yellow,
      detail: '92.8% 탄화 감소 달성. 대면적 균일도 확보 후 양산 전환 가능.',
      color: COLORS.accent_blue
    },
    {
      num: '②',
      problem: 'MicroLED 전사 수율 (99.5~99.8%)',
      solution: 'AI 비전 + 레이저 광학 제어 통합',
      status: '연구 단계',
      statusColor: COLORS.accent_red,
      detail: '99.99%+ 달성이 상용화 조건. 현재 최선단 AI 인라인 모니터링 연구 진행 중.',
      color: COLORS.accent_red
    },
    {
      num: '③',
      problem: 'UTG 마이크로크랙',
      solution: 'USP 파라미터 최적화 + 인라인 검사',
      status: '개선 진행 중',
      statusColor: COLORS.accent_cyan,
      detail: '초단펄스(USP) 레이저 pulse duration 최적화로 열영향부 최소화. 인라인 OCT 검사 병행.',
      color: COLORS.accent_cyan
    },
    {
      num: '④',
      problem: 'UDC(언더디스플레이 카메라) 화질',
      solution: '2027년 이후 재평가',
      status: '관망 권고',
      statusColor: COLORS.accent_purple,
      detail: '현재 화질 개선 속도 더딤. 2027년 픽셀 투명도 기술 성숙도 확인 후 투자 판단 권고.',
      color: COLORS.accent_purple
    }
  ];

  bottlenecks.forEach((b, i) => {
    const y = 1.15 + i * 1.6;
    const h = 1.45;

    slide.addShape(pptx.ShapeType.rect, {
      x: 0.3, y, w: 12.13, h,
      fill: { color: COLORS.bg_secondary },
      line: { color: b.color }
    });

    slide.addShape(pptx.ShapeType.rect, {
      x: 0.3, y, w: 0.06, h,
      fill: { color: b.color },
      line: { color: b.color }
    });

    // 번호 뱃지
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.5, y: y + 0.35, w: 0.55, h: 0.55,
      fill: { color: b.color },
      line: { color: b.color }
    });
    slide.addText(b.num, {
      x: 0.5, y: y + 0.35, w: 0.55, h: 0.55,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    // 문제
    slide.addText('병목: ' + b.problem, {
      x: 1.2, y: y + 0.12, w: 4.8, h: 0.35,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary
    });

    // 해결책
    slide.addText('해결 방향: ' + b.solution, {
      x: 1.2, y: y + 0.5, w: 4.8, h: 0.3,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary
    });

    // 상태 뱃지
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.2, y: y + 0.25, w: 1.8, h: 0.32,
      fill: { color: b.statusColor },
      line: { color: b.statusColor }
    });
    slide.addText(b.status, {
      x: 6.2, y: y + 0.25, w: 1.8, h: 0.32,
      fontSize: 9, fontFace: FONTS.caption.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    // 상세 설명
    slide.addText(b.detail, {
      x: 8.15, y: y + 0.12, w: 4.1, h: 1.1,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 21, TOTAL_SLIDES);
}

// Slide 22 — Section Divider: Part 3 EV 배터리
function slide22_section_ev() {
  const slide = pptx.addSlide();

  // 좌측 40% dark
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 5.12, h: 7.5,
    fill: { color: COLORS.bg_dark },
    line: { color: COLORS.bg_dark }
  });

  // 우측 60% white
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.12, y: 0, w: 7.28, h: 7.5,
    fill: { color: COLORS.bg_primary },
    line: { color: COLORS.bg_primary }
  });

  // 좌측 파트 레이블
  slide.addText('PART 3', {
    x: 0.3, y: 2.2, w: 4.7, h: 0.5,
    fontSize: 13, fontFace: FONTS.caption.fontFace, bold: false,
    color: COLORS.accent_yellow, align: 'left'
  });

  // 좌측 파트 번호 장식
  slide.addText('D', {
    x: 0.3, y: 2.7, w: 4.7, h: 2.5,
    fontSize: 120, fontFace: FONTS.deco.fontFace, bold: true,
    color: COLORS.bg_secondary, align: 'left',
    transparency: 70
  });

  // 우측 메인 타이틀
  slide.addText('구조 변화', {
    x: 5.3, y: 1.8, w: 6.9, h: 0.6,
    fontSize: 14, fontFace: FONTS.caption.fontFace, bold: false,
    color: COLORS.text_tertiary
  });
  slide.addText('EV 배터리 용접이\n가장 확실한\n성장 시장이다', {
    x: 5.3, y: 2.4, w: 6.9, h: 2.4,
    fontSize: 28, fontFace: FONTS.title.fontFace, bold: FONTS.title.bold,
    color: COLORS.text_primary, wrap: true
  });

  // 구분선
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.3, y: 4.95, w: 1.2, h: 0.06,
    fill: { color: COLORS.accent_yellow },
    line: { color: COLORS.accent_yellow }
  });

  slide.addText('시장 $3.2B(2025) → $9.8B(2034) · CAGR 13.2%\n이종금속 용접 + AI 인라인이 표준으로 부상 중', {
    x: 5.3, y: 5.1, w: 6.9, h: 0.9,
    fontSize: 10, fontFace: FONTS.body.fontFace, bold: false,
    color: COLORS.text_secondary, wrap: true
  });

  addPageNumber(slide, 22, TOTAL_SLIDES);
}

// Slide 23 — Stat Highlight: EV 배터리 레이저 용접 시장
function slide23_ev_stat() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'EV 배터리 레이저 용접: 가장 확실한 단기 성장 시장');

  addStatHighlight(slide, {
    number: '$3.2B',
    label: 'EV 배터리 레이저 용접 시장 (2025)',
    context: '2034년 $9.8B 전망 — CAGR 13.2% (9년 복합 성장)',
    trend: '▲ CAGR 13.2%'
  });

  // 보조 지표 3개
  const metrics = [
    { value: '13.2%', label: 'CAGR 2025~2034', sub: '레이저 용접 시장 연평균 성장률', color: COLORS.accent_blue },
    { value: '$9.8B', label: '2034년 시장 규모', sub: '현재의 3배 이상 — 10년 내 확실한 성장', color: COLORS.accent_cyan },
    { value: '45%', label: 'LFP 배터리 비중 (2027E)', sub: '현재 32% → 이종금속 용접 수요 확대 주요 동인', color: COLORS.accent_yellow }
  ];

  metrics.forEach((m, i) => {
    const x = 0.3 + i * 4.11;
    slide.addShape(pptx.ShapeType.rect, {
      x, y: 5.6, w: 3.95, h: 1.55,
      fill: { color: COLORS.bg_secondary },
      line: { color: m.color }
    });
    slide.addShape(pptx.ShapeType.rect, {
      x, y: 5.6, w: 3.95, h: 0.06,
      fill: { color: m.color },
      line: { color: m.color }
    });
    slide.addText(m.value, {
      x: x + 0.15, y: 5.72, w: 3.65, h: 0.55,
      fontSize: 24, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(m.label, {
      x: x + 0.15, y: 6.28, w: 3.65, h: 0.25,
      fontSize: 9, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(m.sub, {
      x: x + 0.15, y: 6.52, w: 3.65, h: 0.45,
      fontSize: 8, fontFace: FONTS.caption.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 23, TOTAL_SLIDES);
}

// Slide 24 — Content: EV 이종금속 용접 그린 레이저
function slide24_ev_green_laser() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'EV 이종금속 용접: 그린 레이저 + 파이버 하이브리드가 표준 부상');

  const items = [
    {
      num: '①',
      title: '구리-알루미늄 이종 용접 — 핵심 과제',
      body: 'EV 배터리 탭 및 버스바의 Cu-Al 이종금속 용접은 기존 IR 파이버 레이저로 처리 어려움. 열전도율 불일치, 금속간화합물(IMC) 생성이 용접 강도 저하 원인.',
      color: COLORS.accent_blue
    },
    {
      num: '②',
      title: '그린 레이저 — 흡수율 3~5배 우위',
      body: 'Cu의 532nm 그린 레이저 흡수율: ~50% vs IR(1064nm): ~5~10%. 흡수율 3~5배 차이로 열 집중 효율 및 용접 일관성 대폭 개선. TRUMPF 그린 레이저 2024-08 출시로 상업화 가속.',
      color: COLORS.accent_cyan
    },
    {
      num: '③',
      title: 'LFP 배터리 비중 32%→45% (2027E) — 이종금속 수요 확대',
      body: '리튬인산철(LFP) 배터리 채택 확대 = 알루미늄 케이스 + 구리 탭 조합 증가. 이종금속 용접 적용 비중 확대 — 그린+파이버 하이브리드 시스템 수요 직접 연동.',
      color: COLORS.accent_yellow
    },
    {
      num: '④',
      title: 'TRUMPF 그린 레이저 2024-08 출시 — 시장 개막 신호',
      body: 'TRUMPF TruDisk Green 시리즈 양산 출시. 주요 OEM 평가 착수. IPG, nLIGHT도 그린 레이저 개발 병행 — 경쟁 격화 전 조기 역량 확보가 유리.',
      color: COLORS.accent_red
    }
  ];

  items.forEach((item, i) => {
    const x = i % 2 === 0 ? 0.3 : 6.46;
    const y = i < 2 ? 1.15 : 4.3;

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 5.9, h: 2.9,
      fill: { color: COLORS.bg_secondary },
      line: { color: item.color }
    });
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 0.06, h: 2.9,
      fill: { color: item.color },
      line: { color: item.color }
    });

    // 번호 뱃지
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.15, y: y + 0.15, w: 0.4, h: 0.4,
      fill: { color: item.color },
      line: { color: item.color }
    });
    slide.addText(item.num, {
      x: x + 0.15, y: y + 0.15, w: 0.4, h: 0.4,
      fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    slide.addText(item.title, {
      x: x + 0.65, y: y + 0.15, w: 5.1, h: 0.5,
      fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, wrap: true
    });
    slide.addText(item.body, {
      x: x + 0.15, y: y + 0.75, w: 5.6, h: 2.0,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 24, TOTAL_SLIDES);
}

// Slide 25 — Process Flow: EV 배터리 팩 레이저 용접 공정 체인
function slide25_ev_process_flow() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'EV 배터리 팩 레이저 용접 공정 체인');

  addProcessFlow(slide, [
    {
      step: '① 셀 탭 용접',
      detail: '소재: 구리 탭\n레이저: 그린 레이저 (532nm)\n목표: 저저항 전기 접합\n품질: IMC 최소화'
    },
    {
      step: '② 모듈 연결',
      detail: '소재: Al-Cu 이종금속 버스바\n레이저: 파이버 하이브리드\n목표: 이종금속 강용접\n품질: 열영향부 제어'
    },
    {
      step: '③ 팩 조립',
      detail: '소재: 알루미늄 구조재\n레이저: 고출력 파이버\n목표: 구조 강도 확보\n품질: 기밀 유지'
    },
    {
      step: '④ 인라인 검사',
      detail: '센서: AI 비전 + OCT\n대상: 전수 용접부 검사\n목표: 불량 즉시 검출\n품질: 제로 디펙트 목표'
    }
  ]);

  // 보조 설명
  slide.addText('핵심 인사이트: 셀→모듈→팩 전 공정에 레이저 용접이 적용되며, 각 단계별 레이저 파장/출력 조합이 다르다. 단일 레이저 솔루션이 아닌 멀티-레이저 시스템 통합 역량이 경쟁력의 핵심.', {
    x: 0.3, y: 6.55, w: 12.13, h: 0.6,
    fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
    color: COLORS.text_tertiary, wrap: true
  });

  addPageNumber(slide, 25, TOTAL_SLIDES);
}

// Slide 26 — Cards: 가전 레이저 응용
function slide26_appliance_laser_cards() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '가전 레이저: 세탁기 드럼 22초, 텍스처링 150°, 무광 쿡탑');

  const cards = [
    {
      title: '세탁기 드럼 자동화',
      body: 'Coldwater 레이저 용접 라인\n기존 22초 → 목표 12초 (45% 단축)\n\n코봇 통합으로 유연 생산. 모델 변경 다운타임 90% 감소 목표.',
      accentColor: COLORS.accent_blue
    },
    {
      title: '레이저 텍스처링 — 접촉각 150°',
      body: '스테인리스 표면 레이저 마이크로텍스처링\n접촉각 150° 달성 = 초소수성(Superhydrophobic)\n\n세탁기/냉장고 위생 표면 차별화 소재 적용 확대.',
      accentColor: COLORS.accent_cyan
    },
    {
      title: 'SCHOTT 무광 세라믹 쿡탑',
      body: 'SCHOTT CERAN Suprema Matte\n2025-03 직렬 생산 돌입\n\n레이저 표면 처리로 무광 질감 구현. 프리미엄 빌트인 시장 타겟.',
      accentColor: COLORS.accent_yellow
    },
    {
      title: '코봇 + 레이저 통합',
      body: 'Universal Robots + 레이저 툴 헤드\nFABTECH 2025 다수 사례 발표\n\n중소 가전 제조사 유연 자동화 확산. 초기 투자 장벽 하락 중.',
      accentColor: COLORS.accent_purple
    }
  ];

  const positions = [
    { x: 0.3, y: 1.15 },
    { x: 6.46, y: 1.15 },
    { x: 0.3, y: 4.25 },
    { x: 6.46, y: 4.25 }
  ];

  cards.forEach((card, i) => {
    addCard(slide, {
      x: positions[i].x,
      y: positions[i].y,
      w: 5.9,
      h: 2.75,
      title: card.title,
      body: card.body,
      accentColor: card.accentColor
    });
  });

  addPageNumber(slide, 26, TOTAL_SLIDES);
}

// Slide 27 — Content: MicroLED TV Samsung CES 2026
function slide27_microled_tv() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'MicroLED TV: Samsung CES 2026 라인업 확장, 수리 공정이 핵심');

  // 상단 하이라이트 배너
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.1, w: 12.13, h: 0.55,
    fill: { color: COLORS.accent_blue },
    line: { color: COLORS.accent_blue }
  });
  slide.addText('Samsung CES 2026: 55~130인치 MicroLED TV 라인업 공개 — 수리(Repair) 공정이 수율의 핵심', {
    x: 0.3, y: 1.1, w: 12.13, h: 0.55,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_on_dark, align: 'center', valign: 'middle'
  });

  const sections = [
    {
      title: '130인치 Micro RGB — 플래그십',
      body: 'Samsung CES 2026 주력 전시. RGB MicroLED 직접 발광 — OLED 대비 밝기 우위. 레이저 전사(LIFT) 공정 의존도 높음. 원가 여전히 프리미엄 시장 한정.',
      color: COLORS.accent_blue,
      badge: '130" 플래그십'
    },
    {
      title: '83인치 투명 MicroLED — CES Innovation Award',
      body: 'CES 2026 Innovation Award 수상. 투명 디스플레이 = 공간 컴퓨팅 연계 가능성. 레이저 기반 마이크로칩 정렬 정밀도가 투명도 품질 직결.',
      color: COLORS.accent_cyan,
      badge: 'Innovation Award'
    },
    {
      title: '55~115인치 라인업 — 시장 확대 신호',
      body: '130인치 단일 제품에서 55인치까지 라인업 확대. 소비자 MicroLED 접근성 향상 의도. 수율 기반 원가 하락 없으면 볼륨 확대 한계 — 수리 공정이 병목.',
      color: COLORS.accent_yellow,
      badge: '55~115" 라인업'
    },
    {
      title: '수리(Repair) 공정 — 레이저 의존도 높음',
      body: '불량 MicroLED 선택적 제거 후 재전사 = Laser Lift-Off + 재증착. 수율 99.5%에서 99.99%로 올리는 과정에서 수리 공정 레이저 사용 비중 급증. 수리 공정 역량이 사실상 수율 역량.',
      color: COLORS.accent_red,
      badge: '수리 공정 핵심'
    }
  ];

  sections.forEach((sec, i) => {
    const x = i % 2 === 0 ? 0.3 : 6.46;
    const y = i < 2 ? 1.8 : 4.6;

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 5.9, h: 2.55,
      fill: { color: COLORS.bg_secondary },
      line: { color: sec.color }
    });
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 5.9, h: 0.06,
      fill: { color: sec.color },
      line: { color: sec.color }
    });

    // 뱃지
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.15, y: y + 0.12, w: 1.8, h: 0.3,
      fill: { color: sec.color },
      line: { color: sec.color }
    });
    slide.addText(sec.badge, {
      x: x + 0.15, y: y + 0.12, w: 1.8, h: 0.3,
      fontSize: 8, fontFace: FONTS.caption.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    slide.addText(sec.title, {
      x: x + 0.15, y: y + 0.5, w: 5.6, h: 0.38,
      fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, wrap: true
    });
    slide.addText(sec.body, {
      x: x + 0.15, y: y + 0.92, w: 5.6, h: 1.5,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 27, TOTAL_SLIDES);
}

// Slide 28 — Content: 인간형 로봇 레이저 근거 약함 경고
function slide28_humanoid_robot() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '인간형 로봇: 기대는 크나 레이저 가공 근거가 약하다');

  // 경고 배너
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.1, w: 12.13, h: 0.5,
    fill: { color: COLORS.accent_yellow },
    line: { color: COLORS.accent_yellow }
  });
  slide.addText('⚠ 확신도: [낮음] — 레이저 전환 원문 미확인 · Tesla Optimus 양산 지연 반복 · CNC 주도 현실', {
    x: 0.3, y: 1.1, w: 12.13, h: 0.5,
    fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.bg_dark, align: 'center', valign: 'middle'
  });

  const facts = [
    {
      category: '시장 전망',
      content: '인간형 로봇 시장 $11.5B (2030) 예측\n\n하모닉 드라이브: 로봇 1대당 14~28개 사용\n\n[발행일: 2024-06] — 현재 유효성 확인 권고',
      color: COLORS.accent_blue,
      confidence: '중간'
    },
    {
      category: '현실: CNC 주도',
      content: '하모닉 드라이브, 볼스크류, 정밀 기어 가공은 현재 CNC 머시닝 주도\n\n레이저 전환 사례 원문 미확인 — 업계 발표에서만 언급 수준',
      color: COLORS.accent_red,
      confidence: '낮음'
    },
    {
      category: 'Tesla Optimus 지연',
      content: 'Tesla Optimus 양산 목표 반복 연기\n(2023년 → 2024년 → 2025년 → 재조정)\n\n조기 레이저 설비 투자 근거 미성숙 — 지연 패턴 MicroLED와 유사',
      color: COLORS.accent_yellow,
      confidence: '낮음'
    },
    {
      category: '레이저 기회 조건',
      content: '정밀 부품 소형화 + 생산량 급증 시 레이저 용접/드릴링 수요 발생 가능\n\n단, 2027년 이후 양산 규모 확인 후 진입 시점 재평가 권고',
      color: COLORS.accent_purple,
      confidence: '낮음~중간'
    }
  ];

  facts.forEach((f, i) => {
    const x = i % 2 === 0 ? 0.3 : 6.46;
    const y = i < 2 ? 1.75 : 4.55;

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 5.9, h: 2.55,
      fill: { color: COLORS.bg_secondary },
      line: { color: f.color }
    });
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 0.06, h: 2.55,
      fill: { color: f.color },
      line: { color: f.color }
    });

    // 확신도 뱃지
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 3.8, y: y + 0.12, w: 1.9, h: 0.3,
      fill: { color: f.color },
      line: { color: f.color }
    });
    slide.addText('확신도: ' + f.confidence, {
      x: x + 3.8, y: y + 0.12, w: 1.9, h: 0.3,
      fontSize: 8, fontFace: FONTS.caption.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    slide.addText(f.category, {
      x: x + 0.2, y: y + 0.12, w: 3.4, h: 0.36,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(f.content, {
      x: x + 0.2, y: y + 0.55, w: 5.5, h: 1.85,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 28, TOTAL_SLIDES);
}

// Slide 29 — Table: Part D 시장 기회 요약
function slide29_partd_summary_table() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'Part D 시장 기회 요약 — 확실성 × 규모');

  const headers = ['시장 영역', '현재 규모', '미래 전망', '확실성'];
  const dataRows = [
    ['EV 배터리 레이저 용접', '$3.2B (2025)', '$9.8B (2034) · CAGR 13.2%', '높음'],
    ['MicroLED TV 레이저 공정', '파일럿 / 소량 생산', '잠재 $4.5B (2035) — 불확실성 높음', '낮음~중간'],
    ['가전 레이저 용접/텍스처링', '기존 시장 (성숙)', '코봇+레이저 확산으로 점진적 성장', '높음'],
    ['인간형 로봇 레이저 가공', '초기 / 미확인', '잠재 대형이나 CNC 주도 현실', '낮음']
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.3,
    y: 1.15,
    w: 12.13,
    colW: [3.5, 2.5, 4.13, 2.0]
  });

  // 전략 가이드 박스
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 5.45, w: 12.13, h: 1.7,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent_blue }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 5.45, w: 0.06, h: 1.7,
    fill: { color: COLORS.accent_blue },
    line: { color: COLORS.accent_blue }
  });

  slide.addText('역방향 의사결정 가이드', {
    x: 0.5, y: 5.52, w: 11.8, h: 0.32,
    fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_blue
  });

  const guide = [
    '• 지금 베팅: EV 배터리 용접 — 확실성 높음, 기술 연계성 명확, IATF 인증 선착 유리',
    '• 제한적 실험: 가전 텍스처링/코봇 — 기존 역량 활용 가능, 리스크 낮음',
    '• 관망: MicroLED TV — 2027년 수율 트리거 확인 후 진입 검토',
    '• 회피: 인간형 로봇 (현재) — 레이저 전환 근거 미확인, CNC 주도 현실 유지'
  ];

  guide.forEach((g, i) => {
    slide.addText(g, {
      x: 0.5, y: 5.88 + i * 0.25, w: 11.8, h: 0.25,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary
    });
  });

  addPageNumber(slide, 29, TOTAL_SLIDES);
}

// === Part 2 끝 ===
