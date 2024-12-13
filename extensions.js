const vscode = require('vscode');

function activate(context) {
  console.log("File List Extension activated!");

  // Get the current workspace folder (project directory)
  const workspaceFolder = vscode.workspace.rootPath;

  // Use glob.sync to get a list of files in the project directory
  const filePattern = '**/*';
  const files = require('glob').sync(filePattern, { cwd: workspaceFolder });

  // Print the list of files to console
  console.log("Files in project directory:");
  files.forEach((file) => {
    console.log(`- ${file}`);
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};