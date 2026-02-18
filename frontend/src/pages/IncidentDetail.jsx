import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { incidentsApi } from "../api/incidents";
import {
  SEVERITY_OPTIONS,
  STATUS_OPTIONS,
} from "../constants/incidents";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import toast from "react-hot-toast";

const IncidentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: incident,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["incident", id],
    queryFn: () => incidentsApi.getById(id).then((res) => res.data),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    values: incident,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => {
      const { id, createdAt, updatedAt, ...updatedData } = data;
      return incidentsApi.update(id, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["incident", id]);
      // queryClient.invalidateQueries(["incidents"]);
      toast.success("Incident updated successfully!");
    },
    onError: (error) => {
      toast.error(
        `Error updating incident: ${error.response?.data?.message || error.message}`,
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => incidentsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["incidents"]);
      toast.success("Incident deleted successfully!");
      navigate("/");
    },
    onError: (error) => {
      toast.error(
        `Error deleting incident: ${error.response?.data?.message || error.message}`,
      );
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  const handleDelete = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">
            Are you sure you want to delete this incident?
          </p>

          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 text-sm bg-gray-200 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>

            <button
              className="px-3 py-1 text-sm text-white bg-red-600 rounded"
              onClick={() => {
                deleteMutation.mutate();
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      },
    );
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Incident Details
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>
                  Created: {format(new Date(incident.createdAt), "PPpp")}
                </span>
                <span>•</span>
                <span>
                  Updated: {format(new Date(incident.updatedAt), "PPpp")}
                </span>
              </div>
            </div>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 flex items-center gap-2 px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition"
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="w-4 h-4" />
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
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
              {...register("title", { required: "Title is required" })}
              type="text"
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
              {...register("service", { required: "Service is required" })}
              type="text"
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
              {...register("owner")}
              type="text"
              placeholder="e.g., john@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Summary (Optional)
            </label>
            <textarea
              {...register("summary")}
              rows="4"
              placeholder="Detailed description of the incident..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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
              disabled={!isDirty || updateMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentDetail;
