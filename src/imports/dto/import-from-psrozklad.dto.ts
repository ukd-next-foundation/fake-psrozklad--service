import { IsUrl } from 'class-validator';

export class ImportFromPSRozklad {
  @IsUrl()
  url: string;
}
