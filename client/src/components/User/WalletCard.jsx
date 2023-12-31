import { IconBleachNoChlorine } from "@tabler/icons-react";
import QRCode from "qrcode.react";

export const WalletCard = ({ user }) => {
  return (
    <div>
      <div className="bg-black px-6 py-6 rounded-2xl relative overflow-hidden">
        <span className="absolute -bottom-20 -right-20">
          <IconBleachNoChlorine className="text-white/10" size={300} />
        </span>
        <div className="flex items-center justify-start">
          <IconBleachNoChlorine className="text-accent-500" />
          <p className="text-white font-semibold tracking-widest text-sm ml-2">ECCENT COMPONENTS</p>
        </div>
        <div className="py-6 flex ">
          <QRCode value={user._id} renderAs="svg" level="L" size={80} bgColor="rgb(107, 114, 128)" />
          <div className="ml-4">
            <p className="text-gray-500">Balance</p>
            <p className="text-white text-xl">{Number(user.wallet.balance).toFixed(2)}</p>
          </div>
        </div>
        <p className="text-gray-800">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-gray-800 uppercase tracking-[4.5px] font-semibold text-xs">{user._id}</p>
      </div>
    </div>
  );
};
