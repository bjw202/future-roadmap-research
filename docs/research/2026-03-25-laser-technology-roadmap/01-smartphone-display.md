# 01 스마트폰·디스플레이 분야 레이저 기술 현황 및 미래 로드맵

**작성일**: 2026-03-25
**담당**: Researcher 1 — 스마트폰/디스플레이 레이저 기술

---

## 1. 현재 레이저 응용 현황

### 1-1. 플렉서블/폴더블 OLED — LLO (Laser Lift-Off)

**[높음]** LLO는 플렉서블 OLED 양산의 핵심 공정으로, 글래스 캐리어로부터 폴리이미드(PI) 기반 OLED 패널을 분리한다. 전체 패널을 뒤집어 KrF/XeCl 엑시머 레이저(308nm) 라인빔을 유리-PI 계면에 조사하여 PI를 분해·분리한다.

- **시장 규모**: LLO 장비 시장 2024년 약 $255M → 2025년 $1.48B (복수 시장조사 기관), OLED 비중 약 48% [출처: globalgrowthinsights.com, 2025-01 / datainsightsmarket.com, 2026-01]
  - *수치 주의*: 두 기관 수치 차이가 크다(~$255M vs. ~$1.48B). 전자는 장비 단독, 후자는 관련 시스템 포함 가능. 절대치보다 성장 방향으로 해석 권장.
- **주요 장비사**: AP Systems(한국), DISCO(일본), Coherent(미국), EO Technics(한국), 3D-Micromac(독일)
- **AP Systems**: 308nm 엑시머 기반 LLO 장비 공급, 2025년 Visionox 8.6세대 라인 수주 (E/A 및 LLO 시스템) [출처: oled-info.com, 2025-12]
- **기술 진화**: 한국 연구팀(KAIST/서울과기대/KIMM)이 그래핀 중간층 활용 GLLO(Graphene-LLO) 개발. 탄화 잔류물 92.8% 감소, 글래스 캐리어 재사용 가능, 유연 변형 내구성 우수. 피부 부착형 전자 기기로 확장 가능. [출처: Nature Communications / graphene-info.com, 2025-01]
- **수율 기준**: LLO 후 잔류 탄화 오염이 수율 주요 변수. GLLO는 이를 제거하여 수율 개선 기대.
- **폴더블 크리즈 해결**: CES 2026에서 Samsung Display가 레이저 드릴링 금속 플레이트 기반 크리즈프리 폴더블 패널 시연. 금속 지지판(Fine M-Tec 제조)에 레이저로 마이크로홀을 천공, 폴딩 시 응력을 분산시킴으로써 크리즈 약 20% 저감. 화학 에칭(~$20) 대비 레이저 드릴링($30~35) 방식이 Apple iPhone Fold 요구 수준에 적합. Galaxy Z Fold 8 및 Apple 첫 폴더블 iPhone(2026년 하반기 예상)에 채택 전망. [출처: ExtremeTech, BGR, TrendForce, 2026-01]

### 1-2. UTG (Ultra-Thin Glass) 레이저 가공

**[높음]** 폴더블 디스플레이의 UTG(두께 30~50μm, 경도 6H)는 레이저 커팅이 필수다. 기계적 절단 시 마이크로크랙 발생, 레이저 비접촉 절단이 표준.

- 기존 글라스 가공 기술(CO2, USP)에서 UTG는 두께·취성 때문에 USP(ps/fs) 방식이 적합.
- Samsung Z Fold 8: UTG를 상하 이중층 적용(현재 단층)으로 크리즈 추가 저감 계획 [출처: wccftech.com, 2026-01]
- 폴더블 힌지부 UTG 가공: 응력 집중 구간의 가공 정밀도가 수율 결정 인자. 레이저 파라미터(에너지, 스캔 속도, 펄스 반복률)가 마이크로크랙 발생과 직결.

### 1-3. 스마트폰 외관 — 티타늄/세라믹/유리 레이저 가공

