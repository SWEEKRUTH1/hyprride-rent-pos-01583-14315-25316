import { Badge } from "./ui/badge";

type VehicleStatus = "idle" | "rented" | "maintenance" | "repair";

interface VehicleStatusBadgeProps {
  status: VehicleStatus;
}

const VehicleStatusBadge = ({ status }: VehicleStatusBadgeProps) => {
  const statusConfig = {
    idle: {
      label: "Available",
      className: "bg-success/10 text-success border-success/20 hover:bg-success/20",
    },
    rented: {
      label: "Rented",
      className: "bg-info/10 text-info border-info/20 hover:bg-info/20",
    },
    maintenance: {
      label: "Maintenance",
      className: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20",
    },
    repair: {
      label: "Repair",
      className: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

export default VehicleStatusBadge;
