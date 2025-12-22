<!-- terms/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms and Conditions | AxelBase Hybrid Scanner</title>
  <meta name="description" content="Terms governing use of the AxelBase Hybrid Scanner, a free client-side web tool for decrypting hybrid codes." />
  <meta property="og:title" content="Terms and Conditions | AxelBase Hybrid Scanner" />
  <meta property="og:description" content="Terms governing use of the AxelBase Hybrid Scanner, a free client-side web tool for decrypting hybrid codes." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Terms and Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms and Conditions</h1>

    <p class="post-meta">Effective Date: December 22, 2025</p>

    <h2>1. Acceptance of Terms</h2>
    <p>By accessing or using the <strong>AxelBase Hybrid Scanner</strong> ("the Tool"), a free web application provided by AxelBase ("we," "us," or "our"), you agree to these Terms and Conditions. If you disagree, please do not use the Tool.</p>

    <h2>2. Description of Service</h2>
    <p>The Tool is a client-side utility for decrypting hybrid QR and barcode combinations locally in your browser. It requires camera access for scanning and processes everything on your device without server interaction.</p>

    <h2>3. Use License</h2>
    <p>We grant you a limited, non-exclusive, non-transferable license to use the Tool for personal or internal purposes. You may not:</p>
    <ul>
      <li>Modify, reverse-engineer, or create derivatives.</li>
      <li>Use for unlawful activities or to decrypt unauthorized data.</li>
      <li>Distribute or resell the Tool.</li>
      <li>Overload or interfere with its operation.</li>
    </ul>

    <h2>4. No Warranties</h2>
    <p>The Tool is provided <strong>"as is"</strong> without warranties of any kind. We do not guarantee accuracy, completeness, or uninterrupted availability. Use at your own risk.</p>

    <h2>5. Limitation of Liability</h2>
    <p>To the fullest extent permitted by law, AxelBase shall not be liable for any damages arising from use of the Tool, including data loss, decryption errors, or security incidents.</p>

    <h2>6. Intellectual Property</h2>
    <p>The Tool's code, design, and branding are owned by AxelBase. You retain rights to your decrypted content.</p>

    <h2>7. Prohibited Activities</h2>
    <p>You agree not to use the Tool for illegal purposes, to infringe rights, or to attempt breaching its security features.</p>

    <h2>8. Termination</h2>
    <p>We may restrict access at any time without notice for violations.</p>

    <h2>9. Governing Law</h2>
    <p>These terms are governed by applicable laws where AxelBase operates.</p>

    <h2>10. Changes to Terms</h2>
    <p>We may update these terms periodically. Continued use constitutes acceptance.</p>

    <h2>11. Contact</h2>
    <p>For questions, use our site contact form.</p>

    <p class="italic-note">Thank you for using the AxelBase Hybrid Scanner responsibly.</p>
  </article>
</div>

<style>
  /* Same styles as privacy page */
  .post-layout {
    max-width: 800px;
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  .breadcrumbs a {
    color: var(--accent-secondary);
  }
  .breadcrumbs a:hover {
    text-decoration: underline;
  }
  .breadcrumbs p {
    margin: 0;
  }

  .prose {
    line-height: 1.8;
  }

  .prose .post-meta {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
  }

  .prose h1, .prose h2 {
    color: var(--accent-secondary);
  }

  .prose h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .prose h2 {
    margin-top: 2.5rem;
    border-bottom: 1px solid var(--secondary-bg);
    padding-bottom: 0.5rem;
  }

  .prose p {
    color: var(--text-primary);
  }

  .prose ul {
    list-style-type: '→ ';
    padding-left: 1.5rem;
    color: var(--text-primary);
  }
  .prose ul li::marker {
    color: var(--accent-primary);
  }
  .prose ul li {
    padding-left: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .prose .italic-note {
    font-style: italic;
    color: var(--text-secondary);
    text-align: center;
    margin-top: 3rem;
  }
</style>