import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
import { IncidentsService } from "./incidents.service";
import {
  CreateIncidentDto,
  UpdateIncidentDto,
  QueryIncidentsDto,
} from "./dto/incident.dto";

@Controller("api/incidents")
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() createIncidentDto: CreateIncidentDto) {
    return this.incidentsService.create(createIncidentDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  findAll(@Query() query: QueryIncidentsDto) {
    return this.incidentsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.incidentsService.findOne(id);
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(
    @Param("id") id: string,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ) {
    return this.incidentsService.update(id, updateIncidentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.incidentsService.remove(id);
  }
}
