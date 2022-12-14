import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const guestbookRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.guestbook.findMany({
        select: {
          name: true,
          message: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc"
        }
      })
    } catch (err) {
      console.log(err);
    }
  })
  ,
  postMessage: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        message: z.string(),
      })
  )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.guestbook.create({
          data: {
            name: input.name,
            message: input.message
          }
        })
      } catch (err) {
        console.log(err);
      }
    }),
  deleteMessage: protectedProcedure
    .input(
      z.string()
  )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.guestbook.delete({
          where: {
            id: input
          }
        })
      } catch (err) {
        console.log(err);
      }
    })
})