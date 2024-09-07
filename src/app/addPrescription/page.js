"use client";
import Link from "next/link";

import AddMedicine from "@/components/custom/addPrescription/addMedicine";
import PatientDetailForm from "@/components/custom/addPrescription/patientDetailForm";
import PatientState from "@/components/custom/addPrescription/patientState";
import PrescriptionImages from "@/components/custom/addPrescription/prescriptionImages";
import SideNav from "@/components/custom/dashboard/side-nav";
import ProfileBtn from "@/components/custom/profileBtn/profile-btn";
import { Badge } from "@/components/ui/badge";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { NetworkService } from "@/network";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contextProvider/authContextProvider";

// Parent component that manages the form state and submission
export default function Page() {
  // Define the schema for form validation using Zod
  const medicineSchema = z.object({
    name: z.string().min(1, "Medicine name is required"),
    milligram: z.coerce
      .number()
      .min(1, "Milligram should be a positive number"),
    quantity: z.coerce.number().min(1, "Quantity should be at least 1"),
    // dosage: z
    //   .array(z.enum(["m", "e", "n"]))
    //   .min(1, "At least one dosage (Morning, Evening, Night) must be selected"),
  });

  const patientSchema = z.object({
    username: z.string().min(1, "Username is required"),
    title: z.string().min(1, "Title is required"),
    diagnosis: z.string().min(1, "Diagnosis is required"),
    status: z
      .enum(["emergency", "needCare", "normal"], {
        required_error: "Status is required",
      })
      .default("normal"),
    medicines: z
      .array(medicineSchema)
      .min(1, "At least one medicine is required"),
  });

  // Initialize the form with useForm from react-hook-form
  const form = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      patientId: "",
      title: "",
      diagnosis: "",
      status: "normal",
      medicines: [
        { name: "", milligram: "", quantity: "" }, // Default medicine row
      ],
    },
  });

  const router = useRouter();
  const { accessToken } = useAuth();

  // Function to handle form submission
  const onSubmit = async (data) => {
    const response = await NetworkService.post(
      "/prescription/create/",
      data,
      { Authorization: "Bearer " + accessToken } // headerOptions
    );

    if (response.status === 200) {
      alert("Prescription created successfully");
      router.push("/prescriptions");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNav active="prescriptions" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/prescriptions">Prescriptions</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Add Prescription</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0"></div>
          <ProfileBtn />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* Form wrapper: The form is managed by the parent */}
          <Form {...form}>
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Add Prescription
                </h1>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  New
                </Badge>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button size="sm" onClick={form.handleSubmit(onSubmit)}>
                    Save Prescription
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  {/* Pass form control to child components */}
                  <PatientDetailForm form={form} />
                  <AddMedicine form={form} />
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <PatientState form={form} />
                  {/* <PrescriptionImages /> */}
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm" onClick={form.handleSubmit(onSubmit)}>
                  Save Prescription
                </Button>
              </div>
            </div>
          </Form>
        </main>
      </div>
    </div>
  );
}
