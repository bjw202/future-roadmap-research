// === Part 2 시작 ===

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
    line: { color: 'FFB020', width: 0 }
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
    line: { color: COLORS.accent_cyan, width: 0 }
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
      line: { color: b.color, width: 0 }
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
      line: { color: app.badgeColor, width: 0 }
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
      line: { color: p.color, width: 0 }
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
      line: { color: sc.badgeColor, width: 0 }
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

// === Part 2 끝 ===
