import { BillingControlFoundError } from '@/use-cases/errors/billing-control-not-found'
import { makeUpdateBillingControlUseCase } from '@/use-cases/factories/make-update-billing-control-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function update(req: FastifyRequest, res: FastifyReply) {
  const updateBodySchema = z.object({
    id: z.coerce.number(),
    idInquilino: z.coerce.number().optional(),
    idUsina: z.coerce.number().optional(),
    contribCusteioIpCip: z.coerce.number().optional(),
    cpflInquilino: z.coerce.number().nullable().optional(),
    credAdcBandTarifaria: z.coerce.number().optional(),
    creditoDebito: z.coerce.number().optional(),
    economia: z.coerce.number().nullable().optional(),
    incentivoInquilinoInvestidor: z.coerce.number().nullable().optional(),
    inquilinoPagar: z.coerce.number().nullable().optional(),
    investidorReceber: z.coerce.number().nullable().optional(),
    kwhAtivo: z.coerce.number().nullable().optional(),
    kwhInjetado: z.coerce.number().optional(),
    kwhMinimo: z.coerce.number().optional(),
    leitura1: z.string().nullable().optional(),
    leitura2: z.string().nullable().optional(),
    mes: z.string().optional(),
    mesRef: z.string().nullable().optional(),
    minimoInvestidor: z.coerce.number().optional(),
    observacao: z.string().nullable().optional(),
    saldoBancoAnterior: z.coerce.number().optional(),
    saldoBancoAtual: z.coerce.number().nullable().optional(),
    tarifaTeFv: z.coerce.number().optional(),
    tarifaTusdFv: z.coerce.number().optional(),
    taxaAdmSoluttion: z.coerce.number().nullable().optional(),
    totalCreditado: z.coerce.number().nullable().optional(),
    totalTarifasFv: z.coerce.number().optional(),
    mesContratoSoluttion: z.string().optional(),
  })

  const {
    id,
    contribCusteioIpCip,
    cpflInquilino,
    credAdcBandTarifaria,
    creditoDebito,
    economia,
    idInquilino,
    idUsina,
    incentivoInquilinoInvestidor,
    inquilinoPagar,
    investidorReceber,
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
    taxaAdmSoluttion,
    totalCreditado,
    totalTarifasFv,
  } = updateBodySchema.parse(req.body)

  try {
    const updateUserUseCase = makeUpdateBillingControlUseCase()

    const { billingControl } = await updateUserUseCase.execute({
      data: {
        id,
        contribCusteioIpCip,
        cpflInquilino,
        credAdcBandTarifaria,
        creditoDebito,
        economia,
        idInquilino,
        idUsina,
        incentivoInquilinoInvestidor,
        inquilinoPagar,
        investidorReceber,
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
        taxaAdmSoluttion,
        totalCreditado,
        totalTarifasFv,
      },
    })

    return res.status(200).send({ billingControl })
  } catch (err) {
    if (err instanceof BillingControlFoundError) {
      return res.status(404).send({ msg: err.message })
    }
  }
}
