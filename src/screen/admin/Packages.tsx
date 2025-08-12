import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PackagesService } from "../../services/api";
import { Package } from "lucide-react";

const Packages: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => PackagesService.getAll(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Packages</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost" onClick={() => refetch()}>
            Refresh
          </button>
          <button className="btn btn-primary">New Package</button>
        </div>
      </div>

      {isLoading && (
        <div className="card p-6">
          <p className="text-sm text-gray-500">Đang tải gói dịch vụ...</p>
        </div>
      )}

      {isError && (
        <div className="card p-6">
          <p className="text-sm text-red-600">
            Lỗi tải gói dịch vụ. Vui lòng thử lại.
          </p>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {!data || data.length === 0 ? (
            <div className="card p-10 text-center text-sm text-gray-500">
              Chưa có gói dịch vụ nào.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {data?.map((pkg: any) => (
                <div key={pkg.id} className="card p-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-50 text-primary-700">
                      <Package className="h-4 w-4" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {pkg.name}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {pkg.description}
                  </p>
                  <p className="mt-4 text-2xl font-semibold text-primary-700">
                    {Intl.NumberFormat("vi-VN").format(pkg.price)} đ
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`${
                        pkg.hasPriorityMatching
                          ? "bg-primary-50 text-primary-700"
                          : "bg-gray-50 text-gray-600"
                      } rounded-full px-2 py-1`}
                    >
                      Ưu tiên tìm kiếm:{" "}
                      {pkg.hasPriorityMatching ? "Có" : "Không"}
                    </span>
                    <span
                      className={`${
                        pkg.noAds
                          ? "bg-primary-50 text-primary-700"
                          : "bg-gray-50 text-gray-600"
                      } rounded-full px-2 py-1`}
                    >
                      No Ads: {pkg.noAds ? "Có" : "Không"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Packages;
