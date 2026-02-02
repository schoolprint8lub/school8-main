---
title: "Прозорість та відкритість"
description: "Інформація про прозорість діяльності Української класичної гімназії."
layout: "layouts/page.njk"
bodyClass: "inner-page"
blocks:
  - type: links_block
    heading: ""
    links:
      - icon: "📜"
        title: "Статутні документи закладу"
        url: "/documents/"
        external: false
      - icon: "📊"
        title: "Звіти директора гімназії  (Натисніть для вибору)"
        url: "#reports-modal-trigger"
        external: false
      - icon: "🎓"
        title: "Атестація педагогічних працівників"
        url: "/atestacia/"
        external: false
      - icon: "🔍"
        title: "Самоаналіз діяльності"
        url: "/samoanaliz/"
        external: false
---

<div class="modal-overlay" id="reportsModal">
    <div class="modal-window">
        <span class="close-modal" id="closeModal" style="position: absolute; top: 10px; right: 15px; font-size: 24px; cursor: pointer; color: #888;">&times;</span>
        <h3 class="modal-title">Оберіть рік звіту</h3>
        <a href="/assets/docs/zvit2025.pdf" class="btn" style="display: block; margin: 10px auto; width: 80%;">2025 рік</a>
        <a href="/assets/docs/zvit2024.pdf" class="btn" style="display: block; margin: 10px auto; width: 80%;">2024 рік</a>
        <a href="/assets/docs/zvit2023.pdf" class="btn" style="display: block; margin: 10px auto; width: 80%;">2023 рік</a>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('reportsModal');
    // Find link by href since we can't add ID
    const openBtn = document.querySelector('a[href="#reports-modal-trigger"]');
    const closeBtn = document.getElementById('closeModal');
    
    if(openBtn && modal) {
        openBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            modal.classList.add('open'); 
        });
    }
    
    if(closeBtn && modal) {
        closeBtn.addEventListener('click', () => { 
            modal.classList.remove('open'); 
        });
    }
    
    if(modal) {
        modal.addEventListener('click', (e) => { 
            if (e.target === modal) modal.classList.remove('open'); 
        });
    }
});
</script>
