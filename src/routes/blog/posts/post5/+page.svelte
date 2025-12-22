<!-- blog/posts/post5/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Batch Scanning Workflow Guide | AxelBase Blog</title>
  <meta name="description" content="Learn how to efficiently process multiple hybrid codes in one session using batch mode in the AxelBase scanner." />
  <meta property="og:title" content="Batch Scanning Workflow Guide | AxelBase Blog" />
  <meta property="og:description" content="Learn how to efficiently process multiple hybrid codes in one session using batch mode in the AxelBase scanner." />
  <meta property="og:url" content="{base}/blog/posts/post5" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a>
    <span>/</span>
    <p>Batch Scanning Workflow Guide</p>
  </div>

  <article class="prose">
    <h1>Batch Scanning Workflow Guide</h1>
   
    <p class="post-meta">Published: December 24, 2025</p>
   
    <p>The AxelBase Hybrid Scanner includes a powerful batch mode designed for situations where multiple hybrid codes need to be processed efficiently. This feature allows users to decrypt several secrets in sequence without restarting the scanning process each time.</p>
   
    <p>When batch mode is enabled, the scanner collects all successfully decrypted messages in a list rather than replacing the previous result. Users can set a target number of scans, and the system will automatically pause once that count is reached, preventing accidental over-scanning.</p>
   
    <p>The workflow begins with activating batch mode and optionally specifying the desired number of items. Scanning then proceeds normally: each valid hybrid pair presented to the camera adds its decrypted secret to the growing collection. Progress is visible in real time.</p>
   
    <h2>Effective Batch Strategies</h2>
    <p>Preparation is key for smooth batch operations. Organizing physical documents in sequence reduces handling time between scans. Good lighting and consistent camera distance help maintain reliable detection throughout the session.</p>
   
    <h3>Practical Tips</h3>
    <ul>
      <li>Set realistic target counts based on document volume</li>
      <li>Use export features mid-session if needed</li>
      <li>Pause and resume without losing collected results</li>
      <li>Review all items before final export</li>
    </ul>
   
    <h3>Mid-Session Management</h3>
    <p>Even before reaching the target or completing the batch, users can copy individual results or export the entire current collection as a text file. This flexibility supports workflows where partial results need immediate use or verification.</p>
   
    <p>Batch mode maintains the same high security standards as single scanning, with all decryption occurring locally and no data transmitted externally.</p>
   
    <h2>FAQ</h2>
    <details>
      <summary>Does batch mode affect scanning speed?</summary>
      <p>No. Detection and decryption performance remains identical to single mode.</p>
    </details>
    <details>
      <summary>Can I change the target count during scanning?</summary>
      <p>Yes. Adjusting the target updates the auto-stop behavior immediately.</p>
    </details>
    <details>
      <summary>What happens if I scan the same code twice?</summary>
      <p>Duplicate identical codes are ignored to prevent repeated entries.</p>
    </details>
   
    <p class="italic-note">Batch mode transforms the hybrid scanner into an efficient tool for processing volume while preserving security and privacy.</p>
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