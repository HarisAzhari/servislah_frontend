"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit3,
  Eye,
  Download,
  Printer,
  Send,
  Share2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function InvoicePage() {
  const [status, setStatus] = useState("Paid");

  const invoiceItems = [
    {
      id: 1,
      description: "Premium Oil Change Service",
      details:
        "Full synthetic oil change with filter replacement, fluid top-up and 21-point inspection.",
      quantity: 1,
      unitPrice: 120.0,
    },
    {
      id: 2,
      description: "Brake Pad Replacement",
      details:
        "Front brake pad replacement with rotor resurfacing and brake fluid flush.",
      quantity: 1,
      unitPrice: 350.0,
    },
    {
      id: 3,
      description: "Engine Diagnostic Scan",
      details:
        "Comprehensive computer diagnostic scan with detailed report and recommendations.",
      quantity: 1,
      unitPrice: 89.5,
    },
  ];

  const subtotal = invoiceItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const shipping = 25.0;
  const discount = 50.0;
  const taxRate = 0.06; // 6% SST
  const taxes = subtotal * taxRate;
  const total = subtotal + shipping - discount + taxes;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          {/* Back button and title */}
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              INV-2024
            </h1>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/dashboard"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/dashboard/invoice"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Invoice
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-gray-200">INV-2024</span>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Status
            </span>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Printer className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Send className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Invoice Card */}
      <Card className="p-8 bg-white dark:bg-gray-800">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-12">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <img
                src="/Main Logo.png"
                alt="ServisLah"
                className="h-8 w-8 object-contain"
              />
            </div>
          </div>

          {/* Status and Invoice Number */}
          <div className="text-right space-y-2">
            <Badge
              className={`${
                status === "Paid"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : status === "Pending"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : status === "Overdue"
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              } px-3 py-1`}
            >
              {status}
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              INV-2024
            </h2>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Invoice From */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
              Invoice from
            </h3>
            <div className="space-y-1 text-gray-900 dark:text-white">
              <p className="font-semibold">ServisLah Auto Center</p>
              <p>No. 123, Jalan Ampang, Kuala Lumpur, MY 50450</p>
              <p>Phone: +60 3-2161-1234</p>
            </div>
          </div>

          {/* Invoice To */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
              Invoice to
            </h3>
            <div className="space-y-1 text-gray-900 dark:text-white">
              <p className="font-semibold">Ahmad Rahman</p>
              <p>15A-2, Jalan SS15/4D, Subang Jaya, Selangor 47500</p>
              <p>Phone: +60 12-345-6789</p>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Date create
            </h3>
            <p className="text-gray-900 dark:text-white">15 Dec 2024</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Due date
            </h3>
            <p className="text-gray-900 dark:text-white">29 Dec 2024</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 w-12">
                    #
                  </th>
                  <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Description
                  </th>
                  <th className="text-right py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 w-16">
                    Qty
                  </th>
                  <th className="text-right py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 w-24">
                    Unit
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 dark:border-gray-700/50"
                  >
                    <td className="py-6 text-sm text-gray-900 dark:text-white">
                      {item.id}
                    </td>
                    <td className="py-6">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {item.description}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {item.details}
                        </p>
                      </div>
                    </td>
                    <td className="py-6 text-right text-sm text-gray-900 dark:text-white">
                      {item.quantity}
                    </td>
                    <td className="py-6 text-right text-sm text-gray-900 dark:text-white">
                      RM{item.unitPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-full max-w-sm space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="text-gray-900 dark:text-white">
                RM{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Service Fee
              </span>
              <span className="text-red-600 dark:text-red-400">
                +RM{shipping.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Member Discount
              </span>
              <span className="text-red-600 dark:text-red-400">
                -RM{discount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">SST (6%)</span>
              <span className="text-gray-900 dark:text-white">
                {(taxRate * 100).toFixed(1)}%
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Total
                </span>
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  RM{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              NOTES
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We appreciate your business! Your vehicle has been serviced with
              genuine parts and comes with our 6-month warranty. For any
              questions about this invoice or our services, please don't
              hesitate to contact us.
            </p>
          </div>

          {/* Support Contact */}
          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Have a question?
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                support@servislah.com
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
