import { FastifyInstance } from "fastify"
import Moralis from "moralis"
import zod from "zod"

export async function BalanceRoutes(app: FastifyInstance) {
  app.get("/ether/:address", async (req, reply) => {
    const getETHBalanceParamsSchema = zod.object({
      address: zod.string().startsWith("0x").trim(),
    })

    const params = getETHBalanceParamsSchema.safeParse(req.params)

    if (!params.success) {
      return reply.status(400).send(params.error.format().address?._errors[0])
    }

    const { address } = params.data

    try {
      const ethBalance = await Moralis.EvmApi.balance.getNativeBalance({
        chain: Moralis.EvmUtils.EvmChain.ETHEREUM,
        address,
      });
  
      const formattedBalance = ethBalance.result.balance.ether
  
      return {
        balance: formattedBalance
      }
    } catch (err) {
      return reply.status(400).send(err)
    } 
  })

  app.get("/:address", async (req, reply) => {
    const getSpecificTokenBalanceParamsSchema = zod.object({
      address: zod.string().startsWith("0x").trim(),
    })

    const getSpecificTokenBalanceQuerySchema = zod.object({
      token: zod.string().startsWith("0x").trim(),
    })

    const params = getSpecificTokenBalanceParamsSchema.safeParse(req.params)
    const query = getSpecificTokenBalanceQuerySchema.safeParse(req.query)


    if (!params.success) {
      return reply.status(400).send(params.error.format().address?._errors[0])
    }

    if (!query.success) {
      return reply.status(400).send(query.error.format().token?._errors[0])
    }

    const { address } = params.data
    const { token } = query.data

    const tokenBalance = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain: Moralis.EvmUtils.EvmChain.ETHEREUM,
      tokenAddresses: [token]
    })

    const formattedTokenBalance = tokenBalance.result[0]

    return {
      balance: formattedTokenBalance
    }
  })
}