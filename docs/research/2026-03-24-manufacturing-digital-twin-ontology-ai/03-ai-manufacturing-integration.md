# AI/ML 기술의 제조업 통합: 현황, 아키텍처, 전략 전망

**작성일**: 2026-03-24
**역할**: Researcher
**조사 모드**: Strategic Foresight + Fact-Finding

---

## 1. 핵심 발견 요약 (5줄 이내)

1. 제조업 AI 시장은 2025년 341억 달러에서 2030년 1,550억 달러(CAGR 35.3%)로 성장 중이나, 실제로 AI가 전사 운영에 완전히 내재화된 기업은 전체의 **2%**에 불과하다. [높음]
2. GenAI 기반 산업용 코파일럿(Siemens Industrial Copilot, ABB Genix 등)이 MES/ERP/CMMS와 연결되어 자연어로 운영 데이터를 질의하는 인터페이스로 빠르게 확산 중이며, 지멘스는 12만 명 이상의 엔지니어가 사용 중이라고 밝혔다. [중간]
3. AI-디지털트윈 통합은 단순 모니터링을 넘어 물리 법칙을 내재화한 PINN(Physics-Informed Neural Network) 기반 자율 최적화 단계로 진화하고 있으며, 엣지 AI+연합학습 조합이 클라우드 대비 지연 35% 감소, 처리량 13.2% 향상을 달성했다. [중간]
4. LLM 기반 자동 온톨로지/Knowledge Graph 생성이 2024~2025년 생산 성숙 단계에 진입했으며, 제조 문서에서 수백~수천 개의 엔티티를 자동 추출하는 수준까지 도달했다. [중간]
5. AI 도입의 핵심 병목은 기술 자체가 아닌 **데이터 품질·파편화(47~52%)와 조직 역량 부족(49%)**이며, 설명가능성(XAI) 부재가 현장 신뢰를 저해하는 이중 병목 구조를 형성하고 있다. [높음]

---

## 2. AI/ML 제조업 적용 현황

### 2.1 주요 적용 영역별 현황

#### 예지보전 (Predictive Maintenance)
- AI 기반 예지보전은 제조업 AI 적용 중 가장 성숙한 영역으로, 유지보수 비용 **25~40% 절감**, 예상치 못한 다운타임 **15% 감소** 효과가 다수 사례에서 확인된다. [높음]
  - 출처: [MasterOfCode, 2025], [Standard Bots, 2026]
  - 수치 투명성: "25~40% 절감"은 다수 구현 사례를 종합한 범위값. 공장 유형(이산/연속), 센서 밀도, 데이터 품질에 따라 실제값은 크게 달라질 수 있음.
- 생성 AI가 예지보전에 접목되면서 **희귀 고장 시나리오에 대한 합성 데이터 생성**이 가능해져 데이터 부족 문제를 부분적으로 해소하는 방향으로 진화 중이다. [중간]
- 투자 회수 측면: 예지보전 AI 투자에서 **300% ROI** 달성 사례가 보고되나, 이는 대규모 연속 공정(석유화학, 발전 등)에서 도출된 수치로 일반 이산 제조업에 그대로 적용하기 어렵다.
  - [인접 도메인: 연속 공정/에너지] — 이산 제조업에서는 센서 밀도와 고장 발생 빈도가 낮아 ROI 실현 기간이 더 길어질 수 있음.

#### 품질 검사 (Quality Inspection)
- AI 기반 비전 검사가 기존 물리적 검사 중단을 대체하여 OEE(종합설비효율) **60~80% 향상** 사례가 보고된다. [낮음]
  - 출처: [IIoT World Days 2025 - CEO Andrew Scheuermann 발언] — 단일 발언자 인용으로 교차 검증 필요.
- 엣지 AI는 생산 라인의 **300밀리초 이내 검사 윈도우**에서 **10밀리초 미만의 추론 지연**을 달성하여 실시간 인라인 검사를 가능케 한다. [중간]
- **반증 탐색**: 고속 생산 라인에서의 AI 비전 검사는 조명 조건 변화, 모델 드리프트, 새로운 불량 유형 미학습 등의 한계로 인해 완전한 물리적 검사 대체가 어렵다는 사례도 존재한다. [중간]

#### 공정 최적화
- AI/ML이 공정 파라미터를 실시간으로 조정하여 에너지 소비 **12% 절감**, 생산 산출량 **10~20% 향상** 효과가 보고된다. [중간]
- 강화학습(RL) 기반 자율 공정 제어가 특정 연속 공정(도장, 열처리 등)에서 실증 적용 단계에 있다.