**[높음] 티타늄 3D 프린팅(SLM) — Apple**
Apple Watch Series 11/Ultra 3 및 iPhone Air USB-C 포트에 레이저 분말층 융합(L-PBF, Selective Laser Melting) 기반 적층 제조 티타늄 부품 양산 적용. 6개 레이저 동시 조사, 파우더 층 두께 60μm, 티타늄 파우더 직경 50μm. 연간 400 메트릭 톤 이상 원소재 절감. CNC 후가공 비율 대폭 감소로 복잡 형상 구현. [출처: metal-am.com / kensingtonadditive.com, 2025-09]
- *반증 탐색*: 티타늄 절삭 가공 업체들은 여전히 CNC 의존도가 높다는 보고 있음. Apple SLM은 특정 소형 부품(포트, 라그 등)에 한정 적용 가능성. 전체 프레임 SLM 대체는 아직 미확인. [발행일: 2025-09]

**[높음] Corning Gorilla Armor 2 — Samsung Galaxy S25 Ultra**
산업 최초 긁힘 방지 반사 방지 유리 세라믹 커버 소재. 레이저 기반 표면 가공과 유리 세라믹 결합으로 저반사·고내구성 구현. 2025년 1월 출시. [출처: Samsung/Corning 공식 보도, 2025-01]

**[중간] USP 레이저 텍스처링 — 일반 금속/세라믹**
피코초/펨토초 레이저를 이용한 금속(티타늄 합금 포함), 유리, 세라믹 표면 미세구조 형성(LIPSS, 마이크로채널, 그루브)은 항균성, 마찰·마모 저항, 접착력 개선에 활용. 스마트폰 케이스 텍스처링 직접 사례는 현재 검색 결과 내 양산 사례 미확인. [반증 미발견 — 학술/산업 일반 사례 존재, 스마트폰 특화 양산 적용 미확인]

### 1-4. OLED FMM(Fine Metal Mask) 레이저 가공

**[높음]** OLED 증착 공정의 핵심 소재인 FMM(Fine Metal Mask)은 레이저 절단 또는 화학 에칭으로 제조. AP Systems는 CO₂ 레이저(10.6μm, 70W) 기반 FMM 패터닝 장비 공급. 고해상도(UHD) 패턴 구현 가능. DNP(Dai Nippon Printing)는 포토리소그래피+에칭 방식으로 글로벌 1위 FMM 공급사. 레이저 기반 FMM 제조는 화학 에칭 대비 정밀도 우위 있으나 생산성 경쟁 중. [출처: apsystems.co.kr / DNP IR 2024]

**레이저 Frit Seal 봉지**: 유리 프릿+레이저 조사로 상하 유리를 일체화. 중소형 rigid OLED에 사용. 플렉서블/폴더블에서는 TFE(Thin Film Encapsulation)가 주류. 레이저 봉지는 rigid용으로 신뢰성 우위.

### 1-5. LTPS 결정화 — ELA (Excimer Laser Annealing)

**[높음]** AMOLED 백플레인의 LTPS(저온 폴리실리콘) TFT는 ELA 필수 공정. 비정질 Si를 308nm 엑시머 라인빔으로 결정화. BOE, Visionox의 8.6세대 라인에도 AP Systems ELA 장비 공급. 이미 성숙 공정이나 라인빔 에너지 균일도 향상이 수율 개선의 지속 과제.

### 1-6. 기판/패키징 — 레이저 드릴링, 디본딩

**[높음] 레이저 마이크로비아 드릴링**
스마트폰 HDI PCB/패키지 기판: UV 레이저(355nm) 드릴링으로 100μm 미만 마이크로비아 형성. CO₂ 레이저(100~150μm), UV 레이저(<100μm) 구분 사용. EO Technics 5000U 시스템: Neo Scan 적용, 고속 처리 대비 범용 갈보 대비 우위. [출처: pcbonline.com 2024 / EO Technics 공식]

