import './style.css';

// State Management
let appState = {
  isLoggedIn: false,
  hasPaid: false,
  uploadedFile: null,
};

// View Templates
const views = {
  landing: () => `
    <div class="glass-panel landing-content view-enter">
      <h1>Unlock Hidden Insights<br>in Your Data</h1>
      <p>Our proprietary AI engine extracts structured financial data from unstructured documents in seconds. Experience enterprise-grade accuracy without the overhead.</p>
      <button class="btn btn-primary" id="start-btn">Start Free Analysis</button>
    </div>
  `,
  
  login: () => `
    <div class="glass-panel view-enter">
      <div class="auth-form">
        <h2 style="text-align:center; margin-bottom:1rem;">Welcome Back</h2>
        <div class="input-group">
          <label>Email Address</label>
          <input type="email" placeholder="name@company.com" value="user@example.com">
        </div>
        <div class="input-group">
          <label>Password</label>
          <input type="password" value="password123">
        </div>
        <button class="btn btn-primary" id="login-btn" style="margin-top:1rem;">Sign In to Continue</button>
      </div>
    </div>
  `,

  upload: () => `
    <div class="glass-panel view-enter" style="width: 100%; max-width: 800px; display:flex; flex-direction:column; align-items:center;">
      <h2 style="margin-bottom:2rem;">Upload Financial Document</h2>
      <div class="upload-zone" id="drop-zone">
        <div class="upload-icon">📄</div>
        <h3>Drag & Drop your document here</h3>
        <p style="color: var(--text-muted); margin-top:0.5rem; margin-bottom: 1.5rem;">Supports PDF, CSV, XLSX (Max 50MB)</p>
        <button class="btn btn-outline" id="browse-btn">Browse Files</button>
        <input type="file" id="file-input" class="hidden" accept=".pdf,.csv,.xlsx">
      </div>
    </div>
  `,

  processing: () => `
    <div class="glass-panel view-enter processing-container">
      <div class="spinner"></div>
      <h2 style="margin-bottom:1.5rem;">AI Extraction in Progress</h2>
      <div class="log-terminal" id="terminal">
        <div class="log-line">> Initiating secure container...</div>
      </div>
    </div>
  `,

  results: () => `
    <div class="glass-panel view-enter" style="width:100%; max-width:1000px; position:relative;">
      <h2 style="margin-bottom:2rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 1rem;">Extraction Results</h2>
      
      <div class="results-grid">
        <div class="data-card">
          <div class="data-label">Entity Name</div>
          <div class="data-value">ACME Corp LLC</div>
        </div>
        <div class="data-card">
          <div class="data-label">Document Type</div>
          <div class="data-value">1040 Schedule C</div>
        </div>
        <div class="data-card">
          <div class="data-label">Confidence Score</div>
          <div class="data-value" style="color: var(--accent);">98.4%</div>
        </div>
      </div>

      <div class="results-grid ${!appState.hasPaid ? 'blurred' : ''}">
        <div class="data-card">
          <div class="data-label">Gross Revenue</div>
          <div class="data-value">$1,245,000.00</div>
        </div>
        <div class="data-card">
          <div class="data-label">Net Profit</div>
          <div class="data-value">$342,150.00</div>
        </div>
        <div class="data-card">
          <div class="data-label">Tax Liability</div>
          <div class="data-value">$84,050.00</div>
        </div>
        <div class="data-card">
          <div class="data-label">Detected Anomalies</div>
          <div class="data-value" style="color: var(--danger);">2 Found</div>
        </div>
      </div>

      ${!appState.hasPaid ? `
        <div class="paywall-overlay">
          <div class="paywall-box">
            <h3 style="margin-bottom:0.5rem;">Premium Data Locked</h3>
            <p style="color:var(--text-muted); margin-bottom:1.5rem; font-size:0.875rem;">Unlock the full financial analysis report for $14.99</p>
            <button class="btn btn-primary" id="unlock-btn">Unlock Full Report</button>
          </div>
        </div>
      ` : ''}
    </div>
  `,

  payment: () => `
    <div class="view-enter" style="display:flex; justify-content:center; width:100%;">
      <div class="stripe-mock">
        <div style="display:flex; justify-content:space-between; margin-bottom: 2rem;">
          <h2>Pay with card</h2>
          <div style="font-size:1.5rem; font-weight:bold; color:#1a1f36;">$14.99</div>
        </div>
        <div class="input-group" style="margin-bottom:1rem;">
          <label style="color:#666;">Email</label>
          <input type="email" class="stripe-input" value="user@example.com">
        </div>
        <div class="input-group" style="margin-bottom:1.5rem;">
          <label style="color:#666;">Card Information</label>
          <input type="text" class="stripe-input" placeholder="1234 5678 9101 1121" style="margin-bottom:0; border-bottom-left-radius:0; border-bottom-right-radius:0;">
          <div style="display:flex;">
            <input type="text" class="stripe-input" placeholder="MM/YY" style="border-top:none; border-right:none; border-top-left-radius:0; border-bottom-right-radius:0; margin-bottom:0; width:50%;">
            <input type="text" class="stripe-input" placeholder="CVC" style="border-top:none; border-top-right-radius:0; border-bottom-left-radius:0; margin-bottom:0; width:50%;">
          </div>
        </div>
        <button class="stripe-btn" id="pay-btn">Pay $14.99</button>
      </div>
    </div>
  `
};

