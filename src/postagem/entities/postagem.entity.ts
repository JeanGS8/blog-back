import { IsNotEmpty } from "class-validator";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, TableForeignKey, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_postagens'}) // Criando a entidade tb_postagem
export class Postagem{
    @PrimaryGeneratedColumn() // Define o atributo como chave primaria e já adiciona o auto increment
    @ApiProperty()
    id: number;

    @IsNotEmpty() // Verifica se a informação não está vazia
    @Column ({length: 100, nullable: false}) // Definindo o tamanho do atributo e se ele pode ser nulo
    @ApiProperty()
    titulo: String;

    @IsNotEmpty() // Verifica se a informação não está vazia
    @Column ({length: 1000, nullable: false}) // Definindo se o atributo pode ser nulo e o tamanho do atributo passado
    @ApiProperty()
    texto: String;

    @UpdateDateColumn() // Atualiza a data do ultimo acesso
    @ApiProperty()
    data: Date;

    @ApiProperty({type: () => Tema})
    @ManyToOne(() => Tema, (tema) => tema.postagem, { // Chave estrangeira
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ApiProperty({type: () => Usuario})
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;
}