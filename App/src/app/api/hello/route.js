// src/app/api/hello/route.js
import { NextResponse } from 'next/server';

export const GET = () => {
  try {
    let name = "3162";
    const DB_HOST = process.env.DB_DATABASE
    return NextResponse.json(
      { name: DB_HOST }
    ,{status:200});
  } catch (error) {
    return new Response('Error', { status: 500 });  
  }
};


export const POST = async (req) => {
  try {
    const body = await req.json();
    return NextResponse.json({data: body });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
};