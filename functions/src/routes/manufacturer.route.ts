import express, { Router } from "express";
import { ManufacturerController } from "../controllers/manufacturer.controller.js";
import { ProductController } from "../controllers/product.controller.js";

const manufacturerRouter: Router = express.Router();
const manufacturerController: ManufacturerController =
    new ManufacturerController();
const productController: ProductController = new ProductController();

manufacturerRouter.post("/", manufacturerController.createManufacturer);
manufacturerRouter.put("/:id", manufacturerController.updateManufacturer);
manufacturerRouter.delete("/:id", manufacturerController.deleteManufacturer);
manufacturerRouter.post(
    "/:manufacturerId/product",
    productController.createProduct
);
manufacturerRouter.put(
    "/:manufacturerId/product/:productId",
    productController.updateProduct
);
manufacturerRouter.delete(
    "/:manufacturerId/product/:productId",
    productController.deleteProduct
);

export default manufacturerRouter;