**[높음] 레이저 디본딩 — 칩렛/고급 패키징**
글로벌 레이저 디본딩 장비 시장: 2024년 $166M → 2025년 $182M → 2032년 $293M 예상. EV Group EVG880 LayerRelease: IR 레이저로 실리콘 캐리어로부터 나노미터 정밀도 박층 분리. 2024년 300mm 웨이퍼 처리 속도 기록, 2025년 처리량 2배 향상. HBM, 3D IC, 칩렛 스택 적용. [출처: 3dincites.com 2024-05 / marketreportanalytics.com 2025-01]
Resonac-PulseForge(2025-06): 펄스광 광자 디본딩으로 20μm 초박형 웨이퍼 분리. 레이저 대비 응력 저감, 수율·비용 우위 주장.

**[중간] LIDE(Laser Induced Deep Etching) — 유리 기판 TGV**
McKinsey Electronics 보고에 따르면 고주파 패키징에서 유리 기판 TGV(Through-Glass Via) 제조에 LIDE 공정이 주목받고 있음. [출처: mckinsey-electronics.com, 2025-07]

---

## 2. 미래 기술 로드맵

### 2-1. 0~3개월 (즉시~2026년 6월)

| 항목 | 내용 | 확신도 |
|------|------|--------|
| Crease-Free 폴더블 패널 양산 준비 | Samsung Display, 레이저 드릴 금속 플레이트 적용 Galaxy Z Fold 8 / Apple iPhone Fold용 패널 양산 진입 | [높음] |
| 8.6세대 AMOLED 라인 ELA/LLO 장비 납입 | BOE, Visionox 8.6G 라인 AP Systems 장비 공급, 2026 Q3 양산 시작 예정 | [높음] |
| GLLO 파일럿 검증 | Nature Communications 발표 그래핀 LLO 기술의 공정 최적화 및 스케일업 타당성 검토 진행 중 | [중간] |
| UTG 이중층 폴더블 실험 | Samsung Z Fold 8 상하 UTG 적용 시험 중 | [중간] |

### 2-2. 3~12개월 (2026년 6월~2027년 3월)

| 항목 | 내용 | 확신도 |
|------|------|--------|
| 크리즈프리 폴더블 폰 양산 출시 | Galaxy Z Fold 8 / Apple iPhone Fold 레이저 드릴 금속 플레이트 적용 출시 | [높음] |
| 레이저 LIFT micro LED 소형 웨어러블 양산 | AUO, 가민 fēnix 8 Pro 등 럭셔리 스마트워치용 Micro LED 소량 양산 | [중간] |
| UDC(Under Display Camera) 기술 재시도 | Apple Face ID용 UDC 2027 전후 재도전 예고, 레이저 패터닝 픽셀 미세 가공 기술 검증 | [낮음] |
| 티타늄 SLM 적용 부품 확대 | Apple iPhone 본체 프레임 일부 SLM 적용 탐색. 현재는 소형 부품 한정 | [낮음] |
| 레이저 디본딩 HBM/AI칩 양산 확대 | EV Group EVG880, Resonac-PulseForge 고객사 채택 확대 | [중간] |

### 2-3. 12~36개월 (2027년~2028년)

| 항목 | 내용 | 확신도 |
|------|------|--------|
| Micro LED 스마트폰 첫 상용화 | 레이저 LIFT 기반 Micro LED 폰 패널 첫 상용화. OLED 대비 비용 격차 축소 필요. 현재 고급 워치/AR 선행 | [중간] |
| GLLO 기반 롤러블/스트레처블 OLED 공정화 | 그래핀 중간층 LLO가 롤러블/스트레처블 전자 기기의 초박형 PI 기판 분리 표준 공정으로 채택 | [중간] |
| EL-QD(전기발광 양자점) 패터닝 — 잉크젯+레이저 결합 | Samsung Display EL-QD 264PPI 시제품(400nit, 2025-05 SID 발표). 잉크젯 프린팅이 주방식이나 레이저 직접 묘화로 정밀도 보완 탐색 | [중간] |
| 스트레처블 Micro LED 디스플레이 개발 | Samsung Display CES 2025/SID 2025 Multi-Axis Stretchable Micro LED 시연. 레이저 전사 + 탄성 기판 결합 구조. 상용화 시점 불확실 | [낮음] |
| 투명 디스플레이용 레이저 패터닝 | 롤러블/투명 Micro LED(AUO-Smartkem OTFT 기반)에서 레이저 전사 공정 불필요화 또는 대체 가능성 탐색 | [낮음] |

