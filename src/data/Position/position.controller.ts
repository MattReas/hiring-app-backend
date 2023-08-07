import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
import { PositionService } from './position.service'
import { Position } from '../position/position.entity'

@Controller('positions')
export class PositionController {
    constructor(private readonly positionService: PositionService) {}

    @Get()
    findAll(): Promise<Position[]> {
        return this.positionService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Position> {
        return this.positionService.findOne(id)
    }

    @Post()
    create(@Body() data: Partial<Position>): Promise<Position> {
        return this.positionService.create(data)
    }

    @Put(':id/name')
    updateName(@Param('id') id: number, @Body() data: Partial<Position>): Promise<Position> {
        return this.positionService.updateName(id, data)
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.positionService.remove(id)
    }

    @Post(':positionId/applicants/:applicantId')
    addApplicant(@Param('positionId') positionId: number, @Param('applicantId') applicantId: number): Promise<Position> {
        return this.positionService.addApplicant(positionId, applicantId)
    }

    @Delete(':positionId/applicants/:applicantId')
    removeApplicant(@Param('positionId') positionId: number, @Param('applicantId') applicantId: number): Promise<Position> {
        return this.positionService.removeApplicant(positionId, applicantId)
    }

    @Post(':positionId/templates/:templateId')
    assignTemplate(@Param('positionId') positionId: number, @Param('templateId') templateId: number): Promise<Position> {
        return this.positionService.assignTemplate(positionId, templateId);
    }

    @Delete(':positionId/templates/:templateId')
    unassignTemplate(@Param('positionId') positionId: number, @Param('templateId') templateId: number): Promise<Position> {
        return this.positionService.unassignTemplate(positionId, templateId);
    }
}