# TV·가전·로봇 분야 레이저 기술 현황 및 미래 로드맵

**작성자**: Researcher 2 (TV·가전·로봇 담당)
**작성일**: 2026-03-25
**조사 범위**: TV(LCD/OLED/microLED), 생활가전(세탁기·냉장고·인덕션), 로봇 부품 제조
**비범위**: 스마트폰/소형 디스플레이, 레이저 소스 진화 자체

---

## 1. 현재 레이저 응용 현황

### 1-1. TV — LCD

**현재 응용 [높음]**

| 공정 | 레이저 역할 | 현황 |
|------|------------|------|
| 대면적 글라스 커팅 | 10.5G 기판(3,000mm×3,500mm) 정밀 절단 | 양산 표준 |
| 편광판/필름 가공 | UV/fs 레이저로 슬리팅·트리밍·패터닝 | 양산 적용 |
| 패널 싱귤레이션 | 레이저 스크라이빙 + CO₂ 열응력 분리 | 양산 표준 |

- BOE·Samsung·LG Display 등 주요 LCD 팹에서 100인치 이상 대형 패널 생산 시 기계식 커팅 대비 미세 결함(치핑·마이크로크랙) 35~40% 감소 효과 확인
- 미국 관세 대응으로 LCD OEM 생산기지 이동 가속 중 → 이동한 팹에서 유연한 레이저 장비 재설치 수요 발생 [발행일: 2025-03, Omdia]
- **반증 미발견**: LCD 패널 글라스 커팅에서 레이저가 기계식을 대체한다는 트렌드에 대한 유효한 반증 없음

**핵심 병목**: 글라스 커팅 자체보다 대면적 레이저 에너지 균일도(±5% 이하 요구) 유지가 원가 제약

---

### 1-2. TV — OLED

**현재 응용 [높음]**

| 공정 | 레이저 역할 | 현황 |
|------|------------|------|
| LLO (Laser Lift-Off) | PI/유리 기판 분리, 308nm 엑시머 레이저 | 플렉시블 OLED 표준 공정 |
| ELA (Excimer Laser Annealing) | a-Si → LTPS 변환, 저온폴리실리콘 TFT 형성 | OLED TV 표준 |
| FlexOLED 형상 커팅 | ps/fs 레이저 필라멘테이션 절단 | 플렉시블 패널 양산 |
| 커버글라스 커팅 | CO₂ 레이저 열응력 분리 | 양산 표준 |

**LLO 공정 핵심 정보**:
- 308nm UV 레이저가 PI/유리 계면의 희생층(SCL)을 분해하여 탈리
- Coherent가 주요 LLO 툴 공급사; Philoptics도 SDC 파트너로 개발
- 현행 공정에서 입자 오염이 발생하면 전체 패널 불량 전파 위험 → 희생층 도입으로 수율 near 100% 달성
- **대체 위협**: Omniply Technology의 "Stick & Peel" 방식이 LLO 대비 CAPEX 1/3 수준으로 평가 중 [중간] — TV 패널 팹 검토 단계

**OLED TV 특이점**: LG Display의 WOLED(W-OLED, 유리 기판 고정)는 LLO 불필요, 레이저 역할은 ELA·커팅에 집중. Samsung Display QD-OLED는 2025년 잉크젯 직접 QD 도포 공정 전환 → 캡슐화 레이어 단순화로 레이저 인캡슐레이션 스텝 감소 예측 [발행일: 2024-12, flatpanelshd]

---

### 1-3. TV — micro LED

**현재 응용 [중간] → 급속 성숙 중**

| 공정 | 레이저 기술 | 현황 (2025-2026) |
|------|------------|-----------------|
| 대량 전사 (Mass Transfer) | LIFT(Laser Induced Forward Transfer), LLO 기반 분리 | 파일럿~저량산 |
| 선택적 수리 (Repair) | 레이저 제거 + 단일 칩 재전사 + 레이저 솔더링 | 양산 필수 공정 |
| 칩 다이 분리 | LLO로 GaN 기판 분리 | R&D~파일럿 |
| 인캡슐레이션 | 레이저 보조 봉지 (연구 단계) | R&D |

