import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, IndianRupee } from "lucide-react";

// Mock data
const mockTransactions = [
  {
    id: 1,
    type: "booking" as const,
    customerName: "Rajesh Kumar",
    customerPhone: "+91 98765 43210",
    vehicleNumber: "TS09EQ8345",
    vehicleModel: "TVS Jupiter",
    date: "2025-10-17T10:00:00",
    amount: 409,
    duration: "12 hrs",
    addons: ["Unlimited KM"],
    status: "active" as const,
  },
  {
    id: 2,
    type: "booking" as const,
    customerName: "Priya Sharma",
    customerPhone: "+91 87654 32109",
    vehicleNumber: "TS09EQ7234",
    vehicleModel: "TVS Ntorq",
    date: "2025-10-17T09:00:00",
    amount: 339,
    duration: "7 hrs",
    addons: [],
    status: "active" as const,
  },
  {
    id: 3,
    type: "booking" as const,
    customerName: "Arjun Reddy",
    customerPhone: "+91 76543 21098",
    vehicleNumber: "TS09EQ6123",
    vehicleModel: "TVS Raider",
    date: "2025-10-17T11:30:00",
    amount: 179,
    duration: "3 hrs",
    addons: [],
    status: "active" as const,
  },
  {
    id: 4,
    type: "return" as const,
    customerName: "Sanjay Patel",
    customerPhone: "+91 65432 10987",
    vehicleNumber: "TS09EQ5012",
    vehicleModel: "TVS Jupiter",
    date: "2025-10-17T08:30:00",
    amount: 499,
    duration: "24 hrs",
    addons: ["Extra Helmet"],
    status: "completed" as const,
  },
];

const Transactions = () => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "booking":
        return "bg-info/10 text-info border-info/20";
      case "extension":
        return "bg-warning/10 text-warning border-warning/20";
      case "return":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-info/10 text-info border-info/20";
      case "completed":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <p className="text-muted-foreground mt-1">
          All bookings and payments in chronological order
        </p>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {mockTransactions.map((transaction) => {
          const { date, time } = formatDateTime(transaction.date);
          return (
            <Card key={transaction.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-white">
                    <IndianRupee className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{transaction.customerName}</h3>
                      <Badge variant="outline" className={getTypeColor(transaction.type)}>
                        {transaction.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {transaction.vehicleNumber} • {transaction.vehicleModel}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    ₹{transaction.amount}
                  </p>
                  <Badge variant="outline" className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{time}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration: </span>
                  <span className="font-medium">{transaction.duration}</span>
                </div>
                {transaction.addons.length > 0 && (
                  <div>
                    <span className="text-muted-foreground">Add-ons: </span>
                    <span className="font-medium">{transaction.addons.join(", ")}</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Transactions;
