import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../../components/api";
import { useAuth } from "../../../context/authContext";
import Ungtuyen_form from "../ungtuyen";
import { Spin } from "antd";

const Tintuyen_index = () => {
  const params = useParams();
  const { user } = useAuth();
  const [tin, setTin] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (params?.tin) {
      Api.get(`/tin/?code=${params?.tin}`, user?.access_token || "")
        .then((res) => {
          if (res?.results?.[0]) setTin(res?.results?.[0]);
        })
        .catch((e) => Api.error(e))
        .finally(() => setLoading(false));
    }
  }, [params?.tin]);
  return (
    <>
      {loading ? (
        <div className="absolute z-100">
          <Spin />
        </div>
      ) : tin?.id ? (
        <Ungtuyen_form className="absolute" isOpen={true} tin={tin}>
          <div></div>
        </Ungtuyen_form>
      ) : (
        <></>
      )}
    </>
  );
};

export default Tintuyen_index;
