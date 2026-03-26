// === Part 3 시작 ===

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

// === Part 3 끝 ===
