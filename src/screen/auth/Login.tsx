import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

type FormValues = z.infer<typeof schema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values.email, values.password);
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      alert(err?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400" />
        <div className="absolute inset-0 m-10 rounded-3xl border border-white/20 bg-white/10 backdrop-blur" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="px-8 text-center">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="mx-auto mt-2 max-w-sm text-white/80">
              Đăng nhập để quản trị người dùng, giao dịch và gói dịch vụ.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="h-10 w-10 rounded-xl bg-primary-600" />
            <h1 className="mt-4 text-2xl font-semibold text-gray-900">
              Admin Login
            </h1>
            <p className="text-sm text-gray-500">
              Sử dụng tài khoản quản trị để tiếp tục
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  className="input pl-12 indent-5"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  className="input pl-12 indent-5"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button className="btn btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Admin
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
