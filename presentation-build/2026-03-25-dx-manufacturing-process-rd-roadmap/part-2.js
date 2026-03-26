// === Part 2 시작 ===

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

// === Part 2 끝 ===
