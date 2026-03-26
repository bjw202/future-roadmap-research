// === Part 1 시작 ===

'use strict';

const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';

const TOTAL_SLIDES = 55;

// ===== 색상 상수 =====
const COLORS = {
  bg_primary:    'FFFFFF',
  bg_secondary:  'F1F5F9',
  bg_dark:       '1E293B',
  text_primary:  '1E293B',
  text_secondary:'475569',
  text_tertiary: '94A3B8',
  text_on_dark:  'F8FAFC',
  accent_blue:   '4A7BF7',
  accent_cyan:   '00D4AA',
  accent_yellow: 'FFB020',
  accent_red:    'FF6B6B',
  accent_purple: '8B5CF6'
};

// ===== 폰트 상수 =====
const FONTS = {
  title:    { fontFace: 'Pretendard ExtraBold', bold: true },
  subtitle: { fontFace: 'Pretendard SemiBold',  bold: true },
  body:     { fontFace: 'Pretendard',            bold: false },
  caption:  { fontFace: 'Pretendard Light',      bold: false },
  serif:    { fontFace: 'ChosunNm',              bold: false },
  kpi:      { fontFace: 'Pretendard Black',      bold: true },
  deco:     { fontFace: 'Pretendard Thin',       bold: false }
};

// ===== 테이블 스타일 =====
const TABLE_STYLE = {
  header: {
    bold: true,
    fill: { color: COLORS.bg_dark },
    color: COLORS.text_on_dark,
    fontFace: 'Pretendard',
    fontSize: 11,
    align: 'center',
    valign: 'middle'
  },
  cell: {
    fontFace: 'Pretendard',
    fontSize: 11,
    color: COLORS.text_secondary,
    valign: 'middle'
  },
  cellRight: {
    fontFace: 'Pretendard',
    fontSize: 11,
    color: COLORS.text_secondary,
    align: 'right',
    valign: 'middle'
  },
  cellAlt: {
    fontFace: 'Pretendard',
    fontSize: 11,
    color: COLORS.text_secondary,
    fill: { color: COLORS.bg_secondary },
    valign: 'middle'
  },
  cellTotal: {
    bold: true,
    fontFace: 'Pretendard',
    fontSize: 11,
    color: COLORS.text_primary,
    border: [{ type: 'solid', pt: 1.5, color: COLORS.text_primary }, null, null, null],
    valign: 'middle'
  }
};

const TABLE_OPTIONS = {
  x: 0.6,
  y: 1.8,
  w: 12.13,
  border: { type: 'solid', pt: 0.5, color: 'E2E8F0' },
  autoPage: false,
  margin: [5, 8, 5, 8]
};

// ===== 차트 스타일 =====
const CHART_STYLE = {
  base: {
    showTitle: true,
    titleFontFace: 'Pretendard',
    titleFontSize: 14,
    titleColor: COLORS.text_primary,
    showLegend: true,
    legendFontFace: 'Pretendard',
    legendFontSize: 9,
    legendColor: COLORS.text_secondary,
    catAxisLabelFontFace: 'Pretendard',
    catAxisLabelFontSize: 10,
    catAxisLabelColor: COLORS.text_tertiary,
    valAxisLabelFontFace: 'Pretendard',
    valAxisLabelFontSize: 10,
    valAxisLabelColor: COLORS.text_tertiary
  },
  colors: ['4A7BF7', '00D4AA', 'FFB020', 'FF6B6B', '8B5CF6', '38BDF8']
};

// ===== 레이아웃 상수 =====
const CARD_2X2 = {
  w: 5.915, h: 2.45, gap: 0.3,
  positions: [
    { x: 0.6,   y: 1.8  },
    { x: 6.815, y: 1.8  },
    { x: 0.6,   y: 4.55 },
    { x: 6.815, y: 4.55 }
  ]
};

const CARD_2X3 = {
  w: 3.843, h: 2.45, gap: 0.3,
  positions: [
    { x: 0.6,   y: 1.8  },
    { x: 4.743, y: 1.8  },
    { x: 8.886, y: 1.8  },
    { x: 0.6,   y: 4.55 },
    { x: 4.743, y: 4.55 },
    { x: 8.886, y: 4.55 }
  ]
};

const COL_W      = 5.865;
const COL_GAP    = 0.4;
const COL_LEFT_X = 0.6;
const COL_RIGHT_X = COL_LEFT_X + COL_W + COL_GAP; // 6.865

// ===== 헬퍼 함수 =====

function addTitleBar(slide, title, subtitle = '') {
  slide.addShape('rect', {
    x: 0.6, y: 0.5, w: 1.2, h: 0.06,
    fill: { color: COLORS.accent_blue }
  });
  slide.addText(title, {
    x: 0.6, y: 0.65, w: 12.13, h: 0.9,
    fontSize: 28, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_primary, charSpacing: -0.3,
    autoFit: true
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.6, y: 1.6, w: 12.13, h: 0.4,
      fontSize: 16, fontFace: 'Pretendard',
      color: COLORS.text_tertiary
    });
  }
}

function addStyledTable(slide, headers, dataRows, opts = {}) {
  const rows = [];
  rows.push(headers.map(h => ({ text: h, options: { ...TABLE_STYLE.header } })));
  dataRows.forEach((row, i) => {
    const isAlt = i % 2 === 1;
    const baseStyle = isAlt ? TABLE_STYLE.cellAlt : TABLE_STYLE.cell;
    rows.push(row.map(cell => {
      if (typeof cell === 'string') return { text: cell, options: { ...baseStyle } };
      return { text: cell.text, options: { ...baseStyle, ...cell.options } };
    }));
  });
  slide.addTable(rows, { ...TABLE_OPTIONS, ...opts });
}

function addTitledTable(slide, tableTitle, headers, dataRows, opts = {}) {
  const colCount = headers.length;
  const rows = [];
  rows.push([{
    text: tableTitle,
    options: {
      colspan: colCount, bold: true,
      fill: { color: COLORS.bg_dark }, color: COLORS.text_on_dark,
      fontFace: 'Pretendard', fontSize: 13, align: 'center', valign: 'middle'
    }
  }]);
  rows.push(headers.map(h => ({
    text: h,
    options: {
      bold: true, fill: { color: COLORS.bg_secondary }, color: COLORS.text_primary,
      fontFace: 'Pretendard', fontSize: 11, align: 'center', valign: 'middle'
    }
  })));
  dataRows.forEach((row, i) => {
    const isAlt = i % 2 === 1;
    rows.push(row.map(cell => {
      const base = isAlt ? { ...TABLE_STYLE.cellAlt } : { ...TABLE_STYLE.cell };
      if (typeof cell === 'string') return { text: cell, options: base };
      return { text: cell.text, options: { ...base, ...cell.options } };
    }));
  });
  slide.addTable(rows, { ...TABLE_OPTIONS, ...opts });
}

function addStyledChart(slide, type, chartData, opts = {}) {
  const typeMap = {
    BAR: pptx.charts.BAR, LINE: pptx.charts.LINE, PIE: pptx.charts.PIE,
    DOUGHNUT: pptx.charts.DOUGHNUT, AREA: pptx.charts.AREA,
    RADAR: pptx.charts.RADAR, SCATTER: pptx.charts.SCATTER, BUBBLE: pptx.charts.BUBBLE
  };
  const defaults = {
    x: 0.6, y: 1.8, w: 12.13, h: 5.0,
    ...CHART_STYLE.base,
    chartColors: CHART_STYLE.colors.slice(0, chartData.length || 6),
    ...opts
  };
  if (type === 'BAR') {
    defaults.barGapWidthPct = 80;
    defaults.catAxisOrientation = 'minMax';
    defaults.valAxisOrientation = 'minMax';
  }
  if (type === 'LINE') {
    defaults.lineDataSymbol = 'circle';
    defaults.lineDataSymbolSize = 8;
    defaults.lineSmooth = false;
  }
  if (type === 'PIE' || type === 'DOUGHNUT') {
    defaults.showPercent = true;
    defaults.showLegend = true;
    defaults.legendPos = 'b';
    defaults.chartColors = CHART_STYLE.colors.slice(0, chartData[0]?.values?.length || 6);
  }
  slide.addChart(typeMap[type], chartData, defaults);
}

function addCard(slide, { x, y, w, h, title, body, accentColor }) {
  slide.addShape('roundRect', {
    x, y, w, h, rectRadius: 0.1,
    fill: { color: 'FFFFFF' },
    line: { color: 'E2E8F0', width: 0.5 }
  });
  slide.addShape('rect', {
    x: x + 0.02, y, w: w - 0.04, h: 0.06,
    fill: { color: accentColor || COLORS.accent_blue }
  });
  slide.addText(title, {
    x: x + 0.2, y: y + 0.2, w: w - 0.4, h: 0.35,
    fontSize: 16, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_primary, autoFit: true
  });
  slide.addText(body, {
    x: x + 0.2, y: y + 0.55, w: w - 0.4, h: h - 0.75,
    fontSize: 13, fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    lineSpacingMultiple: 1.4, valign: 'top', autoFit: true
  });
}

function addPageNumber(slide, num, total) {
  slide.addText(`${num} / ${total}`, {
    x: 12.0, y: 7.05, w: 1.0, h: 0.3,
    fontSize: 9, fontFace: 'Pretendard',
    color: COLORS.text_tertiary, align: 'right'
  });
}

function calcTierCoords(tierCount, opts = {}) {
  const startY  = opts.startY  || 1.8;
  const endY    = opts.endY    || 6.8;
  const maxW    = opts.maxW    || 12.13;
  const minW    = opts.minW    || 4.0;
  const centerX = opts.centerX || 6.665;
  const gap     = opts.gap     || 0.15;
  const totalH  = endY - startY;
  const tierH   = (totalH - gap * (tierCount - 1)) / tierCount;
  const tiers   = [];
  for (let i = 0; i < tierCount; i++) {
    const ratio = i / (tierCount - 1 || 1);
    const w     = maxW - ratio * (maxW - minW);
    const x     = centerX - w / 2;
    const y     = startY + i * (tierH + gap);
    tiers.push({ x, y, w, h: tierH });
  }
  return tiers;
}

function addProcessFlow(slide, steps) {
  const stepW = (12.13 - 0.3 * (steps.length - 1)) / steps.length;
  const boxY  = 1.8;
  const boxH  = 4.8;
  steps.forEach((step, i) => {
    const x     = 0.6 + i * (stepW + 0.3);
    const color = step.accentColor || CHART_STYLE.colors[i % CHART_STYLE.colors.length];
    slide.addShape('roundRect', {
      x, y: boxY, w: stepW, h: boxH,
      rectRadius: 0.1,
      fill: { color: 'FFFFFF' },
      line: { color: 'E2E8F0', width: 0.5 }
    });
    slide.addShape('rect', {
      x: x + 0.02, y: boxY, w: stepW - 0.04, h: 0.06,
      fill: { color: color }
    });
    slide.addText(String(i + 1), {
      x: x + 0.15, y: boxY + 0.15, w: 0.4, h: 0.4,
      fontSize: 13, fontFace: FONTS.kpi.fontFace, bold: FONTS.kpi.bold,
      color: color, align: 'center', valign: 'middle'
    });
    slide.addText(step.title, {
      x: x + 0.15, y: boxY + 0.6, w: stepW - 0.3, h: 0.5,
      fontSize: 16, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, autoFit: true
    });
    slide.addText(step.body, {
      x: x + 0.15, y: boxY + 1.15, w: stepW - 0.3, h: boxH - 1.35,
      fontSize: 13, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.4, valign: 'top', autoFit: true
    });
    if (i < steps.length - 1) {
      slide.addText('→', {
        x: x + stepW, y: boxY + boxH / 2 - 0.25, w: 0.3, h: 0.5,
        fontSize: 18, fontFace: 'Pretendard',
        color: COLORS.text_tertiary, align: 'center', valign: 'middle'
      });
    }
  });
}

function addFunnel(slide, tiers) {
  const coords = calcTierCoords(tiers.length, { minW: 4.0 });
  tiers.forEach((tier, i) => {
    const { x, y, w, h } = coords[i];
    const color = CHART_STYLE.colors[i % CHART_STYLE.colors.length];
    slide.addShape('roundRect', {
      x, y, w, h, rectRadius: 0.08,
      fill: { color: color },
      line: { color: color, width: 0.01 }
    });
    const label = tier.value ? `${tier.label}  ${tier.value}` : tier.label;
    slide.addText(label, {
      x, y, w, h,
      fontSize: 15, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: 'FFFFFF', align: 'center', valign: 'middle', autoFit: true
    });
  });
}

function addMatrix(slide, quadrants, axisLabels) {
  const QUAD_POS = [
    { x: 0.6,  y: 1.8, w: 5.9, h: 2.45 },
    { x: 6.83, y: 1.8, w: 5.9, h: 2.45 },
    { x: 0.6,  y: 4.4, w: 5.9, h: 2.45 },
    { x: 6.83, y: 4.4, w: 5.9, h: 2.45 }
  ];
  quadrants.forEach((q, i) => {
    const pos   = QUAD_POS[i];
    const color = CHART_STYLE.colors[i % CHART_STYLE.colors.length];
    slide.addShape('roundRect', {
      x: pos.x, y: pos.y, w: pos.w, h: pos.h,
      rectRadius: 0.1,
      fill: { color: 'FFFFFF' },
      line: { color: 'E2E8F0', width: 0.5 }
    });
    slide.addShape('rect', {
      x: pos.x + 0.02, y: pos.y, w: pos.w - 0.04, h: 0.06,
      fill: { color: color }
    });
    slide.addText(q.title, {
      x: pos.x + 0.2, y: pos.y + 0.15, w: pos.w - 0.4, h: 0.4,
      fontSize: 15, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, autoFit: true
    });
    slide.addText(q.body, {
      x: pos.x + 0.2, y: pos.y + 0.6, w: pos.w - 0.4, h: pos.h - 0.8,
      fontSize: 12, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.4, valign: 'top', autoFit: true
    });
  });
  slide.addShape('rect', {
    x: 6.615, y: 1.8, w: 0.01, h: 5.05,
    fill: { color: 'E2E8F0' }
  });
  slide.addShape('rect', {
    x: 0.6, y: 4.3, w: 12.13, h: 0.01,
    fill: { color: 'E2E8F0' }
  });
  if (axisLabels?.x) {
    slide.addText(axisLabels.x, {
      x: 0.6, y: 6.75, w: 12.13, h: 0.25,
      fontSize: 11, fontFace: FONTS.caption.fontFace,
      color: COLORS.text_tertiary, align: 'center'
    });
  }
  if (axisLabels?.y) {
    slide.addText(axisLabels.y, {
      x: 0.0, y: 1.8, w: 0.55, h: 5.05,
      fontSize: 11, fontFace: FONTS.caption.fontFace,
      color: COLORS.text_tertiary, align: 'center', valign: 'middle',
      vert: 'eaVert'
    });
  }
}

function addPyramid(slide, tiers) {
  const coords = calcTierCoords(tiers.length, { minW: 4.0 }).reverse();
  tiers.forEach((tier, i) => {
    const { x, y, w, h } = coords[i];
    const color = CHART_STYLE.colors[i % CHART_STYLE.colors.length];
    slide.addShape('roundRect', {
      x, y, w, h, rectRadius: 0.08,
      fill: { color: color },
      line: { color: color, width: 0.01 }
    });
    const text = tier.description
      ? [{ text: tier.label, options: { bold: true } }, { text: `  ${tier.description}` }]
      : tier.label;
    slide.addText(text, {
      x, y, w, h,
      fontSize: 14, fontFace: FONTS.body.fontFace,
      color: 'FFFFFF', align: 'center', valign: 'middle', autoFit: true
    });
  });
}

function addVenn(slide, circles, intersection) {
  const r   = 3.2;
  const cy  = 4.3;
  const cx1 = 4.3;
  const cx2 = 9.1;
  const colors = [CHART_STYLE.colors[0], CHART_STYLE.colors[1]];
  slide.addShape('ellipse', {
    x: cx1 - r / 2, y: cy - r / 2, w: r, h: r,
    fill: { color: colors[0], transparency: 40 },
    line: { color: colors[0], width: 1 }
  });
  slide.addShape('ellipse', {
    x: cx2 - r / 2, y: cy - r / 2, w: r, h: r,
    fill: { color: colors[1], transparency: 40 },
    line: { color: colors[1], width: 1 }
  });
  slide.addText(circles[0]?.description
    ? `${circles[0].label}\n${circles[0].description}`
    : (circles[0]?.label || ''), {
    x: cx1 - r / 2, y: cy - 0.6, w: r * 0.6, h: 1.2,
    fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: 'FFFFFF', align: 'center', valign: 'middle', autoFit: true
  });
  slide.addText(circles[1]?.description
    ? `${circles[1].label}\n${circles[1].description}`
    : (circles[1]?.label || ''), {
    x: cx2 - r * 0.1, y: cy - 0.6, w: r * 0.6, h: 1.2,
    fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: 'FFFFFF', align: 'center', valign: 'middle', autoFit: true
  });
  if (intersection) {
    const intX    = (cx1 + cx2) / 2;
    const intText = intersection.description
      ? `${intersection.label}\n${intersection.description}`
      : intersection.label;
    slide.addText(intText, {
      x: intX - 1.0, y: cy - 0.6, w: 2.0, h: 1.2,
      fontSize: 12, fontFace: FONTS.body.fontFace,
      color: COLORS.text_primary, align: 'center', valign: 'middle', autoFit: true
    });
  }
}

