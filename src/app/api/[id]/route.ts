import { NextRequest, NextResponse } from "next/server"
import { getViewsById, updateViwes } from '@/database/instance'

export async function GET(req: NextRequest, context: { params : { id: number } }) {
  const { params } = context;
  const res = await getViewsById(Number(params.id));
  return NextResponse.json({
    res
  })
}

export async function POST(req: NextRequest,  context: { params : { id: number } }) {
  const { params } = context;
  const res = await updateViwes(params.id);
  return NextResponse.json({
    res
  })
}