**주요 현황 [높음]**:
- Q-Pixel Q-Transfer (2025년 7월): 레이저 대량 전사 수율 **>99.9995%** 달성, AR/VR·스마트워치 타겟
- Tianma Microelectronics 전레이저(full-laser) 전사 라인 (2024년 12월 샤먼 완공): 무베젤·무사이즈제한 디스플레이 소량 생산 2025-2026 시작
- Contrel 2세대 LITB(Laser Induced Transfer Bonding): ±1.5μm 정렬 정밀도, 전사+수리 통합 1대, 수율 99.999%
- Fuzhou University 레이저 대면적 광학 전사: 폴리머 잔류물 없음, AR/VR 망막 투영 디스플레이 타겟

**Samsung CES 2026 발표 [높음]**:
- 세계 최초 130인치급 Micro RGB TV (R95H), 140인치 Micro LED TV (Mirror Bezel)
- 83.2인치 Transparent Micro LED: 최대·최고 밝기·최고 투명도 제품, CES Innovation Award 수상
- 2026년 55/65/75/85/100/115인치 Micro RGB 라인업 확장 발표

**수율 병목**: 소비자 경제성을 위해 **99.99%+** 수율 필요하나 현재 99.5~99.8% 수준 → 수리 공정 의존도 높음 [높음]
**반증 탐색**: Apple Watch micro LED 개발 백지화 (2024 초) 사례 → 소형 폼팩터에서 비용/수율 실패 실증. TV(대형 패널)는 타일링 모듈 방식으로 다른 수율 요구치 적용 가능 [중간]

---

### 1-4. 생활가전 — 외관·구조

**현재 응용 [높음]**

| 적용 제품 | 레이저 공정 | 현황 |
|-----------|------------|------|
| 세탁기·건조기 드럼 | 파이버 레이저 심 용접 (0.2mm부터 버트 용접) | 완전 자동화 라인 양산 |
| 스테인리스/알루미늄 외관 | 레이저 텍스처링, 마킹, 색상 처리 | 양산 적용 |
| 냉장고 도어·패널 | 레이저 표면 처리 (접착 준비, 패턴) | 양산 적용 |
| 주방 기기 하우징 | 레이저 커팅·용접 | 양산 표준 |

**세탁기 드럼 용접 구체 사례 [높음]**:
- Coldwater Machine의 Roll-Up & Laser Weld Module: 코일 → 스트레이트너 → 트리밍 프레스 → 롤업 → 레이저 심 용접을 단일 공정으로 통합
- Sares Miramondi 전자동 라인: 세탁기 드럼 사이클타임 **22초/개** (2차 용접 영역 추가 후 12초), 7명 운영, QR코드 추적·심 용접 결함 검사 통합
- Weil Technology: 0.2mm부터 버트 용접 지원, 내면 평활도 확보로 세탁물 손상 방지, CutFusion 방식 적용

**레이저 텍스처링 [높음]**:
- 스테인리스 AISI 430에 나노초 레이저로 크레이터·타원·팔각형 패턴 형성 → 트라이볼로지 개선, 접촉각 최대 150°(소수성) 달성
- 알루미늄 6061: 최적화 레이저 레시피로 그릿 블라스팅·화학 에칭보다 접착 강도 우수, 노화 사이클 후에도 유지
- SCHOTT: 2025년 3월 무광(Matte) 글라스세라믹 쿡탑 직렬 생산 시작 → 프리미엄 가전 디자인 트렌드 지원