#### 수요예측 및 공급망
- 고급 AI 모델 적용 시 공급망 전 단계에서 **150~250% ROI** 달성 가능성이 보고되나, 구현 난이도와 데이터 요구 수준이 높다. [낮음]
  - 수치 투명성: 이 ROI 수치는 복수의 공급망 최적화 AI 벤더들이 제시한 값으로, 측정 기준과 기간 산정 방식이 균일하지 않음.

### 2.2 시장 현황 요약

| 지표 | 수치 | 출처 | 확신도 |
|------|------|------|--------|
| 2025년 제조업 AI 시장 규모 | 341.8억 달러 | tech-stack.com | [중간] |
| 2030년 예상 시장 규모 | 1,550억 달러 (CAGR 35.3%) | tech-stack.com | [중간] |
| AI 전사 내재화 기업 비율 | 2% | tech-stack.com | [중간] |
| 탐색/부분 배포 단계 기업 | ~66% | tech-stack.com | [중간] |
| 전통 AI/ML 활용 제조사 | 29% | NVIDIA/tech-stack | [중간] |
| GenAI 시설/네트워크 수준 배포 | 24% | NVIDIA/tech-stack | [중간] |
| AI 투자 1년 내 회수 기업 | 70% | 복수 출처 | [낮음] |

---

## 3. 생성 AI(GenAI)의 제조업 영향

### 3.1 자연어 인터페이스 및 산업용 코파일럿

**주요 플랫폼 및 사례**
- **Siemens Industrial Copilot**: Azure OpenAI Service 기반, Siemens Xcelerator 플랫폼 위에서 MES·엔지니어링 문서·SOP와 연결. 12만 명 이상 엔지니어 사용 중(2025년 기준). [중간]
- **ABB Genix Copilot**: GPT-4 기반, 에너지·유틸리티 섹터 운영 실시간 인사이트 제공.
- **Microsoft Copilot for Manufacturing**: MES, ERP, CMMS, QMS를 연결하여 자연어로 운영 데이터 질의 및 작업 오더 자동 생성.
- **Augmentir Augie**: 작업자 개인화 가이던스, 교육 모듈, 워크플로우 자동화.

**핵심 기능**
1. 운영 데이터 자연어 질의: "이번 주 3호 라인의 다운타임 원인은?"과 같은 질의에 MES/ERP 데이터를 통합하여 답변
2. SOP 및 트러블슈팅 즉시 접근: 작업자가 에러 코드 입력 시 해당 절차서 즉시 안내
3. 작업 오더 자동 생성: 이상 탐지 후 유지보수 작업 오더 자동 생성 및 기록
4. 지식 관리: 숙련 작업자의 암묵지(tacit knowledge)를 구조화된 데이터로 변환

**반증 탐색**: 산업용 코파일럿의 실제 생산 환경 배포는 OT 네트워크 보안 정책, 레거시 MES 연결성, 다국어 지원, 전문 용어 처리 등에서 상당한 구현 난이도를 보인다는 보고가 있다. [중간]

### 3.2 생성 AI 기반 설계 및 엔지니어링

- **제너레이티브 디자인**: 엔지니어가 중량·비용·재료 제약 조건을 입력하면 AI가 시뮬레이션 가능한 부품 설계 초안 생성. Bosch가 MEMS 센서 설계에 적용하여 위상 최적화를 통한 혁신 설계 도출. [낮음 - 단일 사례]
- **코드 생성 및 자동화**: PLC 프로그래밍, 로봇 경로 최적화 코드 생성 등에 LLM 적용 탐색 단계.

### 3.3 GenAI의 구조적 영향

GenAI는 단순 도구 수준을 넘어 **제조 운영의 인지 계층(Cognitive Layer)**으로 부상하고 있다. 가장 먼저 이익을 얻는 주체: **대형 장비 OEM 및 자동화 플랫폼 벤더**(Siemens, ABB, Honeywell, Rockwell). 이들은 자체 플랫폼 데이터를 보유하고 코파일럿을 플랫폼 락인 전략으로 활용하고 있다. [중간]

---

## 4. DT/온톨로지와의 통합 아키텍처

### 4.1 AI-디지털트윈 통합 아키텍처

**계층적 프레임워크**

