"use client";
import "./styles.css";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import { useEffect, useState } from "react";
import Checked from "@/public/icons/24px/checked-tick.svg";
import Cross from "@/public/icons/24px/cross.svg";
import Loading from "@/public/icons/loading.svg";
import Link from "next/link";

export default function SendComponent() {
  const { saveData } = useRegisterQuoteContext();
  const [status, setStatus] = useState<null | boolean>(null);

  useEffect(() => {
    setTimeout(() => setStatus(saveData), 2000);
  }, []);

  const retrySaveData = () => {
    setStatus(null);
    setTimeout(() => setStatus(saveData), 1000);
  };

  const iconByStatus = () => {
    if (status === null) {
      return (
        <div className={"state loading-state"}>
          <Loading />
        </div>
      );
    }

    if (status) {
      return (
        <div className={"state-wrapper"}>
          <div className={"state true-state"}>
            <Checked />
          </div>
          <h4>Your request has been successfully registered.</h4>
          <Link href={"/quotes"}>
            <button>View quotes</button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className={"state-wrapper"}>
          <div className={"state false-state"}>
            <Cross />
          </div>

          <h4>A system error occurred, please try again later.</h4>
          <button onClick={() => retrySaveData()}>retry</button>
        </div>
      );
    }
  };
  return <div className={"send-page"}>{iconByStatus()}</div>;
}
