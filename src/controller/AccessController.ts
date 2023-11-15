import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createAccess = async (req: Request, res: Response) => {
    const { name } = req.body;

    const access = await prisma.access.create({
        data: { name },
    });

    return res.json(access);
}

export const getALLAccesses = async (req: Request, res: Response) => {

    const accesses = await prisma.access.findMany()

    return res.json(accesses);
}

export const getAccessById = async(req: Request, res: Response) => {
  try {
    const accessId = parseInt(req.params.id); // Supondo que o ID seja um número inteiro

    const secretarioData = await prisma.access.findUnique({
      where: {
        id: accessId,
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

export const patchAccess = async (req: Request, res: Response) => {

    const { accessId } = req.params;

    try {
        const updatedAccess = await prisma.access.update({
            where: {
                id: parseInt(accessId, 10), // Parse the ID to an integer
            },
            data: {
                name: req.body.name
            },
        });

        return res.json({ message: "Updated successfully", updatedAccess });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while updating access" });
    }

}

export const deleteAccessById = async (req: Request, res: Response) => {
    const { accessId } = req.params; // Assuming you pass the ID as a route parameter

    try {
        const access = await prisma.access.delete({
            where: {
                id: parseInt(accessId, 10),
            },
        });

        if (access) {
            return res.json({ message: "Access deleted" });
        } else {
            return res.status(404).json({ message: "Access not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while deleting access" });
    }
}