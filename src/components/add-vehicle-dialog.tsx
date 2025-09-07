"use client";

import * as React from "react";
import {
  Car,
  Loader2,
  Plus,
  Upload,
  Camera,
  X,
  Check,
  Sparkles,
  Zap,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

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
  images: z.array(z.string()).optional(),
});

type AddVehicleFormValues = z.infer<typeof addVehicleFormSchema>;

// Popular car models for suggestions
const POPULAR_CAR_MODELS = [
  "Toyota Camry",
  "Honda Civic",
  "Ford F-150",
  "Chevrolet Silverado",
  "Honda Accord",
  "Toyota Corolla",
  "Nissan Altima",
  "Ford Explorer",
  "BMW X3",
  "Mercedes-Benz C-Class",
  "Audi A4",
  "Lexus RX",
  "Tesla Model 3",
  "Tesla Model Y",
  "Hyundai Elantra",
  "Kia Forte",
];

const POPULAR_COLORS = [
  { name: "White", value: "white", hex: "#FFFFFF" },
  { name: "Black", value: "black", hex: "#000000" },
  { name: "Silver", value: "silver", hex: "#C0C0C0" },
  { name: "Gray", value: "gray", hex: "#808080" },
  { name: "Red", value: "red", hex: "#DC2626" },
  { name: "Blue", value: "blue", hex: "#2563EB" },
  { name: "Green", value: "green", hex: "#16A34A" },
  { name: "Yellow", value: "yellow", hex: "#EAB308" },
];

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
  const [currentStep, setCurrentStep] = React.useState(1);
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [modelSuggestions, setModelSuggestions] = React.useState<string[]>([]);
  const [showModelSuggestions, setShowModelSuggestions] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<AddVehicleFormValues>({
    resolver: zodResolver(addVehicleFormSchema),
    defaultValues: {
      model: "",
      year: new Date().getFullYear(),
      color: "",
      license_plate: "",
      fuel_type: undefined,
      images: [],
    },
  });

  // Image handling functions
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setUploadedImages((prev) => [...prev, result]);
          form.setValue("images", [
            ...(form.getValues("images") || []),
            result,
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    form.setValue("images", newImages);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files);
  };

  // Model suggestions
  const handleModelChange = (value: string) => {
    const suggestions = POPULAR_CAR_MODELS.filter((model) =>
      model.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 5);
    setModelSuggestions(suggestions);
    setShowModelSuggestions(value.length > 0 && suggestions.length > 0);
  };

  const selectModelSuggestion = (model: string) => {
    form.setValue("model", model);
    setShowModelSuggestions(false);
  };

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!open) {
      form.reset();
      setCurrentStep(1);
      setUploadedImages([]);
      setShowModelSuggestions(false);
    }
  }, [open, form]);

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
      ...(data.images && data.images.length > 0 && { images: data.images }),
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
        toast.success("🎉 Vehicle added successfully! Welcome to the garage!");
        onOpenChange(false);
        form.reset();
        setCurrentStep(1);
        setUploadedImages([]);
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
      <DialogContent className="sm:max-w-[1000px] max-h-[95vh] overflow-hidden p-0">
        {/* Compact Gradient Header */}
        <div className="relative bg-gradient-to-br from-[#363DFF] to-[#4F46E5] text-white p-6 pb-8">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-white/10 rounded-full"></div>
            <div className="absolute top-4 -left-4 w-12 h-12 bg-white/5 rounded-full"></div>
            <Sparkles className="absolute top-2 right-12 w-5 h-5 text-white/30 animate-pulse" />
            <Car
              className="absolute bottom-2 right-6 w-8 h-8 text-white/20 animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="relative z-10">
            <DialogHeader className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Car className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-white">
                Add Your Vehicle
              </DialogTitle>
              <DialogDescription className="text-white/90 text-base max-w-md mx-auto">
                Let's get your ride registered! Quick and easy. ✨
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="px-6 py-4 max-h-[calc(95vh-180px)] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column: Vehicle Photos */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#363DFF] to-[#4F46E5] rounded-full flex items-center justify-center text-white font-bold text-xs">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Vehicle Photos
                    </h3>
                    <div className="text-xs text-gray-500">(Optional)</div>
                  </div>

                  {/* Compact Image Upload Area */}
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 ${
                      isDragging
                        ? "border-[#363DFF] bg-blue-50"
                        : "border-gray-300 hover:border-[#363DFF] hover:bg-gray-50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                    />

                    <div className="space-y-3">
                      <div className="mx-auto w-12 h-12 bg-gradient-to-br from-[#363DFF] to-[#4F46E5] rounded-full flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          Upload Vehicle Photos
                        </h4>
                        <p className="text-xs text-gray-600 mb-3">
                          Drag & drop or click to browse
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="border-[#363DFF] text-[#363DFF] hover:bg-[#363DFF] hover:text-white"
                        >
                          <Upload className="w-3 h-3 mr-1" />
                          Choose Photos
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Compact Uploaded Images Preview */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Vehicle ${index + 1}`}
                            className="w-full h-16 object-cover rounded border border-gray-200 group-hover:border-[#363DFF] transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Vehicle Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#363DFF] to-[#4F46E5] rounded-full flex items-center justify-center text-white font-bold text-xs">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Vehicle Information
                    </h3>
                  </div>

                  {/* Vehicle Model with Suggestions */}
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel className="text-sm font-semibold text-gray-900">
                          Vehicle Model *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="e.g., Toyota Camry, BMW X3"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleModelChange(e.target.value);
                              }}
                              onFocus={() => handleModelChange(field.value)}
                              className="text-sm py-2 pl-10 border border-gray-200 focus:border-[#363DFF] focus:ring-[#363DFF]"
                            />
                            <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </FormControl>

                        {/* Model Suggestions */}
                        {showModelSuggestions && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-32 overflow-y-auto">
                            {modelSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() =>
                                  selectModelSuggestion(suggestion)
                                }
                                className="w-full text-left px-3 py-2 hover:bg-blue-50 hover:text-[#363DFF] transition-colors border-b border-gray-100 last:border-b-0 text-sm"
                              >
                                <div className="flex items-center gap-2">
                                  <Car className="w-3 h-3 text-gray-400" />
                                  {suggestion}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Year and License Plate Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-900">
                            Year *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="2024"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || "")
                              }
                              className="text-sm py-2 border border-gray-200 focus:border-[#363DFF] focus:ring-[#363DFF]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="license_plate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-900">
                            License Plate *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ABC123"
                              {...field}
                              className="text-sm py-2 border border-gray-200 focus:border-[#363DFF] focus:ring-[#363DFF] uppercase"
                              onChange={(e) =>
                                field.onChange(e.target.value.toUpperCase())
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Color Picker */}
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">
                          Color *
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input
                              placeholder="e.g., White, Black, Silver"
                              {...field}
                              className="text-sm py-2 border border-gray-200 focus:border-[#363DFF] focus:ring-[#363DFF]"
                            />
                            {/* Compact Popular Colors */}
                            <div className="flex flex-wrap gap-1">
                              {POPULAR_COLORS.slice(0, 6).map((color) => (
                                <button
                                  key={color.value}
                                  type="button"
                                  onClick={() => field.onChange(color.name)}
                                  className={`group flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium transition-all ${
                                    field.value?.toLowerCase() ===
                                    color.name.toLowerCase()
                                      ? "border-[#363DFF] bg-blue-50 text-[#363DFF]"
                                      : "border-gray-200 hover:border-[#363DFF] hover:bg-blue-50"
                                  }`}
                                >
                                  <div
                                    className="w-2 h-2 rounded-full border border-gray-300"
                                    style={{ backgroundColor: color.hex }}
                                  ></div>
                                  {color.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Fuel Type */}
                  <FormField
                    control={form.control}
                    name="fuel_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-900">
                          Fuel Type
                          <span className="text-xs font-normal text-gray-500 ml-1">
                            (Optional)
                          </span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-sm py-2 border border-gray-200 focus:border-[#363DFF] focus:ring-[#363DFF]">
                              <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="GASOLINE" className="py-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">⛽</span>
                                <span className="font-medium text-sm">
                                  Gasoline
                                </span>
                              </div>
                            </SelectItem>
                            <SelectItem value="DIESEL" className="py-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">🛢️</span>
                                <span className="font-medium text-sm">
                                  Diesel
                                </span>
                              </div>
                            </SelectItem>
                            <SelectItem value="ELECTRIC" className="py-2">
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-green-500" />
                                <span className="font-medium text-sm">
                                  Electric
                                </span>
                              </div>
                            </SelectItem>
                            <SelectItem value="HYBRID" className="py-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">🔋</span>
                                <span className="font-medium text-sm">
                                  Hybrid
                                </span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Compact Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={createVehicleMutation.isPending}
                  className="px-6 py-2 text-sm border border-gray-200 hover:border-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createVehicleMutation.isPending}
                  className="px-6 py-2 text-sm bg-gradient-to-r from-[#363DFF] to-[#4F46E5] hover:from-[#2563EB] hover:to-[#363DFF] text-white font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {createVehicleMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Add Vehicle
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Button component for triggering the add vehicle dialog
export function AddVehicleButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-[#363DFF] to-[#4F46E5] hover:from-[#2563EB] hover:to-[#363DFF] text-white font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Vehicle
      </Button>
      <AddVehicleDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
