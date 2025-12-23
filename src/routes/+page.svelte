<script>
  import { onMount } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { initScanner, startScanning, stopScanning } from '$lib/ScannerCore.js';

  let video = null;
  let canvas = null;
  let batchResults = [];
  let batchMode = false;
  let batchCount = 5;
  let autoDetect = false;
  let cameraActive = false;
  let cameraError = null;
  let showStoppedMessage = false;
  let scanning = false;

  onMount(() => {
    window.addEventListener('secretFound', (e) => {
      batchResults = e.detail.batchResults;
    });

    window.addEventListener('scanningStopped', () => {
      scanning = false;
      showStoppedMessage = true;
      setTimeout(() => showStoppedMessage = false, 3000);
    });
  });

  async function enableCamera() {
    try {
      if (!video) throw new Error('Video element not mounted');

      cameraError = null;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      video.srcObject = stream;
      await video.play();
      initScanner(video, canvas);
      cameraActive = true;

      if (autoDetect) {
        startScanning(batchMode, batchCount);
        scanning = true;
      }
    } catch (err) {
      cameraActive = false;
      scanning = false;
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        cameraError = 'Camera access denied. Please allow permission.';
      } else {
        cameraError = 'Camera error: ' + (err.message || 'Unknown');
      }
    }
  }

  function disableCamera() {
    if (video && video.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    }
    stopScanning();
    scanning = false;
    cameraActive = false;
  }

  function toggleScanning() {
    if (scanning) {
      stopScanning();
      scanning = false;
    } else {
      startScanning(batchMode, batchCount);
      scanning = true;
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert('Copied!');
  }

  function downloadTxt(content, filename = 'scan_result.txt') {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function copyAll() {
    const allText = batchResults.join('\n');
    copyToClipboard(allText);
  }

  function downloadAll() {
    const allText = batchResults.join('\n');
    downloadTxt(allText, 'batch_results.txt');
  }

  $: if (autoDetect && cameraActive && !scanning) {
    startScanning(batchMode, batchCount);
    scanning = true;
  }
</script>

<svelte:head>
  <title>AxelBase Hybrid Scanner – Privacy-First QR & Barcode Decryption</title>
  <meta name="description" content="Decrypt sensitive data split across QR codes and barcodes directly in your browser. Zero server upload, full local processing, batch support, and secure export options." />
  <meta name="keywords" content="hybrid scanner, QR barcode decryption, privacy first scanner, local decryption, secure code scanning, split secret encryption" />
  <meta name="robots" content="index, follow" />
  
  <meta property="og:title" content="AxelBase Hybrid Scanner – Privacy-First QR & Barcode Decryption" />
  <meta property="og:description" content="Securely decrypt hybrid QR-barcode pairs locally in your browser. No data leaves your device." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://axelbase.github.io/axelbase-hybrid-scanner/" />
  <meta property="og:image" content="https://axelbase.github.io/axelbase-hybrid-scanner/og-image.jpg" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="AxelBase Hybrid Scanner – Privacy-First QR & Barcode Decryption" />
  <meta name="twitter:description" content="Decrypt sensitive data split across QR codes and barcodes directly in your browser." />
  <meta name="twitter:image" content="https://axelbase.github.io/axelbase-hybrid-scanner/og-image.jpg" />
  
  <link rel="canonical" href="https://axelbase.github.io/axelbase-hybrid-scanner/" />
</svelte:head>

<div class="container py-4">
  <section class="row justify-content-center mb-5" in:fade={{ duration: 1000 }}>
    <div class="col-lg-8 text-center">
      <h1 class="display-5 fw-bold mb-3" style="color: var(--primary-orange);">Hybrid Scanner</h1>
      <p class="lead opacity-75 mb-4">Professional decryption for secure hybrid QR and Barcodes.</p>
      
      <div class="glass-card glass p-3 position-relative overflow-hidden" in:fly={{ y: 30, delay: 300 }}>
        <video
          bind:this={video}
          playsinline
          muted
          class="w-100 rounded-4 shadow-sm"
          style="background: #000; min-height: 300px; {cameraActive ? '' : 'display: none;'}"
        ></video>
        <canvas bind:this={canvas} class="d-none"></canvas>

        {#if cameraError}
          <div class="alert alert-danger rounded-4 p-4 mb-4">
            <strong>Camera Error:</strong> {cameraError}
            <button class="btn btn-pearl mt-3" on:click={enableCamera}>Retry</button>
          </div>
        {:else if !cameraActive}
          <div class="text-center py-5">
            <div class="fs-1 mb-4 opacity-50">📷</div>
            <h4>Camera Required</h4>
            <p class="lead opacity-75">Enable camera to start scanning</p>
            <button class="btn btn-pearl btn-lg px-5" on:click={enableCamera}>Enable Camera</button>
          </div>
        {/if}

        {#if cameraActive}
          <div class="mt-4 d-flex flex-wrap justify-content-center gap-3">
            <button class="btn btn-pearl px-4" on:click={toggleScanning}>
              <i class="bi bi-{scanning ? 'pause' : 'play'}-fill me-1"></i>
              {scanning ? 'Pause Scanning' : 'Start Scanning'}
            </button>
            <button class="btn btn-outline-secondary rounded-pill px-4" on:click={stopScanning} disabled={!scanning}>
              Stop
            </button>
            <button class="btn btn-outline-danger rounded-pill px-4" on:click={disableCamera}>
              Disable Camera
            </button>
          </div>

          <div class="mt-4 d-flex flex-wrap justify-content-center gap-4 align-items-center">
            <label class="form-check-label glass px-4 py-2 rounded-pill shadow-sm" style="cursor: pointer;">
              <input type="checkbox" bind:checked={autoDetect} class="form-check-input me-2" />
              Auto Detection
            </label>
            <label class="form-check-label glass px-4 py-2 rounded-pill shadow-sm" style="cursor: pointer;">
              <input type="checkbox" bind:checked={batchMode} class="form-check-input me-2" />
              Batch Mode
            </label>
            {#if batchMode}
              <div class="d-flex align-items-center gap-2">
                <span class="text-muted small">Target:</span>
                <input type="number" bind:value={batchCount} min="1" max="100" class="form-control rounded-pill" style="width: 80px;" />
              </div>
            {/if}
          </div>
        {/if}
      </div>

      {#if showStoppedMessage}
        <div class="alert alert-info mt-4 rounded-4 p-3 shadow" in:slide>
          Scanning has stopped.
        </div>
      {/if}

      {#if batchResults.length > 0}
        <div class="alert glass mt-4 rounded-4 p-4 shadow" in:slide>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span class="badge bg-success rounded-pill">Success</span>
              <strong class="ms-2">
                {batchMode ? `Batch Results (${batchResults.length}${batchCount > 0 ? '/' + batchCount : ''})` : 'Latest Result'}
              </strong>
            </div>
            {#if batchMode && batchResults.length > 1}
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-pearl" on:click={copyAll}>Copy All</button>
                <button class="btn btn-sm btn-pearl" on:click={downloadAll}>Download All</button>
              </div>
            {/if}
          </div>

          {#each batchResults as secret, index}
            <div class="d-flex justify-content-between align-items-center py-2 border-bottom border-opacity-25">
              <code class="fw-bold text-break">{secret}</code>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-pearl" on:click={() => copyToClipboard(secret)}>Copy</button>
                <button class="btn btn-sm btn-pearl" on:click={() => downloadTxt(secret, `scan_${index + 1}.txt`)}>Download</button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>

<section id="about" class="py-5 mt-5 border-top border-opacity-10">
  <div class="glass-card glass p-5">
    <h2 class="fw-bold mb-4">About AxelBase Hybrid Scanner</h2>
    <p>The AxelBase Hybrid Scanner is a privacy-first, open web tool designed to decrypt sensitive information that has been securely split across two physical codes: a QR code and a linear barcode (Code 128). Unlike traditional single-code systems that place all encrypted data in one scannable element, this hybrid approach deliberately fragments the ciphertext, ensuring that capturing or copying only one code reveals nothing meaningful.</p>
    
    <p>Developed with security and privacy at its core, the scanner performs all cryptographic operations entirely within your browser. Using industry-standard AES-CBC encryption strengthened by PBKDF2 key derivation, the tool reconstructs and decrypts the secret only when both codes are simultaneously visible to the camera. A unique random salt—embedded in the QR code—serves both as the initialization vector and key-strengthening input, guaranteeing that identical messages produce completely different hybrid pairs every time.</p>
    
    <p>This split-secret design provides powerful real-world protection. Even if one code is photographed, shared, or duplicated, the information remains inaccessible without its counterpart. The requirement for physical co-presence of both codes acts as a natural access control mechanism, making the system ideal for exchanging credentials, medical data, financial instructions, legal documents, or any sensitive content that demands high confidentiality during transfer.</p>
    
    <p>AxelBase prioritizes user privacy above all. No camera footage, decrypted results, or usage data ever leave your device. The application uses trusted open-source libraries—CryptoJS for cryptography, jsQR for QR detection, and ZXing for barcode reading—executed exclusively client-side. There are no servers involved in processing, no analytics tracking, and no cookies or persistent storage. Once you close the tab, all temporary memory is cleared.</p>
    
    <p>The tool supports both single and batch scanning workflows. In single mode, each new valid pair instantly replaces the previous result, perfect for quick, sequential reads. Batch mode collects multiple secrets in a list, with optional target counts and auto-stop functionality, while allowing mid-session copy-all or download-all exports. Individual results can always be copied to clipboard or saved as plain text files.</p>
    
    <p>Built for reliability in everyday conditions, the scanner optimizes barcode detection in the lower half of the frame and applies grayscale conversion for better contrast. It works offline after initial load and requires only temporary camera permission, which users can revoke at any time.</p>
    
    <p>AxelBase Hybrid Scanner bridges modern cryptographic strength with practical physical security, offering a trustworthy solution for anyone needing to transmit confidential data through printed or displayed codes without compromising privacy or depending on network connectivity.</p>
  </div>
</section>

<section id="how-to" class="py-5 border-top border-opacity-10">
  <div class="container">
    <h2 class="fw-bold mb-5 text-center">How to Use the AxelBase Hybrid Scanner</h2>
    
    <div class="glass-card glass p-5 mb-5">
      <p>Getting started with the Hybrid Scanner is straightforward and secure. Follow these steps for optimal results:</p>
      
      <p><strong>Step 1: Enable Camera Access</strong><br>
      On first use, click the large "Enable Camera" button. Your browser will request permission to access the camera—grant it for the current session only. The tool uses your rear camera by default for better reach and focus. You can disable access anytime via the dedicated button or browser settings.</p>
      
      <p><strong>Step 2: Choose Your Mode</strong><br>
      Before scanning, decide between single and batch mode. Single mode (default) displays the latest decrypted secret, replacing previous results—ideal for sequential one-off scans. Enable "Batch Mode" when you need to collect multiple secrets in one session. When active, you can set a target count; the scanner will automatically pause once reached, preventing accidental extra scans.</p>
      
      <p><strong>Step 3: Position the Hybrid Codes</strong><br>
      Hold your device approximately 30–50 cm away from the document. Ensure both the QR code and barcode are fully visible within the camera frame simultaneously. The scanner restricts barcode detection to the lower half of the view for improved reliability. Keep the codes horizontal, well-lit with diffused light, and free from glare or shadows. Matte surfaces work best.</p>
      
      <p><strong>Step 4: Scan and Verify</strong><br>
      Once both codes are detected and decrypted successfully, the secret appears instantly below the video feed with a green success indicator. In single mode, new valid pairs replace the previous result. In batch mode, each new secret is added to the growing list with individual copy/download buttons.</p>
      
      <p><strong>Step 5: Export Results Securely</strong><br>
      Every result offers immediate "Copy" and "Download" options. In batch mode with multiple items, additional "Copy All" and "Download All" buttons appear at the top, exporting everything as a single plain-text file or combined clipboard entry. Files are named clearly for easy organization.</p>
      
      <p><strong>Step 6: End Session Safely</strong><br>
      When finished, click "Disable Camera" to revoke access and clear the video feed. Close the tab for complete memory cleanup. No data persists between sessions.</p>
      
      <p><strong>Tips for Best Performance</strong><br>
      Use even, indirect lighting; avoid direct sunlight or strong reflections. Hold the device steady and parallel to the surface. Test with a sample pair first if working in challenging environments. Enable "Auto Detection" if you want scanning to begin immediately after camera activation.</p>
      
      <p>The entire process—from camera access to final export—happens locally on your device, ensuring complete privacy throughout.</p>
    </div>
    
    <div class="row g-4 text-center mt-4">
      <div class="col-md-4" in:fly={{ y: 20, delay: 200 }}>
        <div class="glass-card glass p-4 h-100">
          <div class="fs-1 mb-2">📸</div>
          <h5>Aim Camera</h5>
          <p class="small opacity-75">Position both QR and barcode clearly in frame.</p>
        </div>
      </div>
      <div class="col-md-4" in:fly={{ y: 20, delay: 400 }}>
        <div class="glass-card glass p-4 h-100">
          <div class="fs-1 mb-2">⚡</div>
          <h5>Instant Decode</h5>
          <p class="small opacity-75">Local decryption happens in milliseconds.</p>
        </div>
      </div>
      <div class="col-md-4" in:fly={{ y: 20, delay: 600 }}>
        <div class="glass-card glass p-4 h-100">
          <div class="fs-1 mb-2">🔒</div>
          <h5>Secure Result</h5>
          <p class="small opacity-75">Copy or download safely—no data leaves your device.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="faq" class="py-5 mb-5 border-top border-opacity-10">
  <div class="container">
    <h2 class="fw-bold mb-4 text-center">Frequently Asked Questions</h2>
    
    <div class="accordion accordion-flush glass p-3 rounded-4" id="faqAccordion">
      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button bg-transparent fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#f1">
            Is any data uploaded to a server?
          </button>
        </h2>
        <div id="f1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body opacity-75">
            No. All scanning, detection, and decryption occur entirely within your browser. Camera frames, decrypted secrets, and usage activity never leave your device or contact any external server.
          </div>
        </div>
      </div>
      
      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button bg-transparent fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#f2">
            Why must both codes be visible at once?
          </button>
        </h2>
        <div id="f2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body opacity-75">
            Security design requires physical co-presence. The encrypted payload is split: QR holds salt + first ciphertext portion; barcode holds the rest. Neither alone contains usable data, preventing compromise from partial capture.
          </div>
        </div>
      </div>
      
      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button bg-transparent fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#f3">
            How secure is the encryption?
          </button>
        </h2>
        <div id="f3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body opacity-75">
            The tool uses AES-128-CBC with PKCS7 padding and PBKDF2-SHA1 (1000 iterations) key derivation. Each hybrid pair employs a unique random salt, ensuring strong protection suitable for sensitive but non-classified data.
          </div>
        </div>
      </div>
      
      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button bg-transparent fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#f4">
            Does batch mode change security?
          </button>
        </h2>
        <div id="f4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body opacity-75">
            No. Every individual decryption follows the same local, zero-knowledge process. Batch mode only collects results in memory for convenience and export.
          </div>
        </div>
      </div>
      
      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button bg-transparent fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#f5">
            Can I use this offline?
          </button>
        </h2>
        <div id="f5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body opacity-75">
            Yes. After initial page load, the scanner works completely offline. No internet connection is required for scanning or decryption.
          </div>
        </div>
      </div>
      
      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button bg-transparent fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#f6">
            What are best practices for reliable scanning?
          </button>
        </h2>
        <div id="f6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body opacity-75">
            Use even diffused lighting, hold 30–50 cm away, keep codes horizontal and fully framed, avoid glossy surfaces and direct reflections, and ensure good contrast between codes and background.
          </div>
        </div>
      </div>
      
      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button bg-transparent fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#f7">
            Are exported files safe to store?
          </button>
        </h2>
        <div id="f7" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body opacity-75">
            Exported files contain only plaintext secrets. Treat them as sensitive and apply additional protection (encryption, secure storage) according to your needs.
          </div>
        </div>
      </div>
      
      <div class="accordion-item bg-transparent">
        <h2 class="accordion-header">
          <button class="accordion-button bg-transparent fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#f8">
            Why choose hybrid over single QR codes?
          </button>
        </h2>
        <div id="f8" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body opacity-75">
            Hybrid adds physical security through split-secret design. Intercepting one code yields nothing, while single QR codes risk full exposure if photographed or shared.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</div>