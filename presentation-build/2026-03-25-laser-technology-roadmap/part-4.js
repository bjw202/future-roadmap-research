// === Part 4 시작 ===

// ─────────────────────────────────────────────────────────────
// 슬라이드 42: [Section] Part 6: 전략 옵션과 실행 로드맵
// ─────────────────────────────────────────────────────────────
function slide42_section_strategy() {
  const slide = pptx.addSlide();

  // 좌 다크 패널 (40%)
  slide.addShape('rect', {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 우 흰 배경 (60%)
  slide.addShape('rect', {
    x: 5.33, y: 0, w: 8.0, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  // 섹션 번호
  slide.addText('06', {
    x: 0.8, y: 2.4, w: 3.73, h: 1.5,
    fontSize: 72,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.accent_cyan,
    align: 'center',
    valign: 'middle'
  });

  // SECTION 레이블
  slide.addText('SECTION', {
    x: 0.8, y: 4.0, w: 3.73, h: 0.4,
    fontSize: 11,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_on_dark,
    transparency: 40,
    align: 'center',
    charSpacing: 3
  });

  // 우측 제목
  slide.addText('전략 옵션과 실행 로드맵', {
    x: 6.0, y: 2.4, w: 6.73, h: 0.9,
    fontSize: 36,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'middle'
  });

  // 우측 설명
  slide.addText('8가지 전략 옵션의 우선순위와 0~36개월 실행 계획', {
    x: 6.0, y: 3.45, w: 6.73, h: 0.7,
    fontSize: 16,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'top',
    lineSpacingMultiple: 1.4
  });

  // 우측 하단 — 키워드 3개
  const keywords = ['지금 베팅', '제한적 실험', '관망 / 회피'];
  const kwColors = [COLORS.accent_blue, COLORS.accent_cyan, COLORS.accent_yellow];
  keywords.forEach(function(kw, i) {
    slide.addShape('rect', {
      x: 6.0, y: 4.5 + i * 0.55, w: 0.2, h: 0.2,
      fill: { color: kwColors[i] }
    });
    slide.addText(kw, {
      x: 6.35, y: 4.43 + i * 0.55, w: 5.0, h: 0.3,
      fontSize: 14,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'middle'
    });
  });
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 43: [Table] 8가지 전략 옵션
// 8행 × 5열: 옵션 / 기대효과 / 비용·난이도 / 리스크 / 권고
// ─────────────────────────────────────────────────────────────
function slide43_strategy_options_table() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '8가지 전략 옵션 — 기대 효과, 비용, 리스크, 권고 수준', null);

  const headers = ['전략 옵션', '기대 효과', '비용·난이도', '리스크', '권고'];

  const dataRows = [
    [
      'EV 배터리 이종금속 용접',
      '$3.2B 시장, CAGR 13%',
      '중\n(그린레이저+IATF)',
      '인증 12~24개월',
      { text: '★★★★★ 지금 베팅', options: { color: COLORS.accent_blue, bold: true } }
    ],
    [
      '폴더블 크리즈프리 드릴링',
      '15M+ 패널/년',
      '중',
      '폴더블 수요 불확실',
      { text: '★★★★ 지금 베팅', options: { color: COLORS.accent_blue, bold: true } }
    ],
    [
      'GLLO R&D 파트너십',
      'LLO 차세대 업그레이드',
      '저',
      '스케일업 실패',
      { text: '★★★★ 제한적 실험', options: { color: COLORS.accent_cyan, bold: true } }
    ],
    [
      'USP 유리-금속 접합 PoC',
      '이종접합 차별화',
      '저~중',
      '강도 재현성',
      { text: '★★★ 제한적 실험', options: { color: COLORS.accent_cyan, bold: true } }
    ],
    [
      'AI 인라인 모니터링 평가',
      '전공정 수율 향상',
      '중',
      '파일럿→양산 갭',
      { text: '★★★ 제한적 실험', options: { color: COLORS.accent_cyan, bold: true } }
    ],
    [
      'MicroLED LIFT 장비',
      '장기 고성장',
      '고',
      '타임라인 지연 높음',
      { text: '★★ 관망', options: { color: COLORS.accent_yellow, bold: true } }
    ],
    [
      '레이저 클리닝/에칭 환경',
      'EU REACH 수혜',
      '중',
      '전환비용 저항',
      { text: '★★ 관망', options: { color: COLORS.accent_yellow, bold: true } }
    ],
    [
      '로봇 하모닉 드라이브',
      '잠재 고성장',
      '중~고',
      '양산지연+CNC 미입증',
      { text: '★ 회피', options: { color: COLORS.accent_red, bold: true } }
    ]
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.8, w: 12.13, h: 5.2,
    colW: [2.7, 2.5, 1.8, 2.3, 2.83]
  });

  addPageNumber(slide, 43, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 44: [Pyramid] 전략 옵션 우선순위 피라미드
// 4계층: 지금 베팅 → 제한적 실험 → 관망 → 회피
// ─────────────────────────────────────────────────────────────
function slide44_priority_pyramid() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '전략 옵션 우선순위 피라미드', null);

  // 피라미드 4계층 데이터 (상→하)
  const tiers = [
    {
      label: '지금 베팅',
      sub: 'EV 배터리 이종금속 용접 + 폴더블 크리즈프리 드릴링',
      color: COLORS.accent_blue,
      // 가장 좁은 상단
      xOffset: 4.0,
      w: 4.13,
      y: 1.85,
      h: 0.9
    },
    {
      label: '제한적 실험',
      sub: 'GLLO R&D 파트너십 + USP 유리-금속 접합 PoC + AI 인라인 모니터링',
      color: COLORS.accent_cyan,
      xOffset: 2.8,
      w: 6.53,
      y: 2.85,
      h: 0.95
    },
    {
      label: '관망',
      sub: 'MicroLED LIFT 장비 + 레이저 클리닝/에칭 환경',
      color: COLORS.accent_yellow,
      xOffset: 1.5,
      w: 9.13,
      y: 3.9,
      h: 0.95
    },
    {
      label: '회피',
      sub: '로봇 하모닉 드라이브 — 근거 부족, 2028 재평가',
      color: COLORS.accent_red,
      xOffset: 0.6,
      w: 12.13,
      y: 4.95,
      h: 0.95
    }
  ];

  tiers.forEach(function(tier) {
    // 계층 배경 박스
    slide.addShape('rect', {
      x: tier.xOffset, y: tier.y, w: tier.w, h: tier.h,
      fill: { color: tier.color },
      line: { type: 'none' }
    });

    // 계층 레이블 (bold, 흰색)
    slide.addText(tier.label, {
      x: tier.xOffset + 0.15, y: tier.y + 0.05, w: 2.0, h: 0.4,
      fontSize: 16,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'left',
      valign: 'middle'
    });

    // 계층 설명
    slide.addText(tier.sub, {
      x: tier.xOffset + 2.3, y: tier.y + 0.05, w: tier.w - 2.5, h: 0.8,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_on_dark,
      align: 'left',
      valign: 'middle',
      lineSpacingMultiple: 1.3
    });

    // 계층 구분 흰 선
    slide.addShape('rect', {
      x: tier.xOffset, y: tier.y + tier.h - 0.02, w: tier.w, h: 0.02,
      fill: { color: COLORS.bg_primary }
    });
  });

  // 좌측 범례 제목
  slide.addText('우선순위', {
    x: 0.15, y: 2.2, w: 0.4, h: 3.3,
    fontSize: 10,
    fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary,
    rotate: 270,
    align: 'center',
    valign: 'middle'
  });

  // 위쪽 화살표 힌트 (텍스트)
  slide.addText('▲ 높음', {
    x: 0.1, y: 1.8, w: 0.5, h: 0.25,
    fontSize: 9,
    fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary,
    align: 'center'
  });
  slide.addText('▼ 낮음', {
    x: 0.1, y: 5.7, w: 0.5, h: 0.25,
    fontSize: 9,
    fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary,
    align: 'center'
  });

  addPageNumber(slide, 44, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 45: [KPI] 지금 베팅 2개의 핵심 KPI
// 4개 KPI: $3.2B / CAGR 13.2% / 15M+ / 12~24개월
// ─────────────────────────────────────────────────────────────
function slide45_bet_kpi() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '지금 베팅 2개의 핵심 KPI', null);

  const kpis = [
    {
      value: '$3.2B',
      label: 'EV 배터리 레이저 용접 시장 (2025)',
      sub: '→ $9.8B(2034) — 가장 확실한 단기 성장 기회',
      color: COLORS.accent_blue
    },
    {
      value: '13.2%',
      label: 'EV 용접 시장 CAGR',
      sub: '10년간 3배 성장 — 그린레이저+파이버 하이브리드 수요 주도',
      color: COLORS.accent_cyan
    },
    {
      value: '15M+',
      label: '폴더블 패널 수요 (패널/년)',
      sub: 'Apple iPhone Fold(2026) + Samsung Z Fold 8 — 크리즈프리 드릴링 수요 확정',
      color: COLORS.accent_yellow
    },
    {
      value: '12~24개월',
      label: 'IATF 16949 인증 소요 기간',
      sub: 'EV 배터리 공급망 진입의 핵심 선행 조건 — 지금 착수해야 하는 이유',
      color: COLORS.accent_purple
    }
  ];

  const positions = CARD_2X2.positions;
  const cardW = CARD_2X2.w;
  const cardH = CARD_2X2.h;

  kpis.forEach(function(kpi, i) {
    const x = positions[i].x;
    const y = positions[i].y;

    // 카드 배경
    slide.addShape('roundRect', {
      x: x, y: y, w: cardW, h: cardH,
      fill: { color: COLORS.bg_secondary },
      line: { color: kpi.color, width: 1 },
      rectRadius: 0.08
    });

    // 상단 accent bar
    slide.addShape('rect', {
      x: x, y: y, w: cardW, h: 0.07,
      fill: { color: kpi.color }
    });

    // KPI 수치
    slide.addText(kpi.value, {
      x: x + 0.2, y: y + 0.15, w: cardW - 0.4, h: 0.85,
      fontSize: 40,
      fontFace: FONTS.kpi.fontFace,
      bold: true,
      color: kpi.color,
      align: 'left',
      valign: 'middle'
    });

    // 레이블
    slide.addText(kpi.label, {
      x: x + 0.2, y: y + 1.05, w: cardW - 0.4, h: 0.4,
      fontSize: 13,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'top'
    });

    // 설명
    slide.addText(kpi.sub, {
      x: x + 0.2, y: y + 1.48, w: cardW - 0.4, h: 0.8,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      lineSpacingMultiple: 1.3
    });
  });

  addPageNumber(slide, 45, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 46: [Roadmap] 기술 로드맵: 지금(0~3개월)
// 3마일스톤: EV PoC / 폴더블 역량 평가 / GLLO 파트너십
// ─────────────────────────────────────────────────────────────
function slide46_roadmap_now() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '기술 로드맵: 지금(0~3개월) — 즉시 착수 액션 3가지', null);

  // 단계 레이블 배경 바
  slide.addShape('rect', {
    x: 0.6, y: 1.75, w: 12.13, h: 0.42,
    fill: { color: COLORS.accent_blue }
  });
  slide.addText('0 ~ 3개월 (지금)', {
    x: 0.7, y: 1.75, w: 4.0, h: 0.42,
    fontSize: 14,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_on_dark,
    align: 'left',
    valign: 'middle'
  });

  // 수평 타임라인 축
  slide.addShape('rect', {
    x: 1.3, y: 2.6, w: 11.43, h: 0.05,
    fill: { color: COLORS.accent_blue }
  });

  const milestones = [
    {
      x: 1.6,
      title: '① EV 배터리 PoC 제안',
      body: '고객: LG에너지솔루션 / 삼성SDI\n그린레이저(532nm) + 파이버 하이브리드\n구리-알루미늄 이종용접 시연용 샘플 제작\n→ IATF 16949 인증 착수 결정',
      color: COLORS.accent_blue
    },
    {
      x: 5.2,
      title: '② 폴더블 드릴링 역량 평가',
      body: '대상: 크리즈프리 금속 플레이트 레이저 드릴링\n경쟁사 분석: Fine M-Tec 공급망 구조 파악\n내부 USP 장비 적용 가능성 평가\n→ 개발 착수 또는 파트너십 결정',
      color: COLORS.accent_cyan
    },
    {
      x: 8.8,
      title: '③ GLLO R&D 파트너십 탐색',
      body: '대상: 그래핀 파운드리 협력 가능 파트너\n탄화 잔류물 92.8% 감소 기술 확인\n캐리어 기판 재사용 경제성 분석\n→ 공동 개발 계약 논의 착수',
      color: COLORS.accent_yellow
    }
  ];

  milestones.forEach(function(m) {
    // 연결 점
    slide.addShape('ellipse', {
      x: m.x + 0.9, y: 2.48, w: 0.25, h: 0.25,
      fill: { color: m.color },
      line: { color: COLORS.bg_primary, width: 2 }
    });

    // 수직 연결선
    slide.addShape('rect', {
      x: m.x + 1.015, y: 2.73, w: 0.02, h: 0.35,
      fill: { color: m.color }
    });

    // 마일스톤 카드
    slide.addShape('roundRect', {
      x: m.x, y: 3.08, w: 3.5, h: 3.5,
      fill: { color: COLORS.bg_primary },
      line: { color: m.color, width: 1.5 },
      rectRadius: 0.08
    });

    // 카드 상단 accent bar
    slide.addShape('rect', {
      x: m.x, y: 3.08, w: 3.5, h: 0.07,
      fill: { color: m.color }
    });

    // 마일스톤 제목
    slide.addText(m.title, {
      x: m.x + 0.15, y: 3.2, w: 3.2, h: 0.45,
      fontSize: 14,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle'
    });

    // 마일스톤 내용
    slide.addText(m.body, {
      x: m.x + 0.15, y: 3.72, w: 3.2, h: 2.7,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      lineSpacingMultiple: 1.45
    });
  });

  addPageNumber(slide, 46, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 47: [Roadmap] 기술 로드맵: 근시계(3~12개월)
// 5마일스톤: IATF 인증 / USP PoC / AI 평가 / Omniply 모니터링 / MicroLED 사전 조사
// ─────────────────────────────────────────────────────────────
function slide47_roadmap_near() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '기술 로드맵: 근시계(3~12개월) — 역량 확보와 검증', null);

  // 단계 레이블 배경 바
  slide.addShape('rect', {
    x: 0.6, y: 1.75, w: 12.13, h: 0.42,
    fill: { color: COLORS.accent_cyan }
  });
  slide.addText('3 ~ 12개월 (근시계)', {
    x: 0.7, y: 1.75, w: 5.0, h: 0.42,
    fontSize: 14,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_on_dark,
    align: 'left',
    valign: 'middle'
  });

  const items = [
    {
      num: '①',
      title: 'IATF 16949 인증 착수',
      body: 'EV 배터리 공급망 진입 필수\n인증기관 선정 + 심사 일정 수립',
      color: COLORS.accent_blue
    },
    {
      num: '②',
      title: 'USP PoC (50MPa+)',
      body: '유리-금속 이종접합 강도 검증\n목표: 57MPa 수준 재현성 확보',
      color: COLORS.accent_cyan
    },
    {
      num: '③',
      title: 'AI 모니터링 기술 평가',
      body: 'ICALEO / Photonics West 전시 조사\n인라인 모니터링 솔루션 벤치마크',
      color: COLORS.accent_yellow
    },
    {
      num: '④',
      title: 'Omniply 결과 모니터링',
      body: '팹 평가 결과 추적\nLLO 전략 재조정 트리거 판단',
      color: COLORS.accent_purple
    },
    {
      num: '⑤',
      title: 'MicroLED LIFT 사전 조사',
      body: '수율 트리거(100ppm) 모니터링\n투자 전환 조건 사전 정의',
      color: COLORS.accent_red
    }
  ];

  const startY = 2.35;
  const itemH = 0.92;

  items.forEach(function(item, i) {
    const yPos = startY + i * itemH;

    // 번호 배지
    slide.addShape('ellipse', {
      x: 0.6, y: yPos + 0.22, w: 0.38, h: 0.38,
      fill: { color: item.color }
    });
    slide.addText(item.num, {
      x: 0.6, y: yPos + 0.22, w: 0.38, h: 0.38,
      fontSize: 13,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle'
    });

    // 제목
    slide.addText(item.title, {
      x: 1.15, y: yPos + 0.15, w: 3.8, h: 0.38,
      fontSize: 14,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle'
    });

    // 내용
    slide.addText(item.body, {
      x: 1.15, y: yPos + 0.52, w: 3.8, h: 0.35,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      lineSpacingMultiple: 1.3
    });

    // 수평 구분선 (마지막 제외)
    if (i < items.length - 1) {
      slide.addShape('rect', {
        x: 0.6, y: yPos + itemH - 0.02, w: 4.7, h: 0.02,
        fill: { color: 'E2E8F0' }
      });
    }
  });

  // 우측: 근시계 중점 사항 요약 박스
  slide.addShape('roundRect', {
    x: 6.5, y: 2.35, w: 6.23, h: 4.6,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent_cyan, width: 1.5 },
    rectRadius: 0.1
  });

  // 박스 제목
  slide.addText('근시계 핵심 판단 기준', {
    x: 6.7, y: 2.5, w: 5.83, h: 0.45,
    fontSize: 16,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_primary,
    align: 'left'
  });

  const judgments = [
    { label: 'IATF 착수', desc: '지금 시작 안 하면 EV 납품 타이밍 놓침' },
    { label: 'USP 50MPa+', desc: '미달 시 접착제 대비 우위 없음 — 중단 판단' },
    { label: 'AI 평가', desc: '파일럿→양산 갭 검증 후 투자 수준 결정' },
    { label: 'Omniply 결과', desc: '공개 시 LLO 전략 전반 재검토 필요' },
    { label: 'MicroLED 100ppm', desc: '수율 미달 시 LIFT 투자 보류 유지' }
  ];

  judgments.forEach(function(j, i) {
    const yPos = 3.1 + i * 0.65;

    slide.addShape('rect', {
      x: 6.7, y: yPos + 0.1, w: 0.12, h: 0.28,
      fill: { color: COLORS.accent_cyan }
    });

    slide.addText(j.label, {
      x: 6.95, y: yPos + 0.05, w: 2.0, h: 0.3,
      fontSize: 13,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle'
    });

    slide.addText(j.desc, {
      x: 6.95, y: yPos + 0.35, w: 5.5, h: 0.28,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top'
    });
  });

  addPageNumber(slide, 47, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 48: [Roadmap] 기술 로드맵: 중기(12~36개월)
// 5마일스톤: EV 양산 / GLLO 스케일업 / AI 폐루프 / MicroLED LIFT / USP 이종접합
// ─────────────────────────────────────────────────────────────
function slide48_roadmap_mid() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '기술 로드맵: 중기(12~36개월) — 양산 공급과 플랫폼 구축', null);

  // 단계 레이블 배경 바
  slide.addShape('rect', {
    x: 0.6, y: 1.75, w: 12.13, h: 0.42,
    fill: { color: COLORS.accent_purple }
  });
  slide.addText('12 ~ 36개월 (중기)', {
    x: 0.7, y: 1.75, w: 5.0, h: 0.42,
    fontSize: 14,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_on_dark,
    align: 'left',
    valign: 'middle'
  });

  // 수평 타임라인 축
  slide.addShape('rect', {
    x: 0.8, y: 2.62, w: 12.1, h: 0.05,
    fill: { color: COLORS.accent_purple }
  });

  const milestones = [
    {
      x: 0.6,
      title: 'EV 용접\n양산 개시',
      body: '그린+파이버 하이브리드\nIATF 인증 완료 후\nLG ES/삼성SDI 납품',
      color: COLORS.accent_blue,
      dotX: 1.05
    },
    {
      x: 3.0,
      title: 'GLLO\n스케일업',
      body: '6G+ 패널 라인 적용\n탄화 잔류물 완전 해결\n캐리어 재사용 경제성',
      color: COLORS.accent_cyan,
      dotX: 3.45
    },
    {
      x: 5.4,
      title: 'AI 폐루프\n플랫폼',
      body: '인라인 모니터링 양산\n파라미터 자동 보정\n예지 보전 통합',
      color: COLORS.accent_yellow,
      dotX: 5.85
    },
    {
      x: 7.8,
      title: 'MicroLED LIFT\n개발 착수',
      body: '트리거 확인 시 착수\n수율 100ppm 달성 조건\n장비 투자 의사결정',
      color: COLORS.accent_red,
      dotX: 8.25
    },
    {
      x: 10.2,
      title: 'USP 이종접합\n고객 적용',
      body: 'PoC 성공 후 고객사 적용\n57MPa 이상 재현성 확보\n이종접합 포트폴리오',
      color: COLORS.accent_purple,
      dotX: 10.65
    }
  ];

  milestones.forEach(function(m) {
    // 연결 점
    slide.addShape('ellipse', {
      x: m.dotX - 0.12, y: 2.5, w: 0.24, h: 0.24,
      fill: { color: m.color },
      line: { color: COLORS.bg_primary, width: 2 }
    });

    // 수직 연결선
    slide.addShape('rect', {
      x: m.dotX - 0.01, y: 2.74, w: 0.02, h: 0.32,
      fill: { color: m.color }
    });

    // 마일스톤 카드
    slide.addShape('roundRect', {
      x: m.x, y: 3.06, w: 2.3, h: 3.7,
      fill: { color: COLORS.bg_primary },
      line: { color: m.color, width: 1.5 },
      rectRadius: 0.08
    });

    // 카드 상단 accent bar
    slide.addShape('rect', {
      x: m.x, y: 3.06, w: 2.3, h: 0.06,
      fill: { color: m.color }
    });

    // 마일스톤 제목
    slide.addText(m.title, {
      x: m.x + 0.12, y: 3.15, w: 2.06, h: 0.7,
      fontSize: 13,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'top',
      lineSpacingMultiple: 1.3
    });

    // 마일스톤 내용
    slide.addText(m.body, {
      x: m.x + 0.12, y: 3.9, w: 2.06, h: 2.7,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      lineSpacingMultiple: 1.45
    });
  });

  addPageNumber(slide, 48, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 49: [Table] 역방향 의사결정 가이드
// 5행 × 2열: 영역 / 투자하지 않아야 하는 조건
// ─────────────────────────────────────────────────────────────
function slide49_reverse_decision() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '역방향 의사결정 가이드 — 투자하지 않아야 하는 조건', null);

  // 안내 문구
  slide.addText('아래 조건이 충족되면 해당 영역 투자를 즉시 중단하라', {
    x: 0.6, y: 1.65, w: 12.13, h: 0.3,
    fontSize: 12,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'left',
    valign: 'middle'
  });

  const headers = ['투자 영역', '투자하지 않아야 하는 조건 (중단 트리거)'];

  const dataRows = [
    [
      { text: 'MicroLED LIFT 장비', options: { bold: true, color: COLORS.accent_red } },
      '2027년 말 Apple Watch에 MicroLED 미탑재 + 수율 99.99% 미달 지속 → 장비 투자 전면 보류, 2029 재평가'
    ],
    [
      { text: 'EV 배터리 이종금속 용접', options: { bold: true, color: COLORS.text_primary } },
      'LFP 배터리 비중 40% 이하 유지 + 접착 본딩(Structural Adhesive)이 용접 대체 가능성 입증 → PoC 규모 축소, IATF 착수 연기'
    ],
    [
      { text: '폴더블 크리즈프리 드릴링', options: { bold: true, color: COLORS.text_primary } },
      'Apple iPhone Fold 2026 출시 취소 또는 Samsung Z Fold 8 판매 목표 50% 미달 → 레이저 드릴링 장비 투자 보류'
    ],
    [
      { text: 'AI 인라인 모니터링', options: { bold: true, color: COLORS.text_primary } },
      '파일럿 공정에서 불량률 감소가 30% 미만이거나 파일럿→양산 전환 시 성능 재현 실패 → 추가 투자 전면 재검토'
    ],
    [
      { text: 'USP 유리-금속 접합', options: { bold: true, color: COLORS.text_primary } },
      '접착제 솔루션이 50MPa+ 강도 달성 + 비용 우위 입증 → 레이저 접합 PoC 중단, 고부가 응용(마이크로 가공)으로 전환'
    ]
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 2.05, w: 12.13, h: 5.0,
    colW: [2.8, 9.33]
  });

  addPageNumber(slide, 49, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 50: [Content] 근거 신뢰도 매트릭스
// 7개 판단 × 신뢰도(★1~5)
// ─────────────────────────────────────────────────────────────
function slide50_evidence_matrix() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '근거 신뢰도 매트릭스 — 판단별 근거 강도 평가', null);

  const items = [
    {
      judgment: 'LLO는 폴더블 OLED 양산 공정의 필수 공정이다',
      sources: 5, verified: true, confidence: 5,
      note: '복수 원문 확인, 양산 기준'
    },
    {
      judgment: 'EV 배터리 레이저 용접 시장 $3.2B (2025)',
      sources: 4, verified: true, confidence: 4,
      note: 'Allied/MarketsandMarkets 복수 출처. Repair Pass 수정값'
    },
    {
      judgment: 'Apple 폴더블 iPhone 2026 출시 + 15M+ 패널/년',
      sources: 4, verified: true, confidence: 4,
      note: 'Apple 공급망 추적 + Samsung Display 확인'
    },
    {
      judgment: 'USP 유리-금속 접합 강도 57.7MPa',
      sources: 3, verified: false, confidence: 3,
      note: '단일 연구 논문. 재현성 미확인. 출처 단일'
    },
    {
      judgment: 'MicroLED 상용화 2027~2028 (기준 시나리오)',
      sources: 3, verified: false, confidence: 2,
      note: '역사적 지연 패턴 반영 필요. Critic 하향 교정'
    },
    {
      judgment: '인간형 로봇 하모닉 드라이브 레이저 가공 전환 가능',
      sources: 1, verified: false, confidence: 1,
      note: '근거 극히 부족. CNC 주도 현실과 상충'
    },
    {
      judgment: 'AI 공정 모니터링 98% 불량 감지 정확도',
      sources: 2, verified: false, confidence: 2,
      note: '개별 파일럿 기반. 양산 환경 재현 미확인'
    }
  ];

  const tableY = 1.88;
  const rowH = 0.72;

  // 헤더 행
  slide.addShape('rect', {
    x: 0.6, y: tableY, w: 12.13, h: 0.42,
    fill: { color: COLORS.bg_dark }
  });
  const headers = ['핵심 판단', '출처 수', '원문 확인', '신뢰도', '비고'];
  const colXs = [0.6, 7.5, 8.5, 9.6, 10.6];
  const colWs = [6.9, 1.0, 1.1, 1.0, 2.13];
  headers.forEach(function(h, i) {
    slide.addText(h, {
      x: colXs[i] + 0.1, y: tableY + 0.02, w: colWs[i] - 0.1, h: 0.38,
      fontSize: 11,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: i === 0 ? 'left' : 'center',
      valign: 'middle'
    });
  });

  // 데이터 행
  items.forEach(function(item, i) {
    const rowY = tableY + 0.42 + i * rowH;
    const isAlt = i % 2 === 1;
    const rowBg = isAlt ? COLORS.bg_secondary : COLORS.bg_primary;

    slide.addShape('rect', {
      x: 0.6, y: rowY, w: 12.13, h: rowH,
      fill: { color: rowBg },
      line: { color: 'E2E8F0', width: 0.5 }
    });

    // 판단 텍스트
    slide.addText(item.judgment, {
      x: 0.7, y: rowY + 0.05, w: 6.7, h: rowH - 0.1,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle',
      lineSpacingMultiple: 1.3
    });

    // 출처 수
    slide.addText(String(item.sources) + '개', {
      x: 7.5 + 0.1, y: rowY + 0.1, w: 0.8, h: rowH - 0.2,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'center',
      valign: 'middle'
    });

    // 원문 확인 여부
    slide.addText(item.verified ? '✓' : '—', {
      x: 8.5 + 0.1, y: rowY + 0.1, w: 0.9, h: rowH - 0.2,
      fontSize: 14,
      fontFace: FONTS.body.fontFace,
      color: item.verified ? COLORS.accent_cyan : COLORS.text_tertiary,
      bold: item.verified,
      align: 'center',
      valign: 'middle'
    });

    // 신뢰도 별점
    var stars = '';
    for (var s = 0; s < 5; s++) {
      stars += s < item.confidence ? '★' : '☆';
    }
    const starColor = item.confidence >= 4 ? COLORS.accent_blue
      : item.confidence === 3 ? COLORS.accent_yellow
      : COLORS.accent_red;
    slide.addText(stars, {
      x: 9.6 + 0.05, y: rowY + 0.1, w: 0.9, h: rowH - 0.2,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: starColor,
      align: 'center',
      valign: 'middle'
    });

    // 비고
    slide.addText(item.note, {
      x: 10.6 + 0.1, y: rowY + 0.05, w: 2.03, h: rowH - 0.1,
      fontSize: 9,
      fontFace: FONTS.caption.fontFace,
      color: COLORS.text_tertiary,
      align: 'left',
      valign: 'middle',
      lineSpacingMultiple: 1.3
    });
  });

  addPageNumber(slide, 50, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 51: [Section] Part 7: 무엇을 추적하고, 지금 무엇을 결정할 것인가
// ─────────────────────────────────────────────────────────────
function slide51_section_monitoring() {
  const slide = pptx.addSlide();

  // 좌 다크 패널 (40%)
  slide.addShape('rect', {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 우 흰 배경 (60%)
  slide.addShape('rect', {
    x: 5.33, y: 0, w: 8.0, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  // 섹션 번호
  slide.addText('07', {
    x: 0.8, y: 2.4, w: 3.73, h: 1.5,
    fontSize: 72,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.accent_yellow,
    align: 'center',
    valign: 'middle'
  });

  // SECTION 레이블
  slide.addText('SECTION', {
    x: 0.8, y: 4.0, w: 3.73, h: 0.4,
    fontSize: 11,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_on_dark,
    transparency: 40,
    align: 'center',
    charSpacing: 3
  });

  // 우측 제목
  slide.addText('무엇을 추적하고, 지금 무엇을 결정할 것인가', {
    x: 6.0, y: 2.3, w: 6.73, h: 1.1,
    fontSize: 32,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'middle',
    lineSpacingMultiple: 1.2
  });

  // 우측 설명
  slide.addText('7가지 전환 트리거 · 기술 신호 레지스터 · 최종 권고', {
    x: 6.0, y: 3.55, w: 6.73, h: 0.6,
    fontSize: 16,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'top',
    lineSpacingMultiple: 1.4
  });
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 52: [Table] 7가지 전환 트리거
// 7행 × 3열: 트리거 / 모니터링 항목 / 전략 조정 내용
// ─────────────────────────────────────────────────────────────
function slide52_triggers() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '7가지 전환 트리거 — 이 사건이 발생하면 전략을 조정하라', null);

  const headers = ['트리거 사건', '모니터링 항목', '전략 조정 내용'];

  const dataRows = [
    [
      'Apple iPhone Fold 판매 >10M/년',
      'Apple 출하량 분기 보고, 공급망 추적',
      'LLO/폴더블 드릴링 라인 증설 검토 즉시 착수'
    ],
    [
      'MicroLED 수율 <100ppm 달성',
      'Samsung/Apple MicroLED 파일럿 결과 공개',
      'LIFT 장비 투자 전환 실행, R&D 인력 배정'
    ],
    [
      'Omniply 팹 평가 결과 공개',
      ' 학술지/특허/공급망 발표 모니터링',
      'LLO 전략 재조정 — Omniply 대체 시나리오 대응'
    ],
    [
      '중국 USP 레이저 양산 진입',
      'Raycus/JPT USP 제품 스펙 발표',
      '고정밀 응용 소싱 이원화 + 자체 기술 차별화 가속'
    ],
    [
      'EU REACH 규제 발효 (화학 에칭 제한)',
      'EU 공식 발표, 반도체/디스플레이 업계 대응 동향',
      '레이저 클리닝/에칭 로드맵 수립 — 관망→제한적 실험 전환'
    ],
    [
      '그린 레이저 원가 파이버 대비 <1.3배',
      'IPG/TRUMPF/nLIGHT 그린 레이저 가격 추이',
      'EV 이종금속 용접 그린 레이저 표준 전환 가속'
    ],
    [
      'AI 양산 공정 불량률 50% 감소 사례 공개',
      'ICALEO, Photonics West 발표, 고객사 공개 사례',
      'AI 인라인 모니터링 파일럿 즉시 착수 — 관망 종료'
    ]
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.8, w: 12.13, h: 5.2,
    colW: [3.5, 3.5, 5.13]
  });

  addPageNumber(slide, 52, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 53: [Cards] 기술 신호 레지스터 상위 7개
// 2x2 카드 (S02, S03, S04, S01) + 나머지 3개 텍스트 요약
// ─────────────────────────────────────────────────────────────
function slide53_signal_register() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '기술 신호 레지스터 — 상위 7개 신호', null);

  // 2x2 주요 카드
  const mainCards = [
    {
      id: 'S02',
      title: 'Apple 폴더블 iPhone 2026 확정',
      body: '강도: 강 | 불확실성: 낮음\nSamsung Display 독점 공급 확인\n15M+ 패널/년 → LLO/드릴링 수요 직결',
      color: COLORS.accent_blue
    },
    {
      id: 'S03',
      title: '중국 IPG 파이버 레이저 추월',
      body: '강도: 강 | 불확실성: 낮음\nIPG -22% YoY, Raycus 점유율 30%\n표준 시장 구조 변화 확정',
      color: COLORS.accent_red
    },
    {
      id: 'S04',
      title: '그린 레이저 EV 용접 채택 가속',
      body: '강도: 강 | 불확실성: 중\nTRUMPF/Coherent 신제품 출시\nLFP 비중 확대로 구리 흡수율 문제 심화',
      color: COLORS.accent_cyan
    },
    {
      id: 'S01',
      title: 'MicroLED 수율 병목 미해소',
      body: '강도: 강 | 불확실성: 중\n목표 99.99% vs 현재 99.5~99.8%\n→ 투자 관망 유지 트리거',
      color: COLORS.accent_yellow
    }
  ];

  const positions = CARD_2X2.positions;
  const cardW = CARD_2X2.w;
  const cardH = 2.3;

  mainCards.forEach(function(card, i) {
    const x = positions[i].x;
    const y = positions[i].y;

    // 카드 배경
    slide.addShape('roundRect', {
      x: x, y: y, w: cardW, h: cardH,
      fill: { color: COLORS.bg_primary },
      line: { color: card.color, width: 1.5 },
      rectRadius: 0.08
    });

    // 상단 accent bar
    slide.addShape('rect', {
      x: x, y: y, w: cardW, h: 0.07,
      fill: { color: card.color }
    });

    // 신호 ID 배지
    slide.addShape('rect', {
      x: x + 0.15, y: y + 0.15, w: 0.55, h: 0.28,
      fill: { color: card.color }
    });
    slide.addText(card.id, {
      x: x + 0.15, y: y + 0.15, w: 0.55, h: 0.28,
      fontSize: 10,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle'
    });

    // 카드 제목
    slide.addText(card.title, {
      x: x + 0.8, y: y + 0.12, w: cardW - 1.0, h: 0.38,
      fontSize: 13,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle'
    });

    // 카드 내용
    slide.addText(card.body, {
      x: x + 0.15, y: y + 0.58, w: cardW - 0.3, h: cardH - 0.75,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      lineSpacingMultiple: 1.4
    });
  });

  // 나머지 3개 신호 — 하단 텍스트 요약 바
  slide.addShape('rect', {
    x: 0.6, y: 6.78, w: 12.13, h: 0.03,
    fill: { color: 'E2E8F0' }
  });

  const extraSignals = [
    { id: 'S05', text: 'AI+센서 공정 자율화 진입 — 수율 향상 실증 사례 증가 (강/중)' },
    { id: 'S11', text: 'EU REACH 화학 에칭 규제 초안 공개 — 레이저 클리닝 대체 수요 촉발 (중/중)' },
    { id: 'S06', text: 'MicroLED 장비 시장 $4.5B (2035) 전망 — 장기 최대 기회이나 타임라인 불확실 (강/높음)' }
  ];

  const extraY = 6.88;
  const extraItemW = 12.13 / 3;

  extraSignals.forEach(function(sig, i) {
    const x = 0.6 + i * extraItemW;

    // ID 배지
    slide.addShape('rect', {
      x: x, y: extraY, w: 0.45, h: 0.22,
      fill: { color: COLORS.text_tertiary }
    });
    slide.addText(sig.id, {
      x: x, y: extraY, w: 0.45, h: 0.22,
      fontSize: 9,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle'
    });

    // 텍스트
    slide.addText(sig.text, {
      x: x + 0.5, y: extraY, w: extraItemW - 0.55, h: 0.35,
      fontSize: 10,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'middle',
      lineSpacingMultiple: 1.3
    });
  });

  addPageNumber(slide, 53, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 54: [Cards] 회사 관점 최종 권고 4가지 범주
// 2x2 카드: 지금 베팅 / 제한적 실험 / 관망 / 회피
// ─────────────────────────────────────────────────────────────
function slide54_final_recommendation() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '회사 관점 최종 권고 — 4가지 행동 범주', null);

  const cards = [
    {
      accentColor: COLORS.accent_blue,
      badge: '지금 베팅',
      title: 'EV 배터리 용접 + 폴더블 드릴링',
      body: '가장 확실한 수익 기회\n• EV: PoC 제안 즉시 착수, IATF 인증 시작\n• 폴더블: 드릴링 역량 평가 + Fine M-Tec 분석\n→ 이번 분기 예산과 인력 배정'
    },
    {
      accentColor: COLORS.accent_cyan,
      badge: '제한적 실험',
      title: 'GLLO + USP 접합 + AI 모니터링',
      body: '차별화 R&D — 소규모 시작, 결과 보고 의무화\n• GLLO: 그래핀 파운드리 파트너십 탐색\n• USP: 50MPa+ PoC 목표 설정\n• AI: 기술 평가 후 파일럿 범위 결정'
    },
    {
      accentColor: COLORS.accent_yellow,
      badge: '관망',
      title: 'MicroLED LIFT + 레이저 클리닝',
      body: '트리거 대기 — 투자하지 않되 모니터링 지속\n• MicroLED: 수율 100ppm 달성 확인 시 재검토\n• 클리닝: EU REACH 규제 발효 시 로드맵 수립\n→ 분기별 트리거 체크 의무화'
    },
    {
      accentColor: COLORS.accent_red,
      badge: '회피',
      title: '로봇 하모닉 드라이브 레이저 가공',
      body: '근거 부족 — 2028년까지 투자 보류\n• CNC 주도 현실, 레이저 전환 근거 미확인\n• Tesla Optimus 양산 지연 반복 패턴 주의\n→ 2028년 재평가, 그 전까지 관망도 불필요'
    }
  ];

  const positions = CARD_2X2.positions;
  const cardW = CARD_2X2.w;
  const cardH = CARD_2X2.h;

  cards.forEach(function(card, i) {
    const x = positions[i].x;
    const y = positions[i].y;

    // 카드 배경
    slide.addShape('roundRect', {
      x: x, y: y, w: cardW, h: cardH,
      fill: { color: COLORS.bg_primary },
      line: { color: card.accentColor, width: 1.5 },
      rectRadius: 0.08
    });

    // 상단 accent bar
    slide.addShape('rect', {
      x: x, y: y, w: cardW, h: 0.07,
      fill: { color: card.accentColor }
    });

    // 범주 배지
    slide.addShape('rect', {
      x: x + 0.15, y: y + 0.15, w: 1.1, h: 0.3,
      fill: { color: card.accentColor }
    });
    slide.addText(card.badge, {
      x: x + 0.15, y: y + 0.15, w: 1.1, h: 0.3,
      fontSize: 11,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle'
    });

    // 카드 제목
    slide.addText(card.title, {
      x: x + 1.35, y: y + 0.13, w: cardW - 1.55, h: 0.4,
      fontSize: 13,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle',
      lineSpacingMultiple: 1.2
    });

    // 카드 내용
    slide.addText(card.body, {
      x: x + 0.18, y: y + 0.55, w: cardW - 0.36, h: cardH - 0.72,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      lineSpacingMultiple: 1.4
    });
  });

  addPageNumber(slide, 54, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 55: [Closing] 3가지 질문으로 마무리
// Closing 슬라이드 — 페이지 번호 없음
// ─────────────────────────────────────────────────────────────
function slide55_closing() {
  const slide = pptx.addSlide();

  // 풀블리드 다크 배경
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 우측 상단 장식 원
  slide.addShape('ellipse', {
    x: 9.0, y: -1.0, w: 5.5, h: 5.5,
    fill: { color: COLORS.accent_blue },
    transparency: 88
  });

  // accent 라인 (cyan)
  slide.addShape('rect', {
    x: 1.5, y: 1.65, w: 1.5, h: 0.06,
    fill: { color: COLORS.accent_cyan }
  });

  // 결론 제목
  slide.addText('3가지 질문으로 마무리', {
    x: 1.5, y: 1.85, w: 10.33, h: 0.75,
    fontSize: 38,
    fontFace: FONTS.title.fontFace,
    bold: true,
    color: COLORS.text_on_dark,
    align: 'left',
    valign: 'middle'
  });

  // 구분선
  slide.addShape('rect', {
    x: 1.5, y: 2.72, w: 10.33, h: 0.03,
    fill: { color: COLORS.text_tertiary },
    transparency: 60
  });

  // 3가지 질문 + 답 (번호 컬러 강조)
  const actions = [
    {
      num: '지금 시작',
      color: COLORS.accent_blue,
      text: 'EV 배터리 이종금속 용접 PoC를 이번 분기 시작하라',
      sub: '→ LG에너지솔루션 / 삼성SDI PoC 제안서 작성 + IATF 16949 인증기관 선정'
    },
    {
      num: '추적',
      color: COLORS.accent_cyan,
      text: '7가지 전환 트리거를 분기별 모니터링하라',
      sub: '→ Apple Fold 판매 · MicroLED 수율 · Omniply 결과 · 그린레이저 원가 추이'
    },
    {
      num: '멈춤',
      color: COLORS.accent_yellow,
      text: '로봇 하모닉 드라이브 투자는 2028년까지 보류하라',
      sub: '→ 근거 미확인 영역에 예산 투입은 기회비용 손실 — 2028년 재평가 일정 등록'
    }
  ];

  actions.forEach(function(action, i) {
    const yBase = 3.0 + i * 1.35;

    // 번호 배지 (색상 박스)
    slide.addShape('rect', {
      x: 1.5, y: yBase + 0.05, w: 1.0, h: 0.4,
      fill: { color: action.color }
    });
    slide.addText(action.num, {
      x: 1.5, y: yBase + 0.05, w: 1.0, h: 0.4,
      fontSize: 13,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle'
    });

    // 메인 텍스트
    slide.addText(action.text, {
      x: 2.65, y: yBase, w: 9.18, h: 0.52,
      fontSize: 19,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'left',
      valign: 'middle'
    });

    // 부연 텍스트
    slide.addText(action.sub, {
      x: 2.65, y: yBase + 0.55, w: 9.18, h: 0.45,
      fontSize: 13,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_on_dark,
      transparency: 30,
      align: 'left',
      valign: 'top'
    });
  });

  // 하단 CTA
  slide.addShape('rect', {
    x: 1.5, y: 7.0, w: 10.33, h: 0.03,
    fill: { color: COLORS.accent_cyan },
    transparency: 50
  });
  slide.addText('레이저 기술 미래 로드맵  |  2026.03.25  |  Strategy Research Team', {
    x: 1.5, y: 7.1, w: 10.33, h: 0.3,
    fontSize: 11,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_on_dark,
    transparency: 40,
    align: 'center',
    valign: 'middle'
  });
}

// === Part 4 끝 ===
