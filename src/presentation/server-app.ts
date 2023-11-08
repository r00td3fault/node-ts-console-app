import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileDestination?: string;
    fileName?: string;
}


export class ServerApp {

    static run({ base, limit, showTable, fileDestination, fileName }: RunOptions) {
        console.log('Server running');

        const table = new CreateTable().execute({ base, limit });

        if (showTable) console.log(table);

        const wasCreated = new SaveFile().execute({
            fileContent: table,
            fileName: fileName || `tabla-${base}.txt`,
            fileDestination,
        });

        wasCreated ? console.log("The file was saved!") : console.log("Error save file");
    }
}