import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createVisitante = async (req: Request, res: Response) => {
    const { nome, cpf, placa, email, telefone, ft, qrCodeBase64, ativo, parentesco } = req.body;

    try {
        const visitante = await prisma.visitante.create({
            data: { nome, cpf, placa, email, telefone, ft, qrCodeBase64, ativo, parentesco },
        });

        return res.json(visitante);
    } catch (error) {
        console.error('Erro ao gerar QRCode e converter para base64:', error);1
        return res.status(500).json({ message: "Erro ao criar visitante" });
    }
};

export const getALLVisitante = async (req: Request, res: Response) => {
    const visitante = await prisma.visitante.findMany()

    return res.json(visitante);
}

export const getVisitanteById = async(req: Request, res: Response) => {
  try {
    const visitanteId = parseInt(req.params.id); // Supondo que o ID seja um número inteiro

    const secretarioData = await prisma.visitante.findUnique({
      where: {
        id: visitanteId,
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

export const patchVisitante = async (req: Request, res: Response) => {

    const { visitanteId } = req.params;

    try {
        const updatedVisitante = await prisma.visitante.update({
            where: {
                id: parseInt(visitanteId, 10), // Parse the ID to an integer
            },
            data: {
                nome: req.body.nome,
                cpf: req.body.cpf,
                placa: req.body.placa,
                email: req.body.email,
                telefone: req.body.telefone,
                ft: req.body.ft,
            },
        });

        return res.json({ message: "Updated successfully", updatedVisitante });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while updating Visitante" });
    }

}

export const deleteVisitanteById = async (req: Request, res: Response) => {
    const { visitanteId } = req.params; // Assuming you pass the ID as a route parameter

    try {
        const visitante = await prisma.visitante.delete({
            where: {
                id: parseInt(visitanteId, 10),
            },
        });

        if (visitante) {
            return res.json({ message: "Visitante deleted" });
        } else {
            return res.status(404).json({ message: "Visitante not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while deleting Visitante" });
    }
}