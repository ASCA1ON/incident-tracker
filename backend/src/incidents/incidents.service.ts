import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateIncidentDto,
  UpdateIncidentDto,
  QueryIncidentsDto,
} from "./dto/incident.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class IncidentsService {
  constructor(private prisma: PrismaService) {}

  async create(createIncidentDto: CreateIncidentDto) {
    return this.prisma.incident.create({
      data: createIncidentDto,
    });
  }

  async findAll(query: QueryIncidentsDto) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.IncidentWhereInput = {};

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: "insensitive" } },
        { service: { contains: query.search, mode: "insensitive" } },
        { owner: { contains: query.search, mode: "insensitive" } },
      ];
    }

    if (query.severity) {
      where.severity = query.severity;
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.service) {
      where.service = { contains: query.service, mode: "insensitive" };
    }

    const sortBy = query.sortBy || "createdAt";
    const sortOrder = query.sortOrder || "desc";

    const orderBy: Prisma.IncidentOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [incidents, total] = await Promise.all([
      this.prisma.incident.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.incident.count({ where }),
    ]);

    return {
      data: incidents,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const incident = await this.prisma.incident.findUnique({
      where: { id },
    });

    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }

    return incident;
  }

  async update(id: string, updateIncidentDto: UpdateIncidentDto) {
    try {
      return await this.prisma.incident.update({
        where: { id },
        data: updateIncidentDto,
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Incident with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.incident.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Incident with ID ${id} not found`);
      }
      throw error;
    }
  }
}
