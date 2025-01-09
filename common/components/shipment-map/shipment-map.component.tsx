"use client";

import "./styles.css";
import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import SparkleGif from "@/public/gif/sparkle-white-transparent-optimized.gif";
import GreenCirclePng from "@/public/png/location-circle-greenchecked.png";
import LocationPng from "@/public/png/sparkle.png";
import { useDebouncedCallback } from "use-debounce";

// Custom map container style
const containerStyle = {
  width: "100%",
  height: "320px",
};

// // Custom map style
const mapStyle = [
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [
      {
        color: "#878787",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#f9f5ed",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#aee0f4",
      },
    ],
  },
];

const centerDefault = { lat: 39.8283, lng: -98.5795 };

export default function ShipmentMapComponent({ quoteLocations }) {
  const [locations, setLocations] = useState([]);
  const mapRef = useRef<any>(null); // Reference to the map instance
  const [routeResponse, setRouteResponse] = useState(null);
  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  //   language: "en",
  //   region: "US",
  //   preventGoogleFontsLoading: true,
  // });

  useEffect(() => {
    geocodeAddresses(quoteLocations);
  }, []);

  useEffect(() => {
    centerGoogleMaps();

    if (locations.length > 1) {
      const directionsService = new window.google.maps.DirectionsService();
      const waypoints = locations.slice(1, -1).map((loc) => ({
        location: loc.position,
        stopover: true,
      }));

      directionsService.route(
        {
          origin: locations[0].position,
          destination: locations[locations.length - 1].position,
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        },
        (result, status) => {
          if (status === "OK") {
            setRouteResponse(result);
          } else {
            console.error("Directions request failed due to", status);
          }
        },
      );
    }
  }, [locations]);

  const geocodeAddresses = async (addresses) => {
    const geocodedLocations = [];
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const sortLocations = (locationsToSort: Array<any>) => {
      const pickups = locationsToSort.filter(
        ({ address_type }) => address_type === "pickup",
      );
      const drops = locationsToSort.filter(
        ({ address_type }) => address_type === "drop",
      );

      const orderedPickups = pickups.map((x, index) => {
        return pickups.find(({ order }) => (order = index + 1));
      });

      const orderedDrops = drops.map((x, index) => {
        return drops.find(({ order }) => (order = index + 1));
      });

      return [...orderedPickups, ...orderedDrops];
    };

    const sortedAddresses = sortLocations(addresses);

    for (const location of sortedAddresses) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location.address,
          )}&key=${apiKey}`,
        );

        const data = await response.json();
        if (data.status === "OK" && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          geocodedLocations.push({
            id: location._id,
            position: { lat, lng },
            icon: location.icon,
            company_name: location.company_name,
            isLocationChecked: !!location.arrival_date,
          });
        } else {
          console.error(`Failed to geocode address: ${location.address}`);
        }
      } catch (err) {
        console.error("Error fetching geocoding data:", err);
      }
    }

    setLocations(geocodedLocations);
  };

  const centerGoogleMaps = () => {
    if (mapRef.current && locations.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((location) => bounds.extend(location.position));
      mapRef.current.fitBounds(bounds);
    }
  };

  const debouncedCenterMapOnIdle = useDebouncedCallback(() => {
    setTimeout(() => {
      centerGoogleMaps();
    }, 1000);
  }, 30000);

  const switchScaleToMiles = () => {
    // Get all elements with the class name "gm-style-cc"
    const elements = document.getElementsByClassName("gm-style-cc");

    // Convert HTMLCollection to an array and find the button with type="button"
    const buttonElement = Array.from(elements).find(
      (el) => el.tagName === "BUTTON" && el.type === "button",
    );

    // Array.from(elements).map((el) => el.click());

    // If the button exists, click it
    if (buttonElement) {
      buttonElement.click();
    } else {
      console.warn(
        "Button with class 'gm-style-cc' and type='button' not found.",
      );
    }
  };

  const debouncedSwitchToMiles = useDebouncedCallback(() => {
    switchScaleToMiles();
  }, 1000);

  // // Optionally handle errors
  // if (loadError) {
  //   return <div>Failed to load the map script!</div>;
  // }
  //
  // // Wait until the script is loaded before rendering any map
  // if (!isLoaded) {
  //   return <div>Map is loading...</div>;
  // }

  return (
    <div
      style={{
        border: "1px solid #BBBBBB",
        borderRadius: "0.75rem",
        overflow: "hidden",
        height: containerStyle.height,
        boxShadow: "-1px 1px 3px 0px rgba(0,3,51,0.14)",
      }}
    >
      <GoogleMap
        mapContainerStyle={{
          width: containerStyle.width,
          height: containerStyle.height,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL, // Show distances in miles
        }}
        center={centerDefault}
        zoom={4}
        onLoad={(map) => {
          mapRef.current = map;
          debouncedSwitchToMiles();
        }} // Set map reference
        options={{
          styles: mapStyle, // Apply custom map style
          scaleControl: true,
          fullscreenControl: true,
          mapTypeControl: true,
          streetViewControl: false,
          controlSize: 30,
          scaleControlOptions: {},
        }}
      >
        {locations.map((location, index) => {
          return (
            <Marker
              key={location.id + index}
              position={location.position}
              icon={{
                url: LocationPng?.src,
                scaledSize: new window.google.maps.Size(40, 40), // Safe access
                // scaledSize: location.isLocationChecked
                // ? new window.google.maps.Size(40, 40)
                // : new window.google.maps.Size(30, 30), // Safe access
                // anchor: location.isLocationChecked
                //   ? new window.google.maps.Point(0, 0)
                //   : new window.google.maps.Point(30, 33), // Safe access,
                labelOrigin: new window.google.maps.Point(17, -15),
              }}
              label={{
                text: location.company_name, // Text to display
                className: "marker-label",
                color: "",
              }}
            />
          );
        })}
        {routeResponse && (
          <DirectionsRenderer
            directions={routeResponse}
            options={{
              suppressMarkers: true, // Remove default start and end markers
              polylineOptions: {
                strokeColor: "#F97D63", // Blue color
                strokeOpacity: 0.8, // Opacity of the route
                strokeWeight: 5, // Thickness of the route
              },
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
