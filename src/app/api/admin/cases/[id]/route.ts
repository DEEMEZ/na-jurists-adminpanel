//app/api/admin/cases/[id]/route.ts

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import Case from '@/models/Case';
import { IApiResponse } from '@/types';

// GET single case
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const token = await getToken({ req: request });
    
    if (!token) {
      return NextResponse.json<IApiResponse>({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 });
    }

    const { id } = await params;
    const caseItem = await Case.findById(id).populate('createdBy', 'name email');

    if (!caseItem) {
      return NextResponse.json<IApiResponse>({
        success: false,
        message: 'Case not found'
      }, { status: 404 });
    }

    return NextResponse.json<IApiResponse>({
        success: true,
        data: caseItem,
        message: ''
    });

  } catch (error) {
    console.error('Get case error:', error);
    return NextResponse.json<IApiResponse>({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// PUT update case
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const token = await getToken({ req: request });
    
    if (!token) {
      return NextResponse.json<IApiResponse>({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 });
    }

    const { id } = await params;
    const { title, description, category, tags, attachments } = await request.json();

    const updatedCase = await Case.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        tags,
        attachments,
        updatedAt: new Date()
      },
      { new: true }
    ).populate('createdBy', 'name email');

    if (!updatedCase) {
      return NextResponse.json<IApiResponse>({
        success: false,
        message: 'Case not found'
      }, { status: 404 });
    }

    return NextResponse.json<IApiResponse>({
      success: true,
      message: 'Case updated successfully',
      data: updatedCase
    });

  } catch (error) {
    console.error('Update case error:', error);
    return NextResponse.json<IApiResponse>({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE case
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const token = await getToken({ req: request });
    
    if (!token) {
      return NextResponse.json<IApiResponse>({
        success: false,
        message: 'Unauthorized'
      }, { status: 401 });
    }

    const { id } = await params;
    const deletedCase = await Case.findByIdAndDelete(id);

    if (!deletedCase) {
      return NextResponse.json<IApiResponse>({
        success: false,
        message: 'Case not found'
      }, { status: 404 });
    }

    return NextResponse.json<IApiResponse>({
      success: true,
      message: 'Case deleted successfully'
    });

  } catch (error) {
    console.error('Delete case error:', error);
    return NextResponse.json<IApiResponse>({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}