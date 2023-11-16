import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import z from 'zod'

export const createLog = async (req: Request, res: Response) => {
    const { time, action, effetivoId, visitanteId } = req.body;

    const schema = z.object({
        time: z.date(),
        action: z.enum(['entry', 'exit']), 
        effetivoId: z.string(), 
        visitanteId: z.string()
    })

    try {
        schema.parse(req.body)

        const log = await prisma.log.create({
            data: { 
                time,
                action,
                effetivoId,
                visitanteId
            },
        })

        return res.json(log);
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while creating Log' });
    }
}

export const getAllLogs = async (req: Request, res: Response) => {
    try {
        const logs = await prisma.log.findMany()

        return res.json(logs);
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while retrieving Logs' });
    }
}

export const getlogById = async(req: Request, res: Response) => {
  try {
    const logId = parseInt(req.params.id);

    const secretarioData = await prisma.log.findUnique({
      where: {
        id: logId,
      },
    });

    if (!secretarioData) {
      throw new Error('Access data not found');
    }

    res.json(secretarioData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteLogById = async (req: Request, res: Response) => {
    const { logId } = req.params;

    try {
        const log = await prisma.log.delete({
            where: {
                id: parseInt(logId, 10),
            },
        });

        return res.json({ message: 'Log deleted' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while deleting Log' });
    }
}