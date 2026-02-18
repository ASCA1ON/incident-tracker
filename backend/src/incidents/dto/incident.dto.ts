import {
  IsString,
  IsEnum,
  IsOptional,
  IsNotEmpty,
  MaxLength,
} from "class-validator";

export enum Severity {
  SEV1 = "SEV1",
  SEV2 = "SEV2",
  SEV3 = "SEV3",
  SEV4 = "SEV4",
}

export enum Status {
  OPEN = "OPEN",
  MITIGATED = "MITIGATED",
  RESOLVED = "RESOLVED",
}

export class CreateIncidentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  service: string;

  @IsEnum(Severity)
  severity: Severity;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  owner?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  summary?: string;
}

export class UpdateIncidentDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  service?: string;

  @IsEnum(Severity)
  @IsOptional()
  severity?: Severity;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  owner?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  summary?: string;
}

export class QueryIncidentsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  search?: string;

  @IsOptional()
  @IsEnum(Severity)
  severity?: Severity;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  service?: string;

  @IsOptional()
  sortBy?: string;

  @IsOptional()
  sortOrder?: "asc" | "desc";
}
