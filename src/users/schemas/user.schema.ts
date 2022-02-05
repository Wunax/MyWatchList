import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
import { Movie } from '../../movies/schemas/movie.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  @ExcludeProperty()
  password: string;

  @Prop({ type: [Types.ObjectId], ref: Movie.name })
  movies: Movie[];
}

export const UserSchema = SchemaFactory.createForClass(User);