```
┌─────────────────────────────────────────────────────────┐
│              사용자 인터페이스 계층                        │
│         (시각화, 모니터링, 서드파티 연동)                  │
├─────────────────────────────────────────────────────────┤
│              멀티모델 AI 계층                             │
│  [생성 AI] [예측 AI] [설명가능 AI] [맥락 인식 AI] [자율 AI] │
├─────────────────────────────────────────────────────────┤
│              데이터 관리 계층                             │
│     (전처리, 저장, 접근 제어, 컴플라이언스)               │
├─────────────────────────────────────────────────────────┤
│              센서 데이터 수집 계층                        │
│  (포토다이오드, 고속 카메라, 3D 스캐너, IIoT 센서)        │
└─────────────────────────────────────────────────────────┘
```
출처: [MDPI Electronics, 2025 - AI-Driven Digital Twins for Manufacturing]

**AI 기능별 DT 통합 역할**

| AI 기능 | DT 통합 역할 | 성숙도 |
|---------|-------------|--------|
| 생성 AI | 합성 데이터 증강, 설계 공간 탐색 | 초기~성장 |
| 예측 AI | 실시간 예측, 이상 탐지 | 성숙 |
| 설명가능 AI (XAI) | 모델 해석, 추적 가능성 | 개발 중 |
| 맥락 인식 AI | 환경 적응형 제어 | 초기 |
| 자율 에이전트 AI | 분산 자율 제어 | 연구 단계 |

**물리 정보 기반 신경망(PINN)과 DT 결합**
- PINN은 물리 법칙(PDE)을 손실 함수에 내재화하여 데이터가 부족한 조건에서도 물리적으로 일관된 예측을 가능케 한다. [중간]
- 금속 적층 제조에서 열유체 거동 모델링에 PINN을 적용하여 전통 CFD 대비 계산 시간을 대폭 단축. [중간]
- NVIDIA와 Dassault Systèmes가 협력하여 산업용 World Model(물리 시뮬레이션 기반 범용 모델)을 개발 중(2026년 2월 발표). [낮음]

**엣지 AI + 연합학습 기반 DT 아키텍처**
- 스마트 팩토리에서 **엣지 AI + 연합학습 + DT**를 결합한 실시간 공시뮬레이션(co-simulation) 아키텍처 (Nature Scientific Reports, 2025). [중간]
- 성과: 클라우드 전용 대비 지연 **35% 감소**, 클라우드 사용량 **28% 절감**, 처리량 **13.2% 향상**

**제조 계층별 DT-AI 적용**
- **기계 수준**: 예지보전, 이상 탐지, 파라미터 최적화
- **셀 수준**: 로봇 작업 조율, 스케줄링 최적화
- **공장 수준**: 생산 계획, 에너지 최적화, 물류 시뮬레이션
- **기업 수준**: 공급망 최적화, 수요 예측, 전략 시뮬레이션

### 4.2 AI와 온톨로지/Knowledge Graph 통합

**LLM 기반 자동 온톨로지 생성 파이프라인**

```
제조 문서 (PDF, DOCX, XML)
         ↓
[LLM 기반 엔티티/관계 추출]
         ↓
[온톨로지 구조 자동 생성]
         ↓
[Knowledge Graph 구축]
         ↓
[LLM 강화 자연어 질의]
         ↓
운영자/엔지니어 의사결정 지원
```

- **OntoKGen** 파이프라인: Chain-of-Thought 알고리즘을 활용하여 제조 문서 코퍼스에서 982개 엔티티 추출 시연. [낮음 - 논문 수준]
- **GraphRAG**: 키워드 검색 대신 KG의 의미적 관계와 온톨로지를 활용하는 검색 증강 생성 방식. 2026년 기업용 AI 데이터 준비의 표준으로 부상 예정. [중간]
- **OntoLLM**: LLM에 도메인 온톨로지를 그라운딩(grounding)하여 제조 특정 응답의 정확성 향상 및 환각 방지. [중간]

**제조 온톨로지 활용 사례**
1. 장비 관계 지식 베이스: 장비 컴포넌트, 유지보수 패턴, 운영 의존성을 KG로 구조화
2. 표준 연동: ISA-95, IEC 62264, RAMI 4.0 등 제조 표준 온톨로지와 LLM 통합
3. 공급망 지식 그래프: 공급업체-부품-공정-제품 관계 표현, 리스크 전파 시뮬레이션
4. 숙련 지식 보존: 베테랑 작업자의 트러블슈팅 경험을 KG로 구조화하여 조직 지식 자산화

---

## 5. 발전 단계별 AI 기술 스택

### 1단계: 전산화 (Computerization) — 디지털 기반 구축