---

## 3. 기존 보유 기술과의 연결점

| 보유 기술 | 현재 응용 | 확장 가능 방향 |
|-----------|-----------|----------------|
| **LLO** | 플렉서블 OLED PI 기판 분리(양산 성숙) | ① GLLO 방식으로 잔류 탄화 저감·캐리어 재사용 → 수율·비용 개선 ② Micro LED LLO(GaN 버퍼층 기화) → LIFT 공정 연결 ③ 롤러블/스트레처블용 초박형 기판 분리 공정 확장 |
| **LILE (Laser Induced Laser Etching)** | 소재 선택적 에칭 | ① 크리즈프리 금속 플레이트 마이크로홀 패터닝에 LILE 정밀도 활용 ② FMM 레이저 가공 적용 ③ UDC용 디스플레이 픽셀 미세 가공 (미래) |
| **글라스 가공** | UTG/커버글라스 절단·천공 | ① UTG 이중층 폴더블 가공(두께 30~50μm, 크랙 제어 필수) ② TGV(Through-Glass Via) 레이저 드릴링(LIDE 방식 연계) ③ Gorilla Armor 2류 유리 세라믹 레이저 표면 처리 |
| **이종금속 용접** | 중프레임 부품 결합 | ① 티타늄 SLM 부품과 알루미늄 프레임 이종 레이저 용접 ② Micro LED 전극 레이저 어시스티드 본딩(LAB) 연계 |
| **소재 광흡수성 기반 정밀 Selective 제거** | 선택적 소재 제거 | ① 레이저 디본딩(IR 레이저 → 실리콘 투과, 접합층 선택 흡수) ② 멀티 소재 칩렛 패키징에서 임시 본딩 필름 선택 제거 ③ QD 색변환층 선택 패터닝 |

---

## 4. 핵심 병목과 해결 조건

### 병목 1: LLO — 공정 수율과 탄화 잔류물
- **현황**: 기존 엑시머 LLO의 탄화 잔류물이 수율 제한. 캐리어 글래스 재사용 불가.
- **해결 조건**: GLLO(그래핀 중간층)의 공정 일관성·스케일업 검증. 그래핀 대면적 균일 증착이 전제 조건.
- **병목 본질**: 기술 자체(레이저 파라미터)보다 소재(균일 그래핀 공급) 병목 가능성 높음.

### 병목 2: Micro LED 레이저 전사 — 수율과 비용
- **현황**: 레이저 LIFT 전사 수율 목표 >99.9995%(Q-Pixel, 2024-07 발표). 비용은 OLED 대비 여전히 높음.
- **해결 조건**: 10μm 이하 칩 사이즈에서의 전사 수율, 100M units/hr 처리량, 비용 40% 추가 하락.
- **병목 본질**: 기술(수율 목표는 달성 근접) + 비용(고출력 레이저 광학 시스템 CAPEX) + 공급망(GaN 에피 기판 균일도) 복합 병목.

### 병목 3: 폴더블 UTG 레이저 가공 — 힌지부 마이크로크랙
- **현황**: UTG 30~50μm 두께에서 힌지부 절단 시 마이크로크랙 발생 제어가 수율 핵심.
- **해결 조건**: USP(ps/fs) 레이저 파라미터 최적화 + 인라인 결함 검사 연동.
- **병목 본질**: 기술(레이저 파라미터 정밀도) + 검사(인라인 비파괴 검사 통합) 병목.

