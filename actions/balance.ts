import { db } from "@/lib/db";

export const getBalance = async (userId: string): Promise<number> => {
  try {
    const user = await db.wallet.findUnique({
      where: {
        userId: userId,
      },
      select: {
        balance: true,
      }
    });

    if (user) {
      return user.balance;
    } else {
      // User not found, create a new user with a default balance of 0
      const newUser = await db.wallet.create({
        data: {
          userId: userId,
          balance: 0,
        },
        select: {
          balance: true,
        }
      });

      return newUser.balance;
    }
  } catch (error) {
    console.error("[GET_BALANCE]", error);
    return 0;
  }
}


