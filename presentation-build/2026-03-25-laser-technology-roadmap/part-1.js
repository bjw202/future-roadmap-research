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
      line: { color: color, width: 0 }
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
      line: { color: color, width: 0 }
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
    line: { color: COLORS.bg_dark, width: 0 }
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
      line: { color: 'E2E8F0', width: 0 }
    });
    slide.addShape('roundRect', {
      x, y, w: layerW, h: layerH,
      rectRadius: 0.08,
      fill: { color: color },
      line: { color: color, width: 0 }
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
      line: { color: b.color, width: 0 }
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
      line: { color: c.color, width: 0 }
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
    line: { color: COLORS.bg_dark, width: 0 }
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
