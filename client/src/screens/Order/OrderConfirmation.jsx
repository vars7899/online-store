import { Button } from "@chakra-ui/react";
import { IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layouts } from "../../global";
import { useSelector } from "react-redux";

export const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15); // >> 15 seconds
  const [pauseTimer, setPauseTime] = useState(false);
  const { selectedOrder, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    let interval;
    if (timeLeft > 0 && !pauseTimer) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timeLeft, pauseTimer]);

  useEffect(() => {
    if (timeLeft <= 0) navigate("/", { replace: true });
  }, [timeLeft]);

  useEffect(() => {
    if (!isLoading && !selectedOrder) navigate("/");
  }, [isLoading, selectedOrder]);

  return (
    <Layouts.Basic
      bottomBar={
        <div className="flex items-center justify-center">
          <>
            {pauseTimer ? (
              <p>Timer was paused</p>
            ) : (
              <p>
                We'll redirect you to Eccent Home in <span className="font-semibold"> {timeLeft}</span> seconds
              </p>
            )}
          </>
          <Button
            ml={4}
            size={"sm"}
            variant={"outline"}
            onClick={() => setPauseTime((prev) => !prev)}
            colorScheme="accent"
          >
            {pauseTimer ? "Resume" : "Pause"}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center flex-1 relative">
        <div className="pb-16 flex items-center justify-center relative">
          <div className="absolute h-[300px] w-[300px] bg-accent-100/20 rounded-full animate-ping  -z-0"></div>
          <div className="absolute h-[76px] w-[76px] bg-accent-100 rounded-full animate-ping -z-0"></div>
          <div className="border-4 border-dashed p-4 rounded-full border-accent-300 w-min">
            <div className="bg-accent-100/20 text-accent-500 p-10 rounded-full">
              <IconCheck size={76} strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <p className="text-xl">
          Order Received <span className="uppercase">#{selectedOrder?._id}</span>
        </p>
        <div></div>
        <Button mt={8} colorScheme="accent" variant={"outline"} onClick={() => navigate("/components")}>
          Continue Shopping
        </Button>
        <p className="text-xs mt-8">
          Have any question? Reach directly to our <span className="font-semibold">Customer Support</span>
        </p>
      </div>
    </Layouts.Basic>
  );
};
