import { Card } from "@/components/ui/card";
import { TrendingUp, IndianRupee, Calendar, Activity } from "lucide-react";

const Sales = () => {
  // Mock data - will be replaced with real calculations later
  const todayRevenue = 1427;
  const weekRevenue = 8456;
  const monthRevenue = 34823;
  const todayBookings = 3;
  const utilizationRate = 15; // 3 out of 20 vehicles

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Sales Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Revenue analytics and business insights
        </p>
      </div>

      {/* Revenue Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Today's Revenue</p>
            <IndianRupee className="h-5 w-5 text-primary" />
          </div>
          <p className="text-3xl font-bold">₹{todayRevenue.toLocaleString("en-IN")}</p>
          <p className="text-xs text-success mt-1">+12% from yesterday</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-info">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">This Week</p>
            <TrendingUp className="h-5 w-5 text-info" />
          </div>
          <p className="text-3xl font-bold">₹{weekRevenue.toLocaleString("en-IN")}</p>
          <p className="text-xs text-success mt-1">+8% from last week</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-secondary">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">This Month</p>
            <Calendar className="h-5 w-5 text-secondary" />
          </div>
          <p className="text-3xl font-bold">₹{monthRevenue.toLocaleString("en-IN")}</p>
          <p className="text-xs text-success mt-1">+15% from last month</p>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Today's Performance</h3>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Bookings</span>
                <span className="text-2xl font-bold text-primary">{todayBookings}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Utilization Rate</span>
                <span className="text-2xl font-bold text-info">{utilizationRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-primary h-2 rounded-full transition-all"
                  style={{ width: `${utilizationRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Booking Value</span>
                <span className="text-xl font-bold">₹{Math.round(todayRevenue / todayBookings)}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Fleet Breakdown</h3>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">TVS Jupiter (110cc)</p>
                <p className="text-sm text-muted-foreground">Most Popular</p>
              </div>
              <p className="text-lg font-bold text-primary">45%</p>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">TVS Ntorq (125cc)</p>
                <p className="text-sm text-muted-foreground">High Performance</p>
              </div>
              <p className="text-lg font-bold text-info">35%</p>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">TVS Raider (125cc)</p>
                <p className="text-sm text-muted-foreground">Sporty Choice</p>
              </div>
              <p className="text-lg font-bold text-secondary">20%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Distribution Notice */}
      <Card className="p-6 border-l-4 border-l-warning bg-warning/5">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Activity className="h-5 w-5 text-warning" />
          Revenue Distribution Model
        </h3>
        <p className="text-sm text-muted-foreground">
          Revenue is calculated based on actual usage time, not payment date. Multi-day
          bookings are distributed proportionally across usage days for accurate daily
          analytics.
        </p>
      </Card>
    </div>
  );
};

export default Sales;
