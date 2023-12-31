import { Divider } from "@chakra-ui/react";
import { IconAlertCircle, IconCircleCheck, IconKey } from "@tabler/icons-react";
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";

export const PasswordChecklist = ({ newPassword, newCfPassword }) => {
  const [strength, setStrength] = useState(passwordStrength(newPassword));

  useEffect(() => {
    setStrength(passwordStrength(newPassword));
  }, [newPassword, newCfPassword]);

  const $controlFieldInclusion = (givenProp) => {
    if (givenProp === "match") {
      if (!newPassword) return { color: "text-gray-500", icon: <IconAlertCircle /> };
      return newPassword === newCfPassword
        ? { color: "text-green-500", icon: <IconCircleCheck /> }
        : { color: "text-gray-500", icon: <IconAlertCircle /> };
    }
    if (givenProp === "length") {
      return newPassword.length >= 8
        ? { color: "text-green-500", icon: <IconCircleCheck /> }
        : { color: "text-gray-500", icon: <IconAlertCircle /> };
    }
    return strength.contains.includes(givenProp)
      ? { color: "text-green-500", icon: <IconCircleCheck /> }
      : { color: "text-gray-500", icon: <IconAlertCircle /> };
  };

  return (
    <div className="border-[1.5px] rounded-xl p-6 flex flex-col items-center xl:items-start mb-8">
      <div className="p-4 bg-blue-100 text-blue-500 rounded-full ">
        <IconKey size={40} strokeWidth={1.5} />
      </div>
      <div className="mt-6 xl:ml-6 w-[100%]">
        <p className="">Password Checklist</p>
        <Divider my={2} />
        <div className="grid grid-flow-row gap-2">
          <div className={`flex items-center ${$controlFieldInclusion("length").color}`}>
            {$controlFieldInclusion("length").icon}
            <p className="ml-2">Must be at least 8 character long.</p>
          </div>
          <div className={`flex items-center ${$controlFieldInclusion("lowercase").color}`}>
            {$controlFieldInclusion("lowercase").icon}
            <p className="ml-2">Have at least one lowercase letter.</p>
          </div>
          <div className={`flex items-center ${$controlFieldInclusion("uppercase").color}`}>
            {$controlFieldInclusion("uppercase").icon}
            <p className="ml-2">Have at least one uppercase letter.</p>
          </div>
          <div className={`flex items-center ${$controlFieldInclusion("number").color}`}>
            {$controlFieldInclusion("number").icon}
            <p className="ml-2">Have at least one number.</p>
          </div>
          <div className={`flex items-center ${$controlFieldInclusion("symbol").color}`}>
            {$controlFieldInclusion("symbol").icon}
            <p className="ml-2">Have at least one special character.</p>
          </div>
          <div className={`flex items-center ${$controlFieldInclusion("match").color}`}>
            {$controlFieldInclusion("match").icon}
            <p className="ml-2">Password match.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
