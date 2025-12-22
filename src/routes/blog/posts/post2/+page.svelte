<!-- blog/posts/post2/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>AES-CBC with PBKDF2: Security Behind the Scanner | AxelBase Blog</title>
  <meta name="description" content="Technical breakdown of the encryption algorithm and key derivation process used in the AxelBase Hybrid Scanner." />
  <meta property="og:title" content="AES-CBC with PBKDF2: Security Behind the Scanner | AxelBase Blog" />
  <meta property="og:description" content="Technical breakdown of the encryption algorithm and key derivation process used in the AxelBase Hybrid Scanner." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>AES-CBC with PBKDF2: Security Behind the Scanner</p>
  </div>

  <article class="prose">
    <h1>AES-CBC with PBKDF2: Security Behind the Scanner</h1>
   
    <p class="post-meta">Published: December 12, 2025</p>
   
    <p>The AxelBase Hybrid Scanner relies on proven cryptographic standards to protect sensitive data. At its core is AES encryption operating in CBC mode, combined with PBKDF2 key derivation, delivering robust security entirely within the user's browser.</p>
   
    <p>When a message is prepared for hybrid transmission, it first undergoes encryption using the Advanced Encryption Standard with a 128-bit key. CBC mode ensures that identical plaintext blocks produce different ciphertext, preventing pattern analysis. The initialization vector is derived directly from a 16-byte random salt included in the QR code.</p>
   
    <p>The key itself is not stored or transmitted. Instead, a fixed master key is strengthened using PBKDF2 with 1000 iterations of SHA-1 hashing, salted by the same random value. This process transforms the master key into a unique session key for each hybrid pair, making brute-force attacks significantly harder.</p>
   
    <h2>How the Cryptographic Process Works</h2>
    <p>During decryption, the scanner reconstructs the full ciphertext by concatenating the partial data from the QR code and barcode. It then applies the same PBKDF2 derivation using the recovered salt and master key to regenerate the session key. AES decryption follows, using the salt as IV and PKCS7 padding removal to reveal the original plaintext.</p>
   
    <h3>Security Advantages</h3>
    <ul>
      <li>Industry-standard AES encryption</li>
      <li>Unique key per message via salt</li>
      <li>No key exchange required</li>
      <li>Full process runs locally in browser</li>
    </ul>
   
    <h3>Privacy by Design</h3>
    <p>Because decryption occurs entirely on the user's device using CryptoJS, no data ever leaves the browser. This eliminates risks associated with server-side processing, ensuring complete end-to-end privacy even in untrusted environments.</p>
   
    <h2>FAQ</h2>
    <details>
      <summary>Why use 1000 PBKDF2 iterations?</summary>
      <p>This provides adequate protection against brute-force attacks while maintaining fast decryption on modern devices.</p>
    </details>
    <details>
      <summary>Is AES-CBC still considered secure?</summary>
      <p>Yes, when properly implemented with unique IVs and padding oracle mitigation, which this system achieves through salt reuse as IV.</p>
    </details>
    <details>
      <summary>Could quantum computing break this?</summary>
      <p>AES-128 remains resistant to known quantum attacks via Grover's algorithm, offering decades of projected security.</p>
    </details>
   
    <p class="italic-note">Strong cryptography combined with physical code separation creates defense in depth for sensitive data transfer.</p>
  </article>
</div>

<style>
  /* Same styles as post1 */
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