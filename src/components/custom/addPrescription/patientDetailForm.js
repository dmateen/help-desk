"use client";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const PatientDetailForm = ({ form }) => {
  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader>
        <CardTitle>Patient Details</CardTitle>
        <CardDescription>
          Enter the patient details to ensure accurate diagnosis and treatment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="title">Title</Label>
                  <FormControl>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter prescription title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Patient ID Field */}
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="username">Patient Username</Label>
                  <FormControl>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter Patient Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Diagnosis Field */}
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <FormControl>
                    <Textarea
                      id="diagnosis"
                      placeholder="Enter Diagnosis"
                      {...field}
                      className="min-h-32"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientDetailForm;
