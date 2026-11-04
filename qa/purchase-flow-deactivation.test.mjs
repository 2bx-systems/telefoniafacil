import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const source = readFileSync(new URL('../assets/js/site.js', import.meta.url), 'utf8');
const purchasePageUrl = new URL('../compras/index.html', import.meta.url);


test('purchase handoff path has a static entrypoint', () => {
  assert.equal(existsSync(purchasePageUrl), true);
  const html = readFileSync(purchasePageUrl, 'utf8');
  assert.match(html, /data-page="compras"/);
  assert.match(html, /assets\/js\/site\.js/);
});

test('product detail CTAs send the selected product directly to Compras', () => {
  const currentCta = 'href="${purchaseHref(d.title)}"';
  const legacyCta = 'href="${href(\'contratar\')}?produto=${encodeURIComponent(d.title)}"';
  assert.ok(source.includes(currentCta));
  assert.equal(source.includes(legacyCta), false);
});

test('Chip plan CTAs are direct Compras handoffs, not legacy chip-select buttons', () => {
  assert.ok(source.includes("purchaseHref('telefonia-facil-chip',p[0])"));
  assert.equal(source.includes("replace(/\\bchip-select\\b/g"), false);
  assert.ok(source.includes("if(PURCHASE_FLOWS_ENABLED&&page==='chip'&&document.getElementById('chipForm')){let selected=null;"));
});

test('Chip FAQ and steps anchor on the plans section so header anchors resolve', () => {
  assert.ok(source.includes("const plansSection=document.querySelector('.consumer-plans');if(plansSection){plansSection.insertAdjacentHTML('afterend','<section id=\"como-funciona-chip\""));
  assert.equal(source.includes("const checkout=document.querySelector('.consumer-checkout');if(checkout){checkout.insertAdjacentHTML('beforebegin'"), false);
});

