import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class SearchMovieDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  search: string;
}
