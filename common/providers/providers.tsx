"use client";

import { ReactNode } from "react";
import { StoreContextProvider } from "@/common/contexts/store.context";
import AuthProvider from "@/app/auth/auth.provider";
import ToasterComponent from "@/common/components/toaster/toaster.component";
import { LoadScript } from "@react-google-maps/api";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import { Library } from "@googlemaps/js-api-loader";
import { NotificationContextProvider } from "@/common/contexts/notifications.context";

const options = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  language: "en",
  libs: ["core", "places"] as Library[],
};

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LoadScript
      googleMapsApiKey={options.apiKey}
      preventGoogleFontsLoading
      language={options.language}
      region="US"
      loadingElement={<div></div>}
      libraries={options.libs}
    >
      <StoreContextProvider>
        <NotificationContextProvider>
          <ToasterComponent />
          <AuthProvider>{children}</AuthProvider>
        </NotificationContextProvider>
      </StoreContextProvider>
    </LoadScript>
  );
}
