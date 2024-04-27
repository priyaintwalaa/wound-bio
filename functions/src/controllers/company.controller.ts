import { Request, Response } from "express";
import CompanyService from "../services/comapny.services.js";
import { User } from "../models/user.js";
import CustomResponse from "../models/customResponse.js";
import UserService from "../services/user.service.js";
import { UserMapper } from "../mappers/user.mapper.js";
import asyncHandler from "../utils/catchAsync.util.js";
import { Company } from "../models/company.js";

export class CompanyController {
    private companyService: CompanyService;
    private userService: UserService;

    constructor() {
        this.companyService = new CompanyService();
        this.userService = new UserService();
    }

    createCompany = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const company = req.body;
        company.id = await this.companyService.createCompany(company);
        return res
            .status(200)
            .json(
                new CustomResponse(true, "Company created", { id: company.id })
            );
    });

    getCompany = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.params,"req.params");
        const company: Company = await this.companyService.getCompnayById(
            req.params.companyId
        );
        // const userMapper = new UserMapper();
        // const userResponse = userMapper.generateUserResponse(company);
        return res.status(200).json(new CustomResponse(true, null, company));
    });

    updateCompany = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const company = req.body;
        company.id = req.params.companyId;
        await this.companyService.updateCompany(company);
        return res
            .status(200)
            .json(new CustomResponse(true, "Company updated", {}));
    });

    deleteCompany = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const companyId = req.params.companyId;
        await this.companyService.deleteCompany(companyId);
        return res
            .status(200)
            .json(new CustomResponse(true, "Company deleted", {}));
    });

    createCompanyUser = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const user: User = req.body;
        user.companyId = req.params.companyId;
        const { id, password } = await this.userService.createUser(user);
        console.log(id,"id");
        user.id = id;
        await this.userService.sendCredsEmailToUser({
            firstname: user.firstname,
            lastname: user.lastname,
            toEmailAddress: user.email,
            password,
        });
        console.log("hello");
        const userMapper = new UserMapper();
        const userResponse = userMapper.generateUserResponse(user);
        return res.status(200).json(
            new CustomResponse(true, "Company user created", {
                user: userResponse,
            })
        );
    });

    updateCompanyUser = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const user: User = req.body;
        user.id = req.params.userId;
        user.companyId = req.params.companyId;
        await this.userService.updateUser(user);
        return res
            .status(200)
            .json(new CustomResponse(true, "Company user updated", {}));
    });

    deleteCompanyUser = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const user: User = req.body;
        user.id = req.params.userId;
        user.companyId = req.params.companyId;
        await this.userService.deleteUser(user.id);
        return res
            .status(200)
            .json(new CustomResponse(true, "Company user deleted", { user }));
    });
}
