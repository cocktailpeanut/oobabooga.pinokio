module.exports = async (kernel) => {
  const cmds = { "win32": "start_windows.bat", "linux": "bash start_linux.sh", "darwin": "bash start_macos.sh" };
  const gpus = {
    "nvidia": ["A", "N"],
    "amd": (kernel.platform === 'darwin' || kernel.platform === 'linux' ? "B" : "N"),
    "apple": "C",
    "ipex": "D",
    "none": "N"
  };
  const gpu = gpus[kernel.gpu] || "N"
  const cmd = cmds[kernel.platform]
  return {
    "run": [{
      "method": "shell.run",
      "params": { "message": "git clone https://github.com/oobabooga/text-generation-webui" }
    }, {
      "method": "shell.start",
      "params": { "path": "text-generation-webui" }
    }, {
      "method": "shell.enter",
      "params": {
        "message": cmd,
        "on": [{ "event": "/what is your gpu/gi", "return": true }]
      }
    }, {
      "method": "shell.enter",
      "params": {
        "message": gpu,
        "on": [{ "event": "/running on.*http.+/gi", "return": true }]
      }
    }, {
      "method": "input",
      "params": { "title": "Install Success", "description": "Go back to the dashboard and launch the app!" }
    }, {
      "method": "browser.open",
      "params": { "uri": "/?selected=text-generation-webui" }
    }]
  }
}
