
import { Status } from "../../components/admin/bank/bank.types";
import { STATUS_CFG } from "./status.config";

const  StatusBadge=({ status }: { status: Status })=> {
  const cfg = STATUS_CFG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${cfg.badgeBg} ${cfg.badgeText}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dotClass}`} />
      {cfg.label}
    </span>
  );
}

export default StatusBadge