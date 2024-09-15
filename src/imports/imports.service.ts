import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { PSRozkladHandlers } from '../common/psrozklad/psrozklad-handlers.js';
import { PSRozkladExport } from '../common/psrozklad/psrozklad-interfaces.js';
import { PrismaService } from '../database/prisma.service.js';
import { PsrozkladExportItemType } from './types/psrozklad-export-item.type.js';
import { PsrozkladExportType } from './types/psrozklad-export.type.js';

@Injectable()
export class ImportsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  private readonly axios = this.httpService.axiosRef;

  private readonly steps = [
    this.syncClassrooms,
    this.syncGroups,
    this.syncTeacher,
    this.syncSchedule,
  ];

  private readonly sharedParams = {
    req_format: 'json',
    coding_mode: 'UTF8',
    bs: 'ok',
  };

  async importFromDecanatPlusPlus(url: string, sendOutput: (text: string) => boolean) {
    sendOutput(`Start import from: "${url}"\n\n`);

    for (const index in this.steps) {
      const nameOfStep = this.steps[index].name;
      const customLog = (text: string) =>
        sendOutput(`Step ${+index + 1}/${this.steps.length} [${nameOfStep}] - ${text}\n`);

      await this.steps[index].bind(this)(url, customLog);
      sendOutput('\n');
    }

    sendOutput('Finish\n');
  }

  private async syncClassrooms(url: string, log: (text: string) => void) {
    log('Get base data');
    const data = await this.getBaseData<'blocks'>(url, 'room');

    log('Sync buildings data');

    const buildings = await Promise.all(
      data.blocks.map((block) =>
        this.prismaService.building.upsert({
          where: { name: block.name },
          create: { name: block.name },
          update: { name: block.name },
        }),
      ),
    );

    log(`Updated ${buildings.length} buildings`);
    log('Sync classrooms data');

    const classrooms = [];

    for (const block of data.blocks) {
      const buildingID = buildings.find(({ name }) => name === block.name).ID;

      for (const classroom of block.objects) {
        classrooms.push(
          await this.prismaService.classroom.upsert({
            where: { ID: +classroom.ID },
            create: { ID: +classroom.ID, name: classroom.name, buildingID },
            update: { ID: +classroom.ID, name: classroom.name, buildingID },
          }),
        );
      }
    }

    log(`Updated ${classrooms.length} classrooms`);
  }

  private async syncGroups(url: string, log: (text: string) => void) {
    log('Get base data');
    const data = await this.getBaseData<'departments'>(url, 'group');

    log('Sync Faculty data');

    const facultys = await Promise.all(
      data.departments.map((faculty) =>
        this.prismaService.faculty.upsert({
          where: { name: faculty.name },
          create: { name: faculty.name },
          update: { name: faculty.name },
        }),
      ),
    );

    log(`Updated ${facultys.length} faculty`);
    log('Sync groups data');

    const groups = [];

    for (const faculty of data.departments) {
      const facultyID = facultys.find(({ name }) => name === faculty.name).ID;

      for (const group of faculty.objects) {
        groups.push(
          await this.prismaService.group.upsert({
            where: { ID: +group.ID },
            create: { ID: +group.ID, name: group.name, facultyID },
            update: { ID: +group.ID, name: group.name, facultyID },
          }),
        );
      }
    }

    log(`Updated ${groups.length} groups`);
  }

  private async syncTeacher(url: string, log: (text: string) => void) {
    log('Get base data');
    const data = await this.getBaseData<'departments'>(url, 'teacher');

    log('Sync Departments data');

    const departments = await Promise.all(
      data.departments.map((department) =>
        this.prismaService.departament.upsert({
          where: { name: department.name },
          create: { name: department.name },
          update: { name: department.name },
        }),
      ),
    );

    log(`Updated ${departments.length} departments`);
    log('Sync groups data');

    const teachers = [];

    for (const department of data.departments) {
      const departamentID = departments.find(({ name }) => name === department.name).ID;

      for (const teacher of department.objects) {
        teachers.push(
          await this.prismaService.user.upsert({
            where: { ID: +teacher.ID },
            create: {
              ID: +teacher.ID,
              name: `${teacher['P']} ${teacher['I']} ${teacher['B']}`,
              departamentID,
            },
            update: {
              ID: +teacher.ID,
              name: `${teacher['P']} ${teacher['I']} ${teacher['B']}`,
              departamentID,
            },
          }),
        );
      }
    }

    log(`Updated ${teachers.length} teachers`);
  }

  private async syncSchedule(url: string, log: (text: string) => void) {
    const groups = await this.prismaService.group.findMany();
    let items = [];

    const prevYearDate = new Date();
    prevYearDate.setFullYear(prevYearDate.getFullYear() - 1);
    const nextYearDate = new Date();
    nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);

    log('Get schedule data');

    for (const index in groups) {
      log(
        `${+index + 1} of ${groups.length} groups, ${items.length} items, ${groups[index].name} current group.`,
      );

      const { roz_items } = await this.getScheduleData(
        url,
        groups[index].ID,
        prevYearDate,
        nextYearDate,
      );

      items = items.concat(roz_items);
    }

    const clearedItems = PSRozkladHandlers.clearItems(items);
    const tree = PSRozkladHandlers.toTree(clearedItems);
    const sortedTree = PSRozkladHandlers.sort(tree);
    const flatTree = PSRozkladHandlers.flatTree(sortedTree);

    const teachers = await this.prismaService.user.findMany();
    const classrooms = await this.prismaService.classroom.findMany();

    log('Sync Lesson Data');
    const uniqueLessons = new Set(flatTree.map((item) => item.title));
    const lessons = await Promise.all(
      Array.from(uniqueLessons)
        .filter((name) => name)
        .map((name) =>
          this.prismaService.lesson.upsert({
            where: { name },
            create: { name },
            update: { name },
          }),
        ),
    );

    log('Delete schedule data');

    const deleted = await this.prismaService.schedule.deleteMany();

    log(`Deleted ${deleted.count} departments`);
    log('Create schedule data');

    const created = await this.prismaService.schedule.createMany({
      data: flatTree.map((item) => ({
        teacherID: teachers.find(({ name }) => name === item.teacher)?.ID,
        classroomID: classrooms.find(({ name }) => name === item.room)?.ID,
        lessonID: lessons.find(({ name }) => name === item.title)?.ID,
        groups: item.groups.join(', '),
        comment4link: item.comment4link,
        teachersAdd: item.teachers_add,
        tableIndex: item.lesson_number,
        reservation: item.reservation,
        replacement: item.replacement,
        time: item.lesson_time,
        online: item.online,
        group: item.group,
        half: item.half,
        date: item.date,
        link: item.link,
        type: item.type,
      })),
    });

    log(`Created ${created.count} schedules`);
  }

  async isPSRozkladExportPage(url: string) {
    try {
      const { data } = await this.axios.get<string>(url);
      return (
        data.includes('<title>��-�������-�������</title>') ||
        data.includes('<title>ПС-Розклад-експорт</title>')
      );
    } catch {
      return false;
    }
  }

  private async getBaseData<K extends string, T = PsrozkladExportItemType>(
    url: string,
    req_mode: 'group' | 'teacher' | 'room',
  ): Promise<PsrozkladExportType<K, T>> {
    const params = {
      ...this.sharedParams,
      req_type: 'obj_list',
      show_ID: 'yes',
      req_mode,
    };

    const { data } = await this.axios.get(url, { params });
    return data.psrozklad_export;
  }

  private async getScheduleData(
    url: string,
    groupID: number | string,
    from: Date,
    to: Date,
  ): Promise<PSRozkladExport> {
    const toFormatDate = (date: Date) =>
      date.toJSON().split('T').shift().split('-').reverse().join('.');

    const params = {
      begin_date: toFormatDate(from),
      end_date: toFormatDate(to),
      ros_text: 'separated',
      ...this.sharedParams,
      req_type: 'rozklad',
      req_mode: 'group',
      OBJ_ID: groupID,
    };

    const { data } = await this.axios.get(url, { params });
    return data.psrozklad_export;
  }
}
