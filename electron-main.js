const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

let mainWindow;
let nextProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    show: false // Don't show until loaded
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function checkServerReady(url, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          clearInterval(interval);
          resolve();
        }
      }).on('error', () => {
        if (Date.now() - startTime > timeout) {
          clearInterval(interval);
          reject(new Error('Server timeout'));
        }
      });
    }, 1000);
  });
}

app.on('ready', async () => {
  const isDev = process.env.NODE_ENV === 'development';
  const nextPath = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');
  
  // Choose 'dev' or 'start' based on NODE_ENV
  const command = isDev ? 'dev' : 'start';

  nextProcess = spawn('node', [nextPath, command], {
    cwd: __dirname,
    env: { ...process.env, PORT: 3000 }
  });

  nextProcess.stdout.on('data', (data) => {
    console.log(`next: ${data}`);
  });

  nextProcess.stderr.on('data', (data) => {
    console.error(`next error: ${data}`);
  });

  try {
    await checkServerReady('http://localhost:3000');
    createWindow();
  } catch (error) {
    console.error('Failed to start Next.js server:', error);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (nextProcess) {
    nextProcess.kill();
  }
});
