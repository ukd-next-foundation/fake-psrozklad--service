import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module.js';
import { ExportsController } from './exports.controller.js';
import { ExportsService } from './exports.service.js';

@Module({
  imports: [DatabaseModule],
  controllers: [ExportsController],
  providers: [ExportsService],
})
export class ExportsModule {}
