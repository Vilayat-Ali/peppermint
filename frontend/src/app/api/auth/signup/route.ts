import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/db";
import { sign } from 'jsonwebtoken';
import { userZodSchema } from '@/db/models/user.model';

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        const validatedPayload = userZodSchema.parse(payload);
        await DB.establishConnection();
        const userModel = DB.getUserModel();
        await userModel.create(validatedPayload);
        const access_token = sign(validatedPayload, process.env.ACCESS_TOKEN_SECRET as string, {
            expiresIn: '6d'
        });
        const { profileImageUrl, firstName, lastName, email } = validatedPayload;
        return NextResponse.json({ profileImageUrl, firstName, lastName, email,  access_token });
    } catch(err: any) {
        return NextResponse.json({ err })
    }
}