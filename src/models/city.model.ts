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
  name: { type: String, required: true },
  id: { type: Number, required: true },
  state: { type: String, required: true },
  coord: {
    lon: { type: Number, required: true },
    lat: { type: Number, required: true },
  },
});

export default mongoose.models.City || mongoose.model<ICity>('City', CitySchema);
