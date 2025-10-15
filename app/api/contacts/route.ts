import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import User from '@/models/lumio'
 
// This function can be marked `async` if using `await` inside
export default async function route(req: NextRequest) {
    await connectToDB()
    if(req.method == "GET"){
        try{
            const users = await User.find({}, "name")
            return NextResponse.json({users})
        }
        catch(e){
            console.log(e)
        }
    }else{
        console.log("Wrong method call")
    }
}
 