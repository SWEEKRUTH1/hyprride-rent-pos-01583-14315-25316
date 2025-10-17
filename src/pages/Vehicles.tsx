import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import VehicleStatusBadge from "@/components/VehicleStatusBadge";

type VehicleStatus = "idle" | "rented" | "maintenance" | "repair";

// Mock data
const mockVehicles: Array<{
  id: number;
  number: string;
  model: string;
  type: string;
  status: VehicleStatus;
  registrationDate: string;
}> = [
  {
    id: 1,
    number: "TS09EQ8345",
    model: "TVS Jupiter",
    type: "110cc",
    status: "rented",
    registrationDate: "2023-01-15",
  },
  {
    id: 2,
    number: "TS09EQ7234",
    model: "TVS Ntorq",
    type: "125cc",
    status: "rented",
    registrationDate: "2023-02-20",
  },
  {
    id: 3,
    number: "TS09EQ6123",
    model: "TVS Raider",
    type: "125cc",
    status: "rented",
    registrationDate: "2023-03-10",
  },
  {
    id: 4,
    number: "TS09EQ5012",
    model: "TVS Jupiter",
    type: "110cc",
    status: "idle",
    registrationDate: "2023-04-05",
  },
  {
    id: 5,
    number: "TS09EQ4901",
    model: "TVS Ntorq",
    type: "125cc",
    status: "idle",
    registrationDate: "2023-05-12",
  },
];

const Vehicles = () => {
  const statusCounts = {
    idle: mockVehicles.filter((v) => v.status === "idle").length,
    rented: mockVehicles.filter((v) => v.status === "rented").length,
    maintenance: mockVehicles.filter((v) => v.status === "maintenance").length,
    repair: mockVehicles.filter((v) => v.status === "repair").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fleet Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your {mockVehicles.length} vehicles
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Status Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 border-l-4 border-l-success">
          <p className="text-sm font-medium text-muted-foreground">Available</p>
          <p className="text-2xl font-bold text-success">{statusCounts.idle}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-info">
          <p className="text-sm font-medium text-muted-foreground">On Rent</p>
          <p className="text-2xl font-bold text-info">{statusCounts.rented}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-warning">
          <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
          <p className="text-2xl font-bold text-warning">{statusCounts.maintenance}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-destructive">
          <p className="text-sm font-medium text-muted-foreground">Repair</p>
          <p className="text-2xl font-bold text-destructive">{statusCounts.repair}</p>
        </Card>
      </div>

      {/* Vehicles Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-white font-bold text-sm">
                  {vehicle.type}
                </div>
                <div>
                  <h3 className="font-semibold">{vehicle.number}</h3>
                  <p className="text-sm text-muted-foreground">{vehicle.model}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <VehicleStatusBadge status={vehicle.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type</span>
                <span className="text-sm font-medium">{vehicle.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Registered</span>
                <span className="text-sm font-medium">
                  {new Date(vehicle.registrationDate).toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
