
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";


export const CreateUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        picture:v.string(),
        uid:v.string()
    },
    handler:async(ctx,args)=>{
       console.log("CreateUser called with args:", args);
       //user hai kya pehlese check kar karr
       const user=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect()
       console.log("Existing user check result:", user)
       //agar user nahi toh
       if(user?.length==0)
       {
        const result = await ctx.db.insert('users',{
            name:args.name,
            picture:args.picture,
            email:args.email,
            uid:args.uid,
            token:50000
        }) ;
        console.log("New user created with result:", result);
        return result;
       }
       // Return existing user ID if user already exists
       console.log("Returning existing user ID:", user[0]._id);
       return user[0]._id;
    }
})


export const GetUser=query({
    args:{
       email:v.string()
    },
    handler:async(ctx,args)=>{
        console.log("GetUser called with email:", args.email);
        const user=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect()
        console.log("GetUser result:", user[0]);
        return user[0];
    }
})

export const UpdateTokens=mutation({
    args:{
        token:v.number(),
        userId:v.id('users')
    },
    handler:async(ctx,args)=>{
        console.log("UpdateTokens called with:", args);
        const result=await ctx.db.patch('users',args.userId,{
            token:args.token
        });
        console.log("UpdateTokens result:", result);
        return result;
    }
})