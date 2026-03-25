// ============================================================
// Part C: 슬라이드 20~28 — PptxGenJS 코드
// 상수/헬퍼는 Part A에 정의됨
// ============================================================

const TOTAL_SLIDES = 28;

// ─────────────────────────────────────────────────────────────
// 슬라이드 20: [Cards] 4가지 시나리오
// ─────────────────────────────────────────────────────────────
function slide20_scenarios() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '4가지 시나리오: 가장 가능성 높은 미래는 "점진적 통합"이다');

  // 확률 부제
  slide.addText('시나리오 A가 50~60% — 그래도 나머지 40~50%를 무시할 수 없다', {
    x: 0.6, y: 1.65, w: 12.13, h: 0.32,
    fontSize: 11, color: COLORS.textSub, italic: true,
  });

  // 카드 배경 색상 정의
  const cardColors = [
    { bg: 'EBF5FB', border: '2E86C1' }, // A 파랑
    { bg: 'EAFAF1', border: '1E8449' }, // B 초록
    { bg: 'FDEDEC', border: 'CB4335' }, // C 빨강
    { bg: 'FEF9E7', border: 'B7950B' }, // D 노랑
  ];

  const cards = [
    {
      label: 'A 점진적 통합',
      prob: '50~60%',
      probColor: '2E86C1',
      items: [
        '기술 연 15~25% 개선 + 조직 점진 수용',
        '팀 규모 20~30% 축소 (3년 내 주류)',
        '에이전틱 코딩 → 반복 업무 40~50% 대체',
        '전략: 단계적 도입 + 거버넌스 선행',
      ],
    },
    {
      label: 'B 소프트웨어 수요 폭발',
      prob: '15~25%',
      probColor: '1E8449',
      items: [
        'AI 성능 급진전 + 규제 혁신 친화',
        '전 산업 소프트웨어화 → 개발자 총 수요 증가',
        'AI 에이전트가 SDLC 70%+ 자동 처리',
        '전략: 적극 투자 + 인재 조기 확보',
      ],
    },
    {
      label: 'C 규제 브레이크',
      prob: '15~20%',
      probColor: 'CB4335',
      items: [
        '대형 AI 코드 보안 사고 + 규제 급강화',
        'AI 코드 인간 검토 의무화',
        '채택 속도 50% 둔화, 컴플라이언스 비용 급증',
        '전략: 거버넌스가 경쟁력, 컴플라이언스 선행',
      ],
    },
    {
      label: 'D 기술 정체 (고원기)',
      prob: '10~15%',
      probColor: 'B7950B',
      items: [
        'Scaling law 한계 → SWE-bench 80%에서 포화',
        '에이전틱 코딩 → 실험 수준 고착',
        '구독 해지 증가, 과잉 투자 기업 손실',
        '전략: 현 수준 실용적 활용, 과잉 투자 회피',
      ],
    },
  ];

  const positions = [
    { x: 0.6,  y: 2.05 },
    { x: 6.7,  y: 2.05 },
    { x: 0.6,  y: 4.65 },
    { x: 6.7,  y: 4.65 },
  ];

  const cw = 5.8;
  const ch = 2.35;

  cards.forEach((card, i) => {
    const { x, y } = positions[i];
    const { bg, border } = cardColors[i];

    // 카드 배경
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: cw, h: ch,
      fill: { color: bg },
      line: { color: border, width: 1.5 },
    });

    // 카드 상단 라벨 바
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: cw, h: 0.38,
      fill: { color: border },
      line: { color: border, width: 0 },
    });

    // 라벨 텍스트
    slide.addText(card.label, {
      x: x + 0.12, y: y + 0.03, w: cw - 0.5, h: 0.32,
      fontSize: 11.5, bold: true, color: 'FFFFFF',
    });

    // 확률 뱃지
    slide.addText(card.prob, {
      x: x + cw - 1.05, y: y + 0.04, w: 0.95, h: 0.28,
      fontSize: 10, bold: true, color: 'FFFFFF', align: 'right',
    });

    // 내용 항목
    card.items.forEach((item, j) => {
      slide.addText('• ' + item, {
        x: x + 0.15, y: y + 0.5 + j * 0.43, w: cw - 0.25, h: 0.4,
        fontSize: 9.5, color: COLORS.textBody,
        wrap: true,
      });
    });
  });

  // 공통 대비 전략 하단 노트
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 7.08, w: 12.13, h: 0.32,
    fill: { color: 'EBF5FB' },
    line: { color: '2E86C1', width: 1 },
  });
  slide.addText(
    '공통 대비: 시나리오 A(기준)를 중심으로 설계  |  C·D 방어 내장  |  B 업사이드 옵션 유지  —  출처: 91-scenario-matrix.md',
    {
      x: 0.7, y: 7.1, w: 12.0, h: 0.28,
      fontSize: 8.5, color: '2E86C1', italic: true,
    }
  );

  addPageNumber(slide, 20, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 21: [Table] 시나리오별 핵심 차이 비교
// ─────────────────────────────────────────────────────────────
function slide21_scenario_comparison() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '시나리오별 핵심 차이: 어떤 세상이 오느냐에 따라 전략이 달라진다');

  const headers = ['차원', 'A 점진적 통합', 'B 수요 폭발', 'C 규제 브레이크', 'D 기술 정체'];

  const rows = [
    ['개발자 총 수요', '소폭 감소 후 안정', '증가', '유지~소폭 감소', '유지'],
    ['주니어 수요', '구조적 감소', '역할 재정의 후 반등', '검토 역할로 유지', '완만한 감소'],
    ['팀 규모', '20~30% 축소', '1인 팀 증가\n총 팀 수 증가', '축소 둔화', '소폭 축소'],
    ['핵심 역량', 'AI 오케스트레이션', '도메인 × AI 융합', '거버넌스·컴플라이언스', '전통 개발 + AI 보조'],
    ['최대 리스크', '보안 부채 누적', '플랫폼 종속', '혁신 경쟁력 저하', '과잉 투자 손실'],
    ['한국 기업 전략', '단계적 도입\n+ 거버넌스', '적극 투자\n+ 인재 확보', '컴플라이언스 선행', '제한적 도입 유지'],
  ];

  const colW = [2.1, 2.4, 2.4, 2.7, 2.5];

  const tableRows = [
    headers.map((h, i) => ({
      text: h,
      options: {
        bold: true,
        color: 'FFFFFF',
        fill: i === 0 ? { color: COLORS.primary } : { color: i === 1 ? '2E86C1' : i === 2 ? '1E8449' : i === 3 ? 'CB4335' : 'B7950B' },
        align: 'center',
        fontSize: 10.5,
      },
    })),
    ...rows.map((row) =>
      row.map((cell, ci) => ({
        text: cell,
        options: {
          fontSize: 9.5,
          color: ci === 0 ? COLORS.primary : COLORS.textBody,
          bold: ci === 0,
          align: 'center',
          valign: 'middle',
          fill: { color: ci === 0 ? 'EBF5FB' : 'FFFFFF' },
        },
      }))
    ),
  ];

  slide.addTable(tableRows, {
    x: 0.6, y: 1.85, w: 12.13,
    rowH: 0.62,
    colW,
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    autoPage: false,
  });

  slide.addText('출처: 91-scenario-matrix.md — 시나리오 간 비교 요약', {
    x: 0.6, y: 7.15, w: 12.13, h: 0.22,
    fontSize: 8, color: COLORS.textSub, italic: true,
  });

  addPageNumber(slide, 21, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 22: [Table] 기업 전략 옵션 4분류
// ─────────────────────────────────────────────────────────────
function slide22_strategy_options() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '기업 전략: 지금 실행 / 제한적 실험 / 관망 / 회피');

  const categoryColors = {
    '지금 실행': { header: '1A5276', fill: 'EBF5FB', badge: '2E86C1' },
    '제한적 실험': { header: '1E8449', fill: 'EAFAF1', badge: '27AE60' },
    '관망': { header: '7D6608', fill: 'FEF9E7', badge: 'F39C12' },
    '회피': { header: '922B21', fill: 'FDEDEC', badge: 'E74C3C' },
  };

  const sections = [
    {
      category: '지금 실행',
      timeframe: '0~3개월',
      rows: [
        ['AI 도구 파일럿 (5~10명)', 'Copilot/Cursor, 비용 낮음', '모든 시나리오에서 유효, 즉시 학습 축적'],
        ['AI 코드 보안 스캔 파이프라인', 'CI/CD 통합 필요', '보안 부채 선제 차단, 규제 대비'],
        ['AI 거버넌스 정책 v1 수립', '조직 합의 필요', 'Shadow AI 리스크 제거, 모든 시나리오 필수'],
      ],
    },
    {
      category: '제한적 실험',
      timeframe: '3~12개월',
      rows: [
        ['SDLC 전 주기 AI 통합', '조직 변화 관리 高', '생산성 10~15% → 20~30% 달성 열쇠'],
        ['에이전틱 코딩 제한적 도입', '보안 파이프라인 선결', '반복 업무 30~50% 자동화 잠재력'],
        ['역할 재정의 설계 착수', '인재 전략 기반 구축', 'AI 오케스트레이터·에이전트 아키텍트'],
      ],
    },
    {
      category: '관망',
      timeframe: '12~36개월 (조건부)',
      rows: [
        ['멀티에이전트 전면 도입', '기술 성숙도 미검증', 'SWE-bench 실세계 60%+ 확인 후 검토'],
        ['오픈소스 모델 자체 호스팅', '인프라·MLOps 역량 필요', '시장 안정화 후 비용/보안/성능 삼각 검토'],
      ],
    },
    {
      category: '회피',
      timeframe: '하지 말 것',
      rows: [
        ['프로세스 변화 없이 도구만 전사 확산', 'Bain: 10~15%가 상한', '오히려 안정성 7.2% 저하 가능'],
        ['거버넌스 없이 에이전틱 AI 배포', '보안 부채 폭발 경로', '대형 침해 사고 리스크'],
        ['AI 대체 목적 주니어 대량 해고', '장기 인재 파이프라인 고갈', '시나리오 B 발생 시 대응 불능'],
      ],
    },
  ];

  let currentY = 1.88;

  sections.forEach((sec) => {
    const col = categoryColors[sec.category];

    // 섹션 헤더
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: currentY, w: 12.13, h: 0.36,
      fill: { color: col.header },
      line: { color: col.header, width: 0 },
    });
    slide.addText(`${sec.category}  |  ${sec.timeframe}`, {
      x: 0.7, y: currentY + 0.04, w: 12.0, h: 0.28,
      fontSize: 10.5, bold: true, color: 'FFFFFF',
    });
    currentY += 0.36;

    // 행 데이터
    sec.rows.forEach((row, ri) => {
      const rowFill = ri % 2 === 0 ? col.fill : 'FFFFFF';
      const rowH = 0.42;

      // 옵션
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.6, y: currentY, w: 4.5, h: rowH,
        fill: { color: rowFill },
        line: { color: 'CCCCCC', width: 0.5 },
      });
      slide.addText(row[0], {
        x: 0.7, y: currentY + 0.04, w: 4.3, h: rowH - 0.08,
        fontSize: 9, bold: true, color: COLORS.textBody,
        valign: 'middle',
      });

      // 비용/조건
      slide.addShape(pptx.ShapeType.rect, {
        x: 5.1, y: currentY, w: 3.2, h: rowH,
        fill: { color: rowFill },
        line: { color: 'CCCCCC', width: 0.5 },
      });
      slide.addText(row[1], {
        x: 5.2, y: currentY + 0.04, w: 3.0, h: rowH - 0.08,
        fontSize: 9, color: COLORS.textSub,
        valign: 'middle',
      });

      // 이유/효과
      slide.addShape(pptx.ShapeType.rect, {
        x: 8.3, y: currentY, w: 4.43, h: rowH,
        fill: { color: rowFill },
        line: { color: 'CCCCCC', width: 0.5 },
      });
      slide.addText(row[2], {
        x: 8.4, y: currentY + 0.04, w: 4.23, h: rowH - 0.08,
        fontSize: 9, color: COLORS.textBody,
        valign: 'middle',
      });

      currentY += rowH;
    });
  });

  slide.addText('출처: 92-strategy-options.md, 00-synthesis.md §8', {
    x: 0.6, y: 7.15, w: 12.13, h: 0.22,
    fontSize: 8, color: COLORS.textSub, italic: true,
  });

  addPageNumber(slide, 22, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 23: [Content] 프로세스 재설계 — 생산성 10~15% → 20~30%
// ─────────────────────────────────────────────────────────────
function slide23_process_redesign() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '프로세스 재설계가 생산성 10~15%를 20~30%로 끌어올리는 열쇠다');

  // 핵심 인사이트 박스
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 1.78, w: 12.13, h: 0.78,
    fill: { color: 'EBF5FB' },
    line: { color: '2E86C1', width: 1.5 },
  });
  slide.addText(
    'Bain(2025): "AI가 없어도 할 수 있는 단계에만 집중"했던 기업들이 ROI 달성에 실패했다.\n코딩 단계(전체 SDLC의 25~35%)만 최적화해서는 조직 수준 생산성 상한이 10~15%이다.',
    {
      x: 0.75, y: 1.82, w: 11.85, h: 0.7,
      fontSize: 10.5, color: '1A5276', bold: false,
      valign: 'middle',
    }
  );

  // 왼쪽 — SDLC 전 주기 AI 통합
  slide.addText('SDLC 전 주기 AI 통합 (20~30% 경로)', {
    x: 0.6, y: 2.68, w: 5.8, h: 0.36,
    fontSize: 11, bold: true, color: COLORS.primary,
  });

  const sdlcSteps = [
    { step: '요구사항', detail: 'AI 기반 스펙 초안, 사용자 스토리 자동 생성' },
    { step: '설계', detail: '아키텍처 리뷰 보조, 다이어그램 자동화' },
    { step: '코딩', detail: 'Copilot/Cursor 코드 완성, 보일러플레이트 제거' },
    { step: '테스트', detail: 'AI 유닛 테스트 자동 생성, QA 커버리지 확장' },
    { step: '배포·운영', detail: 'CI/CD 자동화, SRE 이상 감지 보조' },
  ];

  sdlcSteps.forEach((s, i) => {
    const sy = 3.1 + i * 0.6;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: sy, w: 1.3, h: 0.48,
      fill: { color: COLORS.primary },
      line: { color: COLORS.primary, width: 0 },
    });
    slide.addText(s.step, {
      x: 0.6, y: sy, w: 1.3, h: 0.48,
      fontSize: 9.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle',
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.9, y: sy, w: 4.5, h: 0.48,
      fill: { color: 'F4F6F7' },
      line: { color: 'CCCCCC', width: 0.5 },
    });
    slide.addText(s.detail, {
      x: 2.0, y: sy, w: 4.3, h: 0.48,
      fontSize: 9.5, color: COLORS.textBody, valign: 'middle',
    });
  });

  // 오른쪽 — 성공/실패 사례 비교
  slide.addText('성공 vs 실패 — 핵심 변수', {
    x: 6.7, y: 2.68, w: 6.0, h: 0.36,
    fontSize: 11, bold: true, color: COLORS.primary,
  });

  const cases = [
    {
      label: '성공: Goldman Sachs',
      color: '1E8449',
      bg: 'EAFAF1',
      content: '사유 코드베이스 기반 파인튜닝 → 컨텍스트 인식 코드 생성. SDLC 전 단계 통합으로 개발 주기 단축.',
    },
    {
      label: '실패: 광범위 산업 평균',
      color: 'CB4335',
      bg: 'FDEDEC',
      content: 'Bain(2025): AI 코드 27% 생성에도 생산성 ~10%. 처리량 1.5% 감소, 안정성 7.2% 저하. 코딩 속도 20% 향상이 테스트·리뷰 병목(19% 증가)으로 상쇄.',
    },
    {
      label: 'Faros AI: AI 생산성 역설',
      color: 'B7950B',
      bg: 'FEF9E7',
      content: '10,000+ 개발자 텔레메트리: 개인 PR 병합 98% 증가. 그러나 조직 전달 지표는 정체. 프로세스 변화 없는 도구 교체의 한계.',
    },
  ];

  cases.forEach((c, i) => {
    const cy = 3.1 + i * 1.35;
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.7, y: cy, w: 5.83, h: 1.2,
      fill: { color: c.bg },
      line: { color: c.color, width: 1.5 },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.7, y: cy, w: 5.83, h: 0.3,
      fill: { color: c.color },
      line: { color: c.color, width: 0 },
    });
    slide.addText(c.label, {
      x: 6.8, y: cy + 0.02, w: 5.6, h: 0.26,
      fontSize: 9.5, bold: true, color: 'FFFFFF',
    });
    slide.addText(c.content, {
      x: 6.8, y: cy + 0.35, w: 5.6, h: 0.8,
      fontSize: 9, color: COLORS.textBody, wrap: true,
    });
  });

  slide.addText('출처: Bain 2025, Faros AI 2025, 03-preparation-strategy.md §3~4', {
    x: 0.6, y: 7.15, w: 12.13, h: 0.22,
    fontSize: 8, color: COLORS.textSub, italic: true,
  });

  addPageNumber(slide, 23, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 24: [Content] 개인 전략 — 3계층 스킬
// ─────────────────────────────────────────────────────────────
function slide24_individual_strategy() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '개인 전략: AI 시대에 대체 불가능한 포지션을 확립하라');

  slide.addText(
    '핵심 질문: "어떤 AI 도구를 쓸 것인가"가 아니라 "AI 도구 시대에 대체 불가능한 포지션을 어떻게 확립할 것인가"',
    {
      x: 0.6, y: 1.7, w: 12.13, h: 0.36,
      fontSize: 10, color: COLORS.textSub, italic: true,
    }
  );

  // 3계층 스킬 카드
  const layers = [
    {
      num: '1',
      title: 'AI 리터러시 + 도구 숙련',
      timeframe: '즉시 필요',
      color: 'CB4335',
      bg: 'FDEDEC',
      skills: [
        '프롬프트 엔지니어링 — 정밀한 컨텍스트, 범위 제한, 반복 정제',
        '비판적 평가 역량 — AI 출력의 보안성·정확성 검증',
        '도구 전환 유창성 — Copilot·Cursor·Claude Code 상황별 활용',
        '데이터 리터러시 — AI 출력 불확실성 이해',
      ],
      action: '지금 시작: Cursor/Copilot 일상화, AI 생성 코드 리뷰 습관 형성',
    },
    {
      num: '2',
      title: '시스템 사고 + 아키텍처 역량',
      timeframe: '12개월 내 준비',
      color: '1A5276',
      bg: 'EBF5FB',
      skills: [
        'AI 에이전트 조율 — 작업 위임, 체크포인트, 결과 검증',
        'AI 워크플로우 재설계 — 요구사항~배포 전 과정 AI 통합',
        '레거시 시스템 × AI 통합 역량',
      ],
      action: '3~12개월: RAG·AI 에이전트 실습 (LangChain/LlamaIndex), 아키텍처 포트폴리오',
    },
    {
      num: '3',
      title: '도메인 전문성 × AI 융합',
      timeframe: '장기 차별화',
      color: '1E8449',
      bg: 'EAFAF1',
      skills: [
        '금융·의료·법률·제조 등 특정 산업 맥락에서 AI 적용',
        'AI가 모르는 암묵적 지식(tacit knowledge)과 도메인 규제',
        '고객 요구사항을 AI가 실행 가능한 시스템으로 변환',
      ],
      action: '1~3년: AI Systems Builder 또는 Domain×AI 전문가 포지션 확립. 임금 프리미엄 56% 보고',
    },
  ];

  layers.forEach((layer, i) => {
    const lx = 0.6;
    const ly = 2.17 + i * 1.55;
    const lw = 12.13;
    const lh = 1.45;

    slide.addShape(pptx.ShapeType.rect, {
      x: lx, y: ly, w: lw, h: lh,
      fill: { color: layer.bg },
      line: { color: layer.color, width: 1.5 },
    });

    // 번호 원
    slide.addShape(pptx.ShapeType.ellipse, {
      x: lx + 0.08, y: ly + 0.08, w: 0.5, h: 0.5,
      fill: { color: layer.color },
      line: { color: layer.color, width: 0 },
    });
    slide.addText(layer.num, {
      x: lx + 0.08, y: ly + 0.08, w: 0.5, h: 0.5,
      fontSize: 14, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle',
    });

    // 제목
    slide.addText(layer.title, {
      x: lx + 0.68, y: ly + 0.1, w: 6.5, h: 0.34,
      fontSize: 11.5, bold: true, color: layer.color,
    });
    slide.addText(layer.timeframe, {
      x: lx + 7.2, y: ly + 0.1, w: 4.8, h: 0.34,
      fontSize: 10, color: layer.color, align: 'right', italic: true,
    });

    // 스킬 항목
    layer.skills.forEach((sk, j) => {
      slide.addText('• ' + sk, {
        x: lx + 0.7, y: ly + 0.52 + j * 0.26, w: 8.5, h: 0.26,
        fontSize: 9, color: COLORS.textBody,
      });
    });

    // 액션 라인
    slide.addShape(pptx.ShapeType.rect, {
      x: lx + 0.08, y: ly + lh - 0.36, w: lw - 0.16, h: 0.3,
      fill: { color: layer.color },
      line: { color: layer.color, width: 0 },
    });
    slide.addText(layer.action, {
      x: lx + 0.18, y: ly + lh - 0.36, w: lw - 0.3, h: 0.3,
      fontSize: 8.5, color: 'FFFFFF', valign: 'middle',
    });
  });

  // 상시 병행 메모
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 6.83, w: 12.13, h: 0.32,
    fill: { color: 'F2F3F4' },
    line: { color: '7F8C8D', width: 1 },
  });
  slide.addText(
    '★ 상시 병행: AI 없는 기초 역량 유지 — AI 의존 심화 방지, 장기적 판단력과 AI 오류 감지 능력의 기반  |  출처: 03-preparation-strategy.md §2, 92-strategy-options.md',
    {
      x: 0.7, y: 6.85, w: 12.0, h: 0.28,
      fontSize: 8.5, color: '555555', italic: false,
    }
  );

  addPageNumber(slide, 24, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 25: [Timeline] 기술 로드맵 3단계
// ─────────────────────────────────────────────────────────────
function slide25_roadmap() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '기술 로드맵: 지금부터 36개월까지 단계별 실행 계획');

  const phases = [
    {
      label: '0~3개월\n즉시 실행',
      color: 'CB4335',
      bg: 'FDEDEC',
      items: [
        '• AI 코딩 도구 파일럿 시작\n  (5~10명, 측정 기준 사전 정의)',
        '• AI 생성 코드 보안 스캔\n  파이프라인 CI/CD 통합',
        '• AI 거버넌스 정책 v1 수립\n  (Shadow AI, 데이터 입력 기준, IP)',
        '• [개인] AI 도구 일상화 +\n  비판적 검토 습관 형성',
      ],
    },
    {
      label: '3~12개월\n제한적 실험',
      color: '1A5276',
      bg: 'EBF5FB',
      items: [
        '• SDLC 전 주기 AI 통합\n  (요구사항→설계→코딩→테스트→배포)',
        '• 에이전틱 코딩 제한적 실험\n  (반복 피처 개발, CI/CD 자동화)',
        '• 역할 재정의 설계 착수\n  (AI 오케스트레이터, 코드 검토 전문가)',
        '• EU AI Act 대응 컴플라이언스\n  체계 구축 (EU 시장 대상 기업)',
      ],
    },
    {
      label: '12~36개월\n조건부 확장',
      color: '1E8449',
      bg: 'EAFAF1',
      items: [
        '• 멀티에이전트 파이프라인 조건부\n  도입 (SWE-bench 실세계 60%+ 확인 시)',
        '• 조직 구조 조정 (소규모 AI-증강\n  팀, 관리 레이어 재정의)',
        '• 오픈소스 모델 자체 호스팅\n  평가 (비용/보안/성능 삼각 검토)',
        '• 비개발 부서 AI 리터러시\n  프로그램 전사 확산',
      ],
    },
  ];

  // 타임라인 가로 화살표 라인
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 2.15, w: 12.13, h: 0.06,
    fill: { color: 'BDC3C7' },
    line: { color: 'BDC3C7', width: 0 },
  });

  const phaseW = 3.85;
  const phaseH = 4.55;
  const phaseGap = 0.2;

  phases.forEach((phase, i) => {
    const px = 0.6 + i * (phaseW + phaseGap);
    const py = 1.95;

    // 헤더
    slide.addShape(pptx.ShapeType.rect, {
      x: px, y: py, w: phaseW, h: 0.7,
      fill: { color: phase.color },
      line: { color: phase.color, width: 0 },
    });
    slide.addText(phase.label, {
      x: px + 0.1, y: py + 0.04, w: phaseW - 0.15, h: 0.62,
      fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle',
    });

    // 타임라인 점
    slide.addShape(pptx.ShapeType.ellipse, {
      x: px + phaseW / 2 - 0.13, y: 2.09, w: 0.26, h: 0.26,
      fill: { color: phase.color },
      line: { color: 'FFFFFF', width: 1.5 },
    });

    // 내용 박스
    slide.addShape(pptx.ShapeType.rect, {
      x: px, y: py + 0.7, w: phaseW, h: phaseH - 0.7,
      fill: { color: phase.bg },
      line: { color: phase.color, width: 1 },
    });

    phase.items.forEach((item, j) => {
      slide.addText(item, {
        x: px + 0.12, y: py + 0.8 + j * 0.9, w: phaseW - 0.22, h: 0.85,
        fontSize: 9, color: COLORS.textBody, wrap: true, valign: 'top',
      });
    });
  });

  slide.addText('출처: 00-synthesis.md §10', {
    x: 0.6, y: 7.15, w: 12.13, h: 0.22,
    fontSize: 8, color: COLORS.textSub, italic: true,
  });

  addPageNumber(slide, 25, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 26: [TwoColumn] 한국 기업의 '시범 도입 함정'
// ─────────────────────────────────────────────────────────────
function slide26_korea_context() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '한국 기업은 "시범 도입의 함정"에서 벗어나야 한다');

  // 왼쪽: 현황
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 1.82, w: 5.8, h: 0.4,
    fill: { color: '922B21' },
    line: { color: '922B21', width: 0 },
  });
  slide.addText('현황 — 시범 도입에 머무른 한국 기업', {
    x: 0.7, y: 1.84, w: 5.6, h: 0.36,
    fontSize: 11, bold: true, color: 'FFFFFF',
  });

  const koreaStats = [
    { label: 'AI 도구 도입률', value: '55.7~80%', note: '수치는 높지만 전사 내재화는 미미' },
    { label: '전사 내재화 기업', value: '6.7%', note: '도입과 내재화 사이 큰 간극' },
    { label: 'AI 로드맵 보유 기업', value: '15.5%', note: '전략 없는 도입이 대부분' },
    { label: '대기업 신입 공채 축소', value: '31%', note: 'AI 네이티브 경력직 전환 중' },
    { label: '개발자 규모', value: '266만 명', note: 'AI 리터러시 수준 미측정' },
  ];

  koreaStats.forEach((stat, i) => {
    const sy = 2.32 + i * 0.82;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: sy, w: 5.8, h: 0.72,
      fill: { color: i % 2 === 0 ? 'FDEDEC' : 'FDFEFE' },
      line: { color: 'E6B0AA', width: 0.5 },
    });
    slide.addText(stat.label, {
      x: 0.7, y: sy + 0.06, w: 2.8, h: 0.28,
      fontSize: 9.5, color: COLORS.textSub,
    });
    slide.addText(stat.value, {
      x: 0.7, y: sy + 0.34, w: 2.3, h: 0.32,
      fontSize: 18, bold: true, color: '922B21',
    });
    slide.addText(stat.note, {
      x: 3.1, y: sy + 0.1, w: 3.2, h: 0.52,
      fontSize: 8.5, color: COLORS.textSub, wrap: true, valign: 'middle', italic: true,
    });
  });

  // 오른쪽: 즉시 실행 권고
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.7, y: 1.82, w: 6.03, h: 0.4,
    fill: { color: '1A5276' },
    line: { color: '1A5276', width: 0 },
  });
  slide.addText('즉시 실행 3원칙', {
    x: 6.8, y: 1.84, w: 5.8, h: 0.36,
    fontSize: 11, bold: true, color: 'FFFFFF',
  });

  const actions = [
    {
      num: '01',
      title: '파일럿 즉시 시작',
      detail: '5~10명 팀으로 Cursor/Copilot 파일럿을 즉시 시작하라. 준비가 완벽해질 때까지 기다리지 말라. 3개월 후 학습만으로도 경쟁력 격차가 벌어진다.',
      color: '2E86C1',
    },
    {
      num: '02',
      title: '거버넌스 선행',
      detail: '도구 확산 전에 보안 가이드라인, 데이터 입력 기준, IP 책임을 명확히 하라. Shadow AI는 이미 진행 중이며 관리되지 않으면 데이터 유출 경로가 된다.',
      color: '1A5276',
    },
    {
      num: '03',
      title: '성과 측정 기준 전환',
      detail: '"코드 생성량" 대신 출시 주기 단축, 버그 발생률 감소, 개발자 만족도로 측정하라. 잘못된 지표는 AI 도구 효과를 왜곡하고 잘못된 의사결정으로 이어진다.',
      color: '117A65',
    },
  ];

  actions.forEach((action, i) => {
    const ay = 2.32 + i * 1.52;
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.7, y: ay, w: 6.03, h: 1.42,
      fill: { color: 'EBF5FB' },
      line: { color: action.color, width: 1.5 },
    });
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 6.78, y: ay + 0.1, w: 0.5, h: 0.5,
      fill: { color: action.color },
      line: { color: action.color, width: 0 },
    });
    slide.addText(action.num, {
      x: 6.78, y: ay + 0.1, w: 0.5, h: 0.5,
      fontSize: 10, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle',
    });
    slide.addText(action.title, {
      x: 7.38, y: ay + 0.1, w: 5.2, h: 0.34,
      fontSize: 11, bold: true, color: action.color,
    });
    slide.addText(action.detail, {
      x: 6.8, y: ay + 0.52, w: 5.8, h: 0.82,
      fontSize: 9, color: COLORS.textBody, wrap: true,
    });
  });

  slide.addText('출처: 00-synthesis.md — 한국 맥락 특수 고려', {
    x: 0.6, y: 7.15, w: 12.13, h: 0.22,
    fontSize: 8, color: COLORS.textSub, italic: true,
  });

  addPageNumber(slide, 26, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 27: [Table] 오판 리스크 + 모니터링 지표
// ─────────────────────────────────────────────────────────────
function slide27_risk_monitoring() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '이 판단이 틀렸을 때 무엇을 잃는가 — 오판 리스크와 모니터링 지표');

  // 가장 위험한 오판 박스
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 1.78, w: 12.13, h: 0.55,
    fill: { color: '922B21' },
    line: { color: '922B21', width: 0 },
  });
  slide.addText(
    '⚠ 가장 위험한 오판: "AI 도구가 보조 수준에 머물 것"이라 판단하여 아무것도 하지 않는 것\n→ 시나리오 D(기술 정체) 확률은 10~15%에 불과. 나머지 85~90%에서는 AI 준비가 경쟁력을 좌우한다.',
    {
      x: 0.75, y: 1.8, w: 11.85, h: 0.5,
      fontSize: 10, bold: true, color: 'FFFFFF', valign: 'middle',
    }
  );

  // 왼쪽: 오판 리스크 테이블
  slide.addText('5대 오판 리스크', {
    x: 0.6, y: 2.42, w: 5.8, h: 0.3,
    fontSize: 10.5, bold: true, color: COLORS.primary,
  });

  const risks = [
    ['제한적 도입', 'AI가 예상보다 빨리 성숙', '경쟁사 대비 뒤처짐'],
    ['에이전틱 적극 투자', '기술 정체(시나리오 D)', '과잉 투자 손실'],
    ['주니어 채용 축소', '소프트웨어 수요 폭발', '인재 파이프라인 고갈'],
    ['AI 도구 사용 제한', '보안 도구 빠른 성숙', '불필요한 혁신 지연'],
    ['관망 (전사 확산 지연)', '글로벌 AI-first 전환', '경쟁력 격차 확대'],
  ];

  const riskHeader = [
    [
      { text: '판단', options: { bold: true, color: 'FFFFFF', fill: { color: COLORS.primary }, fontSize: 9.5, align: 'center' } },
      { text: '틀릴 경우 상황', options: { bold: true, color: 'FFFFFF', fill: { color: COLORS.primary }, fontSize: 9.5, align: 'center' } },
      { text: '손실', options: { bold: true, color: 'FFFFFF', fill: { color: COLORS.primary }, fontSize: 9.5, align: 'center' } },
    ],
    ...risks.map((r, i) => [
      { text: r[0], options: { fontSize: 9, color: COLORS.textBody, fill: { color: i % 2 === 0 ? 'F4F6F7' : 'FFFFFF' }, valign: 'middle' } },
      { text: r[1], options: { fontSize: 9, color: COLORS.textSub, fill: { color: i % 2 === 0 ? 'F4F6F7' : 'FFFFFF' }, valign: 'middle' } },
      { text: r[2], options: { fontSize: 9, color: 'CB4335', fill: { color: i % 2 === 0 ? 'F4F6F7' : 'FFFFFF' }, valign: 'middle', bold: true } },
    ]),
  ];

  slide.addTable(riskHeader, {
    x: 0.6, y: 2.75, w: 5.8,
    rowH: 0.52,
    colW: [1.5, 2.3, 2.0],
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    autoPage: false,
  });

  // 오른쪽: 모니터링 선행지표
  slide.addText('7대 선행지표 + 전환 트리거', {
    x: 6.7, y: 2.42, w: 6.03, h: 0.3,
    fontSize: 10.5, bold: true, color: COLORS.primary,
  });

  const indicators = [
    { label: 'SWE-bench 실세계 점수', trigger: '60%+ 달성 시 → 에이전틱 코딩 본격 도입' },
    { label: 'Fortune 500 AI 코드 보안 사고', trigger: '발생 시 → 거버넌스 가속, 에이전틱 감속' },
    { label: 'AI 도구 구독 해지율', trigger: '20%+ 시 → 투자 재검토, ROI 측정 강화' },
    { label: '주니어 개발자 채용 비율', trigger: '30%+ 감소 지속 → 교육 프로그램 강화' },
    { label: 'Gartner Hype Cycle 위치', trigger: '환멸 단계 진입 시 → 기대 수준 재조정' },
    { label: '오픈소스 vs 상용 벤치마크 격차', trigger: '오픈소스 정기 추월 → 자체 호스팅 검토' },
    { label: 'EU AI Act 최초 대규모 벌금', trigger: '발생 시 → 컴플라이언스 체계 점검' },
  ];

  indicators.forEach((ind, i) => {
    const iy = 2.75 + i * 0.62;
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.7, y: iy, w: 6.03, h: 0.57,
      fill: { color: i % 2 === 0 ? 'F4F6F7' : 'FFFFFF' },
      line: { color: 'CCCCCC', width: 0.5 },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.7, y: iy, w: 0.18, h: 0.57,
      fill: { color: '2E86C1' },
      line: { color: '2E86C1', width: 0 },
    });
    slide.addText(ind.label, {
      x: 6.95, y: iy + 0.04, w: 5.7, h: 0.24,
      fontSize: 9, bold: true, color: COLORS.textBody,
    });
    slide.addText('→ ' + ind.trigger, {
      x: 6.95, y: iy + 0.3, w: 5.7, h: 0.22,
      fontSize: 8.5, color: COLORS.textSub,
    });
  });

  slide.addText('출처: 00-synthesis.md §9, §11', {
    x: 0.6, y: 7.15, w: 12.13, h: 0.22,
    fontSize: 8, color: COLORS.textSub, italic: true,
  });

  addPageNumber(slide, 27, TOTAL_SLIDES);
}