function addBeforeAfter(slide, before, after) {
  const panelY = 1.8;
  const panelH = 5.05;
  const panelW = 5.9;

  // Left: dark "Before" panel
  slide.addShape('roundRect', {
    x: 0.6, y: panelY, w: panelW, h: panelH,
    rectRadius: 0.1,
    fill: { color: COLORS.bg_dark },
    line: { color: COLORS.bg_dark, width: 0.01 }
  });
  slide.addText('BEFORE', {
    x: 0.8, y: panelY + 0.15, w: 1.5, h: 0.3,
    fontSize: 9, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary, charSpacing: 1.5
  });
  slide.addText(before.title, {
    x: 0.8, y: panelY + 0.5, w: panelW - 0.4, h: 0.5,
    fontSize: 18, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_on_dark, autoFit: true
  });
  slide.addShape('rect', {
    x: 0.8, y: panelY + 1.1, w: panelW - 0.4, h: 0.01,
    fill: { color: '3A4A5E' }
  });
  const beforeText = before.bullets.map(b => `• ${b}`).join('\n');
  slide.addText(beforeText, {
    x: 0.8, y: panelY + 1.25, w: panelW - 0.4, h: panelH - 1.45,
    fontSize: 13, fontFace: FONTS.body.fontFace,
    color: COLORS.text_on_dark,
    lineSpacingMultiple: 1.5, valign: 'top', autoFit: true
  });

  // Right: light "After" panel
  slide.addShape('roundRect', {
    x: 6.83, y: panelY, w: panelW, h: panelH,
    rectRadius: 0.1,
    fill: { color: 'FFFFFF' },
    line: { color: COLORS.accent_blue, width: 1.5 }
  });
  slide.addText('AFTER', {
    x: 7.03, y: panelY + 0.15, w: 1.5, h: 0.3,
    fontSize: 9, fontFace: FONTS.caption.fontFace,
    color: COLORS.accent_blue, charSpacing: 1.5
  });
  slide.addText(after.title, {
    x: 7.03, y: panelY + 0.5, w: panelW - 0.4, h: 0.5,
    fontSize: 18, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_primary, autoFit: true
  });
  slide.addShape('rect', {
    x: 7.03, y: panelY + 1.1, w: panelW - 0.4, h: 0.01,
    fill: { color: COLORS.accent_blue }
  });
  const afterText = after.bullets.map(b => `• ${b}`).join('\n');
  slide.addText(afterText, {
    x: 7.03, y: panelY + 1.25, w: panelW - 0.4, h: panelH - 1.45,
    fontSize: 13, fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    lineSpacingMultiple: 1.5, valign: 'top', autoFit: true
  });

  // Center divider
  slide.addShape('rect', {
    x: 6.615, y: panelY, w: 0.01, h: panelH,
    fill: { color: 'E2E8F0' }
  });
}

function addRoadmap(slide, milestones) {
  const lineY  = 4.3;
  const lineX  = 0.6;
  const lineW  = 12.13;
  const dotR   = 0.15;
  const blockW = lineW / milestones.length;

  slide.addShape('rect', {
    x: lineX, y: lineY - 0.01, w: lineW, h: 0.01,
    fill: { color: COLORS.accent_blue }
  });

  milestones.forEach((m, i) => {
    const cx    = lineX + blockW * i + blockW / 2;
    const above = i % 2 === 0;

    slide.addShape('ellipse', {
      x: cx - dotR, y: lineY - dotR, w: dotR * 2, h: dotR * 2,
      fill: { color: CHART_STYLE.colors[i % CHART_STYLE.colors.length] },
      line: { color: 'FFFFFF', width: 1 }
    });

    const connH = 0.5;
    slide.addShape('rect', {
      x: cx - 0.005, y: above ? lineY - dotR - connH : lineY + dotR,
      w: 0.01, h: connH,
      fill: { color: 'CBD5E1' }
    });

    slide.addText(m.date, {
      x: cx - blockW / 2 * 0.9,
      y: above ? lineY - dotR - connH - 0.25 : lineY + dotR + connH + 0.02,
      w: blockW * 0.9, h: 0.25,
      fontSize: 10, fontFace: FONTS.caption.fontFace,
      color: COLORS.text_tertiary, align: 'center'
    });

    slide.addText(m.title, {
      x: cx - blockW / 2 * 0.9,
      y: above ? lineY - dotR - connH - 0.6 : lineY + dotR + connH + 0.28,
      w: blockW * 0.9, h: 0.35,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, align: 'center', autoFit: true
    });

    if (m.description) {
      slide.addText(m.description, {
        x: cx - blockW / 2 * 0.9,
        y: above ? lineY - dotR - connH - 1.3 : lineY + dotR + connH + 0.65,
        w: blockW * 0.9, h: 0.65,
        fontSize: 11, fontFace: FONTS.body.fontFace,
        color: COLORS.text_secondary, align: 'center',
        lineSpacingMultiple: 1.3, valign: 'top', autoFit: true
      });
    }
  });
}

function addStatHighlight(slide, { number, label, context, trend }) {
  slide.addText(number, {
    x: 0.6, y: 2.2, w: 12.13, h: 1.8,
    fontSize: 72, fontFace: FONTS.kpi.fontFace, bold: FONTS.kpi.bold,
    color: COLORS.text_primary, align: 'center', valign: 'middle', autoFit: true
  });
  slide.addShape('rect', {
    x: 5.165, y: 4.1, w: 3.0, h: 0.01,
    fill: { color: COLORS.accent_blue }
  });
  slide.addText(label, {
    x: 0.6, y: 4.2, w: 12.13, h: 0.5,
    fontSize: 20, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_secondary, align: 'center', autoFit: true
  });
  if (context) {
    slide.addText(context, {
      x: 0.6, y: 4.85, w: 12.13, h: 0.4,
      fontSize: 14, fontFace: FONTS.body.fontFace,
      color: COLORS.text_tertiary, align: 'center', autoFit: true
    });
  }
  if (trend) {
    const isPositive = /[▲+]/.test(trend);
    slide.addText(trend, {
      x: 0.6, y: 5.35, w: 12.13, h: 0.4,
      fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: isPositive ? '00D4AA' : 'FF6B6B', align: 'center'
    });
  }
}

function addIconGrid(slide, items, layout) {
  const ICON_2X3 = [
    { x: 0.6,  y: 1.8,  w: 3.8,  h: 2.35 },
    { x: 4.73, y: 1.8,  w: 3.8,  h: 2.35 },
    { x: 8.86, y: 1.8,  w: 3.87, h: 2.35 },
    { x: 0.6,  y: 4.35, w: 3.8,  h: 2.35 },
    { x: 4.73, y: 4.35, w: 3.8,  h: 2.35 },
    { x: 8.86, y: 4.35, w: 3.87, h: 2.35 }
  ];
  let positions;
  if (layout === '3x3') {
    const cols  = 3;
    const rows  = 3;
    const cellW = 12.13 / cols;
    const cellH = 5.05 / rows;
    positions   = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions.push({
          x: 0.6 + c * cellW,
          y: 1.8  + r * cellH,
          w: cellW - 0.1,
          h: cellH - 0.1
        });
      }
    }
  } else {
    positions = ICON_2X3;
  }
  items.forEach((item, i) => {
    if (i >= positions.length) return;
    const pos   = positions[i];
    const color = CHART_STYLE.colors[i % CHART_STYLE.colors.length];
    slide.addShape('roundRect', {
      x: pos.x, y: pos.y, w: pos.w, h: pos.h,
      rectRadius: 0.1,
      fill: { color: 'FFFFFF' },
      line: { color: 'E2E8F0', width: 0.5 }
    });
    slide.addText(item.icon, {
      x: pos.x + 0.15, y: pos.y + 0.15, w: 0.55, h: 0.55,
      fontSize: 22, fontFace: 'Pretendard',
      color: color, align: 'center', valign: 'middle'
    });
    slide.addText(item.title, {
      x: pos.x + 0.15, y: pos.y + 0.75, w: pos.w - 0.3, h: 0.4,
      fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, autoFit: true
    });
    slide.addText(item.body, {
      x: pos.x + 0.15, y: pos.y + 1.2, w: pos.w - 0.3, h: pos.h - 1.35,
      fontSize: 11, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.35, valign: 'top', autoFit: true
    });
  });
}

function addLayeredStack(slide, layers) {
  const baseX  = 1.5;
  const baseY  = 1.8;
  const layerW = 10.0;
  const layerH = 0.9;
  const offsetX = 0.18;
  const offsetY = 0.12;
  const gap     = 0.5;
  layers.forEach((layer, i) => {
    const x     = baseX + i * offsetX;
    const y     = baseY + i * (layerH + gap + offsetY);
    const color = CHART_STYLE.colors[i % CHART_STYLE.colors.length];
    slide.addShape('roundRect', {
      x: x + 0.1, y: y + 0.08, w: layerW, h: layerH,
      rectRadius: 0.08,
      fill: { color: 'E2E8F0' },
      line: { color: 'E2E8F0', width: 0.01 }
    });
    slide.addShape('roundRect', {
      x, y, w: layerW, h: layerH,
      rectRadius: 0.08,
      fill: { color: color },
      line: { color: color, width: 0.01 }
    });
    slide.addText(layer.title, {
      x: x + 0.3, y, w: 3.0, h: layerH,
      fontSize: 14, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: 'FFFFFF', valign: 'middle', autoFit: true
    });
    slide.addShape('rect', {
      x: x + 3.4, y: y + 0.2, w: 0.01, h: layerH - 0.4,
      fill: { color: 'FFFFFF' }
    });
    slide.addText(layer.body, {
      x: x + 3.6, y, w: layerW - 3.9, h: layerH,
      fontSize: 12, fontFace: FONTS.body.fontFace,
      color: 'FFFFFF', valign: 'middle', autoFit: true
    });
  });
}

function addComparisonTable(slide, features, options) {
  const CHECK = '\u2713';
  const CROSS = '\u2717';
  const colW  = (12.13 - 3.0) / options.length;
  const rows  = [];
  const headerRow = [
    { text: '기능', options: { ...TABLE_STYLE.header, align: 'left' } },
    ...options.map(opt => ({ text: opt.name, options: { ...TABLE_STYLE.header, align: 'center' } }))
  ];
  rows.push(headerRow);
  features.forEach((feat, fi) => {
    const isAlt = fi % 2 === 1;
    const base  = isAlt ? TABLE_STYLE.cellAlt : TABLE_STYLE.cell;
    const row   = [
      { text: feat, options: { ...base } },
      ...options.map(opt => {
        const checked = opt.checks[fi];
        return {
          text: checked ? CHECK : CROSS,
          options: { ...base, align: 'center', bold: true, color: checked ? '27AE60' : 'EB5757' }
        };
      })
    ];
    rows.push(row);
  });
  const rowH    = Math.max(0.3, (7.0 - 1.8 - 0.4) / (rows.length));
  const featColW = 3.0;
  const colWidths = [featColW, ...options.map(() => colW)];
  slide.addTable(rows, { ...TABLE_OPTIONS, colW: colWidths, rowH });
}

// =============================================================
// 슬라이드 함수
// =============================================================

// [01] Title Slide — 표지
function slide01_title() {
  const slide = pptx.addSlide();

  // 풀블리드 다크 배경
  slide.addShape('rect', { x: 0, y: 0, w: 13.33, h: 7.5, fill: { color: COLORS.bg_dark } });

  // 장식 accent 라인
  slide.addShape('rect', { x: 1.5, y: 2.2, w: 1.8, h: 0.06, fill: { color: COLORS.accent_cyan } });

  // 상단 카테고리 레이블
  slide.addText('기술기획 리서치 보고서  |  2026.03.25', {
    x: 1.5, y: 1.7, w: 10.33, h: 0.35,
    fontSize: 13, fontFace: 'Pretendard',
    color: 'FFFFFF', transparency: 50, align: 'left'
  });

  // 메인 제목
  slide.addText('레이저 기술 미래 로드맵', {
    x: 1.5, y: 2.35, w: 10.33, h: 1.0,
    fontSize: 48, fontFace: FONTS.title.fontFace, bold: FONTS.title.bold,
    color: COLORS.text_on_dark, align: 'left',
    charSpacing: -0.5, lineSpacingMultiple: 1.1
  });

  // 부제목
  slide.addText('3대 구조 변화와 전략 대응', {
    x: 1.5, y: 3.45, w: 10.33, h: 0.7,
    fontSize: 28, fontFace: 'Pretendard',
    color: COLORS.accent_cyan, align: 'left'
  });

  // 구분선
  slide.addShape('rect', { x: 1.5, y: 4.3, w: 10.33, h: 0.01, fill: { color: '3A4A5E' } });

  // 3개 핵심 키워드 배지
  const badges = [
    { text: '폴더블/MicroLED', color: COLORS.accent_blue },
    { text: 'EV 이종금속 용접', color: COLORS.accent_cyan },
    { text: 'AI 자율 공정', color: COLORS.accent_yellow }
  ];
  badges.forEach((b, i) => {
    const bx = 1.5 + i * 3.6;
    slide.addShape('roundRect', {
      x: bx, y: 4.5, w: 3.2, h: 0.45,
      rectRadius: 0.08,
      fill: { color: b.color },
      line: { color: b.color, width: 0.01 }
    });
    slide.addText(b.text, {
      x: bx, y: 4.5, w: 3.2, h: 0.45,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: 'FFFFFF', align: 'center', valign: 'middle'
    });
  });

  // 발표자/날짜
  slide.addText('레이저 기술기획팀  |  2026년 3월', {
    x: 1.5, y: 6.3, w: 10.33, h: 0.4,
    fontSize: 14, fontFace: 'Pretendard',
    color: 'FFFFFF', transparency: 50, align: 'left'
  });

  addPageNumber(slide, 1, TOTAL_SLIDES);
}

// [02] Stat Highlight — 3대 핵심 숫자
function slide02_stat_three_numbers() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'EV 배터리·폴더블·AI 자율화 — 3대 시장이 동시에 임계점에 도달한다');

  // 3개 KPI 카드 영역 (y=1.85 ~ 4.5)
  const kpis = [
    {
      number: '$3.2B',
      label: 'EV 배터리 레이저 용접',
      detail: '이종금속(Al-Cu) 정밀 용접 수요\n2026년 이후 급성장 국면 진입',
      color: COLORS.accent_blue,
      bg: 'EBF0FF'
    },
    {
      number: '15M+',
      label: '폴더블 패널/년',
      detail: 'Apple 폴더블 iPhone 2026 출시\nSamsung Display 독점 공급 확정',
      color: COLORS.accent_cyan,
      bg: 'E6FAF5'
    },
    {
      number: '2026',
      label: 'AI 공정 자율화 원년',
      detail: '인라인 센서 + AI 피드백루프\n레이저 공정 실시간 제어 상용화',
      color: COLORS.accent_yellow,
      bg: 'FFF8E6'
    }
  ];

  const cardW = (12.13 - 0.3 * 2) / 3; // 3.843"
  const cardY = 1.85;
  const cardH = 2.5;

  kpis.forEach((k, i) => {
    const cx = 0.6 + i * (cardW + 0.3);

    // 카드 배경
    slide.addShape('roundRect', {
      x: cx, y: cardY, w: cardW, h: cardH,
      rectRadius: 0.1,
      fill: { color: k.bg },
      line: { color: 'E2E8F0', width: 0.5 }
    });

    // 상단 accent 바
    slide.addShape('rect', {
      x: cx + 0.02, y: cardY, w: cardW - 0.04, h: 0.06,
      fill: { color: k.color }
    });

    // 큰 숫자
    slide.addText(k.number, {
      x: cx + 0.15, y: cardY + 0.2, w: cardW - 0.3, h: 1.0,
      fontSize: 44, fontFace: FONTS.kpi.fontFace, bold: FONTS.kpi.bold,
      color: k.color, align: 'center', valign: 'middle', autoFit: true
    });

    // 레이블
    slide.addText(k.label, {
      x: cx + 0.15, y: cardY + 1.25, w: cardW - 0.3, h: 0.4,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, align: 'center', autoFit: true
    });

    // 구분선
    slide.addShape('rect', {
      x: cx + 0.3, y: cardY + 1.7, w: cardW - 0.6, h: 0.01,
      fill: { color: 'E2E8F0' }
    });

    // 상세 설명
    slide.addText(k.detail, {
      x: cx + 0.15, y: cardY + 1.8, w: cardW - 0.3, h: 0.6,
      fontSize: 11, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, align: 'center',
      lineSpacingMultiple: 1.4, autoFit: true
    });
  });

  // 하단 인사이트 박스
  slide.addShape('roundRect', {
    x: 0.6, y: 4.55, w: 12.13, h: 2.25,
    rectRadius: 0.1,
    fill: { color: COLORS.bg_secondary },
    line: { color: 'E2E8F0', width: 0.5 }
  });

  slide.addText('전략적 함의', {
    x: 0.85, y: 4.7, w: 2.0, h: 0.35,
    fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_blue
  });

  const insights = [
    '• EV 배터리 $3.2B 시장은 이종금속 용접 특화 역량이 핵심 — 보유 기술 직결',
    '• 폴더블 15M+ 패널 수요는 LLO·GLLO·UTG 가공 전 밸류체인에 걸쳐 레이저 장비 수요 폭발',
    '• AI 자율화는 기술 자체보다 "센서+데이터+SW" 통합 역량을 보유한 업체가 포지션 선점'
  ];
  slide.addText(insights.join('\n'), {
    x: 0.85, y: 5.1, w: 11.6, h: 1.5,
    fontSize: 13, fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    lineSpacingMultiple: 1.6, valign: 'top', autoFit: true
  });

  addPageNumber(slide, 2, TOTAL_SLIDES);
}

// [03] Cards 2x2 — 36개월 내 3가지 구조 변화
function slide03_cards_structural_changes() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '36개월 내 3가지 구조 변화가 레이저 산업을 재편한다');

  const cards = [
    {
      title: '① 폴더블 / MicroLED 수요 폭발',
      body: 'Apple·Samsung·LG 폴더블 확대\nMicroLED 전사(Transfer) 정밀도 요구 급상승\n→ LLO·GLLO·레이저 리페어 장비 수요 연동',
      accentColor: COLORS.accent_blue
    },
    {
      title: '② EV 이종금속 용접 급성장',
      body: '배터리 탭/버스바 Al-Cu 이종용접 필수화\n글로벌 EV 배터리 용접 시장 $3.2B 이상\n→ 고출력 싱글모드 레이저 중심 재편',
      accentColor: COLORS.accent_cyan
    },
    {
      title: '③ AI + 센서 융합 자율 공정',
      body: '인라인 비전·분광·OCT 센서 + AI 제어\n수율 자동 보정·이상 예지 보전 상용화\n→ 장비 기업에서 공정 플랫폼 기업으로 전환',
      accentColor: COLORS.accent_yellow
    },
    {
      title: '④ 중국 레이저 가격 역습',
      body: '중국 IPG·레이저라인급 출력 달성\n중저가 시장 → 점차 중간급까지 침투\n→ 한국 기업 차별화 포인트: 공정 통합 + 수율',
      accentColor: COLORS.accent_red
    }
  ];

  CARD_2X2.positions.forEach((pos, i) => {
    addCard(slide, {
      x: pos.x, y: pos.y,
      w: CARD_2X2.w, h: CARD_2X2.h,
      title: cards[i].title,
      body: cards[i].body,
      accentColor: cards[i].accentColor
    });
  });

  addPageNumber(slide, 3, TOTAL_SLIDES);
}

