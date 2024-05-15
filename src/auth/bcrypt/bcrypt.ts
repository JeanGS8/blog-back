import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

// service
@Injectable()
export class Bcrypt{

    async criptografarSenha(senha: string): Promise<string>{

        let saltos = 10; // qtd saltos
        return await bcrypt.hash(senha, saltos); // ele está criptografando a senha com 10 caracteres aleatorio
    }

    async compararSenhas(senhaBanco: string, senhaDigitada: string): Promise<boolean>{

        return bcrypt.compareSync(senhaDigitada, senhaBanco);
    }
}