import './style.css';

let appState = {
  isLoggedIn: false,
  hasPaid: false,
  uploadedFile: null,
};

// ─── Landing Page ──────────────────────────────────────────────────────────

const landingHTML = () => `
<div class="landing-page view-enter">

  <!-- Hero -->
  <section class="hero-section">
    <div class="hero-content">
      <p class="hero-badge">Powered by AI – Based on Federal Sentencing Guidelines</p>
      <h1>AI-Powered PSR Analysis<br>in Minutes.</h1>
      <p class="hero-sub">The Presentence Investigation Report (PSR) is your sentencing roadmap. Don't wait days for traditional consulting. Instantly extract data, calculate your 1–29 security designation, and generate your official PDF statement.</p>
      <button class="btn btn-primary btn-lg" id="hero-cta-btn">Start Your PSR Analysis</button>
    </div>
  </section>

  <!-- Why It Matters -->
  <section class="features-section" id="psr-risk">
    <div class="section-inner">
      <h2 class="section-title">Why Your PSR Determines Your Future.</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">📋</div>
          <h3>The Permanent Record</h3>
          <p>The PSR follows an inmate throughout incarceration. Inaccuracies in Part A (Offense Conduct) can permanently alter housing and programming. You have a 14-day window to object under Rule 32—speed is critical.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Security &amp; Placement</h3>
          <p>Your report dictates your 1–29 score. Inflammatory language can jump you from a Minimum to a Medium or High-security facility. Our AI flags these Public Safety Factors (PSFs) instantly.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⏱️</div>
          <h3>Time Off Your Sentence</h3>
          <p>The PSR determines eligibility for the Residential Drug Abuse Program (RDAP), which can reduce a sentence by up to 12 months. Know where you stand before the ink dries.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="process-section" id="how-it-works">
    <div class="section-inner">
      <h2 class="section-title">How It Works</h2>
      <div class="process-steps">
        <div class="process-step">
          <div class="step-number">1</div>
          <h3>Secure Upload</h3>
          <p>Create an account and securely upload your 50+ page draft PSR.</p>
        </div>
        <div class="process-connector"></div>
        <div class="process-step">
          <div class="step-number">2</div>
          <h3>AI Extraction</h3>
          <p>Our proprietary engine structures the data, analyzes the narrative, and calculates your Inmate Load and Security Designation.</p>
        </div>
        <div class="process-connector"></div>
        <div class="process-step">
          <div class="step-number">3</div>
          <h3>Instant Delivery</h3>
          <p>Unlock your official, ready-to-print PDF declaration in minutes.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section class="pricing-section" id="pricing">
    <div class="section-inner">
      <h2 class="section-title">Flat-Rate Expert Analysis.</h2>
      <div class="glass-panel pricing-card">
        <div class="pricing-price">$1,000</div>
        <div class="pricing-per">per PSR file</div>
        <ul class="pricing-features">
          <li>Complete AI Text Extraction &amp; Data Structuring</li>
          <li>1–29 Security Designation Score Calculation</li>
          <li>Identification of Public Safety Factors (PSFs)</li>
          <li>Downloadable "Inmate Load and Security Designation" PDF</li>
        </ul>
        <button class="btn btn-primary btn-lg" id="pricing-cta-btn">Upload Your PSR Now</button>
        <p class="pricing-note">Only pay when your file has been successfully processed.</p>
      </div>
    </div>
  </section>

</div>
`;

// ─── Modal Views ────────────────────────────────────────────────────────────