// [04] Content — 보유 기술 5개 연결점
function slide04_tech_connections() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '보유 기술 5개 중 4개가 즉시 확장 가능한 연결점을 가진다');

  // 배경 안내 텍스트
  slide.addText('보유 기술  →  확장 방향  →  시장 기회', {
    x: 0.6, y: 1.82, w: 12.13, h: 0.3,
    fontSize: 12, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary, align: 'center'
  });

  const connections = [
    {
      tech: 'LLO',
      arrow: '→',
      ext: 'GLLO / MicroLED 전사',
      market: '폴더블·MicroLED 장비',
      color: COLORS.accent_blue,
      bg: 'EBF0FF'
    },
    {
      tech: 'LILE',
      arrow: '→',
      ext: '폴더블 드릴링 / 레이저 수리',
      market: '폴더블 힌지 홀·패널 리페어',
      color: COLORS.accent_cyan,
      bg: 'E6FAF5'
    },
    {
      tech: '글라스 가공',
      arrow: '→',
      ext: 'UTG 이중층 가공',
      market: '폴더블 UTG 커버윈도우',
      color: COLORS.accent_yellow,
      bg: 'FFF8E6'
    },
    {
      tech: '이종금속 용접',
      arrow: '→',
      ext: 'EV 배터리 탭 용접',
      market: 'EV 배터리 팩 용접 $3.2B',
      color: COLORS.accent_red,
      bg: 'FFF0F0'
    },
    {
      tech: 'Selective 제거',
      arrow: '→',
      ext: '레이저 디본딩',
      market: '반도체 패키징 디본딩 $166M',
      color: COLORS.accent_purple,
      bg: 'F3EFFF'
    }
  ];

  const rowH   = 0.84;
  const startY = 2.2;

  connections.forEach((c, i) => {
    const cy = startY + i * (rowH + 0.08);

    // 행 배경
    slide.addShape('roundRect', {
      x: 0.6, y: cy, w: 12.13, h: rowH,
      rectRadius: 0.08,
      fill: { color: c.bg },
      line: { color: 'E2E8F0', width: 0.5 }
    });

    // 좌측 기술명 뱃지
    slide.addShape('roundRect', {
      x: 0.75, y: cy + 0.14, w: 2.0, h: 0.55,
      rectRadius: 0.06,
      fill: { color: c.color },
      line: { color: c.color, width: 0.01 }
    });
    slide.addText(c.tech, {
      x: 0.75, y: cy + 0.14, w: 2.0, h: 0.55,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: 'FFFFFF', align: 'center', valign: 'middle'
    });

    // 화살표
    slide.addText('→', {
      x: 2.85, y: cy + 0.14, w: 0.4, h: 0.55,
      fontSize: 16, fontFace: 'Pretendard',
      color: COLORS.text_tertiary, align: 'center', valign: 'middle'
    });

    // 확장 방향
    slide.addText(c.ext, {
      x: 3.3, y: cy + 0.05, w: 4.2, h: rowH - 0.1,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, valign: 'middle', autoFit: true
    });

    // 구분선
    slide.addShape('rect', {
      x: 7.6, y: cy + 0.2, w: 0.01, h: rowH - 0.4,
      fill: { color: 'CBD5E1' }
    });

    // 시장 기회
    slide.addText(c.market, {
      x: 7.75, y: cy + 0.05, w: 4.85, h: rowH - 0.1,
      fontSize: 13, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, valign: 'middle', autoFit: true
    });
  });

  addPageNumber(slide, 4, TOTAL_SLIDES);
}

// [05] Section Divider — Part 1 시작
function slide05_section_part1() {
  const slide = pptx.addSlide();

  // 좌측 다크 패널 (40%)
  slide.addShape('rect', { x: 0, y: 0, w: 5.33, h: 7.5, fill: { color: COLORS.bg_dark } });

  // 섹션 번호
  slide.addText('01', {
    x: 1.0, y: 2.3, w: 3.33, h: 1.5,
    fontSize: 80, fontFace: FONTS.title.fontFace, bold: FONTS.title.bold,
    color: COLORS.accent_cyan, align: 'center'
  });

  // 좌측 하단 레이블
  slide.addText('Part 1', {
    x: 1.0, y: 3.9, w: 3.33, h: 0.4,
    fontSize: 14, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary, align: 'center'
  });

  // 우측: 섹션 제목
  slide.addShape('rect', {
    x: 6.0, y: 2.3, w: 1.5, h: 0.06,
    fill: { color: COLORS.accent_cyan }
  });
  slide.addText('현황', {
    x: 6.0, y: 2.45, w: 6.73, h: 0.8,
    fontSize: 42, fontFace: FONTS.title.fontFace, bold: FONTS.title.bold,
    color: COLORS.text_primary
  });
  slide.addText('우리의 기술 자산과 시장 지형', {
    x: 6.0, y: 3.35, w: 6.73, h: 0.55,
    fontSize: 22, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_blue
  });
  slide.addText(
    '보유 5대 기술의 현재 적용 영역을 정리하고,\n레이저 응용 시장 전체 규모와 기회 영역을 파악한다.',
    {
      x: 6.0, y: 4.1, w: 6.73, h: 1.0,
      fontSize: 16, fontFace: 'Pretendard',
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.5
    }
  );

  addPageNumber(slide, 5, TOTAL_SLIDES);
}

// [06] Icon Grid — 5대 보유 기술
function slide06_icon_grid_five_techs() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '5대 보유 기술과 현재 적용 영역');

  // 5개 항목을 2x3 그리드에 배치 (6번째 칸은 요약 박스)
  const techs = [
    {
      icon: '◉',
      title: 'LLO (Laser Lift-Off)',
      body: '플렉서블 OLED 캐리어 유리 분리\n308nm 엑시머 레이저 표준 공정\n스마트폰·웨어러블 양산 적용'
    },
    {
      icon: '◈',
      title: 'LILE (선택적 에칭/패터닝)',
      body: '레이저 유도 선택 식각\n초정밀 패터닝·홀 가공\n디스플레이·반도체 패키징 적용'
    },
    {
      icon: '◆',
      title: '글라스 가공',
      body: 'UTG·커버글라스 정밀 커팅·드릴\n스텔스 다이싱·내부 가공\n폴더블 UTG 이중층 확장 가능'
    },
    {
      icon: '◐',
      title: '이종금속 용접',
      body: 'Al-Cu·스틸-알루 이종재 용접\n중프레임·구조재 양산 적용\nEV 배터리 탭 용접으로 확장 가능'
    },
    {
      icon: '◎',
      title: 'Selective 제거',
      body: '광흡수 기반 선택적 물질 제거\n레이저 디본딩 적용 가능\n반도체 패키징 $166M 시장 연결'
    }
  ];

  addIconGrid(slide, techs, '2x3');

  // 6번째 칸 — 전략 요약 박스
  const pos6 = { x: 8.86, y: 4.35, w: 3.87, h: 2.35 };
  slide.addShape('roundRect', {
    x: pos6.x, y: pos6.y, w: pos6.w, h: pos6.h,
    rectRadius: 0.1,
    fill: { color: COLORS.bg_dark },
    line: { color: COLORS.bg_dark, width: 0.01 }
  });
  slide.addText('핵심 강점', {
    x: pos6.x + 0.2, y: pos6.y + 0.15, w: pos6.w - 0.4, h: 0.35,
    fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_cyan
  });
  slide.addText(
    '• 5대 기술 모두 자체 개발 기반\n• 4개 기술이 신시장 직결 확장 가능\n• 이종금속·LLO는 즉시 사업화 가능',
    {
      x: pos6.x + 0.2, y: pos6.y + 0.55, w: pos6.w - 0.4, h: 1.65,
      fontSize: 12, fontFace: FONTS.body.fontFace,
      color: COLORS.text_on_dark,
      lineSpacingMultiple: 1.5, valign: 'top', autoFit: true
    }
  );

  addPageNumber(slide, 6, TOTAL_SLIDES);
}

// [07] Table — 레이저 응용 시장 규모 총괄
function slide07_market_table() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '레이저 응용 시장 규모 총괄');

  const headers = ['응용 분야', '시장 규모', '비고 / 근거', '당사 연결 기술'];
  const dataRows = [
    [
      'EV 배터리 레이저 용접',
      { text: '$3.2B (2026)', options: { bold: true, color: COLORS.accent_blue } },
      '이종금속(Al-Cu) 탭·버스바 용접 급성장',
      '이종금속 용접'
    ],
    [
      'USP (초단펄스) 장비',
      '$2.45 ~ 2.76B',
      '항공·의료·반도체 초정밀 가공',
      'LILE, Selective 제거'
    ],
    [
      '레이저 AM (LPBF/SLM)',
      '$2.56 ~ 3.7B',
      '항공·의료 금속 3D 프린팅 고성장',
      '이종금속 용접 기반 확장'
    ],
    [
      'LLO 장비 (단독)',
      { text: '$150 ~ 255M', options: { bold: true, color: COLORS.accent_cyan } },
      '서비스 포함 시 $295~610M, 생태계 $1B+',
      'LLO (핵심 보유)'
    ],
    [
      '레이저 어닐링',
      '$876M',
      'ELA·Green 레이저 양산 표준',
      'LLO 연동'
    ],
    [
      '레이저 디본딩',
      { text: '$166M', options: { bold: true, color: COLORS.accent_purple } },
      '반도체 패키징 임시 접합 해제',
      'Selective 제거'
    ]
  ];

  const rowH = Math.max(0.38, (7.0 - 1.8 - 0.4) / (dataRows.length + 1));
  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.8, w: 12.13,
    colW: [3.2, 2.0, 4.6, 2.33],
    rowH
  });

  // 하단 주석
  slide.addText(
    '* 시장 규모 출처: Mordor Intelligence, MarketsandMarkets, IDTechEx (2024~2025). 환율·범위 정의에 따라 수치 차이 발생.',
    {
      x: 0.6, y: 6.75, w: 12.13, h: 0.25,
      fontSize: 9, fontFace: FONTS.caption.fontFace,
      color: COLORS.text_tertiary
    }
  );

  addPageNumber(slide, 7, TOTAL_SLIDES);
}

// [08] TwoColumn — 스마트폰/디스플레이: LLO·ELA 현행, GLLO 차세대
function slide08_two_col_display() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '스마트폰/디스플레이: LLO·ELA가 양산 표준, GLLO가 차세대');

  // 좌측 패널: 현행 LLO
  slide.addShape('roundRect', {
    x: COL_LEFT_X, y: 1.8, w: COL_W, h: 5.05,
    rectRadius: 0.1,
    fill: { color: COLORS.bg_secondary },
    line: { color: 'E2E8F0', width: 0.5 }
  });
  slide.addShape('rect', {
    x: COL_LEFT_X + 0.02, y: 1.8, w: COL_W - 0.04, h: 0.06,
    fill: { color: COLORS.accent_blue }
  });
  slide.addText('현행 표준 — LLO + ELA', {
    x: COL_LEFT_X + 0.2, y: 1.9, w: COL_W - 0.4, h: 0.45,
    fontSize: 18, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_primary
  });

  const leftBullets = [
    '308nm 엑시머 레이저: 플렉서블 OLED 분리 표준',
    'ELA (Excimer Laser Annealing): 저온폴리실리콘 결정화',
    '성숙기 진입 — 장비 단가 압력 증가',
    'Samsung·BOE·CSOT 전 라인 적용 중',
    '당사 LLO 장비: 현재 양산 대응 가능 상태'
  ];
  leftBullets.forEach((b, i) => {
    slide.addText(`• ${b}`, {
      x: COL_LEFT_X + 0.2, y: 2.45 + i * 0.7, w: COL_W - 0.4, h: 0.65,
      fontSize: 13, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.4, valign: 'top', autoFit: true
    });
  });

  // 우측 패널: GLLO 차세대
  slide.addShape('roundRect', {
    x: COL_RIGHT_X, y: 1.8, w: COL_W, h: 5.05,
    rectRadius: 0.1,
    fill: { color: 'EBF0FF' },
    line: { color: COLORS.accent_blue, width: 1.5 }
  });
  slide.addShape('rect', {
    x: COL_RIGHT_X + 0.02, y: 1.8, w: COL_W - 0.04, h: 0.06,
    fill: { color: COLORS.accent_cyan }
  });
  slide.addText('차세대 — GLLO (Green LLO)', {
    x: COL_RIGHT_X + 0.2, y: 1.9, w: COL_W - 0.4, h: 0.45,
    fontSize: 18, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.text_primary
  });

  // GLLO 핵심 수치 강조
  slide.addShape('roundRect', {
    x: COL_RIGHT_X + 0.2, y: 2.45, w: COL_W - 0.4, h: 0.75,
    rectRadius: 0.08,
    fill: { color: 'FFFFFF' },
    line: { color: COLORS.accent_cyan, width: 1 }
  });
  slide.addText('탄화 발생 92.8% 감소', {
    x: COL_RIGHT_X + 0.3, y: 2.5, w: COL_W - 0.6, h: 0.35,
    fontSize: 16, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_cyan
  });
  slide.addText('캐리어 재사용 가능 → 원가 구조 혁신', {
    x: COL_RIGHT_X + 0.3, y: 2.85, w: COL_W - 0.6, h: 0.28,
    fontSize: 11, fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary
  });

  const rightBullets = [
    '532nm 그린 레이저 기반 — 엑시머 대비 TCO 우위',
    '폴더블 UTG·초박형 캐리어 가공에 적합',
    'Samsung Display 2025~2026 전환 검토 중',
    '당사 현행 LLO → GLLO 업그레이드 경로 존재'
  ];
  rightBullets.forEach((b, i) => {
    slide.addText(`• ${b}`, {
      x: COL_RIGHT_X + 0.2, y: 3.3 + i * 0.62, w: COL_W - 0.4, h: 0.58,
      fontSize: 13, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.4, valign: 'top', autoFit: true
    });
  });

  addPageNumber(slide, 8, TOTAL_SLIDES);
}

// [09] Content — TV/가전: LCD 커팅부터 세탁기 드럼 용접까지
function slide09_content_appliance() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'TV/가전: LCD 커팅부터 세탁기 드럼 용접까지 양산 표준');

  const items = [
    {
      label: '① LCD 대면적 레이저 커팅',
      body: '65~85인치 패널 스크라이빙·브레이킹 대체. 기계적 손상 제거, 엣지 품질 향상.',
      color: COLORS.accent_blue,
      bg: 'EBF0FF'
    },
    {
      label: '② OLED TV LLO / ELA 적용',
      body: 'LG OLED·Samsung QD-OLED 생산 라인에 LLO·ELA 표준 적용 완료.',
      color: COLORS.accent_cyan,
      bg: 'E6FAF5'
    },
    {
      label: '③ 세탁기 드럼 레이저 용접 — 22초 사이클타임',
      body: '스테인리스 드럼 레이저 용접. 기존 TIG 대비 사이클타임 22초, 스패터 제로.',
      color: COLORS.accent_yellow,
      bg: 'FFF8E6'
    },
    {
      label: '④ 레이저 텍스처링 (접촉각 150° 초발수)',
      body: '가전 표면 초발수/초발유 처리. 접촉각 150°+ 달성. 코팅 없는 기능성 표면.',
      color: COLORS.accent_red,
      bg: 'FFF0F0'
    },
    {
      label: '⑤ 코봇 + 레이저 협동 시스템 확산',
      body: '6축 로봇 + 레이저 헤드 통합. 가전 곡면부·불규칙 형상 자동 가공 보급 확대.',
      color: COLORS.accent_purple,
      bg: 'F3EFFF'
    }
  ];

  const rowH   = 0.9;
  const startY = 1.82;

  items.forEach((item, i) => {
    const cy = startY + i * (rowH + 0.08);
    slide.addShape('roundRect', {
      x: 0.6, y: cy, w: 12.13, h: rowH,
      rectRadius: 0.08,
      fill: { color: item.bg },
      line: { color: 'E2E8F0', width: 0.5 }
    });
    slide.addShape('rect', {
      x: 0.6, y: cy, w: 0.06, h: rowH,
      fill: { color: item.color }
    });
    slide.addText(item.label, {
      x: 0.85, y: cy + 0.07, w: 4.0, h: 0.4,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, autoFit: true
    });
    slide.addText(item.body, {
      x: 0.85, y: cy + 0.47, w: 11.65, h: 0.37,
      fontSize: 12, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.3, valign: 'top', autoFit: true
    });
  });

  addPageNumber(slide, 9, TOTAL_SLIDES);
}

