<!-- blog/posts/post1/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Understanding Hybrid QR-Barcode Encryption | AxelBase Blog</title>
  <meta name="description" content="Learn how the AxelBase Hybrid Scanner splits sensitive data across QR codes and barcodes for enhanced security and privacy." />
  <meta property="og:title" content="Understanding Hybrid QR-Barcode Encryption | AxelBase Blog" />
  <meta property="og:description" content="Learn how the AxelBase Hybrid Scanner splits sensitive data across QR codes and barcodes for enhanced security and privacy." />
  <meta property="og:url" content="{base}/blog/posts/post1" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Understanding Hybrid QR-Barcode Encryption</p>
  </div>

  <article class="prose">
    <h1>Understanding Hybrid QR-Barcode Encryption</h1>
   
    <p class="post-meta">Published: December 10, 2025</p>
   
    <p>The AxelBase Hybrid Scanner represents a unique approach to secure data transmission by combining two distinct code types: QR codes and linear barcodes. Instead of storing sensitive information in a single scannable code, the system deliberately splits the encrypted payload across both mediums, ensuring that neither code alone contains usable data.</p>
   
    <p>This split-secret design begins with strong encryption of the original message using AES in CBC mode. A random salt is generated and used both as the initialization vector and for key strengthening through PBKDF2. The resulting ciphertext is then divided into two parts: the first segment is embedded in the QR code along with the salt, while the second segment is encoded into a Code 128 barcode.</p>
   
    <p>The physical separation creates a powerful security advantage. Even if someone photographs or copies one of the codes, they gain nothing meaningful without the other half. This makes casual interception or unauthorized duplication effectively useless.</p>
   
    <h2>Why This Design Improves Security</h2>
    <p>Traditional single-code systems concentrate all risk in one carrier. If a QR code containing private information is captured, the data may be compromised immediately. The hybrid method distributes risk across two independent visual elements that must be present simultaneously for successful decryption.</p>
   
    <h3>Key Security Benefits</h3>
    <ul>
      <li>Requires physical access to both codes at once</li>
      <li>No meaningful data revealed from partial capture</li>
      <li>Resistant to remote scanning attacks</li>
      <li>Maintains confidentiality even if one code is shared</li>
    </ul>
   
    <h3>Real-World Applications</h3>
    <p>This approach works well for secure document exchange, access credentials, medical records, financial instructions, or any scenario where sensitive information must be transferred physically with minimal risk. The dual-code requirement acts as a natural access control mechanism.</p>
   
    <h2>FAQ</h2>
    <details>
      <summary>Can the scanner work with only one code visible?</summary>
      <p>No. Both the QR code and barcode must be in the camera frame for decryption to occur. This is by design to preserve security.</p>
    </details>
    <details>
      <summary>Is the salt reused across multiple codes?</summary>
      <p>Each hybrid pair uses a unique random salt, ensuring that even identical messages produce completely different QR and barcode content.</p>
    </details>
    <details>
      <summary>What happens if one code is damaged?</summary>
      <p>If either code is unreadable, decryption fails completely, protecting the data from partial recovery attempts.</p>
    </details>
   
    <p class="italic-note">The hybrid encryption model prioritizes real-world security through deliberate fragmentation of encrypted data.</p>
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