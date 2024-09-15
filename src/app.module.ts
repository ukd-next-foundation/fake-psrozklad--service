import { Module } from '@nestjs/common';

import { AdminJsModule } from './admin/admin.module.js';
import { DatabaseModule } from './database/database.module.js';
import { ExportsModule } from './exports/exports.module.js';
import { ImportsModule } from './imports/imports.module.js';

@Module({
  imports: [DatabaseModule, AdminJsModule, ExportsModule, ImportsModule],
})
export class AppModule {}