// [10] Content — 범용 제조: USP·적층 제조 핵심 성장 축
function slide10_content_manufacturing() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '범용 제조: USP 고정밀 가공과 적층 제조가 핵심 성장 축');

  // 상단 2개 하이라이트 카드
  const highlights = [
    {
      kpi: '$2.56~3.7B',
      label: '레이저 AM (LPBF/SLM)',
      detail: 'Apple 티타늄 SLM 케이스\n6레이저 병렬 / 연 400톤 재료 절감',
      color: COLORS.accent_blue,
      bg: 'EBF0FF'
    },
    {
      kpi: '90%',
      label: 'DED 항공 리드타임 단축',
      detail: '대형 항공 구조재 복합 가공\n주조 → 레이저 DED로 전환',
      color: COLORS.accent_cyan,
      bg: 'E6FAF5'
    }
  ];

  highlights.forEach((h, i) => {
    const cx = 0.6 + i * (6.065 + 0.3);
    slide.addShape('roundRect', {
      x: cx, y: 1.82, w: 6.065, h: 1.4,
      rectRadius: 0.1,
      fill: { color: h.bg },
      line: { color: 'E2E8F0', width: 0.5 }
    });
    slide.addText(h.kpi, {
      x: cx + 0.15, y: 1.87, w: 2.2, h: 0.9,
      fontSize: 36, fontFace: FONTS.kpi.fontFace, bold: FONTS.kpi.bold,
      color: h.color, valign: 'middle', autoFit: true
    });
    slide.addText(h.label, {
      x: cx + 2.45, y: 1.9, w: 3.5, h: 0.4,
      fontSize: 13, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, autoFit: true
    });
    slide.addText(h.detail, {
      x: cx + 2.45, y: 2.35, w: 3.5, h: 0.75,
      fontSize: 11, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.4, valign: 'top', autoFit: true
    });
  });

  // 하단 4개 항목
  const items = [
    {
      label: '① USP 유리-금속 접합 (57.7 MPa)',
      body: '펨토초 레이저 유리-금속 이종접합. 57.7MPa 인장강도 달성. 광학 어셈블리·의료기기 적용.',
      color: COLORS.accent_yellow
    },
    {
      label: '② USP 레이저 시장 $2.45~2.76B',
      body: '항공·의료·반도체 초정밀 가공 수요. 피코·펨토초 장비 고성장. 당사 LILE 기술 연계 가능.',
      color: COLORS.accent_red
    },
    {
      label: '③ 레이저 AM 항공 구조재 대체',
      body: 'Airbus·Boeing DED 적용 확대. 티타늄·인코넬 대형 부품 90% 리드타임 단축.',
      color: COLORS.accent_purple
    },
    {
      label: '④ 레이저 + AI 품질 인라인 검사',
      body: '용융지 모니터링 + ML 피드백. LPBF 공정 내 기공 발생 실시간 억제. 항공 인증 가속.',
      color: COLORS.accent_blue
    }
  ];

  const rowH   = 0.72;
  const startY = 3.4;

  items.forEach((item, i) => {
    const cy = startY + i * (rowH + 0.07);
    slide.addShape('roundRect', {
      x: 0.6, y: cy, w: 12.13, h: rowH,
      rectRadius: 0.07,
      fill: { color: COLORS.bg_secondary },
      line: { color: 'E2E8F0', width: 0.5 }
    });
    slide.addShape('rect', {
      x: 0.6, y: cy, w: 0.06, h: rowH,
      fill: { color: item.color }
    });
    slide.addText(item.label, {
      x: 0.82, y: cy + 0.04, w: 4.2, h: 0.32,
      fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, autoFit: true
    });
    slide.addText(item.body, {
      x: 0.82, y: cy + 0.36, w: 11.65, h: 0.3,
      fontSize: 11, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary, autoFit: true
    });
  });

  addPageNumber(slide, 10, TOTAL_SLIDES);
}

// [11] Before/After — LLO 시장 정의 혼동
function slide11_before_after_llo() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'LLO 시장 정의에 따라 규모가 6배 다르다');

  addBeforeAfter(slide,
    {
      title: '"LLO 시장 $255M vs $1.48B" — 혼동 상태',
      bullets: [
        '리서치사마다 LLO 범위 정의가 다름',
        '$255M: 장비(Tool) 단독 기준',
        '$1.48B: ELA 포함·서비스·소모품 합산',
        '보고서 구매 시 정의 불일치로 과대 기대',
        '경쟁사 비교 시 사과-사과 비교 불가'
      ]
    },
    {
      title: '시장 범위 3단계 구분으로 해소',
      bullets: [
        '① 장비 단독: $150 ~ 255M (협의)',
        '② 서비스·소모품 포함: $295 ~ 610M (광의)',
        '③ 생태계 전체(ELA·소재·MRO): $1B+ (초광의)',
        '→ 당사 TAM 계산 시 반드시 "장비 단독" 기준 사용',
        '→ 경쟁사 분석 시 범위 기준 명시 필수'
      ]
    }
  );

  addPageNumber(slide, 11, TOTAL_SLIDES);
}

// [12] Matrix — 보유 기술 × 시장 기회 매트릭스
function slide12_tech_market_matrix() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '보유 기술 × 시장 기회 매트릭스');

  const quadrants = [
    {
      title: '즉시 확장 (High × High)',
      body: 'LLO → 폴더블/GLLO 업그레이드\n이종금속 용접 → EV 배터리 $3.2B\n글라스 가공 → UTG 폴더블\n\n▶ 지금 투자·PoC 우선순위 1순위'
    },
    {
      title: '중기 육성 (Low × High)',
      body: 'LILE → MicroLED 수리·리페어\nSelective 제거 → 반도체 디본딩\n\n▶ 3~12개월 내 파트너십·PoC 개시\n기술 완성도 확보 후 확장'
    },
    {
      title: '현금 창출 (High × Low)',
      body: 'LLO·ELA 현행 양산 유지\n세탁기·TV 가전 용접 수주\n\n▶ 현재 매출 기반 유지\n신기술 투자 재원 역할'
    },
    {
      title: '관망 / 재검토 (Low × Low)',
      body: '레이저 AM (LPBF/SLM) 직접 진출\n범용 USP 장비 독자 개발\n\n▶ 역량 대비 진입장벽 높음\n제휴·OEM 경유 접근 검토'
    }
  ];

  addMatrix(slide, quadrants, {
    x: '기술 보유 수준 →  낮음  →  높음',
    y: '시장 성장성'
  });

  addPageNumber(slide, 12, TOTAL_SLIDES);
}

// [13] Section Divider — Part 2 시작
function slide13_section_part2() {
  const slide = pptx.addSlide();

  // 좌측 다크 패널 (40%)
  slide.addShape('rect', { x: 0, y: 0, w: 5.33, h: 7.5, fill: { color: COLORS.bg_dark } });

  // 섹션 번호
  slide.addText('02', {
    x: 1.0, y: 2.3, w: 3.33, h: 1.5,
    fontSize: 80, fontFace: FONTS.title.fontFace, bold: FONTS.title.bold,
    color: COLORS.accent_yellow, align: 'center'
  });

  // 좌측 하단 레이블
  slide.addText('Part 2', {
    x: 1.0, y: 3.9, w: 3.33, h: 0.4,
    fontSize: 14, fontFace: FONTS.caption.fontFace,
    color: COLORS.text_tertiary, align: 'center'
  });

  // 우측: 섹션 제목
  slide.addShape('rect', {
    x: 6.0, y: 2.3, w: 1.5, h: 0.06,
    fill: { color: COLORS.accent_yellow }
  });
  slide.addText('구조 변화', {
    x: 6.0, y: 2.45, w: 6.73, h: 0.8,
    fontSize: 42, fontFace: FONTS.title.fontFace, bold: FONTS.title.bold,
    color: COLORS.text_primary
  });
  slide.addText('스마트폰/디스플레이가 레이저 수요를 폭발시킨다', {
    x: 6.0, y: 3.35, w: 6.73, h: 0.6,
    fontSize: 18, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
    color: COLORS.accent_yellow
  });
  slide.addText(
    'Apple 폴더블 iPhone 2026 출시 확정과\nSamsung Display 독점 공급이 레이저 수요의 임계점을 만든다.',
    {
      x: 6.0, y: 4.1, w: 6.73, h: 1.0,
      fontSize: 16, fontFace: 'Pretendard',
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.5
    }
  );

  addPageNumber(slide, 13, TOTAL_SLIDES);
}

// [14] Stat Highlight — Apple 폴더블 iPhone 2026 확정, 15M+ 패널/년
function slide14_stat_foldable_demand() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'Apple 폴더블 iPhone 2026 확정 — Samsung Display 독점 공급');

  // 배경 강조 밴드
  slide.addShape('rect', {
    x: 0, y: 1.75, w: 13.33, h: 4.0,
    fill: { color: 'F8FAFF' }
  });

  addStatHighlight(slide, {
    number: '15M+',
    label: '패널/년 공급 규모',
    context: 'Apple 폴더블 iPhone 2026, Samsung Display 독점 공급 확정',
    trend: '▲ 폴더블 침투율 2027년 3%+ 전망'
  });

  // 하단 보조 정보 3개 박스
  const supports = [
    {
      kpi: '2026',
      label: '출시 예정 연도',
      note: 'Apple 공급망 소식통\n복수 확인',
      color: COLORS.accent_blue,
      bg: 'EBF0FF'
    },
    {
      kpi: 'SDC 독점',
      label: 'Samsung Display',
      note: 'UTG + 힌지 패널\n독점 공급 확정',
      color: COLORS.accent_cyan,
      bg: 'E6FAF5'
    },
    {
      kpi: '3%+',
      label: '2027년 폴더블 침투율',
      note: '전체 스마트폰 중\n폴더블 비중 전망',
      color: COLORS.accent_yellow,
      bg: 'FFF8E6'
    }
  ];

  const bW = (12.13 - 0.3 * 2) / 3;
  supports.forEach((s, i) => {
    const bx = 0.6 + i * (bW + 0.3);
    slide.addShape('roundRect', {
      x: bx, y: 5.95, w: bW, h: 0.95,
      rectRadius: 0.08,
      fill: { color: s.bg },
      line: { color: 'E2E8F0', width: 0.5 }
    });
    slide.addText(s.kpi, {
      x: bx + 0.15, y: 5.97, w: 1.4, h: 0.55,
      fontSize: 20, fontFace: FONTS.kpi.fontFace, bold: FONTS.kpi.bold,
      color: s.color, valign: 'middle', autoFit: true
    });
    slide.addText(s.label, {
      x: bx + 1.6, y: 5.97, w: bW - 1.75, h: 0.28,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: FONTS.subtitle.bold,
      color: COLORS.text_primary, autoFit: true
    });
    slide.addText(s.note, {
      x: bx + 1.6, y: 6.27, w: bW - 1.75, h: 0.58,
      fontSize: 10, fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      lineSpacingMultiple: 1.3, valign: 'top', autoFit: true
    });
  });

  addPageNumber(slide, 14, TOTAL_SLIDES);
}

// =============================================================
// 슬라이드 실행
// =============================================================
slide01_title();
slide02_stat_three_numbers();
slide03_cards_structural_changes();
slide04_tech_connections();
slide05_section_part1();
slide06_icon_grid_five_techs();
slide07_market_table();
slide08_two_col_display();
slide09_content_appliance();
slide10_content_manufacturing();
slide11_before_after_llo();
slide12_tech_market_matrix();
slide13_section_part2();
slide14_stat_foldable_demand();

// =============================================================
// 파일 저장
// =============================================================
pptx.writeFile({ fileName: 'presentation-build/2026-03-25-laser-technology-roadmap/part-1-output.pptx' })
  .then(() => console.log('Part 1 저장 완료: part-1-output.pptx'))
  .catch(err => console.error('저장 실패:', err));

// === Part 1 끝 ===

// Slide 15 — TwoColumn: 크리즈프리 폴더블 레이저 드릴 금속 플레이트
function slide15_creasefree_foldable() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '크리즈프리 폴더블: 레이저 드릴 금속 플레이트가 핵심 공정으로 부상');

  // 좌측 컬럼 배경
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.05, w: 5.9, h: 5.7,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.bg_secondary }
  });

  // 좌측 헤더
  slide.addText('CES 2026 Samsung Display 시연', {
    x: 0.4, y: 1.1, w: 5.7, h: 0.35,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_blue
  });

  // 좌측 accent bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.4, y: 1.45, w: 0.05, h: 4.8,
    fill: { color: COLORS.accent_blue },
    line: { color: COLORS.accent_blue }
  });

  const leftItems = [
    { label: '크리즈 저감', value: '20% 감소', desc: 'CES 2026 공개 시연 — 레이저 드릴 금속 플레이트 적용 결과' },
    { label: '대상 패널', value: '15M+/년', desc: 'Apple/Samsung 확정 폴더블 OLED 수요 (2026~2027)' },
    { label: '적용 기술', value: 'GLLO + 드릴링', desc: '그래핀 지원 LLO + 마이크로홀 금속 힌지 플레이트 복합 공정' },
    { label: '기대 효과', value: '힌지 내구성 ↑', desc: '사용자 체감 폴드 품질 개선 — 프리미엄 제품 차별화 핵심' }
  ];

  leftItems.forEach((item, i) => {
    const yBase = 1.55 + i * 1.18;
    slide.addText(item.label, {
      x: 0.55, y: yBase, w: 5.5, h: 0.26,
      fontSize: 9, fontFace: FONTS.caption.fontFace, bold: false,
      color: COLORS.text_tertiary
    });
    slide.addText(item.value, {
      x: 0.55, y: yBase + 0.25, w: 5.5, h: 0.34,
      fontSize: 16, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(item.desc, {
      x: 0.55, y: yBase + 0.58, w: 5.5, h: 0.45,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  // 구분선
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.3, y: 1.05, w: 0.03, h: 5.7,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.bg_secondary }
  });

  // 우측 컬럼 배경
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.43, y: 1.05, w: 5.9, h: 5.7,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.bg_secondary }
  });

  // 우측 헤더
  slide.addText('Fine M-Tec 공급망 & 원가 비교', {
    x: 6.53, y: 1.1, w: 5.7, h: 0.35,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_yellow
  });

  // 우측 accent bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.53, y: 1.45, w: 0.05, h: 4.8,
    fill: { color: COLORS.accent_yellow },
    line: { color: COLORS.accent_yellow }
  });

  const rightItems = [
    { label: '화학 에칭 원가', value: '$20/플레이트', desc: '기존 공정 — 식각 균일도 한계, 홀 정밀도 ±5μm 수준' },
    { label: '레이저 드릴링 원가', value: '$30~35/플레이트', desc: '레이저 마이크로홀 — 정밀도 ±1μm, 크리즈 저감 핵심 요인' },
    { label: '원가 프리미엄', value: '50~75% 높음', desc: '그러나 품질/수율 개선 효과로 Total BOM에서 정당화 가능' },
    { label: '주요 공급사', value: 'Fine M-Tec (한국)', desc: '삼성디스플레이 주 공급사 — 글로벌 경쟁사 진입 시도 중' }
  ];

  rightItems.forEach((item, i) => {
    const yBase = 1.55 + i * 1.18;
    slide.addText(item.label, {
      x: 6.68, y: yBase, w: 5.5, h: 0.26,
      fontSize: 9, fontFace: FONTS.caption.fontFace, bold: false,
      color: COLORS.text_tertiary
    });
    slide.addText(item.value, {
      x: 6.68, y: yBase + 0.25, w: 5.5, h: 0.34,
      fontSize: 16, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(item.desc, {
      x: 6.68, y: yBase + 0.58, w: 5.5, h: 0.45,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 15, TOTAL_SLIDES);
}

// Slide 16 — Timeline: 폴더블 OLED 레이저 공정 진화 타임라인
function slide16_foldable_timeline() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '폴더블 OLED 레이저 공정 진화 타임라인');

  const milestones = [
    {
      period: '2026 Q1',
      title: 'GLLO 파일럿 양산',
      items: ['삼성디스플레이 그래핀 LLO 파일럿 라인 가동', '탄화 잔류물 92.8% 감소 검증', '캐리어 기판 재사용 공정 확립'],
      color: COLORS.accent_blue
    },
    {
      period: '2026 H2',
      title: 'Z Fold 8 / iPhone Fold 양산',
      items: ['레이저 드릴 금속 플레이트 본격 적용', 'Apple 첫 폴더블 iPhone 출하 예정', '연간 15M+ 패널 수요 발생'],
      color: COLORS.accent_cyan
    },
    {
      period: '2027',
      title: '폴더블 침투율 3%+',
      items: ['스마트폰 전체 대비 폴더블 3% 돌파 전망', 'UTG 2세대 공정 상용화 검토', '레이저 드릴 공급망 경쟁 본격화'],
      color: COLORS.accent_yellow
    },
    {
      period: '2028',
      title: 'UTG 이중층 표준화',
      items: ['이중층 UTG 구조로 크리즈 추가 저감', 'USP 인라인 검사 통합 표준화', 'MicroLED 폴더블 시제품 등장 가능성'],
      color: COLORS.accent_purple
    }
  ];

  const totalW = 12.13;
  const startX = 0.3;
  const colW = totalW / milestones.length;
  const lineY = 2.5;

  // 타임라인 기준선
  slide.addShape(pptx.ShapeType.rect, {
    x: startX, y: lineY, w: totalW, h: 0.04,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.bg_secondary }
  });

  milestones.forEach((m, i) => {
    const cx = startX + colW * i + colW / 2;
    const dotX = cx - 0.15;

    // 마일스톤 점
    slide.addShape(pptx.ShapeType.ellipse, {
      x: dotX, y: lineY - 0.15, w: 0.3, h: 0.3,
      fill: { color: m.color },
      line: { color: m.color }
    });

    // 기간 뱃지
    slide.addShape(pptx.ShapeType.rect, {
      x: startX + colW * i + 0.1, y: 1.15, w: colW - 0.2, h: 0.36,
      fill: { color: m.color },
      line: { color: m.color }
    });
    slide.addText(m.period, {
      x: startX + colW * i + 0.1, y: 1.15, w: colW - 0.2, h: 0.36,
      fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    // 제목
    slide.addText(m.title, {
      x: startX + colW * i + 0.1, y: 1.6, w: colW - 0.2, h: 0.5,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, align: 'center', wrap: true
    });

    // 세로 연결선
    slide.addShape(pptx.ShapeType.rect, {
      x: cx - 0.02, y: 2.1, w: 0.04, h: lineY - 2.1,
      fill: { color: m.color },
      line: { color: m.color }
    });

    // 아이템 카드
    slide.addShape(pptx.ShapeType.rect, {
      x: startX + colW * i + 0.1, y: lineY + 0.3, w: colW - 0.2, h: 4.1,
      fill: { color: COLORS.bg_secondary },
      line: { color: m.color }
    });

    // 상단 accent
    slide.addShape(pptx.ShapeType.rect, {
      x: startX + colW * i + 0.1, y: lineY + 0.3, w: colW - 0.2, h: 0.06,
      fill: { color: m.color },
      line: { color: m.color }
    });

    m.items.forEach((item, j) => {
      slide.addText('• ' + item, {
        x: startX + colW * i + 0.2, y: lineY + 0.55 + j * 1.12, w: colW - 0.4, h: 1.0,
        fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
        color: COLORS.text_secondary, wrap: true
      });
    });
  });

  addPageNumber(slide, 16, TOTAL_SLIDES);
}

// Slide 17 — Cards: MicroLED 장기 기회와 수율 병목
function slide17_microled_cards() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'MicroLED: 장기 최대 기회이나 수율 병목이 핵심 장벽');

  const cards = [
    {
      title: 'LLO / LIFT 필수 공정',
      body: '4K 디스플레이 기준 800만 개 마이크로칩 전사 필요.\nLaser-Induced Forward Transfer(LIFT)가 핵심 공정으로 레이저 정밀도가 수율 직결.',
      accentColor: COLORS.accent_blue
    },
    {
      title: '수율 목표 vs 현실',
      body: '상용화 목표 수율: 99.99%+\n현재 달성 수준: 99.5~99.8%\n\n0.01% 불량 = 4K 화면에 800개 불량 픽셀 → 허용 불가.',
      accentColor: COLORS.accent_red
    },
    {
      title: '장비 시장 전망 (불확실성 높음)',
      body: '$4.5B (2035) 전망 — 단일 출처, 수율 해소 전제.\n\n수율 병목 지속 시 시장 실현 시기 후퇴 가능. 투자 판단 시 전제 확인 필수.',
      accentColor: COLORS.accent_yellow
    },
    {
      title: 'Apple Watch MicroLED 백지화 (2024)',
      body: '2024년 Apple이 MicroLED Apple Watch 개발을 전면 중단.\n원가 ($3,000/시계)와 수율 문제가 원인 — 기술 낙관론 경계 신호.',
      accentColor: COLORS.accent_purple
    }
  ];

  const positions = [
    { x: 0.3, y: 1.15 },
    { x: 6.46, y: 1.15 },
    { x: 0.3, y: 4.25 },
    { x: 6.46, y: 4.25 }
  ];

  cards.forEach((card, i) => {
    addCard(slide, {
      x: positions[i].x,
      y: positions[i].y,
      w: 5.9,
      h: 2.75,
      title: card.title,
      body: card.body,
      accentColor: card.accentColor
    });
  });

  addPageNumber(slide, 17, TOTAL_SLIDES);
}

// Slide 18 — Before/After: MicroLED 타임라인 현실 보정
function slide18_microled_before_after() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'MicroLED 타임라인: 역사적 지연 패턴을 반영하라');

  addBeforeAfter(slide,
    {
      title: '낙관적 전망 (2027~2028 상용화)',
      bullets: [
        '기술 성능 향상 속도를 채택 가능성으로 오인',
        '단일 출처(Q-Pixel) 수율 데이터 과신',
        'Apple Watch MicroLED 백지화(2024) 교훈 반영 미흡',
        '확신도: [중간] — 근거 불충분'
      ]
    },
    {
      title: '현실 조정 (보수 시나리오 2029년 이후)',
      bullets: [
        '수율 99.99%+ 달성 시점이 핵심 촉발 조건',
        'Apple Watch 백지화 = 2~3년 추가 지연 선행 신호',
        '2027년 수율 트리거 모니터링 후 재평가',
        '확신도: [낮음~중간] — 관망 + 트리거 추적 권고'
      ]
    }
  );

  addPageNumber(slide, 18, TOTAL_SLIDES);
}