| 영역 | 기술 스택 |
|------|----------|
| 데이터 수집 | PLC, SCADA, MES, ERP 기본 연동 |
| 저장 | 관계형 DB, historian DB |
| 분석 | 통계 대시보드, KPI 모니터링 |
| AI 수준 | 규칙 기반 알림, 단순 임계값 감지 |

### 2단계: 연결성 (Connectivity) — IIoT 통합

| 영역 | 기술 스택 |
|------|----------|
| 프로토콜 | OPC-UA, MQTT, REST API |
| 메시징 | Apache Kafka, MQTT Broker |
| 아키텍처 | Unified Namespace (UNS) |
| AI 수준 | 이상 탐지(Anomaly Detection), 기술 통계 ML |
| MLOps | 기본 MLflow, 실험 추적 |

### 3단계: 가시성·투명성 (Visibility/Transparency) — AI 기반 통찰

| 영역 | 기술 스택 |
|------|----------|
| ML 알고리즘 | Random Forest, XGBoost, LSTM, CNN |
| 예지보전 | Vibration Analysis AI, LSTM 고장 예측 |
| 품질 검사 | Computer Vision (YOLOv8, EfficientDet) |
| 설명가능성 | SHAP, LIME, XAI 툴킷 |
| MLOps | Kubeflow, AWS SageMaker, Azure ML |
| 엣지 배포 | TensorRT, ONNX Runtime, OpenVINO |

### 4단계: 예측 능력 (Forecasting/Prediction) — DT 기반 시뮬레이션

| 영역 | 기술 스택 |
|------|----------|
| 디지털트윈 | Siemens Teamcenter DT, Azure DT, AWS IoT TwinMaker |
| 시뮬레이션 | FEA/CFD 통합, PINN, Physics-Based ML |
| 생성 AI DT | NVIDIA Omniverse, OpenUSD |
| Knowledge Graph | Neo4j, Amazon Neptune, GraphDB |
| 온톨로지 | RDF/OWL, SPARQL, GraphRAG |
| 공정 최적화 | Reinforcement Learning, Bayesian Optimization |

### 5단계: 적응성 (Adaptability) — 자율 AI 제조

| 영역 | 기술 스택 |
|------|----------|
| 자율 에이전트 | Agentic AI, Multi-Agent 시스템 |
| 코파일럿 | LLM+MES/ERP 통합, Industrial Copilot |
| 연합학습 | Federated Learning (데이터 주권 보호) |
| 세계 모델 | Industrial World Models (NVIDIA+Dassault) |
| 자율 로봇 | Physical AI, Humanoid Robot Integration |
| GenAI 설계 | Generative Design, 자동 CAD/CAM |

---

## 6. AI 도입 핵심 병목 분석

**병목 분포 (복수 출처 종합)**

| 병목 요인 | 언급 비율 | 확신도 |
|---------|----------|--------|
| 데이터 품질·파편화 | 47~52% | [높음] |
| 조직 역량 부족 | 49% | [높음] |
| 규제·법적 우려 | 31% | [중간] |
| 변화 저항 | 30% | [중간] |
| 설명가능성 부재 | 정량 미측정, 질적 공통 언급 | [중간] |

출처: [AI Data Analytics Network, 2025], [Manufacturers Alliance 조사]

**엣지 vs. 클라우드 AI 트레이드오프**

| 기준 | 엣지 AI | 클라우드 AI |
|------|---------|-----------|
| 지연 | 10ms 수준 | 수십~수백 ms |
| 실시간 대응 | 우수 | 제한적 |
| 처리 용량 | 제한적 | 무제한 확장 |
| 모델 학습 | 불가/제한적 | 적합 |
| 보안/데이터 주권 | 강함 | 위험 증가 |
| 업데이트 복잡성 | 높음 | 용이 |
| 권고 적용 | 품질 검사, 이상 탐지, 안전 제어 | 모델 학습, 공급망, 전략 계획 |

---

## 7. 미래 구조 변화 (12~36개월)

**변화 1: 산업용 AI 에이전트의 MES/ERP 직접 제어 (12~18개월 내)**
- 전제: LLM 기반 에이전트가 읽기 전용 질의를 넘어 MES 작업 오더 생성·수정, ERP 발주, 공정 파라미터 조정을 직접 수행하는 단계로 진입.
- 촉발 조건: 주요 MES 벤더(SAP, Siemens, Rockwell)가 에이전트 API 공개 확대.
- 반증 조건: OT 보안 규제 강화로 에이전트의 실행 권한 제한, 또는 대형 사고 발생.