**인덕션 쿡탑 결정화 글라스 [중간]**:
- CERAN(SCHOTT)·EuroKera·NEG 등 리튬-알루미노실리케이트 유리세라믹이 쿡탑 유리 시장 ~60% 점유
- 레이저 커팅은 유리세라믹 정밀 절단 표준 방식으로 추정되나, 쿡탑 제조에서의 레이저 공정 구체 사례는 원문 확인 제한적 → [인접 도메인: 일반 유리 가공] 차이: 결정화 글라스는 열충격 저항성이 높아 CO₂ 레이저 스크라이빙 조건이 일반 글라스 대비 더 엄격함
- 수치 투명성: 인덕션 글라스 레이저 가공 조건 수치 미확보, 원문 확인 필요

---

### 1-5. 로봇 부품

**현재 응용 [높음]**

| 로봇 부품 | 레이저 공정 | 현황 |
|-----------|------------|------|
| 경량 합금 구조물 | 파이버 레이저 용접 (Ti/Al/Mg 합금) | 로봇 암 구조체 양산 |
| 스테인리스 하우징 | 레이저 절단·용접 | 양산 표준 |
| 센서 하우징 | 레이저 마이크로 용접 | 양산 적용 |
| CFRP 구조재 | UV 레이저 텍스처링 (접착 결합 준비) | 적용 중 |
| 고조파 감속기 부품 | CNC 정밀 가공 주도, 레이저 보조 | 연구/일부 적용 |

**로봇 부품 레이저 용접 현황 [높음]**:
- 2025년 FABTECH에서 FANUC, Universal Robots 등 로봇+레이저 용접 통합 솔루션 다수 발표
- 파이버 레이저가 티타늄·알루미늄 합금 용접에서 TIG 대비 열변형 최소화, HAZ 감소 → 로봇 관절 부품 경량화 요구에 부합
- 고전력 파이버 레이저(10kW+): 두꺼운 Ti/Al 합금 단일 패스 심용입 용접 가능, 용접부 강도 = 모재 강도 수준
- 협업 로봇(cobot) + 레이저 용접 통합이 중소 제조사로 확산 중 (Universal Robots UR FABTECH 2025 신제품)

**인간형 로봇 부품 수요 구조 [높음]**:
- Tesla Optimus: 로터리 액추에이터 14개, 각 관절에 하모닉 드라이브 사용
- 인간형 로봇 1대당 하모닉 드라이브 14~28개 필요, 전달비 50:1~160:1, 백래시 <20arcsec
- 하모닉 드라이브 시장 2030년 $11.5B 전망, 중국 시장점유율 90%(2026)
- 2025-2026년 인간형 로봇 출하량 13,000~16,000대 → 2027년 누적 100,000대+
- **레이저 관련성**: 하모닉 드라이브 플렉스스플라인(초박벽 컵형 기어) 제조에 레이저 용접·열처리 활용 가능성 높음 [중간] — 원문 직접 확인 미확보

---

## 2. 미래 기술 로드맵

### 2-1. 단기 (0~3개월, ~2026년 6월)

| 영역 | 예상 진행 사항 | 확신도 |
|------|--------------|--------|
| micro LED 수리 라인 | 레이저 수리+재전사 통합 라인 상용화 파일럿 (Tianma, AUO) | [중간] |
| OLED TV LLO | Omniply vs LLO 팹 평가 결과 첫 데이터 확보 | [중간] |
| 세탁기 드럼 용접 | AI 기반 용접 파라미터 자동 최적화 시스템 확산 | [중간] |
| 로봇 레이저 용접 | FANUC·UR 신형 코봇+레이저 용접 셀 상용 출하 | [높음] |

### 2-2. 중기 (3~12개월, 2026년 하반기~2027년)

| 영역 | 예상 진행 사항 | 확신도 |
|------|--------------|--------|
| micro LED TV 양산 | UBI Research: 2027년 full-scale 상용화 시작, 50% CAGR | [중간] |
| Transparent Micro LED | Samsung 83인치 투명 micro LED 제품화 경로 공개 | [중간] |
| 하모닉 드라이브 레이저 가공 | 인간형 로봇 스케일업에 따른 레이저 정밀 가공 수요 급증 | [중간] |
| 가전 외관 개인화 | 레이저 텍스처링 기반 맞춤 표면 처리 서비스 파일럿 | [낮음] |

