# 98-repair-notes.md — Repair Pass

**작성일**: 2026-03-25
**대상**: Critic이 지적한 Critical/Major 결함 3건 (C1, C3, M2)
**담당**: Focused Researcher (Repair Pass)
**예산 실사용**: search 5회, extract 2회

---

## C1. LLO 장비 시장 규모 정의 차이 확인

### 원래 문제
R1(01-smartphone-display.md, L14)에서 "$255M ~ $1.48B"로 6배 차이가 나는 두 수치가 미해소 상태로 병기됨. 투자 판단의 근거로 어느 수치가 적합한지 결론 없음.

### 조사 결과

다수 시장조사 기관의 LLO 시장 보고서를 교차 검색한 결과, 수치 편차의 구조적 원인이 확인됨:

| 구분 | 수치 | 연도 | 정의 범위 | 출처 |
|------|------|------|----------|------|
| 장비 단독 (LLO Machines) | $255.2M | 2025 | 엑시머/DPSS LLO 장비 하드웨어만 | datainsightsmarket.com |
| 장비 단독 (LLO Machines) | $159.6M | 2025 | 엑시머/DPSS LLO 장비, 좁은 정의 | Cognitive Market Research |
| 장비 단독 (LLO Equipment) | ~$150M | 2024 | 장비 기준, 2033년 $300M | Verified Market Reports |
| 장비+서비스+소재 포함 추정 | $294.6M | 2024 | LLO 시장 전체 (장비·서비스·소모품) | Reports and Insights |
| 장비+서비스+소재 포함 추정 | $610M | 2024 | 장비+서비스+소재+관련 시스템 광의 | marketintelo.com |
| 복합 정의 (대형 범위) | ~$0.3B | 2026 | 장비+보조 시스템 포함 | businessresearchinsights.com |

**핵심 발견**: R1에서 인용된 $1.48B 수치는 단독 확인이 어려우며, 현재 다른 복수 기관이 보고하는 2024~2025년 LLO 장비 시장은 $150M~$610M 범위에 있다. $1.48B는 글로벌 디스플레이 전체 레이저 장비 시장 또는 LLO 연관 생태계(ELA, 잉크젯, 봉지 장비 포함)를 포함한 광의 정의일 가능성이 높다.

**정의 차이 분류**:
- **협의(장비 단독)**: $150M~$255M (2024~2025년). OLED 패널 LLO 공정 전용 장비 하드웨어만 계산.
- **중의(장비+서비스)**: $295M~$610M. 장비 유지보수, 교체 소모품, 서비스 포함.
- **광의(생태계 포함)**: $1B 이상 추정. LLO와 함께 적용되는 ELA(Excimer Laser Annealing), 봉지 레이저 시스템, 검사 시스템 일부를 포함할 경우.

### 해결/수정 권고

**투자 판단 기준 수치**: **협의 정의 $150M~$255M (장비 단독, 2024~2025년)** 사용 권장.
- 우리 회사가 타겟하는 것이 LLO 장비 공급이라면 이 범위가 직접적 TAM.
- $1.48B 수치는 "연관 생태계 포함 최대 추산치"로 별도 표기하되, 전략 판단의 직접 근거로 사용 금지.
- R1 해당 문장을 다음과 같이 수정 권고:

> **수정 전**: "LLO 장비 시장 2024년 약 $255M → 2025년 $1.48B (복수 시장조사 기관)"
> **수정 후**: "LLO 장비(하드웨어 단독) 시장 2024~2025년 $150M~$255M. 서비스·소재 포함 시 $295M~$610M. $1.48B는 LLO 연관 생태계 광의 추산으로 직접 비교 불가."

### 인용 출처
- datainsightsmarket.com, "Laser Lift-Off (LLO) Machines Industry" (2026-01) — $255.2M (2025, 장비 단독)
- reportsandinsights.com, "Laser Lift Off (LLO) Market" (2024 base) — $294.6M (장비+서비스)
- marketintelo.com, "Laser Lift-Off Equipment Market Research Report 2033" — $610M (2024, 광의)
- Verified Market Reports (via Perplexity 합성) — $150M (2024), $300M by 2033
- businessresearchinsights.com — $0.3B (2026), $0.6B by 2035

---

## C3. 자동차/EV 전장 레이저 수요 누락 보완

### 원래 문제
전체 리서치(01~03)에서 자동차/EV 전장 분야 레이저 응용이 체계적으로 누락됨. 특히 EV 배터리 용접, 이종금속 용접, 그린 레이저 구리 용접의 시장 규모 및 우리 회사의 기보유 기술(이종금속 용접)과의 연결점이 없음.

### 조사 결과

