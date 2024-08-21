"use client";

import {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";

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
}: {
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
}) {
  const [service, setService] =
    useState<google.maps.places.AutocompleteService>();
  const [gPrediction, setGPredictions] = useState<any[]>([]);

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
    }
  }, [isLoaded]);

  useEffect(() => {
    if (service) {
      // service.getQueryPredictions(
      //   {
      //     input: inputText,
      //   },
      //   (predictions) => setGPredictions(predictions),
      // );

      service.getPlacePredictions(
        {
          componentRestrictions: options.componentRestrictions,
          input: inputText,
        },
        (predictions) => {
          setGPredictions(predictions);
          console.log(predictions);
        },
      );
    }
  }, [inputText]);

  return (
    <div
      style={{
        minHeight: "5rem",
      }}
    >
      {gPrediction.map(({ description }, index) => (
        <h3 key={description + index}>{description}</h3>
      ))}
    </div>
  );
}

export default memo(PlaceAutocompleteComponent);
