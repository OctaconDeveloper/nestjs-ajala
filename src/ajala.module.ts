import { Log } from './Utils/log.util';
import { Module } from '@nestjs/common';
import Request from './Utils/request.util';
import { HttpModule } from '@nestjs/axios';
import Response from './Utils/response.util';
import { AjalaService } from './ajala.service';
import InternalService from './Utils/internal-service.util';

@Module({
  imports: [HttpModule],
  providers: [AjalaService, InternalService, Request, Response, Log],
  exports: [AjalaService]
})

export class AjalaModule { }