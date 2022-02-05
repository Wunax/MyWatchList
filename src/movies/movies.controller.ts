import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createMovieDto: CreateMovieDto, @Req() req: Request) {
    return this.moviesService.create(createMovieDto, req.user.sub);
  }

  @Get()
  findAll(@Query('lang') lang, @Req() req: Request) {
    return this.moviesService.findAll(req.user.sub, lang);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @Req() req: Request,
  ) {
    return this.moviesService.update(id, updateMovieDto, req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.moviesService.remove(id, req.user.sub);
  }
}
