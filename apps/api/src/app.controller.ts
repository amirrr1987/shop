import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service.js';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: 'Liveness probe', type: String })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOkResponse({ description: 'Readiness probe (DB ping)' })
  getHealth() {
    return this.appService.getHealth();
  }
}
