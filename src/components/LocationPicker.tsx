import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

const libraries: ("places")[] = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "0.5rem",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629, // Center of India
};

interface LocationPickerProps {
  onLocationSelect?: (location: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
}

const LocationPicker = ({ onLocationSelect }: LocationPickerProps) => {
  const [apiKey] = useState(localStorage.getItem("google_maps_api_key") || "AIzaSyCWol-tHUTHHN-f9bEi-n2BoZXdd64HDuM");
  const [tempApiKey, setTempApiKey] = useState("");

  const handleSaveApiKey = () => {
    localStorage.setItem("google_maps_api_key", tempApiKey);
    window.location.reload();
  };

  if (!apiKey) {
    return (
      <div className="space-y-3 p-4 border border-muted rounded-lg bg-muted/20">
        <Label className="text-sm font-medium">Google Maps API Key Required</Label>
        <p className="text-xs text-muted-foreground">
          To use location search, please enter your Google Maps API key.{" "}
          <a
            href="https://developers.google.com/maps/documentation/javascript/get-api-key"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Get an API key
          </a>
        </p>
        <div className="flex gap-2">
          <Input
            type="password"
            placeholder="Enter Google Maps API Key"
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
          />
          <button
            onClick={handleSaveApiKey}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return <MapSearchInner apiKey={apiKey} onLocationSelect={onLocationSelect} />;
};

interface MapSearchInnerProps extends LocationPickerProps {
  apiKey: string;
}

const MapSearchInner = ({ apiKey, onLocationSelect }: MapSearchInnerProps) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  const onLoad = useCallback((ref: google.maps.places.Autocomplete) => {
    setAutocomplete(ref);
  }, []);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place) {
        const location = {
          address: place.formatted_address || place.name || "",
          lat: place.geometry?.location?.lat() || 0,
          lng: place.geometry?.location?.lng() || 0,
        };
        setSelectedLocation(location);
        setMapCenter({ lat: location.lat, lng: location.lng });
        onLocationSelect?.(location);
      }
    }
  };

  if (loadError) {
    return (
      <div className="space-y-3 p-4 border border-destructive/30 rounded-lg bg-destructive/5">
        <p className="text-sm font-semibold text-destructive">Google Maps API Not Activated</p>
        <p className="text-xs text-muted-foreground">
          The API key is valid but the required APIs are not enabled. Please enable these APIs in Google Cloud Console:
        </p>
        <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
          <li>Maps JavaScript API</li>
          <li>Places API</li>
        </ul>
        <div className="flex flex-col gap-2">
          <a
            href="https://console.cloud.google.com/apis/library/maps-backend.googleapis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline text-xs hover:text-primary/80"
          >
            → Enable Maps JavaScript API
          </a>
          <a
            href="https://console.cloud.google.com/apis/library/places-backend.googleapis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline text-xs hover:text-primary/80"
          >
            → Enable Places API
          </a>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          After enabling, billing must be active and this domain should be added to API restrictions.
        </p>
      </div>
    );
  }


  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-32 border border-muted rounded-lg">
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="location-search">Search Location *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} options={{ fields: ['formatted_address','geometry','name'] }}>
            <Input
              id="location-search"
              placeholder="Search for building, apartment, or area"
              className="pl-10"
            />
          </Autocomplete>
        </div>
      </div>

      {selectedLocation && (
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm font-medium text-foreground">Selected Location:</p>
          <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
          </p>
        </div>
      )}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={selectedLocation ? 15 : 5}
      >
        {selectedLocation && (
          <Marker
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default LocationPicker;
