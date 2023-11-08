import fs from 'fs';

export interface SaveFileOptions {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export interface SaveFileUseCase {
    execute: (options: SaveFileOptions) => boolean;
}


export class SaveFile implements SaveFileUseCase {
    constructor(
        /**
         * repositry: StorageRepository
         */
    ) { }

    execute({
        fileContent,
        fileName = 'table.txt',
        fileDestination = 'outputs'
    }: SaveFileOptions): boolean {

        try {
            fs.mkdirSync(fileDestination, { recursive: true });

            fs.writeFileSync(`${fileDestination}/${fileName}`, fileContent);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}