const modalViews = {
  login: () => `
    <div class="auth-form view-enter">
      <h2 style="text-align:center; margin-bottom:0.5rem;">Create an Account or Sign In</h2>
      <p style="text-align:center; color:var(--text-muted); font-size:0.9rem; margin-bottom:0.5rem;">Start your PSR analysis in seconds.</p>
      <div class="input-group">
        <label>Email Address</label>
        <input type="email" placeholder="name@example.com" value="user@example.com">
      </div>
      <div class="input-group">
        <label>Password</label>
        <input type="password" value="password123">
      </div>
      <button class="btn btn-primary" id="login-btn" style="margin-top:0.5rem;">Continue →</button>
    </div>
  `,

  upload: () => `
    <div class="view-enter" style="display:flex; flex-direction:column; align-items:center;">
      <h2 style="margin-bottom:2rem;">Upload Your PSR Document</h2>
      <div class="upload-zone" id="drop-zone">
        <div class="upload-icon">📄</div>
        <h3>Drag &amp; Drop your PSR here</h3>
        <p style="color:var(--text-muted); margin-top:0.5rem; margin-bottom:1.5rem;">PDF format · Up to 200MB</p>
        <button class="btn btn-outline" id="browse-btn">Browse Files</button>
      </div>
    </div>
  `,

  processing: () => `
    <div class="processing-container view-enter">
      <div class="spinner"></div>
      <h2 style="margin-bottom:0.5rem;">AI Extraction in Progress</h2>
      <p style="color:var(--text-muted); font-size:0.9rem;">This typically takes 60–90 seconds.</p>
      <div class="log-terminal" id="terminal">
        <div class="log-line">> Initiating secure container...</div>
      </div>
    </div>
  `,

  results: () => `
    <div class="results-wrapper view-enter">
      <h2 style="margin-bottom:1.5rem; border-bottom:1px solid var(--glass-border); padding-bottom:1rem;">Extraction Results</h2>

      <div class="results-grid">
        <div class="data-card">
          <div class="data-label">Defendant Name</div>
          <div class="data-value">John A. Doe</div>
        </div>
        <div class="data-card">
          <div class="data-label">Document Type</div>
          <div class="data-value">Draft PSR</div>
        </div>
        <div class="data-card">
          <div class="data-label">Confidence Score</div>
          <div class="data-value" style="color:var(--accent);">97.8%</div>
        </div>
      </div>

      <div class="results-grid ${!appState.hasPaid ? 'blurred' : ''}">
        <div class="data-card">
          <div class="data-label">Security Score</div>
          <div class="data-value">14 / 29</div>
        </div>
        <div class="data-card">
          <div class="data-label">Designation Level</div>
          <div class="data-value">Medium</div>
        </div>
        <div class="data-card">
          <div class="data-label">Public Safety Factors</div>
          <div class="data-value" style="color:var(--danger);">2 Flagged</div>
        </div>
        <div class="data-card">
          <div class="data-label">RDAP Eligibility</div>
          <div class="data-value" style="color:var(--accent);">Eligible</div>
        </div>
      </div>

      ${!appState.hasPaid ? `
        <div class="paywall-overlay">
          <div class="paywall-box">
            <h3 style="margin-bottom:0.5rem;">Full Report Locked</h3>
            <p style="color:var(--text-muted); margin-bottom:1.5rem; font-size:0.875rem;">Unlock your complete security designation analysis and downloadable PDF for $1,000.</p>
            <button class="btn btn-primary" id="unlock-btn">Unlock Full Report – $1,000</button>
          </div>
        </div>
      ` : `
        <div style="margin-top:1.5rem; text-align:center;">
          <button class="btn btn-primary btn-lg" id="download-btn">⬇ Download PDF Report</button>
        </div>
      `}
    </div>
  `,

  payment: () => `
    <div class="view-enter">
      <div class="stripe-mock">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
          <h2>Pay with card</h2>
          <div style="font-size:1.5rem; font-weight:700; color:#1a1f36;">$1,000</div>
        </div>
        <div class="input-group" style="margin-bottom:1rem;">
          <label style="color:#666;">Email</label>
          <input type="email" class="stripe-input" value="user@example.com">
        </div>
        <div class="input-group" style="margin-bottom:1.5rem;">
          <label style="color:#666;">Card Information</label>
          <input type="text" class="stripe-input" placeholder="1234 5678 9101 1121" style="border-bottom-left-radius:0; border-bottom-right-radius:0;">
          <div style="display:flex;">
            <input type="text" class="stripe-input" placeholder="MM/YY" style="border-top:none; border-right:none; border-radius:0 0 0 6px; width:50%;">
            <input type="text" class="stripe-input" placeholder="CVC" style="border-top:none; border-radius:0 0 6px 0; width:50%;">
          </div>
        </div>
        <button class="stripe-btn" id="pay-btn">Pay $1,000</button>
        <p style="color:#999; font-size:0.75rem; margin-top:1rem; text-align:center;">Only charged after successful document processing.</p>
      </div>
    </div>
  `,
};

