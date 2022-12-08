import joplin from 'api';
import { MenuItemLocation } from 'api/types';

joplin.plugins.register({
    onStart: async function () {
        await joplin.commands.register({
            name: 'apMoveToFolder',
            label: 'Move to folder',
            execute: async (noteIds: string[]) => {
                // If this command is triggered from menu <Tools> then noteIds will be null
                // So we need to get all selected note ids in current workspace as below
                if (!noteIds) {
                    noteIds = await joplin.workspace.selectedNoteIds();
                }

                await joplin.commands.execute('moveToFolder', noteIds);
            },
        });

        await joplin.commands.register({
            name: 'apOpenFolderDialog',
            label: 'Show folder properties',
            execute: async () => {
                const folder = await joplin.workspace.selectedFolder();
                await joplin.commands.execute('openFolderDialog', {
                    isNew: false,
                    folderId: folder.id,
                    parentId: folder.parent_id,
                });
            },
        });

        await joplin.commands.register({
            name: 'apShowNoteProperties',
            label: 'Show note properties',
            execute: async (noteId: string) => {
                // If this command is triggered from menu <Tools> then noteId will be null
                // So we need to get selected note id in current workspace as below
                if (!noteId) {
                    noteId = (await joplin.workspace.selectedNote()).id;
                }

                await joplin.commands.execute('showNoteProperties', noteId);
            },
        });

        await joplin.views.menuItems.create(
            'ToolsApMoveToFolder',
            'apMoveToFolder',
            MenuItemLocation.Tools,
            { accelerator: 'CmdOrCtrl+Shift+E' }
        );

        await joplin.views.menuItems.create(
            'noteListMenuItemApMoveToFolder',
            'apMoveToFolder',
            MenuItemLocation.NoteListContextMenu,
            { accelerator: 'CmdOrCtrl+Shift+E' }
        );

        await joplin.views.menuItems.create(
            'ToolsApOpenFolderDialog',
            'apOpenFolderDialog',
            MenuItemLocation.Tools,
            { accelerator: 'CmdOrCtrl+Shift+R' }
        );

        await joplin.views.menuItems.create(
            'noteListMenuItemApOpenFolderDialog',
            'apOpenFolderDialog',
            MenuItemLocation.NoteListContextMenu,
            { accelerator: 'CmdOrCtrl+Shift+R' }
        );

        await joplin.views.menuItems.create(
            'ToolsApShowNoteProperties',
            'apShowNoteProperties',
            MenuItemLocation.Tools,
            { accelerator: 'CmdOrCtrl+Shift+I' }
        );

        await joplin.views.menuItems.create(
            'noteListMenuItemApShowNoteProperties',
            'apShowNoteProperties',
            MenuItemLocation.NoteListContextMenu,
            { accelerator: 'CmdOrCtrl+Shift+I' }
        );
    },
});
