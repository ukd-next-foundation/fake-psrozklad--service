import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module.js';
import { ImportsController } from './imports.controller.js';
import { ImportsService } from './imports.service.js';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [ImportsController],
  providers: [ImportsService],
})
export class ImportsModule {}
