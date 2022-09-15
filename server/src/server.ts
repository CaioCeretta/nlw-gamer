import express, { json, response } from 'express'
import cors from 'cors'
import { Prisma, PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();
app.use(express.json())
app.use(cors());

const prisma = new PrismaClient({
  log: ['query']
})

/**
 * HTTP Codes 
 * Começados em 2, Indicam algum tipo de sucesso
 * Começados em 3, Indicam redirecionamento
 * Começados em 4, Indicam erros gerados por nós
 * Começados em 5 Indicam que ocorreu um erro inesperado
 * 
 * 
 */

/** 
 * localhost:3333/ads?page=2 < após o ? são os query params, para definir o estado
 * naquele momento, geralmente usamos para filtros, paginação, ordenação e para coisas
 * não sensíveis, como senhas, por exemplo.
 * 
 * localhost:3333/ads/5 < esses são os route params, como por exemplo nesse caso o 5
 * é o route param.
 * 
 * localhost:3333/ads < o route param nao fica disponivel na url da requisição, você manda
 * pelo corpo da requisição
 * 
 */

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          Ads: true,
        }
      }
    }
  })

  return res.json(games);
});

app.post('/games/:gameId/ads', async (req, res) => {
  const gameId = req.params.gameId;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChanel: body.useVoiceChanel
    }
  })

  return res.status(201).json(ad);
})


app.get('/games/:id/ads', async (req, res, next) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChanel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  res.json(ads.map(ad => {
    return {
    ...ad,
    weekDays: ad.weekDays.split(','),
    hoursStart: convertMinutesToHourString(ad.hourStart),
    hoursEnd: convertMinutesToHourString(ad.hourEnd)
    }
  }));
})

app.get('/ads/:id/discord', async (req, res, next) => {
  const adId = req.params.id;
  
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  })

  res.json({
    discord: ad.discord
  });
  
})

app.listen(3001, () => {
  console.log('Server listening to 3001 🚀');
})