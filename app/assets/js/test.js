/*const spawn = require('child_process').spawn;

var remote = require('electron').remote;
const appPath = remote.app.getAppPath();
class Test {
  call() {

    console.log();

    var php = appPath + '/thirdparty/php/php.exe'
    var parameter = ['-S', 'localhost:8000', '-t', appPath + '/documentRoot'];

    var process = spawn(php, parameter);
    this._output(process);
  }

  _output(obj) {
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

}
 */