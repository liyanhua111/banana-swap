import { publicKey, u64, u8 } from "@project-serum/borsh";
// import { IBOLayout } from "./../../models";
import { sendTransaction, useConnection } from "./../connection";
import { notify } from "./../notifications";
// import {  TOKEN_PROGRAM_ID,
//   sleep,
//   getTokenAccount,
//   createMint,
//   createTokenAccount,
//   mintToAccount  } from "../utils";
import {
  Account,
  AccountInfo,
  Connection,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";

const idoAddress = "AK9wKXPQUsL6Qzo2bEimHLsNV6f3fpAXv7cSMqQdYsa4";
export async function findAssociatedIdoInfoAddress(
  idoId: PublicKey,
  walletAddress: PublicKey,
  programId: PublicKey
) {
  const [publicKey] = await PublicKey.findProgramAddress(
    [
      idoId.toBuffer(),
      walletAddress.toBuffer(),
      new Uint8Array(Buffer.from("ido_associated_seed", "utf-8")),
    ],
    programId
  );
  return publicKey;
}

export const IBOCreate = async (
  connection: Connection,
  wallet: any,
  data: any
) => {
//   console.log(Connection, IBOLayout, "=====");
  const tokenSwapAccount = new Account();
  const [authority, nonce] = await PublicKey.findProgramAddress(
    [tokenSwapAccount.publicKey.toBuffer()],
    new PublicKey(idoAddress)
  );
  // const transaction = new Transaction()
  const signers: Account[] = []
  const owner = wallet.publicKey;
  let instructionsData: TransactionInstruction[] = [];
  // const componentsRoutA = {
  //   components: [
  //     {
  //       account: A.account,
  //       mintAddress: A.mintAddress, // @ts-ignore
  //       amount: fromInfo.amount * `1e${fromInfo.mint.decimals}`,
  //     },
  //     {
  //       mintAddress: routeAddress, // @ts-ignore
  //       amount: routeAmount * 1e9,
  //     },
  //   ],
  // };
  let cleanupInstructions: TransactionInstruction[] = [];
  let tx = await sendTransaction(
    connection,
    wallet, // @ts-ignore
    instructionsData, // @ts-ignore
    signers
  );
  notify({
    message: "Trade executed.",
    type: "success",
    description: `Transaction - ${tx}`,
  });
  // if (!pool) {
  //   throw new Error("Pool is required");
  // }
};