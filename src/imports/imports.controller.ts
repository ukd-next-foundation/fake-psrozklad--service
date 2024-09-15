import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { ImportFromPSRozklad } from './dto/import-from-psrozklad.dto.js';
import { ImportsService } from './imports.service.js';

@Controller('/imports')
export class ImportsController {
  private readonly logger = new Logger(ImportsController.name);

  constructor(private readonly importsService: ImportsService) {}

  @Post('/from-psrozklad')
  async importFromDecanatPlusPlus(@Body() { url }: ImportFromPSRozklad, @Res() res: Response) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    const isExportPage = await this.importsService.isPSRozkladExportPage(url);
    const sendOutput = (text: string) => res.write(text);

    if (!isExportPage) {
      sendOutput('Is not URL of PSRozklad export page');
    } else {
      try {
        await this.importsService.importFromDecanatPlusPlus(url, sendOutput);
      } catch (error) {
        this.logger.error(error);
        sendOutput(`${error}`);
      }
    }

    res.end();
  }
}
