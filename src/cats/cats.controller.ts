import { Controller, Get, Request, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { DtoCat } from './dtoCat';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) { }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }
    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }
    @Post()
    async create(@Body() dtoCat: DtoCat) {
        this.catsService.create(dtoCat);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() catDto: DtoCat) {
        return `This action updates a #${id} cat`;
    }
    @Delete(':id')
    delete(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }

}