**변화 2: LLM+KG 결합으로 제조 표준 온톨로지 자동 생성 및 유지보수 (18~24개월)**
- 전제: ISA-95, ISO 10303(STEP) 등 제조 표준 온톨로지를 LLM이 자동으로 현장 데이터에 맞게 인스턴스화하고 지속 업데이트.
- 촉발 조건: GraphRAG + 제조 도메인 파인튜닝 LLM의 성숙.
- 반증 조건: 기존 OWL/RDF 전문가 커뮤니티의 LLM 신뢰성 문제 제기로 채택 지연.

**변화 3: Physical AI와 DT의 실시간 동기화로 자율 생산 셀 등장 (24~36개월)**
- 전제: NVIDIA Omniverse, OpenUSD 기반의 물리 시뮬레이션 DT가 실제 로봇/공정과 밀리초 단위로 동기화.
- 촉발 조건: Industrial World Model의 성숙과 엣지-클라우드 지연 추가 감소.
- 반증 조건: 물리-디지털 동기화의 신뢰성 검증 실패, 또는 안전 인증 요구사항이 채택 속도를 초과.

---

## 8. 승자 포지션 분석

| 포지션 | 현재 강자 | 이유 |
|--------|----------|------|
| 플랫폼 + 데이터 보유 | Siemens, PTC (ThingWorx), Honeywell | 수십 년 현장 OT 데이터 보유 + 플랫폼 락인 |
| AI 인프라 | NVIDIA (Omniverse, Jetson), Microsoft (Azure IoT + Copilot) | GPU + 클라우드 인프라 + LLM |
| 통합자 | Accenture, Deloitte, IBM | SI 역량 + 도메인 전문성 |
| 온톨로지/KG 도구 | Neo4j, AWS Neptune, metaphacts | KG 인프라 + 엔터프라이즈 채택 |
| 엣지 AI 하드웨어 | NVIDIA Jetson, Intel, Qualcomm | 칩 + 런타임 최적화 |

**인접 질문 (결론을 바꿀 수 있는 변수)**:
1. 오픈소스 LLM(Llama, Mistral 계열)의 제조 특화 파인튜닝이 성숙하면, 대형 플랫폼 벤더의 코파일럿 락인 전략이 약화될 수 있다.
2. EU AI Act의 고위험 AI 시스템 분류에 제조 자율 제어가 포함될 경우, 규제 컴플라이언스 비용이 SME의 AI 진입 장벽을 크게 높일 수 있다.

---

## 9. 문제 재정의

> 원래 질문: "AI/ML이 제조업 디지털 전환에 어떻게 적용되는가?"
>
> 더 적절한 핵심 질문: "제조업에서 AI의 진정한 가치는 기술 자체가 아닌, 현장 OT 데이터를 소유하고 통합하는 플랫폼 포지션에서 발생한다 — 어떤 기업/아키텍처가 그 포지션을 선점하는가?"

---

## 10. 출처 목록

