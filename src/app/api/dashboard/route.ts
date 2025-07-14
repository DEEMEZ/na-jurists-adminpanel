// app/api/admin/dashboard/route.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import connectToDatabase from '@/lib/db';
import Case from '@/models/Case';
import { IApiResponse, IDashboardStats } from '@/types';

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

    const totalCases = await Case.countDocuments();
    const recentCases = await Case.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('createdBy', 'name email');

    const stats: IDashboardStats = {
      totalCases,
      recentCases
    };

    return NextResponse.json<IApiResponse>({
        success: true,
        data: stats,
        message: ''
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json<IApiResponse>({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}