### 2-3. 장기 (12~36개월, 2027~2028년)

| 영역 | 예상 진행 사항 | 확신도 |
|------|--------------|--------|
| micro LED TV 주류화 | 소형 사이즈(55~85인치) 보급형 진입 시도 | [낮음] |
| 투명 디스플레이-가전 통합 | 냉장고 도어·창문 투명 디스플레이 적용 (레이저 마이크로 LED 봉지/커팅 핵심) | [낮음] |
| 로봇 외피 텍스처링 | 인간형 로봇 외피 소재(실리콘·CFRP) 레이저 텍스처링 적용 가능성 | [낮음] |
| 가전 개인화 표면 처리 | 주문형 레이저 텍스처링/마킹으로 개인화 가전 서비스 | [낮음] |

---

## 3. 기존 보유 기술과의 연결점

| 보유 기술 | TV 분야 연결 | 가전 분야 연결 | 로봇 분야 연결 |
|-----------|------------|--------------|--------------|
| **글라스 가공** | LCD 대면적 커팅, FlexOLED 필라멘테이션 커팅, 커버글라스 | 인덕션 결정화 글라스 커팅·싱귤레이션 | 센서 커버글라스 가공 |
| **LLO** | 플렉시블 OLED PI 기판 분리, micro LED GaN 기판 분리 | 해당 없음 | 해당 없음 |
| **LILE** | micro LED 선택적 전사 보조, 결함 픽셀 제거 수리 | 가전 금속 표면 마킹/패터닝 | 센서 하우징 식별 마킹 |
| **이종금속 용접** | 해당 없음 | 세탁기 드럼(스테인리스+다른 강종), 냉장고 Al+스테인리스 접합 | 로봇 경량화를 위한 Ti/Al 이종 접합 |
| **소재 광흡수성 기반 선택적 제거** | micro LED 대량 전사(공여 기판-LED 계면 선택 제거) | 가전 표면 선택적 색상 마킹 | 로봇 하우징 이종 재질 구분 가공 |

**연결 강도 평가**:
- **가장 강함**: LLO ↔ 플렉시블 OLED/micro LED GaN 분리 (직접 기술 전이 가능)
- **강함**: 이종금속 용접 ↔ 로봇 Ti/Al 경량 구조체 (동일 공정, 다른 소재 조건)
- **확장 필요**: 글라스 가공 ↔ 인덕션 결정화 글라스 (결정화 유리 특성상 추가 공정 최적화 필요)

---

## 4. 핵심 병목과 해결 조건

### Micro LED (TV 분야 최대 병목)

| 병목 | 현재 상태 | 해결 조건 |
|------|----------|----------|
| 대량 전사 수율 | 99.5~99.8% (소비자급 99.99% 미달) | AI 보조 다이 배치 + 레이저 에너지 제어 정밀화 |
| 수리 처리량 | 단일 칩 재전사 속도 한계 | 레이저 솔더링+전사 통합 고속 장비 (Contrel SSMR 등) |
| 적색 LED 효율 | 소형화(10μm 이하)에서 효율 저하 | InGaN 적색 또는 양자점 변환 (레이저 공정과 연동) |
| 공정 표준화 부재 | 제조사별 독자 아키텍처 → 커스텀 장비 비용 과다 | MicroLED Industry Association 표준화 진행 중 |

### OLED TV (LLO 관련)

| 병목 | 현재 상태 | 해결 조건 |
|------|----------|----------|
| LLO 장비 CAPEX | 고가 (Omniply는 1/3 CAPEX 주장) | Omniply 검증 결과 따라 대체 여부 결정 |
| 에너지 균일도 | 대면적 패널에서 ±편차 관리 | 빔 쉐이핑 기술 고도화 |

### 가전 레이저 용접 병목

