"use client"
import { BlockNoteSchema, combineByGroup, filterSuggestionItems, locales, PartialBlock } from "@blocknote/core"
import { getDefaultReactSlashMenuItems, SuggestionMenuController, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import {
    locales as multiColumnLocales,
    withMultiColumn,
    multiColumnDropCursor
} from "@blocknote/xl-multi-column";
import "@blocknote/mantine/style.css";
import { useMemo } from "react";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}
const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {
    const { edgestore } = useEdgeStore()

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        })
        return response.url
    }
    const editor = useCreateBlockNote({
        schema: withMultiColumn(BlockNoteSchema.create()),
        dropCursor: multiColumnDropCursor,

        dictionary: {
            ...locales.en,
            multi_column: multiColumnLocales.en,
        },
        initialContent: initialContent
            ? JSON.parse(initialContent) as PartialBlock[]
            : undefined,
        uploadFile: handleUpload


    });
    const uploadToDatabase = () => {
        if (onChange) {
            onChange(JSON.stringify(editor.document, null, 2));
        }
    }
    const slashMenuItems = useMemo(() => {
        return combineByGroup(
            getDefaultReactSlashMenuItems(editor),
        );
    }, [editor]);
    return (
        <BlockNoteView onChange={uploadToDatabase} editable={editable} editor={editor} slashMenu={true} >
            <SuggestionMenuController
                triggerCharacter={"/"}
                getItems={async (query) => filterSuggestionItems(slashMenuItems, query)}
            />
        </BlockNoteView>
    );
}

export default Editor;


