import { Card } from "@/components/ui/card";
import { Clock, User, Phone, Calendar as CalendarIcon, Filter } from "lucide-react";
import VehicleStatusBadge from "@/components/VehicleStatusBadge";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Mock data - will be replaced with real data later
const mockRentals = [
  {
    id: 1,
    vehicleNumber: "TS09EQ8345",
    vehicleModel: "TVS Jupiter",
    vehicleType: "110cc",
    customerName: "Rajesh Kumar",
    customerPhone: "+91 98765 43210",
    startTime: "2025-10-17T10:00:00",
    expectedReturn: "2025-10-17T22:00:00",
    status: "rented" as const,
  },
  {
    id: 2,
    vehicleNumber: "TS09EQ7234",
    vehicleModel: "TVS Ntorq",
    vehicleType: "125cc",
    customerName: "Priya Sharma",
    customerPhone: "+91 87654 32109",
    startTime: "2025-10-17T09:00:00",
    expectedReturn: "2025-10-17T18:00:00",
    status: "rented" as const,
  },
  {
    id: 3,
    vehicleNumber: "TS09EQ6123",
    vehicleModel: "TVS Raider",
    vehicleType: "125cc",
    customerName: "Arjun Reddy",
    customerPhone: "+91 76543 21098",
    startTime: "2025-10-17T11:30:00",
    expectedReturn: "2025-10-17T14:30:00",
    status: "rented" as const,
  },
];

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  // Sort and filter rentals
  const filteredAndSortedRentals = useMemo(() => {
    let filtered = [...mockRentals];

    // Filter by selected date if one is chosen
    if (selectedDate) {
      filtered = filtered.filter((rental) => {
        const returnDate = new Date(rental.expectedReturn);
        return (
          returnDate.getDate() === selectedDate.getDate() &&
          returnDate.getMonth() === selectedDate.getMonth() &&
          returnDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    }

    // Sort by expected return time (ascending - earliest first)
    filtered.sort((a, b) => {
      return new Date(a.expectedReturn).getTime() - new Date(b.expectedReturn).getTime();
    });

    return filtered;
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Active Rentals</h1>
          <p className="text-muted-foreground mt-1">
            {filteredAndSortedRentals.length} vehicles{selectedDate ? " returning on selected date" : " currently on rent"}
          </p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              {selectedDate ? formatDate(selectedDate.toISOString()) : "Filter by Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
            {selectedDate && (
              <div className="p-3 border-t">
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setSelectedDate(undefined)}
                >
                  Clear Filter
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 border-l-4 border-l-info">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">On Rent</p>
              <p className="text-2xl font-bold text-info">{mockRentals.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Available</p>
              <p className="text-2xl font-bold text-success">17</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-warning">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Due Soon</p>
              <p className="text-2xl font-bold text-warning">1</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-destructive">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
              <p className="text-2xl font-bold text-destructive">0</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Rentals List */}
      <div className="space-y-4">
        {filteredAndSortedRentals.map((rental) => (
          <Card key={rental.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-white font-bold">
                  {rental.vehicleType}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{rental.vehicleNumber}</h3>
                  <p className="text-sm text-muted-foreground">{rental.vehicleModel}</p>
                </div>
              </div>
              <VehicleStatusBadge status={rental.status} />
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="text-sm font-medium">{rental.customerName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Contact</p>
                  <p className="text-sm font-medium">{rental.customerPhone}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Start Time</p>
                  <p className="text-sm font-medium">
                    {formatDate(rental.startTime)} {formatTime(rental.startTime)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Expected Return</p>
                  <p className="text-sm font-medium">
                    {formatDate(rental.expectedReturn)} {formatTime(rental.expectedReturn)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAndSortedRentals.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            {selectedDate ? "No vehicles returning on this date" : "No active rentals at the moment"}
          </p>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