// View Renderer
const container = document.getElementById('view-container');

function renderView(viewName) {
  // Add exit animation to current child if exists
  if (container.firstElementChild) {
    container.firstElementChild.classList.remove('view-enter');
    container.firstElementChild.classList.add('view-exit');
    setTimeout(() => {
      container.innerHTML = views[viewName]();
      attachEventListeners(viewName);
    }, 300);
  } else {
    container.innerHTML = views[viewName]();
    attachEventListeners(viewName);
  }
}

// Event Listeners for Views
function attachEventListeners(viewName) {
  if (viewName === 'landing') {
    document.getElementById('start-btn').addEventListener('click', () => {
      renderView(appState.isLoggedIn ? 'upload' : 'login');
    });
  }

  if (viewName === 'login') {
    document.getElementById('login-btn').addEventListener('click', () => {
      appState.isLoggedIn = true;
      renderView('upload');
    });
  }

  if (viewName === 'upload') {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');

    browseBtn.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) handleUpload(e.target.files[0]);
    });

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) handleUpload(e.dataTransfer.files[0]);
    });
  }

  if (viewName === 'processing') {
    simulateProcessing();
  }

  if (viewName === 'results') {
    const unlockBtn = document.getElementById('unlock-btn');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', () => renderView('payment'));
    }
  }

  if (viewName === 'payment') {
    document.getElementById('pay-btn').addEventListener('click', () => {
      const btn = document.getElementById('pay-btn');
      btn.innerText = "Processing...";
      btn.style.opacity = "0.7";
      setTimeout(() => {
        appState.hasPaid = true;
        renderView('results');
      }, 1500);
    });
  }
}

// Helper Functions
function handleUpload(file) {
  appState.uploadedFile = file.name;
  renderView('processing');
}

function simulateProcessing() {
  const terminal = document.getElementById('terminal');
  const logs = [
    `> Uploaded ${appState.uploadedFile || 'document.pdf'}...`,
    `> Scanning document for structural boundaries...`,
    `> OCR Engine initializing (Engine v2.4-turbo)...`,
    `> Extracted 4 pages of financial tables.`,
    `> Mapping entities to schema (1040 Schedule C)...`,
    `> Applying heuristics for anomaly detection...`,
    `> Processing complete. Formulating results...`
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
      setTimeout(() => renderView('results'), 800);
    }
  }, 600); // Add a new log every 600ms
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderView('landing');
});
