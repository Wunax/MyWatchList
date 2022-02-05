import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Movie, MovieDocument } from './schemas/movie.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(
    createMovieDto: CreateMovieDto,
    userId: string,
  ): Promise<MovieDocument | Movie> {
    try {
      await lastValueFrom(
        this.httpService.get(
          `https://api.themoviedb.org/3/movie/${
            createMovieDto.idTmdb
          }?api_key=${this.configService.get<string>('TMDB_API_KEY')}`,
        ),
      );
      const user = await this.userService.findById(userId);
      const existingMovie = user.movies.find(
        (movie) => movie.idTmdb === createMovieDto.idTmdb,
      );
      if (existingMovie) {
        return existingMovie;
      }
      const movie = new this.movieModel({
        idTmdb: createMovieDto.idTmdb,
        seen: createMovieDto.seen,
      });
      await movie.save();
      user.movies.push(movie);
      await user.save();
      return movie;
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundException({ message: 'Movie not found' });
      } else {
        throw new BadRequestException({ message: 'An error has occurred' });
      }
    }
  }

  async findAll(userId: string, lang: string) {
    const user = await this.userService.findById(userId);
    const movies: any = user.movies;
    const moviesWithData = [];
    try {
      for (const movie of movies) {
        let urlTmdbApi = `https://api.themoviedb.org/3/movie/${
          movie.idTmdb
        }?api_key=${this.configService.get<string>('TMDB_API_KEY')}`;
        if (lang) {
          urlTmdbApi += `&language=${lang}`;
        }
        const res = await lastValueFrom(this.httpService.get(urlTmdbApi));
        moviesWithData.push({
          _id: movie._id,
          idTmdb: movie.idTmdb,
          seen: movie.seen,
          dataTmdb: res.data,
        });
      }
      return moviesWithData;
    } catch (err) {
      throw new BadRequestException({ message: 'An error has occurred' });
    }
  }

  async update(id: string, updateMovieDto: UpdateMovieDto, userId: string) {
    const user = await this.userService.findById(userId);
    const existingMovie = user.movies.find(
      (movie: MovieDocument) => movie._id.toString() === id,
    );
    if (!existingMovie) {
      throw new NotFoundException({ message: 'Movie not found' });
    }
    return this.movieModel.findByIdAndUpdate(
      { _id: id },
      { $set: { seen: updateMovieDto.seen } },
      { new: true },
    );
  }

  async remove(id: string, userId: string) {
    const user = await this.userService.findById(userId);
    const existingMovie = user.movies.find(
      (movie: MovieDocument) => movie._id.toString() === id,
    );
    if (!existingMovie) {
      throw new NotFoundException({ message: 'Movie not found' });
    }
    await this.movieModel.deleteOne({ _id: id });
    user.movies = user.movies.filter(
      (movie: MovieDocument) => movie._id.toString() !== id,
    );
    await user.save();
  }
}
