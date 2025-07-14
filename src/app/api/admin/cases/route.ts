//app/api/admin/cases/route.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import Case from '@/models/Case';
import { IApiResponse } from '@/types';

// GET all cases
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const token = await getToken({ req: request });
    
    if (!token) {
      return NextResponse.json<IApiResponse>({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const cases = await Case.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Case.countDocuments();

    return NextResponse.json<IApiResponse>({
        success: true,
        data: {
            cases,
            total,
            page,
            pages: Math.ceil(total / limit)
        },
        message: ''
    });

  } catch (error) {
    console.error('Get cases error:', error);
    return NextResponse.json<IApiResponse>({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST create new case
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const token = await getToken({ req: request });
    
    if (!token) {
      return NextResponse.json<IApiResponse>({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 });
    }

    const { title, description, category, tags, attachments } = await request.json();

    if (!title || !description || !category) {
      return NextResponse.json<IApiResponse>({
        success: false,
        message: 'Title, description and category are required'
      }, { status: 400 });
    }

    const newCase = await Case.create({
      title,
      description,
      category,
      tags: tags || [],
      attachments: attachments || [],
      createdBy: token.id
    });

    return NextResponse.json<IApiResponse>({
      success: true,
      message: 'Case created successfully',
      data: newCase
    }, { status: 201 });

  } catch (error) {
    console.error('Create case error:', error);
    return NextResponse.json<IApiResponse>({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}