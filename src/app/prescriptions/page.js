"use client";
import { useEffect, useState } from "react";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SideNav from "@/components/custom/dashboard/side-nav";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrescriptionPreview from "@/components/custom/prescriptions/prescriptionPreview";
import { useAuth } from "@/contextProvider/authContextProvider";
import { NetworkService } from "@/network";
import { setDateFormat } from "@/Utils/common";

export default function Page() {
  const { getUser } = useAuth();
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const { accessToken } = useAuth();
  console.log("=== data", data, accessToken);

  const getData = async () => {
    const response = await NetworkService.get(
      "/prescription/list",
      {
        /* query params go here if any */
      },
      { Authorization: "Bearer " + accessToken } // headerOptions
    );
    if (response) {
      setData(response?.data);
    }
  };

  useEffect(() => {
    if (accessToken) getData();
  }, [accessToken]);

  console.log("=== prescriptioins", data);

  const handleView = (prescription) => {
    setSelectedPrescription(prescription);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPrescription(null);
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
                  <Link href="#">Prescriptions</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All Prescriptions</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                {getUser().role != "PATIENT" && (
                  <Link href="/addPrescription" passHref>
                    <Button size="sm" className="h-7 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Prescription
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Prescriptions</CardTitle>
                  <CardDescription>
                    Easily Manage Your Prescriptions or Add New Ones with Just a
                    Few Clicks.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Medicine Count</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {item.title}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {item.status === "critical"
                                ? "Critical"
                                : "Normal"}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.user?.first_name}</TableCell>
                          <TableCell>{item.medicines.length || 0}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {setDateFormat(item.updated_at)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => handleView(item)}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => handleView(item)}
                                >
                                  View
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>{data?.length}</strong> prescriptions
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Prescription Preview Modal */}
      <PrescriptionPreview
        open={isModalOpen}
        onClose={handleCloseModal}
        prescription={selectedPrescription}
      />
    </div>
  );
}
