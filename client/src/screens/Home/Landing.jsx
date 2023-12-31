import * as Layouts from "../../layouts";
import * as Components from "../../components";
import TopCategoriesSection from "../../components/Home/TopCategoriesSection";
import { TopSellers } from "../../components/Home/TopSellers";

export const Landing = () => {
  return (
    <Layouts.Basic>
      <Components.Landing.Hero />
      <TopCategoriesSection />
      <Components.Landing.CompanyBenefits />
      <TopSellers />
      <Components.Landing.SuccessVideo />
    </Layouts.Basic>
  );
};
