<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { fade, slide } from 'svelte/transition';

  const paypalUsername = 'AxelLab427'; 
  const donationAmounts = [1, 3, 5, 10];
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
        <button class="btn btn-coffee d-flex align-items-center gap-2" on:click={toggleDropdown}>
          <i class="bi bi-cup-hot-fill"></i>
          <span class="d-none d-md-inline">Coffee</span>
        </button>
        {#if isDropdownOpen}
          <div class="dropdown-custom glass p-2" transition:slide>
            {#each donationAmounts as amount}
              <a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" on:click={closeDropdown} class="donation-item">
                ${amount}
              </a>
            {/each}
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
    <span class="opacity-75">© {new Date().getFullYear()} AxelBase QR+Barcode Hybrid Scanner</span>
    <div class="d-flex gap-3">
      <a href="{base}/privacy" class="text-decoration-none opacity-75 hover-orange">Privacy</a>
      <a href="{base}/terms" class="text-decoration-none opacity-75 hover-orange">Terms</a>
    </div>
  </div>
</footer>

<style>
  .btn-coffee { background: #ffdd00; color: #000; border-radius: 50px; font-weight: 700; border: none; padding: 6px 16px; transition: 0.3s; }
  .btn-coffee:hover { transform: translateY(-2px) rotate(3deg); background: #ffe54c; }
  
  .dropdown-custom { position: absolute; top: 120%; left: 0; min-width: 100px; border-radius: 15px; display: flex; flex-direction: column; gap: 5px; }
  .donation-item { padding: 8px; text-align: center; color: var(--color-text-main); text-decoration: none; border-radius: 10px; font-weight: bold; }
  .donation-item:hover { background: var(--primary-orange); color: white; }

  .btn-theme-toggle { border: none; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .sun-icon { transition: 0.5s; }
  .moon-icon { position: absolute; top: 50px; transition: 0.5s; }
  
  :global([data-bs-theme="dark"]) .sun-icon { transform: translateY(-50px); }
  :global([data-bs-theme="dark"]) .moon-icon { top: 8px; }

  .hover-orange:hover { color: var(--primary-orange) !important; opacity: 1 !important; }
</style>