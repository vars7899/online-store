import { Button, FormControl, FormLabel, Input, useInterval } from "@chakra-ui/react";
import { Layouts } from "../../global";
import { useEffect, useState } from "react";

export const VerifyEmail = () => {
  const [otp, setOtp] = useState(0);
  const [expirationTime, setExpirationTime] = useState(0.1 * 60); // >> Expiration time set to 30 minutes

  const $convertTimeToValidSyntax = (time) => {
    let min = Math.trunc(time / 60);
    let sec = time - min * 60;
    if (min <= 9) min = "0" + min;
    if (sec <= 9) sec = "0" + sec;
    return min + ":" + sec;
  };

  useEffect(() => {
    let interval;
    if (expirationTime > 0) {
      interval = setInterval(() => {
        setExpirationTime((prev) => --prev);
      }, 1000);
    }

    // >> Cleanup
    return () => clearInterval(interval);
  }, [expirationTime]);

  return (
    <Layouts.Auth>
      <div>
        <p className="text-3xl">Email Verification</p>
        <p className="text-gray-500 mt-2">
          Your provided email address has been sent a one-time pin code. Your account will be verified once the pin is
          filled out.
        </p>
      </div>
      <div className="my-8">
        {expirationTime <= 0 ? (
          <span className={"text-red-500 font-semibold"}>OTP was expired</span>
        ) : (
          <p className={"text-black font-semibold"}>
            <span className="text-gray-500 mr-2 font-medium">OTP will be expiring in</span>
            {$convertTimeToValidSyntax(expirationTime)}
          </p>
        )}
      </div>
      <FormControl isRequired>
        <FormLabel>OTP</FormLabel>
        <Input
          type="number"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="000000"
          isDisabled={!expirationTime}
        />
      </FormControl>
      <Button
        mt={10}
        w={"full"}
        size={"lg"}
        colorScheme="accent"
        // onClick={$registerNewUserHandler}
        // isLoading={isLoading}
      >
        Verify Account
      </Button>
    </Layouts.Auth>
  );
};
