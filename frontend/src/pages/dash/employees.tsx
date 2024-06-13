import { DataTable } from "@/components/common/data-table";
import Loader from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import { instance } from "@/lib/axios";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const employeeSChema = z.object({
  fullname: z.string().min(6),
  phone: z.string().min(10).max(10),
  email: z.string().email("Invalid email"),
  nationalId: z.string().min(16).max(16),
});

const Employees = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const form = useForm<z.infer<typeof employeeSChema>>({
    resolver: zodResolver(employeeSChema),
    defaultValues: {
      fullname: "",
      phone: "",
      email: "",
      nationalId: "",
    },
  });
  const [reloadTable, setReloadTable] = useState(false);

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "fullname",
      header: "Fullname",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phonenumber",
      header: "Phonenumber",
    },
    {
      accessorKey: "nationalId",
      header: "National ID",
    },
    {
      accessorKey: "id",
      header: "Actions",
      cell: (data) => {
        const form = useForm<z.infer<typeof employeeSChema>>({
          resolver: zodResolver(employeeSChema),
          defaultValues: {
            fullname: data.row.original.fullname,
            phone: data.row.original.phonenumber,
            email: data.row.original.email,
            nationalId: data.row.original.nationalId,
          },
        });
        return (
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  className="bg-[#4880FF] hover:bg-[#487fffaf] rounded-full"
                >
                  <MdEdit size={18} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Employee</DialogTitle>
                  <DialogDescription>
                    Fill in the form below to edit employee
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((values) => {
                      toast.promise(
                        instance.put(`/employees/${data.row.original.id}`, {
                          ...values,
                        }),
                        {
                          loading: "Loading...",
                          success: () => {
                            setReloadTable((prev) => !prev);
                            return "Employee updated successfully";
                          },
                          error: (error) => {
                            return (
                              error.response?.data?.error ??
                              "Error updating employee"
                            );
                          },
                        }
                      );
                    })}
                    className="lg:mt-10 mt-6 space-y-7"
                  >
                    <FormField
                      control={form.control}
                      name="fullname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Full Name"
                              className="input"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email"
                              className="input"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Phone Number"
                              className="input"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nationalId"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="National ID"
                              className="input"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="bg-[#4880FF] gap-2 items-center"
                    >
                      Update Employee
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  className="bg-[#FF4D4D] hover:bg-[#ff4d4dbd] rounded-full"
                >
                  <MdDelete size={18} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Employee</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this employee?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                  <Button
                    className="bg-[#4880FF] hover:bg-[#487fffaf]"
                    onClick={() => {
                      toast.promise(
                        instance.delete(`/employees/${data.row.original.id}`),
                        {
                          loading: "Loading...",
                          success: () => {
                            setReloadTable((prev) => !prev);
                            return "Employee deleted successfully";
                          },
                          error: (error) => {
                            return (
                              error.response?.data?.error ??
                              "Error deleting employee"
                            );
                          },
                        }
                      );
                    }}
                  >
                    Yes
                  </Button>
                  <DialogClose asChild>
                    <Button className="bg-[#FF4D4D] hover:bg-[#ff4d4dbd]">
                      No
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];

  const { data, isLoading } = useQuery<{
    employees: Employee[];
    total: number;
  }>(
    ["employees", page, limit, reloadTable],
    async () => {
      const response = await instance.get(
        `/employees?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = useState(false);

  const onSubmit = async (values: z.infer<typeof employeeSChema>) => {
    toast.promise(instance.post("/employees", values), {
      loading: "Loading...",
      success: (data) => {
        localStorage.setItem("token", data.data.token);
        setAddEmployeeDialogOpen(false);
        setReloadTable(!reloadTable);
        return "Employee added successfully";
      },
      error: (error) => {
        setAddEmployeeDialogOpen(false);
        return error.response?.data?.error ?? "Error adding employee";
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="text-[#202224] text-[32px] font-bold">Employees</div>
        <Dialog
          open={addEmployeeDialogOpen}
          onOpenChange={setAddEmployeeDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="bg-[#4880FF] hover:bg-[#487fffb2]">
              + Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Employee Information</DialogTitle>
              <DialogDescription>
                Fill in the form below to add a new employee
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="lg:mt-10 mt-6 space-y-7"
              >
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Full Name"
                          className="input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          className="input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Phone Number"
                          className="input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="National ID"
                          className="input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-[#4880FF] gap-2 items-center"
                >
                  Add Employee
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <Loader className="h-[200px]" />
      ) : (
        <DataTable
          columns={columns}
          data={data?.employees ?? []}
          getPage={setPage}
          page={page}
          getLimit={setLimit}
          total={data?.total ?? 0}
        />
      )}
    </div>
  );
};

type Employee = {
  id: number;
  fullname: string;
  phonenumber: string;
  email: string;
  nationalId: string;
};

export default Employees;
