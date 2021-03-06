//The starting point of the app
import 'dotenv/config';

import { NestFactory } from '@nestjs/core'; // to create nest application
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

let port = process.env.PORT || 8080;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(port);
	Logger.log(`Server listening on port ${port}`, 'Bootstrap');
}
bootstrap();
