export const SEVERITY = {
  SEV1: "SEV1",
  SEV2: "SEV2",
  SEV3: "SEV3",
  SEV4: "SEV4",
};

export const STATUS = {
  OPEN: "OPEN",
  MITIGATED: "MITIGATED",
  RESOLVED: "RESOLVED",
};

export const SEVERITY_OPTIONS = [
  { value: "SEV1", label: "SEV1", color: "bg-red-100 text-red-800" },
  { value: "SEV2", label: "SEV2", color: "bg-orange-100 text-orange-800" },
  { value: "SEV3", label: "SEV3", color: "bg-yellow-100 text-yellow-800" },
  { value: "SEV4", label: "SEV4", color: "bg-blue-100 text-blue-800" },
];

export const STATUS_OPTIONS = [
  { value: "OPEN", label: "Open", color: "bg-red-100 text-red-800" },
  {
    value: "MITIGATED",
    label: "Mitigated",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "RESOLVED",
    label: "Resolved",
    color: "bg-green-100 text-green-800",
  },
];

export const getSeverityColor = (severity) => {
  const option = SEVERITY_OPTIONS.find((opt) => opt.value === severity);
  return option?.color || "bg-gray-100 text-gray-800";
};

export const getStatusColor = (status) => {
  const option = STATUS_OPTIONS.find((opt) => opt.value === status);
  return option?.color || "bg-gray-100 text-gray-800";
};
