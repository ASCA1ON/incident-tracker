import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Plus } from "lucide-react";
import { incidentsApi } from "../api/incidents";
import { SEVERITY_OPTIONS, STATUS_OPTIONS } from "../constants/incidents";
import toast from "react-hot-toast";

const CreateIncident = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      severity: "SEV3",
      status: "OPEN",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => incidentsApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["incidents"]);
      toast.success("Successfully Created");
      navigate(`/`);
    },
    onError: (error) => {
      toast.error(
        `Error creating incident: ${error.response?.data?.message || error.message}`,
      );
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Incidents
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Incident
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 255,
                  message: "Title must be less than 255 characters",
                },
              })}
              type="text"
              placeholder="Brief description of the incident"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service *
            </label>
            <input
              {...register("service", {
                required: "Service is required",
                maxLength: {
                  value: 100,
                  message: "Service name must be less than 100 characters",
                },
              })}
              type="text"
              placeholder="e.g., Auth Service, Payment Service"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.service && (
              <p className="mt-1 text-sm text-red-600">
                {errors.service.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity *
              </label>
              <select
                {...register("severity", { required: "Severity is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {SEVERITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.severity && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.severity.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                {...register("status", { required: "Status is required" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner (Optional)
            </label>
            <input
              {...register("owner", {
                maxLength: {
                  value: 255,
                  message: "Owner must be less than 255 characters",
                },
              })}
              type="text"
              placeholder="e.g., john@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.owner && (
              <p className="mt-1 text-sm text-red-600">
                {errors.owner.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Summary (Optional)
            </label>
            <textarea
              {...register("summary", {
                maxLength: {
                  value: 1000,
                  message: "Summary must be less than 1000 characters",
                },
              })}
              rows="4"
              placeholder="Detailed description of the incident..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.summary && (
              <p className="mt-1 text-sm text-red-600">
                {errors.summary.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Link
              to="/"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              {createMutation.isPending ? "Creating..." : "Create Incident"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIncident;
