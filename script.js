// Progressive enhancement: all content and navigation work without JavaScript.
document.querySelectorAll('[data-sort]').forEach(select => {
  const section = select.closest('section');
  const list = section.querySelector('[data-archive]');
  const status = section.querySelector('[data-sort-status]');
  if (!list) return;
  select.closest('label').hidden = false;
  section.querySelector('.sort-fallback')?.setAttribute('hidden', '');
  select.value = 'newest';
  select.addEventListener('change', () => {
    const direction = select.value === 'oldest' ? 1 : -1;
    const items = [...list.children].sort((a,b) => direction * a.dataset.date.localeCompare(b.dataset.date));
    list.append(...items);
    if (status) status.textContent = `Showing ${items.length} entries, ${select.value === 'oldest' ? 'oldest' : 'newest'} first.`;
  });
});
document.querySelectorAll('.pdf-panel').forEach(panel => {
  panel.addEventListener('toggle', () => {
    if (!panel.open) return;
    const container = panel.querySelector('[data-pdf]');
    if (!container || container.querySelector('iframe')) return;
    const frame = document.createElement('iframe');
    frame.src = container.dataset.pdf;
    frame.title = 'Deep Reinforcement Learning in AWS DeepRacer — original report';
    container.replaceChildren(frame);
  });
});