test('Chip carousel keeps autoplay paused while the pointer stays over it', () => {
  assert.match(source, /mouseenter',\(\)=>\{hovered=true;clearInterval\(timer\)/);
  assert.match(source, /mouseleave',\(\)=>\{hovered=false;start\(\)\}/);
  assert.match(source, /const start=\(\)=>\{clearInterval\(timer\);go\(current\);if\(!hovered\)timer=setInterval/);
});

test('public copy does not reference the retired site or catalog', () => {
  assert.doesNotMatch(source, /site antigo|catálogo antigo|site público atual/);
});

test('sitemap does not list the noindex purchase route', () => {
  const sitemap = readFileSync(new URL('../sitemap.xml', import.meta.url), 'utf8');
  assert.doesNotMatch(sitemap, /\/contratar\//);
});

test('no active purchase link points back to the legacy contract route', () => {
  assert.doesNotMatch(source, /href\('contratar'\)/);
});

test('legacy Chip checkout initializers stay disabled even if stale markup returns', () => {
  assert.match(source, /const PURCHASE_FLOWS_ENABLED\s*=\s*false/);
  assert.match(source, /if\(PURCHASE_FLOWS_ENABLED&&page==='chip'&&document\.getElementById\('chipForm'\)\)/);
  assert.match(source, /if\(PURCHASE_FLOWS_ENABLED&&page==='chip'\)\{const chipForm=/);
  assert.match(source, /if\(PURCHASE_FLOWS_ENABLED&&page==='chip'\)document\.querySelectorAll\('\.chip-payment-panel/);
});

test('legacy cart and checkout handlers require the disabled purchase flag', () => {
  assert.match(source, /const initCart=\(\)=>\{if\(!PURCHASE_FLOWS_ENABLED\)return;/);
  assert.match(source, /if\(PURCHASE_FLOWS_ENABLED\)updateCartBadge\(\)/);
  assert.match(source, /if\(PURCHASE_FLOWS_ENABLED\)document\.querySelectorAll\('\.add-plan'\)/);
  assert.match(source, /const configForm=PURCHASE_FLOWS_ENABLED\?document\.getElementById\('contractForm'\):null/);
  assert.match(source, /if\(PURCHASE_FLOWS_ENABLED\)document\.querySelectorAll\('#contractForm \.option'\)/);
  assert.match(source, /if\(PURCHASE_FLOWS_ENABLED&&checkoutForm\)checkoutForm\.addEventListener/);
  assert.match(source, /if\(PURCHASE_FLOWS_ENABLED&&\(page==='carrinho'\|\|page==='checkout'\)\)initCart\(\)/);
});

test('campaign attribution values must be safe, bounded identifiers', () => {
  const match = source.match(/const cleanCampaignValue=([^;]+);/);
  assert.ok(match, 'campaign value validator is present');
  const clean = runInNewContext(`(${match[1]})`);
  assert.equal(clean('google_ads'), 'google_ads');
  assert.equal(clean('network-campaign-2026'), 'network-campaign-2026');
  assert.equal(clean('buyer@example.com'), '');
  assert.equal(clean('1234567890'), '');
  assert.equal(clean('term with spaces'), '');
  assert.equal(clean('x'.repeat(257)), '');
});

test('purchase entry points use a single handoff builder', () => {
  assert.match(source, /const purchaseHref\s*=/);
});

test('all HTML entrypoints request the cache-busted site script', () => {
  const collectHtml = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectHtml(path) : entry.name.endsWith('.html') ? [path] : [];
  });
  const scriptEntrypoints = collectHtml(repoRoot).filter(path => readFileSync(path, 'utf8').includes('assets/js/site.js'));
  assert.ok(scriptEntrypoints.length > 0, 'HTML entrypoints reference the shared script');
  const staleEntrypoints = scriptEntrypoints.filter(path => !/assets\/js\/site\.js\?v=20261103-53/.test(readFileSync(path, 'utf8')));
  assert.deepEqual(staleEntrypoints, []);
});

test('legacy checkout routes render the purchase transition page', () => {
  for (const route of ['compras', 'contratar', 'carrinho', 'checkout']) {
    assert.match(source, new RegExp(`${route}:purchaseTransition`));
  }
});

test('site navigation no longer exposes a browser cart', () => {
  const start = source.indexOf('const header=()=>');
  const end = source.indexOf('const footer=()=>', start);
  assert.ok(start >= 0 && end > start, 'header template is present');
  const header = source.slice(start, end);
  assert.doesNotMatch(header, />Comprar(?: agora)?/);
  assert.match(header, /Página de Compras/);
  assert.doesNotMatch(header, /class="cart-link"|data-cart-count/);
});

test('Chip purchase form is removed before any interaction handlers run', () => {
  const pageRender = source.indexOf("document.getElementById('site').innerHTML");
  const deactivate = source.indexOf('deactivateChipPurchaseSurface');
  const handlers = source.indexOf('// interactions');
  assert.ok(pageRender >= 0 && deactivate > pageRender && handlers > deactivate);
  assert.match(source, /deactivateChipPurchaseSurface\(\)/);
});

test('Chip landing copy is informational and does not expose unverified prices', () => {
  const start = source.indexOf('const consumerMobilePage=()=>');
  const end = source.indexOf('/* Active route boundary:', start);
  const template = source.slice(start, end);
  const checkoutMarkup = template.indexOf('<section class="section consumer-checkout">');
  const marketing = template.slice(0, checkoutMarkup);
  assert.ok(start >= 0 && end > start && checkoutMarkup > 0, 'Chip landing template is present');
  assert.doesNotMatch(marketing, /peça agora|Escolha seu plano|informe seus dados/i);
  assert.doesNotMatch(marketing, /data-price=|consumer-price">R\$ \$\{p\[1\]/);
  assert.doesNotMatch(source, /A partir de R\$ 34,99\/mês|Contrate online em poucos passos|faça seu pedido online/i);
  assert.match(source, /Valores e condições sob consulta/);
  assert.match(source, /Confira os benefícios de cada franquia/);
});

test('shared footer directs to contact instead of promising an immediate order', () => {
  const start = source.indexOf('const footer=()=>');
  const end = source.indexOf('const floatCards=()=>', start);
  const footer = source.slice(start, end);
  assert.ok(start >= 0 && end > start, 'footer template is present');
  assert.doesNotMatch(footer, /Contratação rápida|receba sua solicitação|Começar contratação/);
  assert.match(footer, /Fale com um especialista/);
  assert.match(footer, /href="\$\{href\('contato'\)\}"/);
});

test('general contact form remains available independently of checkout', () => {
  assert.match(source, /getElementById\('contactForm'\)/);
  assert.match(source, /Contato preparado/);
});
