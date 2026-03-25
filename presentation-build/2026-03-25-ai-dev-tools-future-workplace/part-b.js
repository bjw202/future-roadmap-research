// === Part B: 슬라이드 11~19 ===
// 상수/헬퍼는 Part A에 정의됨. 여기서는 슬라이드 함수만 작성.

// ---------------------------------------------------------------------------
// Slide 11 — [Content] AI 코드 보안 부채가 조용히 누적되고 있다
// 출처: 90-signal-register.md 신호6, 00-synthesis.md 섹션4
// ---------------------------------------------------------------------------
function slide11_security_debt() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'AI 코드 보안 부채가 조용히 누적되고 있다');

  // ── 경고 배너 ──────────────────────────────────────────────────────────
  slide.addShape('rect', {
    x: 0.6, y: 1.85, w: 12.13, h: 0.45,
    fill: { color: COLORS.accent },
    line: { color: COLORS.accent, pt: 0 },
  });
  slide.addText('신호 강도: 강 | 잠재 폭발 시점: 12~24개월', {
    x: 0.6, y: 1.85, w: 12.13, h: 0.45,
    fontSize: 11, bold: true, color: COLORS.bg,
    align: 'center', valign: 'middle',
    fontFace: FONTS.body,
  });

  // ── 핵심 수치 3개 (상단 카드 행) ────────────────────────────────────
  const statCards = [
    { pct: '45%',  label: 'AI 생성 코드 샘플에서\nOWASP Top 10 취약점 발생', src: 'Veracode 2025' },
    { pct: '62%',  label: 'AI 생성 코드에\n설계 결함 또는 알려진\n보안 취약점 포함',   src: 'Veracode 2025' },
    { pct: '40%',  label: 'AI 코드 프로젝트가\n2027년까지 비용 초과·\n가치 불명확으로 취소 예측', src: 'Gartner 예측' },
  ];

  const cardW = 3.7;
  const cardH = 1.75;
  const cardY = 2.45;
  const cardXs = [0.6, 4.55, 8.5];

  statCards.forEach((c, i) => {
    slide.addShape('rect', {
      x: cardXs[i], y: cardY, w: cardW, h: cardH,
      fill: { color: COLORS.bg_secondary },
      line: { color: COLORS.border, pt: 1 },
    });
    slide.addText(c.pct, {
      x: cardXs[i], y: cardY + 0.12, w: cardW, h: 0.7,
      fontSize: 36, bold: true, color: COLORS.accent,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
    slide.addText(c.label, {
      x: cardXs[i] + 0.15, y: cardY + 0.82, w: cardW - 0.3, h: 0.65,
      fontSize: 11, color: COLORS.text,
      align: 'center', valign: 'top', fontFace: FONTS.body,
    });
    slide.addText(c.src, {
      x: cardXs[i], y: cardY + 1.52, w: cardW, h: 0.2,
      fontSize: 9, color: COLORS.text_muted, italic: true,
      align: 'center', fontFace: FONTS.body,
    });
  });

  // ── 핵심 메커니즘 설명 블록 ─────────────────────────────────────────
  const bullets = [
    { text: '대량 생성이 총 취약점 노출면 확대', indent: false },
    { text: '개별 코드 품질보다 볼륨 증가가 핵심 리스크 — 보안 파이프라인 없이 생산성만 추구하면 순손실', indent: true },
    { text: '프롬프트 붕괴(Prompt Decay): 장기 실행 에이전트에서 보안 에이전트가 500회 이상 검토 후 임계 문제 조용히 누락', indent: false },
    { text: 'IDEsaster: Cursor IDE·GitHub Copilot에서 CVE 등 실제 익스플로잇 취약점 사례 보고', indent: false },
    { text: '인간 작성 코드 대비 비교치 부재 — "45%" 수치는 방향 지표로만 해석 요망', indent: true },
  ];

  const bulletY = 4.38;
  const lineH = 0.34;
  bullets.forEach((b, i) => {
    const prefix = b.indent ? '    ↳ ' : '• ';
    slide.addText(prefix + b.text, {
      x: 0.6, y: bulletY + i * lineH, w: 12.13, h: lineH,
      fontSize: b.indent ? 11 : 12,
      color: b.indent ? COLORS.text_muted : COLORS.text,
      fontFace: FONTS.body,
    });
  });

  // ── 전환 트리거 ─────────────────────────────────────────────────────
  slide.addShape('rect', {
    x: 0.6, y: 6.12, w: 12.13, h: 0.52,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.border, pt: 1 },
  });
  slide.addText('전환 트리거: Fortune 500에서 AI 생성 코드 취약점 기반 대형 보안 침해 사고가 공개 발생 | 규제 당국 필수 보안 감사 의무화', {
    x: 0.65, y: 6.12, w: 12.03, h: 0.52,
    fontSize: 10.5, color: COLORS.text, fontFace: FONTS.body,
    align: 'left', valign: 'middle',
  });

  addPageNumber(slide, 11, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 12 — [Quote] AI는 기존 조직의 강점과 약점을 증폭시키는 '증폭기'다
// 출처: 03-preparation-strategy.md 섹션3.3 (DORA 2025)
// ---------------------------------------------------------------------------
function slide12_dora_amplifier() {
  const slide = pptx.addSlide();

  // 풀블리드 배경
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.bg_secondary, pt: 0 },
  });

  // 상단 장식 선
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 0.06,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, pt: 0 },
  });

  // 인용 출처 태그
  slide.addText('DORA 2025 · Google State of AI-assisted Software Development', {
    x: 1.0, y: 0.45, w: 11.33, h: 0.35,
    fontSize: 12, color: COLORS.primary, bold: true,
    align: 'center', fontFace: FONTS.body,
  });

  // 인용문
  slide.addText(
    '"AI는 기존 조직의 강점과 약점을 증폭시키는 \'증폭기\'다.\n잘 작동하는 조직은 더 잘 되고, 문제 있는 조직은 더 악화된다."',
    {
      x: 1.2, y: 1.1, w: 10.93, h: 2.2,
      fontSize: 24, bold: true, color: COLORS.text,
      align: 'center', valign: 'middle',
      fontFace: FONTS.quote,
      paraSpaceAfter: 6,
    }
  );

  // 구분선
  slide.addShape('rect', {
    x: 3.5, y: 3.42, w: 6.33, h: 0.04,
    fill: { color: COLORS.border },
    line: { color: COLORS.border, pt: 0 },
  });

  // 부제: 7가지 역량
  slide.addText('AI 효과를 조직 성과로 연결하는 7가지 역량 (DORA 2025)', {
    x: 1.0, y: 3.6, w: 11.33, h: 0.38,
    fontSize: 13, bold: true, color: COLORS.primary,
    align: 'center', fontFace: FONTS.body,
  });

  const capabilities = [
    '① 명확한 AI 입장 (AI Stance)',
    '② 건강한 데이터 생태계',
    '③ AI 접근 가능한 내부 데이터',
    '④ 강력한 버전 관리 체계',
    '⑤ 소규모 배치 작업 문화',
    '⑥ 사용자 중심 집중',
    '⑦ 우수한 내부 플랫폼',
  ];

  // 7개 역량 — 두 줄로 배치 (4 + 3)
  const row1 = capabilities.slice(0, 4);
  const row2 = capabilities.slice(4);
  const capW = 2.85;
  const capH = 0.62;

  row1.forEach((cap, i) => {
    const x = 0.6 + i * (capW + 0.12);
    slide.addShape('rect', {
      x, y: 4.12, w: capW, h: capH,
      fill: { color: COLORS.bg },
      line: { color: COLORS.primary, pt: 1 },
    });
    slide.addText(cap, {
      x, y: 4.12, w: capW, h: capH,
      fontSize: 11, color: COLORS.text,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
  });

  const row2StartX = 0.6 + (13.33 - 0.6 - 0.6 - (row2.length * capW + (row2.length - 1) * 0.12)) / 2;
  row2.forEach((cap, i) => {
    const x = row2StartX + i * (capW + 0.12);
    slide.addShape('rect', {
      x, y: 4.88, w: capW, h: capH,
      fill: { color: COLORS.bg },
      line: { color: COLORS.primary, pt: 1 },
    });
    slide.addText(cap, {
      x, y: 4.88, w: capW, h: capH,
      fontSize: 11, color: COLORS.text,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
  });

  // 함의
  slide.addText('→ 도구 도입 전 조직 체력 점검이 선행되어야 한다', {
    x: 1.0, y: 5.72, w: 11.33, h: 0.4,
    fontSize: 13, bold: true, color: COLORS.accent,
    align: 'center', fontFace: FONTS.body,
  });

  // 하단 장식 선
  slide.addShape('rect', {
    x: 0, y: 7.44, w: 13.33, h: 0.06,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, pt: 0 },
  });

  addPageNumber(slide, 12, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 13 — [Table] 수혜는 비대칭적으로 귀속된다: 플랫폼 > 대기업 > 시니어 > 주니어
// 출처: 00-synthesis.md 섹션4
// ---------------------------------------------------------------------------
function slide13_asymmetric_benefit() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '수혜는 비대칭적으로 귀속된다: 플랫폼 > 대기업 > 시니어 > 주니어');

  // 서브타이틀
  slide.addText('AI 개발 도구 시대의 최대 수혜자는 누구인가 — 00-synthesis.md 섹션 4 핵심 발견', {
    x: 0.6, y: 1.82, w: 12.13, h: 0.3,
    fontSize: 11, color: COLORS.text_muted, italic: true, fontFace: FONTS.body,
  });

  // 수혜 귀속 비교 표
  const tableRows = [
    [
      { text: '수혜 주체', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '핵심 이익', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '대표 지표', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '리스크 / 과제', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
    ],
    [
      { text: '플랫폼 제공자\n(Anthropic / Microsoft / Anysphere)', options: { bold: true, color: COLORS.accent } },
      { text: 'AI 도구 구독 수익 + 생태계 Lock-in', options: {} },
      { text: 'ARR $10억~$20억 (각사)', options: { bold: true } },
      { text: '경쟁 격화, 오픈소스 대안 부상', options: {} },
    ],
    [
      { text: 'AI 조기 채택 대기업', options: { bold: true, color: COLORS.primary } },
      { text: '자체 코드베이스 파인튜닝 → 경쟁 우위 확보', options: {} },
      { text: '상위 사분위: 65%+ 일일 사용 → 15%+ 속도 향상', options: { bold: true } },
      { text: '거버넌스 없으면 기술 부채 폭발', options: {} },
    ],
    [
      { text: '시니어 개발자', options: { bold: true, color: COLORS.primary } },
      { text: 'AI를 레버리지로 활용 → 생산량 급증', options: {} },
      { text: 'GitHub Copilot 사용 시 22% 속도 향상', options: { bold: true } },
      { text: '일부 환경에서 -19% (복잡 과제·METR 2025)', options: {} },
    ],
    [
      { text: '주니어 개발자', options: { bold: true, color: COLORS.accent } },
      { text: 'AI 도구 사용은 가능하나 기회 자체가 축소', options: {} },
      { text: '4% 속도 향상 / 신규 채용 13~50% 감소', options: { bold: true, color: COLORS.accent } },
      { text: '역할 재정의 없이는 진입 경로 협소화', options: {} },
    ],
  ];

  const colW = [3.1, 3.3, 3.1, 2.63];
  addTitledTable(slide, null, tableRows, colW, { x: 0.6, y: 2.2 });

  // 핵심 인사이트 박스
  slide.addShape('rect', {
    x: 0.6, y: 5.82, w: 12.13, h: 0.72,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent, pt: 2 },
  });
  slide.addText(
    '핵심: "AI 도구 시대의 가장 날카로운 질문은 어떤 도구를 쓸 것인가가 아니라, 수혜가 누구에게 귀속되는가이다." — 00-synthesis.md',
    {
      x: 0.75, y: 5.82, w: 11.83, h: 0.72,
      fontSize: 12, bold: false, color: COLORS.text,
      align: 'left', valign: 'middle', fontFace: FONTS.body,
    }
  );

  addPageNumber(slide, 13, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 14 — [Section] 미래 일터는 어떻게 변화하는가 (파트 3)
// ---------------------------------------------------------------------------
function slide14_section_future_work() {
  const slide = pptx.addSlide();

  // 풀블리드 배경
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, pt: 0 },
  });

  // 파트 레이블
  slide.addText('Part 3', {
    x: 0, y: 2.0, w: 13.33, h: 0.55,
    fontSize: 16, color: COLORS.bg, bold: false,
    align: 'center', fontFace: FONTS.body,
    transparency: 40,
  });

  // 섹션 타이틀
  slide.addText('미래 일터는\n어떻게 변화하는가', {
    x: 0.8, y: 2.62, w: 11.73, h: 2.0,
    fontSize: 44, bold: true, color: COLORS.bg,
    align: 'center', valign: 'middle',
    fontFace: FONTS.body,
    paraSpaceAfter: 8,
  });

  // 서브 키워드
  const keywords = ['팀 규모', '역할 전환', '산업 파급', '고용 구조'];
  const kwW = 2.5;
  const kwTotal = keywords.length * kwW + (keywords.length - 1) * 0.25;
  const kwStartX = (13.33 - kwTotal) / 2;
  keywords.forEach((kw, i) => {
    const x = kwStartX + i * (kwW + 0.25);
    slide.addShape('rect', {
      x, y: 5.0, w: kwW, h: 0.48,
      fill: { color: '000000', transparency: 60 },
      line: { color: COLORS.bg, pt: 1 },
    });
    slide.addText(kw, {
      x, y: 5.0, w: kwW, h: 0.48,
      fontSize: 13, color: COLORS.bg, bold: false,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
  });

  // 하단 장식 선
  slide.addShape('rect', {
    x: 0, y: 7.44, w: 13.33, h: 0.06,
    fill: { color: COLORS.bg },
    line: { color: COLORS.bg, pt: 0 },
  });
}

// ---------------------------------------------------------------------------
// Slide 15 — [Content] 소프트웨어 팀은 이미 축소되고 있다
// 출처: 02-industry-impact-future-work.md 섹션1.1
// ---------------------------------------------------------------------------
function slide15_team_shrinking() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '소프트웨어 팀은 이미 축소되고 있다');

  // 서브타이틀
  slide.addText('실증 사례와 산업 전망 — 02-industry-impact-future-work.md 섹션 1.1', {
    x: 0.6, y: 1.82, w: 12.13, h: 0.28,
    fontSize: 11, color: COLORS.text_muted, italic: true, fontFace: FONTS.body,
  });

  // ── 3개 사례 카드 (상단) ────────────────────────────────────────────
  const cases = [
    {
      label: '헬스케어 기업 사례',
      before: '10인\n개발팀',
      after: '3인 팀',
      desc: '제품 오너 + AI 프롬팅 가능 개발자\n+ 시스템 아키텍트',
      src: 'Fortune 보도 [중간 - 단일 사례]',
      highlight: true,
    },
    {
      label: 'Pragmatic Engineer 설문',
      before: '2인 피자 팀\n(6~10인)',
      after: '1인 피자 팀\n(3~4인)',
      desc: '농업 분야 200년 기업 엔지니어링 리더 발언\n"더 적게, 더 많은 것을 창출"',
      src: 'Pragmatic Engineer Newsletter [중간]',
      highlight: false,
    },
    {
      label: 'Gartner 전망 (2030)',
      before: '대규모\n소프트웨어 팀',
      after: '80%\n기업 전환',
      desc: '소규모 AI-증강 팀으로 전환\n※ 방향성 지표로만 활용 (장기 예측 불확실)',
      src: 'Gartner / Deloitte 2026 Outlook [낮음]',
      highlight: false,
    },
  ];

  const cardW = 3.8;
  const cardH = 2.7;
  const cardY = 2.18;
  const cardXs = [0.6, 4.67, 8.73];

  cases.forEach((c, i) => {
    const borderColor = c.highlight ? COLORS.accent : COLORS.border;
    slide.addShape('rect', {
      x: cardXs[i], y: cardY, w: cardW, h: cardH,
      fill: { color: COLORS.bg_secondary },
      line: { color: borderColor, pt: c.highlight ? 2 : 1 },
    });
    // 레이블
    slide.addText(c.label, {
      x: cardXs[i], y: cardY + 0.1, w: cardW, h: 0.3,
      fontSize: 11, bold: true, color: COLORS.primary,
      align: 'center', fontFace: FONTS.body,
    });
    // Before → After
    slide.addText(c.before, {
      x: cardXs[i] + 0.15, y: cardY + 0.48, w: 1.35, h: 0.75,
      fontSize: 14, bold: true, color: COLORS.text_muted,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
    slide.addText('→', {
      x: cardXs[i] + 1.6, y: cardY + 0.48, w: 0.55, h: 0.75,
      fontSize: 20, bold: true, color: COLORS.primary,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
    slide.addText(c.after, {
      x: cardXs[i] + 2.2, y: cardY + 0.48, w: 1.45, h: 0.75,
      fontSize: 18, bold: true, color: c.highlight ? COLORS.accent : COLORS.primary,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
    // 설명
    slide.addText(c.desc, {
      x: cardXs[i] + 0.1, y: cardY + 1.32, w: cardW - 0.2, h: 0.88,
      fontSize: 10.5, color: COLORS.text,
      align: 'center', valign: 'top', fontFace: FONTS.body,
    });
    // 출처
    slide.addText(c.src, {
      x: cardXs[i], y: cardY + 2.44, w: cardW, h: 0.22,
      fontSize: 9, color: COLORS.text_muted, italic: true,
      align: 'center', fontFace: FONTS.body,
    });
  });

  // ── Atlassian 인용 ──────────────────────────────────────────────────
  slide.addShape('rect', {
    x: 0.6, y: 5.08, w: 12.13, h: 0.75,
    fill: { color: COLORS.bg },
    line: { color: COLORS.primary, pt: 1 },
  });
  slide.addText(
    '"일부 팀은 코드를 사실상 한 줄도 직접 작성하지 않는다. 모두 에이전트 오케스트레이션이다.\n결과적으로 팀이 작아지는 게 아니라 2~5배 더 많은 것을 창출한다." — Atlassian 엔지니어링 리더',
    {
      x: 0.75, y: 5.08, w: 11.83, h: 0.75,
      fontSize: 11, color: COLORS.text, italic: true,
      align: 'left', valign: 'middle', fontFace: FONTS.body,
    }
  );

  // ── 수치 투명성 주석 ─────────────────────────────────────────────────
  slide.addText(
    '* Gartner 80% 수치는 B2B 대기업 설문 기반. 스타트업·중소기업은 채택 속도 상이. AI 코드 품질 신뢰도 45% 기업 우려 시 팀 축소 속도 둔화 가능.',
    {
      x: 0.6, y: 5.97, w: 12.13, h: 0.38,
      fontSize: 10, color: COLORS.text_muted, italic: true,
      align: 'left', fontFace: FONTS.body,
    }
  );

  addPageNumber(slide, 15, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 16 — [TwoColumn] 주니어 고용은 감소하지만, 전체 개발자 수요는 증가한다
// 출처: 02-industry-impact-future-work.md 섹션1.2
// ---------------------------------------------------------------------------
function slide16_junior_vs_total() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '주니어 고용은 감소하지만, 전체 개발자 수요는 증가한다');

  // 컬럼 구분선
  const divX = COL_LEFT_X + COL_W + 0.18;
  slide.addShape('rect', {
    x: divX, y: 1.85, w: 0.03, h: 5.0,
    fill: { color: COLORS.border },
    line: { color: COLORS.border, pt: 0 },
  });

  // ── 좌: 주니어 고용 감소 ───────────────────────────────────────────
  slide.addText('주니어 개발자 고용 감소', {
    x: COL_LEFT_X, y: 1.87, w: COL_W, h: 0.38,
    fontSize: 14, bold: true, color: COLORS.accent,
    align: 'center', fontFace: FONTS.body,
  });

  const leftStats = [
    { val: '13%', label: 'AI 노출 직군 22~25세 초기 경력자\n고용 감소 (2022~2025)', src: 'Stanford 2025 [높음]' },
    { val: '50%', label: '빅테크 신규 졸업자 채용 감소\n(최근 3년)', src: 'Rest of World [중간]' },
    { val: '31%', label: '한국 대기업 신입 공채 축소\n(AI 네이티브 경력직 전환)', src: '00-synthesis.md' },
  ];

  leftStats.forEach((s, i) => {
    const y = 2.38 + i * 1.35;
    slide.addShape('rect', {
      x: COL_LEFT_X, y, w: COL_W, h: 1.22,
      fill: { color: COLORS.bg_secondary },
      line: { color: COLORS.accent, pt: 1 },
    });
    slide.addText(s.val + ' 감소', {
      x: COL_LEFT_X, y: y + 0.05, w: COL_W, h: 0.48,
      fontSize: 28, bold: true, color: COLORS.accent,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
    slide.addText(s.label, {
      x: COL_LEFT_X + 0.1, y: y + 0.54, w: COL_W - 0.2, h: 0.44,
      fontSize: 10.5, color: COLORS.text,
      align: 'center', valign: 'top', fontFace: FONTS.body,
    });
    slide.addText(s.src, {
      x: COL_LEFT_X, y: y + 1.0, w: COL_W, h: 0.19,
      fontSize: 9, color: COLORS.text_muted, italic: true,
      align: 'center', fontFace: FONTS.body,
    });
  });

  // ── 우: 전체 수요 증가 ─────────────────────────────────────────────
  slide.addText('전체 개발자 수요 증가', {
    x: COL_RIGHT_X, y: 1.87, w: COL_W, h: 0.38,
    fontSize: 14, bold: true, color: COLORS.primary,
    align: 'center', fontFace: FONTS.body,
  });

  const rightStats = [
    { val: '17.9%', label: 'BLS 소프트웨어 개발자 고용 성장\n예측 (2023~2033)', src: 'BLS [높음]' },
    { val: '+수요 폭발', label: 'AI가 진입장벽 낮춰 더 많은 산업에\n소프트웨어 침투 → 전체 수요 증가', src: 'WEF Future of Jobs 2025' },
    { val: '총량↑ 구성↔', label: '"총 수요 증가 + 구성 변화"\n(주니어 비중 감소, 시니어/AI 전문가 증가)', src: '00-synthesis.md 상충점 해결' },
  ];

  rightStats.forEach((s, i) => {
    const y = 2.38 + i * 1.35;
    slide.addShape('rect', {
      x: COL_RIGHT_X, y, w: COL_W, h: 1.22,
      fill: { color: COLORS.bg_secondary },
      line: { color: COLORS.primary, pt: 1 },
    });
    slide.addText(s.val, {
      x: COL_RIGHT_X, y: y + 0.05, w: COL_W, h: 0.48,
      fontSize: 22, bold: true, color: COLORS.primary,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
    slide.addText(s.label, {
      x: COL_RIGHT_X + 0.1, y: y + 0.54, w: COL_W - 0.2, h: 0.44,
      fontSize: 10.5, color: COLORS.text,
      align: 'center', valign: 'top', fontFace: FONTS.body,
    });
    slide.addText(s.src, {
      x: COL_RIGHT_X, y: y + 1.0, w: COL_W, h: 0.19,
      fontSize: 9, color: COLORS.text_muted, italic: true,
      align: 'center', fontFace: FONTS.body,
    });
  });

  // ── 하단 종합 메시지 ─────────────────────────────────────────────────
  slide.addShape('rect', {
    x: 0.6, y: 6.48, w: 12.13, h: 0.48,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, pt: 0 },
  });
  slide.addText(
    '해석: 주니어 대량 해고는 잘못된 전략 — "채용 축소보다 역할 재정의로 대응"이 정답 (00-synthesis.md 역방향 의사결정 가이드)',
    {
      x: 0.75, y: 6.48, w: 11.83, h: 0.48,
      fontSize: 11, bold: true, color: COLORS.bg,
      align: 'left', valign: 'middle', fontFace: FONTS.body,
    }
  );

  addPageNumber(slide, 16, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 17 — [Cards] 개발자 역할이 코딩에서 오케스트레이션으로 전환 중이다
// 출처: 02-industry-impact-future-work.md 섹션2, 90-signal-register.md 신호7
// ---------------------------------------------------------------------------
function slide17_role_transition() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '개발자 역할이 코딩에서 오케스트레이션으로 전환 중이다');

  // 서브타이틀
  slide.addText('02-industry-impact-future-work.md 섹션 2 · 90-signal-register.md 신호 7', {
    x: 0.6, y: 1.82, w: 12.13, h: 0.28,
    fontSize: 11, color: COLORS.text_muted, italic: true, fontFace: FONTS.body,
  });

  // ── 4개 역할 카드 (2×2) ─────────────────────────────────────────────
  const roleCards = [
    {
      icon: '①',
      title: 'AI 감독 & 오케스트레이션',
      desc: '에이전트 방향 설정, 결과물 검증,\n품질 보증 — AI를 자동조종이 아닌\n페어 프로그래머로 운용',
    },
    {
      icon: '②',
      title: '시스템 아키텍처 설계',
      desc: 'AI가 실행하는 복잡 시스템의\n전체 구조 설계 — AI 확장 시대의\n핵심 인간 역량',
    },
    {
      icon: '③',
      title: '도메인 전문성 × AI 융합',
      desc: '금융·의료·법률·제조 등 특정 산업\n맥락에서 AI를 적용\n— AI가 모르는 암묵적 지식 보유',
    },
    {
      icon: '④',
      title: '"빌더" 역할 부상',
      desc: '문제 발견부터 AI 활용 구현까지\n전 과정을 1인이 담당\n(SF Standard 2026: "Everyone\'s a Builder")',
    },
  ];

  const cW = CARD_2X2.w;
  const cH = CARD_2X2.h;
  const positions = [
    { x: CARD_2X2.x1, y: CARD_2X2.y1 },
    { x: CARD_2X2.x2, y: CARD_2X2.y1 },
    { x: CARD_2X2.x1, y: CARD_2X2.y2 },
    { x: CARD_2X2.x2, y: CARD_2X2.y2 },
  ];

  roleCards.forEach((card, i) => {
    const { x, y } = positions[i];
    addCard(slide, x, y, cW, cH, card.icon, card.title, card.desc);
  });

  // ── 부상 직무 & 신호 배너 ────────────────────────────────────────────
  slide.addShape('rect', {
    x: 0.6, y: 6.32, w: 12.13, h: 0.56,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.primary, pt: 1 },
  });
  slide.addText(
    '부상 직무 (신호 7) — AI Agent Architect: $140K~$225K  |  Agentic AI Specialist: $100K~$180K  |  RAG Engineer: $110K~$180K  |  AI 엔지니어 직무 YoY +143%',
    {
      x: 0.75, y: 6.32, w: 11.83, h: 0.56,
      fontSize: 10.5, color: COLORS.text,
      align: 'left', valign: 'middle', fontFace: FONTS.body,
    }
  );

  addPageNumber(slide, 17, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 18 — [Table] 비소프트웨어 산업에서도 AI 파급이 빠르게 확산 중이다
// 출처: 02-industry-impact-future-work.md 섹션3
// ---------------------------------------------------------------------------
function slide18_industry_spread() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '비소프트웨어 산업에서도 AI 파급이 빠르게 확산 중이다');

  // 서브타이틀
  slide.addText('채택 병목은 공통적으로 기술이 아닌 거버넌스·데이터·조직 변화관리 — 02-industry-impact-future-work.md 섹션 3', {
    x: 0.6, y: 1.82, w: 12.13, h: 0.28,
    fontSize: 11, color: COLORS.text_muted, italic: true, fontFace: FONTS.body,
  });

  // 산업별 테이블
  const tableRows = [
    [
      { text: '산업', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '주요 AI 적용 영역', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '핵심 성과 지표', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '핵심 병목', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
      { text: '신뢰도', options: { bold: true, color: COLORS.bg, fill: COLORS.primary } },
    ],
    [
      { text: '제조', options: { bold: true } },
      { text: '예측 유지보수, 디지털 트윈, AI 품질 검사', options: {} },
      { text: '가동중단 비용 50% 감소\n유지보수 비용 30% 절감', options: {} },
      { text: '레거시 장비, 안전 규제', options: {} },
      { text: '[중간]', options: { color: COLORS.text_muted, italic: true } },
    ],
    [
      { text: '금융', options: { bold: true } },
      { text: '반복 데이터 처리·예측 분석 자동화', options: {} },
      { text: 'McKinsey: 64%가 비용·수익 개선 보고', options: {} },
      { text: '규제 준수, 감사 추적, 할루시네이션', options: {} },
      { text: '[중간~높음]', options: { color: COLORS.text_muted, italic: true } },
    ],
    [
      { text: '의료', options: { bold: true } },
      { text: '방사선 영상 분석, 진단 보조 AI', options: {} },
      { text: '헬스케어 기업 10인→3인 팀 전환', options: {} },
      { text: 'HIPAA/GDPR, 임상 검증, 의사 신뢰', options: {} },
      { text: '[중간]', options: { color: COLORS.text_muted, italic: true } },
    ],
    [
      { text: '법률', options: { bold: true } },
      { text: '계약 검토, 법률 리서치, 컴플라이언스 분석', options: {} },
      { text: '법률 보조 인력(paralegal) 역할 변화', options: {} },
      { text: '책임 귀속, 오류 비용, 변호사 단체 규제', options: {} },
      { text: '[중간]', options: { color: COLORS.text_muted, italic: true } },
    ],
    [
      { text: '교육', options: { bold: true } },
      { text: 'AI 개인화 학습, 자동 채점, 적응형 커리큘럼', options: {} },
      { text: 'AI 능숙 직원 56% 임금 프리미엄 (PwC 2025)', options: {} },
      { text: '교사 역할 재정의, 스킬 격차 관리', options: {} },
      { text: '[중간]', options: { color: COLORS.text_muted, italic: true } },
    ],
  ];

  const colW = [1.35, 3.2, 3.0, 2.8, 1.4];
  addTitledTable(slide, null, tableRows, colW, { x: 0.6, y: 2.18 });

  // 공통 병목 박스
  slide.addShape('rect', {
    x: 0.6, y: 5.82, w: 12.13, h: 0.56,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent, pt: 2 },
  });
  slide.addText(
    '공통 병목 (전 산업): 기술 성숙도가 아닌 거버넌스 체계 / 고품질 내부 데이터 확보 / 조직 변화관리 역량\n→ 채택 속도는 기술 준비도보다 조직 준비도에 달려 있다',
    {
      x: 0.75, y: 5.82, w: 11.83, h: 0.56,
      fontSize: 11, color: COLORS.text,
      align: 'left', valign: 'middle', fontFace: FONTS.body,
    }
  );

  addPageNumber(slide, 18, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 19 — [Section] 우리는 무엇을 준비해야 하는가 (파트 4)
// ---------------------------------------------------------------------------
function slide19_section_preparation() {
  const slide = pptx.addSlide();

  // 풀블리드 배경
  slide.addShape('rect', {
    x: 0, y: 0, w: 13.33, h: 7.5,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, pt: 0 },
  });

  // 좌측 액센트 바
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.18, h: 7.5,
    fill: { color: COLORS.accent },
    line: { color: COLORS.accent, pt: 0 },
  });

  // 파트 레이블
  slide.addText('Part 4', {
    x: 0.5, y: 2.0, w: 12.33, h: 0.55,
    fontSize: 16, color: COLORS.bg, bold: false,
    align: 'center', fontFace: FONTS.body,
    transparency: 40,
  });

  // 섹션 타이틀
  slide.addText('우리는 무엇을\n준비해야 하는가', {
    x: 0.5, y: 2.62, w: 12.33, h: 2.0,
    fontSize: 44, bold: true, color: COLORS.bg,
    align: 'center', valign: 'middle',
    fontFace: FONTS.body,
    paraSpaceAfter: 8,
  });

  // 서브 키워드
  const keywords = ['개인 역량', '기업 전략', '로드맵', '권고안'];
  const kwW = 2.5;
  const kwTotal = keywords.length * kwW + (keywords.length - 1) * 0.25;
  const kwStartX = (13.33 - kwTotal) / 2;
  keywords.forEach((kw, i) => {
    const x = kwStartX + i * (kwW + 0.25);
    slide.addShape('rect', {
      x, y: 5.0, w: kwW, h: 0.48,
      fill: { color: '000000', transparency: 60 },
      line: { color: COLORS.bg, pt: 1 },
    });
    slide.addText(kw, {
      x, y: 5.0, w: kwW, h: 0.48,
      fontSize: 13, color: COLORS.bg, bold: false,
      align: 'center', valign: 'middle', fontFace: FONTS.body,
    });
  });

  // 하단 장식 선
  slide.addShape('rect', {
    x: 0, y: 7.44, w: 13.33, h: 0.06,
    fill: { color: COLORS.accent },
    line: { color: COLORS.accent, pt: 0 },
  });
}

// === Part B 끝 ===
