import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UsersService, WalletService } from "../../services/api";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

const Users: React.FC = () => {
  const [query, setQuery] = useState("");
  const [topupUser, setTopupUser] = useState<any | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const qc = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => UsersService.getAll(),
  });

  const filtered = (data || [])
    .filter((u: any) => u.role === 1 || u.role === 2)
    .filter((u: any) =>
      query.trim() === ""
        ? true
        : [u.fullName, u.email]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase())
    );

  const topupMutation = useMutation({
    mutationFn: async () => {
      if (!topupUser || !amount || amount <= 0)
        throw new Error("Số tiền không hợp lệ");
      await WalletService.addBalance(
        Number(topupUser.userId ?? topupUser.id),
        Number(amount)
      );
    },
    onSuccess: async () => {
      toast.success("Cộng tiền thành công");
      setTopupUser(null);
      setAmount(0);
      await qc.invalidateQueries({ queryKey: ["users"] });
      // Also refresh this user's wallet balance cell
      const targetUserId = Number(topupUser?.userId ?? topupUser?.id);
      if (targetUserId) {
        await qc.invalidateQueries({ queryKey: ["wallet", targetUserId] });
      }
    },
    onError: (e: any) => {
      toast.error(e?.message || "Cộng tiền thất bại");
    },
  });

  const BalanceCell: React.FC<{ userId: number }> = ({ userId }) => {
    const { data: wallet, isLoading } = useQuery({
      queryKey: ["wallet", userId],
      queryFn: () => WalletService.getByUserId(userId),
    });
    if (isLoading) return <span className="text-gray-400">...</span>;
    const balance = typeof wallet?.balance === "number" ? wallet.balance : 0;
    return <span>{Intl.NumberFormat("vi-VN").format(balance)} đ</span>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Users</h2>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên hoặc email..."
            className="input w-64"
          />
          <button className="btn btn-ghost" onClick={() => refetch()}>
            Refresh
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="card p-6 text-sm text-gray-500">
          Đang tải danh sách người dùng...
        </div>
      )}
      {isError && (
        <div className="card p-6 text-sm text-red-600">
          Lỗi tải danh sách người dùng.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="card overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Họ tên</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Số dư</th>
                <th className="px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filtered.map((u: any) => (
                <tr key={u.id}>
                  <td className="px-4 py-3">{u.id}</td>
                  <td className="px-4 py-3">{u.fullName || "(Không tên)"}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.roleText || u.role}</td>
                  <td className="px-4 py-3">
                    <BalanceCell userId={Number(u.userId ?? u.id)} />
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <span>{u.isActive ? "Active" : "Inactive"}</span>
                    <button
                      className="btn btn-ghost"
                      onClick={() => setTopupUser(u)}
                    >
                      Top up
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-sm text-gray-500"
                  >
                    Không có user role 1 hoặc 2.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <Dialog open={Boolean(topupUser)} onClose={() => setTopupUser(null)}>
        <div className="fixed inset-0 z-40 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Nạp tiền cho người dùng
            </Dialog.Title>
            <p className="mt-1 text-sm text-gray-500">
              ID: {topupUser?.id} • {topupUser?.fullName || topupUser?.email}
            </p>
            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Số tiền cần cộng thêm
              </label>
              <input
                type="number"
                className="input"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="100000"
              />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => setTopupUser(null)}
              >
                Hủy
              </button>
              <button
                className="btn btn-primary"
                onClick={() => topupMutation.mutate()}
                disabled={topupMutation.status === "pending"}
              >
                {topupMutation.status === "pending"
                  ? "Đang xử lý..."
                  : "Xác nhận"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Users;
