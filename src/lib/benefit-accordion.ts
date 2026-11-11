// CAMBIO INSESO 2026-10-13 R3: mejora progresiva y enlaces que abren su respuesta al navegar.
export function bindBenefitAccordions(root: Document = document) {
 root.querySelectorAll<HTMLElement>('.benefit-faq').forEach(faq => {
  if (faq.dataset.bound) return;
  faq.dataset.bound = 'true';
  faq.querySelectorAll<HTMLButtonElement>('[data-faq-action]').forEach(button => button.addEventListener('click', () => {
   faq.querySelectorAll<HTMLDetailsElement>('details.faq-item').forEach(item => item.open = button.dataset.faqAction === 'open');
  }));
 });
 const openHash = () => {
  const id = root.defaultView?.location.hash.slice(1);
  if (!id) return;
  const item = root.getElementById(id);
  if (item?.matches('details.faq-item')) (item as HTMLDetailsElement).open = true;
 };
 openHash();
 // Una sola escucha para todas las fichas de esta página.
 if (!root.documentElement.dataset.faqHashBound) {
  root.documentElement.dataset.faqHashBound = 'true';
  root.defaultView?.addEventListener('hashchange', openHash);
 }
}
