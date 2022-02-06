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
import { SearchMovieDto } from './dto/search-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @HttpCode(201)
  create(
    @Body() createMovieDto: CreateMovieDto,
    @Req() req: Request,
    @Query('lang') lang,
  ) {
    return this.moviesService.create(createMovieDto, req.user.sub, lang);
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

  @Get('/populars')
  getPopularsMovies(@Query('page') page, @Query('lang') lang) {
    return this.moviesService.getPopularsMovies(page, lang);
  }

  @Post('/search')
  searchMovies(
    @Query('page') page,
    @Query('lang') lang,
    @Body() searchMovieDto: SearchMovieDto,
  ) {
    return this.moviesService.searchMovies(searchMovieDto, page, lang);
  }
}
