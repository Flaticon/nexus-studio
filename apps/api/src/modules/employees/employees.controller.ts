import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
@UseGuards(JwtAuthGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.employeesService.findAll(query);
  }

  @Get('stats')
  getStats() {
    return this.employeesService.getEmployeeStats();
  }

  @Get('department/:department')
  getByDepartment(@Param('department') department: string) {
    return this.employeesService.getEmployeesByDepartment(department);
  }

  @Get('manager/:managerId')
  getByManager(@Param('managerId') managerId: string) {
    return this.employeesService.getEmployeesByManager(managerId);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return this.employeesService.findByEmail(req.user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }

  @Post(':id/login')
  updateLastLogin(@Param('id') id: string) {
    return this.employeesService.updateLastLogin(id);
  }
}