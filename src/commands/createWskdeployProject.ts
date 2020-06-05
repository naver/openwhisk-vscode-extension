/**
 * Copyright 2020-present NAVER Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as vscode from 'vscode';
import { resolve } from 'path';
import * as fs from 'fs';
import * as appRoot from 'app-root-path';

import { TemplatePath } from '../constant/template';
import { showConfirmMessage } from '../common';

const template = TemplatePath.Minimal;

export async function createWskdeployProject(): Promise<void> {
    const templateAction = vscode.Uri.file(appRoot.resolve(`${template.root}/${template.action}`));
    const templateFile = vscode.Uri.file(appRoot.resolve(`${template.root}/${template.manifest}`));

    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showErrorMessage('Open a workspace first to create a wskdeploy project.');
        return;
    }

    const confirmed = await showConfirmMessage(
        `Are you sure you want to create wskdeploy project in your workspace?\n
The following file will be created:
- manifest.yaml
- src/hello.js`,
        'Create'
    );
    if (!confirmed) {
        return;
    }

    const targetManifest = vscode.Uri.file(
        resolve(vscode.workspace.workspaceFolders[0].uri.fsPath, template.manifest)
    );
    const targetAction = vscode.Uri.file(
        resolve(vscode.workspace.workspaceFolders[0].uri.fsPath, template.action)
    );

    if (fs.existsSync(targetManifest.fsPath)) {
        vscode.window.showErrorMessage(
            'Failed to create a template file. The manifest.yaml file already exists.'
        );
        return;
    }
    if (fs.existsSync(targetAction.fsPath)) {
        vscode.window.showErrorMessage(
            `Failed to create a template file. The ${template.action} file already exists`
        );
        return;
    }

    await vscode.workspace.fs.copy(templateAction, targetAction);
    await vscode.workspace.fs.copy(templateFile, targetManifest);
}