### 병목 4: UDC — 화질 타협
- **현황**: 픽셀 밀도 저감과 투과율 간 트레이드오프. Apple/Samsung 모두 2025년까지 채택 보류.
- **해결 조건**: 레이저 패터닝으로 30μm 이하 서브픽셀 정밀 가공, 투과율 >90% 동시 달성.
- **병목 본질**: 기술(레이저 해상도)보다 UX 기대(화질 타협) 병목. 소비자 수용이 기술보다 선행 제약.

---

## 5. 경쟁/대체 기술 위협

| 위협 기술 | 내용 | 레이저 기술 위협 정도 |
|-----------|------|----------------------|
| **잉크젯 프린팅 (OLED/QD 패터닝)** | Canon Tokki 잉크젯 OLED, Samsung EL-QD 잉크젯 패터닝(264PPI). FMM 필요 없음 → FMM 레이저 가공 시장 잠식 | 중간 (FMM 공정 대체 위협) |
| **광자 디본딩(PulseForge)** | 레이저 대신 펄스 브로드밴드 광으로 웨이퍼 분리. 낮은 응력, 높은 처리량 주장. Resonac 공동 개발 중 | 낮음-중간 (현재 레이저 디본딩 보완 성격, 완전 대체는 미검증) |
| **OTFT + MicroLED (Smartkem-AUO)** | 마스크 전사/레이저 용접 공정 제거 가능한 유기 TFT 기반 롤러블 투명 Micro LED. 레이저 전사 불필요화 시도 | 낮음 (2024년 착수, 양산 불확실) |
| **나노임프린트 리소그래피(NIL)** | 특정 나노 패터닝에서 레이저 직접 묘화 대비 비용 우위 가능 | 낮음 (디스플레이 주류 공정 대체 미현실적) |
| **Electrostatic/Fluid Micro LED 전사** | 레이저 없이 정전기/유체 기반 전사. 비용 잠재적 우위 | 낮음 (해상도·정밀도에서 레이저 LIFT 우위) |

**결론**: 잉크젯 프린팅이 FMM 레이저 가공의 가장 현실적인 구조적 위협. 나머지는 현재 레이저 기술의 보완 또는 틈새 대체 수준.

---

## 6. 반증 탐색 결과

| 핵심 주장 | 반증 시도 | 결과 |
|-----------|-----------|------|
| LLO는 폴더블 OLED 표준 공정 | LLO 없이 폴더블 OLED 가능한가 | 반증 미발견 — 현재 모든 플렉서블 OLED 패널은 LLO 또는 물리적 분리 공정 필수. 대안 기술 양산 사례 없음 |
| 레이저 LIFT가 Micro LED 전사 최선 기술 | 비레이저 전사로 더 높은 수율/처리량 | 부분 반증 존재 — VueReal 마이크로 솔리드 프린팅, 전기수력학 전사 등이 특정 크기범위에서 경쟁적. 단, 10μm 이하 고해상도에서는 레이저 LIFT 우위 유지 |
| Apple 티타늄 SLM은 스마트폰 제조 혁신 | 전체 프레임 적용 가능한가 | 부분 반증 — 현재 적용은 소형 부품(포트, 라그)에 한정. 대면적 CNC 완전 대체는 미검증 |
| 레이저 드릴 금속 플레이트로 크리즈 완전 해결 | 크리즈 완전 제거 불가론 | 부분 반증 — Samsung CES 2026 시연에서 "nearly invisible" 수준. 완전 제거가 아닌 저감. UTG 이중층 조합이 필요한 이유 |
| UDC 기술이 곧 양산 적용 | UDC 양산 지연 배경 | 반증 확인 — Samsung과 Apple 모두 UDC 2025~2026 채택 보류. Apple Face ID UDC는 2027년 이후로 지연. 기술보다 화질 타협 문제가 핵심 |

---

## 7. 실행 연결: 의사결정 포인트

### 지금 베팅 가능 영역 (0~12개월)