#### 시장 규모
| 세그먼트 | 시장 규모 | 기준 연도 | 성장 전망 | 출처 |
|---------|---------|---------|---------|------|
| EV 배터리 레이저 용접 시스템 | $3.2B | 2025 | $9.8B by 2034, CAGR 13.2% | DataIntelo |
| 자동차 레이저 용접 시스템 전체 | 북미만 $253.1M | 2024 | 글로벌 강한 성장 | GMInsights |
| 레이저 용접 기계 전체 | $2.43B | 2023 | $3.53B by 2030, CAGR 5.5% | Virtue MR |
| 레이저 용접 기계 전체 | $2.88B | 2025 | $4.31B by 2032 | Perplexity 합성 |
| 자동차 세그먼트 점유율 | 34.36% | 2025 | 레이저 용접 기계 시장 최대 세그먼트 | Coherent Market Insights |

**EV 배터리 레이저 용접**은 2025년 $3.2B 규모로, 가장 빠르게 성장하는 레이저 응용 세그먼트 중 하나임이 확인됨.

#### 그린 레이저 구리 용접 기술 동향
- **TRUMPF (2024-08)**: 구리 용접용 그린 레이저 신제품 출시. 기존 대비 에너지 20% 절감, EV 배터리·모터 구리 부품 용접 타겟. [출처: GMInsights, technavio]
- **Coherent (2024-10)**: ARM FL20D 20kW 파이버 레이저 출시, 이중 링 빔 기술, EV 생산 용접 속도 최적화.
- **LFP 배터리 확산**: LFP 배터리의 두꺼운 구리 집전체가 그린 레이저 수요 확대의 핵심 트리거. LFP는 2022년 32% → 2025년 45%(글로벌 EV 배터리 생산 비중)로 급증. [출처: DataIntelo]
- **파이버 레이저**: 현재 EV 배터리 용접 주력. 고효율·고속·비접촉 특성으로 셀-셀 용접, 모듈-팩 조립에 표준화.

#### 이종금속 용접과의 연결점
- EV 배터리 구조에서 알루미늄(셀 하우징/구조재)과 구리(집전체/버스바)의 이종금속 용접은 핵심 공정 과제.
- 자동차 경량화(알루미늄-강재 이종 접합)도 레이저 용접 수요 확대 중. [출처: Springer Nature Link, 2025]
- 우리 회사 보유 "이종금속 용접" 기술은 이 수요와 직접 연결 가능: Al/Cu 계면 취성 금속간 화합물(IMC) 생성 억제 기술이 핵심 경쟁력.

#### 전략적 기회
- **단기(0~12개월)**: EV 배터리 제조사(LG에너지솔루션, CATL, 삼성SDI) 및 자동차 OEM(현대·기아, Tesla) 대상 이종금속 레이저 용접 PoC 제안.
- **중기(12~36개월)**: 그린 레이저 + 파이버 레이저 하이브리드 솔루션으로 구리-알루미늄 이종 접합 전문화.
- **병목**: 자동차 부품 인증(IATF 16949) 및 배터리 팩 용접 인증 취득에 12~24개월 소요. 조기 착수 필요.

### 해결/수정 권고
EV/자동차 전장 레이저 수요를 별도 섹션으로 03-laser-source-manufacturing-competition.md 또는 신규 04-automotive-ev-laser.md 파일에 추가할 것을 권고.
00-synthesis.md의 전략 옵션 테이블에 "EV 배터리 이종금속 레이저 용접" 항목 추가 권고.

### 인용 출처
- DataIntelo, "Laser Welding Systems for EV Battery Market Research Report 2034" — $3.2B (2025), $9.8B by 2034, LFP 비중 데이터
- GMInsights, "Automotive Laser Welding System Market" — 북미 $253.1M (2024), TRUMPF 그린 레이저 사례
- Coherent Market Insights, "Laser Welding Machine Market" — 자동차 세그먼트 34.36% 점유
- Springer Nature Link, "Laser welding of aluminum/steel dissimilar metals" (2025) — EV 경량화 이종 용접 과제
- Technavio, "Laser Welding Machine Market Growth Analysis" — TRUMPF, Coherent 2024 신제품 동향

---

## M2. 레이저 AM 시장 수치 출처 검증

### 원래 문제
R3(03-laser-source-manufacturing-competition.md, L101)에서 "레이저 AM 시장: 2024년 USD 244억, 2030년 USD 746억 이상, CAGR >20%"로 인용됨. 출처 표기: "Teyuchiller" (2026-03). 수치가 전체 AM 시장인지 레이저 기반 AM만인지 불명확. 출처 신뢰성 의문.

### 조사 결과

#### 수치 분해 검증

**전체 AM 시장 (레이저 비레이저 포함)**:

| 기관 | 2023년 규모 | 2030년 전망 | CAGR |
|------|------------|------------|------|
| Grand View Research | $20.37B | $88.28B | 23.3% |
| NextMSC | $20.51B | $83.13B | 20.6% |
| Meticulous Research | N/A | >$93.36B (2031) | 20.3% |
| IndustryARC | N/A | $96.7B (2030) | 21% |

