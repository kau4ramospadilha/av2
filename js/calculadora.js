/* FinEduca — calculadora.js */
'use strict';

const fmtBRL = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function calcular() {
  const inicial = parseFloat(document.getElementById('c-inicial')?.value) || 0;
  const mensal  = parseFloat(document.getElementById('c-mensal')?.value)  || 0;
  const taxa    = parseFloat(document.getElementById('c-taxa')?.value)    || 0;
  const anos    = parseInt(document.getElementById('c-anos')?.value)      || 1;

  const taxaMensal = (1 + taxa / 100) ** (1 / 12) - 1;
  let montante = inicial;
  let investido = inicial;
  const serieM = [inicial];
  const serieI = [inicial];

  for (let m = 1; m <= anos * 12; m++) {
    montante = montante * (1 + taxaMensal) + mensal;
    investido += mensal;
    if (m % 12 === 0) { serieM.push(montante); serieI.push(investido); }
  }

  const el = id => document.getElementById(id);
  if (el('res-investido'))  el('res-investido').textContent  = fmtBRL(investido);
  if (el('res-final'))      el('res-final').textContent      = fmtBRL(montante);
  if (el('res-rendimento')) el('res-rendimento').textContent = fmtBRL(montante - investido);

  desenharGrafico(serieM, serieI, anos);
}

function desenharGrafico(montante, investido, anos) {
  const canvas = document.getElementById('calcChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 600, H = 240;
  canvas.width = W; canvas.height = H;

  const pad = { t:20, r:20, b:40, l:72 };
  const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b;
  const maxV = Math.max(...montante) * 1.06;
  ctx.clearRect(0, 0, W, H);

  const xp = i => pad.l + (i / anos) * cW;
  const yp = v => pad.t + cH - (v / maxV) * cH;

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (i / 4) * cH;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cW, y); ctx.stroke();
    ctx.fillStyle = 'rgba(148,163,184,0.55)';
    ctx.font = '11px DM Sans,sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(fmtBRL(maxV - (i / 4) * maxV), pad.l - 6, y + 4);
  }

  // X labels
  ctx.fillStyle = 'rgba(148,163,184,0.55)';
  ctx.textAlign = 'center';
  const step = anos <= 10 ? 1 : Math.ceil(anos / 10);
  for (let yr = 0; yr <= anos; yr++) {
    if (yr % step === 0) ctx.fillText(yr + 'a', xp(yr), H - pad.b + 18);
  }

  // Area investido
  ctx.beginPath();
  investido.forEach((v, i) => i === 0 ? ctx.moveTo(xp(i), yp(v)) : ctx.lineTo(xp(i), yp(v)));
  ctx.lineTo(xp(anos), pad.t + cH); ctx.lineTo(xp(0), pad.t + cH); ctx.closePath();
  ctx.fillStyle = 'rgba(56,189,248,0.12)'; ctx.fill();

  // Area montante
  ctx.beginPath();
  montante.forEach((v, i) => i === 0 ? ctx.moveTo(xp(i), yp(v)) : ctx.lineTo(xp(i), yp(v)));
  ctx.lineTo(xp(anos), pad.t + cH); ctx.lineTo(xp(0), pad.t + cH); ctx.closePath();
  ctx.fillStyle = 'rgba(34,211,160,0.16)'; ctx.fill();

  // Linha investido
  ctx.beginPath();
  investido.forEach((v, i) => i === 0 ? ctx.moveTo(xp(i), yp(v)) : ctx.lineTo(xp(i), yp(v)));
  ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2; ctx.setLineDash([6,4]); ctx.stroke(); ctx.setLineDash([]);

  // Linha montante
  ctx.beginPath();
  montante.forEach((v, i) => i === 0 ? ctx.moveTo(xp(i), yp(v)) : ctx.lineTo(xp(i), yp(v)));
  ctx.strokeStyle = '#22d3a0'; ctx.lineWidth = 2.5; ctx.stroke();

  // Dot final
  const lx = xp(anos), ly = yp(montante[montante.length - 1]);
  ctx.beginPath(); ctx.arc(lx, ly, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#22d3a0'; ctx.fill();
}

// Bind
const btnCalc = document.getElementById('btn-calc');
if (btnCalc) btnCalc.addEventListener('click', calcular);
['c-inicial','c-mensal','c-taxa','c-anos'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') calcular(); });
});
window.addEventListener('load', calcular);
let resizeTimer;
window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(calcular, 250); }, { passive: true });
