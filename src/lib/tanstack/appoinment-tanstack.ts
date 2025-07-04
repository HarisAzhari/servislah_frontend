import { useMutation, useQuery } from "@tanstack/react-query";
import { createAppointment, deleteAppointment, getAppointmentById, getAppointments, updateAppointment } from "../services/appoinment.service";
import { CreateAppointmentRequest, QueryAppoinmentRequest, UpdateAppointmentRequest } from "@/types/appointment";
import { DEFAULT_TOKEN } from "../constant";
import { toast } from "sonner";
import { useAuthTanstack } from "./auth-tanstack";
import { useRouter } from "next/navigation";

export const useCreateAppointment = () => {
    const { user } = useAuthTanstack()
    const router = useRouter()

    return useMutation({
        mutationFn: async (appointment: CreateAppointmentRequest) => {
            if (!user) {
                throw new Error('User are not authenticated');
            }
            appointment.user_id = user.id
            const respones = await createAppointment(user?.backend_tokens.access_token || '', appointment)
            return respones
        },
        onSuccess: () => {
            toast.success('Appointment created successfully');
            router.push('/dashboard');
        },
        onError: () => {
            toast.error('Failed to create appointment');
        },
    });
}

export const useUpdateAppointment = () => {
    const { user } = useAuthTanstack()

    return useMutation({
        mutationFn: async (variables: { id: string, appointment: UpdateAppointmentRequest }) => {
            if (!user) {
                throw new Error('User are not authenticated');
            }
            const respones = await updateAppointment(user?.backend_tokens.access_token || '', variables.id, variables.appointment)
            return respones
        },
        onSuccess: () => {
            toast.success('Appointment updated successfully');
        },
        onError: () => {
            toast.error('Failed to update appointment');
        },
    });
}

export const useDeleteAppointment = () => {
    const { user } = useAuthTanstack()
    return useMutation({
        mutationFn: async (id: string) => {
            if (!user) {
                throw new Error('User are not authenticated');
            }
            const respones = await deleteAppointment(user?.backend_tokens.access_token || '', id)
            return respones
        },
        onSuccess: () => {
            toast.success('Appointment deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete appointment');
        },
    });
}

export const useGetAppointments = (query: QueryAppoinmentRequest) => {
    const { user } = useAuthTanstack()
    return useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const response = await getAppointments(user?.backend_tokens.access_token || '', { ...query, user_id: user?.id })
            console.log('response', response)
            return response
        },
    });
}



export const useGetAppointmentById = (id: string) => {
    const { user } = useAuthTanstack()
    return useQuery({
        queryKey: ['appointment', id],
        queryFn: async () => {
            const response = await getAppointmentById(user?.backend_tokens.access_token || '', id)
            return response
        },
    });
}