| 번호 | 출처 | URL | 날짜 |
|------|------|-----|------|
| 1 | Standard Bots - AI in Manufacturing 2026 Guide | https://standardbots.com/blog/ai-manufacturing | 2026 |
| 2 | tech-stack.com - AI Adoption in Manufacturing | https://tech-stack.com/blog/ai-adoption-in-manufacturing/ | 2025 |
| 3 | MasterOfCode - AI Predictive Maintenance | https://masterofcode.com/blog/ai-predictive-maintenance-in-manufacturing | 2025 |
| 4 | MDPI - AI-Driven Digital Twins for Manufacturing (PMC) | https://pmc.ncbi.nlm.nih.gov/articles/PMC12787485/ | 2025 |
| 5 | Frontiers in AI - Generative and Predictive AI for DT | https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2025.1655470/full | 2025 |
| 6 | Nature Scientific Reports - Digital Twin Edge AI Federated Learning | https://www.nature.com/articles/s41598-025-28466-9 | 2025 |
| 7 | Siemens Industrial Copilot | https://www.siemens.com/global/en/products/automation/topic-areas/industrial-ai/industrial-copilot.html | 2025 |
| 8 | Augmentir - Industrial Copilot Vendors 2025 | https://www.augmentir.com/blog/top-10-genai-powered-industrial-copilot-vendors-to-watch-in-2025 | 2025 |
| 9 | FlowFuse - Edge vs Cloud AI in Manufacturing IIoT | https://flowfuse.com/blog/2026/03/edge-ai-vs-cloud-ai-in-iiot/ | 2026.03 |
| 10 | Gcore - Edge AI vs Cloud AI Deployment | https://gcore.com/learning/edge-ai-vs-cloud-ai-deployment-strategies | 2025 |
| 11 | arXiv - LLM for Automated Ontology Extraction (2412.00608) | https://arxiv.org/abs/2412.00608 | 2024.12 |
| 12 | ScienceDirect - LLM Knowledge Graph and Ontology Engineering | https://www.sciencedirect.com/science/article/pii/S1570826825000022 | 2025 |
| 13 | arXiv - Ontology-grounded KG Construction by LLM (2412.20942) | https://arxiv.org/abs/2412.20942 | 2024.12 |
| 14 | AI Data Analytics Network - Data Quality AI Barriers | https://www.aidataanalytics.network/data-science-ai/news-trends/data-quality-availability-top-list-of-ai-adoption-barriers | 2025 |
| 15 | MDPI - AI Trustworthiness in Manufacturing Industry 5.0 | https://www.mdpi.com/1424-8220/25/14/4357 | 2025 |
| 16 | Taylor & Francis - Explainable AI in Smart Manufacturing | https://www.tandfonline.com/doi/full/10.1080/00207543.2025.2513574 | 2025 |
| 17 | MasterOfCode - Generative AI in Manufacturing Use Cases | https://masterofcode.com/blog/generative-ai-in-manufacturing | 2025 |
| 18 | ScienceDirect - LLM for Smart Manufacturing | https://www.sciencedirect.com/journal/journal-of-manufacturing-systems/special-issue/1011BPMV4HV | 2025 |
| 19 | Machine Design - Physics-Informed AI and Digital Twins | https://www.machinedesign.com/automation-iiot/article/55310599 | 2025 |
| 20 | Accedia - AI-Driven Cost Reduction Manufacturing 2026 | https://accedia.com/insights/blog/ai-driven-cost-reduction-in-manufacturing-what-will-work-in-2026 | 2026 |
| 21 | SupplyChainBrain - Overcoming Barriers to AI Adoption | https://www.supplychainbrain.com/blogs/1-think-tank/post/40959 | 2025 |
| 22 | iiot-world.com - 2026 Smart Manufacturing Ecosystem | https://www.iiot-world.com/smart-manufacturing/2026-smart-manufacturing-ecosystem-industrial-ai-platforms/ | 2026 |
| 23 | AWS - MLOps for Industry 4.0 | https://aws.amazon.com/blogs/industries/how-to-implement-mlops-for-industry-4-0/ | 2025 |
| 24 | Microsoft Industry Blog - Industrial AI Agents and Digital Threads | https://www.microsoft.com/en-us/industry/blog/manufacturing-and-mobility/manufacturing/2025/03/25/ | 2025.03 |
| 25 | NextPlatform - Dassault and NVIDIA Industrial World Models | https://www.nextplatform.com/2026/02/04/ | 2026.02 |
| 26 | MDPI - Industry 5.0 Maturity Models | https://www.mdpi.com/2071-1050/17/24/11042 | 2025 |
| 27 | ScienceDirect - OntoLLM Ontology-grounded LLM | https://www.sciencedirect.com/science/article/abs/pii/S0957417426004185 | 2025 |

---

## 11. 불확실성 및 한계 명시

**수치 불확실성**
- ROI 수치들(300%, 457%, 150~250%): 모두 벤더 또는 컨설팅 보고서 기반으로 측정 방법론과 기간 산정이 균일하지 않음.
- 시장 규모 CAGR 35.3%: 고성장 예측으로 신뢰 구간이 매우 넓음.
- OEE 60~80% 향상: 단일 발언자(CEO) 인용으로 교차 검증 필요.

**범위 한계**
- 본 조사는 웹 공개 자료 기반으로 비공개 기업 사례, 내부 실증 데이터는 포함하지 못함.
- GenAI의 제조업 적용은 2024~2025년에 급격히 진화 중이어서 현재 보고된 성과가 6~12개월 내 빠르게 업데이트될 가능성이 높음.

**반증 미발견**
- "AI 기반 예지보전이 기존 시간 기반 유지보수보다 비용 효율적"이라는 주장에 대한 체계적 반증은 발견되지 않았으나, 구현 실패 사례 데이터는 공개된 사례가 제한적임(생존 편향 가능성).

**검색 도구 제약**
- 이번 세션에서 `./scripts/search.sh` (Perplexity/Tavily API) 사용 불가. WebSearch 내장 도구만 사용.