// Slide 19 — Content: 잉크젯 OLED의 FMM 구조적 위협
function slide19_inkjet_oled_threat() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '잉크젯 OLED가 FMM 레이저 가공의 구조적 위협이다');

  // 핵심 메시지 배너
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.1, w: 12.13, h: 0.6,
    fill: { color: COLORS.accent_red },
    line: { color: COLORS.accent_red }
  });
  slide.addText('FMM(Fine Metal Mask) 레이저 가공 의존 사업은 잉크젯 전환 시나리오 대비가 필요하다', {
    x: 0.3, y: 1.1, w: 12.13, h: 0.6,
    fontSize: 12, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_on_dark, align: 'center', valign: 'middle'
  });

  const sections = [
    {
      icon: '①',
      title: 'Samsung EL-QD 잉크젯 264PPI 시제품',
      body: '2025년 Samsung Display가 264PPI 잉크젯 QD-OLED 시제품 공개. FMM 없이 RGB 패터닝 가능성 실증. 현재 색순도·수명 상용화 기준 미달이나 개발 속도 주목.',
      color: COLORS.accent_blue
    },
    {
      icon: '②',
      title: 'Canon Tokki 잉크젯 OLED 라인 개발 진행',
      body: 'Canon Tokki가 증착 장비 독점 지위에서 잉크젯 방식으로 병행 투자. 기존 FMM 증착 장비 공급사의 자기잠식(cannibalization) 전략 — 시장 전환 임박 신호.',
      color: COLORS.accent_cyan
    },
    {
      icon: '③',
      title: 'FMM 시장 축소 — 시간 문제',
      body: '잉크젯 상용화 시 FMM 레이저 커팅·용접·검사 수요 구조적 감소. 단기(~2027) 영향 미미, 2028~2030 전환 가속 시나리오에서 FMM 의존 매출 30~50% 영향 가능.',
      color: COLORS.accent_yellow
    },
    {
      icon: '④',
      title: '전략 대응: FMM 의존 사업 축소 시나리오 준비',
      body: '지금 당장 FMM을 대체하는 것이 아니라, 잉크젯 전환 트리거(264PPI 양산 승인, Canon Tokki 라인 발주)를 모니터링하고, FMM 외 레이저 응용 포트폴리오 다각화를 병행.',
      color: COLORS.accent_purple
    }
  ];

  sections.forEach((sec, i) => {
    const x = i < 2 ? 0.3 + (i % 2) * 6.16 : 0.3 + (i % 2) * 6.16;
    const y = i < 2 ? 1.85 : 4.45;
    const w = 5.9;
    const h = 2.35;

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w, h,
      fill: { color: COLORS.bg_secondary },
      line: { color: sec.color }
    });

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w, h: 0.06,
      fill: { color: sec.color },
      line: { color: sec.color }
    });

    slide.addShape(pptx.ShapeType.rect, {
      x, y: y + 0.1, w: 0.06, h: h - 0.1,
      fill: { color: sec.color },
      line: { color: sec.color }
    });

    slide.addText(sec.icon + ' ' + sec.title, {
      x: x + 0.15, y: y + 0.12, w: w - 0.25, h: 0.4,
      fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, wrap: true
    });
    slide.addText(sec.body, {
      x: x + 0.15, y: y + 0.55, w: w - 0.25, h: h - 0.65,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 19, TOTAL_SLIDES);
}

