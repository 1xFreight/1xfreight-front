"use client";

import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";
import { useDebouncedCallback } from "use-debounce";
import "./styles.css";
import { getWithAuth } from "@/common/utils/fetchAuth.util";

const options = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  language: "en",
  componentRestrictions: { country: ["us", "ca", "mx"] },
  fields: ["formatted_address"],
  libs: ["core", "places"] as Library[],
};

function PlaceAutocompleteComponent({
  inputText,
  setInputText,
  setDefault,
  setDetails,
}: {
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
}) {
  const [service, setService] =
    useState<google.maps.places.AutocompleteService>();
  const [gPrediction, setGPredictions] = useState<any[]>([]);
  const [lPrediction, setLPredictions] = useState<any[]>([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: options.apiKey,
    language: options.language,
    libraries: options.libs,
    preventGoogleFontsLoading: true,
  });

  useEffect(() => {
    if (isLoaded) {
      const gService = new google.maps.places.AutocompleteService();

      setService(gService);

      if (gService && inputText) {
        getDebouncedPredictions();
      }
    }
  }, [isLoaded]);

  const getDebouncedPredictions = useDebouncedCallback(() => {
    service?.getPlacePredictions(
      {
        componentRestrictions: options.componentRestrictions,
        input: inputText,
      },
      (predictions) => {
        setGPredictions(predictions);
      },
    );
  }, 300);

  const getDebouncedSavedLocations = useDebouncedCallback(() => {
    getWithAuth(`/address?searchText=${inputText}&limit=5`).then((data) =>
      setLPredictions(data?.address),
    );
  }, 300);

  useEffect(() => {
    if (service && inputText) {
      getDebouncedPredictions();
      getDebouncedSavedLocations();
    }
  }, [inputText]);

  const getPlaceDetailsByAddress = (address: string) => {
    const placesService = new google.maps.places.PlacesService(
      document.createElement("div"), // dummy element
    );

    placesService.findPlaceFromQuery(
      {
        query: address, // Use the address as the query
        fields: ["name", "place_id", "formatted_address"], // Specify the fields you need
      },
      (results, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          results &&
          results.length > 0
        ) {
          const place = results[0]; // Get the first matching place

          let fullAddress = {
            fullAddress: address,
            placeName: place.name,
          };

          console.log(place.name);

          // Now use the place_id to fetch detailed information with getDetails
          //@ts-ignore
          placesService.getDetails(
            {
              placeId: place.place_id,
              fields: ["address_components", "formatted_address", "name"], // Now you can request address_components
            },
            (placeDetails, detailsStatus) => {
              if (
                detailsStatus === google.maps.places.PlacesServiceStatus.OK &&
                placeDetails
              ) {
                // Access address components
                const addressComponents = placeDetails.address_components;
                fullAddress.placeName = placeDetails.name;

                console.log(addressComponents);

                // Loop through address components to get city, zip, and country
                addressComponents?.forEach((component) => {
                  const types = component.types;

                  if (types.includes("locality")) {
                    fullAddress["city"] = component.long_name; // City
                  }

                  if (types.includes("postal_code")) {
                    fullAddress["zipCode"] = component.long_name; // ZIP Code
                  }

                  if (types.includes("country")) {
                    fullAddress["country"] = component.short_name; // Country
                  }

                  if (types.includes("route")) {
                    fullAddress["street"] = component.long_name; // Street
                  }

                  if (types.includes("street_number")) {
                    fullAddress["streetNumber"] = component.long_name; // Street Number
                  }

                  if (types.includes("administrative_area_level_1")) {
                    fullAddress["state"] = component.short_name; // State
                  }

                  setDetails(fullAddress);
                });
              }
            },
          );
        }
      },
    );
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div className={"location-predictions-wrapper fade-in"}>
        {inputText &&
          gPrediction?.map(({ description }, index) => (
            <div
              onClick={() => {
                setInputText(description);
                getPlaceDetailsByAddress(description);
              }}
              key={description + index}
            >
              <h4>{description}</h4>
            </div>
          ))}
        {inputText && !!lPrediction?.length && (
          <h3
            style={{
              marginBottom: "0",
              marginTop: "0.25rem",
            }}
          >
            Saved locations:
          </h3>
        )}
        {inputText &&
          !!lPrediction.length &&
          lPrediction?.map((location, index) => (
            <div
              onClick={() => {
                setInputText(location.address);
                setDetails(location);
                setDefault ? setDefault(location) : "";
              }}
              key={location?.address + index}
            >
              <h4>{location?.address}</h4>
            </div>
          ))}
      </div>
    </div>
  );
}

export default memo(PlaceAutocompleteComponent);
