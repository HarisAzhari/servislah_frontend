"use client";

import * as React from "react";
import { Car, Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateVehicleRequest } from "@/types/vehicle";
import { useCreateVehicle } from "@/lib/tanstack/vehicle-tanstack";
import { useAuthTanstack } from "@/lib/tanstack/auth-tanstack";
import { toast } from "sonner";

const addVehicleFormSchema = z.object({
  model: z.string().min(1, "Model is required"),
  year: z
    .number()
    .min(1900, "Must be a valid year")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  color: z.string().min(1, "Color is required"),
  license_plate: z.string().min(1, "License plate is required"),
  fuel_type: z.enum(["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"]).optional(),
});

type AddVehicleFormValues = z.infer<typeof addVehicleFormSchema>;

interface AddVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddVehicleDialog({
  open,
  onOpenChange,
}: AddVehicleDialogProps) {
  const createVehicleMutation = useCreateVehicle();
  const { user } = useAuthTanstack();

  const form = useForm<AddVehicleFormValues>({
    resolver: zodResolver(addVehicleFormSchema),
    defaultValues: {
      model: "",
      year: new Date().getFullYear(),
      color: "",
      license_plate: "",
      fuel_type: undefined,
    },
  });

  const onSubmit = async (data: AddVehicleFormValues) => {
    if (!user?.id) {
      console.error("User ID is required");
      return;
    }

    const createData: CreateVehicleRequest = {
      user_id: user.id,
      model: data.model,
      year: data.year,
      color: data.color,
      license_plate: data.license_plate,
      ...(data.fuel_type && { fuel_type: data.fuel_type }),
    };

    console.log("=== CREATE VEHICLE REQUEST ===");
    console.log("Form data:", data);
    console.log("User ID:", user.id);
    console.log("Final request payload:", JSON.stringify(createData, null, 2));
    console.log("===============================");

    createVehicleMutation.mutate(createData, {
      onSuccess: (response) => {
        console.log("=== CREATE VEHICLE SUCCESS ===");
        console.log("Response:", response);
        console.log("===============================");
        toast.success("Vehicle added successfully!");
        onOpenChange(false);
        form.reset();
      },
      onError: (error) => {
        console.error("=== CREATE VEHICLE ERROR ===");
        console.error("Error:", error);
        console.error("Error message:", error.message);
        console.error("Error response:", error.response?.data);
        console.error("============================");

        // Extract the error message from the API response
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to add vehicle";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Add New Vehicle
          </DialogTitle>
          <DialogDescription>
            Add a new vehicle to your fleet. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Toyota Camry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="2024"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || "")
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., White" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="license_plate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Plate</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ABC123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fuel_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuel Type (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GASOLINE">⛽ Gasoline</SelectItem>
                      <SelectItem value="DIESEL">🛢️ Diesel</SelectItem>
                      <SelectItem value="ELECTRIC">⚡ Electric</SelectItem>
                      <SelectItem value="HYBRID">🔋 Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={createVehicleMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createVehicleMutation.isPending}>
                {createVehicleMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Vehicle
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// Button component for triggering the add vehicle dialog
export function AddVehicleButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Add New Vehicle
          </DialogTitle>
          <DialogDescription>
            Add a new vehicle to your fleet. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <AddVehicleDialog open={open} onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
