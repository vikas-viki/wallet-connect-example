import React, { useEffect } from "react";
import { useContractRead } from "wagmi";
import { DAIabi } from "./abi";

const Part3 = () => {
  const contractRead = useContractRead({
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    abi: DAIabi,
    functionName: "name",
    chainId: 1,
  });

  useEffect(() => {
    console.log(contractRead.data);
  }, [contractRead]);

  return <div>Part3</div>;
};

export default Part3;