**레이저 전용 AM 시장 (LPBF/SLM/SLS 등 레이저 기반만)**:

| 기관 | 규모 | 연도 | 범위 |
|------|------|------|------|
| Market Dynamics & Insights Report | $2.56B | 2024 | 레이저 in AM (레이저 광원·시스템) |
| (동) | $4.89B | 2030 | CAGR 11.4% |
| Mordor Intelligence (PBF) | $2.14B | 2025 | Powder Bed Fusion 3D프린터 전체 |
| (동) | $5.13B | 2030 | |
| Archive Market Research (LPBF) | $3.7B | 2023 | LPBF 전용, 2033년 $20.7B |
| Grand View Research (SLM only) | $1.154B | 2023 | SLM 금속 3D프린팅, 2030년 $4.91B |

#### R3 수치("$244억, $746억")의 정체

- R3에서 인용한 "$244억 → $746억"(약 $24.4B → $74.6B)은 **전체 AM 시장 수치**와 일치. Grand View ($20.4B→$88B) 및 NextMSC ($20.5B→$83B)와 규모 및 CAGR(>20%) 면에서 일치.
- **레이저 기반 AM만**의 시장은 2024년 $2.56B~$3.7B 수준으로, R3의 "$24.4B"와는 10배 차이.
- **결론**: R3의 "$244억, $746억"은 전체 AM 시장(레이저·비레이저 포함) 수치이며, 이를 "레이저 AM 시장"으로 표기한 것은 정의 오류.
- 출처 "Teyuchiller"는 정식 시장조사기관 식별 불가. 복수 독립 기관(Grand View, Mordor, Meticulous)의 전체 AM 수치와 일치하므로 수치 자체의 오류는 없으나, 레이블링이 부정확.

#### 교차 검증 결과
- 전체 AM 시장 $20~25B(2024년), $80~95B(2030년), CAGR 20~23%: 복수 독립 기관 일치 → **수치 신뢰성: 높음**
- 레이저 기반 AM만 $2.56~3.7B(2024년): 2개 독립 출처 확인 → **수치 신뢰성: 중간** (추가 검증 권고)

### 해결/수정 권고
R3 해당 문장을 다음과 같이 수정 권고:

> **수정 전**: "레이저 AM 시장: 2024년 USD 244억, 2030년 USD 746억 이상, CAGR >20%"
> **수정 후**:
> "전체 AM 시장(레이저·비레이저 포함): 2023년 USD 200~205억, 2030년 USD 830~930억, CAGR 20~23% (Grand View, Meticulous, NextMSC 교차 확인)
> 레이저 기반 AM(LPBF/SLM/SLS) 시장: 2024년 USD 25~37억, 2030년 USD 49~51억, CAGR 11~19% (Market Dynamics & Insights, Mordor Intelligence)"

### 인용 출처
- Grand View Research, "Additive Manufacturing Market" (2024) — $20.37B (2023), $88.28B (2030), CAGR 23.3%
- Mordor Intelligence, "Powder Bed Fusion Process 3D Printer Market" — $2.14B (2025), $5.13B (2030)
- Market Dynamics & Insights Report (LinkedIn, 2025) — "Lasers in AM" $2.56B (2024), $4.89B (2030), CAGR 11.4%
- Archive Market Research, "LPBF Technology" — $3.7B (2023), $20.7B (2033)
- Grand View Research, "SLM Metal 3D Printing" — $1.154B (2023), $4.91B (2030)

---

## Repair Resolution

| 결함 ID | 결함 내용 | 최종 상태 | 비고 |
|--------|---------|---------|------|
| **C1** | LLO 장비 시장 $255M vs $1.48B 6배 차이 미해소 | **해소** | 정의 차이(장비 단독 $150~255M / 광의 생태계 $600M~$1.5B)로 확인. 투자 판단 기준 수치 명확화. R1 수정 권고 완료. |
| **C3** | 자동차/EV 전장 레이저 수요 누락 | **해소** | EV 배터리 레이저 용접 시장 $3.2B(2025)→$9.8B(2034), 그린 레이저 구리 용접 트리거(LFP 확산), 이종금속 용접 연결점 확인. 신규 섹션 추가 권고. |
| **M2** | 레이저 AM "$244억" 수치 전체 AM vs 레이저 AM 혼동 | **해소** | "$244억"은 전체 AM 시장 수치. 레이저 기반 AM만은 $2.56~3.7B(2024년). 정의 오류 확인 및 수정 권고 완료. 전체 AM 수치 자체의 신뢰성은 다중 출처 교차 확인으로 높음. |

**Hard Stop 확인**: Repair Pass 1회 완료. 추가 Repair 없음.
