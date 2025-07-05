"use client";

import * as React from "react";
import { Car, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Vehicle, UpdateVehicleRequest } from "@/types/vehicle";
import { useUpdateVehicle } from "@/lib/tanstack/vehicle-tanstack";

const editVehicleFormSchema = z.object({
  model: z.string().min(1, "Model is required"),
  year: z
    .number()
    .min(1900, "Must be a valid year")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  color: z.string().min(1, "Color is required"),
  license_plate: z.string().min(1, "License plate is required"),
  fuel_type: z.enum(["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"]),
});

type EditVehicleFormValues = z.infer<typeof editVehicleFormSchema>;

interface EditVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle;
}

export function EditVehicleDialog({
  open,
  onOpenChange,
  vehicle,
}: EditVehicleDialogProps) {
  const updateVehicleMutation = useUpdateVehicle();

  const form = useForm<EditVehicleFormValues>({
    resolver: zodResolver(editVehicleFormSchema),
    defaultValues: {
      model: vehicle.model,
      year: vehicle.year,
      color: vehicle.color || "",
      license_plate: vehicle.license_plate,
      fuel_type: vehicle.fuel_type || "GASOLINE",
    },
  });

  const onSubmit = async (data: EditVehicleFormValues) => {
    const updateData: UpdateVehicleRequest = {
      model: data.model,
      year: data.year,
      color: data.color,
      license_plate: data.license_plate,
      fuel_type: data.fuel_type,
    };

    updateVehicleMutation.mutate(
      { id: vehicle.id, vehicle: updateData },
      {
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Edit Vehicle
          </DialogTitle>
          <DialogDescription>
            Update your vehicle information. Click save when you're done.
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
                  <FormLabel>Fuel Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
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
                disabled={updateVehicleMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateVehicleMutation.isPending}>
                {updateVehicleMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
