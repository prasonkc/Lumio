import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import User from '@/models/lumio'
 
// This function can be marked `async` if using `await` inside
export async function GET(req: NextRequest) {
    await connectToDB()
        try{
            const users = await User.find({}, "username")
            return NextResponse.json(users, {status:200})
        }
        catch(e){
            console.log(e)
            return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
        }
}
 