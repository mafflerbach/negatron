const electron = require('electron');
const path = require('path');
const glob = require('glob');
const spawn = require('child_process').spawn;


const BrowserWindow = electron.BrowserWindow;
const app = electron.app;


if (process.mas) app.setName('negatron');

var mainWindow = null

function _output(obj) {
  obj.stdout.on('data', (data) => {
    var test = `${data}`;
    console.log(test);
  })
  ;

  obj.stderr.on('data', (data) => {
    var test = `${data}`;
    console.log(test);
  });

  obj.on('close', (code) => {
    var test = `${code}`;
    console.log(test);
  });
}

function initialize() {
  var shouldQuit = makeSingleInstance();
  if (shouldQuit) return app.quit();

  loadLibs();

  function createWindow() {
    var windowOptions = {
      width: 1000,
      minWidth: 1680,
      height: 1040,
      title: app.getName(),
      webPreferences: {
        nodeIntegration: true,
        webSecurity: true
      },
    };
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadURL('http://localhost:8000');
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
      mainWindow = null
    })
  }

  app.on('ready', function () {

    console.log(__dirname + '/documentRoot');

    var php = __dirname + '/thirdparty/php/php.exe'
    var parameter = ['-S', 'localhost:8000', '-t', __dirname + '/documentRoot'];
    var process = spawn(php, parameter);
    _output(process);


    createWindow();
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {

    if (mainWindow === null) {
      createWindow()
    }
  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
  if (process.mas) return false

  return app.makeSingleInstance(function () {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

// Require each JS file in the main-proces
function loadLibs() {
  var files = glob.sync(path.join(__dirname, 'assets/js/*.js'))
  files.forEach(function (file) {
    console.log(file);
    require(file)
  })
}


initialize();











