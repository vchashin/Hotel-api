import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto, UpdateRoomDto } from './rooms.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/user-roles.guard';

@ApiBearerAuth()
@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({ summary: 'Create one room' })
  @ApiBody({ type: CreateRoomDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @ApiQuery({
    name: 'startSearchDate',
    description: 'The date on which the search starts',
    required: false,
  })
  @ApiQuery({
    name: 'endSearchDate',
    description: 'The date on which the search ends',
    required: false,
  })
  @ApiOperation({ summary: 'Get many rooms' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('startSearchDate') startSearchDate: Date,
    @Query('endSearchDate') endSearchDate: Date,
  ) {
    return this.roomsService.findAll(startSearchDate, endSearchDate);
  }

  @ApiOperation({ summary: 'Get one room' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update one room' })
  @ApiBody({ type: UpdateRoomDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @ApiOperation({ summary: 'Delete one room' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roomsService.delete(id);
  }
}
