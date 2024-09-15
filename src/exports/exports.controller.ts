import { Controller, Get, Query } from '@nestjs/common';

import { TimetableExportDto } from './dto/timetable-export.dto.js';
import { ExportsService } from './exports.service.js';
import { exportPageHTML } from './page/export-page-html.js';

@Controller('/cgi-bin')
export class ExportsController {
  constructor(private readonly exportsService: ExportsService) {}

  @Get('/timetable_export.cgi')
  findAll(@Query() query: TimetableExportDto) {
    if (Object.keys(query).length < 3) {
      return exportPageHTML;
    }

    if (query.req_type === 'obj_list') {
      switch (query.req_mode) {
        case 'group':
          return this.exportsService.groups(query);
        case 'teacher':
          return this.exportsService.teachers(query);
        case 'room':
          return this.exportsService.classrooms(query);
      }
    }

    if ((query.req_type === 'rozklad' && query.OBJ_ID) || query.OBJ_name) {
      return this.exportsService.schedules(query);
    }

    return {
      psrozklad_export: {
        error: { error_message: "Невiдомий об'єкт  - Об'єкт не знайдено", errorcode: '-90' },
        code: '90',
      },
    };
  }
}
