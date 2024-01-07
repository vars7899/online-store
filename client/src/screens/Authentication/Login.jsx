import { Link } from "react-router-dom";
import { Layouts, Components } from "../../global";

export const Login = () => {
  return (
    <Layouts.Authentication>
      <div className="py-4 px-8 xl:py-12 xl:px-20 flex flex-col justify-center">
        <Link to={"/"}>
          <p className="flex flex-col text-xl xl:text-xl leading-tight font-medium border-b-[2px] border-dashed pb-4 xl:pb-8 w-full">
            <span>Eccent*</span>
            <span className="text-black/60">Components</span>
          </p>
        </Link>
        <Components.Authentication.LoginForm />
      </div>
    </Layouts.Authentication>
  );
};
