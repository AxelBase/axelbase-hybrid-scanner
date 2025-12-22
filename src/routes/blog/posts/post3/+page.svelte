<!-- blog/posts/post3/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Designing Secure Hybrid Codes | AxelBase Blog</title>
  <meta name="description" content="Best practices for creating reliable and secure hybrid QR-barcode pairs using the AxelBase system." />
  <meta property="og:title" content="Designing Secure Hybrid Codes | AxelBase Blog" />
  <meta property="og:description" content="Best practices for creating reliable and secure hybrid QR-barcode pairs using the AxelBase system." />
  <meta property="og:url" content="{base}/blog/posts/post3" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Designing Secure Hybrid Codes</p>
  </div>

  <article class="prose">
    <h1>Designing Secure Hybrid Codes</h1>
   
    <p class="post-meta">Published: December 15, 2025</p>
   
    <p>Creating effective hybrid codes requires attention to both security and scannability. The AxelBase system gives significant flexibility, but following established guidelines ensures reliable decryption while maintaining strong protection.</p>
   
    <p>The most important principle is balanced ciphertext splitting. The QR code should carry the salt plus approximately half the Base64-encoded ciphertext, leaving the remainder for the barcode. This distribution maximizes security while keeping both codes within practical size limits.</p>
   
    <p>QR codes benefit from higher error correction levels when possible. Using level H allows recovery from up to thirty percent damage, ideal for real-world printing and handling. The data density should remain moderate to support scanning from typical distances.</p>
   
    <h2>Physical Layout Recommendations</h2>
    <p>Position matters during scanning. The barcode performs best when placed horizontally in the lower portion of the document, matching the scanner's optimized detection zone. Keeping both codes visible in a single camera view simplifies the user experience.</p>
   
    <h3>Best Practices</h3>
    <ul>
      <li>Use high contrast black-on-white printing</li>
      <li>Maintain minimum quiet zones around codes</li>
      <li>Avoid reflective or glossy surfaces</li>
      <li>Test print quality before distribution</li>
    </ul>
   
    <h3>Content Considerations</h3>
    <p>Message length affects code size. Shorter secrets result in smaller, more reliable codes. When longer data is needed, consider compression before encryption or splitting across multiple hybrid pairs with clear labeling.</p>
   
    <p>Labeling helps users understand the dual requirement. Including small text indicators such as "Scan both codes together" near the pair reduces confusion during use.</p>
   
    <h2>FAQ</h2>
    <details>
      <summary>How far apart can the codes be?</summary>
      <p>They must fit within the camera frame simultaneously. Typical smartphone scanning works well up to fifty centimeters when codes are on the same page.</p>
    </details>
    <details>
      <summary>Can multiple hybrid pairs appear on one document?</summary>
      <p>Yes, but ensure clear visual separation and instructions to avoid cross-scanning different pairs.</p>
    </details>
    <details>
      <summary>Should I add checksums or identifiers?</summary>
      <p>The encryption already includes integrity through padding validation. Additional identifiers can help users match correct pairs.</p>
    </details>
   
    <p class="italic-note">Thoughtful design combines technical security with practical usability for real-world deployment.</p>
  </article>
</div>

<style>
  /* Same styles as previous posts */
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

  .prose h1, .prose h2, .prose h3 {
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

  .prose details {
    background: var(--secondary-bg);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 1rem;
    margin-bottom: 1rem;
    transition: background-color 0.2s ease;
  }

  .prose details[open] {
    background-color: var(--card-bg);
  }

  .prose summary {
    cursor: pointer;
    font-weight: 600;
    color: var(--accent-secondary);
    list-style: none;
  }

  .prose summary::-webkit-details-marker {
    display: none;
  }

  .prose summary::before {
    content: '+';
    margin-right: 0.75rem;
    color: var(--accent-primary);
    font-weight: bold;
    display: inline-block;
    transition: transform 0.2s ease;
  }

  .prose details[open] summary::before {
    transform: rotate(45deg);
  }

  .prose details p {
    margin-top: 1rem;
    padding-left: 1.5rem;
    border-left: 2px solid var(--accent-primary);
    color: var(--text-secondary);
  }

  .prose .italic-note {
    font-style: italic;
    color: var(--text-secondary);
    text-align: center;
    margin-top: 3rem;
  }
</style>