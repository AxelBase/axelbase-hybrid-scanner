<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { fade, slide, fly } from 'svelte/transition';

  const currentYear = new Date().getFullYear();
  let isDropdownOpen = false;

  function toggleDropdown() { isDropdownOpen = !isDropdownOpen; }
  function closeDropdown() { isDropdownOpen = false; }

  function toggleTheme() {
    const current = document.body.dataset.bsTheme;
    document.body.dataset.bsTheme = current === 'dark' ? 'light' : 'dark';
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() { document.removeEventListener('click', handleClick, true); }
    };
  }
</script>

<header class="fixed-top p-3 w-100" style="z-index: 1050;">
  <nav class="container glass rounded-pill px-4 py-2 d-flex justify-content-between align-items-center shadow-sm">
    
    <div class="d-flex align-items-center gap-3">
      <a href="{base}/" class="d-flex align-items-center gap-2 text-decoration-none hover-bounce">
        <img src="{base}/AxelLab-Logo.ico" alt="Logo" style="height: 32px;" />
        <span class="fw-bold fs-5 d-none d-sm-inline" style="color: var(--primary-orange);">AxelBase</span>
      </a>

      <div class="position-relative" use:clickOutside on:click_outside={closeDropdown}>
        <button
          class="btn-coffee d-flex align-items-center gap-2 px-3 py-2"
          on:click={toggleDropdown}
          aria-label="Support AxelBase"
        >
          <i class="bi bi-cup-hot-fill"></i>
          <span class="d-none d-md-inline fw-semibold">Buy me a Coffee</span>
        </button>

        {#if isDropdownOpen}
          <div 
            class="bmac-dropdown glass mt-2 p-2" 
            transition:fly={{ y: -8, duration: 220 }}
          >
            <a 
              href="https://buymeacoffee.com/axelbase" 
              target="_blank" 
              rel="noopener" 
              on:click={closeDropdown}
              class="donation-item"
            >
              <span class="amount">$3</span> Coffee
            </a>
            <a 
              href="https://buymeacoffee.com/axelbase" 
              target="_blank" 
              rel="noopener" 
              on:click={closeDropdown}
              class="donation-item"
            >
              <span class="amount">$5</span> Two Coffees
            </a>
            <a 
              href="https://buymeacoffee.com/axelbase" 
              target="_blank" 
              rel="noopener" 
              on:click={closeDropdown}
              class="donation-item"
            >
              <span class="amount">$10</span> Big Coffee
            </a>

            <a 
              href="https://buymeacoffee.com/axelbase" 
              target="_blank" 
              rel="noopener" 
              on:click={closeDropdown}
              class="donation-item custom-amount"
            >
              Custom Amount
            </a>

            <a 
              href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
              target="_blank"
              on:click={closeDropdown}
              class="donation-item custom-amount bitcoin-item"
            >
              Bitcoin / Crypto
            </a>
          </div>
        {/if}
      </div>

      <button class="btn-theme-toggle glass" on:click={toggleTheme} aria-label="Toggle Theme">
        <i class="bi bi-brightness-high-fill sun-icon"></i>
        <i class="bi bi-moon-stars-fill moon-icon"></i>
      </button>
    </div>

    <ul class="nav d-none d-lg-flex align-items-center gap-2 m-0">
      <li><a class="nav-link-custom" href="{base}/">Home</a></li>
      <li><a class="nav-link-custom" href="{base}/#about">About</a></li>
      <li><a class="nav-link-custom" href="{base}/#how-to">How to use</a></li>
      <li><a class="nav-link-custom" href="{base}/#faq">FAQ</a></li>
      <li><a class="btn btn-pearl ms-2" href="{base}/blog">Blog</a></li>
    </ul>
  </nav>
</header>

<main style="padding-top: 100px; padding-bottom: 80px;">
  <slot />
</main>

<footer class="releative glass border-top py-2">
  <div class="container d-flex flex-column flex-sm-row justify-content-between align-items-center small">
    <span class="opacity-75">© {currentYear} AxelBase QR+Barcode Hybrid Scanner</span>
    <div class="d-flex gap-3">
      <a href="{base}/privacy" class="text-decoration-none opacity-75 hover-orange">Privacy</a>
      <a href="{base}/terms" class="text-decoration-none opacity-75 hover-orange">Terms</a>
    </div>
  </div>
</footer>

<style>
  .btn-coffee {
    background: #ffdd00;
    color: #000;
    border-radius: 50px;
    font-weight: 700;
    border: none;
    padding: 8px 18px;
    transition: all 0.28s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }

  .btn-coffee:hover {
    transform: translateY(-2px) rotate(2deg);
    background: #ffe54c;
    box-shadow: 0 5px 14px rgba(255,221,0,0.45);
  }

  .bmac-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 240px;
    border-radius: 16px;
    overflow: hidden;
    z-index: 1000;
  }

  .donation-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 18px;
    color: var(--color-text-main);
    text-decoration: none;
    font-size: 0.96rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .donation-item:hover {
    background: var(--primary-orange);
    color: white;
    padding-left: 24px;
  }

  .amount {
    font-weight: 800;
    color: var(--primary-orange);
    font-size: 1.15rem;
  }

  .custom-amount {
    font-weight: 700;
    color: var(--primary-orange);
    justify-content: center !important;
    border-top: 1px solid rgba(195,88,49,0.18);
    margin-top: 4px;
    padding-top: 12px !important;
  }

  .bitcoin-item {
    color: #f7931a !important;
    font-weight: 700;
  }

  .bitcoin-item:hover {
    background: #f7931a !important;
    color: white !important;
  }

  .btn-theme-toggle {
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .sun-icon { transition: 0.5s; }
  .moon-icon { 
    position: absolute; 
    top: 50px; 
    transition: 0.5s; 
  }

  :global([data-bs-theme="dark"]) .sun-icon { transform: translateY(-50px); }
  :global([data-bs-theme="dark"]) .moon-icon { top: 8px; }

  .hover-orange:hover { 
    color: var(--primary-orange) !important; 
    opacity: 1 !important; 
  }
</style>