// Slide 20 — TwoColumn: LLO 대체 위협 GLLO vs Omniply
function slide20_llo_alternatives() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'LLO 대체 위협: GLLO(업그레이드) vs Omniply(파괴)');

  // 좌측 — GLLO
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.1, w: 5.9, h: 5.65,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent_blue }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.1, w: 5.9, h: 0.06,
    fill: { color: COLORS.accent_blue },
    line: { color: COLORS.accent_blue }
  });

  slide.addText('GLLO — 레이저 LLO의 진화형 (업그레이드)', {
    x: 0.4, y: 1.2, w: 5.7, h: 0.4,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_blue
  });

  const glloItems = [
    { label: '탄화 저감', value: '92.8% 감소', desc: '기존 LLO 탄화 잔류물 대비 — 패널 불량 대폭 축소' },
    { label: '캐리어 재사용', value: '비용 절감 직결', desc: '그래핀 계면층으로 캐리어 기판 반복 사용 가능' },
    { label: '스케일업 과제', value: '그래핀 균일도', desc: '대면적(Gen 8+) 그래핀 증착 균일도 확보가 핵심 병목' },
    { label: '현 상태', value: '파일럿 진행 중', desc: '2026 Q1 삼성디스플레이 파일럿 — 양산 타임라인 미확정' }
  ];

  glloItems.forEach((item, i) => {
    const yBase = 1.7 + i * 1.22;
    slide.addText(item.label, {
      x: 0.45, y: yBase, w: 5.5, h: 0.22,
      fontSize: 8, fontFace: FONTS.caption.fontFace, bold: false,
      color: COLORS.text_tertiary
    });
    slide.addText(item.value, {
      x: 0.45, y: yBase + 0.2, w: 5.5, h: 0.32,
      fontSize: 14, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(item.desc, {
      x: 0.45, y: yBase + 0.5, w: 5.5, h: 0.4,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  // 우측 — Omniply
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.43, y: 1.1, w: 5.9, h: 5.65,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent_red }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.43, y: 1.1, w: 5.9, h: 0.06,
    fill: { color: COLORS.accent_red },
    line: { color: COLORS.accent_red }
  });

  slide.addText('Omniply — 비레이저 방식의 파괴적 도전 (파괴)', {
    x: 6.53, y: 1.2, w: 5.7, h: 0.4,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_red
  });

  const omniplyItems = [
    { label: 'CAPEX 비교', value: '기존 LLO의 1/3', desc: '설비 투자 비용 대폭 절감 — 중소 팹 진입 장벽 낮춤' },
    { label: '방식', value: '비레이저 박리', desc: '레이저 없이 기계적/화학적 계면 분리 — LLO 시장 직접 위협' },
    { label: '현 상태', value: 'TV 팹 평가 중', desc: '2026년 중 대형 TV 팹 평가 결과 예정 — 결과가 핵심 트리거' },
    { label: '위협 수준', value: '[중간~높음]', desc: 'TV 팹 채택 확정 시 모바일 OLED로 확산 가능 — 지속 모니터링 필요' }
  ];

  omniplyItems.forEach((item, i) => {
    const yBase = 1.7 + i * 1.22;
    slide.addText(item.label, {
      x: 6.58, y: yBase, w: 5.5, h: 0.22,
      fontSize: 8, fontFace: FONTS.caption.fontFace, bold: false,
      color: COLORS.text_tertiary
    });
    slide.addText(item.value, {
      x: 6.58, y: yBase + 0.2, w: 5.5, h: 0.32,
      fontSize: 14, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(item.desc, {
      x: 6.58, y: yBase + 0.5, w: 5.5, h: 0.4,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 20, TOTAL_SLIDES);
}

// Slide 21 — Content: 디스플레이 핵심 병목 4가지
function slide21_display_bottlenecks() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '디스플레이 분야 핵심 병목 4가지와 해결 조건');

  const bottlenecks = [
    {
      num: '①',
      problem: 'LLO 탄화 잔류물',
      solution: 'GLLO — 그래핀 계면층 적용',
      status: '파일럿 단계',
      statusColor: COLORS.accent_yellow,
      detail: '92.8% 탄화 감소 달성. 대면적 균일도 확보 후 양산 전환 가능.',
      color: COLORS.accent_blue
    },
    {
      num: '②',
      problem: 'MicroLED 전사 수율 (99.5~99.8%)',
      solution: 'AI 비전 + 레이저 광학 제어 통합',
      status: '연구 단계',
      statusColor: COLORS.accent_red,
      detail: '99.99%+ 달성이 상용화 조건. 현재 최선단 AI 인라인 모니터링 연구 진행 중.',
      color: COLORS.accent_red
    },
    {
      num: '③',
      problem: 'UTG 마이크로크랙',
      solution: 'USP 파라미터 최적화 + 인라인 검사',
      status: '개선 진행 중',
      statusColor: COLORS.accent_cyan,
      detail: '초단펄스(USP) 레이저 pulse duration 최적화로 열영향부 최소화. 인라인 OCT 검사 병행.',
      color: COLORS.accent_cyan
    },
    {
      num: '④',
      problem: 'UDC(언더디스플레이 카메라) 화질',
      solution: '2027년 이후 재평가',
      status: '관망 권고',
      statusColor: COLORS.accent_purple,
      detail: '현재 화질 개선 속도 더딤. 2027년 픽셀 투명도 기술 성숙도 확인 후 투자 판단 권고.',
      color: COLORS.accent_purple
    }
  ];

  bottlenecks.forEach((b, i) => {
    const y = 1.15 + i * 1.6;
    const h = 1.45;

    slide.addShape(pptx.ShapeType.rect, {
      x: 0.3, y, w: 12.13, h,
      fill: { color: COLORS.bg_secondary },
      line: { color: b.color }
    });

    slide.addShape(pptx.ShapeType.rect, {
      x: 0.3, y, w: 0.06, h,
      fill: { color: b.color },
      line: { color: b.color }
    });

    // 번호 뱃지
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.5, y: y + 0.35, w: 0.55, h: 0.55,
      fill: { color: b.color },
      line: { color: b.color }
    });
    slide.addText(b.num, {
      x: 0.5, y: y + 0.35, w: 0.55, h: 0.55,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    // 문제
    slide.addText('병목: ' + b.problem, {
      x: 1.2, y: y + 0.12, w: 4.8, h: 0.35,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary
    });

    // 해결책
    slide.addText('해결 방향: ' + b.solution, {
      x: 1.2, y: y + 0.5, w: 4.8, h: 0.3,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary
    });

    // 상태 뱃지
    slide.addShape(pptx.ShapeType.rect, {
      x: 6.2, y: y + 0.25, w: 1.8, h: 0.32,
      fill: { color: b.statusColor },
      line: { color: b.statusColor }
    });
    slide.addText(b.status, {
      x: 6.2, y: y + 0.25, w: 1.8, h: 0.32,
      fontSize: 9, fontFace: FONTS.caption.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    // 상세 설명
    slide.addText(b.detail, {
      x: 8.15, y: y + 0.12, w: 4.1, h: 1.1,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 21, TOTAL_SLIDES);
}

// Slide 22 — Section Divider: Part 3 EV 배터리
function slide22_section_ev() {
  const slide = pptx.addSlide();

  // 좌측 40% dark
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 5.12, h: 7.5,
    fill: { color: COLORS.bg_dark },
    line: { color: COLORS.bg_dark }
  });

  // 우측 60% white
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.12, y: 0, w: 7.28, h: 7.5,
    fill: { color: COLORS.bg_primary },
    line: { color: COLORS.bg_primary }
  });

  // 좌측 파트 레이블
  slide.addText('PART 3', {
    x: 0.3, y: 2.2, w: 4.7, h: 0.5,
    fontSize: 13, fontFace: FONTS.caption.fontFace, bold: false,
    color: COLORS.accent_yellow, align: 'left'
  });

  // 좌측 파트 번호 장식
  slide.addText('D', {
    x: 0.3, y: 2.7, w: 4.7, h: 2.5,
    fontSize: 120, fontFace: FONTS.deco.fontFace, bold: true,
    color: COLORS.bg_secondary, align: 'left',
    transparency: 70
  });

  // 우측 메인 타이틀
  slide.addText('구조 변화', {
    x: 5.3, y: 1.8, w: 6.9, h: 0.6,
    fontSize: 14, fontFace: FONTS.caption.fontFace, bold: false,
    color: COLORS.text_tertiary
  });
  slide.addText('EV 배터리 용접이\n가장 확실한\n성장 시장이다', {
    x: 5.3, y: 2.4, w: 6.9, h: 2.4,
    fontSize: 28, fontFace: FONTS.title.fontFace, bold: FONTS.title.bold,
    color: COLORS.text_primary, wrap: true
  });

  // 구분선
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.3, y: 4.95, w: 1.2, h: 0.06,
    fill: { color: COLORS.accent_yellow },
    line: { color: COLORS.accent_yellow }
  });

  slide.addText('시장 $3.2B(2025) → $9.8B(2034) · CAGR 13.2%\n이종금속 용접 + AI 인라인이 표준으로 부상 중', {
    x: 5.3, y: 5.1, w: 6.9, h: 0.9,
    fontSize: 10, fontFace: FONTS.body.fontFace, bold: false,
    color: COLORS.text_secondary, wrap: true
  });

  addPageNumber(slide, 22, TOTAL_SLIDES);
}

// Slide 23 — Stat Highlight: EV 배터리 레이저 용접 시장
function slide23_ev_stat() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'EV 배터리 레이저 용접: 가장 확실한 단기 성장 시장');

  addStatHighlight(slide, {
    number: '$3.2B',
    label: 'EV 배터리 레이저 용접 시장 (2025)',
    context: '2034년 $9.8B 전망 — CAGR 13.2% (9년 복합 성장)',
    trend: '▲ CAGR 13.2%'
  });

  // 보조 지표 3개
  const metrics = [
    { value: '13.2%', label: 'CAGR 2025~2034', sub: '레이저 용접 시장 연평균 성장률', color: COLORS.accent_blue },
    { value: '$9.8B', label: '2034년 시장 규모', sub: '현재의 3배 이상 — 10년 내 확실한 성장', color: COLORS.accent_cyan },
    { value: '45%', label: 'LFP 배터리 비중 (2027E)', sub: '현재 32% → 이종금속 용접 수요 확대 주요 동인', color: COLORS.accent_yellow }
  ];

  metrics.forEach((m, i) => {
    const x = 0.3 + i * 4.11;
    slide.addShape(pptx.ShapeType.rect, {
      x, y: 5.6, w: 3.95, h: 1.55,
      fill: { color: COLORS.bg_secondary },
      line: { color: m.color }
    });
    slide.addShape(pptx.ShapeType.rect, {
      x, y: 5.6, w: 3.95, h: 0.06,
      fill: { color: m.color },
      line: { color: m.color }
    });
    slide.addText(m.value, {
      x: x + 0.15, y: 5.72, w: 3.65, h: 0.55,
      fontSize: 24, fontFace: FONTS.kpi.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(m.label, {
      x: x + 0.15, y: 6.28, w: 3.65, h: 0.25,
      fontSize: 9, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(m.sub, {
      x: x + 0.15, y: 6.52, w: 3.65, h: 0.45,
      fontSize: 8, fontFace: FONTS.caption.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 23, TOTAL_SLIDES);
}

// Slide 24 — Content: EV 이종금속 용접 그린 레이저
function slide24_ev_green_laser() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'EV 이종금속 용접: 그린 레이저 + 파이버 하이브리드가 표준 부상');

  const items = [
    {
      num: '①',
      title: '구리-알루미늄 이종 용접 — 핵심 과제',
      body: 'EV 배터리 탭 및 버스바의 Cu-Al 이종금속 용접은 기존 IR 파이버 레이저로 처리 어려움. 열전도율 불일치, 금속간화합물(IMC) 생성이 용접 강도 저하 원인.',
      color: COLORS.accent_blue
    },
    {
      num: '②',
      title: '그린 레이저 — 흡수율 3~5배 우위',
      body: 'Cu의 532nm 그린 레이저 흡수율: ~50% vs IR(1064nm): ~5~10%. 흡수율 3~5배 차이로 열 집중 효율 및 용접 일관성 대폭 개선. TRUMPF 그린 레이저 2024-08 출시로 상업화 가속.',
      color: COLORS.accent_cyan
    },
    {
      num: '③',
      title: 'LFP 배터리 비중 32%→45% (2027E) — 이종금속 수요 확대',
      body: '리튬인산철(LFP) 배터리 채택 확대 = 알루미늄 케이스 + 구리 탭 조합 증가. 이종금속 용접 적용 비중 확대 — 그린+파이버 하이브리드 시스템 수요 직접 연동.',
      color: COLORS.accent_yellow
    },
    {
      num: '④',
      title: 'TRUMPF 그린 레이저 2024-08 출시 — 시장 개막 신호',
      body: 'TRUMPF TruDisk Green 시리즈 양산 출시. 주요 OEM 평가 착수. IPG, nLIGHT도 그린 레이저 개발 병행 — 경쟁 격화 전 조기 역량 확보가 유리.',
      color: COLORS.accent_red
    }
  ];

  items.forEach((item, i) => {
    const x = i % 2 === 0 ? 0.3 : 6.46;
    const y = i < 2 ? 1.15 : 4.3;

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 5.9, h: 2.9,
      fill: { color: COLORS.bg_secondary },
      line: { color: item.color }
    });
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 0.06, h: 2.9,
      fill: { color: item.color },
      line: { color: item.color }
    });

    // 번호 뱃지
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.15, y: y + 0.15, w: 0.4, h: 0.4,
      fill: { color: item.color },
      line: { color: item.color }
    });
    slide.addText(item.num, {
      x: x + 0.15, y: y + 0.15, w: 0.4, h: 0.4,
      fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    slide.addText(item.title, {
      x: x + 0.65, y: y + 0.15, w: 5.1, h: 0.5,
      fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, wrap: true
    });
    slide.addText(item.body, {
      x: x + 0.15, y: y + 0.75, w: 5.6, h: 2.0,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 24, TOTAL_SLIDES);
}

// Slide 25 — Process Flow: EV 배터리 팩 레이저 용접 공정 체인
function slide25_ev_process_flow() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'EV 배터리 팩 레이저 용접 공정 체인');

  addProcessFlow(slide, [
    {
      step: '① 셀 탭 용접',
      detail: '소재: 구리 탭\n레이저: 그린 레이저 (532nm)\n목표: 저저항 전기 접합\n품질: IMC 최소화'
    },
    {
      step: '② 모듈 연결',
      detail: '소재: Al-Cu 이종금속 버스바\n레이저: 파이버 하이브리드\n목표: 이종금속 강용접\n품질: 열영향부 제어'
    },
    {
      step: '③ 팩 조립',
      detail: '소재: 알루미늄 구조재\n레이저: 고출력 파이버\n목표: 구조 강도 확보\n품질: 기밀 유지'
    },
    {
      step: '④ 인라인 검사',
      detail: '센서: AI 비전 + OCT\n대상: 전수 용접부 검사\n목표: 불량 즉시 검출\n품질: 제로 디펙트 목표'
    }
  ]);

  // 보조 설명
  slide.addText('핵심 인사이트: 셀→모듈→팩 전 공정에 레이저 용접이 적용되며, 각 단계별 레이저 파장/출력 조합이 다르다. 단일 레이저 솔루션이 아닌 멀티-레이저 시스템 통합 역량이 경쟁력의 핵심.', {
    x: 0.3, y: 6.55, w: 12.13, h: 0.6,
    fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
    color: COLORS.text_tertiary, wrap: true
  });

  addPageNumber(slide, 25, TOTAL_SLIDES);
}

// Slide 26 — Cards: 가전 레이저 응용
function slide26_appliance_laser_cards() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '가전 레이저: 세탁기 드럼 22초, 텍스처링 150°, 무광 쿡탑');

  const cards = [
    {
      title: '세탁기 드럼 자동화',
      body: 'Coldwater 레이저 용접 라인\n기존 22초 → 목표 12초 (45% 단축)\n\n코봇 통합으로 유연 생산. 모델 변경 다운타임 90% 감소 목표.',
      accentColor: COLORS.accent_blue
    },
    {
      title: '레이저 텍스처링 — 접촉각 150°',
      body: '스테인리스 표면 레이저 마이크로텍스처링\n접촉각 150° 달성 = 초소수성(Superhydrophobic)\n\n세탁기/냉장고 위생 표면 차별화 소재 적용 확대.',
      accentColor: COLORS.accent_cyan
    },
    {
      title: 'SCHOTT 무광 세라믹 쿡탑',
      body: 'SCHOTT CERAN Suprema Matte\n2025-03 직렬 생산 돌입\n\n레이저 표면 처리로 무광 질감 구현. 프리미엄 빌트인 시장 타겟.',
      accentColor: COLORS.accent_yellow
    },
    {
      title: '코봇 + 레이저 통합',
      body: 'Universal Robots + 레이저 툴 헤드\nFABTECH 2025 다수 사례 발표\n\n중소 가전 제조사 유연 자동화 확산. 초기 투자 장벽 하락 중.',
      accentColor: COLORS.accent_purple
    }
  ];

  const positions = [
    { x: 0.3, y: 1.15 },
    { x: 6.46, y: 1.15 },
    { x: 0.3, y: 4.25 },
    { x: 6.46, y: 4.25 }
  ];

  cards.forEach((card, i) => {
    addCard(slide, {
      x: positions[i].x,
      y: positions[i].y,
      w: 5.9,
      h: 2.75,
      title: card.title,
      body: card.body,
      accentColor: card.accentColor
    });
  });

  addPageNumber(slide, 26, TOTAL_SLIDES);
}

// Slide 27 — Content: MicroLED TV Samsung CES 2026
function slide27_microled_tv() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'MicroLED TV: Samsung CES 2026 라인업 확장, 수리 공정이 핵심');

  // 상단 하이라이트 배너
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.1, w: 12.13, h: 0.55,
    fill: { color: COLORS.accent_blue },
    line: { color: COLORS.accent_blue }
  });
  slide.addText('Samsung CES 2026: 55~130인치 MicroLED TV 라인업 공개 — 수리(Repair) 공정이 수율의 핵심', {
    x: 0.3, y: 1.1, w: 12.13, h: 0.55,
    fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.text_on_dark, align: 'center', valign: 'middle'
  });

  const sections = [
    {
      title: '130인치 Micro RGB — 플래그십',
      body: 'Samsung CES 2026 주력 전시. RGB MicroLED 직접 발광 — OLED 대비 밝기 우위. 레이저 전사(LIFT) 공정 의존도 높음. 원가 여전히 프리미엄 시장 한정.',
      color: COLORS.accent_blue,
      badge: '130" 플래그십'
    },
    {
      title: '83인치 투명 MicroLED — CES Innovation Award',
      body: 'CES 2026 Innovation Award 수상. 투명 디스플레이 = 공간 컴퓨팅 연계 가능성. 레이저 기반 마이크로칩 정렬 정밀도가 투명도 품질 직결.',
      color: COLORS.accent_cyan,
      badge: 'Innovation Award'
    },
    {
      title: '55~115인치 라인업 — 시장 확대 신호',
      body: '130인치 단일 제품에서 55인치까지 라인업 확대. 소비자 MicroLED 접근성 향상 의도. 수율 기반 원가 하락 없으면 볼륨 확대 한계 — 수리 공정이 병목.',
      color: COLORS.accent_yellow,
      badge: '55~115" 라인업'
    },
    {
      title: '수리(Repair) 공정 — 레이저 의존도 높음',
      body: '불량 MicroLED 선택적 제거 후 재전사 = Laser Lift-Off + 재증착. 수율 99.5%에서 99.99%로 올리는 과정에서 수리 공정 레이저 사용 비중 급증. 수리 공정 역량이 사실상 수율 역량.',
      color: COLORS.accent_red,
      badge: '수리 공정 핵심'
    }
  ];

  sections.forEach((sec, i) => {
    const x = i % 2 === 0 ? 0.3 : 6.46;
    const y = i < 2 ? 1.8 : 4.6;

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 5.9, h: 2.55,
      fill: { color: COLORS.bg_secondary },
      line: { color: sec.color }
    });
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 5.9, h: 0.06,
      fill: { color: sec.color },
      line: { color: sec.color }
    });

    // 뱃지
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.15, y: y + 0.12, w: 1.8, h: 0.3,
      fill: { color: sec.color },
      line: { color: sec.color }
    });
    slide.addText(sec.badge, {
      x: x + 0.15, y: y + 0.12, w: 1.8, h: 0.3,
      fontSize: 8, fontFace: FONTS.caption.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    slide.addText(sec.title, {
      x: x + 0.15, y: y + 0.5, w: 5.6, h: 0.38,
      fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary, wrap: true
    });
    slide.addText(sec.body, {
      x: x + 0.15, y: y + 0.92, w: 5.6, h: 1.5,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 27, TOTAL_SLIDES);
}

// Slide 28 — Content: 인간형 로봇 레이저 근거 약함 경고
function slide28_humanoid_robot() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '인간형 로봇: 기대는 크나 레이저 가공 근거가 약하다');

  // 경고 배너
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 1.1, w: 12.13, h: 0.5,
    fill: { color: COLORS.accent_yellow },
    line: { color: COLORS.accent_yellow }
  });
  slide.addText('⚠ 확신도: [낮음] — 레이저 전환 원문 미확인 · Tesla Optimus 양산 지연 반복 · CNC 주도 현실', {
    x: 0.3, y: 1.1, w: 12.13, h: 0.5,
    fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.bg_dark, align: 'center', valign: 'middle'
  });

  const facts = [
    {
      category: '시장 전망',
      content: '인간형 로봇 시장 $11.5B (2030) 예측\n\n하모닉 드라이브: 로봇 1대당 14~28개 사용\n\n[발행일: 2024-06] — 현재 유효성 확인 권고',
      color: COLORS.accent_blue,
      confidence: '중간'
    },
    {
      category: '현실: CNC 주도',
      content: '하모닉 드라이브, 볼스크류, 정밀 기어 가공은 현재 CNC 머시닝 주도\n\n레이저 전환 사례 원문 미확인 — 업계 발표에서만 언급 수준',
      color: COLORS.accent_red,
      confidence: '낮음'
    },
    {
      category: 'Tesla Optimus 지연',
      content: 'Tesla Optimus 양산 목표 반복 연기\n(2023년 → 2024년 → 2025년 → 재조정)\n\n조기 레이저 설비 투자 근거 미성숙 — 지연 패턴 MicroLED와 유사',
      color: COLORS.accent_yellow,
      confidence: '낮음'
    },
    {
      category: '레이저 기회 조건',
      content: '정밀 부품 소형화 + 생산량 급증 시 레이저 용접/드릴링 수요 발생 가능\n\n단, 2027년 이후 양산 규모 확인 후 진입 시점 재평가 권고',
      color: COLORS.accent_purple,
      confidence: '낮음~중간'
    }
  ];

  facts.forEach((f, i) => {
    const x = i % 2 === 0 ? 0.3 : 6.46;
    const y = i < 2 ? 1.75 : 4.55;

    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 5.9, h: 2.55,
      fill: { color: COLORS.bg_secondary },
      line: { color: f.color }
    });
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 0.06, h: 2.55,
      fill: { color: f.color },
      line: { color: f.color }
    });

    // 확신도 뱃지
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 3.8, y: y + 0.12, w: 1.9, h: 0.3,
      fill: { color: f.color },
      line: { color: f.color }
    });
    slide.addText('확신도: ' + f.confidence, {
      x: x + 3.8, y: y + 0.12, w: 1.9, h: 0.3,
      fontSize: 8, fontFace: FONTS.caption.fontFace, bold: true,
      color: COLORS.text_on_dark, align: 'center', valign: 'middle'
    });

    slide.addText(f.category, {
      x: x + 0.2, y: y + 0.12, w: 3.4, h: 0.36,
      fontSize: 11, fontFace: FONTS.subtitle.fontFace, bold: true,
      color: COLORS.text_primary
    });
    slide.addText(f.content, {
      x: x + 0.2, y: y + 0.55, w: 5.5, h: 1.85,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary, wrap: true
    });
  });

  addPageNumber(slide, 28, TOTAL_SLIDES);
}

// Slide 29 — Table: Part D 시장 기회 요약
function slide29_partd_summary_table() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'Part D 시장 기회 요약 — 확실성 × 규모');

  const headers = ['시장 영역', '현재 규모', '미래 전망', '확실성'];
  const dataRows = [
    ['EV 배터리 레이저 용접', '$3.2B (2025)', '$9.8B (2034) · CAGR 13.2%', '높음'],
    ['MicroLED TV 레이저 공정', '파일럿 / 소량 생산', '잠재 $4.5B (2035) — 불확실성 높음', '낮음~중간'],
    ['가전 레이저 용접/텍스처링', '기존 시장 (성숙)', '코봇+레이저 확산으로 점진적 성장', '높음'],
    ['인간형 로봇 레이저 가공', '초기 / 미확인', '잠재 대형이나 CNC 주도 현실', '낮음']
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.3,
    y: 1.15,
    w: 12.13,
    colW: [3.5, 2.5, 4.13, 2.0]
  });

  // 전략 가이드 박스
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 5.45, w: 12.13, h: 1.7,
    fill: { color: COLORS.bg_secondary },
    line: { color: COLORS.accent_blue }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: 5.45, w: 0.06, h: 1.7,
    fill: { color: COLORS.accent_blue },
    line: { color: COLORS.accent_blue }
  });

  slide.addText('역방향 의사결정 가이드', {
    x: 0.5, y: 5.52, w: 11.8, h: 0.32,
    fontSize: 10, fontFace: FONTS.subtitle.fontFace, bold: true,
    color: COLORS.accent_blue
  });

  const guide = [
    '• 지금 베팅: EV 배터리 용접 — 확실성 높음, 기술 연계성 명확, IATF 인증 선착 유리',
    '• 제한적 실험: 가전 텍스처링/코봇 — 기존 역량 활용 가능, 리스크 낮음',
    '• 관망: MicroLED TV — 2027년 수율 트리거 확인 후 진입 검토',
    '• 회피: 인간형 로봇 (현재) — 레이저 전환 근거 미확인, CNC 주도 현실 유지'
  ];

  guide.forEach((g, i) => {
    slide.addText(g, {
      x: 0.5, y: 5.88 + i * 0.25, w: 11.8, h: 0.25,
      fontSize: 9, fontFace: FONTS.body.fontFace, bold: false,
      color: COLORS.text_secondary
    });
  });

  addPageNumber(slide, 29, TOTAL_SLIDES);
}


// ---------------------------------------------------------------------------
// Slide 30 — [Section] Part 4: 구조 변화 — 레이저 소스 경쟁과 AI 융합이 산업 구도를 재편한다
// ---------------------------------------------------------------------------
function slide30_section_laser_competition() {
  const slide = pptx.addSlide();

  // 좌 다크 패널 (40%)
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 우 흰색 배경 (60%)
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.33, y: 0, w: 8.0, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  // 섹션 번호
  slide.addText('4', {
    x: 1.0, y: 2.3, w: 3.33, h: 1.5,
    fontSize: 80,
    fontFace: FONTS.kpi.fontFace,
    bold: FONTS.kpi.bold,
    color: COLORS.accent_cyan,
    align: 'left',
    valign: 'middle'
  });

  // Part 레이블
  slide.addText('Part 4', {
    x: 1.0, y: 1.6, w: 3.33, h: 0.5,
    fontSize: 14,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'left',
    valign: 'middle'
  });

  // 우 섹션 제목
  slide.addText('레이저 소스 경쟁과 AI 융합이\n산업 구도를 재편한다', {
    x: 6.0, y: 2.2, w: 6.73, h: 1.8,
    fontSize: 32,
    fontFace: FONTS.title.fontFace,
    bold: FONTS.title.bold,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'top',
    wrap: true
  });

  // 우 설명
  slide.addText('IPG vs. 중국 레이저의 가격 역습, USP 시장 구조 변화,\nAI+센서 융합으로 레이저가 자율 공정 단위로 진화한다', {
    x: 6.0, y: 4.2, w: 6.73, h: 1.2,
    fontSize: 15,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'top',
    wrap: true
  });

  // 구분 액센트 라인
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.0, y: 4.05, w: 2.0, h: 0.05,
    fill: { color: COLORS.accent_cyan }
  });
}

