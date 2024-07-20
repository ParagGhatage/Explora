import mongoose, { Schema, Document } from 'mongoose';

interface ICity extends Document {
  name: string;
  id: number;
  state: string;
  coord: {
    lon: number;
    lat: number;
  };
}

const CitySchema: Schema = new Schema({
  name: { type: String },
  id: { type: Number },
  state: { type: String },
  coord: {
    lon: { type: Number },
    lat: { type: Number},
  },
});

export default mongoose.models.City || mongoose.model<ICity>('City', CitySchema);
