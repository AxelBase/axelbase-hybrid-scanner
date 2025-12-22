<!-- blog/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    { href: '/blog/posts/post1', title: 'Understanding Hybrid QR-Barcode Encryption', description: 'Deep dive into how the hybrid system combines QR and barcode data for secure, split-secret transmission.' },
    { href: '/blog/posts/post2', title: 'AES-CBC with PBKDF2: Security Behind the Scanner', description: 'Technical breakdown of the encryption scheme, key derivation, and why local decryption ensures privacy.' },
    { href: '/blog/posts/post3', title: 'Designing Secure Hybrid Codes', description: 'Best practices for generating robust hybrid QR + Code128 pairs that resist scanning errors and attacks.' },
    { href: '/blog/posts/post4', title: 'Why Local Processing Matters', description: 'Exploring zero-knowledge decryption: no data leaves your device, no servers involved.' },
    { href: '/blog/posts/post5', title: 'Batch Scanning Workflow Guide', description: 'How to efficiently process multiple hybrid codes in one session with automatic target stopping.' },
    { href: '/blog/posts/post6', title: 'Optimizing Detection in Real-World Conditions', description: 'Tips for lighting, distance, angle, and camera settings to improve scan reliability.' },
    { href: '/blog/posts/post7', title: 'Exporting and Managing Decrypted Secrets', description: 'Using copy-all and download features securely in single and batch modes.' },
  ];
</script>

<svelte:head>
  <title>Blog | AxelBase Hybrid Scanner</title>
  <meta name="description" content="Technical insights, security analysis, and usage guides for the AxelBase Hybrid QR-Barcode Scanner." />
</svelte:head>

<div class="container fade-in blog-index">
  <header class="blog-header">
    <h1><i class="bi bi-journal-richtext"></i> Blog: AxelBase Hybrid Scanner</h1>
    <p class="subtitle">
      In-depth technical articles, security explanations, and practical guides for using the privacy-first hybrid QR and barcode decryption tool.
    </p>
  </header>

  <div class="posts-grid">
    {#each posts as post}
      <a href="{base}{post.href}" class="card post-card">
        <div class="card-body">
          <h2 class="post-title">{post.title}</h2>
          <p class="post-description">{post.description}</p>
          <span class="read-more">Read Article &rarr;</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-index {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 2rem;
  }

  .blog-header h1 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .post-card {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s ease;
  }

  .post-card:hover {
    transform: translateY(-5px);
  }

  .post-card .card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .post-title {
    font-size: 1.25rem;
    color: var(--primary-orange);
    margin-bottom: 0.75rem;
  }

  .post-description {
    color: var(--text-secondary);
    flex-grow: 1;
    margin-bottom: 1rem;
  }

  .read-more {
    color: var(--primary-orange);
    font-weight: 600;
    align-self: flex-start;
    transition: transform 0.2s ease;
  }

  .post-card:hover .read-more {
    transform: translateX(8px);
  }
</style>