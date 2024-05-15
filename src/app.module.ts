import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PostagemModules } from './postagem/postagem.module';
import { TemaModule } from './tema/tema.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Postagem } from './postagem/entities/postagem.entity';
import { Tema } from './tema/entities/tema.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioLogin } from './auth/entities/usuariologin.entity';
import * as env from "dotenv";

env.config();

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: process.env.SUPABASE_URL,
			logging: false,
			dropSchema: false,
			ssl:{
				rejectUnauthorized: false
			},
			synchronize: true,
			autoLoadEntities: true,
			entities: [Postagem, Tema, UsuarioLogin, Usuario]
		}),
		PostagemModules,
		TemaModule,
		AuthModule,
		UsuarioModule
  	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
