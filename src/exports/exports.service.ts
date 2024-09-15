import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service.js';
import { TimetableExportDto } from './dto/timetable-export.dto.js';

@Injectable()
export class ExportsService {
  constructor(private readonly prismaService: PrismaService) {}

  async groups(query: TimetableExportDto) {
    const faculty = await this.prismaService.faculty.findMany({
      orderBy: { name: 'asc' },
      select: {
        Group: { select: { ID: query.show_ID, name: true }, orderBy: { name: 'asc' } },
        name: true,
      },
    });

    return {
      psrozklad_export: {
        departments: faculty.map((f) => ({
          name: f.name,
          objects: f.Group.map((g) => ({ name: g.name, ID: g.ID?.toString() })),
        })),
        code: '0',
      },
    };
  }

  async teachers(query: TimetableExportDto) {
    const departaments = await this.prismaService.departament.findMany({
      orderBy: { name: 'asc' },
      select: {
        teachers: { orderBy: { name: 'asc' }, select: { ID: query.show_ID, name: true } },
        name: true,
      },
    });

    return {
      psrozklad_export: {
        departments: departaments.map((f) => ({
          name: f.name,
          objects: f.teachers.map((t) => {
            const arr = t.name.split(' ');
            let obj = {};

            obj['name'] = `${arr[0]} ${arr[1][0]}.${arr[2][0]}.`;
            obj = { ...obj, P: arr[0], I: arr[1], B: arr[2] };
            obj['ID'] = t.ID?.toString();
            return obj;
          }),
        })),
        code: '0',
      },
    };
  }

  async classrooms(query: TimetableExportDto) {
    const building = await this.prismaService.building.findMany({
      orderBy: { name: 'asc' },
      select: {
        name: true,
        Classroom: {
          orderBy: { name: 'asc' },
          select: { ID: query.show_ID, name: true },
        },
      },
    });

    return {
      psrozklad_export: {
        blocks: building.map(({ name, Classroom }) => ({
          name,
          objects: Classroom.map(({ name, ID }) => ({ name, ID: ID?.toString() })),
        })),
        code: '0',
      },
    };
  }

  async schedules(query: TimetableExportDto) {
    let objName = query.OBJ_name;

    let schedules = await this.prismaService.schedule.findMany({
      where: { date: { gte: query.begin_date, lte: query.end_date } },
      include: { teacher: true, classroom: true, lesson: true },
      orderBy: { date: 'asc' },
    });

    if (query.req_mode === 'group') {
      const groupByID = await this.prismaService.group.findUnique({
        where: { ID: query.OBJ_ID },
      });

      objName ??= groupByID?.name;
      schedules = schedules.filter((item) => item.groups.split(', ').includes(objName));
    }

    if (query.req_mode === 'teacher') {
      const teacherByName = await this.prismaService.user.findUnique({
        where: { name: query.OBJ_name },
      });

      objName ??= teacherByName?.name;
      schedules = schedules.filter(
        (item) => item.teacherID === (query.OBJ_ID ? query.OBJ_ID : teacherByName?.ID),
      );
    }

    if (query.req_mode === 'room') {
      const classrooByName = await this.prismaService.classroom.findUnique({
        where: { name: query.OBJ_name },
      });

      objName ??= classrooByName?.name;
      schedules = schedules.filter(
        (item) => item.classroomID === (query.OBJ_ID ? query.OBJ_ID : classrooByName?.ID),
      );
    }

    if (query.req_mode !== 'group') {
      schedules = schedules
        .map((item) =>
          item.groups.split(', ').map((group) => ({ ...item, group: item.group || group })),
        )
        .flat();
    }

    const rozItems = schedules.map((item) => ({
      object: objName,
      date: item.date.split('-').reverse().join('.'),
      comment: item.comment4link ? '1' : '0',
      lesson_number: item.tableIndex,
      lesson_name: item.tableIndex,
      lesson_time: item.time,
      half: item.half,
      teacher: query.req_mode === 'teacher' ? '' : item.teacher?.name,
      teachers_add: item.teachersAdd,
      room: query.req_mode === 'room' ? '' : item.classroom?.name,
      group: item.group,
      title: item.lesson?.name,
      type: item.type,
      replacement: item.replacement,
      reservation: item.reservation,
      online: item.online,
      comment4link: item.comment4link,
      link: item.link,
      stream_components: query.all_stream_components ? '' : undefined,
    }));

    return {
      psrozklad_export: {
        roz_items: Array.from(new Set(rozItems.map((item) => JSON.stringify(item)))).map((item) =>
          JSON.parse(item),
        ),
        code: '0',
      },
    };
  }
}
