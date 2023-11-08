export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {

    constructor(
        /**
         * DI - Dependency Injection
         */
    ) { }

    execute({ base, limit = 10 }: CreateTableOptions) {

        let outputMessage = '';
        for (let index = 1; index <= limit; index++) {
            const salto = index !== 10 ? "\n" : '';
            const salida = ` ${base} x ${index} = ${base * index}` + salto;
            outputMessage += salida;
        }

        return outputMessage;
    }
}