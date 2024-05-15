import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // o back-end inteiro está armazenado no app

  const config = new DocumentBuilder() // criamos um construtor de documentação, com a configuração do sistema
  .setTitle('Blog Pessoal') // Titulo
  .setDescription('Projeto Blog Pessoal') // descrição
  .setContact('Generation Brasil', 'http://www.generationbrasil.online', 'generation@hotmail.com') // contatos do criador
  .setVersion('1.0') // versão da aplicação
  .addBearerAuth() // modelo do token de seguraça do sistema
  .build(); // Ele vai pegar as configurações que passamos acima e irá retornar tudo para a config
  const document = SwaggerModule.createDocument(app, config); // documenou o app com base no config
  SwaggerModule.setup('/swagger', app, document)

  process.env.tz = "-03:00"; // utilizar o horário de brasília  
  app.useGlobalPipes(new ValidationPipe()); // estou dizendo que meu validation está configurado para rodar de forma global
  app.enableCors(); // Habilitar que o computador receba requisições de fora

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
