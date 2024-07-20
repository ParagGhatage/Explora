import mongoose, { Schema, Document } from 'mongoose';

export interface City extends Document {
  name: string;
  id: number;
  state: string;
  coord: Object;
  lon:number;
  lat:number
}

const CitySchema: Schema<City> = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: false,
  },
  
  
  coord: {
    lon: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
  },
});

// Check if the model is already registered
const CityModel = mongoose.models.City || mongoose.model<City>('City', CitySchema);

export default CityModel;
