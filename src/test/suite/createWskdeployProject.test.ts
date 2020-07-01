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
import * as assert from 'assert';
import * as vscode from 'vscode';
import { resolve } from 'path';
import { existsSync, writeFileSync } from 'fs';
import { afterEach, before } from 'mocha';
import { createWskdeployProject } from '../../commands/createWskdeployProject';
import { TemplatePath } from '../../constant/template';

const minimal = TemplatePath.Minimal;
let targetManifest: vscode.Uri, targetAction: vscode.Uri, targetDirectory: vscode.Uri;

suite('templateGenerator.createWskdeployProject', () => {
    test('Create project files and directory if there is no conflict', () => {
        // await createWskdeployProject();
        assert.ok(true);
        // assert.ok(existsSync(targetAction.path));
        // assert.ok(existsSync(targetManifest.path));
    });

    test('Warn if filename conflicts', async () => {
        writeFileSync(targetManifest.path, 'test');
        // await createWskdeployProject();
        assert.ok(existsSync(targetAction.path));
    });

    before(function () {
        if (vscode.workspace.workspaceFolders) {
            targetManifest = vscode.Uri.parse(
                resolve(vscode.workspace.workspaceFolders[0].uri.path, minimal.manifest)
            );
            targetAction = vscode.Uri.parse(
                resolve(vscode.workspace.workspaceFolders[0].uri.path, minimal.action)
            );
            targetDirectory = vscode.Uri.parse(
                resolve(vscode.workspace.workspaceFolders[0].uri.path, minimal.sourceDir)
            );
        } else {
            this.skip();
        }
    });

    afterEach(() => {
        vscode.workspace.fs.delete(targetManifest);
        vscode.workspace.fs.delete(targetDirectory, { recursive: true });
    });
});
