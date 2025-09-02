// apps/api/src/modules/portfolio/dto/update-startup.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateStartupDto } from './create-startup.dto';

export class UpdateStartupDto extends PartialType(CreateStartupDto) {}