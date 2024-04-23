import { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";
import CustomResponse from "../models/customResponse.js";
import asyncHandler from "../utils/catchAsync.util.js";

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    createProduct = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const { manufacturerId } = req.params;
        const product = req.body;
        const productId = await this.productService.createProduct(
            manufacturerId,
            product
        );
        return res.status(200).json(
            new CustomResponse(true, "Product created successfully", {
                id: productId,
            })
        );
    });

    updateProduct = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const product = req.body;
        product.id = req.params.productId;
        const manufacturerId = req.params.manufacturerId;
        await this.productService.updateProduct(manufacturerId, product);
        return res
            .status(200)
            .json(new CustomResponse(true, "Product updated successfully", {}));
    });

    deleteProduct = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const { manufacturerId, productId } = req.params;
        await this.productService.deleteProduct(manufacturerId, productId);
        return res
            .status(200)
            .json(new CustomResponse(true, "Product deleted successfully", {}));
    });
}
