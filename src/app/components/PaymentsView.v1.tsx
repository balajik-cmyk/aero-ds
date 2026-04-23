import {
  ArrowDownToLine,
  Banknote,
  CheckCircle2,
  CircleAlert,
  CreditCard,
  DollarSign,
  Receipt,
  RefreshCcw,
} from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

const metrics = [
  { label: "Available balance", value: "$4,218.00", icon: DollarSign },
  { label: "Net earnings", value: "$97,104.00", icon: Banknote },
  { label: "Paid out", value: "$92,886.00", icon: ArrowDownToLine },
  { label: "Monthly bill", value: "$349.00", icon: Receipt },
];

const transactions = [
  { id: "TX-1038", customer: "Sarah Johnson", business: "Johnson Dental", amount: "$320.00", status: "Received", date: "Apr 12, 2026" },
  { id: "TX-1037", customer: "Marcus Webb", business: "Webb Auto Repair", amount: "$1,450.00", status: "Not paid", date: "Apr 11, 2026" },
  { id: "TX-1036", customer: "Priya Nair", business: "Nair Law Group", amount: "$800.00", status: "Received", date: "Apr 10, 2026" },
  { id: "TX-1035", customer: "Derek Osei", business: "Osei Landscaping", amount: "$550.00", status: "Refunded", date: "Apr 9, 2026" },
  { id: "TX-1034", customer: "Amelia Torres", business: "Torres HVAC", amount: "$2,200.00", status: "Requested", date: "Apr 8, 2026" },
];

const summaryCards = [
  { label: "Received", value: "68%", icon: CheckCircle2 },
  { label: "Outstanding", value: "21%", icon: CircleAlert },
  { label: "Refunded", value: "11%", icon: Receipt },
];

function statusTone(status: string) {
  if (status === "Received") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "Requested") return "border-blue-200 bg-blue-50 text-blue-700";
  if (status === "Refunded") return "border-slate-200 bg-slate-50 text-slate-700";
  return "border-amber-200 bg-amber-50 text-amber-700";
}

export function PaymentsView() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto bg-[#f8fafc] px-6 py-6 text-[#0f1728] dark:bg-[#13161b] dark:text-[#e5e7eb]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6b7280] dark:text-[#9ca3af]">
              Payments
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em]">Collections and payouts</h1>
            <p className="max-w-2xl text-sm leading-6 text-[#5b667a] dark:text-[#9ca3af]">
              Track payment requests, monitor payout health, and review transaction status from one surface.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
            <Button className="gap-2">
              <CreditCard className="h-4 w-4" />
              Connect payout account
            </Button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.3fr_repeat(4,1fr)]">
          <section className="rounded-2xl border border-[#dde5f0] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1b1f27]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#64748b] dark:text-[#94a3b8]">Total requested</p>
                <p className="mt-2 text-4xl font-semibold tracking-[-0.05em]">$142,800</p>
                <p className="mt-2 text-sm text-[#64748b] dark:text-[#94a3b8]">68% collected this cycle</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef3ff] text-[#2552ed] dark:bg-[#20283b]">
                <DollarSign className="h-7 w-7" />
              </div>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {summaryCards.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-xl border border-[#e7edf6] bg-[#fbfcfe] p-4 dark:border-white/10 dark:bg-[#161b22]">
                  <div className="flex items-center gap-2 text-[#2552ed] dark:text-[#7aa2ff]">
                    <Icon className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.14em]">{label}</span>
                  </div>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#0f1728] dark:text-[#f8fafc]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {metrics.map(({ label, value, icon: Icon }) => (
            <section
              key={label}
              className="rounded-2xl border border-[#dde5f0] bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1b1f27]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">{label}</p>
                <Icon className="h-4 w-4 text-[#2552ed] dark:text-[#7aa2ff]" />
              </div>
              <p className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{value}</p>
            </section>
          ))}
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#dde5f0] bg-white shadow-sm dark:border-white/10 dark:bg-[#1b1f27]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8edf5] px-6 py-4 dark:border-white/10">
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.03em]">Recent transactions</h2>
              <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                Latest payment requests, receipts, and refunds.
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Receipt className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-[#f8fafc] text-xs uppercase tracking-[0.12em] text-[#64748b] dark:bg-[#161b22] dark:text-[#94a3b8]">
                <tr>
                  <th className="px-6 py-3 font-medium">Transaction</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Business</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-t border-[#eef2f7] dark:border-white/10">
                    <td className="px-6 py-4 text-sm font-medium">{tx.id}</td>
                    <td className="px-6 py-4 text-sm">{tx.customer}</td>
                    <td className="px-6 py-4 text-sm text-[#5b667a] dark:text-[#9ca3af]">{tx.business}</td>
                    <td className="px-6 py-4 text-sm font-medium">{tx.amount}</td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant="outline" className={statusTone(tx.status)}>
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#5b667a] dark:text-[#9ca3af]">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
