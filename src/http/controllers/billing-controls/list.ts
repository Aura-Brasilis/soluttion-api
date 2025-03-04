import { makeListBillingControlUseCase } from '@/use-cases/factories/make-list-billing-control-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const getQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(100),
    orderBy: z.string().default('asc'),
    orderColumn: z.string().default('id'),
    search: z
      .string()
      .transform((val) => {
        try {
          return JSON.parse(val)
        } catch (e) {
          throw new Error('Invalid JSON format')
        }
      })
      .pipe(
        z.object({
          id: z.coerce.number().optional(),
          id_inquilino: z.coerce.number().optional(),
          id_usina: z.coerce.number().optional(),
          contrib_custeio_ip_cip: z.coerce.number().optional(),
          cpfl_inquilino: z.coerce.number().nullable().optional(),
          cred_adc_band_tarifaria: z.coerce.number().optional(),
          credito_debito: z.coerce.number().optional(),
          economia: z.coerce.number().nullable().optional(),
          incentivo_inquilino_investidor: z.coerce
            .number()
            .nullable()
            .optional(),
          inquilino_pagar: z.coerce.number().nullable().optional(),
          investidor_receber: z.coerce.number().nullable().optional(),
          kwh_ativo: z.coerce.number().nullable().optional(),
          kwh_injetado: z.coerce.number().optional(),
          kwh_minimo: z.coerce.number().optional(),
          leitura_1: z.string().nullable().optional(),
          leitura_2: z.string().nullable().optional(),
          mes: z.string().optional(),
          mes_ref: z.string().nullable().optional(),
          minimo_investidor: z.coerce.number().optional(),
          observacao: z.string().nullable().optional(),
          saldo_banco_anterior: z.coerce.number().optional(),
          saldo_banco_atual: z.coerce.number().nullable().optional(),
          tarifa_te_fv: z.coerce.number().optional(),
          tarifa_tusd_fv: z.coerce.number().optional(),
          taxa_adm_soluttion: z.coerce.number().nullable().optional(),
          total_creditado: z.coerce.number().nullable().optional(),
          total_tarifas_fv: z.coerce.number().optional(),
          mes_contrato_soluttion: z.string().optional(),
        }),
      )
      .optional(),
  })

  const { limit, orderBy, orderColumn, page, search } = getQuerySchema.parse(
    req.query,
  )

  const listBillingControlsUseCase = makeListBillingControlUseCase()

  const { billingControls } = await listBillingControlsUseCase.execute({
    pagination: { limit, orderBy, orderColumn, page, search },
  })

  return res.status(200).send({ billingControls })
}
