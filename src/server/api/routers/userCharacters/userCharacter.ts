import { router, protectedProcedure } from '@/server/api/trpc';
import {
  userCharacterSchemaWithRefine,
  updateCharacterSchema,
  deleteSchema,
} from './validation';
import { TRPCError } from '@trpc/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const userCharacterRoutes = router({
  /**
   * Queries
   */
  getAllChars: protectedProcedure.query(async ({ ctx }) => {
    try {
      return ctx.db.userCharacter.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error has occurred',
        cause: error,
      });
    }
  }),
  /**
   * Mutations
   */
  createUserCharacter: protectedProcedure
    .input(userCharacterSchemaWithRefine)
    .mutation(async ({ ctx, input }) => {
      try {
        const usersCharactersList = await ctx.db.user.findFirst({
          where: { id: ctx.session.user.id },
          select: {
            UserCharacter: { where: { name: input.name } },
          },
        });

        if (
          !!usersCharactersList?.UserCharacter.length &&
          usersCharactersList?.UserCharacter.length > 0
        ) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Character already exists',
          });
        } else {
          const result = await ctx.db.userCharacter.create({
            data: { ...input, userId: ctx.session.user.id },
          });
          return { char: result, message: `Character ${input.name} created successfully` };
        }
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An internal server error occurred',
          cause: error,
        });
      }
    }),
  updateUserCharacter: protectedProcedure
    .input(updateCharacterSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.db.userCharacter.update({
          where: { id: input.id },
          data: { ...input },
        });
        return { char: result, message: `Character ${input.name} updated successfully` };
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'The Character does not exist',
            cause: error,
          });
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An internal server error occurred',
          cause: error,
        });
      }
    }),
  deleteUserCharacter: protectedProcedure
    .input(deleteSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.db.userCharacter.delete({
          where: { id: input.id },
        });
        return { char: result, message: `Character ${result.name} deleted successfully` };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An internal server error occurred',
          cause: error,
        });
      }
    }),
});
