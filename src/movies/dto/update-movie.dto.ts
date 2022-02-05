import { IsBoolean, IsDefined, IsNotEmpty } from 'class-validator';

export class UpdateMovieDto {
  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  seen: boolean;
}
