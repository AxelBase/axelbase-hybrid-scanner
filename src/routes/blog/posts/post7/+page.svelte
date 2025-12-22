<!-- blog/posts/post7/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Exporting and Managing Decrypted Secrets | AxelBase Blog</title>
  <meta name="description" content="Guidance on securely copying and downloading decrypted results from single and batch scans using the AxelBase tool." />
  <meta property="og:title" content="Exporting and Managing Decrypted Secrets | AxelBase Blog" />
  <meta property="og:description" content="Guidance on securely copying and downloading decrypted results from single and batch scans using the AxelBase tool." />
  <meta property="og:url" content="{base}/blog/posts/post7" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Exporting and Managing Decrypted Secrets</p>
  </div>

  <article class="prose">
    <h1>Exporting and Managing Decrypted Secrets</h1>
   
    <p class="post-meta">Published: December 30, 2025</p>
   
    <p>After successful decryption, the AxelBase Hybrid Scanner provides multiple secure options for handling results. Whether working with single scans or batch collections, users can copy individual items or export everything with ease while maintaining control over sensitive data.</p>
   
    <p>Each decrypted secret appears with dedicated controls. The copy button transfers the specific result to the device clipboard for immediate use, while the download option saves it as a plain text file. File names follow a clear pattern to support organization.</p>
   
    <p>In batch mode with multiple results, additional collective actions become available. Users can copy all current secrets as a single block or download the entire collection in one text file, perfect for importing into other systems or archiving.</p>
   
    <h2>Secure Handling Practices</h2>
    <p>Since decryption occurs locally, exported data remains under user control from the moment it is created. Text files contain only the plaintext results without additional metadata, minimizing exposure.</p>
   
    <h3>Export Options</h3>
    <ul>
      <li>Individual copy for quick pasting</li>
      <li>Individual download as numbered text file</li>
      <li>Batch copy all to clipboard</li>
      <li>Batch download all as single file</li>
    </ul>
   
    <h3>Best Practices After Export</h3>
    <p>Once results are exported, consider clearing the browser session if working in shared environments. The scanner does not persist data between sessions, providing automatic cleanup when the page is closed.</p>
   
    <p>For sensitive workflows, users can export immediately after each successful scan or wait until the complete batch finishes, depending on operational needs. The flexibility supports various security postures.</p>
   
    <h2>FAQ</h2>
    <details>
      <summary>Are exported files encrypted?</summary>
      <p>No. They contain plaintext results. Users should apply additional protection if storing long-term.</p>
    </details>
    <details>
      <summary>Can I export during active scanning?</summary>
      <p>Yes. All export functions work at any time once results are available.</p>
    </details>
    <details>
      <summary>What format are downloaded files?</summary>
      <p>Standard plain text with UTF-8 encoding, one secret per line in batch exports.</p>
    </details>
   
    <p class="italic-note">Flexible export options combined with local processing give users complete control over sensitive data handling.</p>
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