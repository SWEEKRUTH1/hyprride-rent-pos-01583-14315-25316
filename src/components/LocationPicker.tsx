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
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const handleSaveApiKey = () => {
    localStorage.setItem("google_maps_api_key", tempApiKey);
    window.location.reload();
  };

  const handleSkipMaps = () => {
    localStorage.setItem("skip_google_maps", "true");
    window.location.reload();
  };

  if (!apiKey && !localStorage.getItem("skip_google_maps")) {
    return (
      <div className="space-y-3 p-4 border border-muted rounded-lg bg-muted/20">
        <Label className="text-sm font-medium">Google Maps Integration (Optional)</Label>
        <p className="text-xs text-muted-foreground">
          Enable location search with Google Maps, or skip to use manual address entry.
        </p>
        {showApiKeyInput ? (
          <>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter Google Maps API Key"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
              />
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 whitespace-nowrap"
              >
                Save
              </button>
            </div>
            <a
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary underline"
            >
              How to get an API key
            </a>
          </>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setShowApiKeyInput(true)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
            >
              Add API Key
            </button>
            <button
              onClick={handleSkipMaps}
              className="px-4 py-2 border border-border rounded-md hover:bg-muted"
            >
              Skip Maps
            </button>
          </div>
        )}
      </div>
    );
  }

  if (localStorage.getItem("skip_google_maps")) {
    return (
      <div className="space-y-3">
        <Label htmlFor="manual-location">Address *</Label>
        <Input
          id="manual-location"
          placeholder="Enter pickup address manually"
          onChange={(e) => {
            onLocationSelect?.({
              address: e.target.value,
              lat: 0,
              lng: 0,
            });
          }}
        />
        <p className="text-xs text-muted-foreground">
          Want to use map search?{" "}
          <button
            onClick={() => {
              localStorage.removeItem("skip_google_maps");
              window.location.reload();
            }}
            className="text-primary underline"
          >
            Enable Google Maps
          </button>
        </p>
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

  const handleRemoveApiKey = () => {
    localStorage.removeItem("google_maps_api_key");
    window.location.reload();
  };

  if (loadError) {
    return (
      <div className="space-y-3 p-4 border border-destructive/30 rounded-lg bg-destructive/5">
        <p className="text-sm font-semibold text-destructive">Google Maps API Error</p>
        <p className="text-xs text-muted-foreground">
          The API key has issues. Please ensure these APIs are enabled in Google Cloud Console:
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
          After enabling, ensure billing is active and this domain is added to HTTP referrer restrictions.
        </p>
        <button
          onClick={handleRemoveApiKey}
          className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-muted"
        >
          Use Different API Key or Skip Maps
        </button>
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
