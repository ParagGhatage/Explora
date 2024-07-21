import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import cityModel from '@/models/city.model';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const requestbody = await request.json()
    
    const {name} = requestbody
    
    // Replace this with your actual query logic
    const result = await cityModel.findOne({
      name:name
    }).lean();
    console.log(result)
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching city ID:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