**① 크리즈프리 폴더블 — 레이저 드릴 금속 플레이트 공정**
- Apple iPhone Fold 및 Samsung Z Fold 8용 Fine M-Tec 공급망이 확정되고 있음.
- 의사결정: 레이저 드릴링(마이크로홀 천공) 고정밀 공정 장비 및 검사 기술 역량 확보가 지금 시작해야 하는 투자.
- 전제: Fine M-Tec 공급망 진입 가능성, 독자 장비 개발 vs. 채택 전략.

**② GLLO — R&D 파트너십 탐색**
- 그래핀 중간층 LLO는 수율·비용 개선이 명확하나 대면적 그래핀 공급이 병목.
- 의사결정: 그래핀 소재 공급사(한국 내 그래핀 파운드리)와 공동 R&D, 또는 라이선스 검토.

**③ 레이저 디본딩 — HBM/AI칩 공급망**
- 레이저 디본딩 장비 시장 $166M(2024) → $293M(2032), CAGR 약 8.5%.
- 의사결정: EV Group, PulseForge 외 한국산 레이저 디본딩 장비 진입 가능성 탐색. EO Technics의 반도체 장비 역량과 연계 가능.

### 3~12개월 검토 영역

**④ Micro LED LIFT 장비 — 공정 분업 탐색**
- 2025~2026년 Micro LED 소량 양산 시작(워치, AR). 스마트폰 진입은 2027년 이후.
- 의사결정: LIFT 광학 모듈(엑시머 레이저 + DOE) 공급 포지션 탐색. Coherent 독점 구조 취약점 분석.

**⑤ FMM 레이저 vs. 잉크젯 OLED 패터닝 전환 모니터링**
- Samsung EL-QD 잉크젯 264PPI 양산화 시점이 FMM 레이저 가공 수요 감소 트리거.
- 의사결정: FMM 레이저 가공 사업 의존도 시나리오별 대응 계획 수립.

### 보류/관망 영역

**⑥ UDC 레이저 패터닝 — 2027년 이후 재평가**
- 기술 병목보다 UX 수용 문제. Apple 2027년 채택 전 양산 투자 불합리.
- 의사결정: 기술 모니터링 유지, 대규모 투자 보류.

**⑦ 스트레처블 디스플레이 레이저 전사 — 2028년 이후**
- Samsung Display 시연 개념 단계. 상업화 타임라인 불확실.

---

## 8. 미래 구조 변화 전망 (12~36개월)

**변화 1**: FMM 레이저 가공 → 잉크젯 OLED 패터닝 전환
- 전제: Samsung EL-QD 잉크젯 264PPI 양산화 성공.
- 촉발 조건: 2027년 전후 EL-QD 양산 본격화.
- 반증 조건: 잉크젯 패터닝 균일도 문제 지속, FMM 수요 유지.

**변화 2**: 레이저 전사(LIFT) → Micro LED 스마트폰 침투
- 전제: LIFT 수율 >99.9999% 달성, 비용 OLED 대비 1.5배 이내.
- 촉발 조건: 2027년 이후 Micro LED 폰 상용화 선도 업체 등장.
- 반증 조건: OLED 기술 지속 개선(TADF/하이퍼형광으로 효율 격차 축소), Micro LED 비용 하락 지연.

**변화 3**: 폴더블 크리즈 해결 → 폴더블 폰 시장 가속 확대
- 전제: 2026년 Z Fold 8/iPhone Fold에서 크리즈프리 검증 성공.
- 촉발 조건: 폴더블 침투율 2027년 3% 돌파(TrendForce 예측).
- 반증 조건: 크리즈프리 금속 플레이트 내구성 문제 발생, 소비자 폼팩터 무관심.

---

## 문제 재정의

원래 질문(스마트폰/디스플레이의 레이저 기술 현황)보다 더 적절한 핵심 질문은:

