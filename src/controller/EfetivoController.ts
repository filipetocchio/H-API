import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";


export const createEfetivo = async (req: Request, res: Response) => {
    const { nome, nomeDeGuerra, saram, placa, patente, email, password, telefone, ft, qrCodeBase64, accessName } = req.body;

    const isEfetivoUniqueEmail = await prisma.efetivo.findUnique({
        where: {
            email
        }
    })

    const isAccesName = await prisma.access.findUnique({
        where: {
            name: accessName
        }
    })


    if (isEfetivoUniqueEmail) {
        return res.status(400).json({message: ""})
    }

    if (!isAccesName) {
        return res.status(400).json({message: ""})
    }

    const hashPassword = await hash(password, 8)

    try {
        const efetivo = await prisma.efetivo.create({
            data: { nome, nomeDeGuerra, saram, placa, patente, email, password: hashPassword, telefone, ft, qrCodeBase64, access: {
                connect: {
                    name: accessName
                }
            } },
        });

        return res.json(efetivo);
    } catch (error) {
        console.error('Erro ao gerar QRCode e converter para base64:', error);1
        return res.status(500).json({ message: "Erro ao criar efetivo" });
    }
};

export const getALLEfetivos = async (req: Request, res: Response) => {

    const efetivos = await prisma.efetivo.findMany()

    return res.json(efetivos);
}

export const getEfetivoById = async(req: Request, res: Response) => {
  try {
    const efetivoId = parseInt(req.params.id); // Supondo que o ID seja um número inteiro

    const secretarioData = await prisma.efetivo.findUnique({
      where: {
        id: efetivoId,
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

export const patchEfetivo = async (req: Request, res: Response) => {

    const { efetivoId } = req.params;

    try {
        const updatedEfetivo = await prisma.efetivo.update({
            where: {
                id: parseInt(efetivoId, 10), // Parse the ID to an integer
            },
            data: {
                nome: req.body.nome,
                nomeDeGuerra: req.body.nomeDeGuerra,
                saram: req.body.saram,
                placa: req.body.placa,
                patente: req.body.patente,
                email: req.body.email,
                password: req.body.password,
                telefone: req.body.telefone,
                ft: req.body.ft
            },
        });

        return res.json({ message: "Updated successfully", updatedEfetivo });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while updating efetivo" });
    }

}

export const deleteEfetivoById = async (req: Request, res: Response) => {
    const { efetivoId } = req.params; // Assuming you pass the ID as a route parameter

    try {
        const efetivo = await prisma.efetivo.delete({
            where: {
                id: parseInt(efetivoId, 10),
            },
        });

        if (efetivo) {
            return res.json({ message: "efetivo deleted" });
        } else {
            return res.status(404).json({ message: "efetivo not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while deleting efetivo" });
    }
}