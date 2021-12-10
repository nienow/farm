import {useWeb3React} from "@web3-react/core";
import {UserRejectedRequestError} from "@web3-react/injected-connector";
import {useEffect, useState} from "react";
import {injected} from "../connectors";

const Account = () => {
  const { active, error, activate, account, setError } = useWeb3React();
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
    }
  }, [active, error]);

  function connectToMetamask() {
    setConnecting(true);

    activate(injected, undefined, true).catch((error) => {
      // ignore the error if it's a user rejected request
      if (error instanceof UserRejectedRequestError) {
        setConnecting(false);
      } else {
        setError(error);
      }
    });
  }

  if (error) {
    return <div>Error Connecting</div>;
  }

  if (typeof account !== "string") {
    return (
      <div>
        <button disabled={connecting} onClick={connectToMetamask}>Connect to MetaMask</button>
      </div>
    );
  }

  return (
    <div>
      Connected to: {account}
    </div>
  );
};

export default Account;
