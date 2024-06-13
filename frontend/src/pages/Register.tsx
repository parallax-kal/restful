import IconInput from "@/components/ui/icon-input";
import { MdMail } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RiLock2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { FaChevronRight } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,}$/,
      "Password must contain at least 8 characters, including letters and numbers"
    ),
});

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <>
      <div className="text-[#2F3367] font-bold text-[28px]">Login</div>
      <div className="font-medium text-[16px] text-[#303468] ">
        Please fill your information below
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 space-y-7"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <IconInput Icon={MdMail} placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <IconInput
                    Icon={RiLock2Line}
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#4880FF] gap-2 items-center"
            >
              <span>Register</span>
              <FaChevronRight />
            </Button>
          </div>
          <Separator />
          <div className="flex sm:flex-row flex-col gap-2 justify-between">
            <div className="text-[#393D6E] text-[16px] font-medium">Already have an account?</div>
            <Link to="/login" className="text-[#007DFA] font-semibold text-[16px]">Login to your account</Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Register;
