import { makeCreateBillingControlUseCase } from '@/use-cases/factories/make-create-billing-control-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createBodySchema = z.object({
    idInquilino: z.coerce.number(),
    idUsina: z.coerce.number(),
    contribCusteioIpCip: z.coerce.number(),
    credAdcBandTarifaria: z.coerce.number(),
    creditoDebito: z.coerce.number(),
    economia: z.coerce.number().nullable().default(null),
    kwhAtivo: z.coerce.number().nullable().default(null),
    kwhInjetado: z.coerce.number(),
    kwhMinimo: z.coerce.number(),
    leitura1: z.string().nullable().default(null),
    leitura2: z.string().nullable().default(null),
    mes: z.string(),
    mesRef: z.string().nullable().default(null),
    minimoInvestidor: z.coerce.number(),
    observacao: z.string().nullable().default(null),
    saldoBancoAnterior: z.coerce.number(),
    saldoBancoAtual: z.coerce.number().nullable().default(null),
    tarifaTeFv: z.coerce.number(),
    tarifaTusdFv: z.coerce.number(),
    mesContratoSoluttion: z.string(),
  })

  const {
    contribCusteioIpCip,
    credAdcBandTarifaria,
    creditoDebito,
    economia,
    idInquilino,
    idUsina,
    kwhAtivo,
    kwhInjetado,
    kwhMinimo,
    leitura1,
    leitura2,
    mes,
    mesContratoSoluttion,
    mesRef,
    minimoInvestidor,
    observacao,
    saldoBancoAnterior,
    saldoBancoAtual,
    tarifaTeFv,
    tarifaTusdFv,
  } = createBodySchema.parse(req.body)

  const createBillingControlsUseCase = makeCreateBillingControlUseCase()

  const { billingControl } = await createBillingControlsUseCase.execute({
    contribCusteioIpCip,
    credAdcBandTarifaria,
    creditoDebito,
    economia,
    idInquilino,
    idUsina,
    kwhAtivo,
    kwhInjetado,
    kwhMinimo,
    leitura1,
    leitura2,
    mes,
    mesContratoSoluttion,
    mesRef,
    minimoInvestidor,
    observacao,
    saldoBancoAnterior,
    saldoBancoAtual,
    tarifaTeFv,
    tarifaTusdFv,
  })

  return res.status(200).send({ billingControl })
}