// ---------------------------------------------------------------------------
// Slide 31 — [TwoColumn] 중국 파이버 레이저의 가격 역습: IPG -22% YoY vs Raycus 점유율 30%
// ---------------------------------------------------------------------------
function slide31_china_laser_price_war() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '중국 파이버 레이저의 가격 역습: IPG -22% YoY vs Raycus 점유율 30%');

  // ── 좌측 컬럼 헤더 (IPG 하락) ──────────────────────────────────────
  slide.addShape(pptx.ShapeType.rect, {
    x: COL_LEFT_X, y: 1.8, w: COL_W, h: 0.42,
    fill: { color: COLORS.accent_red }
  });
  slide.addText('IPG Photonics — 구조적 하락', {
    x: COL_LEFT_X, y: 1.8, w: COL_W, h: 0.42,
    fontSize: 13,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_on_dark,
    align: 'center',
    valign: 'middle'
  });

  // IPG KPI 수치
  slide.addText('-22%', {
    x: COL_LEFT_X + 0.2, y: 2.3, w: COL_W - 0.4, h: 0.9,
    fontSize: 52,
    fontFace: FONTS.kpi.fontFace,
    bold: FONTS.kpi.bold,
    color: COLORS.accent_red,
    align: 'center',
    valign: 'middle'
  });

  slide.addText('Q4 2024 매출 YoY', {
    x: COL_LEFT_X + 0.2, y: 3.2, w: COL_W - 0.4, h: 0.35,
    fontSize: 12,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'center'
  });

  // IPG 상세 항목
  const ipgItems = [
    { bullet: '중국 내 매출 비중 급감 — 2020년대 초 40%+ → 2024년 10%대로 수축', accent: COLORS.accent_red },
    { bullet: '파이버 레이저 평균 판가(ASP) 지속 하락 — 중국산 경쟁 심화', accent: COLORS.text_secondary },
    { bullet: '북미/유럽 시장은 방어 중이나 단독으로 성장 상쇄 불가', accent: COLORS.text_secondary },
    { bullet: '고출력 레이저 & 의료/방산 부문으로 포트폴리오 이동 중', accent: COLORS.accent_blue }
  ];

  ipgItems.forEach((item, i) => {
    const yPos = 3.65 + i * 0.65;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: COL_LEFT_X + 0.1, y: yPos + 0.18, w: 0.14, h: 0.14,
      fill: { color: item.accent }
    });
    slide.addText(item.bullet, {
      x: COL_LEFT_X + 0.35, y: yPos, w: COL_W - 0.45, h: 0.6,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle',
      wrap: true
    });
  });

  // ── 우측 컬럼 헤더 (중국 레이저 부상) ──────────────────────────────
  slide.addShape(pptx.ShapeType.rect, {
    x: COL_RIGHT_X, y: 1.8, w: COL_W, h: 0.42,
    fill: { color: COLORS.accent_cyan }
  });
  slide.addText('Raycus / MAX — 시장 점령', {
    x: COL_RIGHT_X, y: 1.8, w: COL_W, h: 0.42,
    fontSize: 13,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.bg_dark,
    align: 'center',
    valign: 'middle'
  });

  // Raycus KPI
  slide.addText('30%', {
    x: COL_RIGHT_X + 0.2, y: 2.3, w: COL_W - 0.4, h: 0.9,
    fontSize: 52,
    fontFace: FONTS.kpi.fontFace,
    bold: FONTS.kpi.bold,
    color: COLORS.accent_cyan,
    align: 'center',
    valign: 'middle'
  });

  slide.addText('Raycus 중국 내 파이버 레이저 점유율', {
    x: COL_RIGHT_X + 0.2, y: 3.2, w: COL_W - 0.4, h: 0.35,
    fontSize: 12,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'center'
  });

  // Raycus 상세 항목
  const raycusItems = [
    { bullet: 'MAX Photonics 20~30kW 고출력 제품 출시 — 산업용 두께 절단 시장 장악', accent: COLORS.accent_cyan },
    { bullet: 'Raycus 3kW 제품 IPG 대비 50~60% 저가 — 조선/중공업 고객 대거 이탈', accent: COLORS.accent_red },
    { bullet: 'TRUMPF, 특허 침해 소송 제기 (2024) — 법적 대응이 시장 진입 속도 제한 가능', accent: COLORS.accent_yellow },
    { bullet: '내수 보조금 + 수출 보조금 구조 — 원가 경쟁력의 구조적 기반', accent: COLORS.text_secondary }
  ];

  raycusItems.forEach((item, i) => {
    const yPos = 3.65 + i * 0.65;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: COL_RIGHT_X + 0.1, y: yPos + 0.18, w: 0.14, h: 0.14,
      fill: { color: item.accent }
    });
    slide.addText(item.bullet, {
      x: COL_RIGHT_X + 0.35, y: yPos, w: COL_W - 0.45, h: 0.6,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle',
      wrap: true
    });
  });

  // 중앙 구분선
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.595, y: 1.8, w: 0.04, h: 5.5,
    fill: { color: COLORS.bg_secondary }
  });

  addPageNumber(slide, 31, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 32 — [Before/After] 중국 USP 레이저 진입: '서방 수성' 가정이 5년 내 무효화될 수 있다
// ---------------------------------------------------------------------------
function slide32_china_usp_entry() {
  const slide = pptx.addSlide();
  addTitleBar(slide, "중국 USP 레이저 진입: '서방 수성' 가정이 5년 내 무효화될 수 있다");

  // ── BEFORE 패널 ──────────────────────────────────────────────────────
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 1.85, w: 5.7, h: 0.42,
    fill: { color: COLORS.text_tertiary }
  });
  slide.addText('BEFORE — 현재 통념', {
    x: 0.6, y: 1.85, w: 5.7, h: 0.42,
    fontSize: 13,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_on_dark,
    align: 'center',
    valign: 'middle'
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 2.27, w: 5.7, h: 4.8,
    fill: { color: COLORS.bg_secondary }
  });

  // Before 핵심 메시지
  slide.addText('"표준 레이저 = 중국\n고정밀 USP = 서방"', {
    x: 0.8, y: 2.45, w: 5.3, h: 0.9,
    fontSize: 18,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'middle',
    italic: true
  });

  slide.addText('고정된 분업 구도 가정', {
    x: 0.8, y: 3.35, w: 5.3, h: 0.35,
    fontSize: 12,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'left'
  });

  const beforeItems = [
    'Coherent, TRUMPF, II-VI가 USP fs/ps 시장 80%+ 장악',
    '중국 기업은 원가 경쟁력은 있으나 정밀 레이저 기술 부재',
    '고부가가치 응용(반도체, 의료, 정밀 가공)은 서방 독점 구조',
    'USP 레이저는 진입 장벽(광학 설계, 펨토초 제어) 높아 5~10년 격차 유지'
  ];

  beforeItems.forEach((text, i) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.8, y: 3.8 + i * 0.62 + 0.2, w: 0.12, h: 0.12,
      fill: { color: COLORS.text_tertiary }
    });
    slide.addText(text, {
      x: 1.05, y: 3.8 + i * 0.62, w: 5.1, h: 0.55,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'middle',
      wrap: true
    });
  });

  // ── 화살표 ────────────────────────────────────────────────────────────
  slide.addShape(pptx.ShapeType.rightArrow, {
    x: 6.5, y: 3.8, w: 0.9, h: 0.7,
    fill: { color: COLORS.accent_yellow }
  });
  slide.addText('5년 내', {
    x: 6.5, y: 4.55, w: 0.9, h: 0.3,
    fontSize: 10,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'center'
  });

  // ── AFTER 패널 ───────────────────────────────────────────────────────
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.63, y: 1.85, w: 5.1, h: 0.42,
    fill: { color: COLORS.accent_yellow }
  });
  slide.addText('AFTER — 가능한 미래 시나리오', {
    x: 7.63, y: 1.85, w: 5.1, h: 0.42,
    fontSize: 13,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.bg_dark,
    align: 'center',
    valign: 'middle'
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 7.63, y: 2.27, w: 5.1, h: 4.8,
    fill: { color: COLORS.bg_secondary }
  });

  // After 핵심 메시지
  slide.addText('"서방 수성" 가정이\n5년 내 무효화 가능', {
    x: 7.83, y: 2.45, w: 4.7, h: 0.9,
    fontSize: 18,
    fontFace: FONTS.subtitle.fontFace,
    bold: true,
    color: COLORS.accent_yellow,
    align: 'left',
    valign: 'middle'
  });

  slide.addText('[확신도: 낮음~중간]', {
    x: 7.83, y: 3.35, w: 4.7, h: 0.35,
    fontSize: 12,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'left'
  });

  const afterItems = [
    'Raycus, USP 펨토초 레이저 독자 개발 본격화 (2024 진행 중)',
    '100kW급 파이버 레이저 개발 완료 — 고출력 기술 축적 증명',
    '중국 내 반도체/디스플레이 USP 수요 급증으로 자체 공급 동기 강함',
    '5년 내 프리미엄 USP 시장 진입 가능 — 단, 수출 규제·특허 장벽이 변수'
  ];

  afterItems.forEach((text, i) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 7.83, y: 3.8 + i * 0.62 + 0.2, w: 0.12, h: 0.12,
      fill: { color: COLORS.accent_yellow }
    });
    slide.addText(text, {
      x: 8.08, y: 3.8 + i * 0.62, w: 4.5, h: 0.55,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'middle',
      wrap: true
    });
  });

  addPageNumber(slide, 32, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 33 — [Content] USP 레이저 시장: fs 64% 점유, $2.45~2.76B → $10B+(2033)
// ---------------------------------------------------------------------------
function slide33_usp_laser_market() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'USP 레이저 시장: fs 64% 점유, $2.45~2.76B(2025) → $10B+(2033)');

  // ── 상단 KPI 3개 ─────────────────────────────────────────────────────
  const kpis = [
    { value: '64.4%', label: 'fs(펨토초) 레이저 점유율', desc: 'USP 시장 내 fs 비중', color: COLORS.accent_blue },
    { value: '$2.76B', label: '2025년 USP 레이저 시장', desc: '고점 추정치 기준', color: COLORS.accent_cyan },
    { value: '$10B+', label: '2033년 전망 시장 규모', desc: 'CAGR 17~20% 가정', color: COLORS.accent_yellow }
  ];

  const kpiCardW = 3.7;
  const kpiCardH = 1.55;
  const kpiY = 1.85;
  const kpiXs = [0.6, 4.65, 8.7];

  kpis.forEach((kpi, i) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: kpiXs[i], y: kpiY, w: kpiCardW, h: kpiCardH,
      fill: { color: COLORS.bg_secondary },
      rectRadius: 0.08
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: kpiXs[i], y: kpiY, w: kpiCardW, h: 0.06,
      fill: { color: kpi.color }
    });
    slide.addText(kpi.value, {
      x: kpiXs[i] + 0.15, y: kpiY + 0.12, w: kpiCardW - 0.3, h: 0.75,
      fontSize: 36,
      fontFace: FONTS.kpi.fontFace,
      bold: FONTS.kpi.bold,
      color: kpi.color,
      align: 'center',
      valign: 'middle'
    });
    slide.addText(kpi.label, {
      x: kpiXs[i] + 0.15, y: kpiY + 0.9, w: kpiCardW - 0.3, h: 0.38,
      fontSize: 12,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'center',
      valign: 'top'
    });
    slide.addText(kpi.desc, {
      x: kpiXs[i] + 0.15, y: kpiY + 1.3, w: kpiCardW - 0.3, h: 0.22,
      fontSize: 10,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_tertiary,
      align: 'center'
    });
  });

  // ── 구조 변화 핵심 포인트 ────────────────────────────────────────────
  const points = [
    {
      title: '>100W fs 산업용 레이저 등장',
      body: 'Coherent EDGE FL30 (30kW급 파이버), >100W fs 고출력화 — 반도체·디스플레이 대면적 가공 확장',
      color: COLORS.accent_blue
    },
    {
      title: '적응형 빔 쉐이핑 + AI 결합',
      body: '실시간 빔 프로파일 최적화 + AI 파라미터 제어 — 다재료·다공정 대응 범용화 가속',
      color: COLORS.accent_cyan
    },
    {
      title: '비용 하락 곡선 가속',
      body: '5kW fs 레이저 가격 2020~2025년 40~50% 하락 추정 — 중소기업 진입 장벽 완화, 채택 가속',
      color: COLORS.accent_yellow
    },
    {
      title: '응용 확장: 반도체·의료·EV·항공',
      body: '태양전지 스크라이빙, 의료 스텐트 가공, EV 전극 슬리팅, 항공 냉각홀 — 수요 다각화',
      color: COLORS.accent_purple
    }
  ];

  const ptStartY = 3.6;
  const ptH = 0.72;

  points.forEach((pt, i) => {
    const yPos = ptStartY + i * ptH;
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.6, y: yPos + 0.1, w: 0.22, h: 0.42,
      fill: { color: pt.color }
    });
    slide.addText(pt.title, {
      x: 0.98, y: yPos, w: 4.0, h: 0.36,
      fontSize: 13,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle'
    });
    slide.addText(pt.body, {
      x: 0.98, y: yPos + 0.36, w: 11.75, h: 0.35,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      wrap: true
    });
  });

  addPageNumber(slide, 33, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 34 — [Layered Stack] AI+센서 융합이 레이저를 '자율 공정 단위'로 전환시킨다
// ---------------------------------------------------------------------------
function slide34_ai_sensor_stack() {
  const slide = pptx.addSlide();
  addTitleBar(slide, "AI+센서 융합이 레이저를 '자율 공정 단위'로 전환시킨다");

  // 3계층 스택 구조
  const layers = [
    {
      label: '최상위 계층',
      title: '공정 플랫폼',
      body: '폐루프(Closed-Loop) 제어  •  예지 보전(Predictive Maintenance)\n품질 데이터 레이크  •  다공정 오케스트레이션',
      color: COLORS.accent_blue,
      icon: '🏭',
      y: 1.85
    },
    {
      label: '중간 계층',
      title: 'AI 엔진',
      body: '인라인 모니터링(Melt Pool / 용접 비드 실시간 분석)\n파라미터 자동 최적화  •  GAN 기반 melt pool 품질 예측',
      color: COLORS.accent_cyan,
      icon: '🤖',
      y: 3.55
    },
    {
      label: '기초 계층',
      title: '하드웨어',
      body: '레이저 소스(파이버/USP/그린)  •  고속 광학 센서  •  적응형 광학(AO)\n실시간 피드백 제어기(FPGA/DSP)',
      color: COLORS.accent_yellow,
      icon: '⚡',
      y: 5.25
    }
  ];

  const stackW = 12.13;
  const stackH = 1.55;
  const stackX = 0.6;

  layers.forEach((layer) => {
    // 계층 배경 박스
    slide.addShape(pptx.ShapeType.rect, {
      x: stackX, y: layer.y, w: stackW, h: stackH,
      fill: { color: COLORS.bg_secondary }
    });

    // 좌측 컬러 액센트 바
    slide.addShape(pptx.ShapeType.rect, {
      x: stackX, y: layer.y, w: 0.35, h: stackH,
      fill: { color: layer.color }
    });

    // 계층 레이블 (수직)
    slide.addText(layer.label, {
      x: stackX + 0.05, y: layer.y + 0.05, w: 0.25, h: stackH - 0.1,
      fontSize: 8,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle',

    });

    // 계층 제목
    slide.addText(layer.title, {
      x: stackX + 0.55, y: layer.y + 0.12, w: 3.5, h: 0.5,
      fontSize: 20,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: layer.color,
      align: 'left',
      valign: 'middle'
    });

    // 계층 본문
    slide.addText(layer.body, {
      x: stackX + 0.55, y: layer.y + 0.65, w: 11.2, h: 0.82,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      wrap: true
    });

    // 계층 우측 강조 레이블
    slide.addText(layer.title.toUpperCase(), {
      x: stackX + 8.0, y: layer.y + 0.12, w: 4.5, h: 0.45,
      fontSize: 10,
      fontFace: FONTS.body.fontFace,
      color: layer.color,
      align: 'right',
      valign: 'middle'
    });
  });

  // 화살표 연결: 최하 → 최상
  const arrowX = stackX + 5.5;
  // 하드웨어 → AI 화살표
  slide.addShape(pptx.ShapeType.upArrow, {
    x: arrowX, y: 4.85, w: 1.2, h: 0.35,
    fill: { color: COLORS.accent_yellow }
  });
  // AI → 플랫폼 화살표
  slide.addShape(pptx.ShapeType.upArrow, {
    x: arrowX, y: 3.15, w: 1.2, h: 0.35,
    fill: { color: COLORS.accent_cyan }
  });

  addPageNumber(slide, 34, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 35 — [Cards] AI 레이저 공정의 3대 구조 변화
// ---------------------------------------------------------------------------
function slide35_ai_laser_structural_change() {
  const slide = pptx.addSlide();
  addTitleBar(slide, 'AI 레이저 공정의 3대 구조 변화');

  const cards = [
    {
      accentColor: COLORS.accent_blue,
      title: '① 레이저 → 자율 공정 단위',
      body: '공정 엔지니어의 파라미터 수동 튜닝 역할 감소\n소프트웨어(AI 모델, 공정 레시피 DB)의 가치 급등\n장비 HW 마진 압박 — SW/서비스 수익 비중 증가'
    },
    {
      accentColor: COLORS.accent_cyan,
      title: '② 전용 장비 → 범용 플랫폼',
      body: '빔 쉐이핑 + AI 파라미터 최적화로 단일 장비가 다품종 대응\n고객당 매출 단가 상승 (장비 × 소프트웨어 × 유지보수)\n진입 장벽: 레시피 라이브러리가 경쟁 해자로 부상'
    },
    {
      accentColor: COLORS.accent_yellow,
      title: '③ 사후 검사 → 인라인 보정',
      body: '실시간 결함 억제 — 반품률·불량률 구조적 개선\nMelt pool 모니터링으로 용접 강도 예측 (GAN 모델 활용)\n검사 단계 제거 → 사이클타임 단축 + 라인 가동률 향상'
    }
  ];

  const positions = CARD_2X3.positions;
  const cardW = CARD_2X3.w;
  const cardH = 4.8;

  cards.forEach((card, i) => {
    if (i < 3) {
      addCard(slide, {
        x: positions[i].x,
        y: 1.85,
        w: cardW,
        h: cardH,
        title: card.title,
        body: card.body,
        accentColor: card.accentColor
      });
    }
  });

  addPageNumber(slide, 35, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 36 — [Comparison Table] 경쟁 기술 대비 레이저 우위/열위
// ---------------------------------------------------------------------------
function slide36_laser_vs_competitors() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '경쟁 기술 대비 레이저 우위/열위 — 정밀도·비용·환경·재료 범위·시장 규모');

  const features = ['정밀도', '비용 경쟁력', '환경 친화성', '재료 범위', '시장 규모'];
  const options = [
    {
      label: '레이저',
      color: COLORS.accent_blue,
      scores: ['✓ 우위', '△ 중간', '✓ 우위', '✓ 우위', '✓ 우위']
    },
    {
      label: '플라즈마',
      color: COLORS.text_tertiary,
      scores: ['✗ 열위', '✓ 우위', '✗ 열위', '✓ 우위', '✗ 열위']
    },
    {
      label: '전자빔',
      color: COLORS.text_tertiary,
      scores: ['✗ 열위', '✗ 열위', '✓ 우위', '△ 제한적', '✗ 소규모']
    },
    {
      label: 'CNC 기계가공',
      color: COLORS.text_tertiary,
      scores: ['✗ 열위', '✓ 우위', '✗ 열위', '△ 경성 재료', '✓ 우위']
    }
  ];

  // 테이블 헤더 행
  const headers = ['기술', '정밀도', '비용 경쟁력', '환경 친화성', '재료 범위', '시장 규모'];

  const dataRows = options.map((opt) => {
    const isLaser = opt.label === '레이저';
    return [
      { text: opt.label, options: { bold: isLaser, color: isLaser ? COLORS.accent_blue : COLORS.text_secondary } },
      ...opt.scores.map((score) => {
        const isAdvantage = score.startsWith('✓');
        const isNeutral = score.startsWith('△');
        return {
          text: score,
          options: {
            bold: isLaser,
            color: isAdvantage
              ? (isLaser ? COLORS.accent_blue : COLORS.text_tertiary)
              : (isNeutral ? COLORS.accent_yellow : COLORS.accent_red),
            align: 'center'
          }
        };
      })
    ];
  });

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.85, w: 12.13, h: 4.2,
    colW: [2.0, 2.03, 2.02, 2.03, 2.03, 2.02]
  });

  // 하단 인사이트 박스
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 6.2, w: 12.13, h: 0.65,
    fill: { color: COLORS.bg_secondary }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 6.2, w: 0.08, h: 0.65,
    fill: { color: COLORS.accent_blue }
  });
  slide.addText('핵심 인사이트: 레이저의 비용 열위는 고정밀·다재료 응용에서 상쇄된다. 비용이 유일한 선택 기준인 표준 절단 시장은 중국 레이저에 내어주고, 정밀도·유연성·환경 규제 대응이 필요한 고부가 시장 집중이 방어 전략이다.', {
    x: 0.82, y: 6.22, w: 11.8, h: 0.61,
    fontSize: 11,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'middle',
    wrap: true
  });

  addPageNumber(slide, 36, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 37 — [Section] Part 5: 3가지 미래 시나리오 — 어떤 미래에 베팅할 것인가
// ---------------------------------------------------------------------------
function slide37_section_scenarios() {
  const slide = pptx.addSlide();

  // 좌 다크 패널 (40%)
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 5.33, h: 7.5,
    fill: { color: COLORS.bg_dark }
  });

  // 우 흰색 배경 (60%)
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.33, y: 0, w: 8.0, h: 7.5,
    fill: { color: COLORS.bg_primary }
  });

  // 섹션 번호
  slide.addText('5', {
    x: 1.0, y: 2.3, w: 3.33, h: 1.5,
    fontSize: 80,
    fontFace: FONTS.kpi.fontFace,
    bold: FONTS.kpi.bold,
    color: COLORS.accent_yellow,
    align: 'left',
    valign: 'middle'
  });

  // Part 레이블
  slide.addText('Part 5', {
    x: 1.0, y: 1.6, w: 3.33, h: 0.5,
    fontSize: 14,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_tertiary,
    align: 'left',
    valign: 'middle'
  });

  // 우 섹션 제목
  slide.addText('3가지 미래 시나리오\n어떤 미래에 베팅할 것인가', {
    x: 6.0, y: 2.2, w: 6.73, h: 1.8,
    fontSize: 32,
    fontFace: FONTS.title.fontFace,
    bold: FONTS.title.bold,
    color: COLORS.text_primary,
    align: 'left',
    valign: 'top',
    wrap: true
  });

  // 우 설명
  slide.addText('보수 / 기준 / 공격 시나리오별 전제, 촉발 조건, 우리의 전략을 정의한다', {
    x: 6.0, y: 4.2, w: 6.73, h: 1.0,
    fontSize: 15,
    fontFace: FONTS.body.fontFace,
    color: COLORS.text_secondary,
    align: 'left',
    valign: 'top',
    wrap: true
  });

  // 구분 액센트 라인
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.0, y: 4.05, w: 2.0, h: 0.05,
    fill: { color: COLORS.accent_yellow }
  });

  // 시나리오 3개 아이콘 힌트
  const scenarios = [
    { label: '보수', color: COLORS.text_tertiary, x: 6.0 },
    { label: '기준', color: COLORS.accent_blue, x: 8.1 },
    { label: '공격', color: COLORS.accent_yellow, x: 10.2 }
  ];

  scenarios.forEach((s) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: s.x, y: 5.3, w: 1.8, h: 0.65,
      fill: { color: s.color }
    });
    slide.addText(s.label, {
      x: s.x, y: 5.3, w: 1.8, h: 0.65,
      fontSize: 14,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle'
    });
  });
}