- **인력 숙련도**: 레이저 용접 파라미터 설정 전문인력 부족 → AI 파라미터 라이브러리로 해결 중
- **공정 유연성**: 다품종 소량 생산 대응 → 모듈형 코봇+레이저 용접 셀로 대응

### 로봇 부품 병목

- **정밀도 vs. 비용**: 하모닉 드라이브 플렉스스플라인 수준의 정밀 레이저 가공은 고비용 → 로봇 대중화 가격 목표($10,000~30,000/대)와 충돌
- **소재 다양화**: PEEK 하모닉 드라이브(경량화) 전환 시 레이저 가공 파라미터 재개발 필요

---

## 5. 경쟁·대체 기술 위협

### Micro LED 전사 경쟁

| 대체 기술 | 개요 | 위협 수준 |
|----------|------|----------|
| VueReal Micro Solid Printing | 비레이저 선택적 전사 | [중간] — 레이저 방식과 병존 가능 |
| 잉크젯 인쇄 (QD 포함) | 대면적 용이, 정밀도 낮음 | [낮음] — TV급 해상도 미달 |
| Omniply (LLO 대체) | LLO 대비 CAPEX 1/3 → 팹 평가 중 | [중간] — TV 패널 팹 채택 여부 주시 필요 |

### 가전 용접 경쟁

| 대체 기술 | 개요 | 위협 수준 |
|----------|------|----------|
| 마찰교반용접(FSW) | 알루미늄 이종 접합에 강점 | [낮음] — 스테인리스 드럼에는 부적합 |
| 플라즈마 용접 | 코봇 적용 확산 중 | [중간] — 레이저 용접과 경쟁/보완 관계 |
| 접착 본딩 | 일부 경량화 부품에 적용 | [낮음] — 고온/진동 환경 가전에는 제한적 |

### 로봇 부품 경쟁

| 대체 기술 | 개요 | 위협 수준 |
|----------|------|----------|
| 금속 3D 프린팅 (LPBF) | 복잡 형상 일체화 | [중간] — 레이저 가공과 하이브리드 가능 |
| 5축 CNC 가공 | 하모닉 드라이브 주류 가공 | [높음] — 레이저는 CNC 보조 역할 현재 |

**반증 탐색**: 가전 레이저 용접이 기존 TIG/MIG 대비 "반드시 우월"한지에 대한 반증 — 다층 코팅 스테인리스에서 레이저 용접 시 코팅 손상 문제 보고 사례 있음; 단, 세탁기 드럼 전용 공정에서는 극복된 것으로 확인 [중간]

---

## 6. 반증 탐색 결과

| 핵심 주장 | 반증 탐색 결과 |
|---------|--------------|
| micro LED TV 2027년 상용화 | Apple Watch micro LED 백지화(2024) → 소형 폼팩터 실패 실증. TV 타일링 방식은 다른 경제성 논리 가능. 그러나 비용 목표 달성 불확실성 존재 |
| 레이저 전사 수율 99.9995% 달성 | Q-Pixel 단일 출처, 독립 검증 미확인 [단일 출처 주의] |
| 레이저 용접이 가전 제조 주류 | 플라즈마 커팅의 코봇 통합이 빠르게 확산 중 → 일부 용접 어플에서 레이저와 경쟁 관계 형성 |
| Transparent Micro LED 가전 통합 | CES 2026에서 컨셉 발표 수준, 양산 일정·비용 구조 미공개 → 로드맵 신뢰도 낮음 |

---

## 7. 실행 연결: 의사결정 포인트

### 즉시 결정 가능 (현재 기술 기반)

1. **세탁기 드럼 레이저 용접 고도화**: 이종금속 용접 기술을 세탁기 드럼(0.2mm급 스테인리스) 버트 용접에 적용 → 사이클타임 20초 이하 목표. 현재 Weil Technology·Coldwater 대비 공정 차별화 가능 영역.

2. **LILE 기술의 micro LED 수리 적용 탐색**: 보유 LILE 기술을 micro LED 결함 픽셀 제거 공정에 적용하는 실험적 검증 → micro LED 패널 수리 공정 장비 시장 진입 기회.

