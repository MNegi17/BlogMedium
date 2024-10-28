import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string
    },
    Variables:{
        userId:string;
    }
  }>()

  //MIDDLEWARE
   //get the header
    //verify the header
    //if header is correct we can proceed, else 403 error
  blogRouter.use("/*", async(c,next)=>{
    const header = c.req.header('Authorization') || ""   
    const user = await verify(header,"secret")
    if(user){
    //@ts-ignore
      c.set('userId',user.id);
      await next()
    }else{
      c.status(403)
      return c.json({error:"unauthorized"})
    }
  })
  
    blogRouter.post('/',async (c)=>{
        const body = await c.req.json();
        const authorId = c.get("userId")    
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate())
        
         
          const blog = await prisma.blog.create({
            data:{
              title:body.title,
              content: body.content,
              authorId:Number(authorId)
            }
          })
      return c.json({
        id:blog.id
      })
      })
  
    blogRouter.put('/',async (c)=>{

        const body = await c.req.json();
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate())
        
         
          const blog = await prisma.blog.update({
            where:{
                id:body.id
            },
            data:{
              title:body.title,
              content: body.content,
            }
          })
      return c.json({
        id:blog.id
      })
    })    
    blogRouter.get('/bulk',async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate())
        
    const blogs = await prisma.blog.findMany();
    return c.json({
        blogs
    })
  })
    blogRouter.get('/:id',async (c)=>{
        const id = c.req.param("id");
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
          }).$extends(withAccelerate())
        
         try {
            const blog = await prisma.blog.findFirst({
                where:{
                    id:Number(id)
              }})
          return c.json({
            blog
          })
         } catch (e) {
            console.log(e);
            c.status(411);
            return c.json({
                Message:"error while fetching blogpost"
            })
         }
       
      })
  
    
