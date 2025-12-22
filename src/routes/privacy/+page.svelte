<!-- privacy/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | AxelBase Hybrid Scanner</title>
  <meta name="description" content="The AxelBase Hybrid Scanner processes all data locally in your browser with no collection, storage, or transmission of personal information." />
  <meta property="og:title" content="Privacy Policy | AxelBase Hybrid Scanner" />
  <meta property="og:description" content="The AxelBase Hybrid Scanner processes all data locally in your browser with no collection, storage, or transmission of personal information." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>

    <p class="post-meta">Effective Date: December 22, 2025</p>

    <h2>1. Introduction</h2>
    <p>Welcome to the <strong>AxelBase Hybrid Scanner</strong>, a fully client-side web application provided by AxelBase ("we," "us," or "our"). This Privacy Policy explains our data practices for this privacy-focused tool that decrypts hybrid QR and barcode combinations directly in your browser. We prioritize your privacy through a <strong>zero-data-collection model</strong>. All scanning and decryption occur locally on your device, and <strong>no personal information is collected, stored, or shared</strong>. This policy provides full transparency about our approach.</p>

    <h2>2. No Data Collection</h2>
    <p>The Hybrid Scanner is engineered to operate without accessing or transmitting any user data. Specifically, we do not collect:</p>
    <ul>
      <li><strong>Personal identifiers</strong>: Names, email addresses, IP addresses, or device details.</li>
      <li><strong>Scanned content</strong>: Decrypted secrets, camera feeds, or any QR/barcode data remain exclusively on your device.</li>
      <li><strong>Usage metrics</strong>: No analytics, tracking pixels, cookies, or session logs are implemented.</li>
      <li><strong>Location or behavioral data</strong>: Nothing related to your browsing habits or geographic position.</li>
    </ul>
    <p>Since processing happens entirely client-side using libraries like CryptoJS, jsQR, and ZXing, your information never reaches our servers or third parties.</p>

    <h2>3. How the Scanner Operates</h2>
    <p>When using the AxelBase Hybrid Scanner:</p>
    <ul>
      <li><strong>Camera access</strong>: Granted temporarily for live scanning and revoked when you disable it or close the page.</li>
      <li><strong>Local computation</strong>: Encryption keys, salts, and decryption run in your browser's memory only.</li>
      <li><strong>Exports</strong>: Copy or download features use native browser functions without server involvement.</li>
    </ul>
    <p>Temporary data may reside in browser memory during use but clears automatically upon page refresh or closure. We implement no persistent storage mechanisms.</p>

    <h2>4. Third-Party Libraries</h2>
    <p>We utilize open-source libraries loaded via CDNs or bundled locally. These do not track users or send data back to their providers in this context.</p>

    <h2>5. Cookies and Tracking</h2>
    <p>The scanner uses <strong>no cookies</strong>, localStorage for persistence, or any tracking technologies. Sessions are completely stateless.</p>

    <h2>6. Security Considerations</h2>
    <p>While we collect nothing, users should:</p>
    <ul>
      <li>Use updated browsers on secure devices.</li>
      <li>Handle exported plaintext responsibly.</li>
      <li>Revoke camera permissions when finished.</li>
    </ul>

    <h2>7. Children's Privacy</h2>
    <p>This tool is not directed at children under 13, and we do not knowingly process their data.</p>

    <h2>8. International Compliance</h2>
    <p>Our no-collection model aligns with GDPR, CCPA, and similar laws by design.</p>

    <h2>9. Policy Updates</h2>
    <p>Changes will appear here with updated effective dates.</p>

    <h2>10. Contact</h2>
    <p>For questions, reach us via the contact section on our site.</p>

    <p class="italic-note">Your privacy is protected by design—<strong>nothing leaves your device</strong>.</p>
  </article>
</div>

<style>
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