3. **로봇 Ti/Al 이종 접합 솔루션 개발**: 인간형 로봇 스케일업(2027년 누적 10만대)에 대응하여 Ti합금-Al합금 이종 레이저 용접 공정 패키지 개발 선행 투자.

### 3~12개월 검토 필요

4. **LLO 대 Omniply 기술 선택**: Omniply의 팹 평가 결과(2026년 중 예상)를 모니터링하여 차세대 플렉시블 OLED 생산라인 설계 시 LLO 장비 투자 vs. Omniply 채택 결정.

5. **인덕션 결정화 글라스 레이저 가공 원문 검증**: 현재 인덕션 쿡탑 유리세라믹 레이저 가공 조건이 글라스 가공 보유 기술과 직접 호환되는지 확인 → 추가 소재 테스트 필요.

6. **Transparent Micro LED 공정 준비**: Samsung CES 2026 발표 후 투명 micro LED 양산화 일정 확인 → LLO/LILE 결합 인캡슐레이션 공정 준비.

### 보류/관망 필요

7. **로봇 외피 레이저 텍스처링**: 인간형 로봇 시장이 10만대 이상 스케일에 도달하기 전에는 수요 불확실 → 2027년 이후 재검토.

8. **가전 개인화 표면 처리 사업화**: 비즈니스 모델 검증이 선행되어야 함. 레이저 텍스처링 기술 자체는 보유 가능하나 고객 채널·단가 구조 미검증.

---

## 8. 미래 구조 변화 (12~36개월 내)

**변화 1: Micro LED 타일 시장 성숙 → 레이저 전사·수리 장비 업체 과점 구조 형성**
전제: 2027년 삼성·LG·Tianma 등 TV용 micro LED 양산 돌입
촉발 조건: 레이저 전사 수율 99.99% 달성, 소비자 $50,000 이하 제품 출시
반증 조건: 비레이저 방식(VueReal Micro Solid Printing)이 수율·비용에서 동등 성능 입증

**변화 2: 인간형 로봇 부품 수요 급증 → 정밀 레이저 가공이 새로운 생산 병목**
전제: 2027년 인간형 로봇 누적 10만대 이상, 단가 $30,000 이하 진입
촉발 조건: Tesla Optimus·Figure 등 10,000+대/년 양산 공식화
반증 조건: 금속 3D 프린팅이 하모닉 드라이브 부품 가격 경쟁에서 레이저 가공을 대체

**변화 3: 투명 디스플레이 × 가전 통합 → 냉장고/창문 투명 패널 레이저 인캡슐레이션 신규 수요**
전제: Samsung Transparent Micro LED 양산화, 비용 10배 수준 이하로 하락
촉발 조건: LG·Samsung 냉장고 도어 투명 디스플레이 내장 제품 출시
반증 조건: 투명 OLED(현재 LG OLED T)가 가격/수율에서 micro LED 대비 우위 유지

---

## 9. 문제 재정의

조사를 마친 후 더 적절한 핵심 질문:

> "레이저 기술이 TV·가전·로봇 각 분야에서 어떤 공정을 담당하는가"보다,
> **"micro LED 전사·수리 공정의 수율 병목과 인간형 로봇 정밀 부품 가공의 비용 병목, 이 두 개의 신규 대규모 레이저 수요처에 우리의 LLO·LILE·이종금속 용접 기술이 어떻게 포지셔닝될 것인가"** 가 더 전략적 질문이다.

---

## 인용 출처 목록