// ---------------------------------------------------------------------------
// Slide 38 — [Table] 시나리오 매트릭스: 보수/기준/공격
// ---------------------------------------------------------------------------
function slide38_scenario_matrix() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '시나리오 매트릭스: 보수 / 기준 / 공격 — 전제, 촉발 조건, 반증 조건');

  const headers = ['항목', '보수 (25%)', '기준 (50%)', '공격 (25%)'];

  const dataRows = [
    [
      '핵심 전제',
      'MicroLED 수율 미해소\n2029년 이후 상용화',
      'MicroLED 워치/AR 소량\n폴더블 침투율 3%+',
      'MicroLED 스마트폰 2027\n폴더블 5%+ / 로봇 10만대+'
    ],
    [
      '촉발 조건',
      '수율 99.99% 미달 지속\nApple Watch 2차 백지화',
      '폴더블 YoY 30%+ 성장\nEV CAGR 13% 유지',
      'MicroLED 수율 99.99% 달성\n로봇 1만대/년 양산 돌파'
    ],
    [
      '반증 조건',
      'MicroLED 수율 급등\n폴더블 시장 급성장',
      'MicroLED 2025~2026 조기 상용화\n로봇 양산 예상 초과',
      '수율 2030년까지 미달\nEV 접착 본딩 대체 가속'
    ],
    [
      'EV 레이저 전략',
      'LLO 기존 유지\nEV 용접 집중 (그린+파이버)',
      '폴더블+EV 양면 추진\nGLLO R&D 병행',
      'MicroLED LIFT 본격 + EV + 로봇'
    ],
    [
      '우리 전략 핵심',
      'EV 그린 레이저 PoC\nIATF 인증 착수',
      'EV + 폴더블 드릴링 역량 확보\nMicroLED R&D 준비',
      'MicroLED+로봇+AI 플랫폼\n공격적 선점'
    ]
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.85, w: 12.13, h: 5.0,
    colW: [2.2, 3.31, 3.31, 3.31]
  });

  addPageNumber(slide, 38, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 39 — [Cards] 시나리오별 핵심 차이점
// ---------------------------------------------------------------------------
function slide39_scenario_key_diff() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '시나리오별 핵심 차이점 — 무엇이 달라지는가');

  const cards = [
    {
      accentColor: COLORS.text_secondary,
      title: '보수 시나리오 — LLO 유지 + EV 집중',
      body: 'MicroLED 2029년+ 가정\nLLO 기존 공정 유지, 대규모 R&D 투자 보류\nEV 배터리 용접 집중: 그린+파이버 하이브리드\nIATF 인증 12~24개월 착수\n⚠ 기회 놓칠 리스크: MicroLED 조기 전환 시 2~3년 지연'
    },
    {
      accentColor: COLORS.accent_blue,
      title: '기준 시나리오 — 폴더블+EV 양면 추진',
      body: 'MicroLED R&D 준비 병행 (본격 투자는 아님)\n폴더블 드릴링 역량 확보 + EV 용접 동시 진행\nGLLO 스케일업 R&D 파트너십\nAI 인라인 모니터링 PoC 착수\n→ 균형 전략: 리스크 분산 + 기회 유지'
    },
    {
      accentColor: COLORS.accent_yellow,
      title: '공격 시나리오 — MicroLED + 로봇 + AI 플랫폼',
      body: 'MicroLED LIFT 장비 본격 개발 (수율 트리거 확인 후)\n인간형 로봇 레이저 가공 선점 시도\nAI 공정 플랫폼 구축 — 장비 → 소프트웨어 매출 전환\n⚠ 가장 큰 오판 리스크: MicroLED 지연·로봇 양산 실패 시 매몰비용 높음'
    }
  ];

  const positions = CARD_2X3.positions;
  const cardW = CARD_2X3.w;
  const cardH = 4.8;

  cards.forEach((card, i) => {
    addCard(slide, {
      x: positions[i].x,
      y: 1.85,
      w: cardW,
      h: cardH,
      title: card.title,
      body: card.body,
      accentColor: card.accentColor
    });
  });

  addPageNumber(slide, 39, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 40 — [Table] 오판 리스크 매트릭스
// ---------------------------------------------------------------------------
function slide40_misjudgment_risk() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '오판 리스크 매트릭스 — 이 판단이 틀렸을 때 무엇을 잃는가');

  const headers = ['판단 영역', '오판 내용', '잃는 것 (기회비용/매몰비용)', '가능성'];

  const dataRows = [
    [
      'EV 배터리 용접',
      '접착 본딩이 레이저 용접을 대체\n(전고체 배터리 구조 변경)',
      'IATF 인증 비용 + EV 투자 기회비용\n→ 대안: 전고체 대응 기술 별도 준비',
      { text: '낮음', options: { color: COLORS.accent_cyan, bold: true, align: 'center' } }
    ],
    [
      '폴더블 디스플레이',
      '시장 성장 정체\n(크리즈 문제 미해결, 소비자 외면)',
      '드릴링 장비 투자비\n→ 대안: OLED/UTG 공정으로 전환',
      { text: '중간', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ],
    [
      'MicroLED',
      '수율 갑자기 해결, 조기 양산\n(우리 진입 2~3년 지연)',
      '고부가 MicroLED 시장 선점 기회 상실\n→ 대안: 2027년 트리거 모니터링 필수',
      { text: '낮음~중간', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ],
    [
      'GLLO 스케일업',
      'R&D 성공했으나\n고객 채택 저조',
      'R&D 비용 (제한적, 파트너십으로 분산 가능)\n→ 대안: 외부 라이선싱 또는 공동 개발',
      { text: '중간', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ],
    [
      '중국 USP 진입',
      '중국 USP 급성장 대비 안 함\n(소싱·공급망 전략 부재)',
      '소싱 비용 급증 + 가격 경쟁력 약화\n→ 대안: 고정밀 응용 영역 선점 + 소싱 이원화',
      { text: '중간', options: { color: COLORS.accent_yellow, bold: true, align: 'center' } }
    ]
  ];

  addStyledTable(slide, headers, dataRows, {
    x: 0.6, y: 1.85, w: 12.13, h: 4.9,
    colW: [2.0, 3.4, 4.5, 2.23]
  });

  addPageNumber(slide, 40, TOTAL_SLIDES);
}

// ---------------------------------------------------------------------------
// Slide 41 — [Content] 틀릴 가능성이 가장 큰 3가지 전제
// ---------------------------------------------------------------------------
function slide41_top3_wrong_assumptions() {
  const slide = pptx.addSlide();
  addTitleBar(slide, '틀릴 가능성이 가장 큰 3가지 전제');

  const assumptions = [
    {
      num: '01',
      title: 'MicroLED 타임라인',
      subtitle: '역사적으로 가장 자주 틀려온 전제',
      body: [
        '• 2015년 이후 매 2~3년마다 "2~3년 내 상용화"가 반복됐다',
        '• 현재 수율 99.5~99.8% — 목표 99.99%까지 0.2% 격차가 기하급수적 어려움',
        '• 보수 시나리오: 2029년 이후. 단, 2027년 워치/AR 소량 양산 가능',
        '전략 함의: 2년 버퍼를 기본 가정으로 내장하고, 2026~2027년 신호를 분기별 점검'
      ],
      color: COLORS.accent_red,
      confidence: '[확신도: 낮음~중간]'
    },
    {
      num: '02',
      title: '인간형 로봇 양산 스케일',
      subtitle: '1만 대/년 이전 레이저 수요는 미미',
      body: [
        '• Tesla Optimus, Figure AI 등 "수십만 대" 목표 반복 발표 — 실현 지연 패턴 반복',
        '• 현실: 2025년 말 기준 연간 수천 대 수준 (레이저 수요 임계점 미달)',
        '• 하모닉 드라이브 레이저 가공 전환 근거 독립 검증 없음',
        '전략 함의: 2028년 이전 로봇 레이저 수요 기반 투자는 보류. 10만 대/년 돌파 확인 후 진입'
      ],
      color: COLORS.accent_yellow,
      confidence: '[확신도: 낮음]'
    },
    {
      num: '03',
      title: 'AI 공정 모니터링 범용화',
      subtitle: '파일럿→양산 갭이 예상보다 클 수 있다',
      body: [
        '• 파일럿 환경 성공률은 높으나 양산 전환 성공률은 1~5% (제조 AI 전반)',
        '• 레이저 공정 AI는 재료 변동성·빔 드리프트·환경 변수에 취약',
        '• 실무자 경험: "AI가 잘 되는 레이저 공정"과 "AI가 필요한 레이저 공정"이 다름',
        '전략 함의: 파일럿 PoC를 먼저 수행하고, 양산 갭 측정 후 투자 확대 결정'
      ],
      color: COLORS.accent_purple,
      confidence: '[확신도: 중간]'
    }
  ];

  const itemH = 1.65;
  const startY = 1.85;

  assumptions.forEach((item, i) => {
    const yPos = startY + i * itemH;

    // 번호 배지 (큰 원)
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.6, y: yPos + 0.25, w: 0.75, h: 0.75,
      fill: { color: item.color }
    });
    slide.addText(item.num, {
      x: 0.6, y: yPos + 0.25, w: 0.75, h: 0.75,
      fontSize: 18,
      fontFace: FONTS.kpi.fontFace,
      bold: true,
      color: COLORS.text_on_dark,
      align: 'center',
      valign: 'middle'
    });

    // 전제 제목
    slide.addText(item.title, {
      x: 1.5, y: yPos + 0.1, w: 7.5, h: 0.42,
      fontSize: 17,
      fontFace: FONTS.subtitle.fontFace,
      bold: true,
      color: COLORS.text_primary,
      align: 'left',
      valign: 'middle'
    });

    // 부제목 (서브타이틀)
    slide.addText(item.subtitle, {
      x: 1.5, y: yPos + 0.5, w: 7.0, h: 0.3,
      fontSize: 12,
      fontFace: FONTS.body.fontFace,
      color: item.color,
      align: 'left',
      valign: 'middle'
    });

    // 확신도 레이블
    slide.addText(item.confidence, {
      x: 9.3, y: yPos + 0.15, w: 3.43, h: 0.35,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_tertiary,
      align: 'right',
      valign: 'middle'
    });

    // 본문 항목들
    const bodyText = item.body.join('\n');
    const isLastBullet = (text) => !text.startsWith('•');

    // 일반 본문 (전략 함의 포함)
    slide.addText(bodyText, {
      x: 1.5, y: yPos + 0.82, w: 11.23, h: 0.78,
      fontSize: 11,
      fontFace: FONTS.body.fontFace,
      color: COLORS.text_secondary,
      align: 'left',
      valign: 'top',
      wrap: true,
      lineSpacingMultiple: 1.3
    });

    // 구분선 (마지막 제외)
    if (i < assumptions.length - 1) {
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.6, y: yPos + itemH - 0.08, w: 12.13, h: 0.02,
        fill: { color: 'E2E8F0' }
      });
    }
  });

  addPageNumber(slide, 41, TOTAL_SLIDES);
}


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


// === 실행 블록 (자동 생성) ===
slide01_title();
slide02_stat_three_numbers();
slide03_cards_structural_changes();
slide04_tech_connections();
slide05_section_part1();
slide06_icon_grid_five_techs();
slide07_market_table();
slide08_two_col_display();
slide09_content_appliance();
slide10_content_manufacturing();
slide11_before_after_llo();
slide12_tech_market_matrix();
slide13_section_part2();
slide14_stat_foldable_demand();
slide15_creasefree_foldable();
slide16_foldable_timeline();
slide17_microled_cards();
slide18_microled_before_after();
slide19_inkjet_oled_threat();
slide20_llo_alternatives();
slide21_display_bottlenecks();
slide22_section_ev();
slide23_ev_stat();
slide24_ev_green_laser();
slide25_ev_process_flow();
slide26_appliance_laser_cards();
slide27_microled_tv();
slide28_humanoid_robot();
slide29_partd_summary_table();
slide30_section_laser_competition();
slide31_china_laser_price_war();
slide32_china_usp_entry();
slide33_usp_laser_market();
slide34_ai_sensor_stack();
slide35_ai_laser_structural_change();
slide36_laser_vs_competitors();
slide37_section_scenarios();
slide38_scenario_matrix();
slide39_scenario_key_diff();
slide40_misjudgment_risk();
slide41_top3_wrong_assumptions();
slide42_section_strategy();
slide43_strategy_options_table();
slide44_priority_pyramid();
slide45_bet_kpi();
slide46_roadmap_now();
slide47_roadmap_near();
slide48_roadmap_mid();
slide49_reverse_decision();
slide50_evidence_matrix();
slide51_section_monitoring();
slide52_triggers();
slide53_signal_register();
slide54_final_recommendation();
slide55_closing();

const path = require('path');
pptx.writeFile({ fileName: path.join(__dirname, 'laser-technology-roadmap.pptx') })
  .then(() => console.log('저장 완료: laser-technology-roadmap.pptx'))
  .catch(err => console.error('저장 실패:', err));
