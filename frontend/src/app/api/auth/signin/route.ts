import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/db";
import { userZodSchema } from '@/db/models/user.model';

export async function POST(req: NextRequest) {
    try {
        return NextResponse.json({ hello: 'World' });
    } catch(err: any) {
        return NextResponse.json({ err })
    }
}