| # | 출처 | URL | 발행일 | 확인 수준 |
|---|------|-----|--------|---------|
| 1 | Omdia Display Dynamics March 2025: LCD TV 생산기지 이동 | https://omdia.tech.informa.com/om128610/ | 2025-03 | 검색 |
| 2 | flatpanelshd: 2025 OLED TV 패널 개선 소문 (4-layer, QD-OLED) | https://www.flatpanelshd.com/news.php?subaction=showfull&id=1735284218 | 2024-12 | 검색 |
| 3 | Optics.org: MicroLED make-or-break phase 2025 (Yole Group 보고서) | https://optics.org/news/16/12/39 | 2025-12 | 원문 확인 |
| 4 | microled-info.com: MicroLED Technical Turning Point 2025 (Aledia) | https://www.microled-info.com/microled-s-technical-turning-point-why-2025-year-it-gets-real | 2025-10 | 원문 확인 |
| 5 | ledscreenparts.com: Micro LED Industry 2025 현황 (Q-Pixel, Tianma, Contrel) | https://www.ledscreenparts.com/current-status-and-future-trends-of-the-micro-led-industry-in-2025/ | 2025-10 | 검색 |
| 6 | minimicroled.com: 2025 micro LED 전환점 (전사 수율 동향) | https://www.minimicroled.com/2025-a-key-year-for-micro-led-technologys-transition-from-concept-to-mass-production/ | 2025-01 | 검색 |
| 7 | microled-info.com: UBI Research 2027년 micro LED TV 양산 | https://www.microled-info.com/ubi-research-sees-mass-production-microled-tvs-2027-revenues-reaching-13 | 2025-08 | 검색 |
| 8 | Samsung News: CES 2026 Micro RGB TV 130인치 발표 | https://news.samsung.com/us/samsung-unveils-worlds-first-130-inch-class-micro-rgb-tv-next-generation-color-bold-new-design | 2026-01 | 검색 |
| 9 | Samsung CES Innovation Award: Transparent Micro LED | https://www.ces.tech/ces-innovation-awards/2026/samsung-transparent-micro-led/ | 2026-01 | 검색 |
| 10 | Display Daily: Omniply LLO 대체 기술 분석 | https://displaydaily.com/omniply-stick-and-peel-process-a-substitute-for-llo | 검색 미확인 | 검색 |
| 11 | oled-info.com: 레이저 디스플레이 공정 (FlexOLED 커팅, 커버글라스) | https://www.oled-info.com/lasers-display-fabrication-cutting-flexoleds-coverglasses-and-windows | 검색 미확인 | 검색 |
| 12 | engineering.com: Coldwater Machine 세탁기 드럼 레이저 용접 | https://www.engineering.com/new-development-in-stainless-steel-appliance-drum-welding-released/ | 검색 미확인 | 검색 |
| 13 | weil-technology.com: 가전 레이저 용접 라인 | https://weil-technology.com/en/industries/home-appliances | 검색 미확인 | 검색 |
| 14 | Laserax: 금속 표면 처리 레이저 기술 | https://www.laserax.com/blog/surface-treatment-of-metals | 2024-05 | 검색 |
| 15 | SCHOTT: 무광 글라스세라믹 쿡탑 직렬 생산 | https://www.schott.com/en-gb/news-and-media/media-releases/2025/schott-starts-serial-production-for-matte-glass-ceramic-cooktops | 2025-03 | 검색 |
| 16 | humanoid.press: 인간형 로봇 부품 데이터시트 (하모닉 드라이브 시장) | https://humanoid.press/humanoid-press/datasheet/ | 2025 | 검색 |
| 17 | Universal Robots FABTECH 2025 레이저 용접 발표 | https://www.universal-robots.com/news-and-media/news-center/universal-robots-brings-next-gen-welding-to-fabtech-2025/ | 2025-09 | 검색 |
| 18 | Coherent Market Insights: 레이저 용접 시장 ($2.88B 2025) | https://www.coherentmarketinsights.com/industry-reports/laser-welding-machine-market | 검색 미확인 | 검색 |

---

*검색 예산 사용: search 8회, extract 1회(2 URL), research 0회*
*시간 감쇠 주의: 출처 #10~#13은 발행일 미확인으로 [발행일: 미확인] 처리, 핵심 결론 근거로 직접 사용 자제*