// ─── Modal Controls ──────────────────────────────────────────────────────────

const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');

function openModal(viewName) {
  modalOverlay.classList.remove('hidden');
  renderModalView(viewName);
}

function closeModal() {
  modalOverlay.classList.add('hidden');
  modalContent.innerHTML = '';
}

function renderModalView(viewName) {
  modalContent.innerHTML = modalViews[viewName]();
  attachModalListeners(viewName);
}

function attachModalListeners(viewName) {
  if (viewName === 'login') {
    document.getElementById('login-btn').addEventListener('click', () => {
      appState.isLoggedIn = true;
      renderModalView('upload');
    });
  }

  if (viewName === 'upload') {
    const dropZone = document.getElementById('drop-zone');

    document.getElementById('browse-btn').addEventListener('click', () => {
      handleUpload({ name: 'psr_draft_doe_john.pdf' });
    });

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      handleUpload({ name: e.dataTransfer.files[0]?.name || 'psr_draft_doe_john.pdf' });
    });
  }

  if (viewName === 'processing') {
    simulateProcessing();
  }

  if (viewName === 'results') {
    document.getElementById('unlock-btn')?.addEventListener('click', () => renderModalView('payment'));
    document.getElementById('download-btn')?.addEventListener('click', closeModal);
  }

  if (viewName === 'payment') {
    document.getElementById('pay-btn').addEventListener('click', () => {
      const btn = document.getElementById('pay-btn');
      btn.innerText = 'Processing...';
      btn.style.opacity = '0.7';
      setTimeout(() => {
        appState.hasPaid = true;
        renderModalView('results');
      }, 1500);
    });
  }
}

function handleUpload(file) {
  appState.uploadedFile = file.name;
  renderModalView('processing');
}

function simulateProcessing() {
  const terminal = document.getElementById('terminal');
  const logs = [
    `> Uploaded ${appState.uploadedFile || 'psr_draft.pdf'}...`,
    `> Scanning document structure (${Math.floor(Math.random() * 30) + 50} pages detected)...`,
    `> OCR Engine initializing (Engine v2.4-turbo)...`,
    `> Extracting Part A: Offense Conduct narrative...`,
    `> Calculating security scoring variables (1–29 scale)...`,
    `> Checking Public Safety Factors (PSFs)...`,
    `> Evaluating RDAP eligibility markers...`,
    `> Processing complete. Formulating results...`,
  ];

  let step = 0;
  const interval = setInterval(() => {
    if (step < logs.length) {
      const line = document.createElement('div');
      line.className = 'log-line';
      line.innerText = logs[step];
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
      step++;
    } else {
      clearInterval(interval);
      setTimeout(() => renderModalView('results'), 800);
    }
  }, 600);
}

// ─── Header & Landing Listeners ──────────────────────────────────────────────

function triggerAuthFlow() {
  openModal(appState.isLoggedIn ? 'upload' : 'login');
}

document.getElementById('header-cta-btn').addEventListener('click', triggerAuthFlow);
document.getElementById('sign-in-btn').addEventListener('click', () => openModal('login'));
document.getElementById('modal-close-btn').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// ─── Initialize ───────────────────────────────────────────────────────────────

const viewContainer = document.getElementById('view-container');
viewContainer.innerHTML = landingHTML();

document.getElementById('hero-cta-btn').addEventListener('click', triggerAuthFlow);
document.getElementById('pricing-cta-btn').addEventListener('click', triggerAuthFlow);
