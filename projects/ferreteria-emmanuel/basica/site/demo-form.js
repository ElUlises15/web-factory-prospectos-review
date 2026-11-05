/* Local demo only. Never transmits or persists submitted values. */
(() => {
  document.querySelectorAll('[data-demo-form]').forEach(form => {
    const fields = ['name', 'email', 'message'];
    const status = form.querySelector('[data-status]');
    function error(field, text) {
      const input = form.elements.namedItem(field), box = form.querySelector(`[data-error-for="${field}"]`);
      if (box) box.textContent = text;
      if (input) { if (text) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid'); }
    }
    function validate(field) {
      const input = form.elements.namedItem(field), value = input ? input.value.trim() : '';
      let msg = !value ? 'Completá este campo.' : field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Ingresá un email válido.' : '';
      error(field, msg); return !msg;
    }
    fields.forEach(field => { const input = form.elements.namedItem(field); if (input) input.addEventListener('input', () => validate(field)); });
    form.addEventListener('submit', event => {
      event.preventDefault(); const valid = fields.map(validate).every(Boolean);
      if (!valid) { const first = fields.find(f => form.elements.namedItem(f)?.getAttribute('aria-invalid') === 'true'); if (first) form.elements.namedItem(first).focus(); if (status) status.textContent = 'Hay errores en: ' + fields.filter(f => form.elements.namedItem(f)?.getAttribute('aria-invalid') === 'true').map(f => form.querySelector(`[data-error-for=\"${f}\"]`)?.previousElementSibling?.textContent || f).join(', ') + '.'; return; }
      if (status) status.textContent = 'No se envió ningún dato: demo validada localmente, sin transmisión ni almacenamiento.';
      form.reset(); fields.forEach(f => error(f, ''));
    });
  });
})();
