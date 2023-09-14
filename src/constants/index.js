import { z } from 'zod'
import dayjs from 'dayjs'

const dateFormat = 'MM-DD-YYYY'

const validationSchema = z
  .object({
    name: z.string().min(1, { message: 'Le nom est requis' }),
    comment: z.any(),
    type: z.string({ required_error: 'Le type est requis' }),
    service: z.string({ required_error: 'Le service est requis' }),
    contact: z.string({ required_error: 'Un contact est requis' }),
    date: z.string({ required_error: 'La date est requise' }),
    time: z.any(),
  })
  .refine(
    (data) => {
      return dayjs(data.time.start).isBefore(data.time.end, 'hour')
    },
    {
      path: ['time'],
      message: 'Le début du temps ne peut pas avoir lieu après la fin du temps',
    }
  )

export { dateFormat, validationSchema }
