"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const gitIgnoreFile = '.gitignore';
function getDirectories(srcPath, ignorePatterns) {
    const directories = [];
    function readDirRecursive(currentPath) {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);
            if (entry.isDirectory()) {
                if (ignorePatterns.some(pattern => fullPath.includes(pattern))) {
                    continue;
                }
                if (entry.name.startsWith('.')) {
                    continue;
                }
                directories.push(fullPath);
                readDirRecursive(fullPath);
            }
        }
    }
    readDirRecursive(srcPath);
    return directories;
}
function getIgnoredPatterns(gitIgnorePath) {
    if (!fs.existsSync(gitIgnorePath)) {
        return [];
    }
    const ignoreFileContent = fs.readFileSync(gitIgnorePath, 'utf-8');
    return ignoreFileContent.split('\n').filter(line => line && !line.startsWith('#'));
}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (workspaceFolder) {
        const ignorePatterns = getIgnoredPatterns(path.join(workspaceFolder, gitIgnoreFile));
        const directories = getDirectories(workspaceFolder, ignorePatterns);
        console.log("Directories in project directory:");
        directories.forEach((dir) => {
            console.log(`- ${dir}`);
        });
    }
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('dogumenter.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from dogumenter!');
    });
    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map