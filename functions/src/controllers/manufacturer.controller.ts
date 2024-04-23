import CustomResponse from "../models/customResponse.js";
import { Manufacturer } from "../models/manufacturer.js";
import { ManufacturerService } from "../services/manufacturer.service.js";
import { Request, Response } from "express";
import asyncHandler from "../utils/catchAsync.util.js";

export class ManufacturerController {
    private manufacturerService: ManufacturerService;

    constructor() {
        this.manufacturerService = new ManufacturerService();
    }

    createManufacturer = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const manufacturer: Manufacturer = req.body;
        manufacturer.id =
            await this.manufacturerService.createManufacturer(manufacturer);
        return res.status(200).json(
            new CustomResponse(true, "created successfully", {
                id: manufacturer.id,
            })
        );
    });

    updateManufacturer = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const manufacturer: Manufacturer = req.body;
        manufacturer.id = req.params.id;
        await this.manufacturerService.updateManufacturer(manufacturer);
        return res
            .status(200)
            .json(new CustomResponse(true, "Updated successfully", {}));
    });

    // updateManufacturerStatus = async (req: Request, res: Response) => {
    //     try {
    //         console.log(req.body);
    //         let role: Manufacturer = req.body;
    //         role.id = req.params.id;
    //         role. = req.body.isActive;
    //         await this.roleService.updateManufacturerStatus(role);
    //         return res.status(200).json("Done");
    //     } catch (err:any) {
    //         throw err;
    //     }
    // }

    deleteManufacturer = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const manufacturerId = req.params.id;
        await this.manufacturerService.deleteManufacturer(manufacturerId);
        return res
            .status(200)
            .json(new CustomResponse(true, "Deleted successfully", {}));
    });
}
