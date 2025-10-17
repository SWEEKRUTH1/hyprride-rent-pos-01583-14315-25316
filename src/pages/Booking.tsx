import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, User, Phone, CreditCard, Camera } from "lucide-react";
import { toast } from "sonner";
import LocationPicker from "@/components/LocationPicker";

const rentalPlans = [
  { id: "1hr", duration: "1 hour", price: 79 },
  { id: "3hr", duration: "3 hours", price: 179 },
  { id: "5hr", duration: "5 hours", price: 279 },
  { id: "7hr", duration: "7 hours", price: 339 },
  { id: "12hr", duration: "12 hours", price: 409 },
  { id: "24hr", duration: "24 hours", price: 499 },
];

const addons = [
  { id: "helmet", name: "Extra Helmet", price: 75 },
  { id: "unlimited", name: "Unlimited Kilometers", price: 75 },
];

const Booking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("12hr");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const calculateTotal = () => {
    const plan = rentalPlans.find((p) => p.id === selectedPlan);
    const addonTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    return (plan?.price || 0) + addonTotal;
  };

  const handleSubmit = () => {
    toast.success("Booking created successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">New Booking</h1>
          <p className="text-muted-foreground mt-1">Create a new rental booking</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                  step >= s
                    ? "bg-gradient-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
              <span
                className={`text-sm font-medium ${
                  step >= s ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s === 1 ? "Customer Info" : s === 2 ? "Booking Details" : "Payment"}
              </span>
              {s < 3 && (
                <div
                  className={`ml-4 h-0.5 w-20 ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Customer Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Customer Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="name" placeholder="Enter full name" className="pl-10" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alt-phone">Alternate Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="alt-phone"
                      placeholder="+91 87654 32109"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <LocationPicker
                  onLocationSelect={(location) => {
                    console.log("Selected location:", location);
                  }}
                />
              </div>

              {/* Aadhar Card Upload */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Aadhar Card *</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="aadhar-front" className="text-sm text-muted-foreground">
                      Front Side
                    </Label>
                    <label
                      htmlFor="aadhar-front"
                      className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all"
                    >
                      <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Tap to capture</span>
                      <input
                        id="aadhar-front"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadhar-back" className="text-sm text-muted-foreground">
                      Back Side
                    </Label>
                    <label
                      htmlFor="aadhar-back"
                      className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all"
                    >
                      <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Tap to capture</span>
                      <input
                        id="aadhar-back"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Driving License Upload */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Driving License *</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="license-front" className="text-sm text-muted-foreground">
                      Front Side
                    </Label>
                    <label
                      htmlFor="license-front"
                      className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all"
                    >
                      <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Tap to capture</span>
                      <input
                        id="license-front"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license-back" className="text-sm text-muted-foreground">
                      Back Side
                    </Label>
                    <label
                      htmlFor="license-back"
                      className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all"
                    >
                      <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Tap to capture</span>
                      <input
                        id="license-back"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              Continue to Booking Details
            </Button>
          </div>
        )}

        {/* Step 2: Booking Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Rental Plan *</Label>
                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                  <div className="grid gap-3 md:grid-cols-2">
                    {rentalPlans.map((plan) => (
                      <div key={plan.id} className="relative">
                        <RadioGroupItem
                          value={plan.id}
                          id={plan.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={plan.id}
                          className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                        >
                          <span className="text-sm font-medium">{plan.duration}</span>
                          <span className="text-2xl font-bold text-primary">
                            ₹{plan.price}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Add-ons (Optional)</Label>
                <div className="space-y-2">
                  {addons.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={addon.id}
                          checked={selectedAddons.includes(addon.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAddons([...selectedAddons, addon.id]);
                            } else {
                              setSelectedAddons(
                                selectedAddons.filter((id) => id !== addon.id)
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={addon.id}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {addon.name}
                        </Label>
                      </div>
                      <span className="text-sm font-semibold">+₹{addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="p-4 bg-muted/50">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-2xl text-primary">
                    ₹{calculateTotal()}
                  </span>
                </div>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <Card className="p-6 bg-gradient-primary text-white">
                <div className="space-y-2">
                  <p className="text-sm opacity-90">Total Amount</p>
                  <p className="text-4xl font-bold">₹{calculateTotal()}</p>
                </div>
              </Card>

              <div className="space-y-2">
                <Label>Payment Method *</Label>
                <RadioGroup defaultValue="cash">
                  <div className="space-y-2">
                    {["Cash", "UPI", "Card"].map((method) => (
                      <div key={method} className="relative">
                        <RadioGroupItem
                          value={method.toLowerCase()}
                          id={method.toLowerCase()}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={method.toLowerCase()}
                          className="flex items-center gap-3 rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                        >
                          <CreditCard className="h-5 w-5" />
                          <span className="font-medium">{method}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Booking;
