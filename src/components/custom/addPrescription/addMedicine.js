"use client";
import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

const AddMedicine = ({ form }) => {
  const [rows, setRows] = useState([
    {
      id: crypto.randomUUID(),
      name: "",
      milligram: "",
      quantity: "",
    },
  ]);

  // Function to add a new row with a unique ID
  const addRow = () => {
    const newRow = {
      id: crypto.randomUUID(), // Use crypto.randomUUID() to generate a unique ID
      name: "",
      milligram: "",
      quantity: "",
      // dosage: [], // Initial empty array for dosage
    };

    setRows((prevRows) => [...prevRows, newRow]);
  };

  // Function to remove a row by ID
  const removeRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader>
        <CardTitle>Medicines</CardTitle>
        <CardDescription>
          Add Prescribed Medicines to Ensure Accurate Treatment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[120px]">Milligram</TableHead>
              <TableHead>Quantity</TableHead>
              {/* <TableHead>Dosage</TableHead> */}
              {rows.length > 1 && <TableHead>Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                {/* Medicine Name */}
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`medicines.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Medicine Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                {/* Milligram */}
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`medicines.${index}.milligram`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Milligram"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                {/* Quantity */}
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`medicines.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Quantity"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>

                {/* Dosage */}
                {/* <TableCell>
                  <FormField
                    control={form.control}
                    name={`medicines.${index}.dosage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ToggleGroup
                            type="multiple"
                            value={field.value} // bind the value to field.value
                            onValueChange={(value) => {
                              // Check if the value is already in the array, if it is, remove it; otherwise, add it
                              const updatedDosage = field.value.includes(value)
                                ? field.value.filter((item) => item !== value) // Remove if already selected
                                : [...field.value, value]; // Add new selection

                              field.onChange(updatedDosage); // Update the form state
                            }}
                            variant="outline"
                          >
                            <ToggleGroupItem value="m">M</ToggleGroupItem>
                            <ToggleGroupItem value="e">E</ToggleGroupItem>
                            <ToggleGroupItem value="n">N</ToggleGroupItem>
                          </ToggleGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell> */}

                {/* Remove Button */}
                {rows.length > 1 && (
                  <TableCell>
                    <Button
                      onClick={() => removeRow(row.id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button onClick={addRow} size="sm" variant="ghost" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Add Medicine
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddMedicine;
