import joplin from 'api';
import { MenuItemLocation } from 'api/types';

joplin.plugins.register({
    onStart: async function () {
        await joplin.commands.register({
            name: 'testCmd',
            label: 'Test command',
            execute: async (noteIds: string[]) => {
                // If this command is triggered from menu <Tools> then noteIds will be null
                // So we need to get all selected note ids in current workspace as below
                if (!noteIds) {
                    noteIds = await joplin.workspace.selectedNoteIds();
                }

                noteIds.forEach(async (noteId: string) => {
                    await joplin.commands.execute('moveToFolder', noteIds);
                });
            },
        });

        await joplin.views.menuItems.create(
            'ToolsTestCommand',
            'testCmd',
            MenuItemLocation.Tools,
            { accelerator: 'CmdOrCtrl+Shift+E' }
        );

        await joplin.views.menuItems.create(
            'noteListMenuItemTestCommand',
            'testCmd',
            MenuItemLocation.NoteListContextMenu,
            { accelerator: 'CmdOrCtrl+Shift+E' }
        );
    },
});
