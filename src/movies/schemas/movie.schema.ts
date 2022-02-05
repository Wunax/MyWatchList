import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ type: Number, required: true })
  idTmdb: number;

  @Prop({ type: Boolean, default: false })
  seen: boolean;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
