import { IsBoolean, IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  idTmdb: number;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  seen: boolean;
}
