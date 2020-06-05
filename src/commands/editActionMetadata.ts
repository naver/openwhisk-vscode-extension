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

import { WskAction } from '../wskEntity';
import { convertKeyValToObj } from '../common';
import { openMetadatEditor } from './common/openMetadataEditor';

export async function editActionMetadata(
    action: WskAction,
    context: vscode.ExtensionContext
): Promise<void> {
    const a = await action.getRemoteAction();
    const parameters = convertKeyValToObj(a.parameters || []);
    const annotations = convertKeyValToObj(a.annotations || []);
    const updateActionMetadata = async (params: object, annotations: object): Promise<void> => {
        await action.client.actions.update({
            name: action.getFullName(),
            params: params,
            annotations: annotations,
        });
        vscode.window.showInformationMessage('The action is updated succesfully.');
    };

    await openMetadatEditor(
        'editActionMetadata',
        `Edit action metadata: ${action.actionDesc.name}`,
        context,
        parameters,
        annotations,
        updateActionMetadata
    );
}