> **"레이저 기술이 어떤 공정 병목을 해소하고, 그 해소가 어떤 산업 구조 변화(폴더블 대중화, Micro LED 전환, EL-QD 전환)를 촉발하는가?"**

개별 공정 기술보다 병목 해소 → 시장 구조 변화 연결이 전략 판단의 핵심이다.

---

## 9. 인용 출처 목록

| # | 출처 | URL | 발행일 | 확인 수준 |
|---|------|-----|--------|-----------|
| 1 | LLO 장비 시장 규모 | globalgrowthinsights.com/market-reports/laser-lift-off-llo-machines | 2025-01 | 검색 |
| 2 | LLO 장비 시장 규모(복수 기관) | datainsightsmarket.com/reports/laser-lift-off-llo-machines | 2026-01 | 검색 |
| 3 | GLLO 그래핀 기반 LLO | graphene-info.com / Nature Communications | 2025-01 | 검색 |
| 4 | AP Systems Visionox 8.6G 수주 | oled-info.com | 2025-12 | 검색 |
| 5 | Coherent LLO 원리 및 장비 | coherent.com/news/blog/laser-lift-off-flat-panel-displays | 상시 | 검색 |
| 6 | Samsung Crease-Free CES 2026 | ExtremeTech / BGR / TrendForce | 2026-01 | 검색 |
| 7 | Fine M-Tec 레이저 드릴 금속 플레이트 | bgr.com/tech/foldable-iphone-no-screen-crease | 2025-07 | 검색 |
| 8 | Galaxy Z Fold 8 UTG 이중층 | wccftech.com | 2026-01 | 검색 |
| 9 | Apple 티타늄 SLM 양산 | metal-am.com / kensingtonadditive.com | 2025-09 | 검색 |
| 10 | Corning Gorilla Armor 2 | Samsung/Corning 공식 보도 | 2025-01 | 검색 |
| 11 | Samsung EL-QD SID 2025 | global.samsungdisplay.com | 2025-05 | 검색 |
| 12 | Micro LED LIFT 기술 원리 | microled-info.com (Coherent 기고) | 2024-09 | 검색 |
| 13 | Micro LED 레이저 공정 리뷰 | Optics & Laser Technology Vol.181 | 2025-02 | 검색 |
| 14 | Micro LED 전사 조립 리뷰 | IOP Science SMAT | 2025 | 검색 |
| 15 | 레이저 디본딩 시장 | marketreportanalytics.com / intelmarketresearch.com | 2025-01 | 검색 |
| 16 | EV Group EVG880 LayerRelease | 3dincites.com | 2024-05 | 검색 |
| 17 | Resonac-PulseForge 광자 디본딩 | resonac.com | 2025-06 | 검색 |
| 18 | EO Technics 반도체 레이저 | w4.kirs.or.kr (글로벌 리포트) | 2025-06 | 검색 |
| 19 | EO Technics TSMC 채택 | alphabiz.co.kr | 2024-05 | 검색 |
| 20 | PCB UV 레이저 드릴링 | pcbonline.com | 2024 | 검색 |
| 21 | OLED FMM 레이저 가공 | ophiropt.com | 상시 | 검색 |
| 22 | Samsung Stretchable Micro LED CES 2025 | zdnet.com / samsungdisplay.com | 2025-01 / 2025-05 | 검색 |
| 23 | Apple MicroLED 프로젝트 취소 2024 | MicroLED Association | 2025-01 | 검색 |
| 24 | UDC 기술 지연 현황 | AppleInsider / Neowin | 2025-11 / 2025-04 | 검색 |
| 25 | QD 패터닝 기술 리뷰 | RSC Nanoscale / pubs.rsc.org | 2025-01 | 검색 |
| 26 | DNP FMM 시장 IR | dnp-global.com | 2024 | 검색 |
| 27 | OLED TFE(박막 봉지) 현황 | MDPI Materials | 2025-07 | 검색 |

---

*검색 예산 사용: search ~8회, research ~1회, extract 0회 (키 원문 직접 추출 불요 판단)*