// ─────────────────────────────────────────────────────────────
// 슬라이드 28: [Closing] 핵심 메시지 + 행동 촉구
// ─────────────────────────────────────────────────────────────
function slide28_closing() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'AI 도구는 이미 왔다. 문제는 "도입 여부"가 아니라 "통제된 도입"이다');

  // 부제
  slide.addText('5가지 핵심 발견 요약', {
    x: 0.6, y: 1.72, w: 12.13, h: 0.32,
    fontSize: 11.5, bold: true, color: COLORS.primary,
  });

  // 핵심 메시지 5개 — 번호 원 + 텍스트
  const messages = [
    {
      title: 'AI 생산성은 조건부',
      body: '단순 과제 +30~50%, 조직 수준은 프로세스 변화 없이 10~15%가 상한. 도구만 도입하면 안정성이 오히려 7.2% 저하될 수 있다.',
    },
    {
      title: '진짜 병목은 기술이 아니라 거버넌스·프로세스',
      body: '95%가 사용 중임에도 전사 내재화 6.7%. 채택의 장벽은 도구 품질이 아니라 조직 거버넌스와 프로세스 재설계다.',
    },
    {
      title: '수혜 귀속이 비대칭적이다',
      body: '최대 수혜자: 플랫폼 제공자 > AI 조기 채택 대기업 > 시니어 개발자. 주니어 개발자는 기회 자체가 축소 중이며 역할 재정의가 시급하다.',
    },
    {
      title: '4개 시나리오 중 "점진적 통합"이 50~60%',
      body: '그러나 나머지 40~50%도 무시 불가. 기준 시나리오 중심 설계 + 규제·정체 방어 내장 + 수요폭발 업사이드 유지가 최선의 포트폴리오 전략이다.',
    },
    {
      title: '가장 위험한 오판은 "아무것도 하지 않는 것"',
      body: '기술 정체(시나리오 D) 확률은 10~15%에 불과. 지금 파일럿을 시작하지 않으면 3개월 후 경쟁사와 학습 격차가 돌이킬 수 없이 벌어진다.',
    },
  ];

  const msgColors = ['2E86C1', '1E8449', '8E44AD', 'B7950B', 'CB4335'];

  messages.forEach((msg, i) => {
    const my = 2.12 + i * 0.95;
    const mc = msgColors[i];

    // 번호 원
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.6, y: my, w: 0.46, h: 0.46,
      fill: { color: mc },
      line: { color: mc, width: 0 },
    });
    slide.addText(String(i + 1), {
      x: 0.6, y: my, w: 0.46, h: 0.46,
      fontSize: 13, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle',
    });

    // 배경
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.18, y: my, w: 11.55, h: 0.82,
      fill: { color: 'F8F9FA' },
      line: { color: mc, width: 1 },
    });
    // 좌측 강조 바
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.18, y: my, w: 0.14, h: 0.82,
      fill: { color: mc },
      line: { color: mc, width: 0 },
    });

    slide.addText(msg.title, {
      x: 1.4, y: my + 0.06, w: 11.2, h: 0.28,
      fontSize: 10.5, bold: true, color: mc,
    });
    slide.addText(msg.body, {
      x: 1.4, y: my + 0.38, w: 11.2, h: 0.38,
      fontSize: 9, color: COLORS.textBody, wrap: true,
    });
  });

  // 행동 촉구 하단 바
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 6.88, w: 12.13, h: 0.52,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, width: 0 },
  });
  slide.addText(
    '지금 할 것:  파일럿 시작  |  거버넌스 수립  |  프로세스 재설계  |  역할 재정의 설계  |  선행지표 모니터링',
    {
      x: 0.7, y: 6.9, w: 12.0, h: 0.48,
      fontSize: 11, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle',
    }
  );

  // 페이지 번호 — Closing 슬라이드에도 추가
  addPageNumber(slide, 28, TOTAL_SLIDES);
}

// ============================================================
// === 실행 (Part C에서 전체 호출) ===
// ============================================================

// Part A 슬라이드
slide01_title();
slide02_section_situation();
slide03_adoption_rate();
slide04_productivity_range();
slide05_agentic_coding();
slide06_platform_war();
slide07_security_debt();
slide08_org_impact();
slide09_section_signal();
slide10_signal_register();

// Part B 슬라이드
slide11_security_detail();
slide12_shadow_ai();
slide13_eu_ai_act();
slide14_developer_demand();
slide15_junior_vs_senior();
slide16_section_scenario();
slide17_productivity_paradox();
slide18_unexpected_findings();
slide19_section_strategy();

// Part C 슬라이드
slide20_scenarios();
slide21_scenario_comparison();
slide22_strategy_options();
slide23_process_redesign();
slide24_individual_strategy();
slide25_roadmap();
slide26_korea_context();
slide27_risk_monitoring();
slide28_closing();

pptx.writeFile({
  fileName: 'presentation-build/2026-03-25-ai-dev-tools-future-workplace/AI-Dev-Tools-Future-Workplace.pptx',
})
  .then(() => console.log('생성 완료'))
  .catch((err) => console.error('오류:', err));

// === Part C 끝 ===
